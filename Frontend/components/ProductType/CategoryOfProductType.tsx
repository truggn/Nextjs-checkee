import React, { useEffect, useState } from "react";
import { Grid, Button, Paper, Typography, styled } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCate } from "../../redux/actions/ProductTypeActions";
import { useStyles1 } from "./ProductTypeAdd.styles";

const MyButton = styled(Button)({
  background: "linear-gradient(to right, #a1c4fd ,#c2e9fb)",
});

const Category2 = ({ cate1, showCategory2, getId }) => {
  const classes = useStyles1();
  const [active, setActive] = useState("");
  const handleCate2 = (cate2) => {
    showCategory2(cate2);
    setActive(cate2._id);
  };

  return (
    <>
      {" "}
      {cate1 &&
        cate1.subcategoryId.map((item, index) => (
          <Grid
            container
            justify="space-between"
            className={classes.listItem}
            key={index}
            onClick={() => {
              handleCate2(item);
              getId(item);
            }}
          >
            <Grid item>
              <Typography
                style={
                  item._id === active ? { color: "red" } : { color: "#757575" }
                }
              >
                {item.name}
              </Typography>
            </Grid>
            <Grid
              item
              style={
                item._id === active ? { color: "red" } : { color: "#757575" }
              }
            >
              <ChevronRightIcon />
            </Grid>
          </Grid>
        ))}
    </>
  );
};
const Category3 = ({ cate2, getId, hide }) => {
  const classes = useStyles1();
  const [active, setActive] = useState("");
  return (
    <>
      {hide !== true &&
        cate2.subcategoryId &&
        cate2.subcategoryId.map((item, index) => (
          <Grid
            container
            justify="space-between"
            className={classes.listItem}
            key={index}
            onClick={() => {
              getId(item);
              setActive(item._id);
            }}
          >
            <Grid item>
              <Typography
                style={
                  item._id === active ? { color: "red" } : { color: "#757575" }
                }
              >
                {item.name}
              </Typography>
            </Grid>
            <Grid
              item
              style={
                item._id === active ? { color: "red" } : { color: "#757575" }
              }
            >
              <ChevronRightIcon />
            </Grid>
          </Grid>
        ))}
    </>
  );
};

interface IDataCategory {
  _id: string;
  code: string;
  level: number;
  subcategoryId?: string[];
}

const CategoryOfProductType = ({ onSetStep, dataCategory }) => {
  const classes = useStyles1();
  const dispatch = useDispatch();

  const [cate1, setCate1] = useState("");
  const [cate2, setCate2] = useState("");
  const [active, setActive] = useState("");
  const [dataCate, setDataCate] = useState<IDataCategory | null>(null);
  const [error, setError] = useState(false);
  const [hide, setHide] = useState(true);

  const dataAllCate = useSelector(
    (state: any) => state.ProductType.allCateData
  );

  const handleCate1 = (cate1) => {
    setCate1(cate1);
    setActive(cate1._id);
  };

  const showCategory2 = (data) => {
    setCate2(data);
    setHide(false);
  };

  useEffect(() => {
    dispatch(loadAllCate());
  }, []);

  const getId = (data) => {
    setDataCate(data);
  };
  const handleNext = () => {
    if (dataCate?.level === 3) {
      dataCategory(dataCate);
      onSetStep(2);
    } else {
      setError(true);
    }
  };

  const hideCate3 = () => {
    setHide(true);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid>
          <Typography style={{ fontWeight: "bold", marginBottom: 10 }}>
            Danh mục
          </Typography>
          {error && (
            <Typography
              style={{ fontWeight: "bold", color: "red", marginBottom: 10 }}
            >
              {" "}
              Vui lòng chọn danh mục cấp 3
            </Typography>
          )}
        </Grid>
        <Grid style={{ marginLeft: 10 }}>
          <Grid container>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper} elevation={1}>
                {dataAllCate &&
                  dataAllCate.map((item, index) => (
                    <Grid
                      container
                      justify="space-between"
                      className={classes.listItem}
                      key={index}
                      onClick={() => {
                        handleCate1(item);
                        getId(item);
                        hideCate3();
                      }}
                    >
                      <Grid item>
                        <Typography
                          style={
                            item._id === active
                              ? { color: "red" }
                              : { color: "#757575" }
                          }
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={
                          item._id === active
                            ? { color: "red" }
                            : { color: "#757575" }
                        }
                      >
                        <ChevronRightIcon />
                      </Grid>
                    </Grid>
                  ))}
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper} elevation={1}>
                <Category2
                  cate1={cate1}
                  showCategory2={showCategory2}
                  getId={getId}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Paper className={classes.paper} elevation={1}>
                <Category3 hide={hide} cate2={cate2} getId={getId} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ textAlign: "right", marginTop: 10, marginRight: 20 }}>
          <MyButton onClick={handleNext}>Tiếp theo</MyButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryOfProductType;
