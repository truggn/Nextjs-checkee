import React, { useEffect, useState, Component, Fragment } from "react";
import axios from "axios";
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
import { useSelector, useDispatch } from "react-redux";
//styles
import { useStyles, useRowStyles } from "./AppendixContract_Form.styles";
import DatePickerField from "../Contract/DatePickerField";
//api
import { CONTRACT } from "../../constant.config.api/index";
import FormModal from "../FormModal";
import { loadDataContract } from "../../redux/actions/ContractActions";
import { getCustomerStart } from "../../redux/actions/CustomerActions";
import {
  updateAppendixContractStart,
  createAppendixContractStart,
} from "../../redux/actions/AppendixContractActions";

const EditButton = (props) => {
  const classes = useStyles();
  return (
    <Tooltip title="Chỉnh sửa" placement="top-start">
      <IconButton
        className={classes.iconButton}
        aria-label="edit"
        size="small"
        color="primary"
      >
        <EditOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

const AddButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<AddCircleOutlineOutlinedIcon />}
    >
      Thêm mới
    </Button>
  );
};

export default function AppendixContract_Form(props) {
  interface IAppendixContract {
    _id: string;
    customerId: string;
    numberAppendixContract: string;
    nameContract: string;
    date: Date;
    startDay: Date;
    endDay: Date;
    durationPay: Date;
    packageBuy: string;
    vat: number;
    vatPrice: number;
    contractValue: string;
    publicKey: string;
    privateKey: string;
  }

  const classes = useStyles();
  const dispatch = useDispatch();
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [
    appendixContract,
    setAppendixContract,
  ] = React.useState<IAppendixContract>();
  const [fileName, setFileName] = React.useState("");
  // const [packageBuy, setPackageBuy] = React.useState(props.appendixContract ? props.appendixContract.packageBuy : "Trial")
  const fileUploadEl = React.useRef(null);

  const initialFormValues = {
    _id: appendixContract ? appendixContract._id : "",
    customerId: appendixContract ? appendixContract.customerId : "",
    numberAppendixContract: appendixContract
      ? appendixContract.numberAppendixContract
      : "",
    nameContract: appendixContract ? appendixContract.nameContract : "",
    // contractStatus: appendixContract ? appendixContract.contractStatus : "",
    date: appendixContract ? appendixContract.date : new Date(), // ngày ký
    startDay: appendixContract ? appendixContract.startDay : new Date(), // ngày có hiệu lực
    endDay: appendixContract ? appendixContract.endDay : new Date(), // ngày hết hiệu lực
    durationPay: appendixContract ? appendixContract.durationPay : new Date(),
    packageBuy: appendixContract ? appendixContract.packageBuy : "",
    contractValue: appendixContract ? appendixContract.contractValue : 0,
    vat: appendixContract ? appendixContract.vat : 0, // 0 -> 100
    vatPrice: appendixContract
      ? (
          parseFloat(appendixContract.contractValue) *
          parseFloat(appendixContract.vat.toString())
        ).toFixed(5)
      : null, // tính toán từ contractValue * vat,
    publicKey: appendixContract ? appendixContract.publicKey : "",
    privateKey: appendixContract ? appendixContract.privateKey : "",
    // fileDoc: appendixContract ? appendixContract.fileDoc : "",
  };

  const validationSchema = yup.object().shape({
    customerId: yup.string().required("Trường customerId là bắt buộc"),
    numberAppendixContract: yup
      .string()
      .required("Trường số hợp đồng là bắt buộc"),
    nameContract: yup.string().required("Trường tên hợp đồng là bắt buộc"),
    // contractStatus: yup.string().required('Trường trạng thái hợp đồng là bắt buộc'),
    date: yup.date().required("Trường ngày ký là bắt buộc"), // ngày ký
    startDay: yup.date().required("Trường ngày có hiệu lực là bắt buộc"), // ngày có hiệu lực
    endDay: yup.date().required("Trường ngày hết hiệu lực là bắt buộc"), // ngày hết hiệu lực
    durationPay: yup.date().required("Trường hạn thanh toán là bắt buộc"),
    packageBuy: yup.string().required("Trường loại hợp đồng là bắt buộc"),
    contractValue: yup.number().required("Trường giá trị hợp đồng là bắt buộc"),
    vat: yup.number().required("Trường % VAT là bắt buộc"), // 0 -> 1
    publicKey: yup.string().required("Trường chữ ký bên A là bắt buộc"),
    privateKey: yup.string().required("Trường chữ ký bên B là bắt buộc"),
    // fileDoc: yup.string().required("Trường file văn bản là bắt buộc"),
  });

  useEffect(() => {
    setCheckEdit(props.checkEdit);
  }, [props.checkEdit]);

  useEffect(() => {
    setAppendixContract(props.appendixContract);
  }, [props.appendixContract]);

  const handleCalcvatPrice = (e, { handleChange, setFieldTouched, values }) => {
    handleChange(e);
    values.vatPrice = parseFloat(e.target.value) * values.contractValue;
    setFieldTouched(e.target.name, true, false);
  };

  const handleFieldChange = (e, { handleChange, setFieldTouched }) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };

  const handleUploadFile = (e, parentProps) => {
    let file = e.target.files[0];
    setFileName(file.name);
    let mimeType = "pdf";
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvt) => {
        if (readerEvt.target === null) {
          return;
        }
        let binaryString = readerEvt.target.result as string;
        let base64 = btoa(binaryString);
        //base64
        parentProps.setFieldValue("fileDoc", base64);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadFile = (e, parentProps) => {
    const { fileDoc } = parentProps.values;
    const linkSource = `data:application/pdf;base64,${fileDoc}`;
    console.log(linkSource);
    const downloadLink = document.createElement("a");
    const fileName = "download";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  //
  const dataContract = useSelector((state: any) => state.Contract.ContractData);

  //
  const dataCustomer = useSelector((state: any) => state.Customer.customerData);

  //
  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormModal
          maxWidth="md"
          defaultText={checkEdit ? <EditButton /> : <AddButton />}
          action={
            checkEdit
              ? updateAppendixContractStart
              : createAppendixContractStart
          }
          requestState={useSelector((state: any) => state.AppendixContract)}
          formProps={{
            initialFormValues: initialFormValues,
            validationSchema: validationSchema,
          }}
          title={
            checkEdit
              ? "Sửa thông tin phụ lục hợp đồng"
              : "Tạo thông tin phụ lục hợp đồng"
          }
        >
          {(props) => (
            <React.Fragment>
              <Grid container>
                {/* {console.log(props.errors)} */}
                <Grid item xs={12} sm={6} className={classes.gridColumn}>
                  <Grid item>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Số hợp đồng
                      </InputLabel>
                      <TextField
                        name="numberAppendixContract"
                        id="outlined-full-width"
                        variant="outlined"
                        // style={{ margin: 8 }}
                        placeholder="Nhập vào số hợp đồng!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={props.values.numberAppendixContract}
                        onChange={(e) => handleFieldChange(e, props)}
                        error={
                          props.touched.numberAppendixContract &&
                          Boolean(props.errors.numberAppendixContract)
                        }
                        helperText={
                          props.touched.numberAppendixContract &&
                          props.errors.numberAppendixContract
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Ngày có hiệu lực
                      </InputLabel>
                      <Field
                        name="startDay"
                        validate={(value) => {
                          if (new Date(value) < new Date(props.values.date)) {
                            return "Ngày có hiệu lực phải lớn hơn ngày ký";
                          }
                        }}
                        component={DatePickerField}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Hạn thanh toán
                      </InputLabel>
                      <Field
                        name="durationPay"
                        validate={(value) => {
                          if (new Date(value) < new Date(props.values.date)) {
                            return "Hạn thanh toán phải lớn hơn ngày ký";
                          }
                        }}
                        component={DatePickerField}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Giá trị hợp đồng
                      </InputLabel>
                      <TextField
                        name="contractValue"
                        id="contractValue"
                        variant="outlined"
                        // style={{ margin: 8 }}
                        placeholder="Nhập vào số thứ tự!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                        value={props.values.contractValue}
                        onChange={(e) => handleFieldChange(e, props)}
                        error={
                          props.touched.contractValue &&
                          Boolean(props.errors.contractValue)
                        }
                        helperText={
                          props.touched.contractValue &&
                          props.errors.contractValue
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Chữ ký Bên B
                      </InputLabel>
                      <TextField
                        name="privateKey"
                        id="outlined-full-width"
                        variant="outlined"
                        // style={{ margin: 8 }}
                        fullWidth
                        multiline
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={props.values.privateKey}
                        onChange={(e) => handleFieldChange(e, props)}
                        error={
                          props.touched.privateKey &&
                          Boolean(props.errors.privateKey)
                        }
                        helperText={
                          props.touched.privateKey && props.errors.privateKey
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        % VAT
                      </InputLabel>
                      <TextField
                        name="vat"
                        id="vat"
                        variant="outlined"
                        // style={{ margin: 8 }}
                        placeholder="Nhập vào số thứ tự!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        InputProps={{
                          inputProps: { min: 0, max: 100, step: 0.05 },
                        }}
                        value={props.values.vat}
                        onChange={(e) => handleCalcvatPrice(e, props)}
                        error={props.touched.vat && Boolean(props.errors.vat)}
                        helperText={props.touched.vat && props.errors.vat}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Chữ ký Bên A
                      </InputLabel>
                      <TextField
                        name="publicKey"
                        id="outlined-full-width"
                        variant="outlined"
                        // style={{ margin: 8 }}
                        fullWidth
                        multiline
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={props.values.publicKey}
                        onChange={(e) => handleFieldChange(e, props)}
                        error={
                          props.touched.publicKey &&
                          Boolean(props.errors.publicKey)
                        }
                        helperText={
                          props.touched.publicKey && props.errors.publicKey
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.gridColumn}>
                  <Grid item>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Tên hợp đồng
                      </InputLabel>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        // style={{ margin: 8 }}
                      >
                        <Select
                          id="nameContract"
                          name="nameContract"
                          value={props.values.nameContract}
                          onChange={props.handleChange}
                        >
                          {dataContract.map((data, index) => (
                            <MenuItem key={index} value={data._id}>
                              {data.nameContract}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Tên đối tác
                      </InputLabel>
                      {/* <TextField
                        size="medium"
                        name="customerId"
                        id="outlined-full-width"
                        variant="outlined"
                        style={{ margin: 8 }}
                        fullWidth
                        multiline
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={props.values.customerId}
                        onChange={(e) => handleFieldChange(e, props)}
                        error={
                          props.touched.customerId &&
                          Boolean(props.errors.customerId)
                        }
                        helperText={
                          props.touched.customerId && props.errors.customerId
                        }
                      /> */}
                      <FormControl
                        variant="outlined"
                        fullWidth
                        // style={{ margin: 8 }}
                      >
                        <Select
                          id="customerId"
                          name="customerId"
                          value={props.values.customerId}
                          onChange={props.handleChange}
                        >
                          {dataCustomer.map((data, index) => (
                            <MenuItem key={index} value={data._id}>
                              {data.name_customer}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Ngày ký
                      </InputLabel>
                      <Field name="date" component={DatePickerField} />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Ngày hết hiệu lực
                      </InputLabel>
                      <Field
                        name="endDay"
                        validate={(value) => {
                          if (
                            new Date(value) < new Date(props.values.startDay)
                          ) {
                            return "Ngày hết hiệu lực phải lớn hơn ngày có hiệu lực";
                          }
                        }}
                        component={DatePickerField}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <InputLabel
                        id="status-label-control"
                        style={{ marginLeft: "10px" }}
                      >
                        Loại hợp đồng
                      </InputLabel>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        // style={{ margin: 8 }}
                      >
                        <Select
                          id="select-appendixContract-type"
                          value={props.values.packageBuy}
                          onChange={(e) => {
                            props.setFieldValue("packageBuy", e.target.value);
                            props.setFieldTouched("packageBuy", true, false);
                          }}
                        >
                          <MenuItem value={"Trial"}>Trial</MenuItem>
                          <MenuItem value={"Standard"}>Standard</MenuItem>
                          <MenuItem value={"Premium"}>Premium</MenuItem>
                          <MenuItem value={"Enterprise"}>Enterprise</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} className={classes.gridItem}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item sm={11}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            File văn bản
                          </InputLabel>
                          <TextField
                            name="fileDoc"
                            id="fileDoc"
                            variant="outlined"
                            fullWidth
                            style={{ margin: 8 }}
                            multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={fileName}
                            onClick={() => {
                              console.log(fileUploadEl.current.click());
                            }}
                            error={
                              props.touched.fileDoc &&
                              Boolean(props.errors.fileDoc)
                            }
                            helperText={
                              props.touched.fileDoc && props.errors.fileDoc
                            }
                          />
                          <input
                            accept="application/pdf"
                            ref={fileUploadEl}
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => handleUploadFile(e, props)}
                          />
                        </Grid>
                        <Grid item sm={1}>
                          <IconButton
                            style={{ margin: 8 }}
                            onClick={(e) => handleDownloadFile(e, props)}
                          >
                            <GetAppRoundedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </FormModal>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}
