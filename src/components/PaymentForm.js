import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { addPayment } from "../store/actions/paymentActions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    float: "right",
    margin: theme.spacing(2, 0),
  },
  buttonSave: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  total: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
});

class PaymentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: uuidv4(),
        monthName: moment(moment(), "M").format("MMMM"),
        year: moment().year(),
        noOfMonths: 1,
        rentAmount: 0,
        prevUnit: 0,
        currentUnit: "",
        unitConsumed: 0,
        electricBill: 0,
        total: 0,
        toc: moment().format("DD-MM-YYYY"),
        note: "",
      },
      tenantObj: {},
      tenantName: "",
      tenantId: "",
      startingUnit: 0,
      chargePerUnit: 0,
      prevPayments: [],
      fieldDisabled: true,
      currentUnitErr: false,
      loading: false,
    };
  }

  handlestarTingUnitChange = (event) => {
    this.setState({
      startingUnit: event.target.value,
    });
  };

  handleTenantSelectChange = (event) => {
    this.setState({ tenantName: event.target.value, fieldDisabled: false });
  };

  isEmpty = (inputObject) => {
    return Object.keys(inputObject).length === 0;
  };

  setTenantId = (tenantId) => {
    const { tenants } = this.props;
    const tenantObj = tenants.filter((_) => _.id === tenantId)[0];
    let prevPayments = [];
    let startingUnit = 0;

    if (tenantObj.payments) {
      for (let i in tenantObj.payments) {
        prevPayments.push(tenantObj.payments[i]);
      }
    }

    if (this.isEmpty(tenantObj.payments)) {
      startingUnit = tenantObj.startingUnit;
    } else {
      startingUnit = tenantObj.payments[0].currentUnit;
    }

    this.setState({
      tenantObj,
      tenantId,
      form: {
        ...this.state.form,
        rentAmount: tenantObj.rentAmount,
        prevUnit: startingUnit,
      },
      chargePerUnit: tenantObj.chargePerUnit,
      startingUnit,
      prevPayments,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "noOfMonths" && value > 0) {
      const { rentAmount } = this.state.tenantObj;
      const rentAmnt = rentAmount * value;
      this.setState({
        form: { ...this.state.form, [name]: value, rentAmount: rentAmnt },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const newPaymentArr = [{ ...this.state.form }, ...this.state.prevPayments];
    this.props.addPayment(
      newPaymentArr,
      this.state.tenantId,
      this.props.userid
    );
    setTimeout(() => {
      this.props.dialogAction("", false);
    }, 1500);
  };

  handleUnitChange = (event) => {
    const { name, value } = event.target;
    const { startingUnit, chargePerUnit } = this.state;
    const { rentAmount } = this.state.form;
    const unitConsumed = value - startingUnit;
    const electricBill = unitConsumed * chargePerUnit;
    const total = electricBill + rentAmount;
    if (startingUnit && Number(value) <= Number(startingUnit)) {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value ? Number(value) : "",
        },
        currentUnitErr: true,
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value ? Number(value) : "",
          unitConsumed,
          electricBill,
          total,
        },
        currentUnitErr: false,
      });
    }
  };

  render() {
    const {
      fieldDisabled,
      tenantName,
      startingUnit,
      chargePerUnit,
      currentUnitErr,
      loading,
    } = this.state;
    const {
      currentUnit,
      rentAmount,
      total,
      unitConsumed,
      electricBill,
      noOfMonths,
      note,
    } = this.state.form;
    const { classes, tenants } = this.props;
    const btnDisabled = total === 0 || fieldDisabled || currentUnitErr;

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Tenant Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                color="secondary"
                value={tenantName}
                onChange={this.handleTenantSelectChange}
                required
              >
                {tenants &&
                  tenants.map((tenant) => {
                    return (
                      <MenuItem
                        value={tenant.name}
                        key={tenant.id}
                        onClick={() => this.setTenantId(tenant.id)}
                      >
                        {tenant.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              autoFocus
              type="number"
              color="secondary"
              variant="standard"
              margin="dense"
              id="noOfMonths"
              name="noOfMonths"
              label="No of months"
              value={noOfMonths}
              onChange={this.handleChange}
              disabled={fieldDisabled}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              autoFocus
              type="number"
              color="secondary"
              variant="standard"
              margin="dense"
              id="amount"
              name="rentAmount"
              label="Amount"
              value={rentAmount}
              fullWidth
              readOnly
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              disabled={fieldDisabled}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <TextField
              type="number"
              color="secondary"
              variant="standard"
              margin="dense"
              id="prevUnit"
              name="prevUnit"
              label="Previous Unit*"
              value={startingUnit}
              onChange={this.handlestarTingUnitChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <TextField
              type="number"
              color="secondary"
              variant="standard"
              margin="dense"
              id="currentUnit"
              name="currentUnit"
              label="Current Unit*"
              value={currentUnit}
              onChange={this.handleUnitChange}
              fullWidth
              disabled={fieldDisabled}
              {...(currentUnitErr && {
                error: true,
                helperText: `Current unit should be greater than starting unit`,
              })}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <TextField
              color="secondary"
              variant="standard"
              margin="dense"
              id="unitConsumed"
              name="unitConsumed"
              label="Unit Consumed"
              value={unitConsumed}
              helperText={`x ${chargePerUnit}`}
              fullWidth
              readOnly
              disabled={fieldDisabled}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <TextField
              color="secondary"
              variant="standard"
              margin="dense"
              id="electricBill"
              name="electricBill"
              label="Electric Bill"
              value={electricBill}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              fullWidth
              readOnly
              disabled={fieldDisabled}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              color="secondary"
              variant="standard"
              margin="dense"
              id="note"
              name="note"
              label="Note"
              value={note}
              onChange={this.handleChange}
              fullWidth
              multiline
              rows={2}
              placeholder="Add some notes here..."
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <p>
              Total: <span className={classes.total}>₹{total}</span>
            </p>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <div className={classes.button}>
              <Button
                type="reset"
                variant="outlined"
                color="default"
                size="small"
                className={classes.buttonSave}
              >
                Reset
              </Button>
              {!loading && (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled={btnDisabled}
                >
                  Save
                </Button>
              )}
              {loading && (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  size="small"
                >
                  Saving
                </LoadingButton>
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tenants: state.firestore.ordered.tenants,
    payment: state.payment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPayment: (paymentObj, tenantId) =>
      dispatch(addPayment(paymentObj, tenantId)),
  };
};

export default withStyles(styles, { withTheme: true })(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
      return [
        {
          collection: "tenants",
          where: ["userId", "==", props.userid],
        },
      ];
    })
  )(PaymentDialog)
);
