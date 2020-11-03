import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import React from "react";
import useStyles from "../Style";
import {Link} from "react-router-dom";


export default function LoginForm() {
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
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
        autoComplete="current-password"
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
        className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
        {/*  <Link href="#" variant="body2">*/}
        {/*    Forgot password?*/}
        {/*  </Link>*/}
        {/*</Grid>*/}
        {/*<Grid item>*/}
        {/*  <Link href={'/register'} variant="body2">*/}
        {/*    {"Don't have an account? Sign Up"}*/}
        {/*  </Link>*/}
        <Link to={'/register'} >Register</Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        {/*<Copyright />*/}
      </Box>
    </form>
  )
}