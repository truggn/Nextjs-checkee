import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import {useStyles} from './Dasboard.style';

function CustomName({nameCustom}){
    const classes = useStyles();
    const [showName,setShowName] = useState(false);
    let nameSort,nameFull,nameFirst;
    if(nameCustom!==null && nameCustom.length>25){
        nameSort =<> {nameCustom.slice(0,15)}<a className={classes.rootLink} type="button" onClick={()=>{setShowName(!showName)}}>...xem thêm</a></>;
        nameFull =<> {nameCustom}<a className={classes.rootLink} type="button" onClick={()=>{setShowName(!showName)}}> ẩn bớt</a></>;
    }else{
        nameFirst = nameCustom;
    }
    return (
        <>{nameFirst?nameFirst:showName?nameFull:nameSort}</>
    );
}

export default CustomName;