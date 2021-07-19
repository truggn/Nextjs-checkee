import {
    makeStyles,
    Theme,
    useTheme,
    createStyles,
  } from "@material-ui/core/styles";
  
  export const useStyles = makeStyles((theme: Theme) => ({
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      marginTop:10,
    },
    table: {
      minWidth: 750,
    },
    root: {
      minWidth: 275,
      marginTop:10,
    },
    button: {
      margin: theme.spacing(1),
      // fontSize: "small"
    },
    iconButton: {
      marginLeft: theme.spacing(1),
    },
    tableRightBorder: {
      border: "1px solid rgba(224, 224, 224, 1)",
    },
    div:{},
    avatar: {
      backgroundColor: "red",
    },
    textField: {
      height:720,
    },
    resize: {
      fontSize: 11,
      height:400,
    },
    media:{
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    heading:{
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    gridItem: {
      marginRight: 20,
      marginBottom: 20,
      paddingLeft:0,
    },
    gridList:{
      flexWrap: 'nowrap',
      height: 125,
      margin: '0!important',
      transform: 'translateX(-20px)',
      color: theme.palette.text.secondary,
      overflowY: 'auto'
    },
    tile:{
      padding: '0!important',
      minWidth: '125px',
      margin: theme.spacing(1),
      '& div': {
        borderRadius: '10px'
      },
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      borderRadius: '10px'
    },
    titleBar:{
      background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    title:{
      color: 'rbga(0,0,0,0.5)',
    },
    addTile:{
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
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      marginLeft:10,
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    roott: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridListt: {
      width: '100%',
      minHeight: 150,
      maxHeight:500,
    },
    titlee: {
      color: theme.palette.primary.light,
    },
    titleBarr: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    column1: {
      flexBasis: '20%',
    },
    column2: {
      flexBasis: '70%',
    },
    smallImages:{
      height:120,
      width:180,
    },
    scrollbarCustom: {
      '&::-webkit-scrollbar': {
          backgroundColor: "rbg(246,246,246)",
          width: '0.1rem',
          height: '0.1rem'
      },
      '&::-webkit-scrollbar-track': {
          // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          backgroundColor: 'rbg(246,246,246)'
      },
      '&::-webkit-scrollbar-track:hover' : {
          // backgroundColor: '#f4f4f4'
      },
      '&::-webkit-scrollbar-thumb': {
          backgroundColor:'rbg(246,246,246)',
          borderRadius:'16px',
          border:'5px solid #eee'
      },
      '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor:'#a0a0a5',
          // border:'4px solid #f4f4f4'
      },
      '&::-webkit-scrollbar-button': {
          display: 'none'
      },
  },
  }));