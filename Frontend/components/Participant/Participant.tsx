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
//
import Participant_Form from "./Participant_Form";
import { useStyles, useStyles1 } from "./Participant.styles";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { IListParticipant, loadData, deletedData } from "../../redux/actions/ParticipantActions";
import { ITypeParticipant, loadTypeParticipant } from "../../redux/actions/TypeParticipantActions";
import {
  getCustomerStart,
  createCustomerStart,
  updateCustomerStart,
  deleteCustomerStart,
  ICustomer,
} from "../../redux/actions/CustomerActions";
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


function Participant() {
  const classes = useStyles();
  const [participant, setParticipant] = useState<any>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idDelete, setIdDelete] = useState("")
  // ======================================== ACCESSRIGHT ============================================//
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateParticipant, setCheckCreateParticipant] = React.useState(
    false
  );
  const [checkUpdateParticipant, setCheckUpdateParticipant] = React.useState(
    false
  );
  const [checkDeleteParticipant, setCheckDeleteParticipant] = React.useState(
    false
  );
  const dispatch = useDispatch();

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );
  const state_participant:IListParticipant[] = useSelector(
    (state: any) => state.Participant.participantdata
  )

  let locationUrl:any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["createParticipant", "updateParticipant", "deleteParticipant"],
  };

  useEffect(() => {
    dispatch(getCustomerStart());
    dispatch(loadTypeParticipant())   
  }, [ dispatch])

  useEffect(() => {
    dispatch(checkAccessRight(value));
    dispatch(loadData())
  }, [dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createParticipant") {
            setCheckCreateParticipant(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateParticipant") {
            setCheckUpdateParticipant(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteParticipant") {
            setCheckDeleteParticipant(accessRight["checkAccessRight"]);
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

  // ------------------------------------------- handle Delete Dialog ----------------------------------- //
  const handleClickOpenDeleteDialog = (value: string) => {
    setIdDelete(value)
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    dispatch(deletedData(idDelete))
    setOpenDeleteDialog(false);
  };
  // ------------------------------------------- handle Delete Dialog ----------------------------------- //

  // ------------------------------------------- handle Alert ------------------------------------------- //


  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý đối tượng tham gia" />
            </Grid>
            <Grid item xs>
              <CardActions>
                {checkCreateParticipant ? (
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
                      Tên đối tượng
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Mã đối tượng
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Loại đối tượng
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Địa chỉ
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Số điện thoại
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Email
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state_participant !== null
                    ? (rowsPerPage > 0
                      ? state_participant.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : state_participant
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
                          {row.participantName}
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
                          {row.participantType ? row.participantType.description : ''}
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
                          {row.phone}
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
                          {checkUpdateParticipant ? (
                            <Participant_Form
                              checkEdit={true}
                              participant={row}
                            />
                          ) : null}
                          {checkDeleteParticipant ? (
                            <Tooltip title="Xóa" placement="top-start">
                              <IconButton
                                className={classes.iconButton}
                                aria-label="delete"
                                size="small"
                                color="secondary"
                                onClick={() => {
                                  setParticipant(row);
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
                    : ""}
                
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                      colSpan={8}
                      count={state_participant !==null? state_participant.length: 0}
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
              Bạn có chắc chắn muốn xóa "<b>{participant?.name}"</b>?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="default">
            Thoát
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
     </div>
  );
}

export default Participant;
