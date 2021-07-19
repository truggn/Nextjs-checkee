import React, { useState, useEffect } from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { loadCSS } from "fg-loadcss";
import Icon from "@material-ui/core/Icon";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useStyles } from "./style";
import ManagementMenuFormAdd from "../ManagementMenu/ManagementMenu-FormAdd";
import ManagementMenuFormUpdate from "../ManagementMenu/ManagementMenu-FormUpdate";
import { useSelector, useDispatch } from "react-redux";
import {
  IMenu,
  loadData,
  updateData,
} from "../../redux/actions/MangementMenuAction";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { deletedData } from "../../redux/actions/MangementMenuAction";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { loadSystemPage } from "../../redux/actions/SystemPageActions";
//
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      // marginLeft: theme.spacing(2.5),
    },
  })
);
//Pagination
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
//----------
function TablePaginationActions(props: TablePaginationActionsProps) {
  const classess = useStyles1();
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
    <div className={classess.root}>
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
//-------------------------------------------------Render-------------------------------------------------------
export default function ManagementMenu() {
  //lay du lieu--------------------------------------
  const datalist: IMenu[] = useSelector(
    (state: any) => state.ManagementMenu.listDataManagementMenu
  );
  const loading = useSelector((state: any) => state.ManagementMenu.loading);
  useEffect(() => {
    dispatch(loadData());
  }, []);
  // ======================================== ACCESSRIGHT ============================================//
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);
  const [
    checkCreateManagementMenu,
    setCheckCreateManagementMenu,
  ] = React.useState(false);
  const [
    checkUpdateManagementMenu,
    setCheckUpdateManagementMenu,
  ] = React.useState(false);
  const [
    checkDeleteManagementMenu,
    setCheckDeleteManagementMenu,
  ] = React.useState(false);
  const dispatch = useDispatch();

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
    actionName: [
      "createManagementMenu",
      "updateManagementMenu",
      "deleteManagementMenu",
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
          if (accessRight["actionName"] === "createManagementMenu") {
            setCheckCreateManagementMenu(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateManagementMenu") {
            setCheckUpdateManagementMenu(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteManagementMenu") {
            setCheckDeleteManagementMenu(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ======================================== ACCESSRIGHT ============================================//

  //load dataSystemPage----------------------------------
  const dataSystemPage = useSelector(
    (state: any) => state.SystemPage.systemPageList
  );
  useEffect(() => {
    dispatch(loadSystemPage());
  }, [dispatch]);
  //
  const classes = useStyles();
  //Open Form Add
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (loading) {
      setModal(false);
    }
  }, [loading]);
  const handleClickOpenFormAdd = () => {
    setModal(!modal);
  };
  const hanldeClickCloseFormAdd = () => {
    setModal(false);
  };
  //Open Form Update
  const [modalUpdate, setmodalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({}); //tao noi luu tru data theo id
  const handleClickOpenFormUpdate = (id): void => {
    setmodalUpdate(!modal);
    for (let i = 0; i < datalist.length; i++) {
      if (datalist[i]._id === id) {
        setDataUpdate(datalist[i]);
      }
    }
  };
  const hanldeClickCloseFormUpdate = () => {
    setmodalUpdate(false);
  };

  //----dua dl thanh mang moi
  let parent:IMenu[] = [];
  let child:IMenu[] = [];
  let result:any= [];

  for (let key = 0; key < (datalist ? datalist.length : 0); key++) {
    if (
      datalist[key].parentId === "0" ||
      // datalist[key].parentId === "" ||
      datalist[key].parentId === " "
    ) {
      parent.push(datalist[key]);
    } else {
      child.push(datalist[key]);
    }
  }

  for (let i = 0; i < parent.length; i++) {
    let newarray:any = [];
    for (let j = 0; j < child.length; j++) {
      if (parent[i]["_id"] === child[j]["parentId"]) {
        newarray.push(child[j]);
      }
    }
    result.push({ ...parent[i], child: newarray });
  }
  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, result.length - page * rowsPerPage);
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
  // -----------------------------------ham-Row-----------------------------------------------------------
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    //OpenDeleted
    const [modalDeleted, setModalDeleted] = useState(false);
    const [idDeleted, setIdDeleted] = useState(""); // tao noi luu tru id
    //-----
    const handleClickOpenModalDeleted = (id: string) => {
      setIdDeleted(id);
      setModalDeleted(!modalDeleted);
    };
    const handleClickCloseModalDeleted = () => {
      setModalDeleted(false);
    };
    const handleDeletedData = (idnew) => {
      dispatch(deletedData(idnew));
      setModalDeleted(false);
    };
    //
    return (
      <React.Fragment>
        <TableRow className={classes.root1}>
          <TableCell className={classes.tablecell}>
            <Table className={classes.tablechild}>
              <TableBody>
                <TableRow>
                  <TableCell
                    className={classes.namefunction}
                    component="th"
                    scope="row"
                  >
                    <IconButton
                      size="small"
                      onClick={() => setOpen(!open)}
                      className={classes.iconChild}
                    >
                      {open ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                    </IconButton>
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={0} justify="space-evenly">
                      <Grid item md="auto" sm="auto">
                        <Grid container spacing={0} justify="center">
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="outlined"
                              color="primary"
                              className={classes.button1}
                              onClick={() => handleClickOpenFormUpdate(row._id)}
                              disabled={!checkUpdateManagementMenu}
                            >
                              <Icon
                                className="fas fa-edit"
                                style={{ fontSize: 16 }}
                              />
                              Sửa
                            </Button>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Button
                              variant="outlined"
                              color="secondary"
                              className={classes.button1}
                              onClick={() =>
                                handleClickOpenModalDeleted(row._id)
                              }
                              disabled={!checkDeleteManagementMenu}
                            >
                              <Icon
                                className="far fa-trash-alt"
                                style={{ fontSize: 16 }}
                              />
                              Xóa
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={8} md={8} sm="auto">
                        <Formik
                          initialValues={{
                            _id: row._id,
                            clas: row.clas,
                            pageId: row.pageId,
                            name: row.name,
                            orderNo: row.orderNo,
                            url: row.url,
                            isDashBoard: row.isDashBoard,
                            isVisible: row.isVisible,
                            parentId: row.parentId,
                          }}
                          validationSchema={yup.object({})}
                          onSubmit={(value: IMenu, { setSubmitting }) => {
                            setTimeout(() => {
                              // alert(JSON.stringify(value, null, 2));
                              dispatch(updateData(value));
                              setSubmitting(false);
                            }, 1000);
                          }}
                        >
                          {(prop) => (
                            <form
                              onSubmit={prop.handleSubmit}
                              autoComplete="off"
                            >
                              <Grid container spacing={0} justify="center">
                                <Grid item md={2}>
                                  <TextField
                                    size="small"
                                    type="number"
                                    name="orderNo"
                                    variant="outlined"
                                    value={prop.values.orderNo}
                                    onChange={prop.handleChange}
                                    className={classes.spacetextfiled}
                                    InputProps={{
                                      inputProps: { min: 0, max: 10 },
                                    }}
                                    disabled={!checkUpdateManagementMenu}
                                  />
                                </Grid>
                                <Grid item md={4}>
                                  <TextField
                                    size="small"
                                    type="text"
                                    name="name"
                                    value={prop.values.name}
                                    onChange={prop.handleChange}
                                    variant="outlined"
                                    className={classes.space}
                                    disabled={!checkUpdateManagementMenu}
                                  />
                                </Grid>
                                <Grid item>
                                  <Icon
                                    className={row.clas}
                                    style={{
                                      marginRight: 5,
                                      fontSize: 16,
                                      width: 20,
                                    }}
                                  />
                                </Grid>
                                <Grid item md={4}>
                                  <TextField
                                    size="small"
                                    type="text"
                                    name="clas"
                                    onChange={prop.handleChange}
                                    value={prop.values.clas}
                                    variant="outlined"
                                    className={classes.space}
                                    disabled={!checkUpdateManagementMenu}
                                  />
                                </Grid>
                                <Grid item md={1}>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.space}
                                    type="submit"
                                    disabled={!checkUpdateManagementMenu}
                                  >
                                    Lưu
                                  </Button>
                                </Grid>
                              </Grid>
                            </form>
                          )}
                        </Formik>
                      </Grid>
                      <Grid item md={1} sm="auto">
                        <Typography variant="caption" gutterBottom>
                          {"/" + row.url}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Collapse
              key={row._id}
              in={open}
              timeout="auto"
              unmountOnExit
              // className="wrapperInner"
            >
              <Table className={classes.table}>
                <TableBody>
                  {row.child.length !== 0
                    ? row.child.map((rows, indexx) => (
                        <TableRow key={indexx}>
                          <TableCell className={classes.namefunction}>
                            {rows.name}
                          </TableCell>
                          <TableCell>
                            <Grid container spacing={0} justify="space-evenly">
                              <Grid item md="auto" sm="auto">
                                <Grid container spacing={0} justify="center">
                                  <Grid item md={6} xs={12}>
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      className={classes.button1}
                                      onClick={() =>
                                        handleClickOpenFormUpdate(rows._id)
                                      }
                                      disabled={!checkUpdateManagementMenu}
                                    >
                                      <Icon
                                        className="fas fa-edit"
                                        style={{ fontSize: 16 }}
                                      />
                                      Sửa
                                    </Button>
                                  </Grid>
                                  <Grid item md={6} xs={12}>
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      className={classes.button1}
                                      onClick={() =>
                                        handleClickOpenModalDeleted(rows._id)
                                      }
                                      disabled={!checkDeleteManagementMenu}
                                    >
                                      <Icon
                                        className="far fa-trash-alt"
                                        style={{ fontSize: 16 }}
                                      />
                                      Xóa
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={8} md={8} sm="auto">
                                <Formik
                                  initialValues={{
                                    _id: rows._id,
                                    clas: rows.clas,
                                    pageId: rows.pageId,
                                    name: rows.name,
                                    orderNo: rows.orderNo,
                                    url: rows.url,
                                    isDashBoard: rows.isDashBoard,
                                    isVisible: rows.isVisible,
                                    parentId: rows.parentId,
                                  }}
                                  validationSchema={yup.object({})}
                                  onSubmit={(value: IMenu, { resetForm }) => {
                                    // alert(JSON.stringify(value, null, 2));
                                    dispatch(updateData(value));
                                    resetForm();
                                  }}
                                >
                                  {(propchild) => (
                                    <form onSubmit={propchild.handleSubmit}>
                                      <Grid
                                        container
                                        spacing={0}
                                        justify="center"
                                      >
                                        <Grid item md={2}>
                                          <TextField
                                            size="small"
                                            type="number"
                                            variant="outlined"
                                            name="orderNo"
                                            className={classes.spacetextfiled}
                                            onChange={propchild.handleChange}
                                            value={propchild.values.orderNo}
                                            InputProps={{
                                              inputProps: { min: 0, max: 10 },
                                            }}
                                          />
                                        </Grid>
                                        <Grid item md={4}>
                                          <TextField
                                            size="small"
                                            type="text"
                                            name="name"
                                            variant="outlined"
                                            onChange={propchild.handleChange}
                                            value={propchild.values.name}
                                            className={classes.space}
                                          />
                                        </Grid>
                                        <Grid item>
                                          <Icon
                                            className={rows.clas}
                                            style={{
                                              marginRight: 5,
                                              fontSize: 18,
                                              width: 20,
                                            }}
                                          />
                                        </Grid>
                                        <Grid item md={4}>
                                          <TextField
                                            size="small"
                                            type="text"
                                            variant="outlined"
                                            name="clas"
                                            className={classes.space}
                                            value={propchild.values.clas}
                                            onChange={propchild.handleChange}
                                          />
                                        </Grid>
                                        <Grid item md={1}>
                                          <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.space}
                                            type="submit"
                                          >
                                            Lưu
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </form>
                                  )}
                                </Formik>
                              </Grid>
                              <Grid item md={1} sm="auto">
                                <Typography variant="caption" gutterBottom>
                                  {"/" + rows.url}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
        {/*------------------------------------------Dialog-Xóa------------------------------------------------- */}
        <Dialog
          open={modalDeleted}
          onClick={(event) => event.preventDefault()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span>
                Bạn có chắc chắn muốn xóa "
                {result !== null
                  ? result.map((results) =>
                      results._id === idDeleted
                        ? results.name
                        : results.child !== null
                        ? results.child.map((resultschild) =>
                            resultschild._id === idDeleted
                              ? resultschild.name
                              : ""
                          )
                        : ""
                    )
                  : ""}
                " ?
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseModalDeleted} color="default">
              Thoát
            </Button>
            <Button
              onClick={() => handleDeletedData(idDeleted)}
              color="secondary"
              autoFocus
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  //------------------------------------------------LoadCSS-------------------------------------------
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <div className="main-content">
      <Card>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý Menu" />
            </Grid>
            <Grid item xs>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  onClick={handleClickOpenFormAdd}
                  disabled={!checkCreateManagementMenu}
                >
                  Thêm mới
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </div>
      </Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.unknown4}>
                <Grid container>
                  <Grid item md={2} sm={6} xs={8}>
                    Tên Chức Năng
                  </Grid>
                  <Grid item md={10} sm={9} xs={8}>
                    Chỉnh Sửa
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result !== null
              ? (rowsPerPage > 0
                  ? result.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : result
                ).map((row, index) => <Row key={index} row={row} />)
              : null}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={result !== null ? result.length : 0}
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
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
      <ManagementMenuFormAdd
        openModal={modal}
        closeModal={hanldeClickCloseFormAdd}
        listLvFormAdd={dataSystemPage}
      />
      <ManagementMenuFormUpdate
        openModalUpdate={modalUpdate}
        closeModalUpdate={hanldeClickCloseFormUpdate}
        dataUpdate={dataUpdate}
        listLvFormUpdate={dataSystemPage}
      />
    </div>
  );
}
