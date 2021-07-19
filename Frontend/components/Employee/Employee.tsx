
import { useSelector, useDispatch, } from "react-redux";
import { loadData, IEmployee } from '../../redux/actions/EmployeeActions';
import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Employee() {
  const classes = useStyles();

  const state: IEmployee[] = useSelector((state:any) => state.Employee.employeedata);
  const dispatch = useDispatch();

  useEffect(() => {
	  dispatch(loadData());
  }, [dispatch]);
 
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Số điện thoại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state !== null ?state.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.address}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.phone}
              </TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}