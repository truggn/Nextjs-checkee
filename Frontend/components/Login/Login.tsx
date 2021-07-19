import React, { Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Copyright from '../Copyright/Copyright'
import { useStyles } from './style'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useSelector, useDispatch, } from "react-redux";
import NProgress from 'nprogress'
import { ILogin, login, LoginState} from '../../redux/actions/LoginActions';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Định dạng email chưa chính xác")
    .required("Bắt buộc nhập"),
  password: yup
    .string()
    .required("Bắt buộc nhập")
    .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
    .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự")
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
      "Mật khẩu phải chứa 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt"
    ),
});

export default function SignInSide() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: ILogin): void => {
      dispatch(login(
        values
      ))
      NProgress.start();
    },
  });
  return (
    <Fragment>     
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ đăng nhập"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-pass" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Bạn chưa có tài khoản? Đăng ký"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </Fragment>

  );
}