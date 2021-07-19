import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CategoryOfProductType from "./CategoryOfProductType";
import InforProducttypeAdd from "./InforProducttypeAdd";

export default function ProductTypeAdd({ openModal, closeModal }) {
  const [step, setStep] = useState(1);
  const [category, setDataCategory] = useState("");

  const dataCategory = (data) => {
    setDataCategory(data);
  };

  return (
    <div>
      <Dialog
        scroll="paper"
        fullWidth
        maxWidth="lg"
        open={openModal}
        onClose={() => {
          closeModal();
          setStep(1);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thêm loại sản phẩm</DialogTitle>
        <DialogContent>
          {step === 1 && (
            <CategoryOfProductType
              onSetStep={setStep}
              dataCategory={dataCategory}
            />
          )}{" "}
          {step === 2 && (
            <InforProducttypeAdd
              dataCategory={category}
              onSetStep={setStep}
              closeModal={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
