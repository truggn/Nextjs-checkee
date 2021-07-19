import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputLabel, TextField, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from "react";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import {useStyles, useRowStyles} from "./News.style";
import { Iuser, updateNews } from 'Frontend/redux/actions/NewsActions';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Formik } from 'formik';
import { SERVERAPI } from '@configFrontend/index'
import { CertificateRow } from "./CerificateRow";
import * as yup from "yup";
import NProgress from 'nprogress'


export default function MarkDownForm(props){
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checkEdit,setCheckEdit] = React.useState(false);
  const [markDown,setMarkDown] = React.useState<any|null>(null);
  const [openMarkDown,setOpenMarkDown] = React.useState(false);
  const [formChanged, setFormChanged] = React.useState(false);

  const [certificates,setCertificates] = React.useState<any|null>(
    markDown?markDown.certificates : []
  );
  const [contentCKI,setContentCKI] = React.useState<any>(null); 
  const state_user: Iuser = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const stringImgOfImgaes = new Array;
  markDown?markDown.images.forEach(el => {
    stringImgOfImgaes.push(el.url);
  }):null;
  const initialFormValues = {
    id: markDown?markDown._id:"",
    title:  markDown?markDown.title:"",
    content: "",
    images:  stringImgOfImgaes?stringImgOfImgaes:"",
    title_image:  markDown?markDown.title_image:"",
    updatedBy: markDown?state_user._id:"",
  }

  const editorRef: any = useRef();
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
    const { CKEditor, ClassicEditor }: any = editorRef.current || {};
    const [errContent, setErrContent] = useState<boolean>(false);

    useEffect(() => {
      editorRef.current = {
        CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
        ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      };
      setEditorLoaded(true);
    }, []);


  useEffect(()=>{
    setCheckEdit(props.checkEdit);
  },[props.checkEdit]);
  useEffect(()=>{
    setMarkDown(props.markdown);
    setContentCKI(props.markdown.content);
  },[props.markdown]);
  // useEffect(()=>{
    
  // },[props.markDown]);
  useEffect(()=>{
    setOpenMarkDown(openMarkDown);
  },[openMarkDown]);

  const handleOpen = () => {
    setOpenMarkDown(true);
  };
  const handleClose = () =>{
    setOpenMarkDown(false);
  };
  const handleSubmit = (values) =>{
    if(contentCKI===""){
      setErrContent(true);
    }else{
      values.content = contentCKI;
      dispatch(updateNews(values));
      setOpenMarkDown(false);
      NProgress.start();
      setErrContent(false);
    }
  }
  const calcFileSize = (base64String) => {
    let stringLength = base64String.length - "data:image/png;base64,".length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    let sizeInKb = sizeInBytes / 1000;
    return sizeInKb;
  };
  console.log(markDown);
  return(
    <React.Fragment>
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
        <Dialog 
          open={openMarkDown}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="lg"
          scroll="body"
        >
          <Formik
             initialValues={initialFormValues}
             onSubmit={handleSubmit}
             validationSchema={yup.object({
              title: yup.string().required("không được để trống tiêu đề"),
              // content: yup.string().required("không được để trống nội dung"),
            })}
          >
            {(props)=>(
              <form
                onSubmit={props.handleSubmit}
                onChange={()=> setFormChanged(true)}
              >
                <DialogTitle
                  id="form-dialog-title"
                  className={classes.dialogTitle}
                >
                  Cập nhật
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                id="outlined-multiline-static"
                                label="Tiêu đề của bài viết"
                                name="title"
                                value={props.values.title}
                                onChange={props.handleChange}
                                fullWidth={true}
                                size="small"
                                error={
                                  props.touched.title &&
                                  Boolean(props.errors.title)
                                }
                                helperText={
                                  props.touched.title &&
                                  props.errors.title
                                }
                              />
                            </Grid>
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        {/* <TextField
                            id="outlined-multiline-static"
                            multiline
                            name="content"
                            onChange={props.handleChange}
                            rows={4}
                            fullWidth
                            // className={classes.textField}
                            InputProps={{ classes: { input: classes.resize } }}
                            label="Nhập nội dung"
                            variant="outlined"
                            value={props.values.content}
                            // onChange={(e) => updateMarkdown(e.target.value)}
                            error={
                              props.touched.content &&
                              Boolean(props.errors.content)
                            }
                            helperText={
                              props.touched.content &&
                              props.errors.content
                            }
                        /> */}
                      <Typography style={{marginLeft:-5,marginBottom:5}}>Nội dung của bài viết</Typography>
                      {editorLoaded ? (
                      <CKEditor
                      editor={ClassicEditor}
                      data={contentCKI?contentCKI:""}
                      onReady={editor => {
                        // You can store the editor and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContentCKI(data);
                      }}
                      onBlur={(event, editor) => {
                        if (contentCKI === "") {
                          setErrContent(true);
                        } else {
                          setErrContent(false);
                        }
                      }}
                      config={{
                        ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: `${SERVERAPI}api/news/imgckeditor`,
                      }}}
                    />
                    ):("loading")}
                    {errContent ? (
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
                  <Grid item xs={12} className={classes.gridItem}>
                        <InputLabel id="" style={{ marginLeft: "10px", marginTop:'30px' }}>
                          Hình của tin tức (giới hạn 1MB)
                        </InputLabel>
                        <Field
                          name="images"
                          validate={(value) => {
                            if (value.length === 0) {
                              return "Chứng chỉ đi kèm phải lớn hơn 1";
                            } else {
                              let totalSize = value.reduce(
                                (acc, i) => (acc += calcFileSize(i)),
                                0
                              );
                              if (totalSize > 1000) {
                                return "Tổng dung lượng phải nhỏ hơn 1MB";
                              }
                            }
                          }}
                          value={props.values.images}
                          component={CertificateRow}
                        />
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
            )}

          </Formik>
        </Dialog>
    </React.Fragment>
  )
}