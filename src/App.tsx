import React, { Component } from "react";
import { Provider } from "react-redux";
import Navigator from "./containers/Navigator";
import store from "./store";
import { refreshIsActive } from "./store/annoys/actions";
import * as constants from "./constants";

export default class App extends Component {
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
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
