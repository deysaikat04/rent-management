import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import PaymentForm from './PaymentForm';
import PaymentHistory from './PaymentHistory';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 20
  },
});

class TenantDashboard extends Component {
  state = {
    openDialog: false,
    selectedPayment: {}
  }

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  }
  handleDialogClose = () => {
    this.setState({ openDialog: false });
  }

  handleSelectedPayment = (paymentObjID) => {
    const { payment} = this.props;
    console.log(paymentObjID);
    let paymentObj = payment.filter(_ => _.id === paymentObjID);
    console.log(paymentObj);
  }


  render() {
    const { classes, payment, tenants } = this.props;
    const { openDialog } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <PaymentHistory payment={payment} handleSelectedPayment={this.handleSelectedPayment} />
            </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                  {/* <Deposits /> */}
                  {
                    tenants && tenants.length ? (
                      <div>{tenants[0].name}</div>
                    ) : (
                      <Typography>You don't have any tenant right now.</Typography>
                    )
                  }
                </Paper>
              </Grid>
             

            </Grid>

            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={this.handleDialogOpen}>
              <AddIcon />
            </Fab>
            {
              openDialog ? <PaymentForm openDialog={openDialog} handleDialogClose={this.handleDialogClose} /> : <></>
            }
          </Container>
        </main>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    payment: state.firestore.ordered.payment,
    tenants: state.firestore.ordered.tenants
  }
}


export default withStyles(styles, { withTheme: true })(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'payment' },
      { collection: 'tenants' }
    ])
  )(TenantDashboard)
);