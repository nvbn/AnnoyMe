import { Component, ReactNode } from "react";
import PushNotification from "react-native-push-notification";
import { range } from "lodash";
import { differenceInMinutes, addDays, addMinutes } from "date-fns";
import { AnnoyItems } from "../types";
import * as constants from "../constants";
import { isAnnoyActive } from "../utils";

type Props = {
  children: ReactNode;

  annoys: AnnoyItems;
  frequency: number;

  refreshIsActive: (date: Date) => void;
};

export default class Notifier extends Component<Props> {
  componentDidMount() {
    PushNotification.configure({});

    this.rescheduleNotifications();
  }

  componentDidUpdate() {
    this.rescheduleNotifications();
  }

  rescheduleNotifications = () => {
    PushNotification.cancelAllLocalNotifications();

    const start = new Date();
    const end = addDays(start, constants.SCHEDULE_NOTIFICATIONS);

    const minutesToSchedule = differenceInMinutes(end, start);

    const dates = range(0, minutesToSchedule, this.props.frequency).map(
      offset => addMinutes(start, offset),
    );

    for (const annoy of Object.values(this.props.annoys)) {
      for (const date of dates) {
        if (isAnnoyActive(annoy, date)) {
          PushNotification.localNotificationSchedule({
            message: annoy.title,
            date,
          });
        }
      }
    }
  };

  render() {
    return this.props.children;
  }
}
