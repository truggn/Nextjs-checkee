import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CategoryOfProductType from "./CategoryOfProductType";
import InforProducttypeUpdate from "./InforProducttypeUpdate";
export default function ProductTypeUpdate({
  openModalUpdate,
  closeModalUpdate,
  dataUpdate,
}) {
  const [step, setStep] = useState(2);
  const [category, setDataCategory] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    setData(dataUpdate);
  }, [dataUpdate]);

  const dataCategory = (data) => {
    setDataCategory(data);
  };
  return (
    <div>
      <Dialog
        scroll="paper"
        fullWidth
        maxWidth="lg"
        open={openModalUpdate}
        onClose={() => {
          closeModalUpdate();
          setStep(2);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cập nhật loại sản phẩm
        </DialogTitle>
        <DialogContent>
          {step === 1 && (
            <CategoryOfProductType
              onSetStep={setStep}
              dataCategory={dataCategory}
            />
          )}{" "}
          {step === 2 && (
            <InforProducttypeUpdate
              dataCategory={category}
              onSetStep={setStep}
              closeModal={closeModalUpdate}
              dataUpdate={dataUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
