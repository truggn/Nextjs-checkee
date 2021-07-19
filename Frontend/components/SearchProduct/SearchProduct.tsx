import React, { useEffect, useState, Component } from "react";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useStyles, useStyles1 } from "./SearchProduct.styles";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import {
  ISearchProduct,
  searchDataProduct,
} from "../../redux/actions/SearchProductActions";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { format } from 'date-fns';

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
// ----------------------------SEARCH PRODUCT-------------------------
function SearchProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //search
  const [search, setSearch] = useState("");
  const [dataFilter, setDataFilter] = useState<any>(null);
  //-----------------------------------------------------------------------------------------
  //get data  searchProduct
  const getDataProduct: ISearchProduct[] = useSelector(
    (state: any) => state.SearchProduct.SearchProductData
  );
  // ====================================== ACCESSRIGHT ===================================//
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);

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
    actionName: ["createProduct", "updateProduct", "deleteProduct"],
  };

  useEffect(() => {
    dispatch(checkAccessRight(value));
  }, [dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);


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

  //HANDLE CLOSE DIALOG DEL
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  //HANDLE SEARCH KEYWORD
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    if (search !== "") {
      dispatch(searchDataProduct(search));
    } else {
      alert("Nhập từ khóa để tìm kiếm");
    }
  };
  const handleReset = () => {
    setDataFilter(null);
    setSearch("");
  };
  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={3}>
                  <CardHeader title="Tìm kiếm sản phẩm" />
                </Grid>
                <Grid item xs={8} style={{ paddingTop: 10 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Nhập code sản phẩm"
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
                    <TableCell align="center" className={classes.tableRightBorder}>STT</TableCell>
                    <TableCell align="center" className={classes.tableRightBorder}>Code</TableCell>
                    <TableCell align="center" className={classes.tableRightBorder}>Tên Sản Phẩm</TableCell>
                    <TableCell align="center" className={classes.tableRightBorder}>Cân nặng</TableCell>
                    <TableCell align="center" className={classes.tableRightBorder}>Màu sắc</TableCell>
                    <TableCell align="center" className={classes.tableRightBorder}>Ngày</TableCell>
                    <TableCell align="center" className={classes.tableRightBorder}>Thao Tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getDataProduct !== null
                    ? (rowsPerPage > 0
                      ? getDataProduct.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : getDataProduct
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
                          {row.code}
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

                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >

                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >

                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          
                        </TableCell>
                      </TableRow>
                    ))
                    : ""}
            

                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                      colSpan={12}
                      count={
                        dataFilter !== null
                          ? dataFilter.length
                          : getDataProduct !== null
                            ? getDataProduct.length
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
              Bạn có chắc chắn muốn xóa ?
              </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="default">
            Thoát
            </Button>
          <Button
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

export default SearchProduct;