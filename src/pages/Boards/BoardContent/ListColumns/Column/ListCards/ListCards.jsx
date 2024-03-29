import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {CardActions, CardContent, CardMedia } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Card from './Card/Card';
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

 

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: "0 5px",
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) => `calc(
                  ${theme.trello.boardContentHeight} - 
                  ${theme.spacing(5)} -
                  ${theme.trello.columnHeaderHeight} -
                  ${theme.trello.columnFooterHeight})
                  `,
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
          m: "0 5px",
        }}
      >
        {cards?.map(card => <Card key={card._id} card = {card}/> )}
      </Box>
    </SortableContext>
  );
}

export default ListCards;
