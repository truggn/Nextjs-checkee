import React, { Fragment, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import Logout from "../Logout/Logout";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { IUserProfile } from "../../redux/actions/LoginActions";
import Router from "next/router";
import { useStyles } from "./style";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { IMenu, loadData } from "../../redux/actions/MangementMenuAction";
import { changeMenu,changeMenuChild ,changeMenuChildO} from "../../redux/actions/ChangeMenuActions";
import {
  loadSystemUserTypePage,
  ISystemUserTypePage,
} from "../../redux/actions/SystemUserTypePageActions";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";
import Tooltip from '@material-ui/core/Tooltip';
import { getCustomerStart, ICustomer } from "Frontend/redux/actions/CustomerActions";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { chooseOranization } from "Frontend/redux/actions/ChooseOranizationActions";

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [systemUserTypePageList, setSystemUserTypePageList] = React.useState<ISystemUserTypePage[]>([]);
  const [systemPageMenuList, setSystemPageMenuList] = React.useState<IMenu[]>([]);

  const state_listDataManagementMenu: IMenu[] = useSelector(
    (state: any) => state.ManagementMenu.listDataManagementMenu
  );
  
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_systemUserTypePageList: ISystemUserTypePage[] = useSelector(
    (state: any) => state.SystemUserTypePage.systemUserTypePageList
  );
  const state_changeMenu = useSelector(
    (state: any) => state.ChangeMenu.changemenudata
  );
  const listSystemUserTypePageByUserLogin:any = [];

  const handleClick = () => {
    setOpen(!open);
  };
  const state_selectOranization = useSelector(
    (state: any) => state.selectedOrganization.chooseoranization
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
    dispatch(loadSystemUserTypePage());
  }, [dispatch]);

  useEffect(() => {
    setSystemUserTypePageList(state_systemUserTypePageList);
  }, [state_systemUserTypePageList!]);

  useEffect(() => {
    setSystemPageMenuList(state_listDataManagementMenu);
  }, [state_listDataManagementMenu!]);

  const handleDrawerOpen = () => {
    dispatch(changeMenu(true))
    setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch(changeMenu(false))
    setOpen(false);
  };

  useEffect(() => {
    if (Object.keys(state_getuserlogindata).length === 0) {
    }
  }, []);

  useEffect(() => {
    let scrollbarCustom:any = document.getElementById("scrollbarCustom");
    if (scrollbarCustom !== null) {
      scrollbarCustom.addEventListener(
        "pointerenter",
        function (e) {
          scrollbarCustom.style.overflow = "auto";
        },
        false
      );

      scrollbarCustom.addEventListener(
        "mouseleave",
        function (e) {
          scrollbarCustom.style.overflow = "hidden";
        },
        false
      );
    }
  });

  if (state_systemUserTypePageList) {
    for (let element of state_systemUserTypePageList) {
      if (element.userTypeId === state_getuserlogindata["userTypeId"]) {
        listSystemUserTypePageByUserLogin.push(element);
      }
    }
  }
  const filterNameOranization = (id) =>{
    
    const dataMember = state_getuserlogindata.memberOfOrganizations.filter(member=>(member.organizationId === id))
    
    const result =  {
      organizationId:dataMember.length > 0 ?dataMember[0].organizationId:"",
      organizationName:dataMember.length > 0 ?dataMember[0].organizationName:"",
    }
    return result;
  }
 const handleChangeChooseOrganization = async(e) =>{
  var target = e.target;
  var value = target.value;
  setChooseOrganization(value)
   const nameOranization = await filterNameOranization(value)
  dispatch(chooseOranization(nameOranization))
 }
  function CollapseMenu(props) {
    // const {child_data} = props;
    const state_menuChild = useSelector(
      (state: any) => state.ChangeMenu.changemenuchild
    ); 
    const state_menuChild_O = useSelector(
      (state: any) => state.ChangeMenu.changemenuchildO
    );   
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
   
    const handleClick = (id) => {
      if(id==="6033121c2ffb3b2d34fc3e97"){
        dispatch(changeMenuChild(!state_menuChild))
      }else{
        dispatch(changeMenuChildO(!state_menuChild_O))
      }
      
      setOpen(!open)
    };
    console.log("open",open);
    let renderCollapse;
    let child_data = props.child_data;
    
    let menu = props.menu;
    console.log(menu);
    let key = props.keyItem
    const openChildMenu=(id)=>{
      if(id==="6033121c2ffb3b2d34fc3e97"){
        return state_menuChild;
      }else{
        return state_menuChild_O;
      }
    }
    // if (child_data) {
    //   child_data.map(function (childMenu, index) {
    //     if (childMenu["parentId"] === menu["_id"]) {
    //       renderCollapse = (
    //         <List component="div" disablePadding>
    //           <Link href={(childMenu.url).indexOf("/") ? childMenu.url : "/" + childMenu.url}>
    //             <ListItem button className={classes.nested}>
    //               <ListItemIcon>
    //                 <Icon className={childMenu["clas"]}></Icon>
    //                 {/* <BlockIcon></BlockIcon> */}
    //               </ListItemIcon>
    //               <ListItemText primary={childMenu.name} />
    //             </ListItem>
    //           </Link>
    //         </List>
    //       );
    //     }
    //   });
    // }
    return (
      <React.Fragment key={key}>
        <List component="nav" aria-labelledby="nested-list-subheader">
        <Tooltip title={!state_changeMenu?menu.name:""} placement="right-start">
          <ListItem button onClick={()=>handleClick(menu._id)}>
            <ListItemIcon>
              <Icon style={{fontSize: 18, overflow: "initial"}} className={menu["clas"]}></Icon>
              {/* <BlockIcon></BlockIcon> */}
            </ListItemIcon>
            <ListItemText primary={menu.name} />
            {openChildMenu(menu._id) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          </Tooltip>
          <Collapse in={openChildMenu(menu._id)} timeout="auto" unmountOnExit>
            {child_data.map((childMenu, index) => 
              childMenu["parentId"] === menu["_id"] ?
              (
                <List component="div" disablePadding key={index}>
                  <Link href={(childMenu.url).indexOf("/") ? childMenu.url : "/" + childMenu.url}>
                  <Tooltip title={!state_changeMenu?childMenu.name:""} placement="right-start">
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Icon style={{fontSize: 18, overflow: "initial"}} className={childMenu["clas"]}></Icon>
                      </ListItemIcon>
                      <ListItemText primary={childMenu.name} />
                    </ListItem>
                    </Tooltip>
                  </Link>
                </List>
              ) : null
            )}
          </Collapse>
        </List>
      </React.Fragment>)
  }

  // danh sách system page menu - quản lý menu
  const listSystemPageMenu = [
    {
      clas: "fa fa-suitcase",
      createdAt: 1603771222753,
      _id: "5f979b567dfa5c2b701987d9",
      isDashBoard: false,
      isDeleted: false,
      isVisible: true,
      name: "Quản Trị Dữ Liệu",
      orderNo: 1,
      pageId: "5f8e99d633fdc525f860e5ae",
      parentId: "0",
      updatedAt: 1611375185888,
      url: "/1",
    },
    {
      clas: "fa fa-diamond",
      createdAt: 1603771243419,
      _id: "5f979b6b7dfa5c2b701987da",
      isDashBoard: false,
      isDeleted: false,
      isVisible: true,
      name: "Thương Hiệu",
      orderNo: 1,
      pageId: "5f8e99d633fdc525f860e5ae",
      parentId: "5f979b567dfa5c2b701987d9",
      updatedAt: 1611818251331,
      url: "manufacturer",
    },
    {
      clas: "fa fa-phone",
      createdAt: 1605684272569,
      _id: "5fb4cc3016dce71e148b88d9",
      isDashBoard: false,
      isDeleted: false,
      isVisible: true,
      name: "Bản Đồ Phân Phối",
      orderNo: 6,
      pageId: "5fb5dae734e6e72124cd84f0",
      parentId: "",
      updatedAt: 1606810665171,
      url: "googlemap",
    },
  ];

  // danh sách phân quyền của user đăng nhập - phân quyền
  const listSystemUserTypePageByUserId = [
    {
      _id: "5ffd4ad97a23f23a003cfa55",
      pageId: "5fb786410e77f211f8075600",
      parentId: {
        actionName: "Bản Đồ Phân Phối (Function)",
        controllerName: "Bản Đồ Phân Phối (Function)",
        icon: "",
        _id: "5fb7861f0e77f211f80755ff",
        level: 1,
        name: "Bản Đồ Phân Phối (Function)",
        orderNo: 1,
        parentId: {
          actionName: "Bản Đồ Phân Phối",
          controllerName: "Bản Đồ Phân Phối",
          icon: "",
          _id: "5fb5dae734e6e72124cd84f0",
          level: 0,
          name: "Bản Đồ Phân Phối",
          orderNo: 5,
          parentId: null,
          status: 1,
          url: "/googlemap",
        },
        status: 1,
        url: "Bản Đồ Phân Phối (Function)",
      },
      userTypeId: "5f78800839aa7f3744021515",
    },
    {
      _id: "601264baafc6d404a0e52b69",
      isDeleted: false,
      pageId: "5f8e9b5533fdc525f860e5bb",
      parentId: {
        actionName: "Thương Hiệu (Function)",
        controllerName: "Thương Hiệu (Function)",
        icon: "",
        _id: "5f8e9a1633fdc525f860e5b3",
        isDeleted: false,
        level: 1,
        name: "Thương Hiệu (Function)",
        orderNo: 1,
        parentId: {
          actionName: "Quản Trị Dữ Liệu",
          controllerName: "Quản Trị Dữ Liệu",
          icon: "",
          _id: "5f8e99d633fdc525f860e5ae",
          isDeleted: false,
          level: 0,
          name: "Quản Trị Dữ Liệu",
          orderNo: 1,
          parentId: null,
          status: 1,
          url: "Quản Trị Dữ Liệu",
        },
        status: 1,
        url: "/manufacturer",
      },
      userTypeId: "5f78800839aa7f3744021515",
    },
  ];

  let child_data:any = [];
  let dsMenuSauKhiSoSanh: any = [];
  

  if(systemPageMenuList && listSystemUserTypePageByUserLogin){
  // if (listSystemPageMenu) {
    for(let menu of systemPageMenuList) {     
    // for (let menu of listSystemPageMenu) {
      for (let systempage of listSystemUserTypePageByUserLogin){   
      // for (let systempage of listSystemUserTypePageByUserId) { 
        if (menu.pageId === systempage.parentId?._id || menu.pageId === systempage.parentId?.parentId?.["_id"]) {
          let checkDuplicate = dsMenuSauKhiSoSanh.some(
            (item) => menu["_id"] === item["_id"]
          );
          if (!checkDuplicate) {
            dsMenuSauKhiSoSanh.push(menu);
            if (menu.parentId.length > 1) {
              child_data.push(menu);
            }
          }
          let parent_menu = listSystemPageMenu.filter(
            (_menu) => _menu["_id"] === menu.parentId
          );
          if (parent_menu.length > 0) {
            let checkDuplicate = dsMenuSauKhiSoSanh.some(
              (item) => parent_menu[0]["_id"] === item["_id"]
            );
            if (!checkDuplicate) {
              dsMenuSauKhiSoSanh.push(parent_menu[0]);
            }
          }
        }
      }
    }
  }
  dsMenuSauKhiSoSanh.sort((a,b)=> {return a.orderNo - b.orderNo});
   //------------------------------------------------LoadCSS-------------------------------------------
   React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);
  const [chooseOrganization, setChooseOrganization] = React.useState("");

  // console.log("child_data", child_data);
  // console.log("dsMenuSauKhiSoSanh", dsMenuSauKhiSoSanh);
  // console.log("state_listDataManagementMenu", state_listDataManagementMenu)
  // console.log("state_getuserlogindata", state_getuserlogindata)
  // console.log("listSystemUserTypePageByUserLogin", listSystemUserTypePageByUserLogin)
  // console.log(state_selectOranization.organizationId)
  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state_changeMenu !== null ? state_changeMenu: null,
        })}
      >
        <Toolbar>
          <Grid item xs={12} sm={12}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: state_changeMenu !== null ? state_changeMenu: null,
              })}
            >
              <MenuIcon />
            </IconButton>
           
            
            {(state_getuserlogindata.userRole !== 'SuperAdmin' && state_getuserlogindata!==null) && (
              <FormControl variant="filled" className={classes.formControl}>
                  <Select
    
                    value={state_selectOranization !==null?state_selectOranization.organizationId:" "}
                    onChange={handleChangeChooseOrganization}
                    fullWidth={true}
                    inputProps={{
                      name: 'organizationId',
                      id:"demo-simple-select-filled",
                      labelId:"demo-simple-select-filled-label"
                    }}
                    
                  > 
                      {state_getuserlogindata.memberOfOrganizations?state_getuserlogindata.memberOfOrganizations.map((row,i)=>(
                        <MenuItem key={i} value={row.organizationId}>{row.organizationName}</MenuItem>
                      )):null}
        
                  </Select>
            </FormControl>
            
            )}
          </Grid>
          
          <Logout />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: state_changeMenu,
          [classes.drawerClose]: !state_changeMenu,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: state_changeMenu,
            [classes.drawerClose]: !state_changeMenu,
          }),
        }}
      >
        <div
          id="scrollbarCustom"
          style={{ overflow: "hidden" }}
          className={classes.scrollbarCustom}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {dsMenuSauKhiSoSanh ? dsMenuSauKhiSoSanh.map((menu, index) => {
                if (menu["isVisible"]) {
                  if (menu["parentId"] === "0") {
                    return (
                      <div onClick={handleDrawerOpen} key={index}>
                        <CollapseMenu keyItem={"0" + index} menu={menu} child_data={child_data} />
                        <Divider />
                      </div>
                    );
                  } else if (menu["parentId"] === " ") {
                    return (
                      <React.Fragment key={index}>
                        <List>
                          <Link href={"/" + menu["url"]}>
                            <Tooltip title={!state_changeMenu?menu["name"]:""} placement="right-start">
                            <ListItem button>
                              <ListItemIcon>
                                <Icon style={{fontSize: 18, overflow: "initial"}} 
                                className={menu["clas"]} />
                                {/* <BlockIcon></BlockIcon> */}
                              </ListItemIcon>
                              <ListItemText primary={menu["name"]} />
                            </ListItem>
                            </Tooltip>
                          </Link>
                        </List>
                        <Divider />
                      </React.Fragment>
                    );
                  }
                }
              })
            : null}
        </div>
      </Drawer>
    </Fragment>
  );
}
