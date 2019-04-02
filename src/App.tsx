import React, { Component } from "react";
import { Provider } from "react-redux";
import Navigator from "./containers/Navigator";
import { refreshIsActive } from "./store/annoys/actions";
import store from "./store";

export default class App extends Component {
  componentDidMount() {
    store.dispatch(refreshIsActive(new Date()));
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
