import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({

    headerTitle: {
        paddingTop: theme.spacing(2),
        color: "#3f51b5",
        marginBottom: 30,
      },

      image : {
         height: 326,
         width : 191.5,
      },

      media: {
        height: 0,
        paddingTop: '100%', // 16:9
      },

      title1 : {
        fontSize : 13 ,
        fontStyle : "oblique ",
        marginTop: theme.spacing(2),
      },


      title2 : {
        display : "flex",
        justifyContent: "space-between",
        fontSize : 18 ,
        fontStyle : "helvetica neue ",
        textAlign: "center",
        marginTop: theme.spacing(2),
        color : "blue",
        
      },

      title3 : {
        display : "flex",
        justifyContent: "flex-end",
        fontSize : 12 ,
        marginTop: theme.spacing(2),
      },

      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },

      appbar : {
        backgroundColor : "null",
      },

      listimages : {
        paddingTop: theme.spacing(3),
      },
     
}));