import { blue } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: " 100% ",
        marginTop: theme.spacing(4),
    
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: '100%',
        backgroundPosition: 'center',
      },

      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: blue[500],
      },
      
      headerTitle: {
        paddingTop: theme.spacing(2),
        color: "#3f51b5",
      },

      headerTitleDialog : {
        paddingTop: theme.spacing(2),
        color: "#3f51b5",
      },
      
      cardmedia : {
        display: "flex" ,
        alignItems : "center" ,
        justifyContent : "center" ,
        
      },

      content: {
        marginTop: theme.spacing(3),
      },
      
      cancel : {
        display : "flex",
        justifyContent : "flex-end" ,
      },
   
      root1: {
        marginTop: theme.spacing(2),
      },

    }));
