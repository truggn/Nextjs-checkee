import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { styled, TextField, Tooltip, Typography } from "@material-ui/core";
import { useStyles } from "./ProductType.styles";
import FormControl from "@material-ui/core/FormControl";
import {
  IProductType,
  createDataProductType,
} from "../../redux/actions/ProductTypeActions";
import { useSelector, useDispatch } from "react-redux";
import { UploadImages } from "./UploadImages";
import { UploadAvatar } from "./UploadAvatar";
import NProgress from "nprogress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStyles1 } from "./ProductTypeAdd.styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { SERVERAPI } from "../../constant.config.api/index";
const MyButton = styled(Button)({
  background: "linear-gradient(to right, #a1c4fd ,#c2e9fb)",
});

interface ICustomer {
  _id: string;
  code: string;
  name_customer: string;
}
interface ILogin {
  _id: string;
}

const schema = yup.object({
  code: yup
    .string()
    .matches(/^[a-zA-Z0-9_]+$/, "Mã code chỉ cho phép kí tự từ A-Z,0-9 và _")
    .required("Vui lòng nhập code!"),
  name: yup.string().required("Vui lòng nhập loại sản phẩm!"),
  price: yup
    .string()
    .matches(/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/, {
      message: "Nhập giá lớn hơn 0",
      excludeEmptyString: true,
    }),
});

const initialValues = {
  _id: "",
  code: "",
  name: "",
  price: "",
  description: "",
  images: [],
  productRepresentation: "",
  countryOfOrigin: {
    name: "",
    "alpha-2": "",
    "country-code": "",
  },
  organizationId: "",
  categoryId: {
    _id: "",
    name: "",
    code: "",
    level: "",
  },
};

