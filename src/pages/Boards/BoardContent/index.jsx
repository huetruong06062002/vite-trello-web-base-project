import React from "react";
import Box from "@mui/material/Box";
import theme from "~/theme";
function BoardContent() {
  return (
    <div>
      <Box    
        sx={{
          bgcolor: (theme) => theme.palette.mode === "dark" ? "#34495e" : "#1565c0",
          width: "100%",
          height: (theme) =>
            `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
          alignItems: "center",
        }}
      >
        board content
      </Box>
    </div>
  );
}

export default BoardContent;
