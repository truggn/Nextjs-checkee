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
import { useStyles } from "./SettingProcessParticipant_Form.styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem'
import {
  ISetting,
  createSettingParticipant,
  loadSettingParticipant,
} from "../../../redux/actions/SettingProcessAction";
import { useSelector, useDispatch } from "react-redux";
import { IUserProfile } from "../../../redux/actions/LoginActions";
import { IListProcessManage, createProcessManage, } from "Frontend/redux/actions/ProcessManageActions";
import getParticipantFromCustomer from "../../../constant.config.api/api/getSettingProcessOfProduct"

interface IListParticipant {
  _id: string;
  participantName: string

}

export default function SettingProcessOfProductAdd(props) {
  const { openModal, closeModal, dataParticipant, customerData } = props;
  const [listParticipant, setListParticipant] = React.useState<IListParticipant[]>([])
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const state_getuserlogindata: IUserProfile = useSelector(
    (state: any) => state.Login.getuserlogindata
  );
  const detailprocessmanage: IListProcessManage = useSelector(
    (state: any) => state.ProcessManage.detailprocessmanage
  );
  // const state_createsetting: any = useSelector(
  //   (state: any) => state.SettingProcessOfProduct.DataCreate
  // );
  
  const handleChangeCustomerName = async (id) => {
    let result = await getParticipantFromCustomer(id.props.value)
    if (result.status === 200) {
      setListParticipant(result.data.data)
    }
  }
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
            participantId: "",
            organizationId: "",
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
            let obj = {
              "createdBy": state_getuserlogindata._id,
              "productFlowId": detailprocessmanage._id
            }
            Object.assign(values, obj)
            dispatch(createSettingParticipant(values));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogTitle
                id="form-dialog-title"
              //   className={classes.dialogTitle}
              >
                Thêm mới đối tượng
              </DialogTitle>
              <DialogContent>
                <Grid
                  container
                  spacing={1}
                //    className={classes.grid}
                >
                  <Grid item md={6}>
                    <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Đối tác
                    </InputLabel>
                    <FormControl
                      fullWidth={true}
                      size="small"
                      variant="outlined"
                    >
                      <Select
                        name="organizationId"
                        value={props.values.organizationId}
                        onChange={
                          (event: any, newValues: string | null) => {
                            props.handleChange(event);
                            handleChangeCustomerName(newValues)
                          }
                        }
                      >
                        {customerData.map((data, index) => (
                          <MenuItem key={index} value={data._id}>
                            {data.name_customer}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6}>
                    <InputLabel id="" style={{ marginLeft: "10px" }}>
                      Đối tượng tham gia
                    </InputLabel>
                    <FormControl
                      fullWidth={true}
                      size="small"
                      variant="outlined"
                    >
                      <Select
                        name="participantId"
                        value={props.values.participantId}
                        onChange={props.handleChange}
                      >
                        {listParticipant.map((data, index) => (
                          <MenuItem key={index} value={data._id}>
                            {data.participantName}
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
