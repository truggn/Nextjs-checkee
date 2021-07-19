import React from 'react';

import clsx from 'clsx';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <>
    <Card  
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            //src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            
          </Typography>
          <Typography
            
            color="textSecondary"
            variant="body1"
          >
            
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload Hình ảnh
        </Button>
      </CardActions>
    </Card>
    <Divider />
    {/* <ChangePass/> */}
    </>
  );
};


export default Profile;
