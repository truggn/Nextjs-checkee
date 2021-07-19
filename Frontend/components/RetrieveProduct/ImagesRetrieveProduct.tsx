import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

// import "./styles.css";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./InforRetrieveProduct.styles";
// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination]);

const ImagesRetrieveProduct = ({ images }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            className={classes.swiper}
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={img.url} alt="hinh anh" className={classes.images} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ImagesRetrieveProduct;
