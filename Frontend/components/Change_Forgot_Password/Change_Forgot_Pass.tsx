import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useFormik, Formik } from 'formik';
import * as yup from "yup";
import Copyright from '../Copyright/Copyright'
import { useSelector, useDispatch } from "react-redux"
import { IChangePass, changePass, IChangePassPreview, changeForgotPass } from '../../redux/actions/ChangePassActions';
import { useStyles } from "./style"
import { useRouter } from "next/router"
import NProgress from 'nprogress'

export default function ChangeForgotPass() {
    const classes = useStyles();

    const dispatch = useDispatch()
    let router = useRouter();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cập nhật mật khẩu
                </Typography>
                <Formik
                    initialValues={{
                        new_password: '',
                        new_password_confirm: '',
                        token: ""
                    }}
                    validationSchema={yup.object({
                        new_password: yup.string()
                            .required("Bắt buộc nhập")
                            .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
                            .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự")
                            .matches(
                                /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
                                "Mật khẩu phải chứa 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt"
                            ),
                        new_password_confirm: yup.string()
                            .required("Bắt buộc nhập")
                            .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
                            .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự")
                            .matches(
                                /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
                                "Mật khẩu phải chứa 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt"
                            ),
                    })}
                    onSubmit={(values: IChangePassPreview) => {
                        Object.assign(values, { "token": router.query.token })
                        dispatch(changeForgotPass(values))
                        NProgress.start();
                    }}
                >
                    {(formik) => {
                        return (
                            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Mật khẩu mới"
                                            name="new_password"
                                            autoComplete="On"
                                            onChange={formik.handleChange}
                                            error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                            helperText={formik.touched.new_password && formik.errors.new_password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Nhập lại mật khẩu mới"
                                            name="new_password_confirm"
                                            autoComplete="On"
                                            onChange={formik.handleChange}
                                            error={formik.touched.new_password_confirm && Boolean(formik.errors.new_password_confirm)}
                                            helperText={formik.touched.new_password_confirm && formik.errors.new_password_confirm}
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
                                    Lưu
                                </Button>
                            </form>
                        )
                    }}
                </Formik>


            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}