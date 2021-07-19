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
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik, useFormik, Field, Form } from "formik";
import * as yup from "yup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
//styles
import { useStyles, useRowStyles } from "./Contract_Form.styles";
import DatePickerField from "./DatePickerField";
import {
  IContract,
  createDataContract,
  updateDataContract,
} from "../../redux/actions/ContractActions";
import { useSelector, useDispatch } from "react-redux";
import NProgress from "nprogress";
export const Textfiled = (props) => {
  useEffect(() => {
    let a = (
      parseFloat(props.values.contractValue) * parseFloat(props.values.vat)
    ).toFixed(5);
    props.setFieldValue("vatPrice", a);
  }, [props.values]);
  return (
    <TextField
      variant="outlined"
      fullWidth
      disabled
      name="vatPrice"
      placeholder="Nhập vào số thứ tự!"
      type="number"
      value={props.values.vatPrice}
    />
  );
};
//
export default function ContractForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openContractForm, setOpenContractForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState<boolean>(false);
  const [contract, setContract] = React.useState<IContract | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const fileUploadEl = React.useRef(null);

  //
  useEffect(() => {
    setCheckEdit(props.checkEdit);
  }, [props.checkEdit]);

  useEffect(() => {
    setOpenContractForm(openContractForm);
  }, [openContractForm]);

  useEffect(() => {
    setContract(props.contract);
  }, [props.contract]);
  //

  const handleOpen = () => {
    setOpenModal(true);
    setOpenContractForm(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenContractForm(false);
  };

  const handleUploadFile = (e, parentProps) => {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    let mimeType = "pdf";
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvt: any) => {
        let binaryString = readerEvt.target.result as string;
        let base64 = btoa(binaryString);
        //base64
        parentProps.setFieldValue("fileDoc", {
          name: file.name,
          chunk: base64,
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadFile = (e, parentProps) => {
    const { fileDoc } = parentProps.values;
    const linkSource = `data:application/pdf;base64,${fileDoc.chunk}`;
    console.log(linkSource);
    const downloadLink = document.createElement("a");
    const fileName = fileDoc.name;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const dataCustomer = useSelector((state: any) => state.Customer.customerData);

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
        open={openContractForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Formik
            initialValues={{
              _id: contract ? contract._id : "",
              orderNo: contract ? contract.orderNo : 1,
              customerId: contract ? contract.customerId : "",
              numberContract: contract ? contract.numberContract : "",
              nameContract: contract ? contract.nameContract : "",
              status: contract ? contract.status : "",
              date: contract ? contract.date : new Date(), // ngày ký
              startDay: contract ? contract.startDay : new Date(), // ngày có hiệu lực
              endDay: contract ? contract.endDay : new Date(), // ngày hết hiệu lực
              durationPay: contract ? contract.durationPay : new Date(),
              packageBuy: contract ? contract.packageBuy : "",
              contractValue: contract ? contract.contractValue : 0,
              vat: contract ? contract.vat : 0, // 0 -> 1
              vatPrice: contract
                ? (parseFloat(contract.contractValue) * contract.vat).toFixed(5)
                : 0.0, // tính toán từ contractValue * vat,
              publicKey: contract ? contract.publicKey : "",
              privateKey: contract ? contract.privateKey : "",
              fileDoc: contract ? contract.fileDoc : {},
            }}
            validationSchema={yup.object().shape({
              // orderNo: yup.number().required("Trường STT là bắt buộc"),
              customerId: yup
                .string()
                .required("Trường customerId là bắt buộc"),
              numberContract: yup
                .string()
                .required("Trường số hợp đồng là bắt buộc"),
              nameContract: yup
                .string()
                .required("Trường tên hợp đồng là bắt buộc"),
              status: yup
                .string()
                .required("Trường trạng thái hợp đồng là bắt buộc"),
              date: yup.date().required("Trường ngày ký là bắt buộc"), // ngày ký
              startDay: yup
                .date()
                .required("Trường ngày có hiệu lực là bắt buộc"), // ngày có hiệu lực
              endDay: yup
                .date()
                .required("Trường ngày hết hiệu lực là bắt buộc"), // ngày hết hiệu lực
              durationPay: yup
                .date()
                .required("Trường hạn thanh toán là bắt buộc"),
              packageBuy: yup
                .string()
                .required("Trường loại hợp đồng là bắt buộc"),
              contractValue: yup
                .number()
                .required("Trường giá trị hợp đồng là bắt buộc"),
              vat: yup.number().required("Trường % VAT là bắt buộc"), // 0 -> 1
              publicKey: yup
                .string()
                .required("Trường chữ ký bên A là bắt buộc"),
              privateKey: yup
                .string()
                .required("Trường chữ ký bên B là bắt buộc"),
              // fileDoc: yup
              //   .object()
              //   .nullable()
              //   .required("Trường file văn bản là bắt buộc"),
            })}
            onSubmit={(values: IContract, { resetForm }) => {
              // alert(JSON.stringify(values, null, 2));

              if (checkEdit) {
                dispatch(updateDataContract(values));
                NProgress.start();
              } else {
                dispatch(createDataContract(values));
                NProgress.start();
                resetForm({
                  values: {
                    _id: "",
                    orderNo: 1,
                    customerId: "",
                    numberContract: "",
                    nameContract: "",
                    status: "",
                    date: new Date(), // ngày ký
                    startDay: new Date(), // ngày có hiệu lực
                    endDay: new Date(), // ngày hết hiệu lực
                    durationPay: new Date(),
                    packageBuy: "",
                    contractValue: 0,
                    vat: 0, // 0 -> 1
                    vatPrice: 0.0, // tính toán từ contractValue * vat,
                    publicKey: "",
                    privateKey: "",
                    fileDoc: "",
                  },
                });
              }
            }}
          >
            {(propsFormik) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleSubmit,
                setFieldValue,
              } = propsFormik;
              return (
                <form onSubmit={handleSubmit}>
                  <DialogTitle
                    id="form-dialog-title"
                    className={classes.dialogTitle}
                  >
                    {!checkEdit ? "Thêm mới hợp đồng" : "Cập nhật hợp đồng"}
                  </DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="">STT</InputLabel>
                          <TextField
                            disabled
                            name="orderNo"
                            id="orderNo"
                            variant="outlined"
                            placeholder="Nhập vào số thứ tự!"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="number"
                            value={values.orderNo}
                            onChange={handleChange}
                            // error={
                            //   props.touched.orderNo &&
                            //   Boolean(props.errors.orderNo)
                            // }
                            // helperText={
                            //   props.touched.orderNo && props.errors.orderNo
                            // }
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Số hợp đồng
                          </InputLabel>
                          <TextField
                            name="numberContract"
                            id="numberContract"
                            variant="outlined"
                            placeholder="Nhập vào số hợp đồng!"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.numberContract}
                            onChange={handleChange}
                            error={
                              touched.numberContract &&
                              Boolean(errors.numberContract)
                            }
                            helperText={
                              touched.numberContract && errors.numberContract
                            }
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel
                            id="status-label-control"
                            style={{ marginLeft: "10px" }}
                          >
                            Trạng thái
                          </InputLabel>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              name="status"
                              id="status"
                              value={values.status}
                              onChange={handleChange}
                            >
                              <MenuItem value={0}>Chờ xử lý</MenuItem>
                              <MenuItem value={1}>Đang xử lý</MenuItem>
                              <MenuItem value={2}>Đã xử lý</MenuItem>
                              <MenuItem value={3}>Đã thanh toán</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Ngày có hiệu lực
                          </InputLabel>
                          <Field
                            name="startDay"
                            validate={(value) => {
                              if (new Date(value) < new Date(values.date)) {
                                return "Ngày có hiệu lực phải lớn hơn ngày ký";
                              }
                            }}
                            component={DatePickerField}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Hạn thanh toán
                          </InputLabel>
                          <Field
                            name="durationPay"
                            validate={(value) => {
                              if (new Date(value) < new Date(values.date)) {
                                return "Hạn thanh toán phải lớn hơn ngày ký";
                              }
                            }}
                            component={DatePickerField}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Giá trị hợp đồng
                          </InputLabel>
                          <TextField
                            name="contractValue"
                            id="contractValue"
                            variant="outlined"
                            placeholder="Nhập vào số thứ tự!"
                            fullWidth
                            type="number"
                            InputProps={{
                              inputProps: { min: 0, step: 0.01 },
                            }}
                            value={values.contractValue}
                            onChange={handleChange}
                            error={
                              touched.contractValue &&
                              Boolean(errors.contractValue)
                            }
                            helperText={
                              touched.contractValue && errors.contractValue
                            }
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            VAT price
                          </InputLabel>
                          <Textfiled
                            name="vatPrice"
                            value={values.vatPrice}
                            values={values}
                            onChange={handleChange}
                            setFieldValue={setFieldValue}
                            error={touched.vatPrice && Boolean(errors.vatPrice)}
                            helperText={touched.vatPrice && errors.vatPrice}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Chữ ký Bên B
                          </InputLabel>
                          <TextField
                            name="privateKey"
                            id="privateKey"
                            variant="outlined"
                            fullWidth
                            multiline
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.privateKey}
                            onChange={handleChange}
                            error={
                              touched.privateKey && Boolean(errors.privateKey)
                            }
                            helperText={touched.privateKey && errors.privateKey}
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="">Tên hợp đồng</InputLabel>
                          <TextField
                            name="nameContract"
                            id="nameContract"
                            variant="outlined"
                            placeholder="Nhập vào số thứ tự!"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.nameContract}
                            onChange={handleChange}
                            error={
                              touched.nameContract &&
                              Boolean(errors.nameContract)
                            }
                            helperText={
                              touched.nameContract && errors.nameContract
                            }
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Tên đối tác
                          </InputLabel>

                          <FormControl variant="outlined" fullWidth>
                            <Select
                              name="customerId"
                              id="customerId"
                              value={values.customerId}
                              onChange={handleChange}
                            >
                              {dataCustomer !== null
                                ? dataCustomer.map((data, index) => (
                                    <MenuItem key={index} value={data._id}>
                                      {data.name_customer}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Ngày ký
                          </InputLabel>
                          <Field name="date" component={DatePickerField} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Ngày hết hiệu lực
                          </InputLabel>
                          <Field
                            name="endDay"
                            validate={(value) => {
                              if (new Date(value) < new Date(values.startDay)) {
                                return "Ngày hết hiệu lực phải lớn hơn ngày có hiệu lực";
                              }
                            }}
                            component={DatePickerField}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Loại hợp đồng
                          </InputLabel>
                          <FormControl variant="outlined" fullWidth>
                            <Select
                              name="packageBuy"
                              id="packageBuy"
                              value={values.packageBuy}
                              onChange={handleChange}
                            >
                              <MenuItem value={"Trial"}>Trial</MenuItem>
                              <MenuItem value={"Standard"}>Standard</MenuItem>
                              <MenuItem value={"Premium"}>Premium</MenuItem>
                              <MenuItem value={"Enterprise"}>
                                Enterprise
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            % VAT
                          </InputLabel>
                          <TextField
                            name="vat"
                            id="vat"
                            variant="outlined"
                            placeholder="Nhập vào số thứ tự!"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="number"
                            InputProps={{
                              inputProps: { min: 0, max: 1, step: 0.01 },
                            }}
                            value={values.vat}
                            onChange={handleChange}
                            error={touched.vat && Boolean(errors.vat)}
                            helperText={touched.vat && errors.vat}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Chữ ký Bên A
                          </InputLabel>
                          <TextField
                            name="publicKey"
                            id="publicKey"
                            variant="outlined"
                            fullWidth
                            multiline
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={values.publicKey}
                            onChange={handleChange}
                            error={
                              touched.publicKey && Boolean(errors.publicKey)
                            }
                            helperText={touched.publicKey && errors.publicKey}
                          />
                        </Grid>
                        <Grid item md={12} xs={12} className={classes.grid}>
                          <Grid container>
                            <Grid item md={10}>
                              <InputLabel id="" style={{ marginLeft: "10px" }}>
                                File văn bản (Chọn để thay đổi)
                              </InputLabel>
                              <TextField
                                name="fileDoc"
                                id="fileDoc"
                                variant="outlined"
                                fullWidth
                                multiline
                                disabled
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                // value={values.fileDoc?.name}
                                onClick={() => {
                                  // console.log(fileUploadEl.current.click());
                                }}
                                error={
                                  touched.fileDoc && Boolean(errors.fileDoc)
                                }
                                helperText={touched.fileDoc && errors.fileDoc}
                              />
                              <input
                                accept="application/pdf"
                                ref={fileUploadEl}
                                type="file"
                                style={{ display: "none" }}
                                disabled
                                onChange={(e) =>
                                  handleUploadFile(e, propsFormik)
                                }
                              />
                            </Grid>
                            <Grid item>
                              <IconButton
                                disabled
                                style={{ margin: 8 }}
                                onClick={(e) =>
                                  handleDownloadFile(e, propsFormik)
                                }
                              >
                                <GetAppRoundedIcon />
                              </IconButton>
                            </Grid>
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
              );
            }}
          </Formik>
        </MuiPickersUtilsProvider>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
