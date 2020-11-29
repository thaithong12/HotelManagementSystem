import useStyles from "./Style";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";
import React from "react";
import LoginForm from "./Form/LoginForm";
import { Router,
  Switch,
  Route} from "react-router-dom";
import RegisterForm from "./Form/RegisterForm";
import {history} from './../../../Helper/history'

export default function Form() {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Router history={history}>
          <Route exact path="/Login" component={LoginForm}/>
          <Route exact path="/register" component={RegisterForm}/>
        </Router>
      </div>
    </Grid>
  )
}


