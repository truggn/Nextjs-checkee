import React, { useEffect } from "react";

import { useStyles } from "./ProductTypeAdd.styles";

import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

export function UploadAvatar(props) {
  const classes = useStyles();
  const [totalSize, setTotalSize] = React.useState(0);
  const { form, field, value } = props;
  const { viewOnly } = props;
  const [isAvatar, setAvatar] = React.useState("");
  const imageUploadEl: any = React.useRef(null);
  const currentError = !viewOnly && form.errors[field.name];
  const currentTouched = !viewOnly && form.touched[field.name];

  useEffect(() => {
    setAvatar(value);
  }, []);
  useEffect(() => {
    form.setFieldValue("productRepresentation", isAvatar);
  }, [isAvatar]);
  const handleUploadCertificate = async (e) => {
    const { files } = e.target;
    let data;
    await Promise.all(
      Array.from(files).map(async (file) => {
        data = await readCertificateAsync(file);
      })
    );
    setAvatar(data);
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
    setAvatar("");
  };

  return (
    <React.Fragment>
      <Grid
        container
        className={classes.paper}
        style={{ marginLeft: "20px", height: 90, boxSizing: "border-box" }}
      >
        <GridList
          className={classes.gridList}
          cols={4}
          spacing={10}
          cellHeight={80}
        >
          {isAvatar ? (
            <GridListTile className={classes.tile}>
              <img src={isAvatar} />
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
          {isAvatar ? null : (
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
    </React.Fragment>
  );
}
