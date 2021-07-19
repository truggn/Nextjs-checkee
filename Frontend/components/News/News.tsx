import React, { useEffect, useState,  } from "react";

import Grid from '@material-ui/core/Grid';

//import Main from "@/Main/Main2"
import {useStyles} from './New.style';

import { createNews, loadNews,  deleteNews, Iuser, IListNewss, resetDataNews } from "Frontend/redux/actions/NewsActions";
import { useDispatch, useSelector } from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@material-ui/core";

import ViewNewPost from "./ViewNewPost";
import AddNews from "./AddNew";
import { checkAccessRight, ISystemUserTypePageAccessRight } from "Frontend/redux/actions/SystemUserTypePageActions";
import ListNews from "./ListNews";
import { LightBox } from "../LightBox/LightBox";
import NProgress from 'nprogress';

export default function News(props){
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectingNews, setSelectingNews] = useState<any|null>(null);
  const [selectingNewss, setSelectingNewss] = useState<any|null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [accessRightData, setAccessRightData] = React.useState<any|null>([]);
  const [checkCreateNews, setCheckCreateNews] = React.useState(false);
  const [checkUpdateNews, setCheckUpdateNews] = React.useState(false);
  const [checkDeleteNews, setCheckDeleteNews] = React.useState(false);
  
  const state_new: IListNewss[] = useSelector(
    (state: any) => state. NewsReducers.newsData
  );
  const state_user: Iuser = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleClickOpenDeleteDialog = (row) => {
    const dataDelete = {
      row,
      deletedBy:state_user._id,
    }
    setOpenDeleteDialog(true);
    setSelectingNews(dataDelete);
  };

  const handleClickOpenViewDialog = (row) => {
    setOpenViewDialog(true);
    setSelectingNewss(row);
  };
  
  const handleDeleteRow = () => {
    if (selectingNews) {
      dispatch(deleteNews(selectingNews));
      setOpenDeleteDialog(false);
      NProgress.start();
    }
  };

  const handlecreateRow = () => {
    if (selectingNewss) {
      dispatch(createNews(selectingNewss));
      setOpenViewDialog(false);
      NProgress.start();
    }
  };
    
   
     const fetchMoreData = () => {
       let i;
        i = currentPage + 1;
        setCurrentPage(i);
        dispatch(loadNews(i));
    };

    useEffect(() => {
      dispatch(resetDataNews());
      dispatch(loadNews(1));
    }, [dispatch]);

    let locationUrl:any = null;
    if (typeof window !== "undefined") {
      locationUrl = window.location.pathname.replace("/", "");
    }
  let value = {
    userId: state_user["_id"],
    controllerName: locationUrl,
    actionName: ["createNews", "updateNews", "deleteNews"],
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
          if (accessRight["actionName"] === "createNews") {
            setCheckCreateNews(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "updateNews") {
            setCheckUpdateNews(accessRight["checkAccessRight"]);
          } else if (accessRight["actionName"] === "deleteNews") {
            setCheckDeleteNews(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  useEffect(() => {
    let scrollNew:any = document.getElementById("scrollNew");
    if (scrollNew !== null) {
      scrollNew.addEventListener(
        "pointerenter",
        function (e) {
          scrollNew.style.overflowY = "scroll";
          console.log("asd");
        },
        false
      );

      scrollNew.addEventListener(
        "mouseleave",
        function (e) {
          scrollNew.style.overflowY = "hidden";
        },
        false
      );
    }
  });
    return (	  
        <React.Fragment>
          <LightBox/>
            <Grid container spacing={3}  justify="center">
            {checkCreateNews?(
              <AddNews state_user={state_user} handleClickOpenViewDialog={handleClickOpenViewDialog}/>
            ):null}
          
            <Grid id="scrollNew" 
              item xs={checkCreateNews?12:12} 
              md={checkCreateNews?7:8} 
              lg={checkCreateNews?7:8} 
              style={{height:720}}  
              className={classes.scrollbarCustom}
            >
           <ListNews 
                state_new ={state_new}
                fetchMoreData = {fetchMoreData}
                checkDeleteNews={checkDeleteNews}
                handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}
                checkUpdateNews={checkUpdateNews}
            />
            </Grid>
            <Dialog
              open={openDeleteDialog}
              onClose={handleCloseDeleteDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <span>
                  Bạn có chắc chắn muốn xóa bài viết"
                  <b>{
                  selectingNews?selectingNews.row.title:null
                 
                  }"</b>?
                </span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="default">
                Thoát
              </Button>
              <Button onClick={handleDeleteRow} color="secondary" autoFocus>
                Xóa
              </Button>
            </DialogActions>
      </Dialog>
      <ViewNewPost openViewDialog={openViewDialog} selectingNewss={selectingNewss} handleCloseViewDialog={handleCloseViewDialog} handlecreateRow={handlecreateRow}/>
      </Grid>			
      </React.Fragment>
	);
}