import React, { Component } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import PaymentHistory from "./PaymentHistory";
import { connect } from "react-redux";
import { removeTenant } from "../store/actions/tenantAction";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadFile from "./UploadFile";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  titleWithBtn: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: 150,
    boxShadow: "1px 1px 12px #e2e2e2cc",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  dInline: {
    display: "inline-block",
    marginRight: theme.spacing(1),
    textAlign: "right",
  },
  subheader: {
    color: "#7b7b7b",
  },
  link: {
    cursor: "pointer",
  },
  space: {
    display: "flex",
    justifyContent: "space-between",
  },
  panelDetails: {
    boxShadow: "rgb(240 240 240) 2px 10px 12px",
  },
});

class TenantDashboard extends Component {
  state = {
    paymentArray: [],
    totalAmount: 0,
    expanded: "panel1",
  };

  handleAccordionChange = (panel) => (event, newExpanded) => {
    this.setState({
      expanded: newExpanded ? panel : false,
    });
  };

  componentDidMount = () => {
    const { paymentArray } = this.props.location.state;
    let totalAmount = 0;
    paymentArray.map((payment) => {
      totalAmount += payment.total;
      return 0;
    });
    this.setState({ totalAmount });
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.history.push("/dashboard");
  };

  deleteTenant = (id) => {
    this.props.removeTenant(id);
    this.props.history.push("/dashboard");
  };
  render() {
    const { classes } = this.props;
    const { selectedTenant, paymentArray, documents } = this.props.location.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    color="inherit"
                    onClick={this.handleClick}
                    className={classes.link}
                  >
                    Home
                  </Link>
                  <Typography color="textPrimary">
                    {selectedTenant.name}
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                {/* inner grid  */}
                <Grid container spacing={3}>
                  <Grid item xs={10} md={10} lg={10}>
                    <div style={{ display: "flex" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ mr: 2 }}
                      />
                      <Typography variant="h6" id="tableTitle">
                        {selectedTenant.name}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
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
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <Accordion
                      expanded={this.state.expanded === "panel1"}
                      onChange={this.handleAccordionChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Basic Details</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.panelDetails}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Paper className={classes.paper}>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Adhaar No
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.adhaarNo}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Mobile#1
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.mobileNo}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Mobile#2
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.mobileNoSecond}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Address
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.address}
                                </Typography>
                              </div>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Paper className={classes.paper}>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Advanced
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  ₹{selectedTenant.advancedAmount}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Rent
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  ₹{selectedTenant.rentAmount}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Per unit charge
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  ₹{selectedTenant.chargePerUnit}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Starting unit
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.startingUnit}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Last unit
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.payments[0]
                                    ? selectedTenant.payments[0].currentUnit
                                    : 0}
                                </Typography>
                              </div>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Paper className={classes.paper}>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Starting date
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.fromDate}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Ending date
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {selectedTenant.toDate}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Total Rent received
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  ₹ {this.state.totalAmount}
                                </Typography>
                              </div>
                              <div className={classes.space}>
                                <Typography
                                  variant="body2"
                                  className={clsx(
                                    classes.dInline,
                                    classes.subheader
                                  )}
                                >
                                  Last Payment Dt
                                </Typography>
                                <Typography
                                  variant="body1"
                                  className={classes.dInline}
                                >
                                  {paymentArray.length
                                    ? paymentArray[0].toc
                                    : ""}
                                </Typography>
                              </div>
                            </Paper>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  <Grid item xs={12} md={12} lg={12}>
                    <Accordion
                      expanded={this.state.expanded === "panel2"}
                      onChange={this.handleAccordionChange("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Documents</Typography>
                      </AccordionSummary>
                      <AccordionDetails>                        
                        <UploadFile
                          userId={this.props.userid}
                          tenantId={selectedTenant.id}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <PaymentHistory payment={paymentArray} />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeTenant: (id) => dispatch(removeTenant(id)),
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(null, mapDispatchToProps)(TenantDashboard)
);
