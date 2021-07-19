import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useStyles } from "./style";
import StarRounded from "@material-ui/icons/StarRounded";
import CommentReviewProduct from "./CommentReviewProduct";
import LikeReviewProduct from "./LikeReviewProduct";
import CardMedia from "@material-ui/core/CardMedia";
import DetailStarReviewProduct from "./DetailStarReviewProduct";
import { IReviewProduct } from "../../redux/actions/RetrieveProductInformationActions";

const ListReviewProduct = () => {
  const classes = useStyles();
  const dataReviewProduct: IReviewProduct[] = useSelector(
    (state: any) => state.RetrieveProductInformation.reviewData
  );
  return (
    <div style={{ flexGrow: 1 }}>
      {dataReviewProduct && (
        <Typography variant="subtitle1" className={classes.titleReview}>
          Đánh giá sản phẩm ({dataReviewProduct.length})
        </Typography>
      )}
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paperValue}>
            {dataReviewProduct &&
              dataReviewProduct.map((data) => {
                const date = data.createdAt.slice(0, 10);
                // const starPrecision = data.star % Math.floor(data.star);
                // const starPrecision_ = Number(starPrecision.toFixed(1));
                return (
                  <>
                    <div className={classes.listReview}>
                      <div className={classes.listReview1}>
                        <div style={{ display: "flex" }}>
                          <Avatar></Avatar>
                          <div className={classes.mainUser}>
                            <Typography className={classes.fontName}>
                              {data.userId.firstName} {data.userId.lastName}
                            </Typography>
                            <Typography className={classes.fontDate}>
                              {date}
                            </Typography>
                          </div>
                        </div>
                        <div className={classes.detailReview}>
                          <Chip
                            label={`${data.star} Điểm đánh giá`}
                            clickable
                            color="primary"
                            variant="outlined"
                            size="small"
                            className={classes.chipReview}
                          />
                          <Rating
                            name="disabled"
                            value={data.star}
                            readOnly
                            icon={<StarRounded fontSize="small" />}
                            style={{ color: "#f50057" }}
                          />
                          <DetailStarReviewProduct data={data} />
                        </div>
                      </div>
                      <div>
                        <LikeReviewProduct />
                        {/* <CommentReviewProduct comment={data.comment} /> */}
                      </div>
                    </div>
                    <div className={classes.comment}>{data.comment}</div>
                    {data.image.length > 0 ? (
                      <Grid container>
                        {data.image.map((img) => {
                          return (
                            <Grid item style={{ marginRight: 5 }}>
                              <CardMedia
                                className={classes.hoverImage}
                                style={{
                                  height: 100,
                                  width: 150,
                                  borderRadius: 15,
                                }}
                                image={img}
                                title={img}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    ) : null}

                    <Divider className={classes.dividerList} />
                  </>
                );
              })}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListReviewProduct;
