import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListColumns({ columns }) {
  /*
    SortableContext require ['id-1', 'id-2'] not require [{id:'id-1'},{id:'id-2']
    Nếu k đúng vẫn kéo thả đc nhưng k có animation
    https://github.com/clauderic/dnd-kit/issues/117
  */
  return (
    <div>
      <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
        <Box
          sx={{
            bgcolor: "inherit",
            width: "100%",
            height: "100%",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar-track": {
              m: 2,
            },
          }}
        >
          {columns?.map((column) => (
            <Column key={column._id} column={column} />
          ))}

          {/* `Box Add new Column CTA` */}
          <Box
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        </Box>
      </SortableContext>
    </div>
  );
}

export default ListColumns;
