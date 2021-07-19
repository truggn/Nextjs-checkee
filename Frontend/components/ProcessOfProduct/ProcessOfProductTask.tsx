import React, { useState } from "react";
import { Draggable,DraggableProvided } from "react-beautiful-dnd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "./Process.styles";
import Grid from "@material-ui/core/Grid";

export default function ProcessOfProductTask(props) {
  const classes = useStyles();
  return (
    <Draggable draggableId={props.task._id} index={props.index}>
      {(provided:DraggableProvided) => (
        <Grid
          container
          className={classes.containerTask}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Grid item sm={12}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.listTask}
            >
              <ListItem>
                <ListItemText
                  primary={props.task.key}
                  secondary={props.task.type}
                />
                <IconButton onClick={() => alert("xóa")}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Draggable>
  );
}
