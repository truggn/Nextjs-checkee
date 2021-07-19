import React, { useEffect, useState, Component, useCallback } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useStyles } from "./style";
import {
  ISystemPage,
  SystemPageState,
  addSystemPage,
  updateSystemPage,
  getSystemPageByLevel
} from "../../redux/actions/SystemPageActions";
import NProgress from "nprogress";
// import { useGridReducer } from "@material-ui/data-grid";

interface ISystempage{
    _id: string;
    name: string;
    controllerName: string;
    actionName: string;
    level: number;
    icon: string;
    url: string;
    parentId: string;
    orderNo: number;
}

export default function System_Page_Form(props) {
  const classes = useStyles();
  const [openSystemPageForm, setOpenSystemPageForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [levelPage, setLevelPage] = React.useState(null);
  const [systemPage, setSystemPage] = React.useState<ISystempage|null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, checkHasError] = React.useState(false);
  const [checkSuccess , setCheckSuccess] = React.useState(false);
  const [systemPageByLevel , setSystemPageByLevel] = React.useState(null);
  const [systemPageLevel , setSystemPageLevel] = React.useState<any>(null);
  const [systemPageModule,setSystemPageModule] =  React.useState<any>([]);
  const [systemPageFunction,setSystemPageFunction] =  React.useState<any>([]);
  const [systemPageFeature,setSystemPageFeature] =  React.useState<any>([]);
  const dispatch = useDispatch();
  
  const state_checkSuccess: SystemPageState = useSelector(
    (state: any) => state.SystemPage?.checkSuccess
  );
  const state_systemPageList: ISystemPage[] = useSelector(
    (state: any) => state.SystemPage?.systemPageList
  );

  React.useEffect(() => {
    setCheckEdit(props.checkEdit);
    // setOpenSystemPageForm(openSystemPageForm);
  },[])

  React.useEffect(()=>{
    setSystemPageModule(props.systemPageModule)
    setSystemPageFunction(props.systemPageFunction)
    setSystemPageFeature(props.systemPageFeature)
  },[props])

  React. useEffect(()=>{
    setSystemPage(props.systemPage);
  },[props.systemPage])

  React.useEffect(()=>{  
    setSystemPageLevel(props.systemPageLevel)
  },[props.systemPageLevel])

  const handleOpen = () => {
    setOpenModal(true);
    setOpenSystemPageForm(true);
  };

  const handleClose = () => {
    setSystemPageLevel(props.systemPageLevel);
    setOpenModal(false);
    setOpenSystemPageForm(false);
  };

  // console.log("=========================================");
  // console.log("openSystemPageForm", openSystemPageForm);
  // console.log("checkEdit", checkEdit);

  return (
    <React.Fragment>
      {checkEdit ? (
        <Tooltip title="Chỉnh sửa" placement="top-start">
          <IconButton
            className={classes.iconButton_Form}
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
          className={classes.button_Form}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleOpen}
        >Thêm mới</Button>
      )}
      <Dialog
        open={openSystemPageForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <Formik
          initialValues={{
            _id: systemPage ? systemPage._id : "",
            name: systemPage ? systemPage.name : "",
            controllerName: systemPage ? systemPage.controllerName : "",
            actionName: systemPage ? systemPage.actionName : "",
            level: systemPage ? systemPage.level : "",
            icon: systemPage ? systemPage.icon : "",
            url: systemPage ? systemPage.url : "",
            parentId: systemPage ? systemPage.parentId : "",
            orderNo: systemPage ? systemPage.orderNo : "",
          }}
          validationSchema={yup.object({
            level: yup.number().required("Vui lòng chọn Level!"),
            name: yup
              .string()
              .min(3, "name quá ngắn!")
              .max(50, "name quá dài!")
              .required("Vui lòng nhập name!"),
            controllerName: yup
              .string()
              .min(3, "controllerName quá ngắn!")
              .max(50, "controllerName quá dài!")
              .required("Vui lòng nhập controllerName"),
            actionName: yup
              .string()
              .min(3, "actionName quá ngắn!")
              .max(50, "actionName quá dài!")
              .required("Vui lòng nhập actionName!"),
            icon: yup
              .string()
              .min(3, "icon quá ngắn!")
              .max(256, "icon quá dài!")
              .required("Vui lòng nhập icon!"),
            url: yup
              .string()
              .min(3, "url quá ngắn!")
              .max(256, "url quá dài!")
              .required("Vui lòng nhập url!"),
            parentId: yup.string().nullable().required("Vui lòng chọn parentId!"),
            orderNo: yup
              .number()
              .min(0, "orderNo không hợp lệ!")
              .required("Vui lòng nhập orderNo!"),
          })}
          onSubmit={(values: ISystemPage, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            if (checkEdit) {
              dispatch(updateSystemPage(values));
              NProgress.start();
            } else {
              let value = {
                _id: values._id,
                name: values.name,
                controllerName: values.controllerName,
                actionName: values.actionName,
                level: Number(values.level),
                icon: values.icon,
                url: values.url,
                parentId: values.parentId,
                orderNo: Number(values.orderNo),
              }
              dispatch(addSystemPage(value));
              NProgress.start();
              resetForm({
                values: {
                  _id: "",
                  name: "",
                  controllerName: "",
                  actionName: "",
                  level: "",
                  icon: "",
                  url: "",
                  parentId: "",
                  orderNo: "",
                },
              });
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle
                id="form-dialog-title"
                className={classes.dialogTitle}
              >
                {!checkEdit ? "Thêm mới Trang" : "Cập nhật Trang"}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel
                      style={{ marginLeft: "10px" }}
                      htmlFor="level-dropdown"
                    >
                      Level
                    </InputLabel>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      fullWidth
                      size="small"
                    >
                      <InputLabel htmlFor="level-dropdown">
                        Chọn
                      </InputLabel>
                      <Select
                        name="level"
                        native
                        label="level"
                        inputProps={{
                          name: "level",
                          id: "level-dropdown",
                        }}
                        value={props.values.level}
                        onChange={(e) => {
                          props.handleChange(e);
                          setSystemPageLevel(e.target.value);
                          // props.values.parentId = ""
                          // dispatch(getSystemPageByLevel(
                          //   Number(e.target.value)===2 ? 1 :
                          //   Number(e.target.value)===1 ? 0 : 3))
                        }}
                        error={
                          props.touched.level && Boolean(props.errors.level)
                        }
                        // helperText={props.touched.level && props.errors.level}
                      >
                        <option aria-label="None" value="" />
                        <option key={1} value={0}>0 - Module</option>
                        <option key={2} value={1}>1 - Function</option>
                        <option key={3} value={2}>2 - Feature</option>
                      </Select>
                      <FormHelperText style ={{ color: "#f44336"}}>
                        {props.errors.level &&
                          props.touched.level &&
                          props.errors.level}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel
                      style={{ marginLeft: "10px" }}
                      htmlFor="parentId-dropdown"
                    >
                      ParentId
                    </InputLabel>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      fullWidth
                      size="small"
                    >
                      <InputLabel htmlFor="parentId-dropdown">
                        Chọn
                      </InputLabel>
                      <Select
                        name="parentId"
                        native
                        label="parentId"
                        inputProps={{
                          name: "parentId",
                          id: "parentId-dropdown",
                        }}
                        value={props.values.parentId}
                        onChange={(e) => {props.handleChange(e)}}
                        error={
                          props.touched.parentId &&
                          Boolean(props.errors.parentId)
                        }
                      >
                        <option aria-label="None" value="" />
                        <option value={"313233343536373839313031"} disabled={(Number(systemPageLevel) == 1 || Number(systemPageLevel) == 2 || isNaN(Number(systemPageLevel))) ? true : false }>Không có</option>
                        {/* {state_systemPageLevel?.map((row,index)=>{
                          return(<option value={String(row._id)}>{row.name}</option>)
                        })} */}
                        {/* {
                          state_systemPageList.map((row,index) => {
                            return(<option value={String(row._id)}>{row.name}</option>)
                          })
                        } */}
                        <optgroup label="Module" disabled={(Number(systemPageLevel) == 2 || Number(systemPageLevel) == 0  || isNaN(Number(systemPageLevel))) ? true : false }>
                          {systemPageModule? systemPageModule.map((item,index) =>{
                             return(<option key={index} value={String(item._id)}>{item.name}</option>)
                          }) : null
                        }
                        </optgroup>
                        <optgroup label="Function" disabled={(Number(systemPageLevel) == 1 || Number(systemPageLevel) == 0 || isNaN(Number(systemPageLevel))) ? true : false }>
                        {systemPageFunction? systemPageFunction.map((item,index) =>{
                             return(<option key={index} value={String(item._id)}>{item.name}</option>)
                          }) : null
                        }
                        </optgroup>
                        <optgroup label="Feature" disabled={(Number(systemPageLevel) == 0 || Number(systemPageLevel) == 1 || Number(systemPageLevel) == 2 || isNaN(Number(systemPageLevel))) ? true : false }>
                        {systemPageFeature? systemPageFeature.map((item,index) =>{
                             return(<option key={index} value={String(item._id)}>{item.name}</option>)
                          }) : null
                        }
                        </optgroup>
                      </Select>
                      <FormHelperText style ={{ color: "#f44336"}}>
                        {props.errors.parentId &&
                          props.touched.parentId &&
                          props.errors.parentId}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel style={{ marginLeft: "10px" }}>
                      Name
                    </InputLabel>
                    <TextField
                      name="name"
                      id="name-input"
                      variant="outlined"
                      style={{ margin: 8 }}
                      placeholder="Nhập vào Name!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={props.values.name}
                      onChange={props.handleChange}
                      error={props.touched.name && Boolean(props.errors.name)}
                      helperText={props.touched.name && props.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel style={{ marginLeft: "10px" }}>
                      ControllerName
                    </InputLabel>
                    <TextField
                      name="controllerName"
                      id="controllerName-input"
                      variant="outlined"
                      style={{ margin: 8 }}
                      placeholder="Nhập vào ControllerName!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={props.values.controllerName}
                      onChange={props.handleChange}
                      error={
                        props.touched.controllerName &&
                        Boolean(props.errors.controllerName)
                      }
                      helperText={
                        props.touched.controllerName &&
                        props.errors.controllerName
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel style={{ marginLeft: "10px" }}>
                      ActionName
                    </InputLabel>
                    <TextField
                      name="actionName"
                      id="actionName-input"
                      variant="outlined"
                      style={{ margin: 8 }}
                      placeholder="Nhập vào ActionName!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={props.values.actionName}
                      onChange={props.handleChange}
                      error={
                        props.touched.actionName &&
                        Boolean(props.errors.actionName)
                      }
                      helperText={
                        props.touched.actionName && props.errors.actionName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel style={{ marginLeft: "10px" }}>
                      Icon
                    </InputLabel>
                    <TextField
                      name="icon"
                      id="icon-input"
                      variant="outlined"
                      style={{ margin: 8 }}
                      placeholder="Nhập vào Icon!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={props.values.icon}
                      onChange={props.handleChange}
                      error={props.touched.icon && Boolean(props.errors.icon)}
                      helperText={props.touched.icon && props.errors.icon}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel style={{ marginLeft: "10px" }}>
                      Url
                    </InputLabel>
                    <TextField
                      name="url"
                      id="url-input"
                      variant="outlined"
                      style={{ margin: 8 }}
                      placeholder="Nhập vào Url!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={props.values.url}
                      onChange={props.handleChange}
                      error={props.touched.url && Boolean(props.errors.url)}
                      helperText={props.touched.url && props.errors.url}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel style={{ marginLeft: "10px" }}>
                      OrderNo
                    </InputLabel>
                    <TextField
                      name="orderNo"
                      id="orderNo-input"
                      variant="outlined"
                      style={{ margin: 8 }}
                      placeholder="Nhập vào OrderNo!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="number"
                      size="small"
                      value={props.values.orderNo}
                      onChange={props.handleChange}
                      error={
                        props.touched.orderNo && Boolean(props.errors.orderNo)
                      }
                      helperText={props.touched.orderNo && props.errors.orderNo}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button_Form}
                  onClick={() => { handleClose()}}
                  color="default" 
                >
                  Đóng
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button_Form}
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
