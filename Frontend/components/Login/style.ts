import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import {dataImage} from "../../../files/images/dataImages";
export const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: `url(${dataImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: '50%',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));