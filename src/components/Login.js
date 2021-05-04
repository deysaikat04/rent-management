import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { GoogleLogin } from "react-google-login";
import { connect } from 'react-redux';
import { addUser, signIn } from '../store/actions/authAction';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  button: {
    marginTop: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 auto'
  },
  image: {
    height: 150,
    width: 150
  },
  googleButton: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    color: `#ffffff !important`
  },
  greentext: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(4),
  }
});

class Login extends Component {
  state = {
    open: false,
    openDialog: false,
    dialogType: '',
    selectedTenant: {},
    showTenantHistory: false,
    paymentArray: []
  }


  responseGoogle = (response) => {
    try {
      const { googleId } = response.profileObj;
      const { expires_at } = response.tokenObj;
      document.cookie =
        "userid=" +
        googleId +
        ";expires=" +
        new Date(expires_at).toUTCString() +
        ";path=/";

      window.location.pathname = "/dashboard"
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Box >
            <img src='/tree.svg' className={classes.image} alt="tree" />
          </Box>
          <Box className={classes.header}>
            <Typography variant="h6">
              RentKhata
        </Typography>
            <Typography variant="subtitle2">
              Your rent management application
        </Typography>
          </Box>
          <Box className={classes.button}>
            <GoogleLogin
              clientId="7001392389-o4koed2ng3b9c1odq1sk78ep3om7bvu0.apps.googleusercontent.com"
              className={classes.googleButton}
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
          <Box className={classes.greentext}>
            <Typography variant="subtitle2">
              Save paper, save trees.
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (userObj) => dispatch(addUser(userObj)),
    signIn: (userId) => dispatch(signIn(userId))
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(null, mapDispatchToProps)(Login)
);