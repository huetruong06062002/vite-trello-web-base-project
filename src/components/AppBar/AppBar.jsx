import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/ProFiles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


function AppBar() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <Box
        px={2}
        sx={{
          width: "100%",
          height: (theme) => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          overflow: "auto",
          bgcolor: (theme) => theme.palette.mode === "dark" ? "#2c3e50" : "#053a76",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AppsIcon sx={{ color: "white" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant="outlined"
              startIcon={<LibraryAddIcon />}
              sx={{ 
                color: "white" ,
                border: "none",
                '&:hover': {border: "none"}
              }}
            >
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, text:"white" }}>
          <TextField
            id="outlined-search"
            label="Search..."
            size="small"
            type="text"
            value={searchValue}
            onChange={(e)=> {setSearchValue(e.target.value)}}
            sx={{ minWidth: "120px", text: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{color:'white !important'}}>
                  <SearchIcon
                    sx={{
                    text:'white',
                    color:'white !important',
                    // minWidth: '120px',
                    // maxWidth: '170px',
                    '& label': {
                      color:'white',
                    },
                    '& input': {
                      color:'white',
                    },
                    '& label.Mui-focus': {
                      color: 'white'
                    },
                    '& .MuiInputBase-input':{
                      color: 'white'
                    },
                    '& .MuiInputBase-root': {
                      "& fieldset": {
                        borderColor: 'white'
                      },
                      "&:hover filedset": {
                        borderColor: 'white'
                      },
                      "&.Mui-focus filedset": {
                        borderColor: 'white'
                      }
                    }
                    
                  }} />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  fontSize='small'
                  sx={{ color: searchValue ?'white': 'transparent', cursor: 'pointer' }}
                  onClick = {e => setSearchValue("")}
                />
              )
            }}      
          />
          <ModeSelect />
          <Tooltip title="Notification">
            <Badge color="error" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon sx={{ color: "white" }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <Badge variant="dot" sx={{ cursor: "pointer" }}>
              <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
            </Badge>
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </div>
  );
}

export default AppBar;
