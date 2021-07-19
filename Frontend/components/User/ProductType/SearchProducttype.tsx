import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SearchProducttype = ({ handleSearch, dataList, dataProductType }) => {
  const [select, setSelect] = useState(1);
  const [input, setInput] = useState("");

  // const handleSelect = (e) => {};

  const handleChange = (e) => {
    e.target ? setSelect(e.target.value) : setInput(e);
  };

  useEffect(() => {
    if (input === "") {
      handleSearch(dataProductType);
    }
  }, [input]);

  const handleReset = () => {
    setInput("");
  };

  const handleSubmit = () => {
    const dataSearch = dataList.filter(
      (item) =>
        item.name.toLowerCase().trim() === input.toLowerCase().trim() ||
        item.code.toLowerCase().trim() === input.toLowerCase().trim()
    );
    handleSearch(dataSearch);
  };

  return (
    <Grid container alignItems="flex-end">
      <FormControl variant="outlined" size="small">
        <Select
          style={{
            marginRight: 3,
            width: 150,
          }}
          labelId="select-search"
          id="select-search"
          value={select}
          onChange={handleChange}
          placeholder="Tìm kiếm"
          onFocus={handleReset}
        >
          <MenuItem value={1}>Mã</MenuItem>
          <MenuItem value={2}>Tên</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        id="search-producttype"
        size="small"
        options={dataProductType}
        getOptionLabel={(option: any) =>
          select === 1 ? option.code : option.name
        }
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Tìm kiếm mã, tên" variant="outlined" />
        )}
        inputValue={input}
        onInputChange={(event, newInputValue) => {
          handleChange(newInputValue);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        style={{
          padding: "8px 0",
          marginLeft: 3,
        }}
        onClick={handleSubmit}
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
  );
};

export default SearchProducttype;