const InforProducttypeAdd = ({ dataCategory, onSetStep, closeModal }) => {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [countryOfOrigin_, setCountryOfOrigin_] = useState([]);
  const [description, setDescription] = useState<string>("");
  const [inputCustomer, setInputCustomer] = React.useState<string>("");
  const [inputCountry, setInputCountry] = React.useState<string>("");
  const [errorCustomer, setErrorCustomer] = React.useState<boolean>(false);
  const [errorCountry, setErrorCountry] = React.useState<boolean>(false);

  // check window is not defined
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);

  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

  const dispatch = useDispatch();

  const dataCustomer: ICustomer[] = useSelector(
    (state: any) => state.Customer.customerData
  );

  const dataLogin: ILogin = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    async function getCodeContries() {
      let data;
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-2/slim-2.json"
        );
        data = res.data;
        setCountryOfOrigin_(data);
      } catch (error) {}
    }
    getCodeContries();
  }, []);

  const handleDes = (e, editor) => {
    let data = "";
    data = editor.getData();
    setDescription(data);
  };

  return (
    <div className={classes1.root}>
      <Grid container direction="column">
        <Grid>
          <Typography style={{ fontWeight: "bold", marginBottom: 10 }}>
            Thông tin loại sản phẩm
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values: IProductType) => {
            // tìm id của customer
            const dataCustomer_: any = dataCustomer.find(
              (item) => item.name_customer === inputCustomer
            );
            // tìm code lấy tất cả key value trong mảng quốc gia
            const countryOfOrigin: any = countryOfOrigin_.find(
              (data: any) => data.name === inputCountry
            );
            values.organizationId = dataCustomer_?._id;
            values.countryOfOrigin = countryOfOrigin;
            values.description = description;
            values.createdBy = dataLogin._id;

            const data = { ...values, categoryId: dataCategory._id };

            if (values.organizationId === undefined) {
              setErrorCustomer(true);
            } else if (values.countryOfOrigin === undefined) {
              setErrorCountry(true);
            } else {
              dispatch(createDataProductType(data));
              NProgress.start();
              onSetStep(1);
              closeModal();
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Tên đối tác
                  </InputLabel>
                  <FormControl
                    fullWidth={true}
                    size="small"
                    variant="outlined"
                    style={{ margin: 8 }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      options={dataCustomer}
                      getOptionLabel={(option) => option.name_customer}
                      inputValue={inputCustomer}
                      onInputChange={(event, newInputValue) => {
                        setInputCustomer(newInputValue);
                        setErrorCustomer(false);
                      }}
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
                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Quốc gia
                  </InputLabel>
                  <FormControl
                    fullWidth={true}
                    size="small"
                    variant="outlined"
                    style={{ margin: 8 }}
                  >
                    <Autocomplete
                      id="country-select-demo"
                      options={countryOfOrigin_}
                      autoHighlight
                      getOptionLabel={(option: any) => option.name}
                      inputValue={inputCountry}
                      onInputChange={(event, newInputValue) => {
                        setInputCountry(newInputValue);
                        setErrorCountry(false);
                      }}
                      renderOption={(option: any) => (
                        <React.Fragment>
                          <span>
                            {option["alpha-2"]} {option.name}
                          </span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {errorCountry ? (
                      <Typography
                        style={{
                          marginLeft: 14,
                          marginTop: 5,
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        Vui lòng chọn quốc gia{" "}
                      </Typography>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Mã loại sản phẩm
                  </InputLabel>

                  <TextField
                    size="small"
                    name="code"
                    id="code"
                    variant="outlined"
                    style={{ margin: 8, width: "100%" }}
                    placeholder="Nhập vào mã sản phẩm!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="text"
                    onChange={props.handleChange}
                    error={props.touched.code && Boolean(props.errors.code)}
                    helperText={props.touched.code && props.errors.code}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Tên loại sản phẩm
                  </InputLabel>

                  <TextField
                    size="small"
                    name="name"
                    id="name"
                    variant="outlined"
                    style={{ margin: 8 }}
                    placeholder="Nhập vào loại sản phẩm!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={props.handleChange}
                    error={props.touched.name && Boolean(props.errors.name)}
                    helperText={props.touched.name && props.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Danh mục
                  </InputLabel>
                  <Grid container>
                    <TextField
                      disabled
                      size="small"
                      value={dataCategory.name}
                      variant="outlined"
                      style={{ margin: 8, width: "87%" }}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="text"
                    />
                    <Tooltip title="Sửa danh mục">
                      <IconButton
                        aria-label="edit"
                        onClick={() => onSetStep(1)}
                      >
                        <EditIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Giá loại sản phẩm
                  </InputLabel>

                  <TextField
                    type="number"
                    size="small"
                    name="price"
                    id="price"
                    variant="outlined"
                    style={{ margin: 8 }}
                    placeholder="Nhập giá loại sản phẩm!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={props.handleChange}
                    error={props.touched.price && Boolean(props.errors.price)}
                    helperText={props.touched.price && props.errors.price}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Ảnh đại diện
                  </InputLabel>
                  <Field
                    name="productRepresentation"
                    value={props.values.productRepresentation}
                    component={UploadAvatar}
                    validate={(value) => {
                      if (value.length === 0) {
                        return "Ảnh sản phẩm chưa thêm vào";
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Hình ảnh
                  </InputLabel>
                  <Field
                    name="images"
                    validate={(value) => {
                      if (value.length === 0) {
                        return "Ảnh sản phẩm chưa thêm vào";
                      }
                    }}
                    value={props.values.images}
                    component={UploadImages}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <InputLabel id="" style={{ marginLeft: "10px" }}>
                    Mô tả sản phẩm
                  </InputLabel>
                  <Grid className={classes.description}>
                    {editorLoaded ? (
                      <CKEditor
                        data="Nhập mô tả sản phẩm"
                        editor={ClassicEditor}
                        onChange={handleDes}
                        config={{
                          ckfinder: {
                            uploadUrl: `${SERVERAPI}api/producttype/imgckeditor`,
                          },
                        }}
                      />
                    ) : (
                      "Loading..."
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container justify="flex-end">
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                  color="default"
                  onClick={() => {
                    closeModal();
                    onSetStep(1);
                  }}
                >
                  Đóng
                </Button>
                <MyButton
                  size="small"
                  variant="contained"
                  className={classes.button}
                  color="default"
                  type="submit"
                >
                  Lưu
                </MyButton>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </div>
  );
};

export default InforProducttypeAdd;
