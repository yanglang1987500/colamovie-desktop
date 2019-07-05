import { observable, action, runInAction, toJS } from 'mobx';
import http, { Q } from '@http';
import LoadingData from "./loadingData";
import { filterChar, filterSensitive } from '@common/utils/filter';
import { albumType, albumTypes } from '@common/enums/constant';

const disableType = ['福利片', '伦理片', '连续剧'];
class Store {

  constructor() {
    this.globalData = new Map<number, LoadingData<IAlbum[]>>();
    Array(100).fill(1).forEach((i, index) => {
      this.globalData.set(index, new LoadingData<IAlbum[]>([]));
    });
    this.fetchTvData();
  }

  @observable
  update: IUpdate = {
    needUpdate: false,
    progress: 0,
    start: false,
    complete: false,
    info: {} as IUpdateInfo
  };

  @action
  setUpdate(key: keyof IUpdate, value: any) {
    (this.update[key] as any) = value;
  }

  @observable
  globalData: Map<number, LoadingData<IAlbum[]>>;

  @observable
  albumList: LoadingData<IAlbum[]> = new LoadingData([]);

  @observable
  searchKey: string = '';

  @action
  setSearchKey(key: string) {
    this.searchKey = key;
  }

  @observable
  searchAlbumList: LoadingData<IAlbum[]> = new LoadingData([]);

  @observable
  typeList: LoadingData<IType[]> = new LoadingData([]);

  @observable
  tvData: ITV[] = [];

  getAlbumListByType(typeId: number) :LoadingData<IAlbum[]> {
    return this.globalData.get(typeId);
  }

  @action
  async fetchTvData() {
    const tvData = await this.api().fetchTvData();
    runInAction(() => {
      this.tvData = tvData;
    })
  }

  @action
  clearSearchResult() {
    this.searchAlbumList.setLoadedData([]);
  }

  getAlbumById(albumId: string) {
    const array = [];
    for (let key of this.globalData.keys()) {
      array.push(key);
    }
    return array.
      reduce((prev: [], current: number) => [...prev, ...this.globalData.get(current).data], [])
      .concat(toJS(this.searchAlbumList.data))
      .find((album: IAlbum) => album.vod_id == albumId);
  }

  @action
  async getVideoList(param?: IQueryParam) {
    const typeId = (param && param.typeId) || albumType.News;
    if (this.globalData.get(typeId).data.length > 0) {
      return;
    }
    const result = await this.api().getVideoListMain(param);
    runInAction(() => {
      let list = result.data;
      this.setTypeList(result.list);
      list = filterSensitive(list, (album) => album.vod_name);
      list = filterChar(list, 'vod_content');
      const typeId = (param && param.typeId) || albumType.News;
      this.globalData.get(parseInt(`${typeId}`, 10)).setLoadedData(list);
    });
  }

  @action
  async getVideoByVodIdAndVodName(vod_id: string, vod_name: string): Promise<IAlbum> {
    return new Promise(async resolve =>  {
      const result = await this.searchVideoList({ vodids: vod_id }, false);
      resolve(result.find(i => (i.vod_id === vod_id && (vod_name ? i.vod_name === vod_name : true))));
    });
  }

  @action
  setTypeList(list: IType[]) {
    this.typeList.setLoadedData(list.filter(i => !disableType.some(type => type === i.list_name)));
  }

  @action
  async searchVideoList(param?: IQueryParam, save: boolean = true): Promise<IAlbum[]> {
    return new Promise(async resolve =>  {
      const promiseMain = this.api().getVideoListMain(param);
      const promiseSecond = this.api().getVideoListSecond(param);
      const result = await Promise.all([promiseMain, promiseSecond].map(p => p.catch(e => ({ data: [] } as IResult))));
      runInAction(() => {
        let list = [...result[0].data, ...result[1].data];
        list = filterChar(list, 'vod_content');
        save && this.searchAlbumList.setLoadedData(list);
        resolve(list);
      });
    });
  }

  api() {
    return {      
      getVideoListMain: (param?: IQueryParam): Promise<IResult> => {
        return this.api().fetch('http://www.zdziyuan.com/inc/feifei3.4/', param);
      },
      getVideoListSecond: (param?: IQueryParam): Promise<IResult> => {
        return this.api().fetch('http://www.apiokzy.com/inc/feifei3s/', param);
      },
      fetch: (url: string, param?: IQueryParam): Promise<IResult> => {
        const searchParam: any = {};
        if (param) {
          param.key && (searchParam.wd = param.key);
          param.pageIndex && (searchParam.p = param.pageIndex);
          param.typeId && (searchParam.cid = param.typeId);
          param.vodids && (searchParam.vodids = param.vodids);
        }
        return Q(http.get(url, { params: searchParam }));
      },
      fetchTvData: (): Promise<ITV[]> => Q(http.get('http://ptz0pgtd0.bkt.clouddn.com/tv.json')) 
    };
  }
}

export default Store;