import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { find } from "lodash";
import { updateAnnoy, deleteAnnoy } from "../store/annoys/actions";
import { State } from "../store";
import EditScreen from "../components/EditScreen";

const mapStateToProps = (
  state: State,
  { navigation }: NavigationScreenProps,
) => ({
  startHour: state.settings.startHour,
  endHour: state.settings.endHour,
  annoy: find(state.annoys.items, ({ id }) => id === navigation.getParam("id")),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ updateAnnoy, deleteAnnoy }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditScreen);
