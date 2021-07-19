import React, { useEffect, useState,PureComponent  } from "react";
import {useStyles} from './Dasboard.style';
import { useDispatch, useSelector } from "react-redux";
import {Sector,LineChart,XAxis,Tooltip,CartesianGrid,Line ,PieChart, Pie,ResponsiveContainer, Legend, Cell, BarChart, YAxis, Bar} from 'recharts';
import Copyright from '../Copyright/Copyright';
import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import {getDashBoardColumn,getDashBoardPie,getDashBoardMonth, getDashBoardDay, getDashBoard} from './../../redux/actions/DashBoardActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExportCSV from './ExportReactCSV';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import InputLabel from '@material-ui/core/InputLabel';

import { checkAccessRight, ISystemUserTypePageAccessRight } from "Frontend/redux/actions/SystemUserTypePageActions";
import NProgress from 'nprogress';
import Link from 'next/link'



import {
  loadProcessManage,
  getDetailProcessManage
} from "./../../redux/actions/ProcessManageActions";
import CustomName from "./CustomName";
import { getCustomerStart, ICustomer } from "Frontend/redux/actions/CustomerActions";
import { IUserProfile } from "Frontend/redux/actions/LoginActions";

export default function Demo(){
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const [accessRightData, setAccessRightData] = React.useState<any|null>([]);
  const [checkView, setCheckView] = React.useState(false);
  const dispatch = useDispatch();
  const [activeIndex,setActiveIndex] = useState(1);
  interface Iuser{
    _id:string
  }

  let locationUrl:any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }
  console.log(locationUrl)
let value = {
  userId: state_getuserlogindata["_id"],
  controllerName: locationUrl,
  actionName: ["viewDashBoard",],
};
const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
  (state: any) => state.SystemUserTypePage.accessRightData
);
useEffect(() => {
  dispatch(checkAccessRight(value));
}, [dispatch]);

useEffect(() => {
  setAccessRightData(state_accessRightData);
}, [state_accessRightData!]);

