import React, { useState, useEffect } from "react";
// import { datalist } from "./data";
import ProcessOfProductColumn from "./ProcessOfProductColumn";
import { DragDropContext, Droppable, Draggable,DropResult,DraggableLocation,DroppableProvided,DroppableStateSnapshot } from "react-beautiful-dnd";
import { useStyles } from "./Process.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  ButtonGroup,
  Button,
  Typography,
  Grid,
  CardContent,
  Card
} from '@material-ui/core';
import {
  IListProcessManage,
  createProcessManage,
} from "Frontend/redux/actions/ProcessManageActions";
import getProcessOfProduct from "../../constant.config.api/api/getProcessOfProduct";
import Router from "next/router";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createProcessOfProduct } from "../../redux/actions/ProcessOfProductAction";

//interface
interface participantId{
  _id:string,
  address:string,
  code:string,
  email:string,
  organizationId:string,
  participantName:string,
  participantType:string,
  phone:string,
}

interface productAttributes{
  _id:string,
  key:string,
  organizationId:string,
  productTypeId:string,
  type:string
}

interface Item {
  _id:string,
  participantId:participantId,
  productAttributes:productAttributes[],
  productFlowId:string,
}

interface IMoveResult{
  droppable:Item[]
}
interface dataFlow{
  flowId:string,
  productAttributes:string[],
}
//
// const getItemStyle = ( draggableStyle:any) => ({
//   // some basic styles to make the items look a bit nicer
//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

const getListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

export type Reorder<
  T = any,
> = (
  list: T[],
  startIndex: number,
  endIndex: number,
) => T[] 
//
const reorder:Reorder = (list, startIndex, endIndex) => {
  let result  = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
// const move = (source: Item[], destination: Item[], droppableSource:DraggableLocation, droppableDestination:DraggableLocation):IMoveResult | any => {
//   const sourceClone = [...source];
//   const destClone = [...destination];
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };
export default function ProcessOfProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dataProcessOfProduct, setDataProcessOfProduct] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    if (index === 0) {
      Router.push("/settingprocessofproduct");
    }
    if (index === 1) {
      Router.push("/producttypeforprocess");
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const detailprocessmanage: IListProcessManage = useSelector(
    (state: any) => state.ProcessManage.detailprocessmanage
  );
  // console.log("dataProcessOfProduct", dataProcessOfProduct);
  //get data
  useEffect(() => {
    async function getDataProcessOfProduct() {
      let result = await getProcessOfProduct(detailprocessmanage?._id);
      if (result.status === 200) {
        setDataProcessOfProduct(result.data.data.flow);
      }
    }
    getDataProcessOfProduct();
  }, []);
  function ondragend(result:DropResult):void {
    // console.log("result", result);
    const {source, destination} = result;
    if (!result.destination) {
      return;
    }
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "column") {
      const items = reorder(dataProcessOfProduct, sourceIndex, destIndex);
      setDataProcessOfProduct(items);
    } else if (result.type === "task") {
      const itemParentMap = dataProcessOfProduct.reduce((acc:any, item) => {
        acc[item._id] = item.productAttributes;
        return acc;
      }, {});
      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      const sourceSubItems = itemParentMap[sourceParentId];
      const destSubItems = itemParentMap[destParentId];

      let newItems = [...dataProcessOfProduct];
      /** In this case productAttributes are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedParentId = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        let newItemss = newItems.map((item:Item) => {
          if (item._id === sourceParentId) {
            item.productAttributes = reorderedParentId;
          }
          return item;
        });
        setDataProcessOfProduct(newItemss);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        let newItemss = newItems.map((item) => {
          if (item._id === sourceParentId) {
            item.productAttributes = newSourceSubItems;
          } else if (item._id === destParentId) {
            item.productAttributes = newDestSubItems;
          }
          return item;
        });
        setDataProcessOfProduct(newItemss);
      }
    }
  }
  const [dataFlowNew, setDataFlowNew] = useState<dataFlow[]>([]);
  useEffect(() => {
    const dataFlowsNew = ():dataFlow[] => {
      let dataFlow:dataFlow[] = [];
      dataProcessOfProduct.map((todo) => {
        dataFlow.push({
          flowId: todo._id,
          productAttributes: todo.productAttributes.map((todos) => todos._id),
        });
      });
      return dataFlow;
    };
    setDataFlowNew(dataFlowsNew());
  }, [dataProcessOfProduct]);

  // console.log("ss", dataFlowNew);
  const options = ["Cài đặt quy trình","Thêm sản phẩm"];
  // console.log("dataProcessOfProduct",dataProcessOfProduct)
  return (
    <Grid container spacing={1}>
      <Grid item sm={12}>
        <Card className={classes.Card}>
          <CardContent>
            <Grid container spacing={1} justify="flex-end" alignItems="center">
              <Grid item sm={6} xs={12}>
                <Typography className={classes.Typography} variant="h6">
                  Tên quy trình:{" "}
                  {detailprocessmanage ? detailprocessmanage.name : ""}
                </Typography>
                <Typography className={classes.Typography} variant="h6">
                  Loại sản phẩm:{" "}
                  {detailprocessmanage
                    ? detailprocessmanage.productTypeId.name
                    : ""}
                </Typography>
              </Grid>
              <Grid item sm={2} xs={12}>
                <Button
                  onClick={() => {
                    // alert("save");
                    dispatch(
                      createProcessOfProduct(
                        detailprocessmanage._id,
                        dataFlowNew
                      )
                    );
                  }}
                  variant="contained"
                  color="primary"
                >
                  Lưu
                </Button>
              </Grid>
              <Grid item sm={1}></Grid>
              <Grid item sm={3} xs={12}>
                <Grid container justify="flex-end" spacing={1}>
                  <Grid item sm={8}></Grid>
                  <Grid item sm={4} xs={12}>
                    <ButtonGroup
                      // variant="contained"
                      // color="primary"
                      ref={anchorRef}
                    >
                      <Button
                        // color="inherit"
                        variant="text"
                        size="small"
                        // aria-controls={open ? "split-button-menu" : undefined}
                        // aria-expanded={open ? "true" : undefined}
                        // aria-haspopup="menu"
                        onClick={handleToggle}
                      >
                        <MoreVertIcon />
                      </Button>
                    </ButtonGroup>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu">
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) =>
                                      handleMenuItemClick(event, index)
                                    }
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} xs={12}>
        <DragDropContext onDragEnd={ondragend}>
          <Droppable
            droppableId="allcolumn"
            direction="horizontal"
            type="column"
          >
            {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes.containerExample}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {dataProcessOfProduct
                  ? dataProcessOfProduct.map((columnId, index) => {
                      const tasks = columnId.productAttributes.map(
                        (taskid) => taskid
                      );
                      return (
                        <ProcessOfProductColumn
                          key={columnId._id}
                          column={columnId}
                          task={tasks}
                          index={index}
                        />
                      );
                    })
                  : ""}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );

}
