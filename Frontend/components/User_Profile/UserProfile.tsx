import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';

import ProfileDetails from './ProfileDetails';
import ChangePass from "./ChangePass"


const Account = () => {
  
  return (
    
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ChangePass/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    
  );
};

export default Account;
