import React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import { Business, IBusinessProps } from "@business/index";
import { Link } from "react-router-dom";
import { Spin } from "@components";
import Header from "./header";


@inject(Business)
@observer
class Home extends React.Component<IHomeProps, IHomeStates> {

  componentDidMount() {
    const { getVideoList } = this.props;
    getVideoList();
  }

  render() {
    const { getAlbumListByType } = this.props;
    const data = getAlbumListByType(0);
    const list = (data.data).map((album: IAlbum) => ({
      id: album.vod_id,
      image: album.vod_pic,
      info: album.vod_continu,
      title: album.vod_name,
    }));
    return (
      <React.Fragment>
        <Header back={false} classify search history tv title="最新" />
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
      </React.Fragment>
    );
  }
}

interface IHomeProps extends Partial<IBusinessProps> { }

interface IHomeStates { }

export default Home;
