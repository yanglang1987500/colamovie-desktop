import React from "react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import { Business, IBusinessProps } from "@business/index";
import { RouteComponentProps, Link } from 'react-router-dom';
import { Spin } from "@components";
import Header from "./header";

@inject(Business)
@observer
class Types extends React.Component<ITypeWrapperProps> {

  static options = {
    addGlobalClass: true
  }

  render() {
    const { typeList } = this.props;
    const list = typeList.data;
    return <React.Fragment>
      <Header home search back title="影片分类" />
      <div className='at-row at-row--wrap types-container'>
        {list.map(item => <span className="type-link" key={item.list_id} >
          <div className='types-metro at-col at-col-4' key={item.list_id} onClick={() => location.href = `#/type?id=${item.list_id}&name=${item.list_name}`}>
            <label>{item.list_name}</label>
          </div>
        </span>)}
      </div>
    </React.Fragment>;
  }
}
export default Types;

interface ITypeWrapperProps extends Partial<IBusinessProps> {
  typeId?: number;
}