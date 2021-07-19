import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CardMedia,  Tooltip,  Typography } from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { CategoryProductState, loadDataCategory,ListOfProductState,loadListOfProduct } from 'Frontend/redux/actions/CategoryProductActions';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { useStyles } from "./style";
// import Swiper core and required modules
import SwiperCore, {
  Pagination,Navigation
} from 'swiper/core';
// Import Swiper styles
import "swiper/components/navigation/navigation.min.css"
import Link from 'next/link';


// install Swiper modules
SwiperCore.use([Pagination,Navigation]);




export default function CategoryProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const state_new2: CategoryProductState[] = useSelector(
    (state: any) => state.CategoryProduct.categoryProductData
  );

useEffect(() => {
   dispatch(loadDataCategory()); 
},[]);


  return (
    <>
        <Paper 
         className={classes.paper}
         elevation={3}   
          >
          <Typography variant="h6" className={classes.listtext} >
            DANH MỤC
          </Typography>
          <div>
            <Swiper
              navigation={false}
              slidesPerView={8}
              slidesPerColumn={2}
              spaceBetween={60}
              pagination={{
                clickable: true
              }}
              className={classes.swiper}
            >
              {(state_new2 && state_new2.map((item) => (
                <SwiperSlide
               className={classes.swiperslide}>     
                  <Link href={`/listofproducts/${item._id}`}>
                  <Tooltip title="Bấm chọn" placement="right" arrow>
                  <Paper                
                  variant="outlined" 
                  style={{cursor:"pointer"}}
                  className={classes.listimages}
                  >
                      <Box className={classes.listimages2}>                 
                        <img width={100} height={100} src={item.icon} />                                
                      </Box> 
                  </Paper>
                  </Tooltip>
                  </Link>  
                  <Typography >
                    {item.name}
                  </Typography> 
                </SwiperSlide>
              )))}
            </Swiper>
          </div>        
        </Paper>
    </>
  );
}