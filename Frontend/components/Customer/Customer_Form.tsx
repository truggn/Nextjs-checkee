import React, { useEffect, useState, Component, Fragment } from "react";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Formik, useFormik, Field, FieldArray } from "formik";
import * as yup from "yup";
import Backdrop from "@material-ui/core/Backdrop";
import NProgress from "nprogress";

import axios from "axios";
//styles
import { useStyles, useRowStyles } from "./Customer_Form.styles";
import {
  createCustomerStart,
  updateCustomerStart,
} from "Frontend/redux/actions/CustomerActions";

export function CertificateRow(props) {
  const classes = useRowStyles();
  const [totalSize, setTotalSize] = React.useState(0);
  const LIMIT = 1000;
  const { form, field } = props;
  const { viewOnly } = props;
  const [certs, setCerts] = React.useState(props.value || []);
  const imageUploadEl:any = React.useRef(null);
  const currentError = !viewOnly && form.errors[field.name];
  const currentTouched = !viewOnly && form.touched[field.name];

  useEffect(() => {
    //Set size ban đầu cho list chứng chỉ
    calcTotalSize(certs);
  }, []);

  useEffect(() => {
    //Set size ban đầu cho list chứng chỉ
    if (!props.viewOnly) {
      if (totalSize > LIMIT) {
        form.setFieldError("sizeLimit", "Tổng kích thước vượt quá giới hạn");
      } else {
        form.setFieldError("sizeLimit", undefined);
      }
    }
  }, [totalSize]);

  useEffect(() => {
    if (!viewOnly) {
      form.setFieldValue("certificate_image", certs);
      form.setFieldTouched("certificate_image", true, false);
    }
  }, [certs]);

  const handleUploadCertificate = async (e) => {
    const { files } = e.target;
    let toAddArr: any = [];
    await Promise.all(
      Array.from(files).map(async (file) => {
        toAddArr.push(await readCertificateAsync(file));
      })
    );
    setCerts([...certs, ...toAddArr]);
    calcTotalSize([...certs, ...toAddArr]);
  };

  const readCertificateAsync = async (file) => {
    return new Promise((resolve, reject) => {
      let mimeType = file.name.split(".").reverse()[0];
      if (file) {
        const reader: any = new FileReader();
        reader.onload = (readerEvt) => {
          let binaryString = readerEvt.target.result as string;
          let base64 =
            "data:image/" + mimeType + ";base64," + btoa(binaryString);
          //base64
          resolve(base64);
        };
        reader.readAsBinaryString(file);
      }
    });
  };

  const handleRemoveImage = (img) => {
    setCerts(certs.filter((item) => item !== img));
    setTotalSize(totalSize - calcFileSize(img));
  };

  const calcFileSize = (base64String) => {
    let stringLength = base64String.length - "data:image/png;base64,".length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    let sizeInKb = sizeInBytes / 1000;
    return sizeInKb;
  };

  const calcTotalSize = (arr) => {
    const initSize = arr.reduce((acc, i) => (acc += calcFileSize(i)), 0);
    setTotalSize(initSize);
  };

  return (
    <React.Fragment>
      <Box
        boxShadow={1}
        padding={1}
        borderRadius={5}
        margin={2}
        style={{ position: "relative" }}
      >
        <Grid
          container
          className={classes.paper}
          style={{ marginLeft: "20px", boxSizing: "border-box" }}
        >
          <GridList
            className={classes.gridList}
            cols={4}
            spacing={10}
            cellHeight={80}
          >
            {certs.map((img, index) => (
              <GridListTile key={index} className={classes.tile}>
                <img src={img} />
                {!props.viewOnly && (
                  <GridListTileBar
                    title={""}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                    actionIcon={
                      <IconButton
                        aria-label={"image delete"}
                        style={{ color: "white" }}
                        onClick={(e) => {
                          handleRemoveImage(img);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon className={classes.title} />
                      </IconButton>
                    }
                  />
                )}
              </GridListTile>
            ))}
            {!props.viewOnly && (
              <GridListTile
                key={"delete"}
                className={`${classes.tile} ${classes.addTile}`}
                onClick={() => imageUploadEl.current.click()}
              >
                <IconButton aria-label={"image add"} disabled>
                  <AddCircleOutlineOutlinedIcon className={classes.title} />
                </IconButton>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imageUploadEl}
                  // multiple
                  type="file"
                  onChange={(e) => {
                    handleUploadCertificate(e);
                  }}
                />
              </GridListTile>
            )}
          </GridList>
        </Grid>
      </Box>
      <Typography
        color={totalSize > LIMIT ? "error" : "primary"}
        variant={"caption"}
        style={{ marginLeft: "20px" }}
      >
        Tổng kích thước: {Math.abs(totalSize / 1000).toFixed(2)} MB
      </Typography>
      {currentError && currentTouched && (
        <Typography
          color={"error"}
          variant={"caption"}
          style={{ marginLeft: "20px" }}
        >
          {currentError}
        </Typography>
      )}
    </React.Fragment>
  );
}

interface ICustomer {
  _id: string;
  name_customer: string;
  taxCode: number;
  bank : string;
  account_number: number;
  address: string;
  phone: string;
  fax: number;
  email: string;
  certificate_image: string[];
  code: string;
  certificates: string[];
  password:string
}


export default function Customer_Form(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openCustomerForm, setOpenCustomerForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [customer, setCustomer] = React.useState<ICustomer|null>(null);
  const [waiting, setWaiting] = React.useState(false);
  const [formChanged, setFormChanged] = React.useState(false);
  const [certificates, setCertificates] = React.useState(
    customer ? customer.certificates : []
  );
  const requestState = useSelector(({ Customer }: any) => Customer) || null; // get error and working state

  const initialFormValues = {
    id: customer ? customer._id : "",
    name_customer: customer ? customer.name_customer : "",
    password: !checkEdit ? (customer ? customer.password : "") : null,
    taxCode: customer ? customer.taxCode : "",
    bank: customer ? customer.bank : "",
    account_number: customer ? customer.account_number : "",
    address: customer ? customer.address : "",
    phone: customer ? customer.phone : "",
    fax: customer ? customer.fax : "",
    email: customer ? customer.email : "",
    certificate_image: customer ? customer.certificate_image : [],
  };

  useEffect(() => {
    // stop waiting if process is
    if (!requestState.isWorking) {
      setWaiting(false);
      NProgress.done();
      // close form if no error was returned
      if (!requestState.error) {
        setOpenCustomerForm(false);
      }
    }
  }, [requestState.customerData]);

  useEffect(() => {
    setCheckEdit(props.checkEdit);
  }, [props.checkEdit]);

  useEffect(() => {
    setOpenCustomerForm(openCustomerForm);
  }, [openCustomerForm]);

  useEffect(() => {
    setCustomer(props.customer);
    setCertificates(props.customer?.certificates);
  }, [props.customer]);

  const handleOpen = () => {
    setOpenCustomerForm(true);
  };

  const handleClose = () => {
    setOpenCustomerForm(false);
  };

  const handleFieldChange = (e, { handleChange, setFieldTouched }) => {
    handleChange(e);
    setFieldTouched(e.target.name_customer, true, false);
  };

  const calcFileSize = (base64String) => {
    let stringLength = base64String.length - "data:image/png;base64,".length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    let sizeInKb = sizeInBytes / 1000;
    return sizeInKb;
  };

  const handleSubmit = (values) => {
    NProgress.start();
    setWaiting(true);
    if (!checkEdit) {
      // create new
      if (values) {
        // dispatch(createCustomerStart(values));
      }
    } else if (checkEdit) {
      if (values) {
        dispatch(updateCustomerStart(values));
      }
    }
  };

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
        open={openCustomerForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
        scroll="body"
      >
        <Formik
          initialValues={initialFormValues}
          validationSchema={yup.object({
            name_customer: yup
              .string()
              .min(3, "Loại người dùng quá ngắn!")
              .max(50, "Loại người dùng quá dài!")
              .required("Vui lòng nhập Loại người dùng!"),
            taxCode: yup
              .string()
              .matches(/^\d+$/, "Trường mã số thuế phải là dạng số")
              .required("Mã số thuế là bắt buộc"),
            account_number: yup
              .string()
              .matches(/^\d+$/, "Trường tài khoản ngân hàng phải là dạng số")
              .required("Tài khoản ngân hàng là bắt buộc"),
            bank: yup.string().required("Tài khoản ngân hàng là bắt buộc"),
            address: yup.string().required("Địa chỉ là bắt buộc"),
            phone: yup
              .string()
              .matches(/^\d+$/, "Trường số điện thoại phải là dạng số")
              .required("Số điện thoại là bắt buộc"),
            fax: yup
              .string()
              .matches(/^\d+$/, "Trường fax phải là dạng số")
              .required("Số fax là bắt buộc"),
            email: yup
              .string()
              .email("Email không hợp lệ")
              .required("Email là bắt buộc"),
          })}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              onChange={() => setFormChanged(true)}
            >
              {/* {
                console.log(props.errors)
              } */}
              <DialogTitle
                id="form-dialog-title"
                className={classes.dialogTitle}
              >
                {!checkEdit ? "Thêm mới đối tác" : "Cập nhật đối tác"}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12} sm={6} className={classes.gridColumn}>
                    <Grid item>
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Tên đối tác
                        </InputLabel>
                        <TextField
                          size="small"
                          name="name_customer"
                          id={"customer_name" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào loại người dùng!"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={props.values.name_customer}
                          onChange={(e) => handleFieldChange(e, props)}
                          error={
                            props.touched.name_customer &&
                            Boolean(props.errors.name_customer)
                          }
                          helperText={
                            props.touched.name_customer &&
                            props.errors.name_customer
                          }
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Mã số thuế
                        </InputLabel>
                        <TextField
                          size="small"
                          name="taxCode"
                          id={"taxcode_" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào mã số thuế!"
                          fullWidth
                          multiline
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={props.values.taxCode}
                          onChange={(e) => handleFieldChange(e, props)}
                          error={
                            props.touched.taxCode &&
                            Boolean(props.errors.taxCode)
                          }
                          helperText={
                            props.touched.taxCode && props.errors.taxCode
                          }
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Địa chỉ
                        </InputLabel>

                        <TextField
                          size="small"
                          name="address"
                          id={"address_" + props.values.id}
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
                          onChange={(e) => handleFieldChange(e, props)}
                          error={
                            props.touched.address &&
                            Boolean(props.errors.address)
                          }
                          helperText={
                            props.touched.address && props.errors.address
                          }
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Email
                        </InputLabel>

                        <TextField
                          size="small"
                          name="email"
                          id={"email_" + props.values.id}
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
                          onChange={(e) => handleFieldChange(e, props)}
                          error={
                            props.touched.email && Boolean(props.errors.email)
                          }
                          helperText={props.touched.email && props.errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Số điện thoại
                        </InputLabel>

                        <TextField
                          size="small"
                          name="phone"
                          id={"phone_" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào số điện thoại!"
                          fullWidth
                          multiline
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={props.values.phone}
                          onChange={(e) => handleFieldChange(e, props)}
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
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Fax
                        </InputLabel>
                        <TextField
                          size="small"
                          name="fax"
                          id={"fax_" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nhập vào số fax!"
                          fullWidth
                          multiline
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={props.values.fax}
                          onChange={(e) => handleFieldChange(e, props)}
                          error={props.touched.fax && Boolean(props.errors.fax)}
                          helperText={props.touched.fax && props.errors.fax}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.gridItem}>
                        <Grid container>
                          <Grid item xs={12} sm={7}>
                            <InputLabel id="" style={{ marginLeft: "10px" }}>
                              Tài khoản ngân hàng
                            </InputLabel>
                            <TextField
                              size="small"
                              name="account_number"
                              id={"account_number_" + props.values.id}
                              variant="outlined"
                              style={{ margin: 8, width: "98%" }}
                              placeholder="Nhập vào tài khoản ngân hàng!"
                              fullWidth
                              multiline
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={props.values.account_number}
                              onChange={(e) => handleFieldChange(e, props)}
                              error={
                                props.touched.account_number &&
                                Boolean(props.errors.account_number)
                              }
                              helperText={
                                props.touched.account_number &&
                                props.errors.account_number
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <InputLabel id="" style={{ marginLeft: "10px" }}>
                              Ngân hàng
                            </InputLabel>
                            <TextField
                              size="small"
                              name="bank"
                              id="outlined-full-width"
                              variant="outlined"
                              style={{ margin: 8 }}
                              placeholder="Nhập vào ngân hàng!"
                              fullWidth
                              multiline
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={props.values.bank}
                              onChange={(e) => handleFieldChange(e, props)}
                              error={
                                props.touched.bank && Boolean(props.errors.bank)
                              }
                              helperText={
                                props.touched.bank && props.errors.bank
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      {/*-----------------------------------Tạo mới đối tác----------------------------------*/}
                      {!checkEdit && (
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Mật khẩu
                          </InputLabel>
                          <Field
                            name="password"
                            validate={(value) => {
                              if (!value) {
                                return "Trường mật khẩu là bắt buộc";
                              } else if (
                                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
                                  value
                                )
                              ) {
                                return "Password phải bao gồm chữ cái viết hoa, viết thường, số và độ dài phải lớn hơn 8";
                              }
                            }}
                          >
                            {({ field, form: { touched, errors }, meta }) => (
                              <TextField
                                size="small"
                                id={"password_" + props.values.id}
                                type="password"
                                name="password"
                                variant="outlined"
                                style={{ margin: 8 }}
                                placeholder="Nhập vào mật khẩu!"
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={props.values.password}
                                onChange={(e) => handleFieldChange(e, props)}
                                error={
                                  props.touched.password &&
                                  Boolean(props.errors.password)
                                }
                                helperText={
                                  props.touched.password &&
                                  props.errors.password
                                }
                              />
                            )}
                          </Field>
                        </Grid>
                      )}
                      {/*-----------------------------------Tạo mới đối tác----------------------------------*/}
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Chứng chỉ (giới hạn 1MB)
                        </InputLabel>
                        <Field
                          name="certificate_image"
                          validate={(value) => {
                            if (value.length === 0) {
                              return "Chứng chỉ đi kèm phải lớn hơn 1";
                            } else {
                              let totalSize = value.reduce(
                                (acc, i) => (acc += calcFileSize(i)),
                                0
                              );
                              if (totalSize > 1000) {
                                return "Tổng dung lượng phải nhỏ hơn 1MB";
                              }
                            }
                          }}
                          value={props.values.certificate_image}
                          component={CertificateRow}
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
                  disabled={waiting}
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
      <Backdrop className={classes.backdrop} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}

// Certificates Table: Dùng cho trường hợp cho nhiều loại chứng chỉ khác nhau với nhiều hình ảnh ứng với mỗi chứng chỉ
{
  /*
export function CertificatesTable(props) {
  const classes = useStyles()
  const [dataSource, setDataSource] = React.useState(props.certs || [])
  const [deleteList, setDeleteList] = React.useState([])
  
  const pushCertificate = () => {
    setDataSource([...dataSource, { id: Math.random(), name: '', images: []}])
  }

  const removeCertificate = (item) => {
    setDataSource(dataSource.filter(cert => cert.id !== item.id))
  }

  const editCertificate = (item) => {
    setDataSource(dataSource.map(cert => cert.id === item.id ? item : cert))
    props.onSave(dataSource.map(cert => cert.id === item.id ? item : cert))
  }

  const addToDeleteList = (cert) => {
    setDeleteList([...deleteList, cert])
  }

  const clearFromDeleteList = (cert) => {
    setDeleteList(deleteList.filter(item => item.id !== cert.id))
  }

  const handleRemoveAllFromDeleteList = () => {
    setDataSource(dataSource.filter(cert => !deleteList.includes(cert)))
    setDeleteList([])
  }

  return (
    <Fragment>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {
              dataSource.map((cert) => (
                <CertificateRow 
                  cert={cert} 
                  key={cert.id} 
                  remove={(item) => removeCertificate(item)} 
                  edit={(item) => editCertificate(item)} 
                  viewOnly={props.viewOnly}
                  addToDelete={(item) => addToDeleteList(item)}
                  clearFromDelete={(item) => clearFromDeleteList(item)}
                  />
              ))
            }
            { !props.viewOnly && <CertificateRow create push={pushCertificate} remove={(item) => removeCertificate(item)} edit={(item) => editCertificate(item)}/>}
          </TableBody>
        </Table>
      </TableContainer>
      {
        deleteList.length > 0 &&
        <Grid container justify="flex-end">
          <Button size="small" variant="contained" className={classes.button} color="primary" onClick={handleRemoveAllFromDeleteList}>Lưu</Button>
        </Grid>
      }
    </Fragment>
  )
}
*/
}
