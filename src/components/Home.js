import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import TenantDashboard from './TenantDashboard';


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
  },
  nameChip: {
    marginRight: theme.spacing(1)
  }
});

class Home extends Component {
  state = {
    open: false,
    openDialog: false,
    dialogType: '',
    selectedTenant: {},
    showTenantHistory: false
  }


  handleDialogOpen = (type) => {
    this.setState({ openDialog: true, dialogType: type });
  }

  handleDialogClose = () => {
    this.setState({ openDialog: false, dialogType: '' });
  }

  showTenant = (tenantId) => {
    const { tenants } = this.props;
    const tenantObj = tenants.filter(_ => _.id === tenantId)[0];
    this.setState({ selectedTenant: tenantObj, showTenantHistory: true });
  }

  render() {
    const { classes, tenants } = this.props;
    const { openDialog, dialogType, showTenantHistory, selectedTenant } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={6} lg={6}>
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
                          endIcon={<AddIcon />}
                          size="small"
                          onClick={() => this.handleDialogOpen("tenant")}
                        >
                          Add
                      </Button>
                      </div>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      {
                        tenants && tenants.map(tenant => {
                          return <Chip
                            key={tenant.id}
                            icon={<AccountCircleIcon />}
                            label={tenant.name}
                            clickable
                            color="primary"
                            className={classes.nameChip}
                            variant="outlined"
                            onClick={() => this.showTenant(tenant.id)}
                          />
                        })
                      }
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={classes.paper}>
                  <Typography variant="body2">
                    Latest:
                  </Typography>
                  <Typography variant="h4">
                    1
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={8}>
                {
                  showTenantHistory ? (
                    <TenantDashboard selectedTenant={selectedTenant} />
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
                  dialogType={dialogType}
                />
              ) : <></>
            }
          </Container>
        </main>
      </div >
    );
  }

}


const mapStateToProps = (state) => {
  return {
    tenants: state.firestore.ordered.tenants
  }
}


export default withStyles(styles, { withTheme: true })(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'tenants' }
    ])
  )(Home)
);