import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme:Theme)=>({
    table: {
      minWidth:250,
    },
    grid:{
      marginTop:20,
    },
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    wrapLineChart:{
        // display:'flex',
        // flexDirection: 'row-reverse',
        // justifyContent: 'center',
        textAlign:'center',
        marginBlockEnd:theme.spacing(2),
    },
    titleChart:{
        fontFamily:'Roboto',
        color: 'rgb(34, 40, 216)',
    },LineChartStyle:{
        width:'100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'flex-start ',
        flexDirection:'column',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      rootCard: {
        minWidth: '120px',
      },
      bulletCard: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      titleCard: {
        fontSize: 14,
      },
      posCard: {
        marginBottom: 12,
      },
      rootLink:{
        color:'black',
        cursor:'pointer'
      }
  }));