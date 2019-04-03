import React, { Component, ReactNode } from "react";
import { refreshIsActive } from "../store/annoys/actions";
import { store } from "../store";
import * as constants from "../constants";

type Props = {
  children: ReactNode;
};

export default class Refersher extends Component<Props> {
  private refreshIntervalId?: number;

  refresh = () => store.dispatch(refreshIsActive(new Date()));

  componentDidMount() {
    this.refresh();

    this.refreshIntervalId = window.setInterval(
      this.refresh,
      constants.REFRESH_INTERVAL,
    );
  }

  componentWillUnmount() {
    if (this.refreshIntervalId) {
      window.clearInterval(this.refreshIntervalId);
    }
  }

  render() {
    return this.props.children;
  }
}
