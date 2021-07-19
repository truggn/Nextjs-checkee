import React, { useEffect, useState, Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { IUserProfile } from "../../redux/actions/LoginActions";
//styles
import { useStyles, useRowStyles } from './CreateProduct_Form.styles'
import { IProduct, createProduct } from "../../redux/actions/CreateProductActions";
import NProgress from 'nprogress'
import { DropzoneArea } from 'material-ui-dropzone'
export default function Participant_Form(props) {
  const classes = useStyles();
  const [openParticipantForm, setOpenParticipantForm] = React.useState(false);
  const [checkEdit, setCheckEdit] = React.useState(false);
  const [participant, setParticipant] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [file, setFile] = React.useState(null);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const dispatch = useDispatch();
  const initialFormValues = {
    file: "",
    createdBy: "",
  }

  useEffect(() => {
    setCheckEdit(props.checkEdit)
  }, [props.checkEdit])

  useEffect(() => {
    setOpenParticipantForm(openParticipantForm)
  }, [openParticipantForm])

  useEffect(() => {
    setParticipant(props.participant)
  }, [props.participant])

  const handleOpen = () => {
    setOpenModal(true);
    setOpenParticipantForm(true)
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenParticipantForm(false)
  };

  const handleChangeFile = (e) => {
    setFile(e)
  }
  // console.log("=========================================");
  // console.log("openParticipantForm", openParticipantForm);
  // console.log("checkEdit", checkEdit);
  return (
    <React.Fragment>
      {checkEdit ? (
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
      ) : (
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleOpen}
          >
            Thêm mới
          </Button>
        )}
      <Dialog
        open={openParticipantForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
        scroll="body"
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={(values: any) => {
            values.file = file
            values.createdBy = state_getuserlogindata._id
            dispatch(createProduct(values))
            NProgress.start()
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
                    ? "Thêm mới sản phẩm"
                    : "Cập nhật đối tượng"}
                </DialogTitle>
                <DialogContent>
                  <Grid container>
                    <DropzoneArea
                      onChange={(e) => handleChangeFile(e)}
                    />
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
            )
          }
          }
        </Formik>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
