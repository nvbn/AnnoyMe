import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
  setStartHour,
  setEndHour,
  setFrequency,
} from "../store/settings/actions";
import { State } from "../store";
import SettingsScreen from "../components/SettingsScreen";

const mapStateToProps = (state: State) => ({
  startHour: state.settings.startHour,
  endHour: state.settings.endHour,
  frequency: state.settings.frequency,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setStartHour,
      setEndHour,
      setFrequency,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);
