import {
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: card._id,
      data: { ...card },
    });

  const dndKitCardStyles = {
    // touchAction: "none", //Dành cho dạng default pointer sensors

    //Nếu sử dụng CSS.trasform như docs sẽ lỗi kiểu stretch
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : undefined,

  };

  const shouldShowCardAction = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.comments?.length
    );
  };

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}
    >
      {card?.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title="green iguana"
        />
      )}
      <CardContent
        sx={{ p: 1.5, "&:last-child": { p: 1.5 }, "text-align": "center" }}
      >
        <Typography>{card.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              20
            </Button>
          )}

          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              20
            </Button>
          )}

          {!!card?.comments?.length && (
            <Button size="small" startIcon={<AttachFileIcon />}>
              20
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
