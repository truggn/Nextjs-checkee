import React, { Fragment, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as yup from "yup";
import { ISignUp, addSignUp, SignUpState } from '../../redux/actions/SignUpActions';
import { useSelector, useDispatch, } from "react-redux";
import { useStyles } from "./style";
import NProgress from 'nprogress'
import Head from 'next/head'
import Copyright from '../Copyright/Copyright'

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Định dạng email chưa chính xác")
    .required("Bắt buộc nhập")
    .matches(
      /^([A-Za-z0-9.\\.])+\@([A-Za-z0-9.\\.])+\.([A-Za-z]{2,4})$/,
      "Tên địa chỉ email chỉ cho phép kí tự chữ số, chữ thường,chữ hoa và dấu ."
    ),
  firstName: yup
    .string()
    .required("Bắt buộc nhập"),
  lastName: yup
    .string()
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
function SignUp() {
  const classes = useStyles();

  //const state: SignUpState = useSelector((state: any) => state.SignUp);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      phone: 0,
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: ISignUp): void => {
      dispatch(addSignUp(
        values
      ))
      NProgress.start();
    },
  });
  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký tài khoản
        </Typography>
          <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Họ"
                  autoFocus
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Tên"
                  name="lastName"
                  autoComplete="lname"
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng ký

          </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Bạn đã có tài khoản? Đăng nhập
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>

    </Fragment>
  );
}

export default SignUp
