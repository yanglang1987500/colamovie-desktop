import React from 'react';
import classnames from 'classnames';
import './index.less';

const Spin = (props: ISpinProps) => {
  const { strokeWidth = 3, width = 50, className, style = {}, color, dark } = props;
  const styleObj = color ? { stroke: color } : {};
  return <div className={classnames('sn-loader', className)} style={{ width: width, ...style }}>
    <svg className={'circular'} viewBox="25 25 50 50">
      <circle
        className={classnames('path', dark && 'dark')}
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth={strokeWidth}
        style={styleObj}
        strokeMiterlimit="10"
      />
    </svg>
  </div>;
};

interface ISpinProps {
  strokeWidth?: number;
  width?: number;
  className?: string;
  style?: Object;
  color?: string;
  dark?: boolean;
}

export default Spin;
