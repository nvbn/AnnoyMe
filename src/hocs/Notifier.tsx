import { Component, ReactNode } from "react";
import PushNotification from "react-native-push-notification";
import { Annoy } from "../types";

type Props = {
  children: ReactNode;

  annoys: Array<Annoy>;
  frequency: number;

  refreshIsActive: (date: Date) => void;
};

export default class Notifier extends Component<Props> {
  componentDidMount() {
    PushNotification.configure({});
  }

  componentDidUpdate() {}

  rescheduleNotifications() {}

  render() {
    return this.props.children;
  }
}
