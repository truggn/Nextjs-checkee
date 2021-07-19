import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./ProductAttributes.styles";
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
import ProductAttributesAdd from "./ProductAttributesAdd";
import ProductAttributesUpdate from "./ProductAttributesUpdate";
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
  IProductAttributes,
  loadDataProductAttributes,
  deleteDataProductAttributes,
} from "../../redux/actions/ProductAttributesActions";
import { ICustomer } from "../../redux/actions/CustomerActions";
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
export default function ProductAttributes() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customerData: ICustomer[] = useSelector(
    (state: any) => state.Customer.customerData
  );
  //----------------------------LOAD-DATA---------------------------------
  const dataProductAttributes: IProductAttributes[] = useSelector(
    (state: any) => state.ProductAttributes.ProductAttributesData
  );
  const loading = useSelector((state: any) => state.ProductAttributes.loading);
  useEffect(() => {
    dispatch(loadDataProductAttributes());
  }, [dispatch]);

  // console.log("dataProductAttributes", dataProductAttributes);
  // ======================================== ACCESSRIGHT ============================================//
  const [accessRightData, setAccessRightData] = useState<ISystemUserTypePageAccessRight[]>([]);
  const [
    checkCreateProductAttributes,
    setCheckCreateProducAttributes,
  ] = useState(false);
  const [
    checkUpdateProductAttributes,
    setCheckUpdateProductAttributes,
  ] = useState(false);
  const [
    checkDeleteProductAttributes,
    setCheckDeleteProductAttributes,
  ] = useState(false);

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
      "createproductattributes",
      "updateproductattributes",
      "deleteproductattributes",
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
          if (accessRight["actionName"] === "createproductattributes") {
            setCheckCreateProducAttributes(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateproductattributes") {
            setCheckUpdateProductAttributes(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteproductattributes") {
            setCheckDeleteProductAttributes(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ======================================== ACCESSRIGHT ============================================//
  //---------------------------------------open form Add----------------------------------------//
  const [modal, setModal] = useState(false);
  const handleClickOpen = () => {
    setModal(!modal);
  };
  const hanldeClickClose = () => {
    setModal(false);
  };
  //---------------------------------------open form Update----------------------------------------//
  const [modalUpdate, setmodalUpdate] = useState(false);
  const [dataToFromUpdate, setDataToFromUpdate] = useState<IProductAttributes| {}>('');
  const handleOpenUpdate = (id: string) => {
    setmodalUpdate(!modalUpdate);
    for (let i = 0; i < dataProductAttributes.length; i++) {
      if (dataProductAttributes[i]._id === id) {
        setDataToFromUpdate(dataProductAttributes[i]);
      }
    }
  };
  const handleCloseUpdate = () => {
    setmodalUpdate(false);
  };
  //   //---------//
  useEffect(() => {
    if (loading) {
      setModal(false);
      setmodalUpdate(false);
    }
  }, [loading]);
  //---------------------------------------open dialog Deleted----------------------------------------//
  const [modalDeleted, setModalDeleted] = useState(false);
  const [idData, setIdData] = useState("");
  const hanldeOpenModalDelete = (id: string) => {
    setIdData(id);
    setModalDeleted(true);
  };
  const handleCloseModalDelete = () => {
    setModalDeleted(false);
  };
  const handleDeleteDataProductAttributes = (idnew: string) => {
    dispatch(deleteDataProductAttributes(idnew));
    setModalDeleted(false);
  };
  //paganation
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      dataProductAttributes
        ? dataProductAttributes.length - page * rowsPerPage
        : 0
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
  // };
  return (
    <div className="main-content">
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Card className={classes.root_userType}>
            <div className="row">
              <Grid container>
                <Grid item md={12} xs={12} className={classes.grid}>
                  <Grid item xs={8} md={9}>
                    <CardHeader title="Bổ Sung Thông Tin Sản Phẩm" />
                  </Grid>
                  <Grid item xs={4} md={3}>
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
                        disabled={!checkCreateProductAttributes}
                      >
                        Thêm mới
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
                    Mã Loại Sản Phẩm
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Tên Loại Sản Phẩm
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Đối tác
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                   Mã Thông tin Bổ sung
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Thông Tin Bổ Sung
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Kiểu Thông Tin Bổ Sung
                  </TableCell>
                  <TableCell className={classes.tableRightBorder}>
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProductAttributes
                  ? (rowsPerPage > 0
                      ? dataProductAttributes.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : dataProductAttributes
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
                          {row.productTypeId ? row.productTypeId.code : ''}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.productTypeId ? row.productTypeId.name : ''}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          { row.organizationId ? row.organizationId.name_customer : "" }
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.code}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.key}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.type}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          <Tooltip title="Sửa" placement="top-start">
                            <span>
                              <IconButton
                                className={classes.iconButton}
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => {
                                  handleOpenUpdate(row._id);
                                }}
                                disabled={!checkUpdateProductAttributes}
                              >
                                <EditOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Xóa" placement="top-start">
                            <span>
                              <IconButton
                                className={classes.iconButton}
                                aria-label="delete"
                                size="small"
                                color="secondary"
                                onClick={() => {
                                  hanldeOpenModalDelete(row._id);
                                }}
                                disabled={!checkDeleteProductAttributes}
                              >
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
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
                    count={
                      dataProductAttributes ? dataProductAttributes.length : 0
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
        </Grid>
      </Grid>
      {/*----------------------------------Dialog Xóa---------------------------------- */}
      <Dialog
        open={modalDeleted}
        onClose={handleCloseModalDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span>
              Bạn có chắc chắn muốn xóa "
              {dataProductAttributes
                ? dataProductAttributes.map((id) =>
                    id._id === idData ? id.key : ""
                  )
                : ""}
              "?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} color="default">
            Thoát
          </Button>
          <Button
            onClick={() => handleDeleteDataProductAttributes(idData)}
            color="secondary"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <ProductAttributesAdd
        openModal={modal}
        closeModal={hanldeClickClose}
        customerDataAdd={customerData}
      />
      <ProductAttributesUpdate
        openModalUpdate={modalUpdate}
        closeModalUpdate={handleCloseUpdate}
        dataUpdate={dataToFromUpdate}
        customerDataUpdate={customerData}
      />
    </div>
  );
}
