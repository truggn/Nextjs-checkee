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
    //Set size ban ?????u cho list ch???ng ch???
    calcTotalSize(certs);
  }, []);

  useEffect(() => {
    //Set size ban ?????u cho list ch???ng ch???
    if (!props.viewOnly) {
      if (totalSize > LIMIT) {
        form.setFieldError("sizeLimit", "T???ng k??ch th?????c v?????t qu?? gi???i h???n");
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
        T???ng k??ch th?????c: {Math.abs(totalSize / 1000).toFixed(2)} MB
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
              .min(3, "Lo???i ng?????i d??ng qu?? ng???n!")
              .max(50, "Lo???i ng?????i d??ng qu?? d??i!")
              .required("Vui l??ng nh???p Lo???i ng?????i d??ng!"),
            taxCode: yup
              .string()
              .matches(/^\d+$/, "Tr?????ng m?? s??? thu??? ph???i l?? d???ng s???")
              .required("M?? s??? thu??? l?? b???t bu???c"),
            account_number: yup
              .string()
              .matches(/^\d+$/, "Tr?????ng t??i kho???n ng??n h??ng ph???i l?? d???ng s???")
              .required("T??i kho???n ng??n h??ng l?? b???t bu???c"),
            bank: yup.string().required("T??i kho???n ng??n h??ng l?? b???t bu???c"),
            address: yup.string().required("?????a ch??? l?? b???t bu???c"),
            phone: yup
              .string()
              .matches(/^\d+$/, "Tr?????ng s??? ??i???n tho???i ph???i l?? d???ng s???")
              .required("S??? ??i???n tho???i l?? b???t bu???c"),
            fax: yup
              .string()
              .matches(/^\d+$/, "Tr?????ng fax ph???i l?? d???ng s???")
              .required("S??? fax l?? b???t bu???c"),
            email: yup
              .string()
              .email("Email kh??ng h???p l???")
              .required("Email l?? b???t bu???c"),
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
                {!checkEdit ? "Th??m m???i ?????i t??c" : "C???p nh???t ?????i t??c"}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12} sm={6} className={classes.gridColumn}>
                    <Grid item>
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          T??n ?????i t??c
                        </InputLabel>
                        <TextField
                          size="small"
                          name="name_customer"
                          id={"customer_name" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nh???p v??o lo???i ng?????i d??ng!"
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
                          M?? s??? thu???
                        </InputLabel>
                        <TextField
                          size="small"
                          name="taxCode"
                          id={"taxcode_" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nh???p v??o m?? s??? thu???!"
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
                          ?????a ch???
                        </InputLabel>

                        <TextField
                          size="small"
                          name="address"
                          id={"address_" + props.values.id}
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
                          placeholder="Nh???p v??o email!"
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
                          S??? ??i???n tho???i
                        </InputLabel>

                        <TextField
                          size="small"
                          name="phone"
                          id={"phone_" + props.values.id}
                          variant="outlined"
                          style={{ margin: 8 }}
                          placeholder="Nh???p v??o s??? ??i???n tho???i!"
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
                          placeholder="Nh???p v??o s??? fax!"
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
                              T??i kho???n ng??n h??ng
                            </InputLabel>
                            <TextField
                              size="small"
                              name="account_number"
                              id={"account_number_" + props.values.id}
                              variant="outlined"
                              style={{ margin: 8, width: "98%" }}
                              placeholder="Nh???p v??o t??i kho???n ng??n h??ng!"
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
                              Ng??n h??ng
                            </InputLabel>
                            <TextField
                              size="small"
                              name="bank"
                              id="outlined-full-width"
                              variant="outlined"
                              style={{ margin: 8 }}
                              placeholder="Nh???p v??o ng??n h??ng!"
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
                      {/*-----------------------------------T???o m???i ?????i t??c----------------------------------*/}
                      {!checkEdit && (
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            M???t kh???u
                          </InputLabel>
                          <Field
                            name="password"
                            validate={(value) => {
                              if (!value) {
                                return "Tr?????ng m???t kh???u l?? b???t bu???c";
                              } else if (
                                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
                                  value
                                )
                              ) {
                                return "Password ph???i bao g???m ch??? c??i vi???t hoa, vi???t th?????ng, s??? v?? ????? d??i ph???i l???n h??n 8";
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
                                placeholder="Nh???p v??o m???t kh???u!"
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
                      {/*-----------------------------------T???o m???i ?????i t??c----------------------------------*/}
                      <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px" }}>
                          Ch???ng ch??? (gi???i h???n 1MB)
                        </InputLabel>
                        <Field
                          name="certificate_image"
                          validate={(value) => {
                            if (value.length === 0) {
                              return "Ch???ng ch??? ??i k??m ph???i l???n h??n 1";
                            } else {
                              let totalSize = value.reduce(
                                (acc, i) => (acc += calcFileSize(i)),
                                0
                              );
                              if (totalSize > 1000) {
                                return "T???ng dung l?????ng ph???i nh??? h??n 1MB";
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
                  ????ng
                </Button>
                <Button
                  size="small"
                  disabled={waiting}
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  type="submit"
                >
                  L??u
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

// Certificates Table: D??ng cho tr?????ng h???p cho nhi???u lo???i ch???ng ch??? kh??c nhau v???i nhi???u h??nh ???nh ???ng v???i m???i ch???ng ch???
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
          <Button size="small" variant="contained" className={classes.button} color="primary" onClick={handleRemoveAllFromDeleteList}>L??u</Button>
        </Grid>
      }
    </Fragment>
  )
}
*/
}
