import Grid from "@material-ui/core/Grid";
import React from "react";
import useStyles from "./Style";

export default function Content() {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
  )
}