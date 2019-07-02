import React, { Component } from "react";
import ReactPlayer from 'react-player';

const fn = () => {};

export default class Player extends Component<IPlayerProps, IPlayerState> {

  player: ReactPlayer;

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
      this.player && this.player.seekTo(initialTime, 'seconds');
    }, 10);
  }

  render() {
    const { url, initialTime } = this.props;
    const props = { ...this.props };
    delete props.initialTime;
    return <ReactPlayer
      ref={dom => this.player = dom }
      style={{ display: 'inline-block'}}
      width="100%"
      controls
      progressInterval={2000}
      url={url}
      playing
      {...props}
    />;
  }
}

interface IPlayerProps {
  url: string;
  initialTime?: number;
  [key: string]: any;
}

interface IPlayerState {

}