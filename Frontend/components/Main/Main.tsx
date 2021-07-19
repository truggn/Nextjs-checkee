import React, { Fragment, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PeopleIcon from '@material-ui/icons/People';
import FilterBAndWIcon from '@material-ui/icons/FilterBAndW';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import GamepadIcon from '@material-ui/icons/Gamepad';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import Link from 'next/link';
import Logout from '../Logout/Logout';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { IUserProfile } from '../../redux/actions/LoginActions';
import Router from 'next/router';
import { useStyles } from './style';
import MenuBookIcon from '@material-ui/icons/MenuBook';

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const state: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  useEffect(() => {
    if (Object.keys(state).length === 0) {
      //Router.push("/")
    }
  }, []);

  useEffect(() => {
    let scrollbarCustom:any = document.getElementById('scrollbarCustom');
    if (scrollbarCustom !== null) {
      scrollbarCustom.addEventListener(
        'pointerenter',
        function (e) {
          scrollbarCustom.style.overflow = 'auto';
        },
        false
      );

      scrollbarCustom.addEventListener(
        'mouseleave',
        function (e) {
          scrollbarCustom.style.overflow = 'hidden';
        },
        false
      );
    }
  });

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
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
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap>
                        Checkee
                    </Typography> */}
          </Grid>

          <Logout />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div
          id="scrollbarCustom"
          style={{ overflow: 'hidden' }}
          className={classes.scrollbarCustom}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link href="/retrieveproductinformation">
              <ListItem button>
                <ListItemIcon>{<FilterBAndWIcon />}</ListItemIcon>
                <ListItemText primary="Truy xuất sản phẩm" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link href="/homepage">
              <ListItem button>
                <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
                <ListItemText primary="Nhân viên" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link href="/customer">
              <ListItem button>
                <ListItemIcon>{<PeopleOutlineIcon />}</ListItemIcon>
                <ListItemText primary="Đối tác" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link href="/contract">
              <ListItem button>
                <ListItemIcon>{<AssignmentIcon />}</ListItemIcon>
                <ListItemText primary="Hợp đồng" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link href="/appendixcontract">
              <ListItem button>
                <ListItemIcon>{<NoteAddIcon />}</ListItemIcon>
                <ListItemText primary="Phụ lục hợp đồng" />
              </ListItem>
            </Link>
          </List>
          <List>
            <Link href="/participant">
              <ListItem button>
                <ListItemIcon>
                  {<SupervisedUserCircleOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary="Đối tượng tham gia" />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link href="/usertype">
              <ListItem button>
                <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                <ListItemText primary="Loại người dùng" />
              </ListItem>
            </Link>
          </List>
          {/* <Divider /> */}
          <List>
            <Link href="/listuser">
              <ListItem button>
                <ListItemIcon>{<PermIdentityIcon />}</ListItemIcon>
                <ListItemText primary="Danh sách người dùng" />
              </ListItem>
            </Link>
          </List>
          {/* <Divider /> */}
          <List>
            <Link href="/systempage">
              <ListItem button>
                <ListItemIcon>{<PageviewIcon />}</ListItemIcon>
                <ListItemText primary="Quản lý trang" />
              </ListItem>
            </Link>
          </List>
          {/* <Divider /> */}
          <List>
            <Link href="/controll">
              <ListItem button>
                <ListItemIcon>{<GamepadIcon />}</ListItemIcon>
                <ListItemText primary="Phân quyền" />
              </ListItem>
            </Link>
          </List>
          {/* <Divider /> */}
          <List>
            <Link href="/managementmenu">
              <ListItem button>
                <ListItemIcon>{<MenuBookIcon />}</ListItemIcon>
                <ListItemText primary="Quản lý Menu" />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </div>
      </Drawer>
    </Fragment>
  );
}
