import { Component, ReactNode } from "react";
import * as constants from "../constants";
import { Annoy } from "../types";
import { isAnnoyActive } from "./utils";

type Props = {
  children: ReactNode;

  annoys: Array<Annoy>;

  refreshIsActive: (active: Array<string>) => void;
};

/**
 * HOC for refreshin state of annoys.
 */
export default class Refresher extends Component<Props> {
  private refreshIntervalId?: number;

  refresh = () => {
    const active = this.props.annoys
      .filter(annoy => isAnnoyActive(annoy, new Date()))
      .map(({ id }) => id);

    this.props.refreshIsActive(active);
  };

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
