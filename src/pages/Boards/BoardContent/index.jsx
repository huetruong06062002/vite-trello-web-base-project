import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import Cloud from "@mui/icons-material/Cloud";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ContentCopy, ContentPaste } from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommentIcon from "@mui/icons-material/Comment";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1565c0",
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <Box
          sx={{
            bgcolor: "inherit",
            width: "100%",
            height: "100%",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            '&::-webkit-scrollbar-track': {
              m: 2
            }
          }}
        >
          {/* Column 1*/}
          <Box
            sx={{
              minWidth: "300px",
              maxWidth: "300px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
              ml: 2,
              borderRadius: "6px",
              height: "fit-content",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight}) - ${theme.spacing(
                  5
                )}`,
            }}
          >
            {/* Box column Header */}
            <Box
              sx={{
                height: COLUMN_HEADER_HEIGHT,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Column Title
              </Typography>
              <Box>
                <Tooltip title="More options">
                  <ExpandMoreIcon
                    sx={{
                      color: "text.primary",
                      cursor: "pointer",
                    }}
                    id="basic-column-dropdown"
                    aria-controls={
                      open ? "basic-menu-column-dropdown" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="basic-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    marginTop: "1.5rem",
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Coppy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Box List Card */}
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
                ${COLUMN_HEADER_HEIGHT} -
                ${COLUMN_FOOTER_HEIGHT})
                `,
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#bfc2cf",
                },
                m: "0 5px",
              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
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
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>ChickenDev MERN Stack</Typography>
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
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Box Column Footer*/}
            <Box
              sx={{
                height: COLUMN_FOOTER_HEIGHT,
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
          {/* Column 2*/}
          <Box
            sx={{
              minWidth: "300px",
              maxWidth: "300px",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
              ml: 2,
              borderRadius: "6px",
              height: "fit-content",
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight}) - ${theme.spacing(
                  5
                )}`,
            }}
          >
            {/* Box column Header */}
            <Box
              sx={{
                height: COLUMN_HEADER_HEIGHT,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Column Title
              </Typography>
              <Box>
                <Tooltip title="More options">
                  <ExpandMoreIcon
                    sx={{
                      color: "text.primary",
                      cursor: "pointer",
                    }}
                    id="basic-column-dropdown"
                    aria-controls={
                      open ? "basic-menu-column-dropdown" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="basic-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    marginTop: "1.5rem",
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Coppy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Box List Card */}
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
                ${COLUMN_HEADER_HEIGHT} -
                ${COLUMN_FOOTER_HEIGHT})
                `,
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#bfc2cf",
                },
                m: "0 5px",
              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
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
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>ChickenDev MERN Stack</Typography>
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
              </Card>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: "pointer",
                  boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                  overflow: "unset",
                }}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Box Column Footer*/}
            <Box
              sx={{
                height: COLUMN_FOOTER_HEIGHT,
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
        </Box>
      </Box>
    </div>
  );
}

export default BoardContent;
