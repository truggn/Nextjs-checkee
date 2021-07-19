import React, { useEffect } from "react";

import { useStyles } from "./ProductTypeAdd.styles";

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

export function UploadImages(props) {
  const classes = useStyles();
  const [totalSize, setTotalSize] = React.useState(0);
  const LIMIT = 10000;
  const { form, field } = props;
  const { viewOnly } = props;
  const [certs, setCerts] = React.useState(props.value || []);
  const imageUploadEl: any = React.useRef(null);
  const currentError = !viewOnly && form.errors[field.name];
  const currentTouched = !viewOnly && form.touched[field.name];

  useEffect(() => {
    //Set size ban đầu cho list chứng chỉ
    calcTotalSize(certs);
  }, []);

  useEffect(() => {
    //Set size ban đầu cho list chứng chỉ
    if (!props.viewOnly) {
      if (totalSize > LIMIT) {
        form.setFieldError("sizeLimit", "Tổng kích thước vượt quá giới hạn");
      } else {
        form.setFieldError("sizeLimit", undefined);
      }
    }
  }, [totalSize]);

  useEffect(() => {
    if (!viewOnly) {
      form.setFieldValue("images", certs);
      form.setFieldTouched("images", true, false);
    }
  }, [certs]);

  const handleUploadCertificate = async (e) => {
    const { files } = e.target;
    let toAddArr: any = [];
    await Promise.all(
      Array.from(files).map(async (file) => {
        toAddArr.push(await readCertificateAsync(file));
      })
    );
    setCerts([...certs, ...toAddArr]);
    calcTotalSize([...certs, ...toAddArr]);
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

  const handleRemoveImage = (img) => {
    setCerts(certs.filter((item) => item !== img));
    setTotalSize(totalSize - calcFileSize(img));
  };

  const calcFileSize = (base64String) => {
    let stringLength = base64String.length - "data:image/png;base64,".length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    let sizeInKb = sizeInBytes / 1000;
    return sizeInKb;
  };

  const calcTotalSize = (arr) => {
    const initSize = arr.reduce((acc, i) => (acc += calcFileSize(i)), 0);
    setTotalSize(initSize);
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
          {certs.map((img, index) => (
            <GridListTile key={index} className={classes.tile}>
              <img src={img} />
              {!props.viewOnly && (
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
                        handleRemoveImage(img);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon className={classes.title} />
                    </IconButton>
                  }
                />
              )}
            </GridListTile>
          ))}
          {!props.viewOnly && (
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
      {/* <Typography
        color={totalSize > LIMIT ? "error" : "primary"}
        variant={"caption"}
        style={{ marginLeft: "10px" }}
      >
        Tổng kích thước: {Math.abs(totalSize / 1000).toFixed(2)} MB
      </Typography> */}
      {/* {currentError && currentTouched && (
        <Typography
          color={"error"}
          variant={"caption"}
          style={{ marginLeft: "20px" }}
        >
          {currentError}
        </Typography>
      )} */}
    </React.Fragment>
  );
}
