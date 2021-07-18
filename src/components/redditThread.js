import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";

// images
import ChiliShock from "./../assets/chili_shock.jpg";
import redditBasil from "./../assets/redditbasil.jpg";
import redditSetup from "./../assets/redditsetup.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "25vh",
    marginBottom: "30px",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },
  thread_title: {
    color: "#2e604a",
    fontWeight: "bold",
    "@media (max-width: 768px)": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  },
  thread_image_container: {
    display: "flex",
    paddingLeft: "50px",
    alignItems: "center",
  },
  thread_image: {
    width: "40%",
  },
  op_deets: {
    fontSize: ".75rem",
  },
  post_deets: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "20px",
    paddingBottom: "20px"
  },
}));

function RedditThread(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={3} className={classes.thread_image_container}>
          <img src={redditBasil} className={classes.thread_image} />
        </Grid>
        <Grid item xs={12} md={8} className={classes.post_deets}>
          <Typography variant="body2" className={classes.thread_title}>
            First time try: basil. I am so happy!
          </Typography>
          <Typography color="textSecondary" className={classes.op_deets}>
            Posted by u/KrissieKris  &nbsp;•&nbsp;  12 hours ago
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default RedditThread;
