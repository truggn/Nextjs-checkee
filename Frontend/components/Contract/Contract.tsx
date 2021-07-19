import React, { useEffect, useState, Component } from "react";
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
// import { getContractStart, deleteContractStart, IContract } from 'Frontend/redux/actions/ContractActions'
import format from 'date-fns/format'
import Contract_Form from "./Contract_Form";
import { useStyles, useStyles1 } from "./Contract.styles";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import {
  IContract,
  loadDataContract,
  deletedDataContract,
} from "../../redux/actions/ContractActions";
import {
  ICustomer,
  getCustomerStart,
} from "../../redux/actions/CustomerActions";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
///
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

function Contract() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const contractData: IContract[] = useSelector((state: any) => state.Contract.contractData) || []
  // const [ContractList, setContractList] = useState(null);
  const [Contract, setContract] = useState<IContract|null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCertificatesDialog, setOpenCertificatesDialog] = React.useState(
    false
  );
  const [selectedCertificates, setSelectedCertificates] = React.useState([]);
  //search
  const [search, setSearch] = useState("");
  const [dataFilter, setDataFilter] = useState<IContract[]>([]);
  //-----------------------------------------------------------------------------------------
  //get data  contract
  const getDataContract: IContract[] = useSelector(
    (state: any) => state.Contract.ContractData
  );
  useEffect(() => {
    dispatch(loadDataContract());
  }, [dispatch]);
  // console.log("getDataContract", getDataContract);
  //get data customer
  const dataCustomer = useSelector((state: any) => state.Customer.customerData);
  useEffect(() => {
    dispatch(getCustomerStart());
  }, []);
  // console.log("dataCustomer", dataCustomer);
  // ====================================== ACCESSRIGHT ===================================//
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateContract, setCheckCreateContract] = React.useState(false);
  const [checkUpdateContract, setCheckUpdateContract] = React.useState(false);
  const [checkDeleteContract, setCheckDeleteContract] = React.useState(false);

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
    actionName: ["createContract", "updateContract", "deleteContract"],
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
          if (accessRight["actionName"] === "createContract") {
            setCheckCreateContract(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateContract") {
            setCheckUpdateContract(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteContract") {
            setCheckDeleteContract(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ====================================== ACCESSRIGHT ===================================//

  // useEffect(() => {
  //   async function fetchContract() {
  //     console.log("begin fetch")
  //     await axios.get(CONTRACT).then(res => console.log("result: ", res)).catch(err => console.log("error: ", err))
  //   }

  //   fetchContract()
  // }, [])


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
  const [idDeleted, setIdDeleted] = useState("");
  const handleClickOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(!openDeleteDialog);
    setIdDeleted(id);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = (idnew) => {
    dispatch(deletedDataContract(idnew));
    setOpenDeleteDialog(false);

    // setContractList;
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
  //looking for nameCotract

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    if (search !== "") {
      let data : IContract[] = [];
      let array: IContract[] = [];
      dataCustomer.filter((o) => {
        Object.keys(o).some((k) => {
          if (k === "name_customer") {
            let check = String(o[k])
              .toLowerCase()
              .includes(search.toLowerCase());
            if (check) {
              let checkduble = array.some((item) => item._id === o._id);
              if (!checkduble) {
                array.push(o);
              }
            }
          }
        });
      });
      if (array.length !== 0) {
        for (let i = 0; i < getDataContract.length; i++) {
          for (let j = 0; j < array.length; j++) {
            if (getDataContract[i].customerId === array[j]._id) {
              data.push(getDataContract[i]);
              setDataFilter(data);
            }
          }
        }
      } else {
        alert("Không tìm thấy từ khóa");
      }
    } else {
      alert("Nhập từ khóa để tìm kiếm");
    }
  };
  const handleReset = () => {
    setDataFilter([]);
    setSearch("");
  };
  // ------------------------------------------- handle Toggle Certificates Menu ----------------------------------- //
  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={3}>
                  <CardHeader title="Quản lý hợp đồng" />
                </Grid>
                <Grid item xs={8} style={{ paddingTop: 10 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Nhập tên đối tác"
                    value={search}
                    onChange={(e) => handleChange(e)}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    style={{
                      padding: "8px 0",
                      marginLeft: 3,
                    }}
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{
                      padding: "8px 0",
                      marginLeft: 3,
                    }}
                    onClick={handleReset}
                  >
                    <AutorenewIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <CardActions>
                {checkCreateContract ? (
                  <Contract_Form checkEdit={false} />
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
                    <TableCell className={classes.tableRightBorder}>
                      STT
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Số hợp đồng
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
                      Tên đối tác
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
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      className={classes.tableRightBorder}
                      style={{ width: 150 }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFilter.length!==0
                    ? (rowsPerPage > 0
                        ? dataFilter.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : dataFilter
                      ).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            <a href="#">{row.numberContract}</a>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.nameContract}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {dataCustomer !== null
                              ? dataCustomer.map((get) =>
                                  get._id === row.customerId
                                    ? get.name_customer
                                    : ""
                                )
                              : null}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.date)), 'dd/MM/yyyy')}
                           
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.startDay)), 'dd/MM/yyyy')}
                            
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.endDay)), 'dd/MM/yyyy')}
                            
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            
                            {format((new Date(row.durationPay)), 'dd/MM/yyyy')}
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
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.status === 0
                              ? "Chờ xử lý"
                              : row.status === 1
                              ? "Đang xử lý"
                              : row.status === 2
                              ? "Đã xử lý"
                              : row.status === 3
                              ? "Đã thanh toán"
                              : ""}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {checkUpdateContract ? (
                              <Contract_Form checkEdit={true} contract={row} />
                            ) : null}
                            {checkDeleteContract ? (
                              <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setContract(row);
                                    handleClickOpenDeleteDialog(row._id);
                                  }}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))
                    : //datafilter = null
                    getDataContract
                    ? (rowsPerPage > 0
                        ? getDataContract.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : getDataContract
                      ).map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            <a href="#">{row.numberContract}</a>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.nameContract}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {dataCustomer !== null
                              ? dataCustomer.map((get) =>
                                  get._id === row.customerId
                                    ? get.name_customer
                                    : ""
                                )
                              : null}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.date)), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.startDay)), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.endDay)), 'dd/MM/yyyy')}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {format((new Date(row.durationPay)), 'dd/MM/yyyy')}
                            
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
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.status === 0
                              ? "Chờ xử lý"
                              : row.status === 1
                              ? "Đang xử lý"
                              : row.status === 2
                              ? "Đã xử lý"
                              : row.status === 3
                              ? "Đã thanh toán"
                              : ""}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {checkUpdateContract ? (
                              <Contract_Form checkEdit={true} contract={row} />
                            ) : null}
                            {checkDeleteContract ? (
                              <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    setContract(row);
                                    handleClickOpenDeleteDialog(row._id);
                                  }}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : null}
                          </TableCell>
                        </TableRow>
                      ))
                    :null}

              
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                      colSpan={12}
                      count={
                        dataFilter.length !== 0
                          ? dataFilter.length
                          : getDataContract
                          ? getDataContract.length
                          : 0
                      }
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
        <DialogContent></DialogContent>
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
              Bạn có chắc chắn muốn xóa "<b>{Contract?.nameContract}"</b>?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="default">
            Thoát
          </Button>
          <Button
            onClick={() => handleDelete(idDeleted)}
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

export default Contract;
