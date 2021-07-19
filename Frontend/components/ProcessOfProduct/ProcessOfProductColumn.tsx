import React, { useState } from "react";
import ProcessOfProductTask from "./ProcessOfProductTask";
import {
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { useStyles } from "./Process.styles";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import { useTheme } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import XLSX from "xlsx";
import TextField from "@material-ui/core/TextField";
import { updateProcessOfProduct } from '../../redux/actions/ProcessOfProductAction'
import { useDispatch } from "react-redux";
import { IProduct } from '../../redux/actions/ProcessOfProductAction'

//
interface EnhancedTableProps {
  numSelected: number;
  rowCount: number;
  data: object[];
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { numSelected, rowCount, data, onSelectAllClick } = props;

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
        {data.map((headCell: { label: string }, index: number) => (
          <TableCell
            key={index}
          // align={headCell.numeric ? 'right' : 'left'}
          // padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
//
interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: IProduct[];
  onDelete(props: any): JSX.Element | void;
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useStyles();
  const { numSelected, selected, onDelete } = props;
  const onDeleted = (select) => {
    onDelete(select);
  };
  return (
    <Toolbar
      className={clsx(classes.toolbarroot, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.toolbartitle}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => onDeleted(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};
// Pagantion
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
  const classes = useStyles();
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
    <div className={classes.tablepaginationroot}>
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
//
const getItemStyle = (isDragging: boolean, draggableStyle: any): {} => ({
  width: 250,
  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean): {} => ({
  background: isDraggingOver ? "lightblue" : "none",
});
//
export default function ProcessOfProductColumn(props: any) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };
  // const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   let { target } = event;
  //   let { name } = target;
  //   let { value } = target;
  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // };

  // Submit update bo sung thong tin san pham
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProcessOfProduct(selected))
    setOpen(false);
  };

  const [dataFile, setDataFile] = useState([]);
  const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm",
  ]
    .map(function (x) {
      return "." + x;
    })
    .join(",");
  //------
  //   const handleUpFile=(file:File):void=>{
  //     const reader = new FileReader();
  // 		const rABS = !!reader.readAsBinaryString;
  // 		reader.onload = (e:ProgressEvent<FileReader>):void => {
  // 			/* Parse data */
  // 			const bstr = e.target.result;
  // 			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
  // 			/* Get first worksheet */
  // 			const wsname = wb.SheetNames[0];
  // 			const ws = wb.Sheets[wsname];
  // 			/* Convert array of arrays */
  // 			const data = XLSX.utils.sheet_to_json(ws, {header:1});
  //       const cols = make_cols(ws['!ref']);
  // 			/* Update state */
  //       setDataFile(data);
  //       setcolFile(cols);
  // 			// this.setState({ data: data, cols: make_cols(ws['!ref']) });
  // 		};
  // 		if(rABS){
  //       reader.readAsBinaryString(file);
  //     }else {
  //       reader.readAsArrayBuffer(file);
  //     }
  //   }
  //Pagination
  const [selected, setSelected] = React.useState<IProduct[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState(false);
  const timerRef = React.useRef<number>();
  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = dataFile.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: IProduct) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: IProduct[] = [];

    // console.log('item_selected', selected)

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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: IProduct) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataFile.length - page * rowsPerPage);
  // read file Excel
  const handleUpFile = (file: File): void => {
    const promise = new Promise((resolve, reject) => {
      const reader:any = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      reader.onerror = (err) => {
        reject(err);
      };
    });

    promise.then((d: any) => {
      setDataFile(d);
    });

  };
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleUpFile(files[0]);
    }
    event.target.value = "";
  };
  // headercell
  const handleObject = () => {
    const arrayHeader = [
      { label: "Mã sản phẩm", key: "code" },
      { label: "Tên sản phẩm", key: "ten_sp" },
    ];
    const arrayobject = props.task.map((data) => ({
      label: data.key,
      key: data.code,
    }));
    const arrayNew = arrayHeader.concat(arrayobject);
    return arrayNew;
  };
  //handle Delete
  const onDelete = (select) => {
    setLoading(true);
    if (select) {
      let out = dataFile.filter((data: string[]) => {
        return select.every((filter) => {
          return data["code"].indexOf(filter) === -1;
        });
      });
      setDataFile(out);
      setSelected([]);
      setLoading(false);
      // clearTimeout(timerRef.current);
      // timerRef.current = window.setTimeout(() => {
      //   setLoading(false);
      //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb");
      // });
    }
  };

  return (
    <React.Fragment>
      <Draggable
        key={props.column._id}
        draggableId={props.column._id}
        index={props.index}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Grid
            container
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={classes.containerConlumn}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <Grid item sm={12} xs={12} className={classes.Column}>
              <Grid item className={classes.headColumn}>
                <Grid item sm={8}>
                  <h4 className={classes.headerColumn}>
                    Đối tượng: {props.column.participantId.participantName}
                  </h4>
                </Grid>
                <Grid item sm={2}>
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={handleClickOpen}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={2} {...provided.dragHandleProps}>
                  <DragIndicatorIcon
                    className={classes.iconColumn}
                  ></DragIndicatorIcon>
                </Grid>
              </Grid>
              <Grid item>
                <Droppable droppableId={props.column._id} type="task">
                  {(
                    provided: DroppableProvided,
                    snapshot: DroppableStateSnapshot
                  ) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={classes.taskListColumn}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {props.task.map((task, index) => (
                        <ProcessOfProductTask
                          key={task._id}
                          task={task}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Draggable>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bổ sung thông tin sản phẩm đối tượng:" +
            props.column.participantId.participantName}
          <input
            className={classes.input}
            id="contained-button-file"
            // multiple
            accept={SheetJSFT}
            type="file"
            onChange={onChangeFile}
          />
          <label htmlFor="contained-button-file">
            <Button
              color="primary"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Upload File
            </Button>
          </label>
        </DialogTitle>
        <DialogContent>
          <Paper>
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selected}
              onDelete={onDelete}
            />
            <TableContainer>
              <form>
                <Table aria-label="simple pagination table">
                  <EnhancedTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    data={handleObject()}
                    rowCount={dataFile.length}
                  />
                  <TableBody>
                    {loading === false ? (
                      dataFile.length !== 0 ? (
                        (rowsPerPage > 0
                          ? dataFile.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          : dataFile
                        ).map((data, index) => {
                          const isItemSelected = isSelected(data);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              key={index}
                              onClick={(event) =>
                                handleClick(event, data)
                              }
                              aria-checked={isItemSelected}
                              selected={isItemSelected}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </TableCell>
                              {handleObject().map((object, indexs) => {
                                return (
                                  <TableCell key={indexs}>
                                    {/* <TextField
                                      name={object.key}
                                      onChange={onChangeInput}
                                    /> */}

                                    {data[object.key]}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                      ) : (
                        emptyRows > 0 && (
                          <TableRow
                            style={{ height: (dense ? 15 : 20) * emptyRows }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell>
                          <Fade
                            in={loading}
                            style={{
                              transitionDelay: loading ? "800ms" : "0ms",
                            }}
                            unmountOnExit
                          >
                            <CircularProgress />
                          </Fade>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={12}
                        count={dataFile ? dataFile.length : 0}
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
              </form>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={onSubmit}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
