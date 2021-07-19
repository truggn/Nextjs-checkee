import {
    makeStyles,
    Theme,
    useTheme,
    lighten,
    createStyles,
  } from "@material-ui/core/styles";

  export const usetyles = makeStyles((theme:Theme)=>({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    tableRightBorder:{
        border:"1px solid rgba(224, 224, 224, 1)"
    },
    tableFooter:{
        borderLeft:"1px solid rgba(224, 224, 224, 1)",
        borderRight:"1px solid rgba(224, 224, 224, 1)"
    },
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
    minWidth: 750,
    },
    visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
    },
    highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  rootsss: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  }));