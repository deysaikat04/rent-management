import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import PaymentForm from "./PaymentForm";
import AddTenant from "./AddTenant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
class DialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dialogAction = (type, shouldOpen) => {
    this.props.handleDialogState(type, shouldOpen);
  };

  render() {
    const { classes, userid, dialogState } = this.props;
    const title =
      dialogState.dialogType === "payment" ? "Add Payment" : "Add Tenant";
    const isPaymentDialog = dialogState.dialogType === "payment";
    return (
      <Dialog
        open={Boolean(dialogState.shouldOpen)}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"sm"}
        onClose={() => this.dialogAction("", false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
          <Typography variant="body2">
            {moment().format("DD-MMMM-YYYY").toString()}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => this.dialogAction("", false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {isPaymentDialog ? (
            <PaymentForm userid={userid} dialogAction={this.dialogAction} />
          ) : (
            <AddTenant userid={userid} dialogAction={this.dialogAction} />
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DialogComponent);
