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

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          maxWidth: 345,
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    );
  }

  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.ctfassets.net/rz1oowkt5gyp/6REfiXE44STV6MKHXJbyRr/9df1e38e1c2f876f7491c88693bfdcad/TrelloGuideChapter1.jpg?w=1140&fm=webp"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 }, "text-align":"center" }}>
        <Typography>ChickenDev</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          10
        </Button>
        <Button size="small" startIcon={<AttachFileIcon />}>
          15
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