useEffect(() => {
  if (accessRightData) {
    for (let accessRight of accessRightData) {
      if (accessRight["controllerName"] === locationUrl) {
        if (accessRight["actionName"] === "viewDashBoard") {
          setCheckView(accessRight["checkAccessRight"]);
        }
      }
    }
  }
}, [accessRightData]);

  interface IListProcessManage {
    _id: string,
    code: string,
    name: string,
    organizationId: {
      name_customer: string,
      _id:string,

    },
    productTypeId: {
      _id: string;
      name: string
    },
    createdBy: string
}
  
  const customerData: ICustomer[] =
    useSelector((state: any) => state.Customer.customerData) || [];

  const state_static_datapie = useSelector(
    (state:any) => state.DashBoardReducers.datapie
  )
  const state_static_datacolumn = useSelector(
    (state:any) => state.DashBoardReducers.datacolumn
  )
  const state_static_datacomonth = useSelector(
    (state:any) => state.DashBoardReducers.datamonth
  )
  const state_static_dataday = useSelector(
    (state:any) => state.DashBoardReducers.dataday
  )
  const state_static_datastatic = useSelector(
    (state:any) => state.DashBoardReducers.datastatic
  )
  const [choseOrganizationId,setChoseOrganizationId] = React.useState(null);
  


  let process_manageList:any = [];

  if((state_getuserlogindata.userRole !== 'SuperAdmin' && state_getuserlogindata!==null)){
    if(state_getuserlogindata.memberOfOrganizations){
      for(let process of state_getuserlogindata.memberOfOrganizations){
        let data = {_id:process.organizationId,name_customer:process.organizationName}
        process_manageList.push(data)
      }
    }
  }else{
    if(customerData){
      for(let process of customerData){
        let data = {_id:process._id,name_customer:process.name_customer}
        process_manageList.push(data)
      }
    }
  }
 

  const classes = useStyles();
 
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear()
  var nowDay = `${year}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`;
 
  const[datePicker,setDatePicker] = useState({
    timeStart:nowDay,
    timeEnd:nowDay,
  });
  const handleChangeDatePicker = (e)=>{
    var target = e.target;
    var value = target.value;
    var name = target.name;
    if(name === "timeEnd" && value>nowDay){
      alert(`từ ${date} - ${month} - ${year} dữ liệu chưa được thống kê`);
    }else if(name === "timeStart" && value>nowDay){
      alert(`từ ${date} - ${month} - ${year} dữ liệu chưa được thống kê`);
    }else if(choseOrganizationId === null){
      alert("Đầu tiên hãy chọn công ty");
    }
    else{
      setDatePicker(
        {...datePicker,
          [name]:value,
        }
      )
    }
    
  }
  const handleChangeOrganizationId =(e)=>{
    const vls = e.target.value;
    setChoseOrganizationId(vls);
  }
  const searchStatic =(e)=>{
    e.preventDefault();
    const timeStart = new Date(datePicker.timeStart);
    const timeEnd = new Date(datePicker.timeEnd);
    const ddStart = timeStart.getDate();
    const mmStart = timeStart.getMonth()+1;
    const yyyyStart = timeStart.getFullYear();

    const ddEnd = timeEnd.getDate();
    const mmEnd = timeEnd.getMonth()+1;
    const yyyyEnd = timeEnd.getFullYear();

   
    const timeStartFomat = `${mmStart<10?'0'+mmStart:mmStart}-${ddStart<10?'0'+ddStart:ddStart}-${yyyyStart}`;
    const timeEndFomat = `${mmEnd<10?'0'+mmEnd:mmEnd}-${ddEnd<10?'0'+ddEnd:ddEnd}-${yyyyEnd}`;
    // const timeStartIsoString = timeStart.toISOString();
    // const timeEndIsoString = timeEnd.toISOString();
    const timePicker = {
      timeStart:timeStartFomat,
      timeEnd:timeEndFomat,
      organizationId:choseOrganizationId,
    }
     if(choseOrganizationId === null){
	      alert("Đầu tiên hãy chọn công ty");
     }else if(timeStart > timeEnd){
      alert("ngày kết thúc không được lớn hơn ngày bắt đầu");
     }else{
	      dispatch(getDashBoardPie(timePicker));
        dispatch(getDashBoardColumn(timePicker));
        dispatch(getDashBoardMonth(timePicker));
        dispatch(getDashBoardDay(timePicker));
        dispatch(getDashBoard(timePicker));
        NProgress.start();
     }
    
  }
  useEffect(() => {
    dispatch(getCustomerStart());
  }, [dispatch]);
  var dataPie = new Array;
  var dataColumn = new Array;
  var datamonth = new Array;
  var dataday = new Array;
  var dataStatic = new Array;
  // dataPie =[ {name:'1',DatVietSoftWare: 1,},{name:'lheuy1',valudsae:10},]
  // state_static?state_static.map((st)=>{
  //   if(st.productTypeName && st.productFlowId){
  //     if(st.productTypeName.name && st.productFlowId){
  //       const data = {name:`${st.productTypeName.name} - ${st.productFlowId.name}`,value:st.numberCreated,createNumBer:st.numberCreated};
  //       dataPie.push(data);
  //     }
  //   }
   
  //   // dataPie.concat(dataa)
   
  // }):null;
  if( state_static_datapie){
   for(let st of state_static_datapie){
      if(st.productTypeName){
            const data ={name:st.productTypeName.name,value:st.numberCreated,createNumBer:st.numberCreated}
            dataPie.push(data);
          }else if(!st.productTypeName && st.numberCreated === 0){
            const data ={name:`${st.organizationId.name_customer} không có sản phẩm`,value:st.numberCreated}
            dataPie.push(data);
          }
    }
  }
  console.log(dataPie)
  if( state_static_datacolumn){
    for(let st of state_static_datacolumn){
      console.log(st.numberCreated)
     if(st.productTypeName && st.productFlowId){
       if(st.productTypeName.name || st.productFlowId.name){
            const data ={name:`${st.productFlowId.name}-${st.productTypeName.name}`,createNumBer:st.numberCreated}
             dataColumn.push(data);
           }            
         }else if(st.productTypeName || st.productFlowId){
          if(st.productTypeName && !st.productFlowId){
            const data ={name:`${st.productTypeName.name}`,createNumBer:st.numberCreated}
            dataColumn.push(data);
          }
          if(!st.productTypeName && st.productFlowId){
            const data ={name:`${st.productFlowId.name}`,createNumBer:st.numberCreated}
            dataColumn.push(data);
          }
         }else if(!st.productTypeName && !st.productFlowId &&st.numberCreated === 0){
          const data ={name:`${st.organizationId.name_customer} không có sản phẩm`,createNumBer:st.numberCreated}
          dataColumn.push(data);
         }
   }
   
  }
  if(state_static_datacomonth){
    for(let st of state_static_datacomonth){
      if(st.organizationId && st.organizationId !== null){
        console.log(typeof st.organizationId.name_customer)
        if(st.organizationId.name_customer && typeof st.organizationId.name_customer !=='undefined' && st.numberCreated !== 0){
          const data = {name:`tháng: ${st.month}`,createNumBer:st.numberCreated}
          datamonth.push(data);
        }else if(typeof st.organizationId.name_customer !=='undefined'  && st.numberCreated === 0){
          const data = {name:`tháng: không có dữ liệu`,createNumBer:st.numberCreated}
          datamonth.push(data);
       }
      }
    }
  }
  console.log(datamonth)
  if(state_static_dataday){
    for(let st of state_static_dataday){
      if(st.organizationId && st.organizationId !== null){
        if(st.organizationId.name_customer && typeof st.organizationId.name_customer !=='undefined'){
          const data = {organization:st.organizationId.name_customer,time:`${st.day}-${st.month}-${st.year}`,number:st.numberCreated}
          dataday.push(data);
        }
      }
    }
  }
  if( state_static_datastatic){
    for(let st of state_static_datastatic){
     if(st.organizationId){
       
             const data ={name:st.organizationId.name_customer,createNumBer:st.numberCreated,createNumBerTotal:st.numberTotal}
             dataStatic.push(data);
           
         }else if(!st.organizationId && st.numberTotal === 0 && st.numberCreated === 0){
          const data ={createNumBer:st.numberCreated,createNumBerTotal:st.numberTotal }
          dataStatic.push(data);
         }
     }
   }
  console.log( dataStatic)
