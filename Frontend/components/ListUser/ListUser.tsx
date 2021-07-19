import { useSelector, useDispatch } from "react-redux";
import {
  loadData,
  IListUser,
  deletedUser,
  updateStatus,
  updateStatusNoActive,
} from "./../../redux/actions/ListUserActions";

import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Tooltip from "@material-ui/core/Tooltip";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import AddUser from "./AddUser";
// import ChangePassUser from "./ChangePassUser";
import UpdateUser from "./UpdateUser";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { TableFooter } from "@material-ui/core";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
//
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    marginBottom: 15,
    float: "right",
  },
});
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
//Pagatable
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
//
function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
///
export default function ListUser() {
  const classes = useStyles();

  // ======================================Access Right=====================================//
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateUser, setCheckCreateUser] = React.useState(false);
  const [checkUpdateUser, setCheckUpdateUser] = React.useState(false);
  const [checkDeleteUser, setCheckDeleteUser] = React.useState(false);
  const [checkBlockStatusUser, setCheckBlockStatusUser] = React.useState(false);
  const [checkOpenStatusUser, setCheckOpenStatusUser] = React.useState(false);
  const dispatch = useDispatch();
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );

  let locationUrl = '';
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: [
      "createUser",
      "updateUser",
      "deleteUser",
      "blockStatusUser",
      "openStatusUser",
    ],
  };

  React.useEffect(() => {
    dispatch(checkAccessRight(value));
  }, [dispatch]);

  React.useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  React.useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createUser") {
            setCheckCreateUser(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateUser") {
            setCheckUpdateUser(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteUser") {
            setCheckDeleteUser(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "blockStatusUser") {
            setCheckBlockStatusUser(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "openStatusUser") {
            setCheckOpenStatusUser(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);
  // ======================================Access Right=====================================//

  //
  // get all data
  const datalist: IListUser[] = useSelector(
    (state: any) => state.ListUser.listUserdata
  );
  const loading: IListUser[] = useSelector(
    (state: any) => state.ListUser.loading
  );
  React.useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);
  //
  // const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, datalist ? datalist.length - page * rowsPerPage : 0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log("datalist", datalist);

  //
  const [dataUpdate, setDataUpdate] = React.useState({});

  //modal AddUser
  const [modal, setmodal] = React.useState(false);
  const handleClickOpen = () => {
    setmodal(!modal);
  };
  const close = () => {
    setmodal(false);
  };
  React.useEffect(() => {
    if (loading) {
      setmodal(false);
      // alert(loading);
    }
  }, [loading]);
  //modalChangePass
  // const [modalChangePass, setmodalChangePass] = React.useState(false);
  // const handleClickOpenChangePass = (idchange) => {
  //   setmodalChangePass(!modalChangePass);
  //   for (let i = 0; i < datalist.length; i++) {
  //     if (datalist[i]._id === idchange) {
  //       setDataUpdate(datalist[i]);
  //     }
  //   }
  // };
  // const closeChangePass = () => {
  //   setmodalChangePass(false);
  // };
  //modalUpdateUser
  const [modalUpdateUser, setmodalUpdateUser] = React.useState(false);
  const handleClickOpenUpdateUser = (id: any) => {
    setmodalUpdateUser(!modalUpdateUser);
    for (let i = 0; i < datalist.length; i++) {
      if (datalist[i]._id === id) {
        setDataUpdate(datalist[i]);
      }
    }
  };
  const closeUpdateUser = () => {
    setmodalUpdateUser(false);
  };
  //modal xóa
  const [modalDeleteUser, setModalDeleteUser] = React.useState(false);
  const [iddeleted, setIddeleted] = React.useState("");
  const handleOpenDeleteUser = (id: string) => {
    setIddeleted(id);
    setModalDeleteUser(!modalDeleteUser);
  };
  const handleCloseDeleteUser = () => {
    setModalDeleteUser(false);
  };
  const handleDelete = (id) => {
    dispatch(deletedUser(id));
    setModalDeleteUser(!modalDeleteUser);
  };
  //
  const handleStatusActive = (id) => {
    dispatch(updateStatus(id));
  };
  const handleStatusNoActive = (id) => {
    dispatch(updateStatusNoActive(id));
  };
  //Icon Thao tác
  const iconDeleted = (id: any) => (
    <Tooltip title="Xóa người dùng">
      <IconButton onClick={() => handleOpenDeleteUser(id)}>
        <DeleteIcon color="error" />
      </IconButton>
    </Tooltip>
  );

  const iconBlockStatus = (id) => (
    <Tooltip title="Tắt trạng thái người dùng">
      <IconButton onClick={() => handleStatusNoActive(id)}>
        <LockIcon color="secondary" />
      </IconButton>
    </Tooltip>
  );
  const iconOpenStatus = (id: any) => (
    <Tooltip title="Mở trạng thái người dùng">
      <IconButton onClick={() => handleStatusActive(id)}>
        <LockOpenIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
  // const iconChangePass = (id) => (
  //   <Tooltip title="Thay đổi mật khẩu">
  //     <IconButton onClick={() => handleClickOpenChangePass(id)}>
  //       <VpnKeyIcon color="action" />
  //     </IconButton>
  //   </Tooltip>
  // );
  //

  return (
    <div>
      <div>
        <Typography variant="h5">Danh Sách Người Dùng</Typography>
      </div>
      {checkCreateUser ? (
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Thêm Mới
          </Button>
        </div>
      ) : null}
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên Đăng Nhập</TableCell>
                <TableCell align="left">Họ Và Tên</TableCell>
                <TableCell align="right">Đăng Nhập Thất Bại</TableCell>
                <TableCell align="center">Loại Người Dùng</TableCell>
                <TableCell align="center">Trạng Thái</TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datalist !== null
                ? (rowsPerPage > 0
                    ? datalist.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : datalist
                  ).map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {checkUpdateUser ? (
                            <Button
                              onClick={() => handleClickOpenUpdateUser(row._id)}
                              style={{ textTransform: "none" }}
                            >
                              <span>{row.email}</span>
                            </Button>
                          ) : (
                            row.email
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.lastName + " " + row.firstName}
                        </TableCell>
                        <TableCell align="center">
                          {row.passwordFailures}
                        </TableCell>
                        <TableCell align="center">{row.userType}</TableCell>
                        <TableCell align="center">
                          {row.status === 0 ? (
                            <div className="status-1">
                              <span style={{ color: "#FF0000" }}>
                                Tắt hoạt động{" "}
                              </span>
                            </div>
                          ) : (
                            <div className=" status-2">
                              <span style={{ color: "#009347" }}>
                                Hoạt động
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell scope="row" component="th" align="center">
                          {checkDeleteUser ? iconDeleted(row._id) : null}
                          {checkBlockStatusUser
                            ? row.status === 1
                              ? iconBlockStatus(row)
                              : ""
                            : null}
                          {checkOpenStatusUser
                            ? row.status === 0
                              ? iconOpenStatus(row)
                              : ""
                            : null}
                          {/* {iconChangePass(row._id)} */}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : ""}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={datalist !== null ? datalist.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  labelDisplayedRows={({ from, to, count }) =>
                    `Đang xem ${from} đến ${to} trong tổng số ${count} mục`
                  }
                  labelRowsPerPage={"Hàng mỗi trang"}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <AddUser showmodal={modal} close={close} />
      {/* <ChangePassUser
        showchangepassuser={modalChangePass}
        close={closeChangePass}
        changepass={dataUpdate}
      /> */}
      <UpdateUser
        showupdateuser={modalUpdateUser}
        close={closeUpdateUser}
        createData={dataUpdate}
      />
      {/*-------------------------------------------Xóa------------------------------------------------- */}
      <Dialog
        open={modalDeleteUser}
        onClose={handleCloseDeleteUser}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>
              Bạn có chắc chắn muốn xóa "
              {datalist != null
                ? datalist.map((data) =>
                    data._id === iddeleted ? data.email : ""
                  )
                : ""}
              "?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteUser} color="default">
            Thoát
          </Button>
          <Button
            onClick={() => handleDelete(iddeleted)}
            color="secondary"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
