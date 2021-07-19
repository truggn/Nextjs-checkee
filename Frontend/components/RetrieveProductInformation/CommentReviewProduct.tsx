import React from "react";
import { Typography, Button } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Popover from "@material-ui/core/Popover";
import { useStyles } from "./style";

const CommentReviewProduct = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={handleClick}
      >
        <ChatBubbleOutlineIcon fontSize="small" />
        <Typography className={classes.textButton}>1</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div style={{ padding: 10 }}>
          <Typography className="">{props.comment}</Typography>
        </div>
      </Popover>
    </>
  );
};

export default CommentReviewProduct;
