import Store from '../store';
import LoadingData from '../store/loadingData';
interface IStoreContainer {
  store: Store;
}
export const Business = (container: IStoreContainer) => {
  const { store } = container;
  const propsConnect = {
    albumList: store.albumList,
    searchAlbumList: store.searchAlbumList,
    globalData: store.globalData,
    typeList: store.typeList,
    searchKey: store.searchKey,
    update: store.update,
    tvData: store.tvData,
  };
  const dispatchConnect = {
    getVideoList: (param?: IQueryParam) => store.getVideoList(param),
    searchVideoList: (param?: IQueryParam) => store.searchVideoList(param),
    getAlbumListByType: (typeId: number) => store.getAlbumListByType(typeId),
    getAlbumById: (albumId: string) => store.getAlbumById(albumId),
    getVideoByVodIdAndVodName: (vod_id: string,  vod_name: string) =>
      store.getVideoByVodIdAndVodName(vod_id, vod_name),
    clearSearchResult: () => store.clearSearchResult(),
    setSearchKey: (key: string) => store.setSearchKey(key),
    setUpdate: (key: keyof IUpdate, value: any) => store.setUpdate(key, value)
  };

  return {
    ...propsConnect,
    ...dispatchConnect,
  };
};

export interface IBusinessProps {
  update: IUpdate;
  albumList: LoadingData<IAlbum[]>;
  searchAlbumList: LoadingData<IAlbum[]>;
  typeList: LoadingData<IType[]>;
  globalData: LoadingData<Map<number, LoadingData<IAlbum[]>>>;
  searchKey: string;
  tvData: ITV[];
  getVideoList: (param?: IQueryParam) => Promise<void>;
  searchVideoList: (param?: IQueryParam) => Promise<IAlbum[]>;
  getAlbumListByType: (typeId: number) => LoadingData<IAlbum[]>;
  getAlbumById: (albumId: string) => IAlbum,
  getVideoByVodIdAndVodName: (vod_id: string, vod_name: string) => Promise<IAlbum>;
  clearSearchResult: () => void;
  setSearchKey: (key: string) => void;
  setUpdate: (key: keyof IUpdate, value: any) => void;
}