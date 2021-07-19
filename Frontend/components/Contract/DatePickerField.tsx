import * as React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

export default function DatePickerField({ field, form, ...other }) {
  const [date, setDate] = React.useState<string>("");
  const [dateString, setDateString] = React.useState<string >("");
  const currentError = form.errors[field.name];
  const currentTouched = form.touched[field.name];

  if (!isNaN(Date.parse(field.value))) {
    if (date !== field.value) {
      setDate(field.value);
      setDateString("");
    }
  } else {
    if (dateString !== field.value) {
      setDateString(field.value);
    }
  }
  return (
    <KeyboardDatePicker
      autoOk
      inputVariant="outlined"
      InputAdornmentProps={{ position: "end" }}
      name={field.name}
      value={date}
      inputValue={dateString}
      mask="__.__.____"
      format="dd.MM.yyyy"
      error={(currentError && currentTouched) || false}
      helperText={currentError && currentTouched ? currentError : null}
      onChange={(date:Date, value:string):void => {
        const saveDate = !isNaN(date.getTime());
        form.setFieldTouched(field.name, true, false);
        form.setFieldValue(field.name, saveDate ? date : value, true);
      }}
      {...other}
      fullWidth
    />
  );
}
