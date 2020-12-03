import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useRef, useState} from "react";
import useStyles from "../Style";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../../Actions/userActions";
import {history} from "../../../../Helper/history";

export default function LoginForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const emailTxt = useRef(' ');
  const passwordTxt = useRef(' ');
  let [curUser, setUser] = useState({});
  let user = useSelector(state => state.user.user);

  useEffect(() => {
    setUser(user);
  },[user]);

  if (curUser && curUser.customerName) {
    redirectTo();
  }
  function redirectTo() {
    history.push("/");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({email: emailTxt.current.value, password: passwordTxt.current.value}));
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form method={'POST'} className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          inputRef={emailTxt}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          inputRef={passwordTxt}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit} onClick={(e) =>handleSubmit(e)}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={'/register'} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
