import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import PaymentHistory from './PaymentHistory';
import { connect } from 'react-redux';
import { removeTenant } from '../store/actions/tenantAction';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  titleWithBtn: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
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
    minHeight: 150
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
    paymentArray: [],
    totalAmount: 0
  }

  componentDidMount = () => {
    const { paymentArray } = this.props.location.state;
    let totalAmount = 0;
    paymentArray.map(payment => {
      totalAmount += payment.total
      return 0
    });
    this.setState({ totalAmount });

  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.history.push("/dashboard");
  }

  deleteTenant = (id) => {
    this.props.removeTenant(id);
    this.props.history.push("/dashboard");
  }

  render() {
    const { classes } = this.props;
    const { selectedTenant, paymentArray } = this.props.location.state;
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
                {/* inner grid  */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <div className={classes.titleWithBtn}>
                      <Typography variant="h6" id="tableTitle">
                        Tenant Details
                    </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteOutlineIcon />}
                        size="small"
                        onClick={() => this.deleteTenant(selectedTenant.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Paper className={classes.paper}>
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
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Paper className={classes.paper}>
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
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Paper className={classes.paper}>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Total Rent received</Typography>
                        <Typography variant="body1" className={classes.dInline}>₹ {this.state.totalAmount}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" className={clsx(classes.dInline, classes.subheader)}>Last Payment Dt</Typography>
                        <Typography variant="body1" className={classes.dInline}>{paymentArray.length ? paymentArray[0].toc : ''}</Typography>
                      </div>
                    </Paper>

                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <PaymentHistory
                  payment={paymentArray}
                />
              </Grid>

            </Grid>


          </Container>
        </main>
      </div >

    );
  }

}


const mapDispatchToProps = (dispatch) => {
  return {
    removeTenant: (id) => dispatch(removeTenant(id))
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, mapDispatchToProps)(TenantDashboard)
);