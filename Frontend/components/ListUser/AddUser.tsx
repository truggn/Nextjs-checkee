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
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import { useStyles } from "./style";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { IListUser, createData } from "../../redux/actions/ListUserActions";
import { loadUserType, IUserType } from "../../redux/actions/UserTypeActions";
import { Formik, useFormik } from "formik";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageUploading, { ImageListType } from "react-images-uploading";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
//pass

interface PasswordStates {
  password: string;
  showpassword: boolean;
}
interface PasswordConfirmStates {
  passwordConfirm: string;
  showpassword: boolean;
}
//Ki???m so??t khi nh???p
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const check = /^[^-]+$/;
const checknum = /^[^1]+$/;
//

export const Close = (b) => {
  const [value, setValue] = React.useState(b);
  return alert(value);
};
Close.PropTypes = {
  b: PropTypes.bool.isRequired,
};

interface IImage {
  dataURL: string
}
export default function AddUser(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //ref
  const ref = React.useRef(null);
  //lay userType
  const [userTypeList, setUserTypeList] = React.useState<IUserType[]>([]);

  const state_userTypeList: IUserType[] = useSelector(
    (state: any) => state.UserType.userTypeList
  );
  React.useEffect(() => {
    dispatch(loadUserType());
  }, [dispatch]);

  React.useEffect(() => {
    setUserTypeList(state_userTypeList);
  }, [state_userTypeList!]);
  // console.log("userTypeList", userTypeList);
  //prop t??? listUser
  const { showmodal, close } = props;
  const [showmodalagain, setShowmodalagain] = React.useState(showmodal);
  React.useEffect(() => {
    setShowmodalagain(showmodal);
  }, [props.showmodal]);

  // console.log("shomoda", showmodalagain, "", showmodal);
  //m???t kh???u
  const [password, setpassword] = React.useState<PasswordStates>({
    password: "",
    showpassword: false,
  });
  const handleClickShowPass = () => {
    setpassword({ ...password, showpassword: !password.showpassword });
  };
  //Nh???p l???i m???t kh???u
  const [
    passwordConfirm,
    setPasswordConfirm,
  ] = React.useState<PasswordConfirmStates>({
    passwordConfirm: "",
    showpassword: false,
  });
  const handleClickShowPassConfirm = () => {
    setPasswordConfirm({
      ...passwordConfirm,
      showpassword: !passwordConfirm.showpassword,
    });
  };

  //image
  const [image, setImage] = React.useState<IImage[]>([]);
  const onChangeImage = (imageList: ImageListType) => {
    setImage(imageList as never[]);
  };
  return (
    <Container>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={showmodal}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={close}>
          <div>
            <Typography variant="h5">Th??m M???i Ng?????i D??ng</Typography>
          </div>
        </DialogTitle>
        <MuiDialogContent dividers className={classes.dialogcontent}>
          <Formik
            initialValues={{
              _id: "",
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              sex: 1,
              status: 1,
              address: "",
              passwordFailures: 0,
              userType: "",
              userTypeId: "-",
              password: "",
              userRole: "",
              passwordConfirm: "",
              certificate_image: "",
            }}
            validationSchema={yup.object({
              lastName: yup.string().required("H??y nh???p v??o"),
              firstName: yup.string().required("H??y nh???p v??o"),
              email: yup
                .string()
                .email("?????nh d???ng ch??a ch??nh x??c")
                .required("H??y nh???p v??o"),
              phone: yup
                .string()
                .matches(phoneRegExp, "Ch??a ????ng ?????nh d???ng s??? ??i???n tho???i")
                .required("H??y nh???p v??o"),
              sex: yup
                .string()
                .matches(checknum, "H??y ch???n gi???i t??nh")
                .required("H??y ch???n gi???i t??nh"),
              address: yup.string().required("H??y nh???p v??o"),
              userTypeId: yup
                .string()
                .matches(check, "H??y ch???n ng?????i d??ng")
                .required("H??y ch???n ng?????i d??ng"),
              password: yup
                .string()
                .required("B???t bu???c nh???p")
                .min(6, "M???t kh???u ph???i l???n h??n 6 k?? t???")
                .max(24, "M???t kh???u ph???i nh??? h??n 24 k?? t???"),
              passwordConfirm: yup
                .string()
                .required("B???t bu???c nh???p")
                .oneOf(
                  [yup.ref("password"), null],
                  "M???t kh???u nh???p l???i kh??ng tr??ng kh???p"
                ),
            })}
            onSubmit={(values: IListUser, { resetForm, setSubmitting }) => {
              for (let i = 0; i < userTypeList.length; i++) {
                if (userTypeList[i]._id === values.userTypeId) {
                  values.userType = userTypeList[i].name;
                }
              }
              console.log("image",image)
              if (image.length === 0) {
                values.certificate_image = "";
              } else {
                values.certificate_image = image[0].dataURL;
              }
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              dispatch(createData(values));
            }}
          >
            {(formikprops) => (
              <form onSubmit={formikprops.handleSubmit} noValidate>
                <div>
                  <div className={classes.div}>
                    <Typography variant="h6">Th??ng Tin Ng?????i D??ng</Typography>
                  </div>
                  <Grid container spacing={3}>
                    {/*--------------------------------------------H???-T??n------------------------------------------ */}
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="H???"
                            id="lastname"
                            name="lastName"
                            onChange={formikprops.handleChange}
                            fullWidth={true}
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            error={
                              formikprops.touched.lastName &&
                              Boolean(formikprops.errors.lastName)
                            }
                            helperText={
                              formikprops.touched.lastName &&
                              formikprops.errors.lastName
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="outlined"
                            label="T??n"
                            id="firstname"
                            name="firstName"
                            onChange={formikprops.handleChange}
                            fullWidth={true}
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            error={
                              formikprops.touched.firstName &&
                              Boolean(formikprops.errors.firstName)
                            }
                            helperText={
                              formikprops.touched.firstName &&
                              formikprops.errors.firstName
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {/*------------------------------------------------S??T------------------------------------------ */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="S??? ??i???n tho???i"
                        name="phone"
                        onChange={formikprops.handleChange}
                        fullWidth={true}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={
                          formikprops.touched.phone &&
                          Boolean(formikprops.errors.phone)
                        }
                        helperText={
                          formikprops.touched.phone && formikprops.errors.phone
                        }
                      />
                    </Grid>
                    {/*------------------------------------?????a-Ch???------------------------------------------ */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="?????a Ch???"
                        fullWidth={true}
                        onChange={formikprops.handleChange}
                        name="address"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={
                          formikprops.touched.address &&
                          Boolean(formikprops.errors.address)
                        }
                        helperText={
                          formikprops.touched.address &&
                          formikprops.errors.address
                        }
                      />
                    </Grid>
                    {/*--------------------------------------------Email------------------------------------------ */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Email"
                        fullWidth={true}
                        name="email"
                        size="small"
                        // onChange={formikprops.handleChange}
                        value={formikprops.values.email}
                        InputLabelProps={{ shrink: true }}
                        // error={
                        //   formikprops.touched.email &&
                        //   Boolean(formikprops.errors.email)
                        // }
                        // helperText={
                        //   formikprops.touched.email && formikprops.errors.email
                        // }
                        disabled
                      />
                    </Grid>
                    {/*--------------------------------------------Gi???i-T??nh------------------------------------------ */}
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
                          {formikprops.touched.sex &&
                          Boolean(formikprops.errors.sex) ? (
                            <span className={classes.boolean}>Gi???i T??nh *</span>
                          ) : (
                            <span>Gi???i T??nh *</span>
                          )}
                        </InputLabel>
                        <Select
                          // variant="filled"
                          name="sex"
                          labelWidth={80}
                          native
                          fullWidth={true}
                          value={formikprops.values.sex}
                          onChange={formikprops.handleChange}
                          error={
                            formikprops.touched.sex &&
                            Boolean(formikprops.errors.sex)
                          }
                          inputProps={{
                            id: "age-native-label-placeholder",
                          }}
                        >
                          <option value={1}>Selected</option>
                          <option value={2}>Nam</option>
                          <option value={3}>N???</option>
                        </Select>
                        <div className={classes.helptext}>
                          {formikprops.touched.email && formikprops.errors.sex}
                        </div>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={0}>
                        <Grid item md={12}>
                          <label>H??nh ???nh</label>
                          <ImageUploading
                            value={image}
                            onChange={onChangeImage}
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemove,
                              dragProps,
                            }) => (
                              <div>
                                <Button
                                  startIcon={<CloudUploadIcon />}
                                  variant="contained"
                                  color="default"
                                  onClick={onImageUpload}
                                  {...dragProps}
                                  style={{
                                    display:
                                      imageList.length === 0 ? "flex" : "none",
                                  }}
                                >
                                  upload
                                </Button>
                                {imageList.map((image, index) => (
                                  <div key={index} className={classes.divbig}>
                                    <div className={classes.divimg}>
                                      <img
                                        src={image.dataURL}
                                        alt=""
                                        className={classes.img}
                                      />
                                    </div>
                                    <div className={classes.divbutton}>
                                      <Button
                                        onClick={() => onImageRemove(index)}
                                      >
                                        <DeleteIcon></DeleteIcon>
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </ImageUploading>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider className={classes.divider} />
                  <div className={classes.div}>
                    <Typography variant="h6">Th??ng Tin ????ng Nh???p</Typography>
                  </div>
                  {/*------------------------------------T??n-????ng-Nh???p------------------------------------------- */}
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="T??n ????ng nh???p"
                        fullWidth={true}
                        name="email"
                        onChange={formikprops.handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        error={
                          formikprops.touched.email &&
                          Boolean(formikprops.errors.email)
                        }
                        helperText={
                          formikprops.touched.email && formikprops.errors.email
                        }
                      />
                    </Grid>
                    {/*------------------------------------Lo???i-Ng?????i-D??ng------------------------------------------- */}
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                      >
                        <InputLabel id="demo-simple-select-label" shrink>
                          {formikprops.touched.userType &&
                          Boolean(formikprops.errors.userType) ? (
                            <span className={classes.boolean}>
                              Lo???i Ng?????i D??ng *
                            </span>
                          ) : (
                            <span>Lo???i Ng?????i D??ng *</span>
                          )}
                        </InputLabel>
                        <Select
                          variant="outlined"
                          native
                          name="userTypeId"
                          labelWidth={140}
                          value={formikprops.values.userTypeId}
                          onChange={formikprops.handleChange}
                          inputProps={{
                            id: "demo-simple-select-label",
                          }}
                          error={
                            formikprops.touched.userTypeId &&
                            Boolean(formikprops.errors.userTypeId)
                          }
                        >
                          <option value="-">Selected</option>
                          {userTypeList.map((userType, index) => {
                            return (
                              <option key={index} value={userType._id}>
                                {userType.name}
                              </option>
                            );
                          })}
                        </Select>
                        <div className={classes.helptext}>
                          {formikprops.touched.userTypeId &&
                            formikprops.errors.userTypeId}
                        </div>
                      </FormControl>
                    </Grid>
                    {/*----------------------------------------M???t-Kh???u-Ng?????i-D??ng-------------------------------------- */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="M???t kh???u ng?????i d??ng"
                        name="password"
                        fullWidth={true}
                        type={password.showpassword ? "text" : "password"}
                        onChange={formikprops.handleChange}
                        error={
                          formikprops.touched.password &&
                          Boolean(formikprops.errors.password)
                        }
                        helperText={
                          formikprops.touched.password &&
                          formikprops.errors.password
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
                                onClick={handleClickShowPass}
                                // onMouseDown={handleMouseDownPassword}
                              >
                                {password.showpassword ? (
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
                    {/*----------------------------------------Nh???p-L???i-M???t-Kh???u-Ng?????i-D??ng-------------------------------------- */}
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        label="Nh???p l???i m???t kh???u ng?????i d??ng"
                        name="passwordConfirm"
                        fullWidth={true}
                        type={
                          passwordConfirm.showpassword ? "text" : "password"
                        }
                        onChange={formikprops.handleChange}
                        error={
                          formikprops.touched.passwordConfirm &&
                          Boolean(formikprops.errors.passwordConfirm)
                        }
                        helperText={
                          formikprops.touched.passwordConfirm &&
                          formikprops.errors.passwordConfirm
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
                                onClick={handleClickShowPassConfirm}
                                // onMouseDown={handleMouseDownPassword}
                              >
                                {password.showpassword ? (
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
                    {/*----------------------------------------H??nh-???nh-------------------------------------------- */}
                  </Grid>
                </div>
                <Divider className={classes.divider} />
                {/*-----------------------------------------------Button-Submit------------------------------------------- */}
                <MuiDialogActions className={classes.DialogActions}>
                  <Button autoFocus onClick={close} variant="contained">
                    H???y
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Th??m Ng?????i D??ng
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
