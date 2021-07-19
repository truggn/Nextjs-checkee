import React, { useEffect, useState, Component } from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
// import {
//   DataGrid,
//   ColDef,
//   ValueGetterParams,
//   ValueFormatterParams,
// } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import UserType_Form from "./UserType_Form";
import { useStyles } from "./style";
import {
  loadUserType,
  deleteUserType,
  IUserType,
} from "../../redux/actions/UserTypeActions";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

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

function UserType() {
  const classes = useStyles();
  const [userTypeList, setUserTypeList] = useState<IUserType[]|null>(null);
  const [userType, setUserType] = useState<IUserType|null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [openUserTypeForm, setOpenUserTypeForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [accessRightData, setAccessRightData] = useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateUserType, setCheckCreateUserType] = useState(false);
  const [checkUpdateUserType, setCheckUpdateUserType] = useState(false);
  const [checkDeleteUserType, setCheckDeleteUserType] = useState(false);

  const state_userTypeList: IUserType[] = useSelector(
    (state: any) => state.UserType.userTypeList
  );
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );

  const dispatch = useDispatch();

  let locationUrl:any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["createUserType", "updateUserType", "deleteUserType"],
  };

  useEffect(() => {
    dispatch(checkAccessRight(value));
  }, [dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    dispatch(loadUserType());
  }, [dispatch]);

  useEffect(() => {
    setUserTypeList(state_userTypeList);
  }, [state_userTypeList!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createUserType") {
            setCheckCreateUserType(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateUserType") {
            setCheckUpdateUserType(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteUserType") {
            setCheckDeleteUserType(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // const rows = [
  //   { id: Math.random(), orderNo: 1, name: "Snow", note: "Jon" },
  //   { id: Math.random(), orderNo: 2, name: "Lannister", note: "Cersei" },
  //   { id: Math.random(), orderNo: 3, name: "Lannister", note: "Jaime" },
  //   { id: Math.random(), orderNo: 4, name: "Stark", note: "Arya" },
  //   { id: Math.random(), orderNo: 5, name: "Targaryen", note: "Daenerys" },
  //   { id: Math.random(), orderNo: 6, name: "Melisandre", note: null },
  //   { id: Math.random(), orderNo: 7, name: "Clifford", note: "Ferrara" },
  //   { id: Math.random(), orderNo: 8, name: "Frances", note: "Rossini" },
  //   { id: Math.random(), orderNo: 9, name: "Roxie", note: "Harvey" },
  // ];


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

  // ------------------------------------------- handle Delete Dialog ----------------------------------- //
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    userType ? dispatch(deleteUserType(userType)) : null;
    setOpenDeleteDialog(false);
  };
  // ------------------------------------------- handle Delete Dialog ----------------------------------- //

  // ------------------------------------------- handle Alert ------------------------------------------- //
  const handleClickOpenSuccessAlert = () => {
    setOpenSuccessAlert(true);
  };

  const handleCloseSuccessAlert = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessAlert(false);
  };

  const handleClickOpenErrorAlert = () => {
    setOpenErrorAlert(true);
  };

  const handleCloseErrorAlert = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorAlert(false);
  };

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  // ------------------------------------------- handle Alert ------------------------------------------- //

  const handleClickOpenUserTypeForm = () => {
    setOpenUserTypeForm(true);
  };

  const handleClickCloseUserTypeForm = () => {
    setOpenUserTypeForm(false);
  };

  // console.log("+++++++++++++++++++++++++++++++++++UserType")
  // console.log("openDeleteDialog",openDeleteDialog);
  // console.log("userType",userType)

  return (
    <div className="main-content">
      <Card className={classes.root_userType}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý loại người dùng" />
            </Grid>
            <Grid item xs>
              <CardActions>
                {checkCreateUserType ? (
                  <UserType_Form checkEdit={false} />
                ) : null}
                {/* <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  onClick={(e) => {
                    handleClickOpenUserTypeForm();
                  }}
                >
                  Thêm mới
                </Button> */}
              </CardActions>
            </Grid>
          </Grid>
        </div>
      </Card>
      {/* <div style={{ 
        height: 400, 
        width: "100%" 
        }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}> */}
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableRightBorder}>
                      STT
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Loại người dùng
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Ghi chú
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state_userTypeList !== null
                    ? (rowsPerPage > 0
                        ? state_userTypeList.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : state_userTypeList
                      ).map((row, index) => (
                        <TableRow key={index} >
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.orderNo}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.note}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {/* <IconButton
                                className={classes.iconButton}
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setUserType(row);
                                  handleClickOpenUserTypeForm;
                                }}
                              >
                                <EditOutlinedIcon />
                              </IconButton> */}
                            {checkUpdateUserType ? (
                              <UserType_Form checkEdit={true} userType={row} />
                            ) : null}
                            {checkDeleteUserType ? (
                              <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setUserType(row);
                                    handleClickOpenDeleteDialog();
                                  }}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
              
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                      colSpan={4}
                      count={state_userTypeList ? state_userTypeList.length : 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      labelDisplayedRows={({ from, to, count }) =>
                        `Đang xem ${from} đến ${to} trong tổng số ${count} mục`
                      }
                      labelRowsPerPage={"Hàng mỗi trang"}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          {/* </div>
        </div>
      </div> */}

      {/*----------------------------------Dialog Xóa---------------------------------- */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>
              Bạn có chắc chắn muốn xóa "<b>{userType?.name}"</b>?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="default">
            Thoát
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------------------------------     Alert----------------------------------- */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
      >
        <Alert onClose={handleCloseSuccessAlert} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorAlert}
        autoHideDuration={4000}
        onClose={handleCloseErrorAlert}
      >
        <Alert onClose={handleCloseErrorAlert} severity="error">
          This is an error message!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserType;