// else{
//   const data = {name:`${st.productTypeName.name} - ${st.productFlowId.name}`,value:st.numberCreated,createNumBer:st.numberCreated};
//   dataPie.push(data);
//   console.log(data);
// }

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`createNumber ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const onPieEnter = (_, index) => {
 setActiveIndex(index)
};
const [timkiem,setTimkiem] = useState(null);
const handleFilter = (e)=>{
  let nameTolowerCase = e.target.value;
  setTimkiem(nameTolowerCase.toLowerCase());
}
let dataSearch;
if(timkiem){
  dataSearch = state_static_datacolumn.filter((i)=>{
   
   return i.productFlowId.name.toLowerCase().indexOf(timkiem) !== -1 || i.productTypeName.name.toLowerCase().indexOf(timkiem) !== -1
 })
}
const chooseDay = () =>{
  setDatePicker({
    timeStart:nowDay,
    timeEnd:nowDay
  }
  )
}
const chooseWeek = () =>{
  // var curr = new Date; // get current date 
  // var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week 
  // var last = first + 6; // last day is the first day + 6 

  // var firstday = new Date(curr.setDate(first)); 
  // var lastday = new Date(curr.setDate(last));
  // console.log(firstday,last)
  var now = new Date;
  var startDay = 1; //0=sunday, 1=monday etc. 
  var d = now.getDay(); //get the current day 
  var firstday = new Date(now.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day 
  var lastday= new Date(firstday.valueOf() + 6*86400000); //add 6 days to get last day 

  var dateStart = firstday.getDate();
  var monthStart = firstday.getMonth() + 1;
  var yearStart = firstday.getFullYear()
  var dayStart = `${yearStart}-${monthStart<10?'0'+monthStart:monthStart}-${dateStart<10?'0'+dateStart:dateStart}`;

  var dateEnd = lastday.getDate();
  var monthEnd = lastday.getMonth() + 1;
  var yearEnd = lastday.getFullYear()
  var dayEnd = `${yearEnd}-${monthEnd<10?'0'+monthEnd:monthEnd}-${dateEnd<10?'0'+dateEnd:dateEnd}`;
  setDatePicker({
    timeStart:dayStart,
    timeEnd:dayEnd
  }
  )
}
const chooseMonth = () =>{
  var date = new Date();
  var firstday = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  var dateStart = firstday.getDate();
  var monthStart = firstday.getMonth() + 1;
  var yearStart = firstday.getFullYear()
  var dayStart = `${yearStart}-${monthStart<10?'0'+monthStart:monthStart}-${dateStart<10?'0'+dateStart:dateStart}`;

  var dateEnd = lastday.getDate();
  var monthEnd = lastday.getMonth() + 1;
  var yearEnd = lastday.getFullYear()
  var dayEnd = `${yearEnd}-${monthEnd<10?'0'+monthEnd:monthEnd}-${dateEnd<10?'0'+dateEnd:dateEnd}`;
  setDatePicker({
    timeStart:dayStart,
    timeEnd:dayEnd
  }
  )
}
 if(checkView){
    return (

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.wrapLineChart}>
       
        <form className={classes.container} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12} style={{marginBottom:20}} className={classes.container}>           
                  <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Chọn công ty</InputLabel>
                  <Select
                    native
                    value={choseOrganizationId}
                    onChange={handleChangeOrganizationId}
                    inputProps={{
                      name: 'choseOrganizationId',
                      id: 'age-native-simple',
                    }}
                    fullWidth={true}
                  >
                    <option aria-label="None" value="" />
                    {process_manageList?process_manageList.map((data,index)=>{
                      return(
                      <option key={index} value=  {data ? data._id : ""}>{data ? data.name_customer : ""}</option>
                    )}):null}
                    
                  </Select>
                </FormControl>
                
            </Grid>
            <Grid item xs={8} md={8} lg={6} xl={5} className={classes.container}>
           
            <TextField
              onChange={(e)=>handleChangeDatePicker(e)}
              name="timeStart"
              id="date"
              label="Ngày bắt đầu"
              type="date"
              // defaultValue={datePicker.timeStart}
              value={datePicker.timeStart}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
  
            />
            
            </Grid>
            <Grid item xs={8}  md={8} lg={6} xl={5} className={classes.container}>
           
            <TextField
              onChange={(e)=>handleChangeDatePicker(e)}
              name="timeEnd"
              id="date"
              label="Ngày kết thúc"
              type="date"
              // defaultValue={datePicker.timeEnd}
              value={datePicker.timeEnd}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}/>
            
            </Grid>
            <Grid item xs={8} md={8} lg={8} style={{margin:"10px 0px -20px 0px"}}  className={classes.container}>
              <Grid container spacing={3}>
                <Grid item xs ={4}>
                  <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      // style={{marginTop:-6, marginLeft:20,}}
                      onClick={chooseDay}
                  >
                        hôm nay
                  </Button>
                </Grid>
                <Grid item xs ={4}>
                  <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      // style={{marginTop:-6, marginLeft:20,}}
                      onClick={chooseWeek}
                  >
                        tuần này
                  </Button>
                </Grid>
                <Grid item xs ={4}>
                  <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      // style={{marginTop:-6, marginLeft:20,}}
                      onClick={chooseMonth}
                  >
                        tháng này
                  </Button>
                </Grid>
              </Grid>           
              
            </Grid>
            <Grid item xs={12} md={8}>
                <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      // style={{marginTop:-6, marginLeft:20,}}
                      onClick={(e)=>searchStatic(e)}
                  >
                    Tra cứu thống kê
                </Button>
                </Grid>
            
            </Grid>
          </Grid>
        </Grid>
        </form>
       
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={6}>
    <Typography variant="h5" style={{margin:"10px 10px"}}> Bảng thống kê chi tiết theo ngày </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell width={10} align="center">STT</TableCell>
            <TableCell width={100} align="center">Công ty</TableCell>
            <TableCell width={20} align="center">Ngày tạo</TableCell>
            <TableCell width={20} align="center">Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
              {dataday?dataday.map((row,index)=>{
                return(
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.organization}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                </TableRow>  
              )}):null}
          
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={6} >
       <div style={{display:'flex',justifyContent:'space-between'}}>
        <Typography variant="h5" style={{margin:"10px 10px",}}> Bảng thống kê Sản Phẩm</Typography>
         <Typography style={{margin:"10px 10px"}}>Xuất dữ liệu ra excel <ExportCSV csvData={dataColumn?dataColumn:null} fileName={dataColumn?`${choseOrganizationId}_${datePicker.timeStart}_${datePicker.timeEnd}`:null}/></Typography>
       </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={100}>Sản phẩm</TableCell>
            <TableCell width={20}>số lượng</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          
              {dataColumn?dataColumn.map((row,index)=>{
                return(
                  <TableRow>
                  <TableCell key={index}>{row.name}</TableCell>
                  <TableCell align="left">{row.createNumBer}</TableCell>
                </TableRow>  
              )}):null}
          
        </TableBody>
      </Table>
    </TableContainer>
    
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={12} >
    <Typography variant="h5" style={{margin:"10px 10px"}}> Bảng thống kê tổng quan của các công ty {dataStatic.length !== 0?(dataStatic[0].createNumBer === 0 && <span style={{color:'red',fontSize:15}}>(Không có thống kê)</span>):""}</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell  align="center"></TableCell>
            {dataStatic?dataStatic.map((r,i)=>{
              return(
                <TableCell align="center">{r.name}</TableCell>
              )
            }):null}
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
        {dataStatic !==null && (<TableCell align="left">Tổng theo ngày</TableCell>)}
            {dataStatic?dataStatic.map((r,i)=>{
              return(
                <TableCell align="center">{r.createNumBer}</TableCell>
              )
            }):null}
          </TableRow>
          <TableRow>
          {dataStatic &&( <TableCell align="left">Tổng thời điểm hiện tại</TableCell>)}
            {dataStatic?dataStatic.map((r,i)=>{
              return(
                <TableCell align="center">{r.createNumBerTotal}</TableCell>
              )
            }):null}
          </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>

    <Grid item xs={12} sm={12} md={12} lg={6} className={classes.wrapLineChart}>
    <div style={{textAlign:'center', width:520}}>
      <BarChart
          width={420}
          height={320}
          data={dataColumn}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={0}/>
          <YAxis />
          <Tooltip />
          <Legend />
           <Bar dataKey="createNumBer"  stackId="a" fill="#ff7300" />
         
      </BarChart>
        <h2 className={classes.titleChart}>Biểu đồ cột chi tiết {dataColumn.length!==0 ? (dataColumn[0].createNumBer === 0 && (<span style={{color:'red',fontSize:15}}>(Không có thống kê)</span>)):""}</h2>   
    </div>
     
   
    </Grid>
    
    <Grid item xs={12} sm={12} md={12} lg={6} className={classes.wrapLineChart}>
    <ResponsiveContainer width='100%' height={350}>
      <PieChart width={420} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={dataPie}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
       
    </ResponsiveContainer>
    <h2 className={classes.titleChart} style={{marginTop:"-25px"}}>Biểu đồ tròn tổng quan {dataPie.length !== 0? (dataPie[0].value === 0 && <span style={{color:'red',fontSize:15}}>(Không có thống kê)</span>):""}</h2> 
  </Grid>
  <Grid item xs={12} sm={12} md={12} lg={6} className={classes.wrapLineChart}>
  <div style={{textAlign:'center', width:420}}>
      <BarChart
          width={520}
          height={320}
          data={datamonth}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={20}/>
          <YAxis />
          <Tooltip />
          <Legend />
           <Bar dataKey="createNumBer"  stackId="a" fill="#ff7300" />
         
      </BarChart>
        <h2 className={classes.titleChart}>Biểu đồ cột tháng {datamonth.length !== 0 ?(datamonth[0].createNumBer === 0 && <span style={{color:'red',fontSize:15}}>(Không có thống kê)</span>):""}</h2>   
    </div> 
    </Grid>
    
    {/* <Grid item xs={12} sm={12} md={12} lg={6} className={classes.wrapLineChart}>
      <Grid container spacing={3}>
    <Grid item xs = {2}>
      <TextField id="standard-basic" label="tìm kiếm" name="timkiem" onChange={(e)=>handleFilter(e)}/>
    </Grid>
    <Grid item xs={10}>
    <Grid container spacing={3}>
    {dataSearch?dataSearch.map((row,index)=>{
                return(
                  <Grid item xs={4} key ={index}>
                    <Card className={classes.rootCard}>
                        <CardContent>
                          <Typography className={classes.titleCard} color="textSecondary" gutterBottom>
                            <CustomName nameCustom = {`${row.productFlowId.name} - ${row.productTypeName.name}`}/>
                          </Typography>
                          <Typography variant="body2" component="p">
                            {row.numberCreated}
                            <br />
                            {'đã tạo'}
                          </Typography>
                        </CardContent>
                      </Card>
                  </Grid>
              )}):null}
              </Grid>
    </Grid>
    </Grid>
   
  </Grid> */}
  
  <Grid item xs={12} style={{marginTop:'35px'}}> <Copyright/></Grid>
</Grid>
    );}else{return null}
}