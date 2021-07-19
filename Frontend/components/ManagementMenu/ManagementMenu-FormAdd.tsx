import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { useStyles } from "./style";
import { useSelector, useDispatch } from "react-redux";
import NProgress from "nprogress";
import { IMenu, createData } from "../../redux/actions/MangementMenuAction";

//
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//-------------------------------------------
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
      className={classess.dialogTitle}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classess.closebutton}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
//create Textfiled then setvalues url and clas
export const UrlInput = (props) => {
  const listLv = useSelector((state: any) => state.SystemPage.systemPageList);
  useEffect(() => {
    let a =
      listLv !== null
        ? listLv.filter((todo) => todo._id === props.values.pageId)
        : [];
    let b = a.lenght !== 0 ? a[0] : "";

    props.setFieldValue("url", b ? b.url : "");
  }, [props.values]);

  return (
    <TextField
      variant="outlined"
      label="URL"
      placeholder="nhập URL"
      disabled
      type="text"
      fullWidth={true}
      name="url"
      size="small"
      InputLabelProps={{ shrink: true }}
      value={props.values.url}
    />
  );
};
//----------
export const CssInput = (props) => {
  const listLv = useSelector((state: any) => state.SystemPage.systemPageList);
  useEffect(() => {
    let a =
      listLv !== null
        ? listLv.filter((todo) => todo._id === props.values.pageId)
        : [];
    let b = a.lenght !== 0 ? a[0] : "";

    props.setFieldValue("clas", b ? b.icon : "");
  }, [props.values]);

  return (
    <TextField
      variant="outlined"
      label="CSS Class Icon"
      disabled
      fullWidth={true}
      name="clas"
      placeholder="fa fa-home"
      size="small"
      InputLabelProps={{ shrink: true }}
      value={props.values.clas}
    />
  );
};
//
export default function ManagementMenuFormAdd(props) {
  const { openModal, closeModal, listLvFormAdd } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  //
  const listLv0 = listLvFormAdd
    ? listLvFormAdd.filter((todo) => todo.level === 0)
    : [];
  const listLv1 = listLvFormAdd
    ? listLvFormAdd.filter((todo) => todo.level === 1)
    : [];
  const listLv2 = listLvFormAdd
    ? listLvFormAdd.filter((todo) => todo.level === 2)
    : [];
  //
  const listBig = useSelector(
    (state: any) => state.ManagementMenu.listDataManagementMenu
  );
  //
  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        // keepMounted
        onClose={closeModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={closeModal}>
          <div>
            <Typography variant="h5">Tạo Menu Mới</Typography>
          </div>
        </DialogTitle>
        <DialogContent style={{ padding: "32px 24px" }}>
          <Formik
            initialValues={{
              _id: "",
              clas: "",
              pageId: "",
              name: "",
              orderNo: 0,
              url: "",
              isDashBoard: false,
              isVisible: false,
              parentId: "",
            }}
            validationSchema={yup.object({
              name: yup.string().required("Không được bỏ trống"),
              parentId: yup.string().required("Không được bỏ trống"),
              pageId: yup.string().required("Không được bỏ trống"),
              // url: yup.string().required("Không được bỏ trống"),
              orderNo: yup
                .string()
                .matches(/^[0-9]+$/, "Không được nhập số âm")
                .required("Không được bỏ trống"),
              // clas: yup.string().required("Không được bỏ trống"),
            })}
            onSubmit={(values: IMenu, { resetForm }) => {
              // alert(JSON.stringify(values, null, 2));
              dispatch(createData(values));
              NProgress.start();
              resetForm({
                values: {
                  _id: "",
                  clas: "",
                  pageId: "",
                  name: "",
                  orderNo: 0,
                  url: "",
                  isDashBoard: false,
                  isVisible: false,
                  parentId: "",
                },
              });
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleSubmit,
                setFieldValue,
              } = props;
              return (
                <form onSubmit={handleSubmit} noValidate>
                  <div>
                    <Grid container spacing={3}>
                      {/*--------------------------------------------Tên-Menu----------------------------------------- */}
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          label="Tên"
                          id="name"
                          placeholder="Tên Menu"
                          name="name"
                          onChange={handleChange}
                          fullWidth={true}
                          size="small"
                          required
                          InputLabelProps={{ shrink: true }}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>

                      {/*-----------------------------------------------Tên-Menu-Cha----------------------------------------- */}
                      <Grid item xs={6}>
                        <FormControl
                          fullWidth={true}
                          size="small"
                          variant="outlined"
                        >
                          <InputLabel htmlFor="demo-simple-select-label" shrink>
                            {touched.parentId && Boolean(errors.parentId) ? (
                              <span className={classes.boolean}>
                                Tên Menu Cha *
                              </span>
                            ) : (
                              <span>Tên Menu Cha *</span>
                            )}
                          </InputLabel>
                          <Select
                            variant="outlined"
                            native
                            name="parentId"
                            labelWidth={120}
                            onChange={handleChange}
                            defaultValue="-"
                            error={touched.parentId && Boolean(errors.parentId)}
                          >
                            <option disabled value="-">
                              Vui lòng chọn
                            </option>
                            <option disabled></option>
                            <option value="0">Hủy chọn - Menu Cha</option>
                            <option value=" ">Menu</option>
                            {listBig !== null
                              ? listBig
                                  .filter((menu) => menu.parentId === "0")
                                  .map((menu, index) => {
                                    return (
                                      <option key={index} value={menu._id}>
                                        {menu.name}
                                      </option>
                                    );
                                  })
                              : ""}
                          </Select>
                          <div className={classes.helptext}>
                            {touched.parentId && errors.parentId}
                          </div>
                        </FormControl>
                      </Grid>

                      {/*--------------------------------------------Trang------------------------------------------ */}
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
                            {touched.pageId && Boolean(errors.pageId) ? (
                              <span className={classes.boolean}>Trang *</span>
                            ) : (
                              <span>Trang *</span>
                            )}
                          </InputLabel>
                          <Select
                            name="pageId"
                            labelWidth={50}
                            native
                            fullWidth={true}
                            defaultValue="-"
                            onChange={handleChange}
                            error={touched.pageId && Boolean(errors.pageId)}
                          >
                            <option value="-" disabled>
                              Chọn Trang
                            </option>
                            <option disabled></option>
                            <optgroup label="Module - level 0">
                              {listLv0 !== null
                                ? listLv0.map((page, index) => (
                                    <option
                                      key={index}
                                      value={page._id}
                                      data-url={String(page.url)}
                                    >
                                      {page.name}
                                    </option>
                                  ))
                                : ""}
                            </optgroup>
                            <option disabled></option>
                            <optgroup label="Function - level 1">
                              {listLv1 !== null
                                ? listLv1.map((page, index) => (
                                    <option
                                      key={index}
                                      value={page._id}
                                      data-url={String(page.url)}
                                    >
                                      {page.name}
                                    </option>
                                  ))
                                : ""}
                            </optgroup>
                            <option disabled></option>
                            <optgroup label="Status - level 2">
                              {listLv2 !== null
                                ? listLv2.map((page, index) => (
                                    <option
                                      key={index}
                                      value={page._id}
                                      data-url={String(page.url)}
                                    >
                                      {page.name}
                                    </option>
                                  ))
                                : ""}
                            </optgroup>
                          </Select>
                          <div className={classes.helptext}>
                            {touched.pageId && errors.pageId}
                          </div>
                        </FormControl>
                      </Grid>
                      {/*--------------------------------------------URL------------------------------------------ */}
                      <Grid item xs={6}>
                        <UrlInput
                          name="url"
                          onChange={handleChange}
                          value={values.url}
                          values={values}
                          setFieldValue={setFieldValue}
                          // InputLabelProps={{ shrink: true }}
                          error={touched.url && Boolean(errors.url)}
                          helperText={touched.url && errors.url}
                        />
                      </Grid>
                      {/*-----------------------------------------STT-------------------------------------------- */}
                      <Grid item xs={6}>
                        <TextField
                          variant="outlined"
                          type="number"
                          label="STT"
                          name="orderNo"
                          onChange={handleChange}
                          fullWidth={true}
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          error={touched.orderNo && Boolean(errors.orderNo)}
                          helperText={touched.orderNo && errors.orderNo}
                        />
                      </Grid>

                      {/*------------------------------------CSS-Class-Icon----------------------------------------- */}
                      <Grid item xs={6}>
                        <CssInput
                          name="clas"
                          onChange={handleChange}
                          value={values.clas}
                          values={values}
                          setFieldValue={setFieldValue}
                          error={touched.clas && Boolean(errors.clas)}
                          helperText={touched.clas && errors.clas}
                        />
                      </Grid>
                      {/*------------------------------------visible----------------------------------------- */}
                      <Grid item xs={6}>
                        Xuất hiện
                        <Checkbox
                          size="small"
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          name="isVisible"
                          onChange={handleChange}
                        />
                      </Grid>
                      {/*------------------------------------dash-board----------------------------------------- */}
                      <Grid item xs={6}>
                        Is Dashboard
                        <Checkbox
                          size="small"
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                          name="isDashBoard"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  {/*-----------------------------------------------Button-Submit------------------------------------------- */}
                  <MuiDialogActions className={classes.DialogActions}>
                    <Button autoFocus onClick={closeModal} variant="contained">
                      Hủy
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Lưu
                    </Button>
                  </MuiDialogActions>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
//
