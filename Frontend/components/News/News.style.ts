import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  
  resize: {
    fontSize: 11,
    height:400,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    background: "white",
    overflow: 'hidden',
    margin: 8,
  },
  root: {
    minWidth: 275,
  },
  button: {
    margin: theme.spacing(1),
    // fontSize: "small"
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  dialogTitle: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  gridColumn: {
    padding: theme.spacing(3)
  },
  gridItem: {
    marginRight: 20,
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    opacity: "1.2 !important",
    color: "#fff",
  },
}));

export const useRowStyles = makeStyles((theme) =>({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(1)
  },
  imagePaper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    height: 80,
    width: 100,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    position: 'relative',
    '&:hover': {
      '& div': {
          opacity: 1,
      }
    },
  },
  create: {
    opacity: 0.2
  },
  input: {
    display: 'none'
  },
  overlay: {
    transition: '.2s ease',
    opacity: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  gridList: {
    flexWrap: 'nowrap',
    height: 125,
    margin: '0!important',
    transform: 'translateX(-20px)',
    color: theme.palette.text.secondary,
    overflowY: 'auto'
  },
  helperTextLine: {
    position: 'absolute',
    bottom: -25,
    left: 10,
    '& div': {
          visibility: 'hidden'
    }
  },
  tile: {
    padding: '0!important',
    minWidth: '125px',
    margin: theme.spacing(1),
    '& div': {
      borderRadius: '10px'
    },
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    borderRadius: '10px'
  },
  title: {
    color: 'rbga(0,0,0,0.5)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  addTile: {
    borderRadius: '10px',
    background: 'rgba(0,0,0,0.05)',
    marginRight: '10px',
    '& div' : {
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center',
    },
    '&:hover': {
      cursor: 'pointer'
    }
  }, 
}));
