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
import { TextField } from "@material-ui/core";
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
import { useStyles, useRowStyles } from './UserManage_Form.styles'
import NProgress from 'nprogress'
import {
  ICustomer,
} from "../../redux/actions/CustomerActions";
import {
  IListUser,
} from "./../../redux/actions/ListUserActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { ICreateUserManage, createUserManage, } from "Frontend/redux/actions/UserManageActions";

export default function Participant_Form(props) {
  const classes = useStyles();
  const [openParticipantForm, setOpenParticipantForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [userManage, setUserManage] = React.useState<any>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const customerData: ICustomer[] =
    useSelector((state: any) => state.Customer.customerData) || [];
  const listUserData: IListUser[] =
    useSelector((state: any) => state.ListUser.listUserdata) || [];
  const dispatch = useDispatch();
  const initialFormValues = {
    userId: userManage ? userManage.userId : "",
    organizationId: userManage ? userManage.organizationId : ""
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
      .required('S??? ??i???n tho???i l?? b???t bu???c'),
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
    setUserManage(props.userManage)
  }, [props.userManage])

  const handleOpen = () => {
    setOpenModal(true);
    setOpenParticipantForm(true)
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenParticipantForm(false)
  };


  // console.log("=========================================");
  // console.log("openParticipantForm", openParticipantForm);
  // console.log("checkEdit", checkEdit);
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
        maxWidth="xs"
        scroll="body"
      >
        <Formik
          initialValues={initialFormValues}
          //validationSchema={ParticipantSchema}
          onSubmit={(values: ICreateUserManage) => {
            console.log("aaa", values)
            dispatch(createUserManage(values))
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
                    ? "Th??m m???i qu???n l?? ng?????i d??ng"
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
                          <FormControl
                            variant="outlined"
                            fullWidth
                            style={{ margin: 8 }}
                          >
                            <Select
                              id="organizationId"
                              name="organizationId"
                              value={props.values.organizationId}
                              onChange={props.handleChange}
                            >
                              {customerData.map((data, index) => (
                                <MenuItem key={index} value={data._id}>
                                  {data.name_customer}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridColumn}>
                      <Grid item>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            T??n ng?????i d??ng
                          </InputLabel>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            style={{ margin: 8 }}
                          >
                            <Select
                              id="userId"
                              name="userId"
                              value={props.values.userId}
                              onChange={props.handleChange}
                            >
                              {listUserData.map((data, index) => (
                                <MenuItem key={index} value={data._id}>
                                  {data.firstName + " " + data.lastName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
