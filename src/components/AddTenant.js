import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { connect } from 'react-redux';
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
                mobileNo: '',
                mobileNoSecond: '',
                fromDate: '',
                tenure: '',
                toDate: '',
                rentAmount: '',
                chargePerUnit: '',
                startingUnit: '',
                advancedAmount: '',
                payments: {}
            },
            formError: {
                fromDate: false,
                tenure: false,
            },
            btnActive: true
        }
    }


    handleChange = (event) => {
        const { name, value, type } = event.target;
        switch (type) {
            case 'number': {
                if (value >= 1) {
                    this.setState({
                        form: {
                            ...this.state.form,
                            [name]: parseInt(value)
                        }
                    });
                }
                break;
            }
            case 'text':
            case 'textarea': {
                if (value !== '') {
                    this.setState({
                        form: {
                            ...this.state.form,
                            [name]: value
                        }
                    });
                }
                break;
            }
            default: break;
        };
    }

    handleMobileChange = (event) => {
        const { name, value } = event.target;
        if (value.toString().length <= 10) {
            this.setState({
                form: {
                    ...this.state.form,
                    [name]: value
                }
            });
        }

    }

    handleAdhaarChange = (event) => {
        const { name, value } = event.target;
        let newNumber = value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        this.setState({
            form: {
                ...this.state.form,
                [name]: newNumber
            }
        });
    }

    handleDateChange = (event) => {
        const { name, value } = event.target;
        let ipDate = new Date(value).setHours(0, 0, 0, 0);
        const today = new Date().setHours(0, 0, 0, 0);
        if (ipDate < today) {
            this.setState({
                formError: {
                    ...this.state.formError, fromDate: true
                },
                form: {
                    ...this.state.form, [name]: ''
                }
            });
        } else {
            this.setState({
                formError: {
                    ...this.state.formError, fromDate: false
                },
                form: {
                    ...this.state.form, [name]: value
                }
            });
        }
    }

    handleTenureChange = (event) => {
        const { name, value } = event.target;
        if (value < 1 || value > 120) {
            this.setState({
                formError: {
                    ...this.state.formError, tenureErr: true
                },
                form: {
                    ...this.state.form, [name]: ''
                }
            });
        } else {
            this.setState({
                formError: {
                    ...this.state.formError, tenureErr: false
                },
                form: {
                    ...this.state.form, [name]: Number(value)
                }
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let toDate = moment().add(this.state.form.tenure, 'months').format("DD-MMMM-YYYY").toString();
        let fromDate = moment(this.state.form.fromDate).format("DD-MMMM-YYYY").toString();
        this.setState({
            form: { ...this.state.form, toDate, fromDate }
        }, () => {
            this.props.handleDialogClose();
            this.props.addTenant(this.state.form, this.props.userid);
        })
    }

    render() {
        const { classes, handleDialogClose } = this.props;
        const { name, address, adhaarNo, fromDate, tenure, rentAmount, chargePerUnit, startingUnit, advancedAmount,
            mobileNoSecond, mobileNo } = this.state.form;
        const { formError } = this.state;
        const btnActive = name && address && adhaarNo && fromDate && tenure && rentAmount && chargePerUnit && startingUnit
            && advancedAmount && mobileNo;
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
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="adhaarNo"
                            name="adhaarNo"
                            label="Adhaar No."
                            value={adhaarNo}
                            onChange={this.handleAdhaarChange}
                            fullWidth
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
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="mobileNo"
                            name="mobileNo"
                            label="Mobile No"
                            value={mobileNo}
                            onChange={this.handleMobileChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                            }}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            type="number"
                            color="secondary"
                            variant="standard"
                            margin="dense"
                            id="mobileNoSecond"
                            name="mobileNoSecond"
                            label="Mobile No #2"
                            value={mobileNoSecond}
                            onChange={this.handleMobileChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                            }}
                            fullWidth
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
                            onChange={this.handleDateChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                            {...(formError.fromDate && { error: true, helperText: `Please select today's date or future date` })}
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
                            onChange={this.handleTenureChange}
                            InputLabelProps={{ shrink: true }}
                            helperText={
                                fromDate && tenure ? `Contract end date ${moment().add(tenure, 'months').format("DD-MMMM-YYYY")}`
                                    : 'Please enter the number of months'
                            }
                            fullWidth
                            required
                            {...(formError.tenure && { error: true, helperText: `Please enter value more than 1 and less than 121` })}
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
                                disabled={!btnActive}
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
                </Grid>
            </form>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addTenant: (tenantObj, userId) => dispatch(addTenant(tenantObj, userId))
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(null, mapDispatchToProps)(AddTenant)
);