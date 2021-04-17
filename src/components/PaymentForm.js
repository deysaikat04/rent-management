import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const styles = theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


class PaymentDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                rentAmount: 0,
                prevUnit: 0,
                currentUnit: 0,
                unitConsumed: 0,
                electricBill: 0,
                total: 0
            }
        }
    }



    render() {
        const { payment, tenants } = this.props;
        const lastPayment = payment && payment.length ? payment[0] : {};

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
    )(PaymentDialog)
);