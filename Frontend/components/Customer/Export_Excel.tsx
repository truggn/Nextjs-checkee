import { Button } from '@material-ui/core';
import React from 'react';
import { useStyles } from "./Customer.styles"; 
import SaveIcon from '@material-ui/icons/Save';

function Export_Excel({onHandleExport}) {
    console.log(onHandleExport)
    const classes = useStyles();
    return (
        <Button 
            size="small"
            variant="contained"
            color="primary"
            className={classes.button} 
            onClick={() => {onHandleExport()}}
            startIcon={<SaveIcon />}
        >
                    Export
        </Button>
    );
}

export default Export_Excel;