import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
const drawerWidth = 240;
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
            
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        scrollbarCustom: {
            '&::-webkit-scrollbar': {
                backgroundColor: "#fff",
                width: '0.8rem',
                height: '0.8rem'
            },
            '&::-webkit-scrollbar-track': {
                // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                backgroundColor: '#fff'
            },
            '&::-webkit-scrollbar-track:hover' : {
                // backgroundColor: '#f4f4f4'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor:'#babac0',
                borderRadius:'16px',
                border:'5px solid #fff'
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor:'#a0a0a5',
                // border:'4px solid #f4f4f4'
            },
            '&::-webkit-scrollbar-button': {
                display: 'none'
            },
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        formControl: {
            margin: theme.spacing(1),
            width: '300px',
            background: '#fff',
            [theme.breakpoints.down('xs')]:{
                width:150
            }
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          },
    }),
);