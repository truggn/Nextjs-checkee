//import Customer from "@/Customer/Customer"
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

//import Main from "@/Main/Main2"
import dynamic from 'next/dynamic'
const Main = dynamic(() => import('@/Main/Main2'))
const News = dynamic(
  () => import("@/News/News")
);
// let marked = require("marked");
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    display: 'flex',
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}),
);
const news = () => {
	const classes = useStyles();
	return (	  
		<div className={classes.root}>
			<Main/>
			<main className={classes.content}>
        <div className={classes.toolbar} />
        <News/>
      </main>
		</div>				
	);
}

export default news;