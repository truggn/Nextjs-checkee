import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import {
  getAppendixContractStart,
  deleteAppendixContractStart,
  IAppendixContract,
} from "../../redux/actions/AppendixContractActions";

//
import AppendixContract_Form from "./AppendixContract_Form";
import { useStyles, useStyles1 } from "./AppendixContract.styles";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import format from "date-fns/format";
import { loadDataContract } from "../../redux/actions/ContractActions";
//
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

function AppendixContract() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [AppendixContract, setContract] = useState<IAppendixContract>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [openCertificatesDialog, setOpenCertificatesDialog] = React.useState(
  //   false
  // );
  // const [selectedCertificates, setSelectedCertificates] = React.useState([]);

  // ======================================== ACCESSRIGHT =================================================//
  const [accessRightData, setAccessRightData] = React.useState<
    ISystemUserTypePageAccessRight[]
  >([]);
  const [checkCreateAppendixContract, setCheckCreateAppendixContract] =
    React.useState(false);
  const [checkUpdateAppendixContract, setCheckUpdateAppendixContract] =
    React.useState(false);
  const [checkDeleteAppendixContract, setCheckDeleteAppendixContract] =
    React.useState(false);
  // const dispatch = useDispatch();

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );

  let locationUrl = "";
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: [
      "createAppendixContract",
      "updateAppendixContract",
      "deleteAppendixContract",
    ],
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
          if (accessRight["actionName"] === "createAppendixContract") {
            setCheckCreateAppendixContract(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateAppendixContract") {
            setCheckUpdateAppendixContract(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteAppendixContract") {
            setCheckDeleteAppendixContract(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ======================================== ACCESSRIGHT =================================================//

  //get all data
  const appendixContractData: IAppendixContract[] = useSelector(
    (state: any) => state.AppendixContract.appendixContractData
  );

  React.useEffect(() => {
    dispatch(getAppendixContractStart());
  }, [dispatch]);
  //modal delete
  const [idDeletedAppendixContract, setIdDeletedAppendixContract] =
    useState("");
  const handleClickOpenDeleteDialog = (row) => {
    setContract(row);
    setOpenDeleteDialog(true);
    setIdDeletedAppendixContract(row.id);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = (idnew) => {
    dispatch(deleteAppendixContractStart(idnew));
    setOpenDeleteDialog(false);
  };
  //

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
  //
  const dataContract = useSelector((state: any) => state.Contract.ContractData);
  useEffect(() => {
    dispatch(loadDataContract());
  }, [dispatch]);
  //
  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý phụ lục hợp đồng" />
            </Grid>
            <Grid item xs>
              <CardActions>
                {checkCreateAppendixContract ? (
                  <AppendixContract_Form checkEdit={false} />
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
                style={{ overflowX: "scroll" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Số phụ lục hợp đồng
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Tên hợp đồng
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Ngày ký
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Ngày có hiệu lực
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Ngày hết hiệu lực
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Hạn thanh toán
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Loại hợp đồng
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Giá trị hợp đồng
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      % VAT
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      tiền VAT
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Chữ ký bên A
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Chữ ký bên B
                    </TableCell>
                    {/* <TableCell className={classes.tableRightBorder} style={{ width: 150 }}>
                      Trạng thái
                    </TableCell> */}
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appendixContractData !== null
                    ? (rowsPerPage > 0
                        ? appendixContractData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : appendixContractData
                      ).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            <a href="#">{row.numberAppendixContract}</a>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {/* {row.nameContract} */}
                            {dataContract !== null
                              ? dataContract.map((item) =>
                                  item._id === row.nameContract
                                    ? item.nameContract
                                    : ""
                                )
                              : ""}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format(new Date(row.date), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format(new Date(row.startDay), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {/* {
                              new Date(row.endDay)
                                .toLocaleString()
                                .split(",")[0]
                            } */}
                            {format(new Date(row.endDay), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {/* {
                              new Date(row.durationPay)
                                .toLocaleString()
                                .split(",")[0]
                            } */}
                            {format(new Date(row.durationPay), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.packageBuy}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.contractValue}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.vat}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.vatPrice}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.publicKey}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.privateKey}
                          </TableCell>
                          {/* <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.contractStatus}
                          </TableCell> */}
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {checkUpdateAppendixContract ? (
                              <AppendixContract_Form
                                checkEdit={true}
                                appendixContract={row}
                              />
                            ) : null}
                            {checkDeleteAppendixContract ? (
                              <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    // setContract(row);
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
                    : null}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                      colSpan={12}
                      count={appendixContractData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "appendixContractData per page",
                        },
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
              <b>{AppendixContract ? AppendixContract.nameContract : ""}"</b>?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="default">
            Thoát
          </Button>
          <Button
            onClick={() => handleDelete(idDeletedAppendixContract)}
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

export default AppendixContract;
