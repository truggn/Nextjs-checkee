import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({


     listimages : {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
     },
 

     swiper : {
       width: 1200,
       height: 350,
      },

      swiper2 : {
        width: 1200,
        height: 300,
      },

      swiperslide : {
          textAlign: 'center',
          fontSize: 18,
          height: 100,
      },


      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      
  
      listimages2 : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        },
  
      listtext : {
        marginBottom: theme.spacing(3),
      },
  
      paper : {
        padding: 30,
        marginTop: theme.spacing(3),
        color: "#3f51b5",
      },
     
     
  
   
}));