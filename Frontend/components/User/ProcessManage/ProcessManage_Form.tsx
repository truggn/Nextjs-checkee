import React, { useEffect, useState, Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import getProductTypeofOrganization from "../../../constant.config.api/api/getProductTypeOfOrganization";
//styles
import { useStyles } from "./ProcessManage_Form.styles";
import NProgress from "nprogress";
import { ICustomer } from "../../../redux/actions/CustomerActions";
import { IUserProfile } from "../../../redux/actions/LoginActions";
import {
  IListProcessManage,
  createProcessManage,
} from "Frontend/redux/actions/user/ProcessManageActions";

interface ListTypeProduct {
  code: string;
  name: string;
  organizationId: string;
  _id: string;
}

export default function Participant_Form(props) {
  const classes = useStyles();
  const [openParticipantForm, setOpenParticipantForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [processManage, setProcessManage] =
    React.useState<IListProcessManage | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listTypeProduct, setListTypeProduct] = React.useState<
    ListTypeProduct[] | []
  >([]);

  const [organizationList, setOrganizationList] = React.useState<any>(null);

  const customerData: ICustomer[] =
    useSelector((state: any) => state.Customer.customerData) || [];
  const [inputCustomer, setInputCustomer] =
    React.useState<ICustomer | null>(null);

  const [errorCustomer, setErrorCustomer] = React.useState<boolean>(false);

  const [inputProducttype, setInputProducttype] =
    React.useState<ListTypeProduct | null>(null);
  const [errorProducttype, setErrorProducttype] =
    React.useState<boolean>(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const organizationData = useSelector(
    (state: any) => state.selectedOrganization.chooseoranization
  );

  const dispatch = useDispatch();
  const initialFormValues = {
    productTypeId: processManage ? processManage.productTypeId : "",
    organizationId: organizationList ? organizationList.organizationId : "",
    name: "",
    code: "",
    createdBy: "",
  };

  const ProcessManageSchema = yup.object().shape({
    // organizationId: yup.string().required("Vui l??ng nh???p t??n ?????i t?????ng!"),
    code: yup
      .string()
      .matches(/^[a-zA-Z0-9_]+$/, "M?? code ch??? cho ph??p k?? t??? t??? A-Z,0-9 v?? _")
      .required("Vui l??ng nh???p m?? !"),
    // productTypeId: yup.string().required("Lo???i ?????i t?????ng l?? b???t bu???c"),
    name: yup.string().required("Vui l??ng nh???p t??n!"),
  });

  useEffect(() => {
    setOrganizationList(organizationData);
  }, [organizationData]);

  useEffect(() => {
    async function getOrganization() {
      try {
        let result = await getProductTypeofOrganization(
          organizationData?.organizationId
        );
        if (result.status === 200) {
          setListTypeProduct(result.data.data);
        }
      } catch (error) {
        console.log(`error`, error);
      }
    }
    getOrganization();
  }, [organizationData]);

  useEffect(() => {
    setCheckEdit(props.checkEdit);
  }, [props.checkEdit]);

  useEffect(() => {
    setOpenParticipantForm(openParticipantForm);
  }, [openParticipantForm]);

  useEffect(() => {
    setProcessManage(props.processManage);
  }, [props.processManage]);

  const handleOpen = () => {
    setOpenModal(true);
    setOpenParticipantForm(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenParticipantForm(false);
  };
  // const handleChangeCustomerName = async (id) => {

  // };
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
          validationSchema={ProcessManageSchema}
          onSubmit={(values: any) => {
            values.createdBy = state_getuserlogindata._id;
            if (inputProducttype || inputCustomer) {
              values.productTypeId = inputProducttype?._id;
              dispatch(createProcessManage(values));
              NProgress.start();
              handleClose();
            } else {
              setErrorCustomer(true);
              setErrorProducttype(true);
            }
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
                    ? "Th??m m???i qu???n l?? quy tr??nh"
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
                          <TextField
                            disabled
                            size="medium"
                            name="organizationId"
                            id="organizationId"
                            variant="outlined"
                            style={{ margin: 8 }}
                            fullWidth
                            multiline
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            placeholder={organizationData?.organizationName}
                          />

                          {/* <FormControl
                            variant="outlined"
                            fullWidth
                            style={{ margin: 8 }}
                          >
                            <Autocomplete
                              value={inputCustomer}
                              onChange={(
                                event: any,
                                newValue: ICustomer | null
                              ) => {
                                setInputCustomer(newValue);
                                handleChangeCustomerName(newValue);
                                setErrorCustomer(false);
                              }}
                              id="customer"
                              options={customerData}
                              getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                  return option;
                                }

                                if (option.name_customer) {
                                  return option.name_customer;
                                }

                                return option.name_customer;
                              }}
                              renderOption={(option) => option.name_customer}
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
                          </FormControl> */}
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Code
                          </InputLabel>

                          <TextField
                            name="code"
                            variant="outlined"
                            style={{ margin: 8 }}
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

                    <Grid item xs={12} sm={6} className={classes.gridColumn}>
                      <Grid item>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            Lo???i s???n ph???m
                          </InputLabel>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            style={{ margin: 8 }}
                          >
                            <Autocomplete
                              id="producttype"
                              options={listTypeProduct}
                              getOptionLabel={(option) => option.name}
                              value={inputProducttype}
                              onChange={(event, newInputValue) => {
                                setInputProducttype(newInputValue);
                                setErrorProducttype(false);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  size="medium"
                                />
                              )}
                            />
                            {errorProducttype ? (
                              <Typography
                                style={{
                                  marginLeft: 14,
                                  marginTop: 5,
                                  fontSize: "0.75rem",
                                  color: "#f44336",
                                }}
                              >
                                Vui l??ng ch???n lo???i s???n ph???m
                              </Typography>
                            ) : null}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                          <InputLabel id="" style={{ marginLeft: "10px" }}>
                            T??n quy tr??nh
                          </InputLabel>

                          <TextField
                            name="name"
                            variant="outlined"
                            style={{ margin: 8 }}
                            fullWidth
                            multiline
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
            );
          }}
        </Formik>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
