import React, { useEffect, useRef, useState } from "react";
import NProgress from "nprogress";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Formik, Field } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as yup from "yup";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./Main.styles";
import { IUserProfile } from "../../redux/actions/LoginActions";
import {
  updateDataCategory,
  ICategory,
} from "../../redux/actions/CategoryActions";

import toast from "@/ShowToast/ShowToast";

// valid
const schema = yup.object().shape({
  name: yup.string().required("Nhập tên danh mục"),
  level: yup.string().required("Vui lòng chọn danh mục"),
  indexHomeCategory: yup.number().min(1).required("Nhập vị trí danh mục"),
});
// kiểu data
interface IValues {
  code: string;
  name: string;
  description: string;
  level: string | number;
  icon: string;
  indexHomeCategory: number;
  isHomeCategory: boolean;
}

const CategoryUpdate = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openModalUpdate, closeModalUpdate, dataUpdate } = props;
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  const [description, setDescription] = useState<string>("");
  const [errDescription, setErrDescription] = useState<boolean>(false);
  const [errorIcon, setErrorIcon] = useState<boolean>(false);
  const [icon, setIcon] = useState("");

  // get data category từ store redux
  const categoriesData: ICategory[] = useSelector(
    (state: any) => state.Category.dataCategory
  );

  // lấy user login
  const dataUser: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const userId: string = dataUser._id;

  // lấy data description
  useEffect(() => {
    const dataDes = dataUpdate ? dataUpdate.description : "";
    const dataIcon = dataUpdate ? dataUpdate.icon : "";
    setDescription(dataDes);
    setIcon(dataIcon);
  }, [dataUpdate]);

  /* ======================================== DESCRIPTION_CKEDITOR ======================================== */
  // check window is not defined
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  // set value description
  const handleDes = (e, editor) => {
    let data = "";
    data = editor.getData();
    if (data !== "") {
      setErrDescription(false);
    }
    setDescription(data);
  };

  const data = dataUpdate?.parentsId;

  const nameCategory1 = categoriesData.find(
    (item) => item._id === data?.idCategoryLevel_1
  );
  const nameCategory2 = categoriesData.find(
    (item) => item._id === data?.idCategoryLevel_2
  );

  const handleIcon = (e) => {
    if (e.size > 1000000) {
      toast({ type: "warning", message: "Kích thước hình phải < 1MB" });
    } else {
      setErrorIcon(false);
      let reader: any = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result);
      };
      reader.readAsDataURL(e);
    }
  };

  return (
    <div>
      <Dialog
        open={openModalUpdate}
        onClose={closeModalUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <Formik
          initialValues={{
            code: dataUpdate ? dataUpdate.code : "",
            name: dataUpdate ? dataUpdate.name : "",
            level: dataUpdate ? dataUpdate.level : "",
            icon: dataUpdate ? dataUpdate.icon : "",
            indexHomeCategory: dataUpdate ? dataUpdate.indexHomeCategory : 1,
            isHomeCategory: dataUpdate ? dataUpdate.isHomeCategory : false,
            description: "",
          }}
          validationSchema={schema}
          onSubmit={(values: IValues) => {
            if (description === "") {
              setErrDescription(true);
            } else {
              values.description = description;
              const id: string = dataUpdate ? dataUpdate._id : "";
              const data = { ...values, id: id, updatedBy: userId, icon };
              dispatch(updateDataCategory(data));
              NProgress.start();
              closeModalUpdate();
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle id="alert-dialog-title">
                Cập nhật danh mục
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <InputLabel id="code" style={{ marginLeft: "10px" }}>
                      Mã loại danh mục
                    </InputLabel>

                    <TextField
                      size="small"
                      name="code"
                      id="code"
                      variant="outlined"
                      style={{ margin: 8, width: "100%" }}
                      placeholder="Nhập vào mã danh mục!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="text"
                      value={props.values.code}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="name" style={{ marginLeft: "10px" }}>
                      Tên danh mục
                    </InputLabel>

                    <TextField
                      size="small"
                      name="name"
                      id="name"
                      variant="outlined"
                      style={{ margin: 8, width: "100%" }}
                      placeholder="Nhập vào tên danh mục!"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={props.values.name}
                      type="text"
                      onChange={props.handleChange}
                      error={props.touched.name && Boolean(props.errors.name)}
                      helperText={props.touched.name && props.errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="icon" style={{ marginLeft: "10px" }}>
                      Hiển thị trang chủ
                    </InputLabel>
                    <FormControlLabel
                      style={{ margin: 8, width: "100%" }}
                      control={
                        <Field
                          style={{ cursor: "pointer", width: 25, height: 25 }}
                          name="isHomeCategory"
                          type="checkbox"
                        />
                      }
                      label=""
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="icon" style={{ marginLeft: "10px" }}>
                      Vị trí
                    </InputLabel>
                    <TextField
                      id="indexHomeCategory"
                      name="indexHomeCategory"
                      value={props.values.indexHomeCategory}
                      onChange={props.handleChange}
                      style={{ margin: 8, width: "100%" }}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      size="small"
                      error={
                        props.touched.indexHomeCategory &&
                        Boolean(props.touched.indexHomeCategory)
                      }
                      helperText={
                        props.touched.indexHomeCategory &&
                        props.errors.indexHomeCategory
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="icon" style={{ marginLeft: "10px" }}>
                      Icon
                    </InputLabel>
                    <Grid container>
                      <Grid item xs={10}>
                        <input
                          type="file"
                          name="icon"
                          className={classes.icons}
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(event: any) => {
                            props.setFieldValue(
                              "icon",
                              handleIcon(event.currentTarget.files[0])
                            );
                          }}
                        />
                      </Grid>
                      <Grid item style={{ marginLeft: 20 }}>
                        <img
                          src={icon ? icon : props.values.icon}
                          width={50}
                          height={50}
                        />
                      </Grid>
                    </Grid>
                    {errorIcon ? (
                      <Typography
                        style={{
                          marginLeft: 14,
                          marginTop: 5,
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        Vui lòng thêm icon{" "}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="level" style={{ marginLeft: "10px" }}>
                      Cấp độ
                    </InputLabel>
                    <FormControl
                      id="level"
                      fullWidth={true}
                      size="small"
                      variant="outlined"
                      style={{ margin: 8 }}
                    >
                      <InputLabel htmlFor="level">
                        {props.values.level}
                      </InputLabel>
                      <Select disabled native defaultValue="" id="level" />
                    </FormControl>
                  </Grid>
                  {props.values.level === 2 || props.values.level === 3 ? (
                    <Grid item xs={6}>
                      <InputLabel id="parent1" style={{ marginLeft: "10px" }}>
                        Chọn danh mục cấp độ 1
                      </InputLabel>
                      <FormControl
                        id="parent1"
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                        style={{ margin: 8 }}
                      >
                        <InputLabel htmlFor="parent1">
                          {nameCategory1?.name}
                        </InputLabel>
                        <Select disabled native defaultValue="" id="parent1" />
                      </FormControl>
                    </Grid>
                  ) : null}
                  {props.values.level === 3 && (
                    <Grid item xs={6}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Chọn danh mục cấp độ 2
                      </InputLabel>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                        style={{ margin: 8 }}
                      >
                        <InputLabel htmlFor="grouped-native-select">
                          {nameCategory2?.name}
                        </InputLabel>
                        <Select
                          disabled
                          native
                          defaultValue=""
                          id="grouped-native-select"
                        />
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12}>
                    <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Mô tả danh mục
                    </InputLabel>
                    <Grid className={classes.description}>
                      {editorLoaded ? (
                        <CKEditor
                          data={description}
                          editor={ClassicEditor}
                          onChange={handleDes}
                          onBlur={(event, editor) => {
                            if (description === "") {
                              setErrDescription(true);
                            } else {
                              setErrDescription(false);
                            }
                          }}
                        />
                      ) : (
                        "Loading..."
                      )}
                    </Grid>
                    {errDescription ? (
                      <Typography
                        style={{
                          marginLeft: 20,
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        Vui lòng nhập đầy đủ{" "}
                      </Typography>
                    ) : null}
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
                  Cập nhật
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CategoryUpdate;
