
import { useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListCards from "./ListCards/ListCards";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { mapOrder } from '~/utils/sorts';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


function Column({column}) {

  const {attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: column._id,
      data: { ...column } 
    });
    
    
  
  const dndKitColumnStyles = {
    touchAction: 'none',

    //Nếu sử dụng CSS.trasform như docs sẽ lỗi kiểu stretch
    transform: CSS.Translate.toString(transform),
    transition,
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
  

  return (
    <Box
      ref={setNodeRef}
      style={dndKitColumnStyles }
      {...attributes} 
      {...listeners}
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
        ml: 2,
        borderRadius: "6px",
        height: "fit-content",
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight}) - ${theme.spacing(5)}`,
      }}
    >
      {/* Box Column Header*/}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
       
        <Typography variant='h6' sx={{
          fontSize:'1 rem',
          fontWeight:'bold',
          cursor:'pointer',
        }}>
          {column?.title}
        </Typography>

        <Tooltip title="Drop Down">
          <ArrowDropDownIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>

      {/*List Cards */}
      <ListCards cards={orderedCards} />

      {/* Box Column Footer*/}
      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Column;
