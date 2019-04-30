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
  startHour: number;
  endHour: number;
};

type State = {
  datesToSchedule: Array<Date>;
  frequency: number;
  startHour: number;
  endHour: number;
};

/**
 * HOC that schedules notifications when annoys/frequency changes.
 */
export default class Notifier extends PureComponent<Props, State> {
  readonly state = {
    datesToSchedule: [],
    startHour: -1,
    endHour: -1,
    frequency: constants.DEFAULT_FREQUENCY,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (
      (props.frequency === state.frequency ||
        props.frequency < constants.MIN_FREQUENCY) &&
      state.datesToSchedule.length &&
      state.startHour === props.startHour &&
      state.endHour === props.endHour
    ) {
      return state;
    }

    return {
      frequency: props.frequency,
      startHour: props.startHour,
      endHour: props.endHour,
      datesToSchedule: getDatesToSchedule(
        new Date(),
        constants.SCHEDULE_NOTIFICATIONS,
        props.frequency,
        props.startHour,
        props.endHour,
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
