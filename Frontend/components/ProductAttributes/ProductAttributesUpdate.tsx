import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { TextField } from "@material-ui/core";
import { useStyles } from "./ProductAttributes.styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  IProductAttributes,
  updateDataProductAttributes,
} from "../../redux/actions/ProductAttributesActions";
import MenuItem from "@material-ui/core/MenuItem";
import getProductTypeofOrganization from "../../constant.config.api/api/getProductTypeOfOrganization";
//
export default function ProductAttributesUpdate(props) {
  const dispatch = useDispatch();
  const { openModalUpdate, closeModalUpdate, dataUpdate, customerDataUpdate } =
    props;
  const classes = useStyles();
  const [dataProductTypeOfOrganization, setDataProductTypeOfOrganization] =
    useState([]);
  //
  return (
    <React.Fragment>
      <Dialog
        open={openModalUpdate}
        onClose={closeModalUpdate}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <Formik
          initialValues={{
            _id: dataUpdate !== "" ? dataUpdate._id : "",
            key: dataUpdate !== "" ? dataUpdate.key : "",
            type: dataUpdate !== "" ? dataUpdate.type : "",
            code: dataUpdate !== "" ? dataUpdate.code : "",
            productTypeId:
              dataUpdate !== "" ? dataUpdate.productTypeId.name : "",
            createBy: dataUpdate !== "" ? dataUpdate.createBy : "",
            organizationId:
              dataUpdate !== "" ? dataUpdate.organizationId.name_customer : "",
          }}
          validationSchema={yup.object({
            key: yup.string().required("Vui lòng nhập thông tin cần bổ sung!"),
          })}
          onSubmit={(values: IProductAttributes) => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(updateDataProductAttributes(values));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle
                id="form-dialog-title"
                //   className={classes.dialogTitle}
              >
                Cập Nhật Thông Tin Sản Phẩm
              </DialogTitle>
              <DialogContent>
                <Grid
                  container
                  //    className={classes.grid}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <InputLabel id="" style={{ marginBottom: 10 }}>
                        Đối tác
                      </InputLabel>
                      <TextField
                        size="small"
                        disabled
                        name="organizationId"
                        variant="outlined"
                        style={{ margin: 0 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={props.values.organizationId}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      //   className={classes.gridItem}
                    >
                      <InputLabel id="" style={{ marginBottom: 10 }}>
                        Loại Sản Phẩm
                      </InputLabel>
                      <TextField
                        size="small"
                        disabled
                        name="productTypeId"
                        variant="outlined"
                        style={{ margin: 0 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={props.values.productTypeId}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <InputLabel
                        id=""
                        style={{ marginBottom: 10, marginTop: 10 }}
                      >
                        Mã Code
                      </InputLabel>

                      <TextField
                        value={props.values.code}
                        disabled
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
                          value={props.values.type}
                          error={
                            props.touched.organizationId &&
                            Boolean(props.errors.organizationId)
                          }
                        >
                          <option disabled value="-">
                            Vui lòng chọn
                          </option>
                          <option value="string">Text</option>
                          <option value="date">Date</option>
                          <option value="textarea">Textarea</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={12}>
                      <Grid container spacing={1}>
                        <Grid item md={12}>
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
                            placeholder="Nhập vào loại người dùng!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={props.values.key}
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
                  onClick={closeModalUpdate}
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
