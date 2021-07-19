import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./style";
import { useSelector } from "react-redux";
import { IProduct } from "../../redux/actions/RetrieveProductInformationActions";

const ListProductInformation = () => {
  const classes = useStyles();
  const detailproduct: IProduct = useSelector(
    (state: any) => state.RetrieveProductInformation.productData
  );
  return (
    <Grid container spacing={2} justify="flex-start">
      {detailproduct.information.map((infor, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} style={{ marginTop: 30 }}>
          <div className={classes.inforTitle}>
            <img
              src={infor.participant.icon}
              style={{ width: 25, height: 25 }}
            />
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.titleName}
            >
              {infor.participant.name}
            </Typography>
          </div>
          <Card className={classes.cardInfor}>
            <CardContent className={classes.cardContent}>
              {infor.attributes.map((attri, index) => (
                <div key={attri.key} style={{ marginTop: 10 }}>
                  <Typography variant="subtitle1" className={classes.titleKey}>
                    {attri.name}:
                  </Typography>
                  <Grid item xs={12}>
                    <Paper className={classes.paperValue}>
                      <Typography
                        variant="subtitle1"
                        style={{ color: "#757575" }}
                      >
                        {attri.value}
                      </Typography>
                    </Paper>
                  </Grid>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default ListProductInformation;
