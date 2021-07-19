import React, { useEffect } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableFooter,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  Box,
  Grid,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ProductTypeWithoutProcessForm from "./ProductTypeWithoutProcessForm";
import Link from "next/link";
import { IListProcessManage } from "Frontend/redux/actions/ProcessManageActions";
import { useDispatch, useSelector } from "react-redux";
import {
  IProductForProcess,
  loadDataProductForProcess,
} from "Frontend/redux/actions/ProductTypeForProcessActions";
import { loadDataProductWithoutProcess } from "Frontend/redux/actions/ProductTypeWithoutProcessActions";

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

interface Data {
  organization: string;
  producttype: string;
  code: string;
  name: string;
  stt: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "stt",
    numeric: false,
    disablePadding: true,
    label: "STT ",
  },
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "Mã sản phẩm ",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Tên sản phẩm",
  },
  {
    id: "producttype",
    numeric: true,
    disablePadding: false,
    label: "Loại sản phẩm",
  },
  {
    id: "organization",
    numeric: true,
    disablePadding: false,
    label: "Tên đối tác",
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, numSelected, rowCount } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

//
const ProductTypeForProcess = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [modal, setmodal] = React.useState(false);

  const dispatch = useDispatch();

  //lay id quy trinh
  const detailprocessmanage: IListProcessManage = useSelector(
    (state: any) => state.ProcessManage.detailprocessmanage
  );
  //lay danh sach san pham da co trong quy trinh
  const dataProductForProcess: IProductForProcess[] = useSelector(
    (state: any) => state.ProductTypeForProcess.dataProductForProcess
  );

  const handleClickOpen = () => {
    setmodal(!modal);
  };
  const handleClickClose = () => {
    setmodal(false);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = dataProductForProcess.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  useEffect(() => {
    dispatch(loadDataProductForProcess(detailprocessmanage._id));
    dispatch(loadDataProductWithoutProcess());
  }, []);

  let dataProductForProcess_ = [...dataProductForProcess];

  const getDataChild = (data) => {
    setData(data);
  };
  dataProductForProcess_.unshift(...data);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Card>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <CardHeader title="Sản phẩm thuộc quy trình" />
              <Box ml={2}>
                <Link href="/processofproduct">Go back</Link>
              </Box>
            </Grid>
            <Grid item>
              <Box mr={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Thêm mới
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={dataProductForProcess_.length}
            />
            <TableBody>
              {(rowsPerPage > 0
                ? dataProductForProcess_.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataProductForProcess_
              ).map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell id={labelId}>{row.code}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      {row.productTypeId ? row.productTypeId.name : ""}
                    </TableCell>
                    <TableCell align="left">
                      {row.organizationId
                        ? row.organizationId.name_customer
                        : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={dataProductForProcess_.length}
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
      </Paper>
      <ProductTypeWithoutProcessForm
        open={modal}
        onClose={handleClickClose}
        getDataParent={getDataChild}
      />
    </div>
  );
};

export default ProductTypeForProcess;
