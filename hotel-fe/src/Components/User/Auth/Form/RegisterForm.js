import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link,useHistory} from "react-router-dom";
import React, {useRef, useState} from "react";
import useStyles from "../Style";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../../../Actions/userActions";
import Alert from "@material-ui/lab/Alert";

export default function RegisterForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const email = useRef(' ');
  const password = useRef(' ');
  const fullName = useRef('')
  const rePassword = useRef('');
  const phoneNumber = useRef(' ');
  const user = useSelector(state => state.user);
  const history = useHistory();

  let [itemErr, setErr] = useState({isErr: false, msg: ''});

  function handleSubmit(e) {
    e.preventDefault();
    setErr({isErr: false, msg: ''})
    if (validatesData()) {
      return;
    } else {
      const obj = {
        email: email.current.value,
        password: password.current.value,
        customerName: fullName.current.value,
        phoneNumber: phoneNumber.current.value
      }
      dispatch(register(obj));
    }
  }
  if (user && user.isSuccess){
    history.push('/login');
  }

  function validatesData() {
    let check = false;
    // validate password
    if (password.current.value !== rePassword.current.value) {
      check = true;
      setErr({isErr: true, msg: 'Password and RePassword not same'})
    }
    // validate blank
    if (email.current.value === '' || password.current.value === '' || rePassword.current.value === ''
      || fullName.current.value === '' || phoneNumber.current.value === '') {
      check = true;
      setErr({isErr: true, msg: 'Not Blank'})
    }
    return check;
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      {
        itemErr.isErr ? <Alert severity="error">{itemErr.msg}</Alert> : ''
      }
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="f_name"
          label="Full Name"
          type="text"
          id="password" inputRef={fullName}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone Number"
          type="text"
          id="password" inputRef={phoneNumber}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus inputRef={email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password" inputRef={password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="re_password"
          label="Re-Password"
          type="password"
          id="password" inputRef={rePassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to={'/login'} variant="body2">
              {"You have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
