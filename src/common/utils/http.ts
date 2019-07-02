import axios, { AxiosPromise } from "axios";
import Qs from "qs";
import { HttpStatusType } from "@common/enums/base";
import objectAssignDeep from "@common/utils/objectAssignDeep";

export const baseURL = "/";

export const Api = {
  axios: axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }),
  header: (types: HeaderType[]) => {
    let header = { headers: {} };
    if (types.some(type => type === "formdata")) {
      header = objectAssignDeep(header, Api.withForm);
    }
    if (types.some(type => type === "xhr")) {
      header = objectAssignDeep(header, Api.withAspIsAjax);
    }
    if (types.some(type => type === "accept")) {
      header = objectAssignDeep(header, Api.withAccept);
    }
    return header;
  },
  withForm: {
    transformRequest: (data: Object) => Qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  },
  cancelRepsoneAutoParse: {
    transformResponse: (data: any, headers: any) => {
      if (typeof data === 'string' && headers["content-type"] === "application/json") {
        try {
          // tslint:disable-next-line:no-parameter-reassignment
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }
  },
  withAccept: {
    headers: {
      Accept: "*/*"
    }
  },
  withAspIsAjax: {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  }
};

type HeaderType = "formdata" | "xhr" | "accept";

export const Q = <T>(axiosPromise: AxiosPromise): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axiosPromise
    .then(response => resolve(response.data))
      .catch(error => {
        console.warn(`Q function error: ${error}`);
        reject(error);
      });
  });
};

export default Api.axios;
