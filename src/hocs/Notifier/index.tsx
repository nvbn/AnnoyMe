import { PureComponent, ReactNode } from "react";
import PushNotification from "react-native-push-notification";
import { flatMap } from "lodash";
import { Annoy, AnnoyItems } from "../../types";
import * as constants from "../../constants";
import { isAnnoyActive } from "../utils";
import { getDatesToSchedule, removePast } from "./scheduler";

type Props = {
  children: ReactNode;

  annoys: AnnoyItems;
  frequency: number;
};

type State = {
  datesToSchedule: Array<Date>;
  frequency: number;
};

/**
 * HOC that schedules notifications when annoys/frequency changes.
 */
export default class Notifier extends PureComponent<Props, State> {
  readonly state = {
    datesToSchedule: [],
    frequency: constants.DEFAULT_FREQUENCY,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (
      props.frequency === state.frequency ||
      props.frequency < constants.MIN_FREQUENCY
    ) {
      return state;
    }

    return {
      frequency: props.frequency,
      datesToSchedule: getDatesToSchedule(
        new Date(),
        props.frequency,
        constants.SCHEDULE_NOTIFICATIONS,
      ),
    };
  }

  componentDidMount() {
    PushNotification.configure({});

    requestAnimationFrame(() => this.rescheduleNotifications());
  }

  componentDidUpdate() {
    this.rescheduleNotifications();
  }

  getNotificationsOptions = (annoy: Annoy, dates: Array<Date>) =>
    dates
      .filter(date => isAnnoyActive(annoy, date))
      .map(date => ({
        message: annoy.title,
        group: annoy.id,
        date,
      }));

  rescheduleNotifications = () => {
    PushNotification.cancelAllLocalNotifications();

    const dates = removePast(
      new Date(),
      constants.FIRST_NOTIFICATION_DELAY,
      this.state.datesToSchedule,
    );

    const notificationsOptions = flatMap(this.props.annoys, annoy =>
      this.getNotificationsOptions(annoy, dates),
    );

    notificationsOptions.forEach(options =>
      requestAnimationFrame(() =>
        PushNotification.localNotificationSchedule(options),
      ),
    );
  };

  render() {
    return this.props.children;
  }
}
