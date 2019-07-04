import React from "react";
import { inject, observer } from "mobx-react";
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import { Business, IBusinessProps } from "@business/index";
import { RouteComponentProps, Link } from 'react-router-dom';
import { Spin, Player } from "@components";
import { getParam, isMac } from '@common/utils';
import Header from "./header";
import DLNA from '@common/utils/dlna';

@inject(Business)
@observer
class TvPlay extends React.Component<ITvPlayProps, ITvPlayStates> {

  state: ITvPlayStates = {
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
    const { iina, devices, dlnaSearching } = this.state;
    const { tvData } = this.props;
    const tvIndex = getParam('tvIndex');
    const tvItem = tvData[parseInt(tvIndex || 0)];
    const url = tvItem.url;
    return <div className='page' style={{padding: 0}}>
        <Header home back search push onPush={this.onPushBtnClick} title={tvItem.title} />
        {!iina && <div style={{ textAlign: 'center' }}>
          <Player
            style={{ display: 'inline-block', verticalAlign: 'top'}}
            width="100%"
            height="calc(100vh - 70px)"
            controls
            url={url}
            playing
          />
        </div>}
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
      </div>;
  }
}

interface ITvPlayProps extends Partial<IBusinessProps>, Partial<RouteComponentProps> { }

interface ITvPlayStates {
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

export default TvPlay;
