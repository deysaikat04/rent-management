import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PaymentHistory from './PaymentHistory';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  dInline: {
    display: 'inline-block',
    marginRight: theme.spacing(1)
  },
  subheader: {
    color: '#7b7b7b'
  }
});

class TenantDashboard extends Component {
  state = {
    paymentArray: []
  }


  handleSelectedPayment = (paymentObjID) => {
    // const { payment } = this.props;
    // console.log(paymentObjID);
    // let paymentObj = payment.filter(_ => _.id === paymentObjID);
    console.log(paymentObjID);
  }



  render() {
    const { classes, selectedTenant, paymentArray } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <Grid container spacing={3}>

        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            {/* inner grid  */}
            <Grid container spacing={3}>
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



    );
  }

}


export default withStyles(styles, { withTheme: true })(TenantDashboard);