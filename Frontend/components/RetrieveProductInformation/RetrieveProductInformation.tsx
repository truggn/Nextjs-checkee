import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  IProduct,
  loadDataProduct,
  loadReviewProduct,
} from "../../redux/actions/RetrieveProductInformationActions";
import ListProductInformation from "./ListProductInformation";
import CodeProductInformation from "./CodeProductInformation";
import { useStyles } from "./style";
import AddReviewProduct from "./AddReviewProduct";
import ListReviewProduct from "./ListReviewProduct";
import {
  checkAccessRight,
  ISystemUserTypePageAccessRight,
} from "../../redux/actions/SystemUserTypePageActions";
import { IUserProfile } from "../../redux/actions/LoginActions";
import { getCustomerStart } from "../../redux/actions/CustomerActions";
import { loadData } from "../../redux/actions/ListUserActions";

function RetrieveProductInformation() {
  const [isSearch, setSearch] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  /* ======================================== ACCESS_RIGHT ======================================== */
  const [accessRightData, setAccessRightData] = React.useState<
    ISystemUserTypePageAccessRight[]
  >([]);
  const [checkRetrieveProduct, setCheckRetrieveProduct] = React.useState(false);

  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const state_accessRightData: ISystemUserTypePageAccessRight[] = useSelector(
    (state: any) => state.SystemUserTypePage.accessRightData
  );
  let locationUrl: any = null;
  if (typeof window !== "undefined") {
    locationUrl = window.location.pathname.replace("/", "");
  }

  let value = {
    userId: state_getuserlogindata["_id"],
    controllerName: locationUrl,
    actionName: ["retrieveproduct"],
  };

  useEffect(() => {
    dispatch(checkAccessRight(value));
    dispatch(getCustomerStart());
    dispatch(loadData());
  }, [dispatch]);

  useEffect(() => {
    setAccessRightData(state_accessRightData);
  }, [state_accessRightData!]);

  useEffect(() => {
    if (accessRightData) {
      for (let accessRight of accessRightData) {
        if (accessRight["controllerName"] === locationUrl) {
          if (accessRight["actionName"] === "retrieveproduct") {
            setCheckRetrieveProduct(accessRight["checkAccessRight"]);
          }
        }
      }
    }
  }, [accessRightData]);

  /* ======================================== RETRIEVE ======================================== */
  const dataProduct: IProduct = useSelector(
    (state: any) => state.RetrieveProductInformation.productData
  );

  const error = useSelector(
    (state: any) => state.RetrieveProductInformation.errorProduct
  );

  const dataReviewProduct = useSelector(
    (state: any) => state.RetrieveProductInformation.reviewData
  );

  const loginCurrent = useSelector(
    (state: any) => state.Login.getuserlogindata
  );

  useEffect(() => {
    if (dataProduct) {
      dispatch(loadReviewProduct(dataProduct.id));
    }
  }, [dataProduct]);

  let isFlag;
  if (dataProduct && dataReviewProduct) {
    const productTypeCurrent = dataProduct.id;
    const length = dataReviewProduct.length;
    for (let i = 0; i < length; i++) {
      const element = dataReviewProduct[i];
      if (
        element.productTypeId === productTypeCurrent &&
        element.userId._id === loginCurrent._id
      ) {
        isFlag = true;
        break;
      } else {
        isFlag = false;
      }
    }
  }

  //input
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //submit
  const handleSubmit = () => {
    if (isSearch !== "") {
      dispatch(loadDataProduct(isSearch));
    } else {
      alert("Nhập từ khóa để tìm kiếm");
    }
  };

  //reset
  const handleReset = () => {
    setSearch("");
  };

  return (
    <>
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <TextField
            id="outlined-basic2"
            size="small"
            label="Truy xuất sản phẩm"
            variant="outlined"
            value={isSearch}
            onChange={(e) => handleChange(e)}
          />
          <Button
            color="primary"
            variant="contained"
            style={{
              padding: "8px 0",
              marginLeft: 3,
            }}
            onClick={handleSubmit}
            disabled={!checkRetrieveProduct}
          >
            <SearchIcon />
          </Button>
          <Button
            color="secondary"
            variant="contained"
            style={{
              padding: "8px 0",
              marginLeft: 3,
            }}
            onClick={handleReset}
          >
            <AutorenewIcon />
          </Button>
        </Grid>
        <div>
          {error === false && dataProduct && (
            <div className={classes.headerContent}>
              <div>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.headerTitle}
                >
                  KẾT QUẢ TRUY XUẤT
                </Typography>
                <div className={classes.mainRetrieve}>
                  <CodeProductInformation />
                </div>
                <ListProductInformation />
              </div>
            </div>
          )}
        </div>
      </div>
      {error === false && dataProduct && (
        <AddReviewProduct
          productType={dataProduct.id}
          disabled={isFlag}
        />
      )}
      {error === false && dataProduct && <ListReviewProduct />}
    </>
  );
}

export default RetrieveProductInformation;
