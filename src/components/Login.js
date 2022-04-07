import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { addUser, signIn, logIn } from "../store/actions/authAction";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  header: {
    justifyContent: "center",
    textAlign: "center",
    margin: "0 auto",
  },
  image: {
    height: 150,
    width: 150,
  },
  googleButton: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
    color: `#ffffff !important`,
  },
  greentext: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(4),
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
});

class Login extends Component {
  state = {
    open: false,
    openDialog: false,
    dialogType: "",
    selectedTenant: {},
    showTenantHistory: false,
    paymentArray: [],
    loading: false,
    form: {
      email: "",
      password: "",
    },
    email: "",
    password: "",
    showForm: false,
  };

  responseGoogle = (response) => {
    this.setState({ loading: true });
    try {
      if (response.profileObj) {
        const { googleId, name, email } = response.profileObj;
        const { expires_at } = response.tokenObj;
        document.cookie =
          "userid=" +
          googleId +
          ";expires=" +
          new Date(expires_at).toUTCString() +
          ";path=/";
        const userObj = {
          googleId,
          name,
          email,
        };
        this.props.addUser(userObj);
        setTimeout(() => {
          window.location.pathname = "/dashboard";
          this.setState({ loading: false });
        }, 2500);
      } else {
        this.setState({ loading: false });
      }
    } catch (e) {
      this.setState({ loading: false });
      console.error(e);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEmailLogin = () => {
    const { email, password } = this.state;
    this.props.logIn({ email, password });
  };

  render() {
    const userid = Cookies.get("userid");
    const authed = userid !== undefined;

    const { classes } = this.props;
    const { userId, error } = this.props.auth;
    const { showForm, loading, email, password } = this.state;

    if (authed) {
      this.setState({ loading: false });
      window.location.pathname = "/dashboard";
    } else
      return (
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Box>
              <img src="/tree.svg" className={classes.image} alt="tree" />
            </Box>
            <Box className={classes.header}>
              <Typography variant="h6">RentKhata</Typography>
              <Typography variant="subtitle2">
                Your rent management application
              </Typography>
            </Box>
            {showForm && (
              <Box component="form" style={{ marginTop: "16px" }}>
                <Typography component="h1" variant="body2">
                  Log in using Email
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  variant="standard"
                  onChange={this.handleChange}
                  value={email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  variant="standard"
                  onChange={this.handleChange}
                  value={password}
                />
                {error && (
                  <Typography
                    component="h1"
                    variant="caption"
                    style={{ color: "red" }}
                  >
                    Invalid email or password
                  </Typography>
                )}
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={this.handleEmailLogin}
                >
                  Log In
                </Button>
              </Box>
            )}
            {loading && (
              <Box className={classes.loader}>
                <CircularProgress />
              </Box>
            )}
            {!loading && (
              <Box className={classes.button}>
                {showForm && (
                  <Typography
                    component="h1"
                    variant="body2"
                    style={{ marginBottom: "16px" }}
                  >
                    - OR -
                  </Typography>
                )}
                <GoogleLogin
                  clientId="7001392389-o4koed2ng3b9c1odq1sk78ep3om7bvu0.apps.googleusercontent.com"
                  className={classes.googleButton}
                  buttonText="Login with Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Box>
            )}

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
    signIn: (userId) => dispatch(signIn(userId)),
    logIn: (creds) => dispatch(logIn(creds)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
