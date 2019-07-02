import React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import Toast from 'react-little-toast';
import { Business, IBusinessProps } from "@business/index";
import { Link } from "react-router-dom";
import { Spin } from "@components";
import Header from "./header";

const hots = ['神盾局特工', '进击的巨人'];
const HISTORY_KEY = 'colakeywords';

@inject(Business)
@observer
class Search extends React.Component<IBusinessProps, ISearchStates> {
  state: ISearchStates = {
    loading: false,
  };


  saveKeywordsToHistory(keyword: string) {
    const list = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    list.push(keyword);
    const set = new Set(list);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(Array.from(set)));
  }

  readKeywordsFromHistory(): string[] {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  }

  clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    this.forceUpdate();
  }

  doSearch = async () => {
    const { searchKey } = this.props;
    const keyword = searchKey.trim();
    if (!keyword) return;
    this.setState({ loading: true });
 
    const { searchVideoList } = this.props;
    const result = await searchVideoList({ key: keyword });
    if (result.length === 0) {
      Toast.info({
        message: '没有搜到结果……',
        timeout: 3000,
      });
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: false });
    this.saveKeywordsToHistory(keyword);
  }

  clear = () => {
    const { setSearchKey, clearSearchResult } = this.props;
    setSearchKey('');
    clearSearchResult();
  }

  render () {
    const { loading } = this.state;
    const { searchAlbumList, clearSearchResult, setSearchKey, searchKey } = this.props;
    const historyKeywords = this.readKeywordsFromHistory();
    const albumList = searchAlbumList.data;
    return <div className='page'>
      <Header home back title="搜索" onBack={this.clear} onHome={this.clear} />
      <div style={{ position:'relative'}}>
        <input
          className="form-item"
          name='search'
          onKeyPress={(e) => e.nativeEvent.keyCode === 13 && this.doSearch()}
          placeholder='请输入影片名称'
          value={searchKey}
          onChange={(e) => { setSearchKey(e.target.value) }}
        />
        <div className="search-clear" onClick={this.clear}>
          <span className='iconfont icon-clear icon-btn' style={{ fontSize: 25 }}></span>
        </div>
      </div>
      {albumList.length > 0 ? <div className='album-container'>
          {albumList.map((item: IAlbum) => <Link key={item.vod_id} to={`/play?id=${item.vod_id}`}><div className='album-pic scale'>
            <div className='album-pic-image' style={{ backgroundImage: `url(${item.vod_pic})` }}>
              {item.vod_continu && <div className="album-pic-info">{item.vod_continu}</div>}
            </div>
            <label>{item.vod_name}</label>
          </div></Link>)}</div>
        : <div className="search-suggestion">
          <div className="search-type">热门搜索：</div>
          <div>{hots.map(str => <div className="at-tag" key={str} onClick={() => { setSearchKey(str); setTimeout(this.doSearch)}}>
              {str}
            </div>)}
          </div>
          <div className="search-type">历史搜索：
            <div onClick={this.clearHistory} style={{color:'#B3E7FF',fontSize:'12px',marginLeft:20,float:'right', cursor: 'pointer'}}>清空历史</div>
          </div>
          <div>{historyKeywords.map(str => <div key={str} className="at-tag" onClick={() => {setSearchKey(str); setTimeout(this.doSearch)}}>
              {str}
            </div>)}
          </div>
      </div>}
      {loading && <div className='globalmask'><Spin style={{ height: '100vh' }} /></div>}
    </div>;
  }
}

interface ISearchStates {
  loading: boolean;
}


export default Search;