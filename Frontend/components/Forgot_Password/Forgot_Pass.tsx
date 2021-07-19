import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as yup from "yup";
import Copyright from '../Copyright/Copyright'
import {useSelector, useDispatch} from "react-redux"
import {forgotPass, ForgotPassState, IForgotPass} from "../../redux/actions/ForgotPassActions"
import {useStyles} from "./style"
import NProgress from 'nprogress'

const validationSchema = yup.object({
    email: yup.string().email().required("Bắt buộc nhập"),
  });

export default function ForgotPass() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: IForgotPass):void => {
            dispatch(forgotPass(values))
            NProgress.start();
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Quên mật khẩu
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Lấy lại mật khẩu
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}