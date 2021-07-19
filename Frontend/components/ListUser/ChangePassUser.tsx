import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useStyles } from "./style";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
//
export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
//set up modal
const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const classess = useStyles();
  return (
    <MuiDialogTitle
      disableTypography
      className={classess.dialogtitle}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classess.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
//pass
interface State {
  username: string;
  password: string;
  newpassword: string;
  setnewpassword: string;
}
//
interface PassOld {
  showpasswordold: boolean;
}
interface PassNew {
  showpasswordnew: boolean;
}
interface PassSetNew {
  showpasswordsetnew: boolean;
}
//Kiểm soát khi nhập
const validation = yup.object({
  username: yup.string().required("Hãy nhập vào"),
  password: yup
    .string()
    .required("Bắt buộc nhập")
    .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
    .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự"),
  newpassword: yup
    .string()
    .required("Bắt buộc nhập")
    .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
    .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự"),
  setnewpassword: yup
    .string()
    .required("Bắt buộc nhập")
    .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
    .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự"),
});
//
export default function ChangePassUser(props) {
  const classes = useStyles();
  //prop từ listUser
  const { showchangepassuser, close } = props;
  console.log("changepass", props.changepass);
  //showpass cũ
  const [passwordold, setpasswordold] = React.useState<PassOld>({
    showpasswordold: false,
  });
  const handleClickShowPassOld = () => {
    setpasswordold({
      ...passwordold,
      showpasswordold: !passwordold.showpasswordold,
    });
  };
  //showpass mới
  const [passwordnew, setpasswordnew] = React.useState<PassNew>({
    showpasswordnew: false,
  });
  const handleClickShowPassNew = () => {
    setpasswordnew({
      ...passwordnew,
      showpasswordnew: !passwordnew.showpasswordnew,
    });
  };
  //showpass mới lại
  const [passwordsetnew, setpasswordsetnew] = React.useState<PassSetNew>({
    showpasswordsetnew: false,
  });
  const handleClickShowPassSetNew = () => {
    setpasswordsetnew({
      ...passwordsetnew,
      showpasswordsetnew: !passwordsetnew.showpasswordsetnew,
    });
  };
  //
  return (
    <Container>
      <Dialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={showchangepassuser}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={close}>
          <div>
            <Typography variant="h5">Thay đổi mật khẩu</Typography>
          </div>
        </DialogTitle>
        <MuiDialogContent dividers className={classes.dialogcontent}>
          <Formik
            initialValues={{
              email: props.changepass ? props.changepass.email : "",
              password: "",
              newpassword: "",
              setnewpassword: "",
            }}
            validationSchema={yup.object({
              email: yup.string().required("Hãy nhập vào"),
              password: yup
                .string()
                .required("Bắt buộc nhập")
                .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
                .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự"),
              newpassword: yup
                .string()
                .required("Bắt buộc nhập")
                .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
                .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự"),
              setnewpassword: yup
                .string()
                .required("Bắt buộc nhập")
                .min(6, "Mật khẩu phải lớn hơn 6 ký tự")
                .max(24, "Mật khẩu phải nhỏ hơn 24 ký tự"),
            })}
            onSubmit={(values) => {
              if (values.newpassword !== values.setnewpassword) {
                alert(
                  JSON.stringify("Nhập lại xác nhận lại mật khẩu mới", null, 2)
                );
              } else {
                alert(JSON.stringify(values, null, 2));
              }

              // dispatch(updateData(values));
            }}
          >
            {(formikprop) => (
              <form onSubmit={formikprop.handleSubmit} noValidate>
                <div>
                  <div className={classes.div}>
                    <Typography variant="h6">Thay Đổi Thông Tin</Typography>
                  </div>
                  {/*------------------------------------Tên-Đăng-Nhập------------------------------------------- */}
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Tên đăng nhập"
                        fullWidth={true}
                        name="email"
                        onChange={formikprop.handleChange}
                        value={formikprop.values.email}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        disabled
                        // error={
                        //   formikprop.touched.username &&
                        //   Boolean(formikprop.errors.username)
                        // }
                        // helperText={
                        //   formikprop.touched.username &&
                        //   formikprop.errors.username
                        // }
                      />
                    </Grid>
                    {/*----------------------------------------Mật-Khẩu-Cũ-------------------------------------- */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Mật khẩu cũ"
                        name="password"
                        fullWidth={true}
                        type={passwordold.showpasswordold ? "text" : "password"}
                        onChange={formikprop.handleChange}
                        error={
                          formikprop.touched.password &&
                          Boolean(formikprop.errors.password)
                        }
                        helperText={
                          formikprop.touched.password &&
                          formikprop.errors.password
                        }
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassOld}
                                // onMouseDown={handleMouseDownPassword}
                              >
                                {passwordold.showpasswordold ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/*----------------------------------------Mật-Khẩu-Mới--------------------------------------*/}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Mật khẩu mới"
                        name="newpassword"
                        fullWidth={true}
                        type={passwordnew.showpasswordnew ? "text" : "password"}
                        onChange={formikprop.handleChange}
                        error={
                          formikprop.touched.newpassword &&
                          Boolean(formikprop.errors.newpassword)
                        }
                        helperText={
                          formikprop.touched.newpassword &&
                          formikprop.errors.newpassword
                        }
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassNew}
                                // onMouseDown={handleMouseDownPassword}
                              >
                                {passwordnew.showpasswordnew ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    {/*----------------------------------------Nhập-Lại-Mật-Khẩu-Mới----------------------------------*/}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Nhập lại mật khẩu mới"
                        name="setnewpassword"
                        fullWidth={true}
                        type={
                          passwordsetnew.showpasswordsetnew
                            ? "text"
                            : "password"
                        }
                        onChange={formikprop.handleChange}
                        error={
                          formikprop.touched.setnewpassword &&
                          Boolean(formikprop.errors.setnewpassword)
                        }
                        helperText={
                          formikprop.touched.setnewpassword &&
                          formikprop.errors.setnewpassword
                        }
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassSetNew}
                                // onMouseDown={handleMouseDownPassword}
                              >
                                {passwordsetnew.showpasswordsetnew ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Divider className={classes.divider} />
                {/*-----------------------------------------------Button-Submit------------------------------------------- */}
                <MuiDialogActions className={classes.DialogActions}>
                  <Button
                    autoFocus
                    onClick={close}
                    color="default"
                    variant="contained"
                  >
                    Hủy
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Đổi Mật Khẩu
                  </Button>
                </MuiDialogActions>
              </form>
            )}
          </Formik>
        </MuiDialogContent>
      </Dialog>
    </Container>
  );
}
