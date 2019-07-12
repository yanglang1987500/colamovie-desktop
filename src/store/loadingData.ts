import { observable, action, runInAction } from "mobx";
import _ from "lodash";

export default class LoadingData<T> {
  @observable
  isLoading: boolean = true;

  @observable
  isNoData: boolean = false;

  @observable
  data: T = null;
  get() {
    return this.data;
  }

  @action.bound
  setLoading() {
    this.isLoading = true;
    return this;
  }

  @action.bound
  setUnLoading() {
    this.isLoading = false;
  }

  @action.bound
  set(data: T) {
    this.setLoadedData(data);
  }
  @action.bound
  setLoadedData(data: T) {
    this.data = data;
    this.isLoading = false;

    const isArrayNoData = _.isArray(data) && (data as any).length <= 0;
    const isEmpty = _.isNull(data) || _.isUndefined(data);
    if (isArrayNoData || isEmpty) {
      this.isNoData = true;
    }
    return this;
  }
  constructor(initData: T) {
    this.data = initData;
  }
}
