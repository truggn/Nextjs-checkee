import React, { useEffect, useState, Component, EventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useStyles } from "./style";
import NProgress from "nprogress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';
import {
  loadSystemPage,
  ISystemPage,
} from "../../redux/actions/SystemPageActions";
import { loadUserType, IUserType } from "../../redux/actions/UserTypeActions";
import {
  loadSystemUserTypePage,
  SystemUserTypePageState,
  ISystemUserTypePage,
  addSystemUserTypePage,
  updateSystemUserTypePage,
  deleteSystemUserTypePage,
} from "../../redux/actions/SystemUserTypePageActions";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

//==================================================================================== render pagination

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

//==================================================================================== Render funtion row
const CollapsedRow = ({ functionRow, row }) => {
  const [openFunction, setOpenFunction] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ width: "62px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenFunction(!openFunction)}
          >
            {openFunction ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <span style={{ fontWeight: "bold" }}>{functionRow.functionName}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
          colSpan={6}
        >
          <Collapse in={openFunction} timeout="auto" unmountOnExit>
            <Box
              margin={1}
              // style={{ overflowX: "scroll" }}
            >
              <Table
                size="small"
                aria-label="purchases"
                // style={{ minWidth: "120%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {row.userTypeList.map((userTypeRow, index) => (
                      <TableCell key={index}>{userTypeRow}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  {functionRow.children.map((featureRow, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ width: "300px" }}>
                        {featureRow.featureName}
                      </TableCell>
                      {featureRow.userTypeCheckbox.map((item, index) => (
                        <TableCell key={index}>{item}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

//==================================================================================== Render module row
function Row(props) {
  const { row } = props;
  const [openModule, setOpenModule] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ background: "#3f51b5" }}>
        <TableCell style={{ width: "62px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenModule(!openModule)}
            style={{ color: "white" }}
          >
            {openModule ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: "white", fontWeight: "bold" }}>
          {row.moduleName}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openModule} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.children.map((functionRow, index) => (
                    <CollapsedRow
                      key={index}
                      row={row}
                      functionRow={functionRow}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Controll() {
  const [systemPageList, setSystemPageList] = useState<ISystemPage[]>([]);
  const [userTypeList, setUserTypeList] = useState<IUserType[]>([]);
  const [systemUserTypePageList, setSystemUserTypePageList] = useState<ISystemUserTypePage[]>([]);
  const [systemPage, setSystemPage] = useState(null);
  const [systemPageModule, setSystemPageModule] = useState<ISystemPage[]>([]);
  const [systemPageFunction, setSystemPageFunction] = useState<ISystemPage[]>([]);
  const [systemPageFeature, setSystemPageFeature] = useState<ISystemPage[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows: any = [];
  const classes = useStyles();
  const state_systemPageList: ISystemPage[] = useSelector(
    (state: any) => state.SystemPage.systemPageList
  );
  const state_userTypeList: IUserType[] = useSelector(
    (state: any) => state.UserType.userTypeList
  );
  const state_systemUserTypePageList: ISystemUserTypePage[] = useSelector(
    (state: any) => state.SystemUserTypePage.systemUserTypePageList
  );
  const state_isLoading: SystemUserTypePageState = useSelector(
    (state: any) => state.SystemUserTypePage.isLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSystemPage());
    dispatch(loadUserType());
    dispatch(loadSystemUserTypePage());
  }, [dispatch]);

  useEffect(() => {
    setSystemPageList(state_systemPageList);
    const systemPageModule = state_systemPageList?.filter(
      (item) => item.level === 0
    );
    const systemPageFunction = state_systemPageList?.filter(
      (item) => item.level === 1
    );
    const systemPageFeature = state_systemPageList?.filter(
      (item) => item.level === 2
    );
    setSystemPageModule(systemPageModule);
    setSystemPageFunction(systemPageFunction);
    setSystemPageFeature(systemPageFeature);
  }, [state_systemPageList!]);

  useEffect(() => {
    setUserTypeList(state_userTypeList);
  }, [state_userTypeList!]);

  useEffect(() => {
    setSystemUserTypePageList(state_systemUserTypePageList);
  }, [state_systemUserTypePageList!]);

  //==================================================================================== handleChange phân quyền
  function handleChangeControll(e, userType: object, feature: object): void {
    let values = {
      _id: "",
      userTypeId: userType["_id"],
      pageId: feature["_id"],
      parentId: feature["parentId"],
    };
    if (e.target.checked) {
      NProgress.start();
      dispatch(addSystemUserTypePage(values));
    } else {
      for (let systemUserTypePage of state_systemUserTypePageList) {
        if (
          values.pageId === systemUserTypePage["pageId"] &&
          values.userTypeId === systemUserTypePage["userTypeId"]
        ) {
          NProgress.start();
          dispatch(deleteSystemUserTypePage(systemUserTypePage));
        }
      }
    }
  }

  const checkSystemUserPage = (userType, feature) => {
    let check = false;
    NProgress.start();
    if (state_systemUserTypePageList) {
      for (let systemUserTypePage of state_systemUserTypePageList) {
        if (
          feature["_id"] === systemUserTypePage["pageId"] &&
          userType["_id"] === systemUserTypePage["userTypeId"]
        ) {
          check = true;
        }
      }
    }
    NProgress.done();
    return check;
  };

  if (systemPageModule) {
    let temp: any = {};
    let temp_function = {};
    let temp_feature = {};
    for (const moduleItem of systemPageModule) {
      temp = {
        ...temp,
        moduleName: moduleItem.name,
        moduleId: moduleItem._id,
        children: [],
        userTypeList: [],
      };
      let count = 0;
      for (const functionItem of systemPageFunction) {
        if (functionItem.parentId === moduleItem._id) {
          temp_function = {
            functionName: functionItem.name,
            functionId: functionItem._id,
            children: [],
          };
          temp["children"] = [...temp["children"], temp_function];
          for (const featureItem of systemPageFeature) {
            if (featureItem.parentId === functionItem._id) {
              temp_feature = {
                featureName: featureItem.name,
                featureId: featureItem._id,
                userTypeCheckbox: [],
              };
              if (state_userTypeList) {
                for (const userTypeItem of state_userTypeList) {
                  if (count === 0) {
                    temp["userTypeList"] = [
                      ...temp["userTypeList"],
                      userTypeItem.name,
                    ];
                  }
                  temp_feature["userTypeCheckbox"] = [
                    ...temp_feature["userTypeCheckbox"],
                    <Checkbox
                      defaultChecked={checkSystemUserPage(
                        userTypeItem,
                        featureItem
                      )}
                      // checked={checkSystemUserPage(userTypeItem, featureItem)}
                      onChange={(e, data) =>
                        handleChangeControll(e, userTypeItem, featureItem)
                      }
                    ></Checkbox>,
                  ];
                }
              }
              temp_function["children"] = [
                ...temp_function["children"],
                temp_feature,
              ];
              count = count + 1;
            }
          }
        }
      }
      rows.push(temp);
    }
  }

  // console.log("state_systemUserTypePageList",state_systemUserTypePageList)
  // console.log("systemPageModule", systemPageModule);
  // console.log("systemPageFunction", systemPageFunction);
  // console.log("systemPageFeature", systemPageFeature);

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
      <Backdrop open={Boolean(state_isLoading)}
        style={{
          zIndex: 1,
          opacity: "1.2 !important",
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card>
        <div className="row">
          <Grid container>
            <Grid item xs={10}>
              <CardHeader title="Quản lý phân quyền" />
            </Grid>
          </Grid>
        </div>
      </Card>
      
      <div>
        <div style={{ display: "flex", height: "100%" }}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead></TableHead>
              <TableBody className={classes.root}>
                {rows !== null
                  ? (rowsPerPage > 0
                      ? rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row, index) => <Row key={row.moduleId} row={row} />)
                  : null}
             
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[3, 5, 10, { label: "All", value: -1 }]}
                    colSpan={8}
                    count={rows ? rows.length : 0}
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
  );
}
