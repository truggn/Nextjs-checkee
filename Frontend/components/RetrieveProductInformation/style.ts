import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  headerContent: {
    marginTop: theme.spacing(0),
  },
  headerTitle: {
    paddingTop: theme.spacing(2),
    color: "#3f51b5",
  },
  mainRetrieve: {
    marginTop: theme.spacing(2),
  },
  paperCode: {
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#3f51b5",
  },
  titleCode: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  mainInfor: {
    maxWidth: "fit-content",
    marginTop: theme.spacing(0),
    padding: theme.spacing(0),
  },
  inforTitle: {
    display: "flex",
  },
  titleName: {
    color: "#3f51b5",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inforAttri: {
    display: "flex",
  },
  cardInfor: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  titleKey: {
    fontWeight: "bold",
    color: "#212121",
  },
  paperValue: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  listReview: {
    display: "flex",
    justifyContent: "space-between",
  },
  listReview1: {
    display: "flex",
    flexDirection: "column",
  },
  titleReview: {
    margin: 10,
    marginLeft: 0,
    color: "#3f51b5",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mainUser: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  fontName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },
  fontDate: {
    color: "#757575",
    fontSize: 14,
    fontWeight: "bold",
  },
  detailReview: {
    display: "flex",
    padding: 5,
    paddingLeft: 0,
  },
  chipReview: {
    marginLeft: 4,
    marginRight: 4,
  },
  textButton: {
    marginLeft: 2,
  },
  dividerList: {
    marginTop: 10,
    marginBottom: 10,
  },
  formDetail: {
    width: 500,
    height: 300,
    padding: 15,
  },
  titleDetail: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#212121",
  },
  mainStar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textMainStar: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  formAdd: {
    marginTop: 50,
    flexGrow: 1,
  },
  titleFormAdd: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mainAddReview: {
    paddingTop: 5,
    paddingRight: 50,
  },
  starAdd: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textField: {
    marginTop: 10,
    marginRight: 30,
  },
  comment: {
    marginLeft: 5,
    marginBottom: 5,
  },
  hoverImage: {
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));
