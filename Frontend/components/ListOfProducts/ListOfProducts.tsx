import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from "./style";
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { ListOfProductState, loadListOfProduct } from 'Frontend/redux/actions/CategoryProductActions';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

function ListOfProducts({id}) {
    const classes = useStyles();
    const dispatch =useDispatch ();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
      setValue(newValue);
    };
  

    useEffect(() => {
        dispatch(loadListOfProduct(id))
    },[id]);

    const state_listOfProduct : ListOfProductState[] = useSelector (
        (state : any) => state.CategoryProduct.listOfProductData
      );
    

    return (
        <>
        <div>
                <Typography
                variant="h4"
                align="center"
                className={classes.headerTitle}
                >
                    DANH MỤC SẢN PHẨM      
                </Typography>
         </div>

        <Paper elevation={3} className={classes.root}>
        <TabContext value={value}>
        <AppBar position="static" className={classes.appbar} >
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="GỢI Ý HÔM NAY" value="1" />
            <Tab label="TOP SẢN PHẨM" value="2" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
        <Grid container spacing={3} className={classes.listimages}>
                
                { state_listOfProduct 
                && state_listOfProduct.map((item) => {
    
                    return (
                <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image= {item.categoryID.icon}
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                            {item.categoryID.name}
                    </div>
                        <div className={classes.title2} >          
                            100.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Tp Hồ Chí Minh
                    </div>
                    </Paper>      
                </Grid>
                    )
                })}
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://www.sapo.vn/blog/wp-content/uploads/2014/08/cach-chup-anh-san-pham.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                           Quần áo khách đặt livestream shoppe
                    </div>
                        <div className={classes.title2} >          
                            100.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Tp Hồ Chí Minh
                    </div>
                    </Paper>      
                    </Grid>
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-buon-3.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                          SỔ TAY LÒ XO nhiều hình ngộ nghĩ [ rẻ nhất ]
                    </div>
                        <div className={classes.title2} >          
                            200.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Tp Hồ Chí Minh
                    </div>
                    </Paper>      
                    </Grid>
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-buon-3.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                           Kính chống bụi đi đường - Kính bảo hộ chống 
                    </div>
                        <div className={classes.title2} >          
                            300.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Hà Nội
                    </div>
                    </Paper>      
                    </Grid>
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://cooftech.com/upload/blogs/images/Cooftech/kinh-nghiem-lam-app-web/chup-anh-san-pham/anh1-chup-anh.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                            Chuột không dây AA ANKER Alkaline (Bộ 2 Pin/4 Pin)
                    </div>
                        <div className={classes.title2} >          
                            250.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Hà Nội
                    </div>
                    </Paper>      
                    </Grid>
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-buon-3.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                            Bàn phím cơ AA ANKER Alkaline (Bộ 2 Pin/4 Pin)
                    </div>
                        <div className={classes.title2} >          
                            400.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Tp Hồ Chí Minh
                    </div>
                    </Paper>      
                    </Grid>
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://trongkiem.com.vn/uploads/news/2020_03/1_7.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                            Pin laze AA ANKER Alkaline (Bộ 2 Pin/4 Pin) - B1810
                    </div>
                        <div className={classes.title2} >          
                            350.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Hà Nội
                    </div>
                    </Paper>      
                    </Grid>
    
                    <Grid
                    item xs={12} sm={6} md={3} lg ={2}
                    >
                    <Paper
                    variant="outlined" square
                     className={classes.image}
                    >
                    <CardMedia
                        className={classes.media}
                        image="https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-buon-3.jpg"
                        title="Paella dish"
                    />
                    <div className={classes.title1}>
                            Pin Kiềm AA ANKER Alkaline (Bộ 2 Pin/4 Pin) - B1810
                    </div>
                        <div className={classes.title2} >          
                            100.000 $
                            <LocalOfferIcon fontSize="small"/>
                        </div>
                    <div className={classes.title3}>   
                            Tp Hồ Chí Minh
                    </div>
                    </Paper>      
                    </Grid>
    
                   
                </Grid>
        </TabPanel>

        <TabPanel value="2">
            <Grid container spacing={3} className={classes.listimages} >
                <Grid
                item xs={12} sm={6} md={3} lg ={2}
                >
                <Paper
                variant="outlined" square
                 className={classes.image}
                >
                <CardMedia
                    className={classes.media}
                    image="https://trongkiem.com.vn/uploads/news/2020_03/1_7.jpg"
                    title="Paella dish"
                />
                <div className={classes.title1}>
                        Pin Kiềm AA ANKER Alkaline (Bộ 2 Pin/4 Pin) - B1810
                </div>
                    <div className={classes.title2} >          
                        100.000 $
                        <LocalOfferIcon fontSize="small"/>
                    </div>
                <div className={classes.title3}>   
                        Tp Hồ Chí Minh
                </div>
                </Paper>      
                </Grid>

                <Grid
                item xs={12} sm={6} md={3} lg ={2}
                >
                <Paper
                variant="outlined" square
                 className={classes.image}
                >
                <CardMedia
                    className={classes.media}
                    image="https://www.sapo.vn/blog/wp-content/uploads/2014/08/cach-chup-anh-san-pham.jpg"
                    title="Paella dish"
                />
                <div className={classes.title1}>
                        Pin Kiềm AA ANKER Alkaline (Bộ 2 Pin/4 Pin) - B1810
                </div>
                    <div className={classes.title2} >          
                        100.000 $
                        <LocalOfferIcon fontSize="small"/>
                    </div>
                <div className={classes.title3}>   
                        Tp Hồ Chí Minh
                </div>
                </Paper>      
                </Grid>
            </Grid>
        </TabPanel>
        </TabContext>
        </Paper>
        </>
    );
}

export default ListOfProducts;