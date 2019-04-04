import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { State } from "../store";
import IndexScreen from "../components/IndexScreen";

const mapStateToProps = (
  state: State,
  { navigation }: NavigationScreenProps,
) => ({
  navigation: navigation,

  annoys: state.annoys.items,
  activeAnnoys: state.annoys.active,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexScreen);
