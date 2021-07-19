import React, { useEffect } from "react";

import { useStyles } from "./Customer_Form.styles";

import {
  Box,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

export default function UploadIcon(props) {
  const classes = useStyles();
  const [totalSize, setTotalSize] = React.useState(0);
  const { form, field, value } = props;
  const { viewOnly } = props;
  const [icon, setIcon] = React.useState("");
  const imageUploadEl: any = React.useRef(null);
  const currentError = !viewOnly && form.errors[field.name];
  const currentTouched = !viewOnly && form.touched[field.name];

  useEffect(() => {
    setIcon(value);
  }, []);
  useEffect(() => {
    form.setFieldValue("icon", icon);
  }, [icon]);
  const handleUploadCertificate = async (e) => {
    const { files } = e.target;
    let data;
    await Promise.all(
      Array.from(files).map(async (file) => {
        data = await readCertificateAsync(file);
      })
    );
    setIcon(data);
  };

  const readCertificateAsync = async (file) => {
    return new Promise((resolve, reject) => {
      let mimeType = file.name.split(".").reverse()[0];
      if (file) {
        const reader: any = new FileReader();
        reader.onload = (readerEvt) => {
          let binaryString = readerEvt.target.result as string;
          let base64 =
            "data:image/" + mimeType + ";base64," + btoa(binaryString);
          //base64
          resolve(base64);
        };
        reader.readAsBinaryString(file);
      }
    });
  };

  const handleRemoveImage = () => {
    setIcon("");
  };

  return (
    <React.Fragment>
      <Box
        boxShadow={1}
        borderRadius={5}
        margin={2}
        style={{ position: "relative" }}
      >
        <Grid
          container
          className={classes.paper}
          style={{ marginLeft: 12, boxSizing: "border-box" }}
        >
          <GridList className={classes.gridList} spacing={10} cellHeight={80}>
            {icon ? (
              <GridListTile className={classes.tile}>
                <img src={icon} />
                <GridListTileBar
                  title={""}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton
                      aria-label={"image delete"}
                      style={{ color: "white" }}
                      onClick={(e) => {
                        handleRemoveImage();
                      }}
                    >
                      <DeleteOutlineOutlinedIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ) : null}
            {icon ? null : (
              <GridListTile
                key={"delete"}
                className={`${classes.tile} ${classes.addTile}`}
                onClick={() => imageUploadEl.current.click()}
              >
                <IconButton aria-label={"image add"} disabled>
                  <AddCircleOutlineOutlinedIcon className={classes.title} />
                </IconButton>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={imageUploadEl}
                  // multiple
                  type="file"
                  onChange={(e) => {
                    handleUploadCertificate(e);
                  }}
                />
              </GridListTile>
            )}
          </GridList>
        </Grid>

        {currentError && currentTouched && (
          <Typography
            color={"error"}
            variant={"caption"}
            style={{ marginLeft: "20px" }}
          >
            {currentError}
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );
}
