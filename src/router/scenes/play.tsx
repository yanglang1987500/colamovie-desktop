import React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import { Business, IBusinessProps } from "@business/index";
import { RouteComponentProps, Link } from 'react-router-dom';
import { Spin } from "@components";
import { getParam, isMac } from '@common/utils';
import Header from "./header";
import Player from 'react-player';
import DLNA from '@common/utils/dlna';
import { history } from '@common/utils/history';

@inject(Business)
@observer
class Play extends React.Component<IPlayProps, IPlayStates> {

  player: any;

  state: IPlayStates = {
    album: null,
    expand: false,
    current: 0,
    isAsc: true,
    videoList: [],
    iina: false,
    dlnaDrawer: false,
    dlnaSearching: false,
    devices: []
  };


  componentDidMount() {
    const { getAlbumById, getVideoByVodIdAndVodName, match } = this.props;
    const albumId = getParam('id');
    const albumName = getParam('vod_name');
    const album = getAlbumById(albumId);

    if (!album) {
      getVideoByVodIdAndVodName(albumId, albumName).then(album => {
        this.dealWithAlbumAndIndex(album);
        this.seekTo();
      });
      return;
    };
    this.dealWithAlbumAndIndex(album);
    this.seekTo();
  }

  componentWillUnmount() { }

  componentDidUpdate(prevProps: IPlayProps, prevState: IPlayStates) {
    this.seekTo();
  }

  seekTo() {
    setTimeout(() => {
      this.player && this.player.seekTo(this.getProgressFromHistory(), 'seconds');
    }, 10);
  }

  dealWithAlbumAndIndex(album: IAlbum) {
    const index = getParam('index');
    const videoList = this.extractVideoListFromAlbum(album);
    this.setState({
      album: album,
      current: index ? parseInt(index, 10) : 0,
      videoList: videoList.map((video, index) => ({ ...video, originIndex: index }))
    });
  }

  extractVideoListFromAlbum(album: IAlbum) {
    return album.vod_url.split('$$$')
      .map(i => i.split(/\s+/gi)
        .map(i => {
          let arr = [];
          if (i.indexOf('$') === -1) {
            arr = i.split('http');
            return { title: arr[0], url: `http${arr[1]}` };
          }
          arr = i.split('$');
          return { title: arr[0], url: arr[1] };
        })
      ).reduce((p, c) => { return p.concat(c) }, [])
      .filter(video => video.url.endsWith('m3u8'));
  }
  
  onNext = () => {
    const { current, videoList } = this.state;
    this.removeProgressFromHistory();
    if (current < videoList.length - 1) {
      this.setState({ current: current + 1 });
    }
  }

  onTimeUpdate(e: IPlayerProcess) {
    const { playedSeconds } = e;
    if (playedSeconds < 5) return;
    const { album, current, videoList } = this.state;
    history.updateProgressToHistory(album, current,
      playedSeconds, videoList.find(v => v.originIndex === current).title);
  }

  removeProgressFromHistory() {
    const { album, current } = this.state;
    history.removeProgressFromHistory(album, current);
  }
  
  getProgressFromHistory() {
    const { album, current } = this.state;
    return history.getProgressFromHistory(album, current);
  }

  onPushBtnClick = async () => {
    this.setState({ dlnaDrawer: true, dlnaSearching: true });
    const devices = await DLNA.start();
    this.setState({
      devices,
      dlnaSearching: false
    });
    DLNA.stop();
  }

  render() {
    const { videoList, current, album, expand, isAsc, iina, devices, dlnaSearching } = this.state;
    const list = isAsc ? videoList : [...videoList].reverse();
    const url = list.length > 0 ? list.find(video => video.originIndex === current).url : '';
    return list.length > 0 ? <div className='page'>
      <div style={{ backgroundImage: `url(${album.vod_pic})`}} className="album_img_filter" />
      <div className="filter_main">
          <Header home back search push onPush={this.onPushBtnClick} title={album.vod_name} />
          {!iina && <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Player
              ref={dom => this.player = dom }
              onProgress={(data: IPlayerProcess) => this.onTimeUpdate(data)}
              style={{ display: 'inline-block'}}
              width="100%"
              controls
              progressInterval={2000}
              url={url}
              playing
            />
          </div>}
          <div className="dib">
            <div className="video-desc">
              <img className="play-album-pic" src={album.vod_pic} />
            </div>
          </div>
          <div className="dib right-info">
            <div className="video-desc">片名： {album.vod_name}</div>
            <div className="video-desc">导演： {album.vod_director}</div>
            <div className="video-desc">演员： {album.vod_actor}</div>
            <div className="video-desc">介绍： {album.vod_content}</div>
            { isMac() && <div className="video-desc">调用iina播放： <input type="checkbox" onChange={() => this.setState({ iina: !iina })} /></div>}
          </div>
          
          <div className={`video-desc at-row at-row--wrap choose-list ${expand ? 'expand' : ''}`}>
            <div className="choose-list-wrap">{list.map((video: IVideo) => (
              <a
                key={video.url}
                href={iina ? `iina://open?url=${encodeURIComponent(url)}` : 'javascript:void(0)'}
              >
                <div
                  key={video.originIndex}
                  onClick={() => this.setState({ current: video.originIndex })}
                  className={`choose-item ${video.originIndex == current && 'choosen'}`}
                >
                  {video.title}
                </div>
              </a>))}
            </div>
          </div>     
        </div>
        <Drawer
          open={this.state.dlnaDrawer}
          onMaskClick={() => { this.setState({ dlnaDrawer: false }); DLNA.stop();}}
          handler={false}
          level={null}
          width="280px"
        >
          {dlnaSearching ? <Spin dark style={{ height: '80vh' }} /> : <div className="device-list">
            <ul>
              {devices.length > 0 ? devices.map(device => <li key={device.host} onClick={() => {
                DLNA.play(device, url);
                this.setState({ dlnaDrawer: false });
              }}>{device.name}</li>) : <div style={{ height: 200, lineHeight: '200px', textAlign: 'center' }}>没有搜索到设备……</div>}
            </ul>
          </div>}
        </Drawer>
      </div> : <div className='page' style={{ minHeight: 200, position: 'relative' }}>
        <Spin style={{ height: '80vh' }} />
      </div>;
  }
}

interface IPlayProps extends Partial<IBusinessProps>, Partial<RouteComponentProps> { }

interface IPlayStates {
  current: number;
  expand: boolean;
  isAsc: boolean;
  album: IAlbum;
  videoList: IVideo[];
  iina: boolean;
  dlnaDrawer: boolean;
  dlnaSearching: boolean;  
  devices: IDevice[];
}

export default Play;
