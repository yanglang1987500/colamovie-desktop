interface IIdName {
  id: string | number;
  name: string;
}

interface IPosition {
  x: number;
  y: number;
}

interface IFormatterData {
  name?: string;
  seriesName?: string;
  value?: number;
  key?: string;
  group?: string;
  id?: string;
}

interface IRouterConfig {
  title: string | React.ReactNode;
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  titleBar?: string;
  isShowBack?: boolean;
}
interface IQueryParam {
  key?: string;
  pageIndex?: number;
  typeId?: number;
  vodids?: string;
}

interface IData {
  [key: number]: IAlbum[];
}

interface IAlbum {
  vod_id: string;
  vod_cid: string;
  vod_name: string;
  vod_actor: string;
  vod_director: string;
  vod_content: string;
  vod_pic: string;
  vod_area: string;
  vod_year: string;
  vod_play: string;
  vod_url: string;
  vod_continu: string;
  list_name: string;
}

interface IPage {
  pageindex: string;
  pagecount: string;
  pagesize: string;
  recordcount: string;
}

interface IType {
  list_id: number;
  list_name: string;
}

interface IResult {
  status: number;
  page: IPage;
  data: IAlbum[];
  list: IType[];
}

interface IVideo {
  title: string;
  url: string;
  originIndex?: number;
}

interface IKeyValueMap {
  [key: string]: any;
}

interface IDevice {
  name: string,
  host: string,
  xml: string,
  type: string,
  play: (url: string, time: number) => void;
}

interface IAlbumType {
  id: number;
  name: string;
}

interface IProgresHistory {
  [key: string]: IProgress;
}

interface IProgress {
  vod_id: string;
  vod_name: string;
  vod_pic: string;
  index: number;
  time: number;
  title?: string;
  update_time: number;
}

interface IAlbumHistory {
  vod_name: string;
  update_time: number;
  vods: IProgress[];
}

interface IPlayerProcess {
  played: number; playedSeconds: number; loaded: number; loadedSeconds: number;
}

interface IUpdate {
  needUpdate?: boolean;
  progress?: number;
  start?: boolean;
  complete?: boolean;
  info?: IUpdateInfo;
}

interface IUpdateInfo {
  name: string;
  version: string;
  asar: string;
  info: string;
}

interface ITV {
  title: string;
  url: string;
}

