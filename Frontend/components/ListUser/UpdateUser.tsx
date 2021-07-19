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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useStyles } from "./style";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { loadUserType, IUserType } from "../../redux/actions/UserTypeActions";
import { IListUser, updateData } from "./../../redux/actions/ListUserActions";
import { format } from "date-fns";
//
export interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

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

//Kiểm soát khi nhập
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const check = /^[^-]+$/;
//
export default function UpdateUser(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //prop từ listUser
  const { showupdateuser, close } = props;
  const [showupdateuseragain, setShowupdateuseragain] = React.useState(
    showupdateuser
  );
  React.useEffect(() => {
    setShowupdateuseragain(showupdateuser);
  }, [props.showupdateuser]);
  //lay userType
  const [userTypeList, setUserTypeList] = React.useState<IUserType[]>([]);

  const state_userTypeList: IUserType[] = useSelector(
    (state: any) => state.UserType.userTypeList
  );
  React.useEffect(() => {
    setUserTypeList(state_userTypeList);
  }, [state_userTypeList!]);
  //
  console.log(
    "ddj",
    format(new Date("2021-03-19T00:00:00.000Z"), "yyyy/MM/dd")
  );
  //
  return (
    <Container>
      <Dialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={showupdateuseragain}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={close}>
          <div>
            <Typography variant="h5">Cập Nhật Người Dùng</Typography>
          </div>
        </DialogTitle>
        <MuiDialogContent dividers className={classes.dialogcontent}>
          <Formik
            initialValues={{
              _id: props.createData ? props.createData._id : "",
              firstName: props.createData ? props.createData.firstName : "",
              lastName: props.createData ? props.createData.lastName : "",
              phone: props.createData ? props.createData.phone : "",
              email: props.createData ? props.createData.email : "",
              sex: props.createData ? props.createData.sex : -1,
              address: props.createData ? props.createData.address : "",
              status: 1,
              passwordFailures: 0,
              userType: props.createData ? props.createData.userType : "",
              userTypeId: props.createData ? props.createData.userTypeId : "-",
              password: props.createData ? props.createData.password : "",
              userRole: "",
              passwordConfirm: "",
              certificate_image: props.createData
                ? props.createData.certificate_image
                : "",
            }}
            validationSchema={yup.object({
              firstName: yup.string().required("Hãy nhập vào"),
              lastName: yup.string().required("Hãy nhập vào"),
              phone: yup
                .string()
                .matches(phoneRegExp, "Chưa đúng định dạng số điện thoại")
                .required("Hãy nhập vào"),
              email: yup
                .string()
                .email("Định dạng chưa chính xác")
                .required("Hãy nhập vào"),
              sex: yup
                .string()
                .matches(check, "Hãy chọn giới tính")
                .required("Hãy chọn giới tính"),
              address: yup.string().required("Hãy nhập vào"),
              userTypeId: yup
                .string()
                .matches(check, "Hãy chọn người dùng")
                .required("Hãy chọn người dùng"),
            })}
            onSubmit={(values: IListUser) => {
              for (let i = 0; i < userTypeList.length; i++) {
                if (userTypeList[i]._id === values.userTypeId) {
                  values.userType = userTypeList[i].name;
                }
              }
              // alert(JSON.stringify(values, null, 2));
              dispatch(updateData(values));
              // setShowupdateuseragain(close);
            }}
          >
            {(propss) => (
              <form onSubmit={propss.handleSubmit} noValidate>
                <div>
                  <div className={classes.div}>
                    <Typography variant="h6">Thông Tin Người Dùng</Typography>
                  </div>

                  <Grid container spacing={3}>
                    {/*--------------------------------------------Họ-Tên------------------------------------------ */}
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Họ"
                            id="lastname"
                            name="lastName"
                            onChange={propss.handleChange}
                            value={propss.values.lastName}
                            fullWidth={true}
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            error={
                              propss.touched.lastName &&
                              Boolean(propss.errors.lastName)
                            }
                            helperText={
                              propss.touched.lastName && propss.errors.lastName
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="Tên"
                            id="firstname"
                            name="firstName"
                            onChange={propss.handleChange}
                            value={propss.values.firstName}
                            fullWidth={true}
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            error={
                              propss.touched.firstName &&
                              Boolean(propss.errors.firstName)
                            }
                            helperText={
                              propss.touched.firstName &&
                              propss.errors.firstName
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/*------------------------------------------------SĐT------------------------------------------ */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Số điện thoại"
                        name="phone"
                        onChange={propss.handleChange}
                        value={propss.values.phone}
                        fullWidth={true}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={
                          propss.touched.phone && Boolean(propss.errors.phone)
                        }
                        helperText={propss.touched.phone && propss.errors.phone}
                      />
                    </Grid>
                    {/*------------------------------------Địa-Chỉ------------------------------------------ */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Địa Chỉ"
                        fullWidth={true}
                        onChange={propss.handleChange}
                        value={propss.values.address}
                        name="address"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={
                          propss.touched.address &&
                          Boolean(propss.errors.address)
                        }
                        helperText={
                          propss.touched.address && propss.errors.address
                        }
                      />
                    </Grid>
                    {/*--------------------------------------------Email------------------------------------------ */}
                    <Grid item xs={6}>
                      <TextField
                        disabled
                        variant="outlined"
                        label="Email"
                        fullWidth={true}
                        name="email"
                        size="small"
                        // onChange={propss.handleChange}
                        value={propss.values.email}
                        InputLabelProps={{ shrink: true }}
                        // error={
                        //   propss.touched.email && Boolean(propss.errors.email)
                        // }
                        // helperText={propss.touched.email && propss.errors.email}
                      />
                    </Grid>
                    {/*--------------------------------------------Giới-Tính------------------------------------------ */}
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                      >
                        <InputLabel
                          shrink
                          htmlFor="age-native-label-placeholder"
                        >
                          {propss.touched.sex && Boolean(propss.errors.sex) ? (
                            <span className={classes.boolean}>Giới Tính *</span>
                          ) : (
                            <span>Giới Tính *</span>
                          )}
                        </InputLabel>
                        <Select
                          // variant="filled"
                          name="sex"
                          labelWidth={80}
                          native
                          fullWidth={true}
                          value={propss.values.sex}
                          onChange={propss.handleChange}
                          error={
                            propss.touched.sex && Boolean(propss.errors.sex)
                          }
                          inputProps={{
                            id: "age-native-label-placeholder",
                          }}
                        >
                          <option value={1}>Selected</option>
                          <option value={2}>Nam</option>
                          <option value={3}>Nữ</option>
                        </Select>
                        <div className={classes.helptext}>
                          {" "}
                          {propss.touched.email && propss.errors.sex}
                        </div>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <div className={classes.div}>
                    <Typography variant="h6">Thông Tin Đăng Nhập</Typography>
                  </div>
                  {/*------------------------------------Tên-Đăng-Nhập------------------------------------------- */}
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Tên đăng nhập"
                        fullWidth={true}
                        name="email"
                        onChange={propss.handleChange}
                        value={propss.values.email}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        disabled
                        // error={
                        //   propss.touched.email && Boolean(propss.errors.email)
                        // }
                        // helperText={propss.touched.email && propss.errors.email}
                      />
                    </Grid>
                    {/*------------------------------------Loại-Người-Dùng------------------------------------------- */}
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                      >
                        <InputLabel id="demo-simple-select-label" shrink>
                          {propss.touched.userTypeId &&
                          Boolean(propss.errors.userTypeId) ? (
                            <span className={classes.boolean}>
                              Loại Người Dùng *
                            </span>
                          ) : (
                            <span>Loại Người Dùng *</span>
                          )}
                        </InputLabel>
                        <Select
                          variant="outlined"
                          native
                          name="userTypeId"
                          labelWidth={140}
                          value={propss.values.userTypeId}
                          onChange={propss.handleChange}
                          inputProps={{
                            id: "demo-simple-select-label",
                          }}
                          error={
                            propss.touched.userTypeId &&
                            Boolean(propss.errors.userTypeId)
                          }
                        >
                          {userTypeList.map((userType, index) => {
                            return (
                              <option key={index} value={userType._id}>
                                {userType.name}
                              </option>
                            );
                          })}

                          {/* <option value="-">Selected</option>
                          <option value="SuperAdmin">SuperAdmin</option>
                          <option value="Normal">Normal</option> */}
                        </Select>
                        <div className={classes.helptext}>
                          {propss.touched.userTypeId &&
                            propss.errors.userTypeId}
                        </div>
                      </FormControl>
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
                    Cập Nhật Người Dùng
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
