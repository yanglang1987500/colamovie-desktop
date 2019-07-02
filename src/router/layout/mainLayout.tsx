import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { mainRouterList } from "./config";
import { inject } from "mobx-react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Update from "@containers/update";

class MainLayout extends React.Component<IMainLayoutProps, IMainLayoutStates> {

  render() {
    const { location } = this.props;
    return (
      <div className="body_wrapper">
        <Switch key={location.pathname} location={location}>
          {mainRouterList.map(config => (
            <Route exact key={config.path} path={config.path} component={config.component} title={config.title} />
          ))}
          <Route key="unmatch" component={() => <Redirect to="/" />} />
        </Switch>
        <Update />
      </div>
    );
  }
}

interface IMainLayoutProps extends RouteComponentProps {}

interface IMainLayoutStates {}

export default MainLayout;
