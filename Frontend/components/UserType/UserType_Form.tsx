import React, { useEffect, useState, Component } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import NProgress from "nprogress";
import {
  IUserType,
  UserTypeState,
  addUserType,
  updateUserType,
} from "../../redux/actions/UserTypeActions";
import { IUserProfile } from '../../redux/actions/LoginActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    background: "white",
  },
  root: {
    minWidth: 275,
  },
  button: {
    margin: theme.spacing(1),
    // fontSize: "small"
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  dialogTitle: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  grid: {
    padding: '20px 20px 20px 0px',
  },
  gridItem: {
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    opacity: "1.2 !important",
    color: "#fff",
  },
}));
interface IUsertype {
  _id: string;
  orderNo: string;
  name: string;
  note: string;
  objectId: string;
}
export default function User_Type_Form(props){
  const classes = useStyles();
  const [openUserTypeForm, setOpenUserTypeForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [userType, setUserType] = React.useState<IUsertype|null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] =React.useState(false);

  const state_getuserlogindata: IUserProfile = useSelector((state: any) => state.Login.getuserlogindata);
  const dispatch = useDispatch()

  useEffect(()=>{
    setCheckEdit(props.checkEdit)
  },[props.checkEdit])

  useEffect(()=>{
    setOpenUserTypeForm(openUserTypeForm)
  },[openUserTypeForm])

  useEffect(()=>{
    setUserType(props.userType)
  },[props.userType])

  const handleOpen = () => {
    setOpenModal(true);
    setOpenUserTypeForm(true)
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenUserTypeForm(false)
  };

  // console.log("=========================================");
  // console.log("openUserTypeForm", openUserTypeForm);
  // console.log("checkEdit", checkEdit);
  
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
        open={openUserTypeForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <Formik
          initialValues={{
            _id: userType ? userType._id : "",
            orderNo: userType ? userType.orderNo : "",
            name: userType ? userType.name : "",
            note: userType ? userType.note : "",
            objectId: state_getuserlogindata["_id"]
          }}
          validationSchema={yup.object({
            orderNo: yup
              .number()
              .min(0, "Số thứ tự không hợp lệ!")
              .required("Vui lòng nhập Số thứ tự!"),
            name: yup
              .string()
              .min(3, "Loại người dùng quá ngắn!")
              .max(50, "Loại người dùng quá dài!")
              .required("Vui lòng nhập Loại người dùng!"),
            note: yup
              .string()
              .min(3, "Ghi chú quá ngắn!")
              .max(256, "Ghi chú quá dài!")
              // .required("Vui lòng nhập Ghi chú"),
          })}
          onSubmit={(values: IUserType, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if (checkEdit) {
              dispatch(updateUserType(values));
              NProgress.start();
            } else {
                dispatch(addUserType(values));
                NProgress.start();
                resetForm({ values: { 
                  _id: "", 
                  orderNo: "", 
                  name: "", 
                  note: "", 
                  objectId: state_getuserlogindata["_id"] } })
              // }
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle
                id="form-dialog-title"
                className={classes.dialogTitle}
              >
                {!checkEdit
                  ? "Thêm mới Loại người dùng"
                  : "Cập nhật Loại người dùng"}
              </DialogTitle>
              <DialogContent>
                <Grid container className={classes.grid}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft : "10px"}}>STT</InputLabel>
                      
                        <TextField
                          size="small"
                          name="orderNo"
                          id="orderNo-input"
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào số thứ tự!"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="number"
                          value={props.values.orderNo}
                          onChange={props.handleChange}
                          error={
                            props.touched.orderNo &&
                            Boolean(props.errors.orderNo)
                          }
                          helperText={
                            props.touched.orderNo && props.errors.orderNo
                          }
                        />
                      
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft : "10px"}}>
                        Loại người dùng
                      </InputLabel>
                      
                        <TextField
                          size="small"
                          name="name"
                          id="name-input"
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào loại người dùng!"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={props.values.name}
                          onChange={props.handleChange}
                          error={
                            props.touched.name && Boolean(props.errors.name)
                          }
                          helperText={props.touched.name && props.errors.name}
                        />
                      
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <InputLabel id="" style={{ marginLeft : "10px"}}>Ghi chú</InputLabel>
                      
                        <TextField
                          size="small"
                          name="note"
                          id="note-input"
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào ghi chú!"
                          fullWidth
                          multiline
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={props.values.note}
                          onChange={props.handleChange}
                          error={
                            props.touched.note && Boolean(props.errors.note)
                          }
                          helperText={props.touched.note && props.errors.note}
                        />
                      
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
          )}
        </Formik>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
