import { ReactNode } from "react";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { refreshIsActive } from "../store/annoys/actions";
import { State } from "../store";
import Refresher from "../hocs/Refresher";

const mapStateToProps = (_: State, { children }: { children: ReactNode }) => ({
  children,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ refreshIsActive }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Refresher);
