import React, { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { IChangePass, changePass } from '../../redux/actions/ChangePassActions';
import { useFormik } from 'formik';
import * as yup from "yup";
import NProgress from 'nprogress'

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Bắt buộc nhập")
    .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
    .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự")
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
      "Mật khẩu phải chứa 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt"
    ),
  new_password: yup
    .string()
    .required("Bắt buộc nhập")
    .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
    .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự")
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
      "Mật khẩu phải chứa 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt"
    ),
  new_password_confirm: yup
    .string().test('match', 'Không khớp với mật khẩu mới', function (password) {
      return password === this.parent.new_password
    })
    .required("Bắt buộc nhập")
    
});
const ProfileDetails = () => {

  const state: IChangePass = useSelector((state: any) => state.Login.getuserlogindata);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: Object.keys(state).length !==0 ?state.email:"",
      password: "",
      new_password: "",
      new_password_confirm: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values: IChangePass): void => {
      dispatch(changePass(
        values
      ))
      NProgress.start();
    },
  });

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          //subheader="Tất cả thông tin có thể chỉnh sửa"
          title="Đổi mật khẩu"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mật khẩu cũ"
                name="password"
                type="password"
                autoComplete="On"
                required
                variant="outlined"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mật khẩu mới"
                name="new_password"
                type="password"
                autoComplete="On"
                required
                variant="outlined"
                onChange={formik.handleChange}
                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                helperText={formik.touched.new_password && formik.errors.new_password}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nhập lại mật khẩu mới"
                name="new_password_confirm"
                type="password"
                required
                autoComplete="On"
                variant="outlined"
                onChange={formik.handleChange}
                error={formik.touched.new_password_confirm && Boolean(formik.errors.new_password_confirm)}
                helperText={formik.touched.new_password_confirm && formik.errors.new_password_confirm}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Lưu
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default ProfileDetails;
