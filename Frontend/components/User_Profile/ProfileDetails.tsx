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
  makeStyles,
  Avatar,
  Typography,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { ILogin, IUserProfile, login, LoginState, updateUser } from '../../redux/actions/LoginActions';
import { useFormik, Formik } from 'formik';
import * as yup from "yup";
import toast from "@/ShowToast/ShowToast";


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));
const ProfileDetails = () => {
  const classes = useStyles();
  let state: IUserProfile = useSelector((state: any) => state.Login.getuserlogindata);
  function handleChangeImage(e) {
    if (e.size > 1000000) {
      toast({ type: "warning", message: "Kích thước hình phải < 1MB" });
    }
    else {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result)
      };
      reader.readAsDataURL(e)
    }

  }
  const dispatch = useDispatch();
  const [image, setImage] = useState<any>(null)
  return (
    <>

      <Formik
        initialValues={{
          _id: state._id,
          firstName: state.firstName,
          lastName: state.lastName,
          phone: state.phone,
          userRole: state.userRole,
          address: state.address,
          birthday: state.birthday,
          email: state.email,
          certificate_image: state.certificate_image,
          image_url: state.image_url,
          memberOfOrganizations: state.memberOfOrganizations,
        }}
        validationSchema={yup.object({
          lastName: yup.string().required("Bắt buộc nhập"),
          firstName: yup.string().required("Bắt buộc nhập"),
          email: yup
            .string()
            .email("Định dạng email chưa chính xác")
            .required("Bắt buộc nhập"),
          phone: yup
            .number()
            .required("Bắt buộc nhập"),
          birthday: yup.date().required("Hãy lựa chọn ngày"),
          address: yup.string().required("Bắt buộc nhập"),
        })}
        onSubmit={(values, actions) => {
          Object.assign(values, { "certificate_image": image !== null ? image : state.certificate_image })
          dispatch(updateUser(values))
        }}
      >
        {formik => {
          return (
            <form
              autoComplete="off"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Card
              >
                <CardContent>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Avatar
                      className={classes.avatar}
                      src={formik.values.certificate_image !== undefined ? 
                        formik.values.certificate_image : image}
                    />
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h3"
                    >

                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >

                    </Typography>
                    <Typography

                      color="textSecondary"
                      variant="body1"
                    >

                    </Typography>
                  </Box>
                  <TextField
                    type="file"
                    name="certificate_image"
                    label="Hình ảnh"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={(event: any) => {
                      formik.setFieldValue("certificate_image", handleChangeImage(event.currentTarget.files[0]));
                    }}

                  />
                </CardContent>
              </Card>
              <Divider />
              <Card>
                <CardHeader
                  //subheader="Tất cả thông tin có thể chỉnh sửa"
                  title="Thông tin người dùng"
                />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Họ"
                        name="firstName"
                        required
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName &&
                          formik.errors.firstName
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Tên"
                        name="lastName"
                        required
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName &&
                          formik.errors.lastName
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Địa chỉ email"
                        name="email"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={
                          formik.touched.email &&
                          Boolean(formik.errors.email)
                        }
                        helperText={
                          formik.touched.email &&
                          formik.errors.email
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        type="number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={
                          formik.touched.phone &&
                          Boolean(formik.errors.phone)
                        }
                        helperText={
                          formik.touched.phone &&
                          formik.errors.phone
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        required
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        variant="outlined"
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                        helperText={
                          formik.touched.address &&
                          formik.errors.address
                        }
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
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Lưu
               </Button>
                </Box>
              </Card>
            </form>
          )
        }
        }
      </Formik>
    </>
  );
};


export default ProfileDetails;
