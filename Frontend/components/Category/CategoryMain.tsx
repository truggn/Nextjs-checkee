import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  Tooltip,
  Chip,
  Typography,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { useStyles } from "./Main.styles";
import {
  ICategory,
  loadDataCategory,
} from "../../redux/actions/CategoryActions";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { getCustomerStart } from "../../redux/actions/CustomerActions";
import { loadData } from "../../redux/actions/ListUserActions";
import CategoryAdd from "./CategoryAdd";
import CategoryDelete from "./CategoryDelete";
import CategoryUpdate from "./CategoryUpdate";
import ClearIcon from "@material-ui/icons/Clear";
import { styled } from "@material-ui/core/styles";

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #4568dc  ,#b06ab3)",
  height: 30,
  width: 114,
});

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// tạo hàng header
const columns = [
  { id: "code", label: "Mã danh mục", minWidth: 20, width: 100 },
  {
    id: "name",
    label: "Tên danh mục",
    minWidth: 100,
    maxWidth: 200,
    width: 300,
  },
  {
    id: "display",
    label: "Hiển thị",
    minWidth: 25,
    maxWidth: 100,
    width: 100,
  },
  {
    id: "index",
    label: "Vị trí",
    minWidth: 25,
    maxWidth: 100,
    width: 100,
  },
  {
    id: "level",
    label: "Cấp độ",
    minWidth: 50,
    maxWidth: 100,
    width: 300,
  },
  {
    id: "thaotac",
    label: "Thao tác",
    minWidth: 100,
    maxWidth: 50,
    width: 100,
  },
];

const Category = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [dataDelete, setDataDelete] = useState<ICategory | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<ICategory | null>(null);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  // get data category từ store redux
  const categoriesData: ICategory[] = useSelector(
    (state: any) => state.Category.dataCategory
  );

  /* ======================================== ACCESS_RIGHT ======================================== */
  const [accessRightData, setAccessRightData] = React.useState<
    ISystemUserTypePageAccessRight[]
  >([]);
  const [checkCreateCategory, setCheckCreateCategory] = React.useState(false);
  const [checkUpdateCategory, setCheckUpdateCategory] =
    React.useState<boolean>(false);
  const [checkDeleteCategory, setCheckDeleteCategory] =
    React.useState<boolean>(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );
  let locationUrl: any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["addCategory", "updateCategory", "deleteCategory"],
  };

  // useEffect(() => {
  //   dispatch(checkAccessRight(value));
  //   dispatch(getCustomerStart());
  //   dispatch(loadData());
  // }, [dispatch]);

  // useEffect(() => {
  //   setAccessRightData(state_accessRightData);
  // }, [state_accessRightData!]);
  useEffect(() => {
    dispatch(checkAccessRight(value));
    dispatch(getCustomerStart());
    // dispatch(loadData());
  }, [dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "addCategory") {
            setCheckCreateCategory(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateCategory") {
            setCheckUpdateCategory(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteCategory") {
            setCheckDeleteCategory(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  /* ======================================== TABLE_PAGE ============================================= */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* ======================================== CATEGORY ================================================ */
  // dispacth data category
  useEffect(() => {
    dispatch(loadDataCategory());
    NProgress.start();
  }, []);

  /* ======================================== OPEN/CLOSE MODDAL ADD ==================================== */
  const handleModalAdd = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  /* ======================================== OPEN/CLOSE MODDAL DELETE ==================================== */
  const hanldeOpenModalDelete = (data) => {
    setOpenDelete(true);
    setDataDelete(data);
  };
  const hanldeCloseModalDelete = () => {
    setOpenDelete(false);
  };

  /* ======================================== OPEN/CLOSE MODDAL UPDATE ==================================== */
  const hanldeOpenModalUpdate = (data) => {
    setOpenUpdate(true);
    setDataUpdate(data);
  };
  const hanldeCloseModalUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <div className="main-content">
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Card>
            <div className="row">
              <Grid container>
                <Grid item md={12} xs={12} container>
                  <Grid item xs={8} md={9}>
                    <CardHeader title="Danh Mục" />
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <CardActions
                      className={classes.cardAction}
                      title="Thêm mới"
                    >
                      <MyButton
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                        onClick={handleModalAdd}
                        disabled={!checkCreateCategory}
                      >
                        Thêm mới
                      </MyButton>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Card>
          <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ width: 10 }}
                    className={classes.tableRightBorder}
                  >
                    STT
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      className={classes.tableRightBorder}
                      key={column.id}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                          {row.isHomeCategory ? (
                            <Chip
                              icon={<DoneIcon />}
                              label="Hiển thị"
                              clickable
                              color="primary"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              icon={<ClearIcon />}
                              label="Ẩn"
                              color="secondary"
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.indexHomeCategory}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.level}
                        </TableCell>
                        <TableCell
                          padding="none"
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
                                  hanldeOpenModalUpdate(row);
                                }}
                                disabled={!checkUpdateCategory}
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
                                  hanldeOpenModalDelete(row);
                                }}
                                disabled={!checkDeleteCategory}
                              >
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, { label: "100", value: 100 }]}
                    colSpan={4}
                    count={categoriesData ? categoriesData.length : 0}
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
      <CategoryAdd openModal={open} closeModal={handleModalClose} />
      <CategoryDelete
        openModalDelete={openDelete}
        closeModalDelete={hanldeCloseModalDelete}
        dataDelete={dataDelete}
      />
      <CategoryUpdate
        openModalUpdate={openUpdate}
        closeModalUpdate={hanldeCloseModalUpdate}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};

export default Category;
