import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { IProductWithoutProcess } from "../../redux/actions/ProductTypeWithoutProcessActions";
import { addDataProductWithoutProcess } from "../../redux/actions/ProductTypeWithoutProcessActions";
import { IListProcessManage } from "Frontend/redux/actions/ProcessManageActions";
import { useStyles } from "./ProductTypeWithout.styles";

interface Props {
  open: boolean;
  onClose: () => void;
  getDataParent: (data: any) => void;
}
interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Mã sản phẩm",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Tên sản phẩm",
  },
  { id: "fat", numeric: true, disablePadding: false, label: "Loại sản phẩm" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Tên đối tác" },
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
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
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
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Sản phẩm
        </Typography>
      )}
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

export default function ProductTypeWithoutProcessForm(props: Props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checkBox, setCheckBox] = React.useState<string[] | string>("");

  const dispatch = useDispatch();

  // data product without process
  const dataProductWithout: IProductWithoutProcess[] = useSelector(
    (state: any) => state.ProductTypeWithoutProcess.dataProductWithoutProcess
  );

  //lay id quy trinh
  const detailprocessmanage: IListProcessManage = useSelector(
    (state: any) => state.ProcessManage.detailprocessmanage
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = dataProductWithout.map((n) => n.productId);
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
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, dataProductWithout.length - page * rowsPerPage);

  const onChangeCheckBox = (event: any) => {
    let result = "";
    let arrayresult: string[] = [];
    let ischecked = document.getElementsByName("checbox");
    for (var i = 0; i < ischecked.length; i++) {
      if (ischecked[i]["checked"] === true) {
        result = ischecked[i]["value"];
        arrayresult.push(result);
      }
    }
    setCheckBox(arrayresult);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(addDataProductWithoutProcess(detailprocessmanage._id, selected));
    let array: IProductWithoutProcess[] = [];
    for (let i = 0; i < dataProductWithout.length; i++) {
      for (let j = 0; j < checkBox.length; j++) {
        if (dataProductWithout[i].productId === checkBox[j]) {
          array.unshift(dataProductWithout[i]);
        }
      }
    }
    props.getDataParent(array);
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <form onSubmit={onSubmit}>
          <DialogTitle id="alert-dialog-title">
            Thêm sản phẩm vào quy trình
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className={classes.root}>
                <Paper className={classes.paper}>
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
                        rowCount={dataProductWithout.length}
                      />
                      <TableBody>
                        {dataProductWithout
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.productId);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                onClick={(event) =>
                                  handleClick(event, row.productId)
                                }
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.productId}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ "aria-labelledby": labelId }}
                                    name="checbox"
                                    value={row.productId}
                                    onChange={onChangeCheckBox}
                                  />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  {row.code}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">
                                  {row.productTypeId
                                    ? row.productTypeId.name
                                    : ""}
                                </TableCell>
                                <TableCell align="left">
                                  {row.organizationId
                                    ? row.organizationId.name_customer
                                    : ""}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 33 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    labelDisplayedRows={({ from, to, count }) =>
                      `Đang xem ${from} đến ${to} trong tổng số ${count} mục`
                    }
                    labelRowsPerPage={"Hàng mỗi trang"}
                    component="div"
                    count={dataProductWithout.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Hủy
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Thêm vào
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
