import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigator from "./containers/Navigator";
import Refresher from "./containers/Refresher";
import Notifier from "./containers/Notifier";
import { store, persistor } from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Refresher>
            <Notifier>
              <Navigator />
            </Notifier>
          </Refresher>
        </PersistGate>
      </Provider>
    );
  }
}
