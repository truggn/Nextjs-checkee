import React, { useEffect, useState, Component } from "react";
import Grid from "@material-ui/core/Grid";
import { useStyles } from './Customer.styles';
import SearchIcon from '@material-ui/icons/Search';


import AsyncSelect from 'react-select/async'
import { Avatar, Button, Typography } from "@material-ui/core";
import makeAnimate from 'react-select/animated';

const animatedComponent = makeAnimate();

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function AutoCompleteSearch({customerData,onHandleSearch}) {
  const classes = useStyles();
    const [customer, setCustomer] = useState([]);
    const searchNameCustumer = (inputText) =>{
      return customerData.filter(item=>(
        item.name_customer.toLowerCase().includes(inputText.toLowerCase()) ||  
        item.phone.toLowerCase().includes(inputText.toLowerCase()) ||
        item.email.toLowerCase().includes(inputText.toLowerCase())
      ));
    }
  
    const handleOnchange = (e,v) =>{
      console.log(v)
      setCustomer(v !== null? v._id : [])
    }
    // const loadOptions = async (inputText,callBack) =>{
    //   const search = await searchNameCustumer(inputText);
    //   callBack(search.map(i=>({label:i.name_customer,value:i._id})))
    // }
    const onHandleSearchCustomer = () =>{
        onHandleSearch(customer)
    }
    interface customerInterface {
      name_customer: string;
      email: string;
      phone:string;
      _id:string;
    }
    console.log(customerData)
    return (
        <Grid container spacing={3} style={{marginBottom:20}}>
            <Grid item xs ={4}>
            {/* <AsyncSelect
                isMulti
                components = {animatedComponent}
                value={customer}
                onChange={handleOnchange}
                placeholder={'Nhập tên công ty, số điện thoại hoặc email...'}
                loadOptions={loadOptions}
            /> */}
             <Autocomplete
               onChange={(e,v)=>handleOnchange(e,v)}
                id="country-select-demo"
                options={customerData as customerInterface[]}
                classes={{
                  option: classes.option,
                }}
                fullWidth={true}
                autoHighlight
                getOptionLabel={(option) => `${option.name_customer} ${option.phone} ${option.email}`}
                renderOption={(option) => (
                  <React.Fragment>
                    {option.name_customer}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nhập tên công ty, số điện thoại hoặc email..."
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs ={2}>
                <Button
                 className={classes.button}
                 size="small"
                 variant="contained"
                 color="primary"
                 onClick={onHandleSearchCustomer}
                 startIcon={<SearchIcon/>}
                 >
                    tìm kiếm
                </Button>
            </Grid>
        </Grid>
    )
    
  }