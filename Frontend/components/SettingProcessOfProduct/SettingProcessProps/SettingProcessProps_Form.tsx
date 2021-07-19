import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { useStyles } from "./SettingProcessProps_Form.styles";
import FormControl from "@material-ui/core/FormControl";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem'
import {
  createSettingProps
} from "../../../redux/actions/SettingProcessAction";
import { useSelector, useDispatch } from "react-redux";
import { IUserProfile } from "../../../redux/actions/LoginActions";
import { IListProcessManage, createProcessManage, } from "Frontend/redux/actions/ProcessManageActions";
import getAdditionalInformation from "../../../constant.config.api/api/getAdditionalInformation"
import toast from "@/ShowToast/ShowToast";

interface IListAddition{
  _id: string;
  key:string
}
export default function SettingProcessOfProductAdd(props) {
  const { openModal, closeModal, dataParticipant, customerData } = props;
  const [listAddition, setlistAddition] = useState<IListAddition[]>([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  // const getDataParticipantOfCustomer: ISetting[] = useSelector(
  //   (state: any) => state.SettingProcessOfProduct.SettingProcessOfProductData
  // );
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const detailprocessmanage: any = useSelector(
    (state: any) => state.ProcessManage.detailprocessmanage
  );
  const state_settingprocessparticipant: any = useSelector(
    (state: any) => state.SettingProcess.setting_participant_data ? state.SettingProcess.setting_participant_data : []
  )
  const flowId: string = useSelector(
    (state: any) => state.SettingProcess.id_props
  );
  console.log("kkk", state_settingprocessparticipant)
  // const state_createsetting: any = useSelector(
  //   (state: any) => state.SettingProcessOfProduct.DataCreate
  // );
  useEffect(() => {
    async function fetchData() {
      if (detailprocessmanage !== null) {
        let result:any = await getAdditionalInformation(detailprocessmanage.productTypeId._id)
        if (result.status === 200) {
          setlistAddition(result.data.data)
        }
        else {
          setlistAddition([])
        }
      }

    }
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <Formik
          initialValues={{
            flowId: "",
            productAttributeId: "",
          }}
          //   validationSchema={yup.object({
          //     code: yup.string().required("Vui lòng nhập code!"),
          //     name: yup.string().required("Vui lòng nhập loại người dùng!"),
          //     organizationId: yup
          //       .string()
          //       // .matches(/^-+$/, "Không được nhập số âm")
          //       .required("Vui lòng chọn tổ chức"),
          //   })}
          onSubmit={(values: any) => {
            if (flowId === null) {
              toast({ type: "error", message: "Vui lòng chọn đối tượng" });
            }
            else {
              let id = {
                "flowId": flowId
              }
              Object.assign(values, id)
              dispatch(createSettingProps(values));
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle
                id="form-dialog-title"
              //   className={classes.dialogTitle}
              >
                Thêm mới thuộc tính
              </DialogTitle>
              <DialogContent>
                <Grid
                  container
                  spacing={1}
                //    className={classes.grid}
                >
                  <Grid item md={6}>
                    <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Đối tượng
                    </InputLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={state_settingprocessparticipant.map((data) => {
                        if (data._id === flowId) {
                          return data.participantId.participantName
                        }
                      })}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Thông tin bổ sung
                    </InputLabel>
                    <FormControl
                      fullWidth={true}
                      size="small"
                      variant="outlined"
                    >
                      <Select
                        name="productAttributeId"
                        value={props.values.productAttributeId}
                        onChange={
                          props.handleChange
                        }
                      >
                        {listAddition.map((data, index) => (
                          <MenuItem key={index} value={data._id}>
                            {data.key}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={closeModal}
                  color="default"
                >
                  Đóng
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  type="submit"
                >
                  Lưu
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </React.Fragment>
  );
}
