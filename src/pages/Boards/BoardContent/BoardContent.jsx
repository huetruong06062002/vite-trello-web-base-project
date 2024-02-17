import Box from "@mui/material/Box";
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';

function BoardContent({board}) {

  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, "_id");

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
        <ListColumns columns={orderedColumns} />
      </Box>
    </div>
  );
}

export default BoardContent;
