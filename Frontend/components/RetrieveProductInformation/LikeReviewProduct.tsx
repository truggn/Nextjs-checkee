import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useStyles } from "./style";

const LikeReviewProduct = () => {
  const classes = useStyles();
  const [isLike, setLike] = useState(0);
  const [isColor, setColor] = useState("blue");

  const handleLike = () => {
    setLike(isLike + 1);
    setColor("red");
  };
  return (
    <>
      <Button
        size="small"
        variant="outlined"
        style={{ marginRight: 10, borderColor: isColor, color: isColor }}
        onClick={handleLike}
      >
        <FavoriteBorderIcon fontSize="small" />
        <Typography className={classes.textButton}>{isLike}</Typography>
      </Button>
    </>
  );
};

export default LikeReviewProduct;
