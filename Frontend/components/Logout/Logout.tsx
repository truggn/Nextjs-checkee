import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useStyles } from './style'
import { useSelector, useDispatch, } from "react-redux";
import { ILogout, logout, LogoutState } from '../../redux/actions/LogoutActions';
import { IUserProfile } from '../../redux/actions/LoginActions';
import Link from "next/link";
import Avatar from '@material-ui/core/Avatar';

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const state: IUserProfile = useSelector((state: any) => state.Login.getuserlogindata);
  const dispatch = useDispatch();
  console.log(state)

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = async (event) => {
    dispatch(logout())
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);


  return (
    <div className={classes.root}>
      <div>
        
        <Button
          className={classes.btn}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar style={{marginRight:3}}  alt="Remy Sharp" src={state.image_url}>{state.image_url ==="" && state.lastName.slice(0,1)}</Avatar>
          {state.lastName? state.lastName:""}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Link href="/userprofile">
                    <MenuItem >Cập nhật thông tin</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}