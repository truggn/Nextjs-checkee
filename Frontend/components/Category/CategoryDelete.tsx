import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NProgress from "nprogress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteDataCategory } from "../../redux/actions/CategoryActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { IDeleteCategory } from "../../redux/actions/CategoryActions";

export default function CategoryDelete(props) {
  const { openModalDelete, closeModalDelete, dataDelete } = props;
  const dispatch = useDispatch();

  // lấy user login
  const dataUser: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const userId: string = dataUser._id;

  const deleteCategory = (id: string) => {
    const _deleteCategory: IDeleteCategory = {
      id: id,
      userId: userId,
    };
    dispatch(deleteDataCategory(_deleteCategory));
    NProgress.start();
    closeModalDelete();
  };

  return (
    <div>
      <Dialog
        open={openModalDelete}
        onClose={closeModalDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa {dataDelete ? dataDelete.code : ""} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModalDelete} color="primary">
            Thoát
          </Button>
          <Button
            onClick={() => deleteCategory(dataDelete._id)}
            color="primary"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
