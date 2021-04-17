import React, { Component } from 'react';
import clsx from 'clsx';
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
import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import DialogComponent from './DialogComponent';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
  }
});

class Home extends Component {
  state = {
    open: false,
    openDialog: false,
    dialogType: '',
    selectedPayment: {}
  }


  handleDialogOpen = (type) => {
    this.setState({ openDialog: true, dialogType: type });
  }
  handleDialogClose = () => {
    this.setState({ openDialog: false, dialogType: '' });
  }

  handleSelectedPayment = (paymentObjID) => {
    const { payment } = this.props;

    // let paymentObj = payment.filter(_ => _.id === paymentObjID);
  }


  render() {
    const { classes, payment, tenants } = this.props;
    const { openDialog, dialogType } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={4} md={4} lg={4}>
                <Paper className={clsx(classes.contentCenter, fixedHeightPaper)}>
                  <Typography variant="body2">
                    No of Tenants:
                  </Typography>
                  <Typography variant="h4">
                    1
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4} md={4} lg={4}>
                <Paper className={clsx(classes.contentCenter, fixedHeightPaper)}>
                  <Typography variant="body2">
                    No of Rooms:
                  </Typography>
                  <Typography variant="h4">
                    1
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4} md={4} lg={4}>
                <Paper className={clsx(classes.contentCenter, fixedHeightPaper)}>
                  <Typography variant="body2">
                    No of Persons living:
                  </Typography>
                  <Typography variant="h4">
                    3
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>

                  <Grid container spacing={3}>

                    <Grid xs={12} md={12} lg={12}>
                      <div className={classes.titleWithBtn}>
                        <Typography variant="h6">
                          Current Tenants:
                      </Typography>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className={classes.button}
                          endIcon={<AddIcon />}
                          size="small"
                          onClick={() => this.handleDialogOpen("tenant")}
                        >
                          Add
                      </Button>
                      </div>
                    </Grid>

                    <Grid xs={12} md={4} lg={4}>
                      <Chip
                        icon={<AccountCircleIcon />}
                        label="Primary clickable"
                        clickable
                        color="primary"
                      // onDelete={handleDelete}
                      />
                    </Grid>

                  </Grid>


                </Paper>
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
                  title={"Add Payment"}
                  dialogType={dialogType}
                />
              ) : <></>
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
  )(Home)
);