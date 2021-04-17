import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import PaymentForm from './PaymentForm';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


class DialogComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        const { classes, title, openDialog, handleDialogClose, dialogType } = this.props;

        return (

            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleDialogClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {
                        dialogType === 'payment' ? <PaymentForm /> : <></>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={handleDialogClose} color="primary">
                        Agree
          </Button>
                </DialogActions>
            </Dialog >
        );
    }
}



export default withStyles(styles, { withTheme: true })(DialogComponent);