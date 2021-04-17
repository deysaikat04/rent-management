import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';


import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { firestoreConnect, fireStoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const styles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


class AddTenant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                address: '',
                adhaarNo: 0,
                fromDate: '',
                toDate: '',
                rentAmount: 0,
                chargePerUnit: 0,
            }
        }
    }



    render() {
        const { classes } = this.props;
        const { name, address, adhaarNo, fromDate, toDate, rentAmount, chargePerUnit } = this.state.form;
        return (
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography>{new Date().toDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <TextField
                            autoFocus
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="amount"
                            name="rentAmount"
                            label="Amount"
                            value={tenants && tenants[0].monthlyRent}
                            // onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                        // {...(error.amount && { error: true, helperText: 'This field is required.' })}
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
                            value={lastPayment.currentUnit}
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
                            id="currentUnit"
                            name="currentUnit"
                            label="Current Unit"
                            // value={updatedAmount}
                            // onChange={handleChange}
                            fullWidth
                        // {...(error.amount && { error: true, helperText: 'This field is required.' })}
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
                            value={10}
                            fullWidth
                            readOnly
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
                            value={150}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            fullWidth
                            readOnly
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Typography variant="h6">Total: ₹{2000}  </Typography>
                    </Grid>
                </Grid>
            </form>
        );
    }
}



export default withStyles(styles, { withTheme: true })(AddTenant);