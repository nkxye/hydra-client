import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer_styles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    height: "10vh",
    bottom: "0",
    position: "absolute",
    background: "transparent",
    marginTop: "auto",
  },
}));
function FooterBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.footer_styles}>
      <h1>Footer</h1>
    </div>
  );
}

export default FooterBar;
