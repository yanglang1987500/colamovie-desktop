import React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import { Business, IBusinessProps } from "@business/index";
import { RouteComponentProps, Link } from 'react-router-dom';
import { Spin } from "@components";
import Header from "./header";

@inject(Business)
@observer
class Tvs extends React.Component<ITypeWrapperProps> {

  render() {
    const { tvData } = this.props;
    return <React.Fragment>
      <Header home search back title="电视台列表" />
      <div className='at-row at-row--wrap types-container'>
        {tvData.map((item, index) => <span className="type-link" key={item.title} >
          <div className='types-metro at-col at-col-4' key={item.title} onClick={() => location.href = `#/tvplay?tvIndex=${index}`}>
            <label>{item.title}</label>
          </div>
        </span>)}
      </div>
    </React.Fragment>;
  }
}
export default Tvs;

interface ITypeWrapperProps extends Partial<IBusinessProps> {
  typeId?: number;
}