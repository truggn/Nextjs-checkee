import React, { useEffect, useRef, useState } from "react";
import NProgress from "nprogress";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Field, Formik } from "formik";
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
import { addDataCategory } from "../../redux/actions/CategoryActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { ICategory } from "../../redux/actions/CategoryActions";
import toast from "@/ShowToast/ShowToast";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { styled } from "@material-ui/core/styles";

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #4568dc ,#b06ab3)",
  height: 30,
  width: 70,
  color: "#FFFFFF",
});

// valid
const schema = yup.object().shape({
  code: yup.string().required("Nhập mã danh mục"),
  name: yup.string().required("Nhập tên danh mục"),
  indexHomeCategory: yup.number().min(1).required("Nhập vị trí danh mục"),
  // icon: yup.string().required("Không để trống icon"),
});

const CategoryAdd = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { openModal, closeModal } = props;
  const editorRef: any = useRef();
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  const [description, setDescription] = useState<string>("");
  const [errDescription, setErrDescription] = useState<boolean>(false);

  const [errorLevel, setErrorLevel] = useState<boolean>(false);
  const [errorParent1, setErrorParent1] = useState<boolean>(false);
  const [errorParent2, setErrorParent2] = useState<boolean>(false);
  const [errorIcon, setErrorIcon] = useState<boolean>(false);

  const [disable1, setDisable1] = useState<boolean>(false);
  const [disable2, setDisable2] = useState<boolean>(false);
  const [dataLevel1, setDataLevel1] = useState<ICategory[] | string[]>([]);
  const [dataLevel2, setDataLevel2] = useState<ICategory[] | string[]>([]);

  const [level, setlevel] = useState<number | null>(null);
  const [parent1, setParent1] = useState<string>("");
  const [parent2, setParent2] = useState<string>("");
  const [icon, setIcon] = useState("");

  // get data category từ store redux
  const categoriesData: ICategory[] = useSelector(
    (state: any) => state.Category.dataCategory
  );

  // lấy user login
  const dataUser: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const createdBy: string = dataUser._id;

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

  const handleLevel = (e) => {
    setErrorLevel(false);
    if (e.target.value === 1) {
      setDisable1(false);
      setDisable2(false);
      setParent1("");
      setParent2("");
    } else if (e.target.value === 2) {
      setDisable1(true);
      setDisable2(false);
      setParent1("");
      setParent2("");
      if (categoriesData.length > 0) {
        const dataLevel_1: ICategory[] = categoriesData.filter(
          (item) => item.level === 1
        );
        setDataLevel1(dataLevel_1);
      }
    } else if (e.target.value === 3) {
      setDisable1(true);
      setParent1("");
      setParent2("");
      if (categoriesData.length > 0) {
        const dataLevel_1: ICategory[] = categoriesData.filter(
          (item) => item.level === 1
        );
        setDataLevel1(dataLevel_1);
      }
    }
    setlevel(e.target.value);
  };

  const handleParent1 = (e) => {
    setErrorParent1(false);
    const value = e.target.value;
    setParent1(value);
    if (value !== "" && level === 3) {
      setDisable2(true);
      const dataLevel_2: ICategory[] = categoriesData.filter(
        (item) => item.level === 2
      );

      if (dataLevel_2.length > 0) {
        const data_2: ICategory[] = dataLevel_2.filter(
          (item) => item.parentsId.idCategoryLevel_1 === value
        );
        setDataLevel2(data_2);
      }
    }
  };
  const handleParent2 = (e) => {
    setErrorParent2(false);
    const value = e.target.value;
    setParent2(value);
  };

  const handleIcon = (e) => {
    try {
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
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <Formik
          initialValues={{
            code: "",
            name: "",
            description: "",
            icon: "",
            indexHomeCategory: 1,
            isHomeCategory: false,
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            if (level === null) {
              setErrorLevel(true);
            } else if (level === 2 && parent1 === "") {
              setErrorParent1(true);
            } else if (level === 3 && parent1 === "") {
              setErrorParent1(true);
            } else if (level === 3 && parent2 === "") {
              setErrorParent2(true);
            } else if (level === 3 && parent1 === "" && parent2 === "") {
              setErrorParent1(true);
              setErrorParent2(true);
            } else if (description === "") {
              setErrDescription(true);
            } else if (icon === "") {
              setErrorIcon(true);
            } else {
              values.description = description;
              const data: any = { ...values, createdBy, level, icon };
              switch (level) {
                case 1: {
                  data.parentsId = {};
                  break;
                }
                case 2: {
                  data.parentsId = {
                    idCategoryLevel_1: parent1,
                  };
                  break;
                }
                case 3: {
                  data.parentsId = {
                    idCategoryLevel_1: parent1,
                    idCategoryLevel_2: parent2,
                  };
                  break;
                }
                default:
                  break;
              }
              dispatch(addDataCategory(data));
              NProgress.start();
              closeModal();
              resetForm();
              setlevel(null);
              setParent1("");
              setParent2("");
              setDisable1(false);
              setDisable2(false);
              setDescription("");
              setErrDescription(false);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle id="alert-dialog-title">Thêm danh mục</DialogTitle>
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
                      onChange={props.handleChange}
                      error={props.touched.code && Boolean(props.errors.code)}
                      helperText={props.touched.code && props.errors.code}
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
                      <Grid item style={{ marginLeft: 20 }}>
                        <img src={icon} width={50} height={50} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Cấp độ
                    </InputLabel>
                    <FormControl
                      fullWidth={true}
                      size="small"
                      variant="outlined"
                      style={{ margin: 8 }}
                    >
                      <Select
                        name="level"
                        id="level"
                        value={level}
                        onChange={handleLevel}
                      >
                        {[1, 2, 3].map((data, index) => (
                          <MenuItem key={index} value={data}>
                            {data}
                          </MenuItem>
                        ))}
                      </Select>
                      {errorLevel ? (
                        <Typography
                          style={{
                            marginLeft: 14,
                            marginTop: 5,
                            fontSize: "0.75rem",
                            color: "#f44336",
                          }}
                        >
                          Vui lòng chọn cấp độ{" "}
                        </Typography>
                      ) : null}
                    </FormControl>
                  </Grid>
                  {disable1 ? (
                    <Grid item xs={6}>
                      <InputLabel id="" style={{ marginLeft: "10px" }}>
                        Chọn danh mục cấp độ 1
                      </InputLabel>
                      <FormControl
                        fullWidth={true}
                        size="small"
                        variant="outlined"
                        style={{ margin: 8 }}
                      >
                        <Select
                          name="parent1"
                          id="parent1"
                          value={parent1}
                          onChange={handleParent1}
                        >
                          {dataLevel1.map((data, index) => (
                            <MenuItem key={index} value={data._id}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errorParent1 ? (
                          <Typography
                            style={{
                              marginLeft: 14,
                              marginTop: 5,
                              fontSize: "0.75rem",
                              color: "#f44336",
                            }}
                          >
                            Vui lòng chọn danh mục{" "}
                          </Typography>
                        ) : null}
                      </FormControl>
                    </Grid>
                  ) : null}
                  {disable2 ? (
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
                        <Select
                          name="parent2"
                          id="parent2"
                          value={parent2}
                          onChange={handleParent2}
                        >
                          {dataLevel2.map((data, index) => (
                            <MenuItem key={index} value={data._id}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errorParent2 ? (
                          <Typography
                            style={{
                              marginLeft: 14,
                              marginTop: 5,
                              fontSize: "0.75rem",
                              color: "#f44336",
                            }}
                          >
                            Vui lòng chọn danh mục{" "}
                          </Typography>
                        ) : null}
                      </FormControl>
                    </Grid>
                  ) : null}

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
                  onClick={closeModal}
                  color="default"
                >
                  Đóng
                </Button>
                <MyButton
                  size="small"
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  type="submit"
                >
                  Lưu
                </MyButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CategoryAdd;
