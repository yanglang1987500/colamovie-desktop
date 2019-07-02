import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { Spin } from "@components";
import classnames from "classnames";

class ScrollList extends React.Component<IScrollListProps, IScrollListStates> {
  scroll: Scrollbars;

  onScroll = (event: React.UIEvent<any>) => {
    const { loadMore, loading } = this.props;
    if (loading) return;
    if (
      this.scroll.getClientHeight() + this.scroll.getScrollTop() ===
      this.scroll.getScrollHeight()
    ) {
      loadMore();
    }
  }

  render() {
    const {
      children,
      height = 500,
      loading = false,
      loadingComponent = (
        <Spin
          strokeWidth={5}
          width={25}
          style={{ margin: "20px auto", height: React.Children.count(children) === 0 ? 200 : 'auto' }}
        />
      )
    } = this.props;
    return (
      <Scrollbars
        ref={dom => {
          this.scroll = dom;
        }}
        renderThumbHorizontal={() => <div style={{ width: 0 }} />}
        autoHeightMax={height}
        autoHeight
        onScroll={this.onScroll}
      >
        {children}
        {loading && loadingComponent}
      </Scrollbars>
    );
  }
}

interface IScrollListProps {
  height?: number;
  loading: boolean;
  loadingComponent?: React.ReactNode;
  loadMore: () => void;
}

interface IScrollListStates { }

export default ScrollList;
