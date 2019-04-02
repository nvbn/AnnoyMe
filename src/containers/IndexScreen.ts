import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { State } from "../store";
import IndexScreen from "../components/IndexScreen";

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexScreen);
