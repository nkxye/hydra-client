import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GyroTomato from "./../assets/hydra_logo_green.png";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
    maxWidth: "250px",
    padding: "10px",
    paddingTop: "40px",
    paddingBottom: "40px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
    marginTop: "10px",
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },
  crop_image: {
    width: "100px",
    height: "100px",
    borderRadius: "60px",
  },
  image_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  crop_title: {
    fontWeight: "bold",
  },
  dates: {
    textAlign: "center",
    MarginTop: 10,
  },
  hydra_id: {
    fontWeight: "bold",
    color: "#376e57",
    marginTop: 25,
  },
}));

// Assigned to janzon
function PlaceHolderCropCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const currentPage = history.location.pathname;
  return (
    <div>
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} className={classes.image_container}>
          <img src={GyroTomato} className={classes.crop_image} />
        </Grid>
        <Grid item xs={12} className={classes.image_container}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.hydra_id}
          >
            {props.pod_name}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.text_container}>
          <CancelIcon style={{ fill: "tomato" }} />
          <Typography variant="body1" className={classes.crop_title}>
            {props.crop_name}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.image_container}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.dates}
            style={{ marginTop: "15px" }}
          >
            Date planted: {props.createdAt}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlaceHolderCropCard;
