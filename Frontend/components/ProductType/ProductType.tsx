import React, { useState, useEffect, useMemo } from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import format from "date-fns/format";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./ProductType.styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import TableFooter from "@material-ui/core/TableFooter";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TablePagination from "@material-ui/core/TablePagination";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ProductTypeAdd from "./ProductTypeAdd";
import ProductTypeUpdate from "./ProductTypeUpdate";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useSelector, useDispatch } from "react-redux";
import { IUserProfile } from "../../redux/actions/LoginActions";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {
  IProductType,
  loadDataProductType,
  deleteDataProductType,
  verifiedDataProductType,
} from "../../redux/actions/ProductTypeActions";
import {
  ICustomer,
  getCustomerStart,
} from "../../redux/actions/CustomerActions";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SearchProducttype from "./SearchProducttype";

// Pagantion
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);
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
//
export default function ProductType() {
  const classes = useStyles();
  const dispatch = useDispatch();

  //----------------------------LOAD-DATA---------------------------------
  const dataProductType: IProductType[] = useSelector(
    (state: any) => state.ProductType.productTypeData
  );

  const [dataList, setDataList] = useState(dataProductType);
  useEffect(() => {
    setDataList(dataProductType);
  }, [dataProductType]);

  const loading = useSelector((state: any) => state.ProductType.loading);
  useEffect(() => {
    dispatch(loadDataProductType());
  }, [dispatch]);

  const dataCustomer = useSelector((state: any) => state.Customer.customerData);
  useEffect(() => {
    dispatch(getCustomerStart());
  }, []);
  // ======================================== ACCESSRIGHT ============================================//
  const [accessRightData, setAccessRightData] = useState<
    ISystemUserTypePageAccessRight[]
  >([]);
  const [checkCreateProductType, setCheckCreateProductType] = useState(false);
  const [checkUpdateProductType, setCheckUpdateProductType] = useState(false);
  const [checkDeleteProductType, setCheckDeleteProductType] = useState(false);
  const [checkVerifiedProductType, setCheckVerifiedProductType] =
    useState(false);

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
      "createproducttype",
      "updateproducttype",
      "deletedproducttype",
      "verifiedproducttype",
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
          if (accessRight["actionName"] === "createproducttype") {
            setCheckCreateProductType(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateproducttype") {
            setCheckUpdateProductType(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deletedproducttype") {
            setCheckDeleteProductType(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "verifiedproducttype") {
            setCheckVerifiedProductType(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ======================================== ACCESSRIGHT ============================================//
  //---------------------------------------open form Add----------------------------------------//
  const [modal, setModal] = useState(false);
  // useEffect(() => {
  //   if (loading) {
  //     setModal(false);
  //   }
  // }, [loading]);
  const handleClickOpen = () => {
    setModal(!modal);
  };
  const hanldeClickClose = () => {
    setModal(false);
  };
  //---------------------------------------open form Update----------------------------------------//
  const [modalUpdate, setmodalUpdate] = useState(false);
  const [dataToFromUpdate, setDataToFromUpdate] =
    useState<IProductType | {}>("");
  const [nameCustomer, setNameCustomer] = useState("");
  const handleOpenUpdate = (id) => {
    setmodalUpdate(!modalUpdate);
    for (let i = 0; i < dataProductType.length; i++) {
      if (dataProductType[i]._id === id) {
        // const nameCustomer = dataCustomer.find(
        //   (item) => item._id === dataProductType[i].organizationId
        // );

        // setNameCustomer(nameCustomer.name_customer);
        setDataToFromUpdate(dataProductType[i]);
      }
    }
  };
  const handleCloseUpdate = () => {
    setmodalUpdate(false);
  };
  //---------//
  useEffect(() => {
    if (loading) {
      setModal(false);
      setmodalUpdate(false);
    }
  }, [loading]);
  //---------------------------------------open dialog Deleted----------------------------------------//
  const [modalDeleted, setModalDeleted] = useState(false);
  const [modalVerified, setModalVerified] = useState(false);
  const [idData, setIdData] = useState("");

  // x??a lo???i s???n ph???m
  const hanldeOpenModalDelete = (id) => {
    setIdData(id);
    setModalDeleted(true);
  };
  const handleCloseModalDelete = () => {
    setModalDeleted(false);
  };
  const handleDeleteDataProductType = (idnew: any) => {
    const idUser = state_getuserlogindata._id;
    const dataDelete = {
      id: idnew,
      deletedBy: idUser,
    };
    dispatch(deleteDataProductType(dataDelete));
    setModalDeleted(false);
  };

  // x??c minh lo???i s???n ph???m
  const hanldeOpenModalVerified = (id) => {
    setIdData(id);
    setModalVerified(true);
  };

  const handleCloseModalVerified = () => {
    setModalVerified(false);
  };

  const handleVerifiedDataProductType = (idnew: any) => {
    const idUser = state_getuserlogindata._id;
    const data_ = {
      id: idnew,
      verifiedBy: idUser,
    };
    dispatch(verifiedDataProductType(data_));
    setModalVerified(false);
  };

  //paganation
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      dataProductType ? dataProductType.length - page * rowsPerPage : 0
    );

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

  //--------------------------------------- Search ----------------------------------------//
  const handleSearch = (data) => {
    setDataList(data);
  };
  return (
    <div className="main-content">
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Card className={classes.root_userType}>
            <div className="row">
              <Grid container>
                <Grid item md={12} xs={12} className={classes.grid}>
                  <Grid item xs={2} md={2}>
                    <CardHeader title="Lo???i S???n Ph???m" />
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <CardActions className={classes.cardAction}>
                      <SearchProducttype
                        handleSearch={handleSearch}
                        dataList={dataList}
                        dataProductType={dataProductType}
                      />
                    </CardActions>
                  </Grid>

                  <Grid item xs={2} md={2}>
                    <CardActions className={classes.cardAction}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={(e) => {
                          handleClickOpen();
                        }}
                        disabled={!checkCreateProductType}
                      >
                        Th??m m???i
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Card>
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
                    M?? lo???i s???n ph???m
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    T??n lo???i s???n ph???m
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    T??n ?????i t??c
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Qu???c gia
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Danh m???c
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Ng??y t???o
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Thao t??c
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList
                  ? (rowsPerPage > 0
                      ? dataList.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : dataList
                    ).map((row: any, index) => {
                      const createdDate = format(
                        new Date(row.createdAt),
                        "dd/MM/yyyy HH:mm:ss "
                      );

                      return (
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
                            {row !== null ? row.code : ""}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row !== null ? row.name : ""}
                          </TableCell>

                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row !== null
                              ? row.organizationId.name_customer
                              : ""}
                            {/* {dataCustomer
                              ? dataCustomer.map((get) =>
                                  get._id === row.organizationId ||
                                  get._id === row.organizationId._id
                                    ? get.name_customer
                                    : ""
                                )
                              : null} */}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row !== null ? row.countryOfOrigin.name : ""}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row.categoryId ? row.categoryId.name : ""}
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            {row !== null ? createdDate : ""}
                          </TableCell>
                          <TableCell
                            padding="none"
                            scope="row"
                            className={classes.tableRightBorder}
                          >
                            <Tooltip title="S???a" placement="top-start">
                              <span>
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="edit"
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    // setUserType(row);
                                    // handleClickOpenUserTypeForm;
                                    handleOpenUpdate(row._id);
                                  }}
                                  disabled={!checkUpdateProductType}
                                >
                                  <EditOutlinedIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                            <Tooltip title="X??a" placement="top-start">
                              <span>
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    hanldeOpenModalDelete(row._id);
                                  }}
                                  disabled={!checkDeleteProductType}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </span>
                            </Tooltip>

                            {row.verified ? (
                              <Tooltip
                                title="???? x??c minh"
                                placement="top-start"
                              >
                                <span>
                                  <IconButton
                                    className={classes.iconButton}
                                    aria-label="delete"
                                    size="small"
                                    style={{ color: "green" }}
                                    disabled={!checkVerifiedProductType}
                                  >
                                    <VerifiedUserIcon />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title="Ch??a x??c minh"
                                placement="top-start"
                              >
                                <span>
                                  <IconButton
                                    className={classes.iconButton}
                                    aria-label="verifi"
                                    size="small"
                                    color="default"
                                    onClick={() => {
                                      hanldeOpenModalVerified(row._id);
                                    }}
                                    disabled={!checkVerifiedProductType}
                                  >
                                    <VerifiedUserIcon />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                    colSpan={4}
                    count={dataList ? dataList.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    labelDisplayedRows={({ from, to, count }) =>
                      `??ang xem ${from} ?????n ${to} trong t???ng s??? ${count} m???c`
                    }
                    labelRowsPerPage={"H??ng m???i trang"}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {/*----------------------------------Dialog X??a---------------------------------- */}
      <Dialog
        open={modalDeleted}
        onClose={handleCloseModalDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"X??c nh???n x??a"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>
              B???n c?? ch???c ch???n mu???n x??a "
              {dataProductType
                ? dataProductType.map((id) =>
                    id._id === idData ? "M?? Code:" + id.code : ""
                  )
                : ""}
              "?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} color="default">
            Tho??t
          </Button>
          <Button
            onClick={() => handleDeleteDataProductType(idData)}
            color="secondary"
            autoFocus
          >
            X??a
          </Button>
        </DialogActions>
      </Dialog>
      {/*----------------------------------Dialog Verified---------------------------------- */}
      <Dialog
        open={modalVerified}
        // onClose={handleCloseModalVerified}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"X??c nh???n x??c minh"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>
              B???n c?? ch???c ch???n mu???n x??c minh "
              {dataProductType
                ? dataProductType.map((id) =>
                    id._id === idData ? "M?? Code:" + id.code : ""
                  )
                : ""}
              "?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalVerified} color="default">
            Tho??t
          </Button>
          <Button
            onClick={() => handleVerifiedDataProductType(idData)}
            color="secondary"
            autoFocus
          >
            X??c minh
          </Button>
        </DialogActions>
      </Dialog>
      <ProductTypeAdd openModal={modal} closeModal={hanldeClickClose} />
      <ProductTypeUpdate
        // nameCustomer={nameCustomer}
        openModalUpdate={modalUpdate}
        closeModalUpdate={handleCloseUpdate}
        dataUpdate={dataToFromUpdate}
      />
    </div>
  );
}
