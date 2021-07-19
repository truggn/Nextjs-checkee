import React from "react";
import { Grid, Paper, Typography, Card, CardContent } from "@material-ui/core";
import useStyles from "./InforRetrieveProduct.styles";

const ParticipantRetrieveProduct = ({ participant }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} style={{ minHeight: "100%" }}>
      <Paper className={classes.paper1} style={{ minHeight: "100%" }}>
        <Grid container spacing={2}>
          {participant.map((parti, index) => (
            <Grid key={index} item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <Grid container style={{ margin: 10, marginBottom: 0 }}>
                  <img
                    src={parti.participant.icon}
                    width={30}
                    height={30}
                    alt={parti.participant.name}
                  />
                  <Typography className={classes.titleName}>
                    {parti.participant.name}
                  </Typography>
                </Grid>
                <CardContent>
                  {parti.attributes.map((attr, index) => (
                    <Grid key={index} style={{ marginBottom: 15 }}>
                      <Grid item>
                        <Typography
                          style={{ fontWeight: "bold", color: "#424242" }}
                        >
                          {attr.name}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Paper className={classes.paper2}>
                          {" "}
                          <Typography style={{ color: "#455a64" }}>
                            {attr.value}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ParticipantRetrieveProduct;
