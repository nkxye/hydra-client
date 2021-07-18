import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

//icons
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SecurityIcon from "@material-ui/icons/Security";
import hydraLogo from "./../assets/hydra_logo_green.png";

// images
import RegisterHeader from "./../assets/register_header.png";

// components
import RegisterForm from "../components/forms/registerForm";

import { getClientName } from "./../helpers/clientHelpers";

//css
import "./../components/css/backgroundStyles.css";
import "./../components/css/registerStyles.css";

function RegisterPage(props) {
  // sets user to guest if not logged in
  useEffect(() => {
    getClientName();
    console.log(getClientName());
  }, []);
  return (
    <>
      <Grid container className="root register-bg">
        <Grid item xs={12} lg={6} className="register-hidden-container"></Grid>
        <Grid item xs={12} lg={6} className="register-container">
          <Grid container justify="center" alignItems="center">
            <Grid item className="register-form">
              <Grid item className="register-logo-container">
                <img className="register-logo" src={hydraLogo} />
              </Grid>
              <Typography variant="h4" className="welcome-text">
                Welcome!
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className="welcome-subtitle"
              >
                Let's set up your account and get started.
              </Typography>
              {/* form here */}
              <RegisterForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default RegisterPage;
