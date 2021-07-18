import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// apis
import { registerUser } from "./../../api/user";

//icons
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SecurityIcon from "@material-ui/icons/Security";

// redux
import { collectUserData, resetData } from "./../../redux/actions/index";

//css
import "./../css/buttonStyles.css";

const useStyles = makeStyles((theme) => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: 20,
    },
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPage = history.location.pathname;
  const [values, setValues] = useState({
    username: "hyd-1",
    password: "",
    confirm_password: "",
    email: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordValid: false,
  });

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

  const submitRegister = () => {
    // sets data
    let data = {
      email: values.email,
      setupName: values.username,
      password: values.password,
    };
    // calls api to send data to backend
    registerUser(data, (callback) => {
      console.log(callback);
      if (callback.status === 201) {
        //sets data to be dispatched to redux
        const userData = callback.data.user;
        console.log(userData);
        const userInfo = {
          setupName: userData.setupName,
          email: userData.email,
          username: userData.username,
          token: callback.data.token,
        };
        dispatchUserData(userInfo);
        localStorage.setItem("token", JSON.stringify(callback.data.token));

        //after registration redirects user to homepgae
        setTimeout(() => {
          history.push("/home");
          window.location.reload();
        }, 10);
      }
    });
  };

  useEffect(() => {
    if (values.password === values.confirm_password) {
      console.log("same");
      console.log("Password is " + values.passwordValid);
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

  function validateEmail(email) {
    const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const preventDefault = (event) => event.preventDefault();

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // console.log(`Username: ${values.username}`);
          // console.log(`Email: ${values.email}`);
          // console.log(`Password: ${values.password}`);
          // console.log(`Confirm: ${values.confirmPassword}`);
          submitRegister();
        }}
      >
        {/* name */}
        <Typography color="textSecondary" className="field-name">
          <b>Setup Name</b>
        </Typography>
        <TextField
          className={classes.input_field}
          variant="outlined"
          fullWidth={true}
          disabled
          placeholder="hyd-1"
          size="small"
          value={values.username}
          onChange={handleChange("username")}
          inputProps={{
            style: {
              paddingTop: "18.5px",
              paddingBottom: "18.5px",
            },
          }}
        />
        <Typography variant="caption" color="textSecondary">
          Please enter a dash-separated name for your new HYDR•A setup.
        </Typography>
        {/* email */}
        <Typography
          color="textSecondary"
          className="field-name"
          style={{ marginTop: "10px" }}
        >
          <b>Recovery Email</b>
        </Typography>
        <TextField
          className={classes.input_field}
          variant="outlined"
          fullWidth={true}
          size="small"
          value={values.email}
          onChange={handleChange("email")}
          inputProps={{
            style: {
              paddingTop: "18.5px",
              paddingBottom: "18.5px",
            },
          }}
        />
        <Typography variant="caption" color="textSecondary">
          This pre-defined value will serve as the unique name for your setup.
        </Typography>
        {/* password */}
        <Typography
          color="textSecondary"
          className="field-name"
          style={{ marginTop: "10px" }}
        >
          <b>Password</b>
        </Typography>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth={true}
          size="small"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          autoComplete="password"
          required={true}
          label="Error"
          variant="outlined"
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
          <b>Confirm Password</b>
        </Typography>
        <OutlinedInput
          id="outlined-adornment-confirm-password"
          fullWidth={true}
          size="small"
          type={values.showConfirmPassword ? "text" : "password"}
          value={values.confirm_password}
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
        {/* submit button */}
        <Button
          type="submit"
          size="large"
          fullWidth={true}
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          disabled={!values.passwordValid}
        >
          Let's Get Started
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;
