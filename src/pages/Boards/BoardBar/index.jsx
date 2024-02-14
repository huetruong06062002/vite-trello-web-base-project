import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NoEncryption } from "@mui/icons-material";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const MENU_STYLES = {
  color: "primary.main",
  bgColor: "white",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.boardBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 2,
          gap: 2,
          overflow: "auto",
          borderTop: "1px solid #00bfa5",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={<DashboardIcon />}
            label="Dashboard"
            clickable
            sx={MENU_STYLES}
          />
          <Chip
            icon={<VpnLockIcon />}
            label="Public/Private Workspaces"
            clickable
            sx={MENU_STYLES}
          />
          <Chip
            icon={<AddToDriveIcon />}
            label="Add To Google Drive"
            clickable
            sx={MENU_STYLES}
          />
          <Chip
            icon={<BoltIcon />}
            label="Automation"
            clickable
            sx={MENU_STYLES}
          />
          <Chip
            icon={<FilterListIcon />}
            label="Filters"
            clickable
            sx={MENU_STYLES}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon/>}>Invite</Button>
          <AvatarGroup 
          max={7}
          sx={{
            '&. MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
            }
          
          }}
          >
            <Tooltip title="chickendev">
              <Avatar 
              alt="chickendev" 
              src="/static/images/avatar/1.jpg" />
            
            </Tooltip>
            <Tooltip title="chickendev">
              <Avatar 
              alt="chickendev" 
              src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="chickendev">
              <Avatar 
              alt="chickendev" 
              src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="chickendev">
              <Avatar 
              alt="chickendev" 
              src="/static/images/avatar/1.jpg" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  );
}

export default BoardBar;
