import { Component, ReactNode } from "react";
import * as constants from "../constants";

type Props = {
  children: ReactNode;

  refreshIsActive: (date: Date) => void;
};

export default class Refresher extends Component<Props> {
  private refreshIntervalId?: number;

  refresh = () => this.props.refreshIsActive(new Date());

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
