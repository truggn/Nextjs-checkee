import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme ,useTheme} from '@material-ui/core/styles';
import {
Table,
TableBody,
TableHead,
TableFooter,
TableCell,
TablePagination,
TableRow, 
Toolbar,
Typography,
Dialog,
DialogContent,
DialogActions,
Checkbox,
IconButton,
Tooltip,
Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import {usetyles} from './ProductTypeForProcess.styles'
//
interface Props{
    open:boolean;
    onClose:() => void;
    // getDataParent:()=>void;
    getDataParent:(data:any)=>void;
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
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
  }
  
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
):Data {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('sdff', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
];
  
interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}
  
const headCells: HeadCell[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];
  
interface EnhancedTableProps {
    classes: ReturnType<typeof usetyles>;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}
  
function EnhancedTableHead(props: EnhancedTableProps) {
    const {  onSelectAllClick, numSelected, rowCount} = props;
    const classes = usetyles();
    return (
      <TableHead>
        <TableRow>
          <TableCell 
          padding="checkbox"
          className={classes.tableRightBorder}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              className={classes.tableRightBorder}
             
            >
                {headCell.label}
            
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}


interface DialogTitleProps{
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}
const DialogTitle = ((props: DialogTitleProps) => {
    const { children,  onClose, ...other } = props;
    const classes = usetyles();
    return (
      <MuiDialogTitle disableTypography  {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});
//
const ProductTypeForProcessForm = (props:Props) => {
    const classes = usetyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const {open,onClose} =props;
  
    const [checkBox,setCheckBox] = React.useState<string[] | string>('')
    const [dataParent,setDataParent] = React.useState([])

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
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
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const onChangeCheckBox =(event:any)=>{
      // console.log(event.target.checked);
      let result = '';
      let arrayresult:string[]=[];
      let ischecked=document.getElementsByName('checbox');
      for (var i = 0; i < ischecked.length; i++){
        if (ischecked[i]['checked']=== true){
            result =  ischecked[i]['value'] ;
            arrayresult.push(result)
        }
      }
     setCheckBox(arrayresult);
     
    }


    const onSubmit=(event:any)=>{
      event.preventDefault();
      let array:Data[]=[];
      for(let i =0; i < rows.length;i++){
        for(let j =0; j < checkBox.length; j++){
          if(rows[i].name === checkBox[j]){
            array.push(rows[i]);
            rows.splice(i,1);
          }
        }
      }
      props.getDataParent(array)

    }
    console.log(rows)
    return (
        <div className={classes.root}>
            <Dialog 
            onClose={onClose} 
            aria-labelledby="customized-dialog-title" 
            open={open}
            fullWidth
            maxWidth='lg'
            >
               <form onSubmit={onSubmit}>
                <DialogTitle 
                id="customized-dialog-title" 
                onClose={onClose}
                >
                    Modal title
                </DialogTitle>
               
                <DialogContent dividers>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={rows.length}
                        />
                        <TableBody>
                        {
                            (rowsPerPage > 0
                                ? rows.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : rows
                            )
                            .map((row, index) => {
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
                                <TableCell padding="checkbox" className={classes.tableRightBorder}>
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    name="checbox"
                                    value={row.name}
                                    onChange={onChangeCheckBox}
                                    />
                                </TableCell>
                                <TableCell 
                                component="th" 
                                id={labelId} 
                                scope="row" 
                                padding="none"
                                className={classes.tableRightBorder}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell 
                                align="right"
                                className={classes.tableRightBorder}
                                >
                                  {row.calories}
                                </TableCell>
                                <TableCell 
                                align="right"
                                className={classes.tableRightBorder}
                                >
                                  {row.fat}
                                </TableCell>
                                <TableCell 
                                align="right"
                                className={classes.tableRightBorder}
                                >
                                  {row.carbs}
                                </TableCell>
                                <TableCell 
                                align="right"
                                className={classes.tableRightBorder}
                                >
                                  {row.protein}
                                </TableCell>
                                </TableRow>
 
                            );
                            })}
                        </TableBody>
                        <TableFooter className={classes.tableFooter}>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                                colSpan={8}
                                count={
                                rows.length 
                                }
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
                   
                </DialogContent>
                
                <DialogActions>
                    <Button 
                    autoFocus 
                    onClick={onClose}
                     color="default"
                     >
                        Hủy
                    </Button>
                    <Button 
                    autoFocus 
                    // onClick={handleClose}
                     color="primary"
                     type="submit"
                     >
                       Lưu
                    </Button>
                </DialogActions>
                </form>
            </Dialog>            
        </div>
    );
}

export default ProductTypeForProcessForm;
