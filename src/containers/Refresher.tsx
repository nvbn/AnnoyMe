import { ReactNode } from "react";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { refreshIsActive } from "../store/annoys/actions";
import { State } from "../store";
import Refresher from "../hocs/Refresher";

type OwnProps = {
  children: ReactNode;
};

const mapStateToProps = (_: State, { children }: OwnProps) => ({ children });

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ refreshIsActive }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Refresher);
