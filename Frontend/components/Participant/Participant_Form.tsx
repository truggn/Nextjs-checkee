import React, { useEffect, useState, Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import * as yup from "yup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';
//styles
import { useStyles, useRowStyles } from './Participant_Form.styles'
import { IListParticipant, createData, updateData } from "../../redux/actions/ParticipantActions";
import { ITypeParticipant, loadTypeParticipant } from "../../redux/actions/TypeParticipantActions";
import NProgress from 'nprogress'
import {
  ICustomer,
} from "../../redux/actions/CustomerActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import toast from "@/ShowToast/ShowToast";


interface IParticipant {
  _id: string;
  participantName: string;
  code: string;
  participantType: string;
  address: string;
  phone: string;
  email:string;
  password: string;
  organizationId: string
}
export default function Participant_Form(props) {
  const classes = useStyles();
  const [openParticipantForm, setOpenParticipantForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [participant, setParticipant] = React.useState<IParticipant|null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = useState(null)

  const [inputCustomer, setInputCustomer] = React.useState<string>("");
  const [errorCustomer, setErrorCustomer] = React.useState<boolean>(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const customerData: ICustomer[] =
    useSelector((state: any) => state.Customer.customerData) || [];
  const typeParticipantData: ITypeParticipant[] =
    useSelector((state: any) => state.TypeParticipant.participantdata) || [];
  const dispatch = useDispatch();
  const initialFormValues = {
    _id: participant ? participant._id : "",
    participantName: participant ? participant.participantName : "",
    code: participant ? participant.code : "",
    participantType: participant ? participant.participantType : "",
    address: participant ? participant.address : "",
    phone: participant ? participant.phone : "",
    email: participant ? participant.email : "",
    createBy: state_getuserlogindata ? state_getuserlogindata._id : "",
    confirm_password: participant ? participant.password : "",
    organizationId: participant ? participant.organizationId : ""
  }

  const ParticipantSchema = yup.object().shape({
    participantName: yup
      .string()
      .required("Vui lòng nhập tên đối tượng!"),
    code: yup
      .string()
      .required("Vui lòng nhập mã đối tượng!"),
    participantType: yup
      .string()
      .required('Loại đối tượng là bắt buộc'),
    address: yup
      .string()
      .required('Địa chỉ là bắt buộc'),
    phone: yup
      .string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Trường số điện thoại phải là dạng số")
      .required("Số điện thoại là bắt buộc"),
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email('Chưa đúng định dạng email'),
    // password: yup
    //   .string()
    //   .required('Mật khẩu là bắt buộc')
    //   .matches(
    //     /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
    //     "Mật khẩu phải chứa 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt"
    //   ),
    // confirm_password: yup
    //   .string()
    //   .required('Mật khẩu là bắt buộc')
    //   .test('match', 'Mật khẩu xác nhận chưa đúng', function (confirm_password) {
    //     return confirm_password === this.parent.password
    //   })
  });

  useEffect(() => {
    setCheckEdit(props.checkEdit)
  }, [props.checkEdit])

  useEffect(() => {
    setOpenParticipantForm(openParticipantForm)
  }, [openParticipantForm])

  useEffect(() => {
    setParticipant(props.participant)
  }, [props.participant])

  const handleOpen = () => {
    setOpenModal(true);
    setOpenParticipantForm(true)
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenParticipantForm(false)
  };

  function handleChangeImage(e) {
    if (e.size > 1000000) {
      toast({ type: "warning", message: "Kích thước hình phải < 1MB" });
    }
    else {
      let reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result)
      };
      reader.readAsDataURL(e)
    }

  }

  return (
    <React.Fragment>
      {checkEdit ? (
        <Tooltip title="Chỉnh sửa" placement="top-start">
          <IconButton
            className={classes.iconButton}
            aria-label="edit"
            size="small"
            color="primary"
            onClick={handleOpen}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          size="small"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleOpen}
        >
          Thêm mới
        </Button>
      )}
      <Dialog
        open={openParticipantForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
        scroll="body"
      >
        <Formik
          initialValues={initialFormValues}
          validationSchema={ParticipantSchema}
          onSubmit={(values: any) => {
            // tìm id của customer
            const dataCustomer_: any = customerData.find(
              (item) => item.name_customer === inputCustomer
            );
            Object.assign(values, { "icon": image})
            if (checkEdit) {
              dispatch(updateData(values))
            }
            else {
              values.organizationId = dataCustomer_?._id;
              dispatch(createData(values))
            }
            NProgress.start()
          }}
        >
          {(props) => {

            return (
              <form onSubmit={props.handleSubmit}>
                <DialogTitle
                  id="form-dialog-title"
                  className={classes.dialogTitle}
                >
                  {!checkEdit
                    ? "Thêm mới đối tượng"
                    : "Cập nhật đối tượng"}
                </DialogTitle>
                <DialogContent>
                  <Grid container>
                    <Grid item xs={12} sm={6} className={classes.gridColumn}>
                      <Grid item>
                        <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Tên đối tác
                    </InputLabel>
                    {!checkEdit ?(<FormControl
                      fullWidth={true}
                      size="medium"
                      variant="outlined"
                      style={{ margin: 8 }}
                    >
                      <Autocomplete
                        
                        id="combo-box-demo"
                        options={customerData}
                        getOptionLabel={(option) => option.name_customer}
                        inputValue={inputCustomer}
                        onInputChange={(event, newInputValue) => {
                          setInputCustomer(newInputValue);
                          setErrorCustomer(false);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="medium"
                          />
                        )}
                      />
                      {errorCustomer ? (
                        <Typography
                          style={{
                            marginLeft: 14,
                            marginTop: 5,
                            fontSize: "0.75rem",
                            color: "#f44336",
                          }}
                        >
                          Vui lòng chọn đối tác{" "}
                        </Typography>
                      ) : null}
                    </FormControl>) : (
                      <FormControl
                      fullWidth={true}
                      size="medium"
                      variant="outlined"
                      style={{ margin: 8 }}
                      
                    >
                      <Select
                      disabled
                        name="organizationId"
                        id="organizationId"
                        value={props.values.organizationId}
                        onChange={props.handleChange}
                      >
                        {customerData !== null
                          ? customerData.map((data, index) => (
                              <MenuItem key={index} value={data._id}>
                                {data.name_customer}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                     
                    </FormControl>
                    )}
                    
                   
                   
                          {/* <Autocomplete
                            id="combo-box-demo"
                            style={{ margin: 8 }}                       
                            fullWidth  

                            options={customerData}
                            onChange={(e, value: ICustomer) => {
                              props.setFieldValue("participantIsChildOf", value._id)
                          }}
                            getOptionLabel={(option) => option.name_customer}
                            renderInput={(params) => <TextField {...params} 
                            //label={"props.values.participantIsChildOf"} 
                            variant="outlined" />}
                          /> */}
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Tên đối tượng
                          </InputLabel>
                          <TextField
                            name="participantName"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào tên đối tượng!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.participantName}
                            onChange={props.handleChange}
                            error={
                              props.touched.participantName && Boolean(props.errors.participantName)
                            }
                            helperText={props.touched.participantName && props.errors.participantName}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Địa chỉ</InputLabel>

                          <TextField
                            name="address"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào địa chỉ!"
                            fullWidth
                            multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.address}
                            onChange={props.handleChange}
                            error={
                              props.touched.address && Boolean(props.errors.address)
                            }
                            helperText={props.touched.address && props.errors.address}
                          />

                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Số điện thoại</InputLabel>
                          <TextField
                            name="phone"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào số điện thoại!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.phone}
                            onChange={props.handleChange}
                            error={
                              props.touched.phone && Boolean(props.errors.phone)
                            }
                            helperText={props.touched.phone && props.errors.phone}
                          />
                        </Grid>

                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridColumn}>
                      <Grid item>
                        <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>Icon</InputLabel>
                        <input
                          
                            type="file"
                            name="icon"                           
                            className={classes.icons}
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(event: any) => {
                              props.setFieldValue("icon", handleChangeImage(event.currentTarget.files[0]));
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Email</InputLabel>
                          <TextField
                            disabled={checkEdit ? true : false}
                            name="email"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào email!"
                            fullWidth
                            multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.email}
                            onChange={props.handleChange}
                            error={
                              props.touched.email && Boolean(props.errors.email)
                            }
                            helperText={props.touched.email && props.errors.email}
                          />
                        </Grid>
                        {/* <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Mật khẩu</InputLabel>
                          <TextField
                            disabled={checkEdit ? true : false}
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào mật khẩu!"
                            fullWidth
                            // multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.password}
                            onChange={props.handleChange}
                            error={
                              props.touched.password && Boolean(props.errors.password)
                            }
                            helperText={props.touched.password && props.errors.password}
                          />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Xác nhận mật khẩu</InputLabel>
                          <TextField
                            disabled={checkEdit ? true : false}
                            name="confirm_password"
                            type="password"
                            autoComplete="password"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào mật khẩu!"
                            fullWidth
                            // multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={!checkEdit ? props.values.confirm_password : props.values.password}
                            onChange={props.handleChange}
                            error={
                              props.touched.confirm_password && Boolean(props.errors.confirm_password)
                            }
                            helperText={props.touched.confirm_password && props.errors.confirm_password}
                          />
                        </Grid> */}
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Loại đối tượng</InputLabel>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            style={{ margin: 8 }}
                          >
                            <Select
                              name="participantType"
                              value={props.values.participantType}
                              onChange={props.handleChange}
                            >
                              {typeParticipantData.map((data, index) => (
                                <MenuItem key={index} value={data._id}>
                                  {data.description}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Mã đối tượng</InputLabel>
                          <TextField
                            name="code"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nhập vào mã đối tượng!"
                            fullWidth
                            multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.code}
                            onChange={props.handleChange}
                            error={
                              props.touched.code && Boolean(props.errors.code)
                            }
                            helperText={props.touched.code && props.errors.code}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    onClick={handleClose}
                    color="default"
                  >
                    Đóng
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    type="submit"
                  >
                    Lưu
                  </Button>
                </DialogActions>
              </form>
            )
          }
          }
        </Formik>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
