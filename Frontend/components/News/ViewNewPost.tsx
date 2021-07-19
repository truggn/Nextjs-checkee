import React, { useEffect, useState,  } from "react";


import {useStyles} from './New.style';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, GridList, GridListTile} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ReactMarkdown from "react-markdown";

import reactHtmlParser from 'react-html-parser';




const gfm = require('remark-gfm');

export default function ViewNewPost(props){
    const classes = useStyles();
    const {selectingNewss,handlecreateRow,openViewDialog,handleCloseViewDialog} = props;
    console.log(selectingNewss);


    return(
       <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        scroll="body"
        >
        <DialogTitle id="alert-dialog-title">{"xem thông tin trước khi đăng bài"}</DialogTitle>
        <DialogContent>
          
            <Card className={classes.root} >
           
                    <CardHeader
                        title={selectingNewss?.title} 
                    />
                  
                    <CardContent>
                    {/* <ReactMarkdown remarkPlugins={[gfm]} children={selectingNewss?.content}/>   */}
                  
                    {reactHtmlParser(selectingNewss?.content)}
       

                    <div className={classes.roott}>
                        <GridList cellHeight={160} className={classes.gridListt} cols={3}>
                          {selectingNewss?selectingNewss.images.map((tile,index) => (
                            <GridListTile key={index}>
                              <img src={tile}  />                         
                            </GridListTile>
                          )):null}
                        </GridList>
                      </div>       
                    
                    </CardContent>
                    </Card>
      
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>handleCloseViewDialog(false)} color="default">
            Thoát
            </Button>
            <Button onClick={()=>handlecreateRow(selectingNewss)} color="secondary" autoFocus>
            Lưu
            </Button>
        </DialogActions>
    </Dialog>
    )
}



                     


                      