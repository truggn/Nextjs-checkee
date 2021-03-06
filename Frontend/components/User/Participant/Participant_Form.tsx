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
import { IListParticipant, createData, updateData } from "../../../redux/actions/user/ParticipantActions";
import { ITypeParticipant, loadTypeParticipant } from "../../../redux/actions/TypeParticipantActions";
import NProgress from 'nprogress'
import {
  ICustomer,
} from "../../../redux/actions/CustomerActions";
import { IUserProfile } from "../../../redux/actions/LoginActions";
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

  console.log(inputCustomer)

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
      .required("Vui l??ng nh???p t??n ?????i t?????ng!"),
    code: yup
      .string()
      .required("Vui l??ng nh???p m?? ?????i t?????ng!"),
    participantType: yup
      .string()
      .required('Lo???i ?????i t?????ng l?? b???t bu???c'),
    address: yup
      .string()
      .required('?????a ch??? l?? b???t bu???c'),
    phone: yup
      .string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Tr?????ng s??? ??i???n tho???i ph???i l?? d???ng s???")
      .required("S??? ??i???n tho???i l?? b???t bu???c"),
    email: yup
      .string()
      .required('Email l?? b???t bu???c')
      .email('Ch??a ????ng ?????nh d???ng email'),
    // password: yup
    //   .string()
    //   .required('M???t kh???u l?? b???t bu???c')
    //   .matches(
    //     /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
    //     "M???t kh???u ph???i ch???a 1 k?? t??? vi???t hoa, 1 k?? t??? s??? v?? 1 k?? t??? ?????c bi???t"
    //   ),
    // confirm_password: yup
    //   .string()
    //   .required('M???t kh???u l?? b???t bu???c')
    //   .test('match', 'M???t kh???u x??c nh???n ch??a ????ng', function (confirm_password) {
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
      toast({ type: "warning", message: "K??ch th?????c h??nh ph???i < 1MB" });
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
        <Tooltip title="Ch???nh s???a" placement="top-start">
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
          Th??m m???i
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
            // t??m id c???a customer
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
                    ? "Th??m m???i ?????i t?????ng"
                    : "C???p nh???t ?????i t?????ng"}
                </DialogTitle>
                <DialogContent>
                  <Grid container>
                    <Grid item xs={12} sm={6} className={classes.gridColumn}>
                      <Grid item>
                        <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                      T??n ?????i t??c
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
                          console.log(event)
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
                          Vui l??ng ch???n ?????i t??c{" "}
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
                            T??n ?????i t?????ng
                          </InputLabel>
                          <TextField
                            name="participantName"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nh???p v??o t??n ?????i t?????ng!"
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
                          <InputLabel id="" style={{ marginLeft: "10px" }}>?????a ch???</InputLabel>

                          <TextField
                            name="address"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nh???p v??o ?????a ch???!"
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
                          <InputLabel id="" style={{ marginLeft: "10px" }}>S??? ??i???n tho???i</InputLabel>
                          <TextField
                            name="phone"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nh???p v??o s??? ??i???n tho???i!"
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
                            placeholder="Nh???p v??o email!"
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
                          <InputLabel id="" style={{ marginLeft: "10px" }}>M???t kh???u</InputLabel>
                          <TextField
                            disabled={checkEdit ? true : false}
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nh???p v??o m???t kh???u!"
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
                          <InputLabel id="" style={{ marginLeft: "10px" }}>X??c nh???n m???t kh???u</InputLabel>
                          <TextField
                            disabled={checkEdit ? true : false}
                            name="confirm_password"
                            type="password"
                            autoComplete="password"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nh???p v??o m???t kh???u!"
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
                          <InputLabel id="" style={{ marginLeft: "10px" }}>Lo???i ?????i t?????ng</InputLabel>
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
                          <InputLabel id="" style={{ marginLeft: "10px" }}>M?? ?????i t?????ng</InputLabel>
                          <TextField
                            name="code"
                            variant="outlined"
                            style={{ margin: 8 }}
                            placeholder="Nh???p v??o m?? ?????i t?????ng!"
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
                    ????ng
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    type="submit"
                  >
                    L??u
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
