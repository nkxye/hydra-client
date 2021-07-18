import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HistoryIcon from "@material-ui/icons/History";
import HelpIcon from "@material-ui/icons/Help";
import AddIcon from "@material-ui/icons/Add";
import LockIcon from "@material-ui/icons/Lock";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Pdf from "../../assets/Hydra_User_Guide.pdf";

//modal
import Modal from "@material-ui/core/Modal";

//password field with show/hide feature
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";

//for styling, will have to move to js later
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logo_hydra.png";
import hydraLogo from "../../assets/hydra_logo_green.png";

//icons
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SecurityIcon from "@material-ui/icons/Security";
import elevateIcon from "../../assets/elevateIcon.png";
import CloseIcon from "@material-ui/icons/Close";

// api
import {
  elevateRole,
  forgotPassword,
  changeUserPassword,
} from "./../../api/user";

// redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  collectUserToken,
  collectUserData,
  resetData,
} from "./../../redux/actions";

// helpers
import {
  getUserDataSession,
  checkUserAuth,
} from "./../../helpers/userAuthHelpers";
import { getTokenDataSession } from "./../../helpers/userTokenHelper";
import { getClientName } from "./../../helpers/clientHelpers";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10vh",
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },
  central: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "30px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  menu_button: {
    color: "#2e604a",
  },
  right_icons: {
    right: "0",
  },
  icon_styles: {
    color: "#2e604a",
  },

  modal: {
    position: "absolute",
    top: "20%",
    left: "35%",
    width: 471,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    borderRadius: 16,
    zIndex: 10,
    "@media (max-width: 768px)": {
      left: 0,
      left: "5%",
      width: "70vw",
      height: "54vh",
    },
  },
  elevate: {
    color: "#356F56",
    fontSize: 30,
    margin: 0,
    fontWeight: 700,
  },
  description: {
    color: "#676767",
    fontSize: 18,
    margin: 0,
  },
  passwordHeader: {
    paddingTop: 20,
    paddingBottom: 10,
    margin: 0,
    fontWeight: 500,
    fontSize: 20,
    color: "##676767",
  },
  loginButton: {
    color: "#FFFFFF",
    background: "#356F56",
    borderRadius: 13,
    width: 470,
    height: 50,
    fontSize: 20,
    textTransform: "none",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },
  forgotPassword: {
    color: "#356F56",
    paddingTop: 10,
    paddingBottom: 30,
    fontWeight: 500,
    fontSize: 17,
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },
  hoverTextForgot: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  wrong_password: {
    color: "tomato",
    textAlign: "left",
    paddingTop: 10,
    paddingBottom: 30,
    fontWeight: 500,
    fontSize: 17,
  },
  changePassword: {
    color: "#356F56",
    textAlign: "center",
    paddingTop: 25,
    fontWeight: 500,
    fontSize: 18,
  },
  last_up: {
    paddingLeft: "20px",
    color: "black",
  },
  last_up_text: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  is_wrong_pass: {
    border: "1px solid tomato",
    borderRadius: "4px",
    animation: "$shake 31s linear",
  },
  is_right_pass: {
    borderRadius: "4px",
  },
  "@keyframes shake": {
    "0%": {
      left: "-5px",
    },
    "100%": {
      right: "-5px",
    },
  },
  drawer_container: {
    width: 250,
  },
  forgotModal: {
    position: "absolute",
    top: "20%",
    left: "35%",
    width: 471,
    height: 220,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: 16,
    zIndex: 10,
    "@media (max-width: 768px)": {
      left: 0,
      left: "5%",
      width: "70vw",
      height: "54vh",
    },
  },
  forgotHeader: {
    color: "#356F56",
    fontSize: 30,
    margin: 0,
    fontWeight: 700,
    display: "inline",
  },
  forgotDescription: {
    color: "#676767",
    fontSize: 18,
    margin: 0,
    paddingTop: 15,
    paddingBottom: 30,
  },
  forgotButton: {
    color: "#FFFFFF",
    background: "#356F56",
    borderRadius: 13,
    width: 470,
    height: 50,
    fontSize: 20,
    textTransform: "none",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },

  closeIcon: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    color: "gray",
    paddingLeft: 450,
    "&:hover": {
      cursor: "pointer",
    },
  },

  changePasswordModal: {
    position: "absolute",
    top: "20%",
    left: "35%",
    width: 471,
    height: 350,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    borderRadius: 16,
    zIndex: 10,
    "@media (max-width: 768px)": {
      left: 0,
      left: "5%",
      width: "70vw",
      height: "54vh",
    },
  },
  changePasswordHeader: {
    color: "#356F56",
    fontSize: 30,
    margin: 0,
    fontWeight: 700,
  },
  passwordHeader: {
    paddingTop: 20,
    paddingBottom: 10,
    margin: 0,
    fontWeight: 500,
    fontSize: 20,
    color: "##676767",
  },
  changePasswordButton: {
    color: "#FFFFFF",
    background: "#356F56",
    borderRadius: 13,
    width: 470,
    height: 50,
    fontSize: 20,
    marginTop: 15,
    textTransform: "none",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
    "&:hover": {
      background: "white",
      border: "1px solid #356F56",
      color: "#356F56",
    },
  },
  buttonhover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const TopAppBar = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [changeOpen, setChangeOpen] = React.useState(false);
  const [state, setState] = useState({
    isLoggedIn: false,
    wrongPassword: false,
    drawer: false,
    forgotEmail: "",
  });
  const [values, setValues] = React.useState({
    password: "",
    new_password: "",
    confirm_password: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordValid: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (values.new_password === values.confirm_password) {
      //console.log("same");
      //console.log("Password is " + values.passwordValid);
      setValues((values) => ({
        ...values,
        passwordValid: true,
      }));
    } else {
      setValues((values) => ({
        ...values,
        passwordValid: false,
      }));
      console.log("not same");
    }
  }, [values.confirm_password]);

  // for drawer mobile
  const toggleDrawer = () => (event) => {
    setState({ ...state, drawer: !state.drawer });
  };

  // for logout
  const handleLogOut = () => {
    dispatch(resetData());
    localStorage.clear();
    getClientName();
    history.push("/home");
    window.location.reload();
  };

  // for menu dropdown
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // for modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setChangeOpen(false);
  };

  //forgotPassword modal open/close
  const handleOpenForgot = () => {
    handleClose();
    setForgotOpen(true);
  };
  const handleCloseForgot = () => {
    setForgotOpen(false);
  };
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  // change password modal
  const handleOpenChangePassword = () => {
    setAnchorEl(null);
    setState({
      drawer: false,
    });
    setChangeOpen(true);
  };
  const handleCloseChangePassword = () => {
    setChangeOpen(false);
  };
  // const handleClickShowConfirmPassword = () => {
  //   setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  // };

  // for mobile modal
  const handleOpenMobile = () => {
    setState({ ...state, drawer: !state.drawer });
    setOpen(true);
  };
  // decides which nav to display and if onboarding will show
  useEffect(() => {
    const isAuth = checkUserAuth();
    if (isAuth) {
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: checkUserAuth(),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: false,
      }));
    }
  }, []);

  //sets to redux
  useEffect(() => {
    const userSession = getUserDataSession();
    const tokenSession = getTokenDataSession();
    if (tokenSession !== false) {
      dispatch(collectUserToken(tokenSession));
    }
    if (userSession !== false) {
      dispatch(collectUserData(userSession));
    }
  }, [dispatch]);

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatchUserData = (userData) => {
    // dispatch data to redux store
    // don't save any password or sensitive data to redux
    // puropose is to save the callback from backend to redux
    dispatch(resetData());
    dispatch(collectUserData(userData));

    // save user data callback from backend to localStorage/session
    // don't save any password or sensitive data to localStorage/session
    localStorage.setItem("user-data", JSON.stringify(userData));
    console.log("set on localstorage");
  };

  const elevateSubmit = () => {
    // sets data
    let data = {
      password: values.password,
    };
    // calls api for elevateRole
    elevateRole(data, (callback) => {
      console.log(callback);
      if (callback.status === 202) {
        const userData = callback.data.user;
        const userInfo = {
          setupName: userData.setupName,
          email: userData.email,
          username: userData.username,
          token: callback.data.token,
        };
        dispatchUserData(userInfo);
        localStorage.setItem("token", JSON.stringify(callback.data.token));
        setTimeout(() => {
          history.push("/home");
          window.location.reload();
          handleClose();
        }, 10);
      } else if (callback.status === 406) {
        setState((prevState) => ({
          ...prevState,
          wrongPassword: true,
        }));
        console.log(state.wrongPassword);
      }
    });
  };

  const changePassSubmit = () => {
    let data = {
      password: values.new_password,
    };
    changeUserPassword(data, (callback) => {
      console.log(callback);
      window.location.reload();
    });
  };

  const forgetPass = () => {
    forgotPassword((callback) => {
      console.log(callback);
      const data = callback.data.recovery_email;
      setState({
        forgotEmail: data,
      });
    });
    setOpen(false);
    setTimeout(() => {
      setForgotOpen(true);
    }, 1000);
    //setTimeout because theres a delay when data has to be pulled from database.
  };

  const preventDefault = (event) => event.preventDefault();

  //elevate Role Modal
  const body = (
    <div className={classes.modal}>
      <h1 className={classes.elevate}>Elevate Role</h1>
      <p className={classes.description}>
        For security purposes, please enter your password to gain editing
        access.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          elevateSubmit();
        }}
      >
        <p className={classes.passwordHeader}>Password</p>
        <TextField
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          variant="outlined"
          onChange={handleChange("password")}
          autoComplete="password"
          required={true}
          fullWidth={true}
          className={
            !state.wrongPassword ? classes.is_right_pass : classes.is_wrong_pass
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        <Grid container>
          <Grid item xs={12}>
            <Typography
              className={classes.wrong_password}
              href="#"
              onClick={preventDefault}
            >
              {state.wrongPassword ? "Wrong Password!" : ""}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Typography
              className={classes.forgotPassword}
              href="#"
              onClick={() => forgetPass()}
            >
              <div className={classes.hoverTextForgot}>
                Forgot your password?
              </div>
            </Typography>
          </Grid>
        </Grid>

        <Button
          className={classes.loginButton}
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </form>
    </div>
  );

  //Forgot Password Modal
  const forgotPasswordModal = (
    <div className={classes.forgotModal}>
      <CloseIcon
        className={classes.closeIcon}
        onClick={() => setForgotOpen(false)}
      ></CloseIcon>
      <h1 className={classes.forgotHeader}>Hang in there!</h1>
      <p className={classes.forgotDescription}>
        A link has been sent to your recovery email address{" "}
        <b>{state.forgotEmail}</b> to reset your password.
      </p>
      <Button
        className={classes.forgotButton}
        type="submit"
        variant="contained"
        onClick={() => setForgotOpen(false)}
      >
        Okay, I'll check it out.
      </Button>
    </div>
  );

  //Change Password Modal
  const changePasswordModal = (
    <div className={classes.changePasswordModal}>
      <CloseIcon
        className={classes.closeIcon}
        onClick={handleCloseChangePassword}
      ></CloseIcon>
      <h1 className={classes.changePasswordHeader}>Change Password</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          changePassSubmit();
        }}
      >
        <Typography
          color="textSecondary"
          className="field-name"
          style={{ marginTop: "10px" }}
        >
          <b>New Password</b>
        </Typography>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth={true}
          size="small"
          type={values.showPassword ? "text" : "password"}
          value={values.new_password}
          onChange={handleChange("new_password")}
          autoComplete="password"
          required={true}
          label="Error"
          variant="outlined"
          color="black"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        {/* confirm password */}
        <Typography
          color="textSecondary"
          className="field-name"
          style={{ marginTop: "10px" }}
        >
          <b>Confirm New Password</b>
        </Typography>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          fullWidth={true}
          size="small"
          type={values.showConfirmPassword ? "text" : "password"}
          value={values.confirmPassword}
          onChange={handleChange("confirm_password")}
          autoComplete="password"
          required={true}
          label="Error"
          variant="outlined"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showConfirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        {!values.passwordValid ? (
          <Typography
            color="textSecondary"
            className="field-name"
            style={{
              marginTop: "10px",
              fontSize: 12,
              color: "tomato",
              fontWeight: "lighter",
            }}
          >
            Passwords are not the same!
          </Typography>
        ) : (
          <Typography
            color="textSecondary"
            className="field-name"
            style={{
              marginTop: "10px",
              fontSize: 12,
              color: "white",
              fontWeight: "lighter",
            }}
          >
            {"."}
          </Typography>
        )}

        <Button
          className={classes.changePasswordButton}
          type="submit"
          variant="contained"
          disabled={!values.passwordValid}
        >
          Update
        </Button>
      </form>
    </div>
  );

  return (
    <>
      {window.location.pathname != "/register" ? (
        <AppBar
          elevation={0}
          position="fixed"
          required={false}
          className={classes.header}
          style={{ backgroundColor: "#f6f6f6" }}
        >
          {smallScreen ? (
            <>
              <div>
                <Button onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </Button>

                <SwipeableDrawer
                  open={state.drawer}
                  onClose={toggleDrawer()}
                  onOpen={toggleDrawer()}
                >
                  <List className={classes.drawer_container}>
                    <Button>
                      <ListItem onClick={() => history.push("/history")}>
                        <ListItemIcon>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText>History</ListItemText>
                      </ListItem>
                    </Button>
                    <Button href={Pdf} target="_blank">
                      <ListItem>
                        <ListItemIcon>
                          <HelpIcon />
                        </ListItemIcon>
                        <ListItemText>Guide</ListItemText>
                      </ListItem>
                    </Button>
                    {/* only for logged in accounts */}
                    {state.isLoggedIn ? (
                      <>
                        <Button onClick={() => handleOpenChangePassword()}>
                          <ListItem>
                            <ListItemIcon>
                              <LockIcon />
                            </ListItemIcon>
                            <ListItemText>Change Password</ListItemText>
                          </ListItem>
                        </Button>
                        <Button>
                          <ListItem onClick={handleLogOut}>
                            <ListItemIcon>
                              <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                          </ListItem>
                        </Button>
                      </>
                    ) : (
                      <ListItem onClick={handleOpenMobile}>
                        <ListItemIcon>
                          <SecurityIcon />
                        </ListItemIcon>
                        <ListItemText>Elevate Role</ListItemText>
                      </ListItem>
                    )}
                  </List>
                </SwipeableDrawer>
                {/* Mobile View modal */}
                <div>
                  <Modal open={open} onClose={handleClose}>
                    {body}
                  </Modal>
                  <Modal open={changeOpen} onClose={handleClose}>
                    {changePasswordModal}
                  </Modal>
                  <Modal open={forgotOpen} onClose={handleCloseForgot}>
                    {forgotPasswordModal}
                  </Modal>
                </div>
              </div>
              <div
                item
                className="register-logo-container"
                onClick={() => history.push("/home")}
              >
                <img style={{ width: 50 }} src={hydraLogo} />
              </div>
              <div>
                <Button disabled>
                  <MenuIcon style={{ display: "none" }} />
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* first */}
              <div className={classes.last_up}>
                <Typography className={classes.last_up_text}></Typography>
              </div>
              {/* second */}
              <div className={classes.central}>
                <Button
                  onClick={() => history.push("/history")}
                  className={classes.menu_button}
                >
                  History
                </Button>
                <div
                  onClick={() => history.push("/home")}
                  className={classes.buttonhover}
                >
                  <img className={classes.logo} src={logo} />
                </div>
                <Button
                  href={Pdf}
                  target="_blank"
                  className={classes.menu_button}
                >
                  Guide
                </Button>
              </div>
              {/* third */}
              <div className={classes.right_icons}>
                {/* elevate icon */}
                {state.isLoggedIn ? (
                  // display if user is a guest
                  <IconButton
                    className={classes.icon_styles}
                    onClick={handleMenuClick}
                  >
                    <img src={elevateIcon} />
                  </IconButton>
                ) : (
                  // display if user is logged in
                  <IconButton
                    className={classes.icon_styles}
                    onClick={handleOpen}
                  >
                    <img src={elevateIcon} />
                  </IconButton>
                )}
                {/* Elevate Role modal */}
                {/* changePasswordModal and forgotPasswordModal */}
                <div>
                  <Modal open={open} onClose={handleClose}>
                    {body}
                  </Modal>
                </div>
                <div>
                  <Modal open={forgotOpen} onClose={handleCloseForgot}>
                    {forgotPasswordModal}
                  </Modal>
                </div>
                <div>
                  <Modal open={changeOpen} onClose={handleCloseChangePassword}>
                    {changePasswordModal}
                  </Modal>
                </div>
                {/* if user is logged in */}
                <div>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={menuOpen}
                    onClose={handleMenuClose}
                    TransitionComponent={Fade}
                    style={{ marginTop: 50 }}
                  >
                    {/* <MenuItem
                      style={{
                        textAlign: "right",
                        width: 200,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      onClick={handleMenuClose}
                    >
                      Add Another Setup
                    </MenuItem> */}
                    <MenuItem
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      onClick={() => handleOpenChangePassword()}
                    >
                      Change Password
                    </MenuItem>
                    <MenuItem
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      onClick={handleLogOut}
                    >
                      End Session
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </>
          )}
        </AppBar>
      ) : null}
    </>
  );
};

export default TopAppBar;
