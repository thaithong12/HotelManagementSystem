import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import useStyles from "./Components/User/Auth/Style";
import Content from "./Components/User/Auth/Content";
import Form from "./Components/User/Auth/Form";

export default function Login() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Content/>
      <Form/>
    </Grid>
  );
}
