import { Button, Grid } from '@material-ui/core';
import { IListNewss, loadNews, resetDataNews } from "Frontend/redux/actions/NewsActions";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStyles } from "./style";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import DialogNews from './Dialog';
 



function NewsWeb(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [dataDialog,setDataDialog] = React.useState(null);
    
   
    const handleClickOpen = (data) => {
      setOpen(true);
      setDataDialog(data);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

     
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const state_new: IListNewss[] = useSelector(
        (state: any) => state.NewsReducers.newsData
      );
  
      console.log('test',state_new);

    useEffect(() => {
      dispatch(resetDataNews());
      dispatch(loadNews(1));
    }, [dispatch]);
  
  
    return (
       <> 
       <div>
            <Typography
                    variant="h4"
                    align="center"
                    className={classes.headerTitle}
                    >
                        TIN TỨC
             </Typography>
       </div>
      <Grid container spacing={3}>
          {state_new.map((data,index) => {
             const dateTime = new Date(data.createdAt);
             let weekday=new Array(7);
             weekday[0]="chủ nhật";
             weekday[1]="thứ hai";
             weekday[2]="thứ ba";
             weekday[3]="thứ tư";
             weekday[4]="thứ năm";
             weekday[5]="thứ sáu";
             weekday[6]="thứ bảy";
             let day = weekday[dateTime.getDay()];
             let dd = dateTime.getDate();
             let mm = dateTime.getMonth()+1; //January is 0!
             let yyyy = dateTime.getFullYear();

             let h=dateTime.getHours();
             let m=dateTime.getMinutes();
             let s=dateTime.getSeconds();
        return (
               <Grid 
               key={index} 
               item xs={12} sm={6} md={4}
               spacing={3}
               style={{cursor:"pointer"}}
               onClick={() => {
                handleClickOpen(data);
              }}
               >  
               <Card className={classes.root1}>
               <CardHeader
               avatar={
                   <Avatar aria-label="recipe" className={classes.avatar}>
                   News
                   </Avatar>
               }   
               title={data.title}
               
               subheader={`${data.createdBy.firstName?'Người thực hiện:' + ' ' + data.createdBy.firstName  +' ' + data.createdBy.lastName:''}`}
               
               />
               <CardMedia
               className={classes.media}
               title="Xem chi tiết"
               image={data.images[0].url}
               />
               <CardContent>
               <Typography variant="body2" color="textSecondary" component="p">
                    
               </Typography>
               </CardContent>
               <CardHeader
               subheader={' Ngày tạo: ' + dd + '/'+mm+'/'+yyyy+' '+'vào lúc: '+h+':'+m }
               />
                              
           </Card>
           </Grid> 
          )})}
            <DialogNews handleClose={handleClose} open={open} dataDialog={dataDialog}/>
      </Grid>
      </>
    );
}

export default NewsWeb;