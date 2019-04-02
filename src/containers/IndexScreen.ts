import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { State } from "../store";
import IndexScreen from "../components/IndexScreen";

const mapStateToProps = (
  state: State,
  { navigation }: NavigationScreenProps,
) => ({
  annoys: state.annoys.items,
  navigation: navigation,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexScreen);
