import React from 'react';
import { remote } from 'electron';
import { inject, observer } from 'mobx-react';
import { Business, IBusinessProps } from '@business/index';
import { Dot } from '@components';

@inject(Business)
@observer
class Update extends React.Component<IUpdateProps, IUpdateStates> {

  doUpdate() {
    const { setUpdate } = this.props;
    setUpdate('start', true);
    remote.app.update.update({
      onProgress: (progress: any) => setUpdate('progress', progress.percent),
      onError: (error: any) => console.log(error),
      onComplete: () => setUpdate('complete', true),
    });
  }

  render() {
    const { update, setUpdate } = this.props;
    if (!update.needUpdate) return null;
    const progress = Math.ceil(update.progress*100);
  
    return <div className="panel-bottom">
        <p>检测到新版本 {update.info.version}</p>
        {update.start && (progress !== 100 ? <p>下载进度：{`${progress}%`}</p> : <p>下载完毕，正在应用更新<Dot dots={6} /></p>)}
        {!update.start && <>
          <button onClick={() => this.doUpdate()}>立即更新</button>
          <button onClick={() => setUpdate("needUpdate", false)}>下次更新</button>
        </>}
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>;
  }
}

interface IUpdateProps extends Partial<IBusinessProps> {
}

interface IUpdateStates {
}

export default Update;