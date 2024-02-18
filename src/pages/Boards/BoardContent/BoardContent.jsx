import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // The delay property represents the duration, in milliseconds, that a draggable item needs to
    //be held by the touch input before a drag start event is emitte
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(pointerSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  //Cùng 1 thời điểm chỉ có 1 phần tử đc kéo column hoặc card
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // Trigger Khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    console.log("handleDragStart", event);
    setActiveDragItemId(event?.active.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  // Trigger Khi kết thúc kéo 1 phần tử

  const handleDragEnd = (event) => {
    const { active, over } = event;

    //Kiểm tra nếu k tồn tại over(kéo linh tinh ra ngoài)
    if (!over) return;

    //Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      //Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      //Lấy vị trí mới (từ thằng over)
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      //arrayMove sort column
      //https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);

      // console.log('dndOrderedColumns', dndOrderedColumns);
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds);

      //Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns);
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  /*
    animation after finish drag
  */
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5"}},
    }),
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#34495e" : "#1565c0",
            height: (theme) => theme.trello.boardContentHeight,
            p: "10px 0",
          }}
        >
          <ListColumns columns={orderedColumns} />
          <DragOverlay dropAnimation={customDropAnimation}>
            {!activeDragItemType & null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
          </DragOverlay>
        </Box>
      </DndContext>
    </div>
  );
}

export default BoardContent;
