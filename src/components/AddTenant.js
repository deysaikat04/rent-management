import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { connect } from 'react-redux';
import { firestoreConnect, fireStoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addTenant } from '../store/actions/tenantAction';

const styles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    button: {
        float: 'right',
        margin: theme.spacing(2, 0)
    },
    buttonSave: {
        marginRight: theme.spacing(1)
    }
});


class AddTenant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                address: '',
                adhaarNo: '',
                fromDate: '',
                tenure: '',
                toDate: '',
                rentAmount: '',
                chargePerUnit: '',
                startingUnit: '',
                advancedAmount: '',
                payments: {}
            }
        }
    }

    handleChange = (event) => {
        const { name, value, type } = event.target;
        this.setState({
            form: { ...this.state.form, [name]: type === 'number' ? parseInt(value) : value }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let toDate = moment().add(this.state.form.tenure, 'months').format("YYYY-DD-MM").toString();
        this.setState({
            form: { ...this.state.form, toDate }
        }, () => {
            this.props.handleDialogClose();
            this.props.addTenant(this.state.form);
        })

    }



    render() {
        const { classes, handleDialogClose } = this.props;
        const { name, address, adhaarNo, fromDate, tenure, rentAmount, chargePerUnit, startingUnit, advancedAmount } = this.state.form;
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            autoFocus
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            value={name}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        // {...(error.amount && { error: true, helperText: 'This field is required.' })}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="adhaarNo"
                            name="adhaarNo"
                            label="Adhaar No."
                            value={adhaarNo}
                            onChange={this.handleChange}
                            fullWidth
                        // {...(error.amount && { error: true, helperText: 'This field is required.' })}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <TextField
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="address"
                            name="address"
                            label="Address"
                            value={address}
                            onChange={this.handleChange}
                            fullWidth
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="date"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="fromDate"
                            name="fromDate"
                            label="From Date"
                            value={fromDate}
                            onChange={this.handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="tenure"
                            name="tenure"
                            label="Tenure"
                            value={tenure}
                            onChange={this.handleChange}
                            InputLabelProps={{ shrink: true }}
                            helperText={
                                fromDate && tenure ? `Contract end date ${moment().add(tenure, 'months').format("YYYY-DD-MM")}`
                                    : 'Please enter value for Contract end date'
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="advancedAmount"
                            name="advancedAmount"
                            label="Advance amount"
                            value={advancedAmount}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="rentAmount"
                            name="rentAmount"
                            label="Rent per month"
                            value={rentAmount}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            fullWidth
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="startingUnit"
                            name="startingUnit"
                            label="Starting unit"
                            value={startingUnit}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="chargePerUnit"
                            name="chargePerUnit"
                            label="Charge per unit"
                            value={chargePerUnit}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            fullWidth
                            readOnly
                        />
                    </Grid>


                    <Grid item xs={12} md={12} lg={12}>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.buttonSave}
                                size="small"
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={() => handleDialogClose()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Grid>
                    {/* <Grid item xs={6} md={6} lg={6}>
                        <Typography variant="h6">Total: <Typography>{new Date().toDateString()}</Typography>  </Typography>
                    </Grid> */}
                </Grid>
            </form>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addTenant: (tenantObj) => dispatch(addTenant(tenantObj))
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(AddTenant)
);