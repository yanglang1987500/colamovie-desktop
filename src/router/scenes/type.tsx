import React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import { Business, IBusinessProps } from "@business/index";
import { Link } from "react-router-dom";
import { Spin } from "@components";
import { getParam } from "@common/utils";
import Header from "./header";
import PubSub from "@common/utils/pubsub";

let top = 0;

@inject(Business)
@observer
class Type extends React.Component<ITypeProps, ITypeStates> {

  state: ITypeStates = {
    typeName: ''
  }

  componentDidMount() {
    const { getVideoList, getAlbumListByType } = this.props;
    const typeId = parseInt(getParam('id') || '0');
    this.setState({ typeName: getParam('name') || '' });
    const albumData = getAlbumListByType(typeId);
    albumData.data.length === 0 && getVideoList({ typeId: typeId, pageIndex: 1 });
    PubSub.notify('scrollTo', top);
    PubSub.subscribe('scroll_bottom', this.loadMore).subscribe('scroll', this.scroll);;
  }

  loadMore = () => {
    const { getVideoList, getAlbumListByType } = this.props;
    const typeId = parseInt(getParam('id') || '0');
    const album = getAlbumListByType(typeId);
    if (!album.isLoading) {
      album.setLoading();
      getVideoList({ typeId, pageIndex: album.data.length/40+1 });
    }
  }

  scroll = (scrollTop: number) => {
    top = scrollTop;
  }

  componentWillUnmount() {
    PubSub.unsubscribe('scroll_bottom', this.loadMore).unsubscribe('scroll', this.scroll);
  }

  render() {
    const { getAlbumListByType } = this.props;
    const typeId = parseInt(getParam('id') || '0');
    const data = getAlbumListByType(typeId);
    const list = (data.data).map((album: IAlbum) => ({
      id: album.vod_id,
      image: album.vod_pic,
      info: album.vod_continu,
      title: album.vod_name,
    }));
    return (
      <React.Fragment>
        <Header home search back title={decodeURIComponent(this.state.typeName)} />
        {list.length > 0 ? <div className='album-container'>
          {list.map((item: any) => <Link key={item.id} to={`/play?id=${item.id}`}><div className='album-pic scale'>
            <div className='album-pic-image' style={{ backgroundImage: `url(${item.image})` }}>
              {item.info && <div className="album-pic-info">{item.info}</div>}
            </div>
            <label>{item.title}</label>
          </div></Link>)}</div>
        : data.isNoData ? <div className="no-data">没有数据~</div> : <div className='page'>
          <Spin style={{ height: '80vh' }} />
        </div>}
        {data.isLoading && list.length > 0 && <Spin style={{ height: '160px' }} />}
      </React.Fragment>
    );
  }
}

interface ITypeProps extends Partial<IBusinessProps> { }

interface ITypeStates { 
  typeName: string;
}

export default Type;
