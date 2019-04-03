import { ReactNode } from "react";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { refreshIsActive } from "../store/annoys/actions";
import { State } from "../store";
import Notifier from "../hocs/Notifier";

type OwnProps = {
  children: ReactNode;
};

const mapStateToProps = (state: State, { children }: OwnProps) => ({
  children,
  annoys: state.annoys.items,
  frequency: state.settings.frequency,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ refreshIsActive }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier);
