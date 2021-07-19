import React, { useEffect, useState, Component } from "react";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
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
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
//

import { useStyles, useStyles1 } from "./SettingProcessParticipant.styles";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../../redux/actions/LoginActions";
import { loadSettingParticipant } from "../../../redux/actions/SettingProcessAction";
import {
  loadProcessManage,
  IListProcessManage,
  getDetailProcessManage
} from "../../../redux/actions/ProcessManageActions";
import Router from 'next/router'
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


export default function SettingProcessParticipant() {
  const classes = useStyles();
  const [participant, setParticipant] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idDelete, setIdDelete] = useState("")

  // ======================================== ACCESSRIGHT ============================================//
  const [accessRightData, setAccessRightData] = React.useState<ISystemUserTypePageAccessRight[]>([]);
  const [checkCreateProcessManage, setCheckProcessManage] = React.useState(
    false
  );
  const [checkUpdateProcessManage, setCheckUpdateProcessManage] = React.useState(
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
  const state_processmanage = useSelector(
    (state: any) => state.ProcessManage.detailprocessmanage
  )

  const state_settingprocessparticipant: any = useSelector(
    (state: any) => state.SettingProcess.setting_participant_data ? state.SettingProcess.setting_participant_data : []
  )

  let locationUrl:any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["createprocessmanage", "editprocessmanage", "deleteParticipant"],
  };

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "createprocessmanage") {
            setCheckProcessManage(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "editprocessmanage") {
            setCheckUpdateProcessManage(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteParticipant") {
            setCheckDeleteParticipant(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  useEffect(() => {
    if(state_processmanage){
      dispatch(loadSettingParticipant(state_processmanage._id));
    }
    
  }, [dispatch]);


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
  const handleClickEdit = (value) => {
    dispatch(getDetailProcessManage(value))
    Router.push('/processofproduct')
  }

  return (
    <div className="main-content">
      <Card className={classes.root}>
        <div className="row">
          <Grid container>
            <Grid item xs={5}>
              <CardHeader title="Thiết lập đối tượng" />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs>
              <CardActions>
                {/* {checkCreateProcessManage ? (
                  <ProcessManage_Form checkEdit={false} />
                ) : null} */}
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
                      Code
                    </TableCell>
                    <TableCell className={classes.tableRightBorder}>
                      Tên đối tượng
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
                  {state_settingprocessparticipant !== null
                    ? (rowsPerPage > 0
                      ? state_settingprocessparticipant.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : state_settingprocessparticipant
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
                          {row.participantId.code}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.participantId.participantName}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {row.participantId.email}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRightBorder}
                        >
                          {checkUpdateProcessManage ? (

                            <Tooltip title="Chỉnh sửa" placement="top-start">
                              <IconButton
                                className={classes.iconButton}
                                aria-label="edit"
                                size="small"
                                color="primary"
                                onClick={() => handleClickEdit(row)}
                              >
                                <EditOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            // <ProcessManage_Form
                            //   checkEdit={true}
                            //   userManage={row}
                            // />
                          ) : null}
                          {/* {checkDeleteParticipant ? (
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
                          ) : null} */}
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
                      count={state_settingprocessparticipant !== null ? state_settingprocessparticipant.length : 0}
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
    </div>
  );
}

