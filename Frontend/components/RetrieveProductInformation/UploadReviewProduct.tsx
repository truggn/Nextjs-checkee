import React, { useEffect } from "react";
import { useStyles } from "./ImageReview.style";
import {
  Box,
  CardMedia,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { Button, TextField } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
export function UploadReviewProduct(props) {
  const classes = useStyles();
  const imageUploadEl: any = React.useRef(null);
  const [certs, setCerts] = React.useState<string[]>([]);

  const handleUploadCertificate = async (e) => {
    const { files } = e.target;
    let toAddArr: any = [];
    await Promise.all(
      Array.from(files).map(async (file) => {
        toAddArr.push(await readCertificateAsync(file));
      })
    );
    setCerts([...certs, ...toAddArr]);
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
  };

  useEffect(() => {
    props.loadFile(certs);
  }, [certs]);

  return (
    <>
      <Button
        style={{ padding: 0, margin: 10, marginLeft: 0 }}
        onClick={() => imageUploadEl.current.click()}
      >
        <WallpaperIcon />
        Thêm ảnh đánh giá
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
      </Button>
      {certs.length > 0 ? (
        <Box boxShadow={1} borderRadius={5} style={{ position: "relative" }}>
          <Grid
            container
            style={{ marginLeft: "20px", boxSizing: "border-box" }}
          >
            <GridList
              className={classes.gridList}
              cols={4}
              spacing={10}
              cellHeight={80}
            >
              {certs.map((img, index) => (
                <GridListTile
                  key={index}
                  style={{ padding: 0 }}
                  className={classes.tile}
                >
                  <img src={img} />
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
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Box>
      ) : null}
    </>
  );
}
