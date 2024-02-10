import React from 'react'
import Box from '@mui/material/Box'
function BoardContent() {
  return (
    <div>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',      
        height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
        alignItems: 'center'
      }}>board content</Box>
    </div>
  )
}

export default BoardContent
