import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from '@mui/icons-material/Person';
import DialogComponent from "./DialogComponent";
import { logOut } from "../store/actions/authAction";
import { connect } from "react-redux";

const pages = [ "Add Tenant"];
const settings = ["Logout"];

class Navbar extends React.Component {
  state = {
    anchorElNav: null,
    anchorElUser: null,
  };

  handleOpenNavMenu = (event) => {
    this.setState({ anchorElNav: event.currentTarget });
  };
  handleOpenUserMenu = (event) => {
    this.setState({ anchorElUser: event.currentTarget });
  };

  handleCloseNavMenu = () => {
    this.setState({ anchorElNav: null });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorElUser: null });
  };

  handleNavMenuClick = (type) => {
    const isPayment = pages[0] === type ? "tenant" : "payment";
    this.handleCloseNavMenu();
    this.props.handleDialogState(isPayment, true);
  };

  handleUserMenu = () => {
    this.handleCloseNavMenu();
    this.handleLogout();
  };

  handleLogout = () => {
    this.props.logOut();
    Cookies.remove("userid", { path: "/" });
    window.location.reload();
  };
  render() {
    const { anchorElNav, anchorElUser } = this.state;
    const { classes, authed, dialogState, handleDialogState } = this.props;
    const userid = Cookies.get("userid");
    if (!authed) return <></>;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" style={{ background: "#3e3b3b" }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                RentKhata
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={this.handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => this.handleNavMenuClick(page)}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                RentKhata
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => this.handleNavMenuClick(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="John Doe">
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={this.handleUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <DialogComponent
          userid={userid}
          dialogState={dialogState}
          handleDialogState={handleDialogState}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default withStyles(null, { withTheme: true })(
  connect(null, mapDispatchToProps)(Navbar)
);
