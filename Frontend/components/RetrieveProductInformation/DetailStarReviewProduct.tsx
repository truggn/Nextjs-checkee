import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Divider } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import StarRounded from "@material-ui/icons/StarRounded";
import { useStyles } from "./style";

const DetailStarReviewProduct = (props) => {
  const classes = useStyles();
  const {
    quality,
    worththemoney,
    effectiveuse,
    reuse,
    sharefriend,
    star,
    userId,
  } = props.data;

  const arrayStar = [
    { name: "Chất lượng", star: quality },
    { name: "Đáng giá tiền", star: worththemoney },
    { name: "Hiệu quả sử dụng", star: effectiveuse },
    { name: "Sẽ sử dụng lại", star: reuse },
    { name: "Giới thiệu bạn bè", star: sharefriend },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Add color="primary" fontSize="small" onClick={handleClick} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className={classes.formDetail}>
          <Typography className={classes.titleDetail}>
            Đánh giá của {userId.firstName} {userId.lastName}
          </Typography>
          <div className={classes.mainStar}>
            <Typography className={classes.textMainStar}>
              {" "}
              Điểm đánh giá {star} sao
            </Typography>
            <Rating
              name="size-small"
              defaultValue={star}
              readOnly
              icon={<StarRounded fontSize="large" />}
              style={{ color: "#f50057" }}
            />
          </div>
          <Divider style={{ marginTop: 10 }} />
          <div>
            {arrayStar.map((data) => (
              <div className={classes.mainStar}>
                <Typography style={{ color: "#757575" }}>
                  {" "}
                  {data.name}
                </Typography>
                <Rating
                  name="size-small"
                  defaultValue={data.star}
                  readOnly
                  icon={<StarRounded fontSize="default" />}
                  style={{ color: "#f50057" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
};
export default DetailStarReviewProduct;
