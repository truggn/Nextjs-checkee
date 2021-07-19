import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import StarRounded from "@material-ui/icons/StarRounded";
import { withStyles } from "@material-ui/core/styles";
import { useStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { addReviewProduct } from "../../redux/actions/RetrieveProductInformationActions";
import { IReviewProduct } from "../../redux/actions/RetrieveProductInformationActions";
import { UploadReviewProduct } from "./UploadReviewProduct";

const StyledRating = withStyles({
  iconHover: {
    color: "#f50057",
  },
})(Rating);

const AddReviewProduct = (props: any) => {
  const classes = useStyles();

  const [value, setValues] = useState({
    quality: 0,
    worththemoney: 0,
    effectiveuse: 0,
    reuse: 0,
    sharefriend: 0,
    comment: "",
    image: [],
  });
  const [isEnabel, setEnabel] = useState(false);
  const dispatch = useDispatch();
  const dataUser: IReviewProduct = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  const loadFile = (data) => {
    setValues({ ...value, image: data });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      ...value,
      userId: {
        _id: dataUser._id,
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
      },
      productTypeId: props.productType,
      createdAt: "",
      updatedAt: "",
    };
    if (
      value.effectiveuse === 0 ||
      value.reuse === 0 ||
      value.sharefriend === 0 ||
      value.worththemoney === 0 ||
      value.quality === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin đánh giá");
    } else {
      dispatch(addReviewProduct(reviewData));
      setValues({
        quality: 0,
        worththemoney: 0,
        effectiveuse: 0,
        reuse: 0,
        sharefriend: 0,
        comment: "",
        image: [],
      });
      setEnabel(true);
    }
  };

  return (
    <div className={classes.formAdd}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paperValue}>
            <Typography
              align="center"
              color="primary"
              className={classes.titleFormAdd}
            >
              Đánh giá của bạn sẽ giúp ích cho cộng đồng! Hãy đánh giá ngay nào
              ... Go Go
            </Typography>
            <Divider className={classes.dividerList} />
            <Grid container justify="space-between">
              <Grid item sm={6} className={classes.mainAddReview}>
                <div className={classes.starAdd}>
                  <Typography style={{ color: "#757575" }}>
                    Chất lượng
                  </Typography>
                  <StyledRating
                    name="quality"
                    value={value.quality}
                    onChange={(e, newValue: number) =>
                      setValues({ ...value, quality: newValue })
                    }
                    icon={<StarRounded fontSize="inherit" />}
                    style={{ color: "#f50057" }}
                  />
                </div>
                <div className={classes.mainStar}>
                  <Typography style={{ color: "#757575" }}>
                    {" "}
                    Đáng giá tiền
                  </Typography>
                  <StyledRating
                    name="worththemoney"
                    value={value.worththemoney}
                    onChange={(e, newValue: number) =>
                      setValues({ ...value, worththemoney: newValue })
                    }
                    icon={<StarRounded fontSize="inherit" />}
                    style={{ color: "#f50057" }}
                  />
                </div>
                <div className={classes.mainStar}>
                  <Typography style={{ color: "#757575" }}>
                    Hiệu quả sử dụng
                  </Typography>
                  <StyledRating
                    name="effectiveuse"
                    value={value.effectiveuse}
                    onChange={(e, newValue: number) =>
                      setValues({ ...value, effectiveuse: newValue })
                    }
                    icon={<StarRounded fontSize="inherit" />}
                    style={{ color: "#f50057" }}
                  />
                </div>
                <div className={classes.mainStar}>
                  <Typography style={{ color: "#757575" }}>
                    Sẽ sử dụng lại
                  </Typography>
                  <StyledRating
                    name="reuse"
                    value={value.reuse}
                    onChange={(e, newValue: number) =>
                      setValues({ ...value, reuse: newValue })
                    }
                    icon={<StarRounded fontSize="inherit" />}
                    style={{ color: "#f50057" }}
                  />
                </div>
                <div className={classes.mainStar}>
                  <Typography style={{ color: "#757575" }}>
                    Giới thiệu bạn bè
                  </Typography>
                  <StyledRating
                    name="sharefriend"
                    value={value.sharefriend}
                    onChange={(e, newValue: number) =>
                      setValues({ ...value, sharefriend: newValue })
                    }
                    icon={<StarRounded fontSize="inherit" />}
                    style={{ color: "#f50057" }}
                  />
                </div>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  className={classes.textField}
                  id="outlined-multiline-static"
                  label="Đánh giá thôi"
                  multiline
                  fullWidth
                  rows={5}
                  variant="outlined"
                  name="comment"
                  value={value.comment}
                  onChange={(e) =>
                    setValues({ ...value, comment: e.target.value })
                  }
                />
                <UploadReviewProduct loadFile={loadFile} />
              </Grid>

              <Button
                onClick={onSubmit}
                variant="outlined"
                color="secondary"
                className={classes.dividerList}
                disabled={props.disabled || isEnabel}
              >
                Đăng đánh giá
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddReviewProduct;
