import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import Router from "./router";
import Store from "@store/index";
import Scrollbars from "react-custom-scrollbars";
import './index.less';
import { remote } from 'electron';
import PubSub from '@common/utils/pubsub';

const store = new Store();;
window.store = store;

const onScroll = (e: any) => {
  PubSub.notify('scroll', e.target.scrollTop);
  if (e.target.scrollTop + e.target.clientHeight + 50 >= e.target.scrollHeight) {
    PubSub.notify('scroll_bottom');
   }
};

let scroll: any = null;

PubSub.subscribe('scrollTo', (top: number) => {
  scroll && scroll.scrollTop(top);
});

ReactDOM.render(
  <Scrollbars autoHide onScroll={onScroll} ref={dom => scroll = dom}>
    <Provider store={store}>
      <Router />
    </Provider>
  </Scrollbars>,
  document.getElementById('app')
);

remote.app.update.check((error: any, body: any) => {
  if (error) {
    if (error === 'no_update_available') {
      return false;
    }
    return false
  }
  store.setUpdate('needUpdate', true);
  store.setUpdate('info', body);
});