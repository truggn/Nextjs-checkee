import React, { useEffect, useState, Component } from "react";
import format from "date-fns/format";
import { useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
//
import Participant_Form from "./CreateProduct_Form1";
import { useStyles, useStyles1 } from "./CreateProduct.styles";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../../redux/actions/LoginActions";

import {
  IProduct,
  getProduct,
} from "../../../redux/actions/user/CreateProductActions";

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

function CreateProduct() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const organizationData = useSelector(
    (state: any) => state.selectedOrganization.chooseoranization
  );

  // ======================================== ACCESSRIGHT ============================================//
  const [accessRightData, setAccessRightData] = React.useState<
    ISystemUserTypePageAccessRight[] | []
  >([]);
  const [checkCreateProduct, setCheckCreateProduct] = React.useState(false);
  const dispatch = useDispatch();

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );
  const state_product: IProduct[] = useSelector(
    (state: any) => state.CreateProductUser.create_product_data
  );

  let locationUrl = "";
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["createproduct"],
  };

  useEffect(() => {
    dispatch(checkAccessRight(value));
    dispatch(getProduct(organizationData?.organizationId));
  }, [organizationData, dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createproduct") {
            setCheckCreateProduct(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  // ======================================== ACCESSRIGHT ============================================//

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
  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Khai báo sản phẩm" />
            </Grid>
            <Grid item xs>
              <CardActions>
                {checkCreateProduct ? (
                  <Participant_Form checkEdit={false} />
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
                      STT
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Đối tác
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Loại sản phẩm
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Tên File
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Người tạo
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Ngày tạo
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state_product.length !== 0
                    ? (rowsPerPage > 0
                        ? state_product.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : state_product
                      ).map((row: any, index) => {
                        const createdDate = format(
                          new Date(row.createdAt),
                          "dd/MM/yyyy HH:mm:ss"
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
                              {row.organizationId
                                ? row.organizationId.name_customer
                                : ""}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.productTypeId ? row.productTypeId.name : ""}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.filename}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.createdBy.email}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {createdDate}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRightBorder}
                            >
                              {row.status === "INIT" ? (
                                <Typography variant="body2">
                                  Khởi tạo
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  style={{ color: "green" }}
                                >
                                  Đã duyệt
                                </Typography>
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
                      colSpan={8}
                      count={state_product ? state_product.length : 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "state_product per page" },
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
    </div>
  );
}

export default CreateProduct;
