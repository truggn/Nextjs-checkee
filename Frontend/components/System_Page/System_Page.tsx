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
import System_Page_Form from "./System_Page_Form";
import { useStyles } from "./style";
import {
  loadSystemPage,
  deleteSystemPage,
  ISystemPage,
} from "../../redux/actions/SystemPageActions";
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

function System_Page() {
  const classes = useStyles();
  const [systemPageList, setSystemPageList] = useState<ISystemPage[]>([]);
  const [systemPage, setSystemPage] = useState<ISystemPage|null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [openSystemPageForm, setOpenSystemPageForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [systemPageModule, setSystemPageModule] = useState<ISystemPage[]>([]);
  const [systemPageFunction, setSystemPageFunction] = useState<ISystemPage[]>([]);
  const [systemPageFeature, setSystemPageFeature] = useState<ISystemPage[]>([]);
  const [accessRightData, setAccessRightData] = useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateSystemPage, setCheckCreateSystemPage] = useState(false);
  const [checkUpdateSystemPage, setCheckUpdateSystemPage] = useState(false);
  const [checkDeleteSystemPage, setCheckDeleteSystemPage] = useState(false);

  const state: ISystemPage[] = useSelector(
    (state: any) => state.SystemPage.systemPageList
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
    actionName: ["createSystemPage", "updateSystemPage", "deleteSystemPage"],
  };

  useEffect(() => {
    dispatch(checkAccessRight(value));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSystemPage());
  }, [dispatch]);

  useEffect(() => {
    setSystemPageList(state);
    const systemPageModule = state?.filter((item) => item.level === 0);
    const systemPageFunction = state?.filter((item) => item.level === 1);
    const systemPageFeature = state?.filter((item) => item.level === 2);
    setSystemPageModule(systemPageModule);
    setSystemPageFunction(systemPageFunction);
    setSystemPageFeature(systemPageFeature);
  }, [state!]);

  useEffect(() => {
    setSystemPage(systemPage);
  }, [systemPage]);

  useEffect(()=>{
    setAccessRightData(state_accessRightData)
  },[state_accessRightData!])

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createSystemPage") {
            setCheckCreateSystemPage(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateSystemPage") {
            setCheckUpdateSystemPage(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteSystemPage") {
            setCheckDeleteSystemPage(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

 
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
    systemPage ? dispatch(deleteSystemPage(systemPage)) : null;
    setOpenDeleteDialog(false);
    // handleClickOpenSuccessAlert();
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

  const handleClickOpenSystemPageForm = () => {
    setOpenSystemPageForm(true);
  };

  const handleClickCloseSystemPageForm = () => {
    setOpenSystemPageForm(false);
  };

  // console.log("+++++++++++++++++++++++++++++++++++SystemPage")
  // console.log("openDeleteDialog",openDeleteDialog);
  // console.log("systemPage",systemPage)

  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý trang" />
            </Grid>
            <Grid item xs>
              <CardActions>
                {checkCreateSystemPage ? (
                  <System_Page_Form
                    checkEdit={false}
                    systemPageModule={systemPageModule}
                    systemPageFunction={systemPageFunction}
                    systemPageFeature={systemPageFeature}
                  />
                ) : null}
                {/* <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  onClick={(e) => {
                    handleClickOpenSystemPageForm();
                  }}
                >
                  Thêm mới
                </Button> */}
              </CardActions>
            </Grid>
          </Grid>
        </div>
      </Card>
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="simple pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableRightBorder}>
                      orderNo
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      name
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      controllerName
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      actionName
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      level
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      icon
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      url
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {systemPageList !== null
                    ? (rowsPerPage > 0
                        ? systemPageList.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : systemPageList
                      ).map((row, index) => (
                        <TableRow key={index}>
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
                            {row.controllerName}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.actionName}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.level === 0
                              ? row.level + " - Module"
                              : row.level === 1
                              ? row.level + " - Function"
                              : row.level + " - Feature"}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.icon}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.url}
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
                                  setSystemPage(row);
                                  handleClickOpenSystemPageForm;
                                }}
                              >
                                <EditOutlinedIcon />
                              </IconButton> */}
                            {checkUpdateSystemPage ? (
                              <System_Page_Form
                                checkEdit={true}
                                systemPage={row}
                                systemPageLevel={row.level}
                                systemPageModule={systemPageModule}
                                systemPageFunction={systemPageFunction}
                                systemPageFeature={systemPageFeature}
                              />
                            ) : null}
                            {checkDeleteSystemPage ? (
                              <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  id="deleteSystemPage"
                                  className={
                                    classes.iconButton
                                  }
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setSystemPage(row);
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
                      colSpan={8}
                      count={systemPageList ? systemPageList.length : 0}
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
          </div>
        </div>
      </div>

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
              Bạn có chắc chắn muốn xóa "<b>{systemPage?.name}"</b>?
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

export default System_Page;
