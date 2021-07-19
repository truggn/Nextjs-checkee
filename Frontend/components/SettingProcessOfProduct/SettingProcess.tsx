import React, { useState, useEffect } from "react";
import { useStyles } from "./SettingProcessParticipant/SettingProcessParticipant_Form.styles";
import {
  Button,
  Box,
  CardHeader,
  Grid,
  CardActions,
  Card
} from "@material-ui/core";
import SettingProcessParticipant_Form from "./SettingProcessParticipant/SettingProcessParticipant_Form";
import SettingProcessProps_Form from "./SettingProcessProps/SettingProcessProps_Form";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useSelector, useDispatch } from "react-redux";
import SettingProcessOfProductTab from "./SettingProcessTab";
import {
  IListParticipant,
  loadData,
} from "../../redux/actions/ParticipantActions";
import {
  getCustomerStart,
  ICustomer,
} from "../../redux/actions/CustomerActions";

import Link from 'next/link'
//
interface AddForm{
  id:string,
  "aria-controls":string,
}
//
export default function SettingProcess() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const participant_data: IListParticipant[] = useSelector(
    (state: any) => state.Participant.participantdata
  );
  const customerData: ICustomer[] = useSelector(
    (state: any) => state.Customer.customerData
  );
  useEffect(() => {
    //dispatch(loadData());
    dispatch(getCustomerStart());
  }, [dispatch]);
  //call add form
  const [addForm, setAddForm] = useState<AddForm | null>(null);
  const callbackAdd = (values: AddForm) => {
    setAddForm(values);
  };

  //---------------------------------------open form Add----------------------------------------//
  const [modal, setModal] = useState(false);

  const handleClickOpen = () => {
    setModal(!modal);
  };
  const hanldeClickClose = () => {
    setModal(false);
  };
  //---------------------------------------open form Add Card---------------------------------------//
  const [modalCard, setModalCard] = useState(false);

  const handleClickOpenFormCard = () => {
    setModalCard(!modalCard);
  };
  const hanldeClickCloseFormCard = () => {
    setModalCard(false);
  };
  return (
    <div className="main-content">
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Card className={classes.root_userType}>
            <div className="row">
              <Grid container>
                <Grid item md={12} xs={12} className={classes.grid}>
                  <Grid item xs={8} md={9}>
                    <CardHeader title="Thiết lập quy trình sản phẩm" />
                    <Box ml={2}>
                        {/* <span onClick={()=> Router.push("/processofproduct")} style={{cursor:'pointer'}}>Go back</span> */}
                        <Link href="/processofproduct">
                              Go back
                        </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <CardActions className={classes.cardAction}>
                      {addForm !== null ? (
                        addForm.id === "vertical-tab-0" ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={(e) => {
                              handleClickOpen();
                            }}
                          >
                            Thêm mới
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={(e) => {
                              handleClickOpenFormCard();
                            }}
                          >
                            Thêm mới
                          </Button>
                        )
                      ) : (
                        ""
                      )}
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
        <SettingProcessOfProductTab callback={callbackAdd} />
      </Grid>
      <SettingProcessParticipant_Form
        openModal={modal}
        closeModal={hanldeClickClose}
        dataParticipant={participant_data}
        customerData={customerData}
      />
      <SettingProcessProps_Form 
        openModal={modalCard}
        closeModal={hanldeClickCloseFormCard}
        dataParticipant={participant_data}
        customerData={customerData}
      />
      
      {/* <ProductTypeUpdate
        openModalUpdate={modalUpdate}
        closeModalUpdate={handleCloseUpdate}
        dataUpdate={dataToFromUpdate}
      /> */}
    </div>
  );
}
