import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import PaymentHistory from './PaymentHistory';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  dInline: {
    display: 'inline-block',
    marginRight: theme.spacing(1)
  },
  subheader: {
    color: '#7b7b7b'
  },
  link: {
    cursor: 'pointer'
  }
});

class TenantDashboard extends Component {
  state = {
    paymentArray: []
  }


  handleSelectedPayment = (paymentObjID) => {
    console.log(paymentObjID);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.history.push("/dashboard");
  }

  render() {
    const { classes } = this.props;
    const { selectedTenant, paymentArray } = this.props.location.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div className={classes.root} >
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" onClick={this.handleClick} className={classes.link}>
                    Home
                </Link>
                  <Typography color="textPrimary">{selectedTenant.name}</Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  {/* inner grid  */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Tenant Details
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Name</Typography>
                        <Typography variant="body1" className={classes.dInline}>{selectedTenant.name}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Address</Typography>
                        <Typography variant="body1" className={classes.dInline}>{selectedTenant.address}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Adhaar No</Typography>
                        <Typography variant="body1" className={classes.dInline}>{selectedTenant.adhaarNo}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Starting date</Typography>
                        <Typography variant="body1" className={classes.dInline}>{selectedTenant.fromDate}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Ending date</Typography>
                        <Typography variant="body1" className={classes.dInline}>{selectedTenant.toDate}</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Advanced</Typography>
                        <Typography variant="body1" className={classes.dInline}>₹{selectedTenant.advancedAmount}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Rent</Typography>
                        <Typography variant="body1" className={classes.dInline}>₹{selectedTenant.rentAmount}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Per unit charge</Typography>
                        <Typography variant="body1" className={classes.dInline}>₹{selectedTenant.chargePerUnit}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Starting unit</Typography>
                        <Typography variant="body1" className={classes.dInline}>{selectedTenant.startingUnit}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Latest unit</Typography>
                        <Typography variant="body1" className={classes.dInline}>
                          {selectedTenant.payments[0] ? selectedTenant.payments[0].currentUnit : 0}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Total Rent received</Typography>
                        <Typography variant="body1" className={classes.dInline}>₹</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Last Payment</Typography>
                        <Typography variant="body1" className={classes.dInline}></Typography>
                      </div>

                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <PaymentHistory
                  payment={paymentArray}
                  handleSelectedPayment={this.handleSelectedPayment}
                />
              </Grid>

            </Grid>


          </Container>
        </main>
      </div >

    );
  }

}


export default withStyles(styles, { withTheme: true })(TenantDashboard);