import React, { Component } from "react";
import DPlayer from "react-dplayer";

const fn = () => {};

export default class Player extends Component<IPlayerProps, IPlayerState> {

  player: any;

  componentDidMount() {
    this.seekTo();
  }

  componentDidUpdate(prevProps: IPlayerProps, prevState: IPlayerState) {
    if (this.props.url !== prevProps.url)
      this.seekTo();
  }

  seekTo = () => {
    const { initialTime } = this.props;
    setTimeout(() => {
      try {
        this.player && this.player.dp.seek(initialTime);
        this.player.dp.play();
      } catch(e) {}
    }, 10);
  }

  render() {
    const { url, initialTime, onProgress, poster, onEnded, height = 420 } = this.props;
    const props = { ...this.props };
    delete props.initialTime;
    return <DPlayer
      ref={(dom: any) => this.player = dom }
      width="100%"
      autoplay
      controls
      contextmenu={[]}
      onProgress={() => this.player && onProgress && onProgress(this.player.dp.video.currentTime)}
      onEnded={() => onEnded()}
      progressInterval={2000}
      style={{ height, background: 'transparent' }}
      video={{
        url,
        pic: poster,
        type: 'customHls',
        customType: {
          'customHls': function (video: any, player: any) {
            var engine = new window.p2pml.hlsjs.Engine();
            var hls = new window.Hls({
                liveSyncDurationCount: 7,
                loader: engine.createLoaderClass()
            });
            window.p2pml.hlsjs.initHlsJsPlayer(hls);
            hls.loadSource(video.src);
            hls.attachMedia(video);

          }
        }
      }}
      playing
    />;
  }
}

interface IPlayerProps {
  url: string;
  initialTime?: number;
  [key: string]: any;
  height?: any;
  onProgress?: (currentTime: number) => void;
  onEnded?:() => void;
}

interface IPlayerState {

}