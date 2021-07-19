import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Formik, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { styled, TextField } from "@material-ui/core";
import { useStyles } from "./ProductType.styles";
import FormControl from "@material-ui/core/FormControl";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import {
  IProductType,
  updateDataProductType,
} from "../../../redux/actions/user/ProductTypeActions";
import NProgress from "nprogress";
import axios from "axios";
import { UploadAvatar } from "./UploadAvatar";
import { UploadImages } from "./UploadImages";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography, Tooltip } from "@material-ui/core/";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { SERVERAPI } from "../../../constant.config.api/index";
const MyButton = styled(Button)({
  background: "linear-gradient(to right, #a1c4fd ,#c2e9fb)",
});

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

export default function InforProducttypeUpdate(props) {
  const dispatch = useDispatch();
  const { closeModal, dataUpdate, onSetStep, dataCategory } = props;
  const classes = useStyles();
  const [countryOfOrigin_, setCountryOfOrigin_] = useState([]);
  const [inputCountry, setInputCountry] = React.useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dataLogin = useSelector((state: any) => state.Login.getuserlogindata);

  // check window is not defined
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);

  const { CKEditor, ClassicEditor }: any = editorRef.current || {};

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

  useEffect(() => {
    setDescription(dataUpdate.description);
  }, [dataUpdate]);

  const handleDes = (e, editor) => {
    let data = "";
    data = editor.getData();
    setDescription(data);
  };

  const handleChange1 = (e, newInputValue) => {
    setInputCountry(newInputValue);
  };

  let cateInput = dataUpdate ? dataUpdate.categoryId : "";

  if (dataCategory._id) {
    cateInput = { ...dataCategory };
  }
  const len = dataUpdate.images.length;
  const imgString: any = [];
  for (let i = 0; i < len; i++) {
    imgString.push(dataUpdate.images[i].url);
  }

  return (
    <Grid container direction="column">
      <Typography style={{ fontWeight: "bold", marginBottom: 10 }}>
        Thông tin loại sản phẩm
      </Typography>

      <Formik
        initialValues={{
          _id: dataUpdate ? dataUpdate._id : "",
          code: dataUpdate ? dataUpdate.code : "",
          name: dataUpdate ? dataUpdate.name : "",
          description: dataUpdate ? dataUpdate.description : "",
          price: dataUpdate ? dataUpdate.price : "",
          countryOfOrigin: dataUpdate ? dataUpdate.countryOfOrigin : "",
          images: dataUpdate ? imgString : "",
          organizationId: dataUpdate
            ? dataUpdate.organizationId.name_customer
            : "",
          productRepresentation: dataUpdate
            ? dataUpdate.productRepresentation.url
            : "",
          categoryId: dataUpdate ? dataUpdate.categoryId : "",
        }}
        validationSchema={schema}
        onSubmit={(values: IProductType) => {
          // tìm code lấy tất cả key value trong mảng quốc gia
          const countryOfOrigin: any = countryOfOrigin_.find(
            (data: any) => data.name === inputCountry
          );
          values.countryOfOrigin = countryOfOrigin;
          values.organizationId = dataUpdate.organizationId._id;
          values.categoryId = cateInput;

          const data = {
            ...values,
            description: description,
            updatedBy: dataLogin._id,
          };

          dispatch(updateDataProductType(data));
          NProgress.start();
          closeModal();
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
                  style={{ margin: 0 }}
                >
                  <TextField
                    disabled
                    size="small"
                    name="code"
                    id="code"
                    variant="outlined"
                    style={{ margin: 8 }}
                    placeholder="Nhập vào mã sản phẩm!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="text"
                    value={props.values.organizationId}
                    onChange={props.handleChange}
                  />
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
                    id="free-solo-demo"
                    freeSolo
                    value={props.values.countryOfOrigin.name}
                    options={countryOfOrigin_.map((option: any) => option.name)}
                    onInputChange={handleChange1}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel id="" style={{ marginLeft: "10px" }}>
                  Mã loại sản phẩm
                </InputLabel>

                <TextField
                  disabled
                  size="small"
                  name="code"
                  id="code"
                  variant="outlined"
                  style={{ margin: 8 }}
                  placeholder="Nhập vào mã sản phẩm!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="text"
                  value={props.values.code}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel id="" style={{ marginLeft: "10px" }}>
                  Tên loại sản phẩm
                </InputLabel>

                <TextField
                  size="small"
                  name="name"
                  id="name-input"
                  variant="outlined"
                  style={{ margin: 8 }}
                  placeholder="Nhập vào loại sản phẩm!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={props.values.name}
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
                    value={cateInput.name}
                    variant="outlined"
                    style={{ margin: 8, width: "87%" }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="text"
                  />
                  <Tooltip title="Cập nhật danh mục">
                    <IconButton aria-label="edit" onClick={() => onSetStep(1)}>
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
                  id="name-input"
                  variant="outlined"
                  style={{ margin: 8 }}
                  placeholder="Nhập vào giá sản phẩm!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={props.values.price}
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
                  value={dataUpdate.productRepresentation.url}
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
              <Grid item xs={12} sm={12}>
                <InputLabel id="" style={{ marginLeft: "10px" }}>
                  Mô tả sản phẩm
                </InputLabel>
                <Grid className={classes.description}>
                  {editorLoaded ? (
                    <CKEditor
                      data={description}
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
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={closeModal}
                  color="default"
                >
                  Đóng
                </Button>
                <MyButton
                  size="small"
                  variant="contained"
                  className={classes.button}
                  type="submit"
                >
                  Lưu
                </MyButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}
