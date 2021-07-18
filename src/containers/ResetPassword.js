import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// api
import { resetPassword } from "./../api/user";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10vh",
  },
  changePasswordModal: {
    marginTop: "15vh",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    width: "100%",
  },
  changePasswordHeader: {
    color: "#356F56",
    margin: 0,
    fontWeight: 700,
  },
  changePasswordButton: {
    color: "#FFFFFF",
    background: "#356F56",
    borderRadius: 13,
    width: "100%",
    fontSize: 16,
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
}));

function ResetPassword(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    new_password: "",
    confirm_password: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordValid: false,
  });
  const resetToken = window.location.pathname.replace([/reset/], "");

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };
  const history = useHistory();

  const changePassSubmit = () => {
    let data = {
      password: values.new_password,
      token: resetToken,
    };
    resetPassword(data, (callback) => {
      console.log(callback);
      history.push("/home");
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  useEffect(() => {
    if (values.new_password === values.confirm_password) {
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

  return (
    <>
      {/* <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Typography>Sheesh</Typography>
        </Grid>
      </Grid> */}
      <div className={classes.changePasswordModal}>
        <div
          style={{
            backgroundColor: "white",
            boxShadow:
              "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
            "&:hover": {
              cursor: "pointer",
            },
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Typography
            className={classes.changePasswordHeader}
            style={{ fontSize: smallScreen ? 18 : 30 }}
          >
            Change Password
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              changePassSubmit();
            }}
            style={{ width: smallScreen ? "100%" : "25vw" }}
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
            {/* <Button onClick={() => console.log(pathname)}>Sheesh</Button> */}
          </form>
          <Modal />
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
