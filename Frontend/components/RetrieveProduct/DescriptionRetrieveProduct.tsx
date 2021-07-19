import React from "react";
import { Grid, Paper, Typography, Card, CardContent } from "@material-ui/core";
import useStyles from "./InforRetrieveProduct.styles";
import ReactHtmlParser from "react-html-parser";

const DescriptionRetrieveProduct = ({ description }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <Grid container style={{ margin: 10, marginBottom: 0 }}>
                <img
                  src="https://image.flaticon.com/icons/png/512/4403/4403289.png"
                  alt="Thông tin sản phẩm"
                  width={30}
                  height={30}
                />
                <Typography className={classes.titleName}>
                  Thông tin sản phẩm
                </Typography>
              </Grid>
              <CardContent style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Grid item>
                  <Typography className={classes.desTitle}>
                    {ReactHtmlParser(description)}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default DescriptionRetrieveProduct;
