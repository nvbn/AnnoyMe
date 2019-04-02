import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createAnnoy } from "../store/annoys/actions";
import { State } from "../store";
import CreateScreen from "../components/CreateScreen";

const mapStateToProps = (state: State) => ({
  startHour: state.settings.startHour,
  endHour: state.settings.endHour,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createAnnoy }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateScreen);
