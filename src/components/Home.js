import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import DialogComponent from './DialogComponent';
import TenantDashboard from './TenantDashboard';
import TenantCard from './TenantCard';
import { resetState } from '../store/actions/tenantAction';
import { resetPaymentState } from '../store/actions/paymentActions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Crafted with love by Saikat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  contentCenter: {
    justifyContent: 'center',
    textAlign: 'center'
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
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(0, 1),
  },
  fixedHeight: {
    height: 140,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 20
  },
  titleWithBtn: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  nameChip: {
    margin: theme.spacing(1),
    border: '1px solid #aeb7e6'
  },
  nameChipSelected: {
    margin: theme.spacing(1),
    // backgroundColor: '#e9ecff  !important',
    // boxShadow: '0px 2px 8px 4px #d5d8ea',
    border: '1px solid #3f51b5'
  }
});

class Home extends Component {
  state = {
    open: false,
    openDialog: false,
    dialogType: '',
    selectedTenant: {},
    showTenantHistory: false,
    paymentArray: []
  }


  handleDialogOpen = (type) => {
    this.setState({ openDialog: true, dialogType: type });
  }

  handleDialogClose = () => {
    this.setState({ openDialog: false, dialogType: '' });
  }

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.resetState();
  };

  handleAlertCloseForPayment = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.resetPaymentState();
  };

  showTenant = (tenantId) => {
    const { tenants } = this.props;
    let paymentArray = [];
    const tenantObj = tenants.filter(_ => _.id === tenantId)[0];

    for (let index in tenantObj.payments) {
      paymentArray.push(tenantObj.payments[index]);
    }
    this.setState({ selectedTenant: tenantObj, showTenantHistory: true, paymentArray });
  }

  render() {
    const { classes, userid, tenants, hasError, hasPaymentError } = this.props;
    const { openDialog, dialogType, showTenantHistory, selectedTenant, paymentArray } = this.state;

    if (showTenantHistory) {
      return <Redirect
        to={{ pathname: "/history", state: { selectedTenant: selectedTenant, paymentArray: paymentArray } }}
      />
    }

    return (
      <div className={classes.root} >
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>

                  <Grid container spacing={3}>

                    <Grid item xs={12} md={12} lg={12}>
                      <div className={classes.titleWithBtn}>
                        <Typography variant="h6">
                          Current Tenants:
                      </Typography>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className={classes.button}
                          startIcon={<AddIcon />}
                          size="small"
                          onClick={() => this.handleDialogOpen("tenant")}
                        >
                          Add
                      </Button>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <Grid container spacing={3}>
                        {
                          tenants && tenants.map(tenant => {
                            return <Grid item xs={12} sm={6} md={4} lg={3} key={tenant.id}>
                              <TenantCard
                                tenant={tenant}
                                showTenant={this.showTenant}
                              />
                            </Grid>
                          })
                        }
                      </Grid>

                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                {
                  showTenantHistory ? (
                    <TenantDashboard selectedTenant={selectedTenant} paymentArray={paymentArray} />
                  ) : <></>
                }
              </Grid>

            </Grid>

            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => this.handleDialogOpen("payment")}>
              <AddIcon />
            </Fab>
            <Box pt={4}>
              <Copyright />
            </Box>
            {
              openDialog ? (
                <DialogComponent
                  openDialog={openDialog}
                  handleDialogClose={this.handleDialogClose}
                  title={dialogType === "payment" ? "Add Payment" : "Add Tenant"}
                  userid={userid}
                  dialogType={dialogType}
                />
              ) : <></>
            }
            {
              !hasError ? (
                <Snackbar open={!hasError} autoHideDuration={2000} onClose={this.handleAlertClose}
                  style={{ marginBottom: '32px' }}>
                  <Alert onClose={this.handleAlertClose} severity={'success'}>
                    Tenant added successfully!
                  </Alert>
                </Snackbar>
              ) : null
            }
            {
              !hasPaymentError ? (
                <Snackbar open={!hasPaymentError} autoHideDuration={2000} onClose={this.handleAlertClose}
                  style={{ marginBottom: '32px' }}>
                  <Alert onClose={this.handleAlertClose} severity={'success'}>
                    Payment added successfully!
                  </Alert>
                </Snackbar>
              ) : null
            }
          </Container>
        </main>
      </div >
    );
  }

}


const mapStateToProps = (state) => {
  return {
    tenants: state.firestore.ordered.tenants,
    hasError: state.tenants.error,
    hasPaymentError: state.payment.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetState: () => dispatch(resetState()),
    resetPaymentState: () => dispatch(resetPaymentState())
  }
}

export default withStyles(styles, { withTheme: true })(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
      return [
        {
          collection: 'tenants',
          where: ['userId', '==', props.userid]
        }
      ]
    })
  )(Home)
);