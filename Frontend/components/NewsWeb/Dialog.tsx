import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { CardMedia } from '@material-ui/core';
import { useStyles } from "./style";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import reactHtmlParser from 'react-html-parser';



function DialogNews(props) {
  const classes = useStyles();
  const {handleClose,open,dataDialog} = props ;

   

    return (
      <>
      { dataDialog && (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        scroll="body"
      >
    <DialogContent>
    <Typography 
    variant="h3"
    align="center"
    className={classes.headerTitleDialog}
    >
     {dataDialog.title}
    </Typography>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={dataDialog.images[0].url}
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
     <Typography
     variant ="h5" 
     className={classes.content}
     >
     {reactHtmlParser(dataDialog.content)}
     </Typography>
      <div  className={classes.cancel} > 
        <Button variant="contained" color="primary" 
        onClick={handleClose}  
        >
          Thoát
        </Button> 
       </div> 
    </DialogContent>
      </Dialog>
      )}
      </>
    );
}

export default DialogNews;