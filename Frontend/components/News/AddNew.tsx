import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, InputLabel, Paper, TextField, Typography } from "@material-ui/core";
import { Field, Formik } from "formik";
import { IListNews } from "Frontend/redux/actions/NewsActions";
import {useStyles} from './News.style';
import * as yup from "yup";
import { CertificateRow } from "./CerificateRow";
// import {CKEditor} from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SERVERAPI } from '@configFrontend/index'

export default function AddNews(propss){
    const classes = useStyles();
    const {state_user, handleClickOpenViewDialog} = propss;
    const [content, setContent] = useState<any>("");

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

    const  initial={
        title: "",
        content:"",
        images: "",
        createdBy:state_user._id,
      }
      console.log(initial);
    const calcFileSize = (base64String) => {
        let stringLength = base64String.length - "data:image/png;base64,".length;
        let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        return sizeInKb;
      };
 return(
    <Grid item xs={12} md={5} lg={5} style={{marginTop:10,}}> 
    <Paper className={classes.paper}>
    <Formik
     initialValues={initial}
        validationSchema={yup.object({
          title: yup.string().required("không được để trống tiêu đề"),
        })}
        onSubmit={(values: IListNews,{resetForm,setSubmitting})=>{
            if(content===""){
              setErrContent(true);
            }else{
              setSubmitting(false)
              values.content = content;
              handleClickOpenViewDialog(values);
              setErrContent(false);
            }
        }}
      
    >
       {(formikProps)=>(
           <form onSubmit={formikProps.handleSubmit} onReset={formikProps.handleReset} noValidate>
                  
            <Grid container spacing={3}>
        {/* --------------------------------------------Tiêu đề------------------------------------------ */}
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} >
                  <TextField
                    variant="outlined"
                    label="Tiêu đề của bài viết"
                    id="outlined-multiline-static"
                    name="title"
                    value={formikProps.values.title}
                    onChange={formikProps.handleChange}
                    fullWidth={true}
                    size="small"
                    error={
                      formikProps.touched.title &&
                      Boolean(formikProps.errors.title)
                    }
                    helperText={
                      formikProps.touched.title &&
                      formikProps.errors.title
                    }
                  />
                </Grid>
            </Grid>
            </Grid>
            <Grid item xs={3}>
                    <Button variant="contained" color="primary" type="submit" >
                      xem trước 
                  </Button>
                  <Button variant="contained" color="secondary" type="reset" style={{marginTop:"10px"}}>
                      reset
                  </Button>
            </Grid>
           
            <Grid item xs={12} md={12} lg={12} className={classes.gridItem}>
                <InputLabel id="" style={{ marginLeft: "10px" }}>
                  ảnh của tin tức 
                </InputLabel>
                <Field
                  name="images"
                  validate={(value) => {
                    if (value.length === 0) {
                      return "ảnh của tin tức chưa được thêm vào";
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
                  value={formikProps.values.images}
                  component={CertificateRow}
                />
              </Grid>

            {/*------------------------------------------------Nội dung------------------------------------------ */}
            <Grid item xs={12} md={12} lg={12}>
            {/* <TextField
                id="outlined-multiline-static"
                multiline
                name="content"
                onChange={formikProps.handleChange}
                rows={4}
                fullWidth
                // className={classes.textField}
                InputProps={{ classes: { input: classes.resize } }}
                label="Nhập nội dung"
                variant="outlined"
                value={formikProps.values.content}
                // onChange={(e) => updateMarkdown(e.target.value)}
                error={
                  formikProps.touched.content &&
                  Boolean(formikProps.errors.content)
                }
                helperText={
                  formikProps.touched.content &&
                  formikProps.errors.content
                }
                
            /> */}
            <Typography style={{marginLeft:-5,marginBottom:5}}>Nội dung của bài viết</Typography>
            {editorLoaded ? (
              
              <CKEditor
              editor={ClassicEditor}
              data={content}
              onReady={editor => {
                // You can store the editor and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              onBlur={(event, editor) => {
                if (content === "") {
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

            </Grid>
        
        </form>
       )}
    </Formik>
    </Paper>
    
   
</Grid>
 )
}