import React from "react";
import { Business, IBusinessProps } from "@business/index";
import { Link } from "react-router-dom";
import { Spin } from "@components";

const fn = () => {};

class Header extends React.Component<IHeaderProps, IHeaderStates> {

  state: IHeaderStates = {
    editable: false
  };

  render() {
    const { title = '', back = true, search = false, classify = false, home = false, tv = false,
      history = false, push = false, edit = false, onHome = fn, onEdit = fn, onPush = fn, onBack = fn } = this.props;
    const { editable } = this.state;
    return (
      <React.Fragment>
        <div className="header-bar">
          <div className="left-toolbar">
            {back && <span className="iconfont icon-backoff icon-btn" onClick={() => { window.history.back(); onBack(); }} title="返回" />}
            {home && <span className="iconfont icon-home icon-btn" onClick={() => { onHome(); location.replace('#/') }} title="首页" />}
          </div>
          {title && <span style={{ textAlign: 'center', lineHeight: 3 }} >{title}</span>}
          <div className="right-toolbar">
            {edit && <span
              style={{ color: editable ? 'red' : ''}}
              className="iconfont icon-list-remove icon-btn"
              onClick={() => { this.setState({ editable: !editable }); onEdit(); }}
              title={editable ? '完成' : '编辑'}
            />}
            {search && <span className="iconfont icon-search1 icon-btn" onClick={() => window.location.href="#/search"} title="搜索" />}
            {push && <span className="iconfont icon-tv icon-btn" onClick={() => onPush()} title="投屏" />}
            {classify && <span className="iconfont icon-classify icon-btn" onClick={() => window.location.href="#/types"} title="分类" />}
            {history && <span className="iconfont icon-history icon-btn" onClick={() => window.location.href="#/history"} title="观看记录" />}
            {tv && <span className="iconfont icon-tv_icon icon-btn" onClick={() => window.location.href="#/tvs"} title="电视台" />}
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}

interface IHeaderProps extends Partial<IBusinessProps> { 
  title?: string;
  back?: boolean;
  search?: boolean;
  classify?: boolean;
  history?: boolean;
  push?: boolean;
  edit?: boolean;
  home?: boolean;
  tv?: boolean;
  onHome?: () => void;
  onPush?: () => void;
  onBack?: () => void;
  onEdit?: () => void;
}

interface IHeaderStates {
  editable: boolean;
}

export default Header;
