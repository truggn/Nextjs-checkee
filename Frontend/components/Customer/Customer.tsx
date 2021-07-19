import React, { useEffect, useState, Component, useMemo } from "react";
import { useTheme } from "@material-ui/core/styles";
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
import NProgress from "nprogress";
import FormModal from "Frontend/components/FormModal";
//
import Customer_Form from "./Customer_Form";
import Customer_Form_TEST from "./Customer_Form_TEST";
import { CertificateRow } from "./Customer_Form";
import { useStyles, useStyles1 } from "./Customer.styles";
// actions
import {
  getCustomerStart,
  createCustomerStart,
  updateCustomerStart,
  deleteCustomerStart,
  ICustomer,
  exportCustomerExcel,
  filterCustomer,
} from "../../redux/actions/CustomerActions";
import createCustomer from "Frontend/constant.config.api/api/createCustomer";
//
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import Export_Excel from "./Export_Excel";
import AutoCompleteSearch from "./AutoCompleteSearch";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

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




function Customer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customerData: ICustomer[] =
    useSelector((state: any) => state.Customer.customerData) || [];
  const [selectingCustomer, setSelectingCustomer] = useState<ICustomer|null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCertificatesDialog, setOpenCertificatesDialog] = React.useState(
    false
  );
  const [selectedCertificates, setSelectedCertificates] = React.useState([]);

  // ==================================== ACCESS RIGHT ======================================== //
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateCustomer, setCheckCreateCustomer] = React.useState(false);
  const [checkUpdateCustomer, setCheckUpdateCustomer] = React.useState(false);
  const [checkDeleteCustomer, setCheckDeleteCustomer] = React.useState(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );

  let locationUrl:any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["createCustomer", "updateCustomer", "deleteCustomer"],
  };

  useEffect(() => {
    dispatch(checkAccessRight(value));
  }, [dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createCustomer") {
            setCheckCreateCustomer(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateCustomer") {
            setCheckUpdateCustomer(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteCustomer") {
            setCheckDeleteCustomer(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ==================================== ACCESS RIGHT ======================================== //

  /*-----------------------------LOAD CUSTOMERS---------------------------*/
  useEffect(() => {
    function loadCustomer() {
      dispatch(getCustomerStart());
    }
    loadCustomer();
  }, []);
  /*-----------------------------LOAD CUSTOMERS---------------------------*/

  // useEffect(() => {
  //   setUserType;
  // }, [userType]);


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
  const handleClickOpenDeleteDialog = (row) => {
    setOpenDeleteDialog(true);
    setSelectingCustomer(row);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteRow = () => {
    if (selectingCustomer) {
      dispatch(deleteCustomerStart(selectingCustomer));
      setOpenDeleteDialog(false);
    }
  };
  // ------------------------------------------- handle Delete Dialog ----------------------------------- //
  // ------------------------------------------- handle Toggle Certificates Menu ----------------------------------- //
  const handleOpenCertificatesDialog = (certs) => {
    setSelectedCertificates(certs);
    setOpenCertificatesDialog(!openCertificatesDialog);
  };

  const handleCloseCertificatesDialog = () => {
    setOpenCertificatesDialog(!openCertificatesDialog);
  };
  // ------------------------------------------- handle Toggle Certificates Menu ----------------------------------- //
  const handleExport=()=>{
    dispatch(exportCustomerExcel());
  }
  const [customerSearch,setCustomerSearch] = useState<any|null>([]);

  

  const filterCustomer = (id)=>{
    return customerData.filter(i=>(
      i._id === id
    ))
  }
  const onSearchCustomer = async(e) =>{
    const result = await filterCustomer(e);
    setCustomerSearch(result);
  }
  useMemo(()=>{
    console.log("hello")
    onSearchCustomer([]);
  },[customerData])
  return (
    <div className="main-content">
      <AutoCompleteSearch customerData={customerData} onHandleSearch={onSearchCustomer}/>
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý đối tác" />
            </Grid>
            <Grid item xs={2}>
              <CardActions>
                {checkCreateCustomer ? (
                  <>
                    {customerSearch.length === 0? ( <Customer_Form_TEST checkEdit={false} />):null}
                    {customerSearch.length === 0? (  <Export_Excel onHandleExport={handleExport}/>):null}
                 
                  </>
                ) : null}
               
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
                      Tên đối tác
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Mã số thuế
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Địa chỉ
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Tài khoản ngân hàng
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Số điện thoại
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Số fax
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Email
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Chứng chỉ
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerSearch.length === 0?(customerData !== null
                    ? (rowsPerPage > 0
                        ? customerData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : customerData
                      ).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.name_customer}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.taxCode}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.address}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.bank} - {row.account_number}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.phone}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.fax}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            <Button
                              // disabled={row.certificate_image.length === 0}
                              aria-controls="simple-menu"
                              aria-haspopup="true"
                              onClick={() =>
                                handleOpenCertificatesDialog(
                                  row.certificate_image
                                )
                              }
                            >
                              {"Chứng chỉ"}
                            </Button>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {checkUpdateCustomer ? (
                              <Customer_Form_TEST
                                checkEdit={true}
                                customer={row}
                              />
                            ) : null}

                            {checkDeleteCustomer ? (
                              <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    handleClickOpenDeleteDialog(row);
                                  }}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))
                    : null):(customerSearch !== null
                      ? (rowsPerPage > 0
                          ? customerSearch.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : customerSearch
                        ).map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.name_customer}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.taxCode}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.address}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.bank} - {row.account_number}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.phone}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.fax}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.email}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              <Button
                                // disabled={row.certificate_image.length === 0}
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={() =>
                                  handleOpenCertificatesDialog(
                                    row.certificate_image
                                  )
                                }
                              >
                                {"Chứng chỉ"}
                              </Button>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {checkUpdateCustomer ? (
                                <Customer_Form_TEST
                                  checkEdit={true}
                                  customer={row}
                                />
                              ) : null}
  
                              {checkDeleteCustomer ? (
                                <Tooltip title="Xóa" placement="top-start">
                                  <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    size="small"
                                    color="secondary"
                                    onClick={() => {
                                      handleClickOpenDeleteDialog(row);
                                    }}
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        ))
                      : null)}
              
                </TableBody>
               <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 5, { label: "All", value: -1 }]}
                      colSpan={8}
                      count={customerSearch.length === 0?customerData.length:customerSearch.length}
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
      {/*----------------------------------Dialog certificates---------------------------------- */}
      <Dialog
        open={openCertificatesDialog}
        onClose={handleCloseCertificatesDialog}
        aria-labelledby="cert-dialog-title"
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <DialogTitle id="simple-dialog-title">Chứng chỉ</DialogTitle>
        <DialogContent>
          <CertificateRow value={selectedCertificates} viewOnly={true} />
        </DialogContent>
      </Dialog>
      {/*----------------------------------Dialog Xóaa---------------------------------- */}
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
              Bạn có chắc chắn muốn xóa "
              <b>{selectingCustomer?.name_customer}"</b>?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="default">
            Thoát
          </Button>
          <Button onClick={handleDeleteRow} color="secondary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Customer;
