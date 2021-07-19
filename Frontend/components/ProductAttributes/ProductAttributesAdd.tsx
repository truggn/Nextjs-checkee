import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { TextField, Typography } from "@material-ui/core";
import { useStyles } from "./ProductAttributes.styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { createDataProductAttributes } from "../../redux/actions/ProductAttributesActions";
import { useSelector, useDispatch } from "react-redux";
import getProductTypeofOrganization from "../../constant.config.api/api/getProductTypeOfOrganization";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ICustomer } from "../../redux/actions/CustomerActions";
import NProgress from "nprogress";
interface ListTypeProduct {
  code: string;
  name: string;
  organizationId: string;
  _id: string;
}

//
export default function ProductAttributesFormAdd(props) {
  const { openModal, closeModal } = props;
  const classes = useStyles();
  const customerData: ICustomer[] =
    useSelector((state: any) => state.Customer.customerData) || [];
  const [listTypeProduct, setListTypeProduct] = React.useState<
    ListTypeProduct[] | []
  >([]);
  const [inputCustomer, setInputCustomer] =
    React.useState<ICustomer | null>(null);

  const [errorCustomer, setErrorCustomer] = React.useState<boolean>(false);

  const [inputProducttype, setInputProducttype] =
    React.useState<ListTypeProduct | null>(null);
  const [errorProducttype, setErrorProducttype] =
    React.useState<boolean>(false);

  const dispatch = useDispatch();
  //===GET-user===//
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const handleChangeCustomerName = async (id) => {
    try {
      let result = await getProductTypeofOrganization(id._id);
      if (result.status === 200) {
        setListTypeProduct(result.data.data);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <Formik
          initialValues={{
            _id: "",
            key: "",
            type: "",
            code: "",
            productTypeId: {
              code: "",
              name: "",
              _id: "",
            },
            createBy: state_getuserlogindata._id,
            organizationId: {
              _id: "",
              name_customer: "",
            },
          }}
          validationSchema={yup.object({
            key: yup.string().required("Vui lòng nhập thông tin cần bổ sung!"),
            type: yup
              .string()
              .required("Vui lòng nhập kiểu thông tin cần bổ sung!"),
            code: yup
              .string()
              .matches(
                /^[a-zA-Z0-9_]+$/,
                "Mã code chỉ cho phép kí tự từ A-Z,0-9 và _"
              )
              .required("Nhập mã code"),
          })}
          onSubmit={(values: any) => {
            if (inputProducttype || inputCustomer) {
              values.productTypeId = inputProducttype?._id;
              values.organizationId = inputCustomer?._id;
              dispatch(createDataProductAttributes(values));
              NProgress.start();
            } else {
              setErrorCustomer(true);
              setErrorProducttype(true);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle
                id="form-dialog-title"
                //   className={classes.dialogTitle}
              >
                Thêm mới thông tin của loại sản phẩm
              </DialogTitle>
              <DialogContent>
                <Grid
                  container
                  //    className={classes.grid}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                      <InputLabel id="" style={{ marginBottom: 10 }}>
                        Đối tác
                      </InputLabel>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
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
                              size="small"
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
                            Vui lòng chọn đối tác{" "}
                          </Typography>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      //   className={classes.gridItem}
                    >
                      <InputLabel id="" style={{ marginBottom: 10 }}>
                        Loại sản phẩm
                      </InputLabel>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
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
                              size="small"
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
                            Vui lòng chọn loại sản phẩm{" "}
                          </Typography>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item md={6}>
                      <InputLabel
                        id=""
                        style={{ marginBottom: 10, marginTop: 10 }}
                      >
                        Mã Code
                      </InputLabel>

                      <TextField
                        size="small"
                        name="code"
                        variant="outlined"
                        style={{ margin: 0 }}
                        placeholder="Nhập vào mã code!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={props.handleChange}
                        error={props.touched.code && Boolean(props.errors.code)}
                        helperText={props.touched.code && props.errors.code}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <InputLabel
                        id=""
                        style={{ marginBottom: 10, marginTop: 10 }}
                      >
                        Kiểu thông tin bổ sung
                      </InputLabel>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                      >
                        <Select
                          variant="outlined"
                          native
                          name="type"
                          fullWidth
                          style={{ margin: 0 }}
                          onChange={props.handleChange}
                          defaultValue="-"
                          error={
                            props.touched.type && Boolean(props.errors.type)
                          }
                        >
                          <option disabled value="-">
                            Vui lòng chọn
                          </option>
                          <option value="string">Text</option>
                          <option value="date">Date</option>
                          <option value="textarea">Textarea</option>
                        </Select>
                        <div className={classes.helptext}>
                          {props.touched.type && props.errors.type}
                        </div>
                      </FormControl>
                    </Grid>
                    <Grid item md={12}>
                      <Grid container spacing={1}>
                        <Grid item md>
                          <InputLabel
                            id=""
                            style={{ marginBottom: 10, marginTop: 10 }}
                          >
                            Thông Tin Cần Bổ Sung
                          </InputLabel>

                          <TextField
                            size="small"
                            name="key"
                            id="key"
                            variant="outlined"
                            style={{ margin: 0 }}
                            placeholder="Nhập vào thông tin cần bổ sung!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={props.handleChange}
                            error={
                              props.touched.key && Boolean(props.errors.key)
                            }
                            helperText={props.touched.key && props.errors.key}
                          />
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
                  onClick={closeModal}
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
    </React.Fragment>
  );
}
