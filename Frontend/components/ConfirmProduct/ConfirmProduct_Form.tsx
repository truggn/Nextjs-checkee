import React, { useEffect } from "react";
import format from "date-fns/format";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Typography, useTheme } from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useStyles } from "./ConfirmProduct_Form.styles";
import NProgress from "nprogress";

interface initialFormValues {
  _id: string;
}

function TablePaginationActions(props) {
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
    <div>
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

export default function Participant_Form(props) {
  const classes = useStyles();
  const [openParticipantForm, setOpenParticipantForm] = React.useState(false);
  const [confirmproduct, setConfirmProduct] =
    React.useState<initialFormValues | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [id, setId] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const initialFormValues = {
    _id: confirmproduct ? confirmproduct._id : "",
  };
  useEffect(() => {
    setOpenParticipantForm(openParticipantForm);
  }, [openParticipantForm]);

  useEffect(() => {
    setConfirmProduct(props.confirmproduct);
  }, [props.confirmproduct]);

  const handleOpen = (e) => {
    setOpenModal(true);
    setOpenParticipantForm(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenParticipantForm(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const confirmproduct_: any = props.confirmproduct;
  const date: any = confirmproduct_?.createdAt;
  const createdDate = format(new Date(date), "dd/MM/yyyy HH:mm:ss");

  return (
    <React.Fragment>
      <Tooltip title="Xem chi tiết" placement="top-start">
        <IconButton
          className={classes.iconButton}
          aria-label="edit"
          size="small"
          color="primary"
          onClick={handleOpen}
        >
          <PostAddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openParticipantForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={() => {
            NProgress.start();
          }}
        >
          {(props) => {
            setId(props.initialValues._id);
            return (
              <form onSubmit={props.handleSubmit}>
                <DialogTitle
                  id="form-dialog-title"
                  className={classes.dialogTitle}
                >
                  Xem chi tiết sản phẩm
                </DialogTitle>
                <DialogContent>
                  <Grid container>
                    <Grid item md={6} xs={12}>
                      <Typography>
                        Đối tác:{" "}
                        {confirmproduct_.organizationId
                          ? confirmproduct_.organizationId.name_customer
                          : ""}
                      </Typography>
                      <Typography>
                        Loại sản phẩm:{" "}
                        {confirmproduct_.productTypeId
                          ? confirmproduct_.productTypeId.name
                          : ""}
                      </Typography>
                      <Typography>
                        Tên file: {confirmproduct_.filename}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Typography>Ngày tạo : {createdDate}</Typography>
                      <Grid container>
                        <Typography>Trạng thái: </Typography>
                        {confirmproduct_.status === "INIT" ? (
                          <Typography style={{ marginLeft: 4 }}>
                            Khởi tạo
                          </Typography>
                        ) : (
                          <Typography style={{ color: "green", marginLeft: 4 }}>
                            Đã duyệt
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginTop: 5 }}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              className={classes.tableRightBorder}
                            >
                              STT
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableRightBorder}
                            >
                              Code
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableRightBorder}
                            >
                              Tên sản phẩm
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(rowsPerPage > 0
                            ? confirmproduct_.products.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : confirmproduct_.products
                          ).map((row: any, index) => (
                            <TableRow key={row._id}>
                              <TableCell
                                align="center"
                                className={classes.tableRightBorder}
                                scope="row"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                align="center"
                                className={classes.tableRightBorder}
                              >
                                {row.code}
                              </TableCell>
                              <TableCell
                                align="center"
                                className={classes.tableRightBorder}
                              >
                                {row.name}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TablePagination
                              rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: "All", value: -1 },
                              ]}
                              colSpan={3}
                              count={confirmproduct_.products.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              SelectProps={{
                                inputProps: { "aria-label": "rows per page" },
                                native: true,
                              }}
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
                </DialogContent>
                <DialogActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.button}
                    onClick={handleClose}
                    color="default"
                  >
                    Đóng
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}
