import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, GridList, GridListTile, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import NewsForm from "./NewsForm";

import {useStyles} from './New.style';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { openLightBox, setDataLightBox } from 'Frontend/redux/actions/LightBox';
import reactHtmlParser from 'react-html-parser';
import format from "date-fns/format";


export default function ListNews({state_new,fetchMoreData,checkDeleteNews,handleClickOpenDeleteDialog,checkUpdateNews}){
    const classes = useStyles();
    const dispatch = useDispatch();


    return(
      <>
        {/* <Paper className={classes.paper}> */}
        <InfiniteScroll
              dataLength={state_new.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<div style={{textAlign:'center'}}>
                <p>Loading</p>
                <h4><CircularProgress /> </h4>
              </div>}
            >
             {state_new !== null?state_new.map((data,index) =>{
                const createdDate = format(
                  new Date(data.createdAt),
                  "dd/MM/yyyy HH:mm:ss "
                );
                    return(
                
                       
                        <Card className={classes.root} key={index}>
                        <CardHeader
                            action={
                              <>
                               
                                 {checkDeleteNews?(
                                  <Tooltip title="Xóa" placement="top-start">
                                <IconButton
                                  className={classes.iconButton}
                                  aria-label="delete"
                                  size="small"
                                  color="secondary"
                                  onClick={() => {
                                    handleClickOpenDeleteDialog(data);
                                  }}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                               ):null}
                           
          
                              
                           
                              {checkUpdateNews?(
                                <NewsForm
                                checkEdit={true}
                                markdown={data}
                              />
                              ):null} 
                            
                              </>
                             
                            }
                            title={data.title}
                            subheader={`${data.createdBy.firstName?'Người thực hiện:' + ' ' + data.createdBy.firstName  +' ' + data.createdBy.lastName:''}`+'. Ngày tạo: '+ createdDate }
                        />
                         <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            {/* <Typography className={classes.heading}></Typography> */}
                            <div className={classes.column1}>
                              {/* <Typography className={classes.heading}>Location</Typography> */}
                              <img className={classes.smallImages} src={data.images[0].length!==0?data.images[0].url:""} />
                            </div>
                            <div className={classes.column2} style={{height:10}}>
                              <Typography className={classes.secondaryHeading}>nội dung của bài viết: {data.title} </Typography>
                            </div>
                      
                          </AccordionSummary>
                          <AccordionDetails>
                          <CardContent style={{width:"100%"}}>
                          
                            {/* <ReactMarkdown remarkPlugins={[gfm]} children={data.content}/> */}
                            <Grid>
                              {reactHtmlParser(data.content)}
                            </Grid>
                           
                            <div className={classes.roott}>
                              <GridList className={classes.gridListt} cols={3} onClick={()=>{dispatch(setDataLightBox(data.images)), dispatch(openLightBox())}}>
                                {data.images.map((tile,index) => (
                                  <GridListTile key={index}>
                                    <img src={tile.url}/>
                                    {/* <GridListTileBar
                                      title={tile.title}
                                      classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                      }}
                                      actionIcon={
                                        <IconButton aria-label={`star ${tile.title}`}>
                                          <StarBorderIcon className={classes.title} />
                                        </IconButton>
                                      }
                                    /> */}
                                  </GridListTile>
                                ))}
                              </GridList>
                            </div>
                            </CardContent>
                          </AccordionDetails>
                        </Accordion>
                        {/* <CardMedia
                          className={classes.media}
                          image={data.images[0]}
                          title={data.title_image}
                        /> */}
                       
                        {/* <CardActions disableSpacing>
                       
                                
                        </CardActions> */}
                        {/* <Collapse in={expanded} timeout="auto" unmountOnExit> */}
                       
                       
                        {/* </Collapse> */}
                        </Card>
                    )
                }): ""}
            </InfiniteScroll>
            
            {/* </Paper> */}
      </>
     
    )
}