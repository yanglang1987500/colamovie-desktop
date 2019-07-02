import React from "react";
import * as _ from 'lodash';
import { history } from '@common/utils/history';
import Header from "./header";
import { Link } from "react-router-dom";

class History extends React.Component<ITypeWrapperProps, ITypeWrapperStates> {

  static options = {
    addGlobalClass: true
  }
  state: ITypeWrapperStates = {
    historyProgress: [],
    action: 'read'
  }

  componentDidMount() {
    const data: IProgresHistory = history.getAllProgressFromHistory();
    const list: IProgress[] = Object.keys(data).map(key => data[key]);
    this.setState({
      historyProgress: list
    });
  }

  removeHistory(vod_id: string, index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { historyProgress } = this.state;
    e.stopPropagation();
    e.preventDefault();
    history.removeProgressFromHistory({ vod_id }, index);
    this.setState({
      historyProgress: historyProgress
        .filter(progress => !(progress.index === index && progress.vod_id === vod_id))
    });
  }

  goToPlay(vod_id: string, index: number, vod_name: string){
    location.href = `#`;
  }

  toggleAction = () => {
    const { action } = this.state;
    this.setState({ action: action === 'edit' ? 'read' : 'edit' });
  }

  render() {
    const { historyProgress, action } = this.state;
    const list = _.groupBy(historyProgress, 'vod_name');
    const result = Object.keys(list).map((vod_name: string): IAlbumHistory => {
      return {
        vod_name,
        update_time: Math.max.apply(Math, list[vod_name].map(function(o) {return o.update_time})),
        vods: list[vod_name]
      }
    }).sort((a, b) => (b.update_time - a.update_time));
    return <div className='page'>
      <Header home back edit={result.length>0} onEdit={this.toggleAction} title="观看记录" />
      {result.length > 0 ? result.map((album: IAlbumHistory) => <div key={album.vod_name}>
        <div className='history_album_title' style={{ marginBottom: 10 }}>
          {decodeURIComponent(album.vod_name)}
        </div>
        <div className='video-history at-row at-row--wrap album-container' style={{ padding: 0, marginBottom: 20 }}>{
          album.vods.map(progress => <Link
              key={`${progress.vod_id}${progress.index}`}
              to={`/play?id=${progress.vod_id}&index=${progress.index}&vod_name=${progress.vod_name}`}>
            <div className='album-pic' style={{ width: 100, height: 155, margin: 10 }}>
              <div className='album-pic-image' style={{ backgroundImage: `url(${progress.vod_pic})`, height: 132 }}>
                <div className={`album-pic-action ${action === 'edit' ? 'show' : ''}`}
                    onClick={this.removeHistory.bind(this, progress.vod_id, progress.index)}>删除</div>
                <div className="album-pic-info">{history.sec_to_time(progress.time)}</div>
              </div>
              <label>{decodeURIComponent(progress.title)}</label>
            </div></Link>)
        }
      </div></div>) : <div className="no-data">没有数据~</div>}
    </div>;
  }
}
export default History;

interface ITypeWrapperProps {}
interface ITypeWrapperStates {
  historyProgress: IProgress[];
  action: 'edit' | 'read';
}