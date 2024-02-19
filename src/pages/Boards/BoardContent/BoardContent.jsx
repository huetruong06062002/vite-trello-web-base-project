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
  closestCorners
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep } from "lodash";

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

  //Tìm Column theo CardId
  const findColumnByCardId = (cardId) => {
    //c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver sẽ làm cho cards hoàn
    //chỉnh trước rồi mói tạo ra cardOderIds mới

    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

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

  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (event) => {
    //K làm gì thêm nếu kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    //nếu card thì xử lí thêm để có thể kéo card qua lại giữa các columns
    // console.log('handleDragOver', event);
    const { active, over } = event;

    //Kiểm tra nếu k tồn tại over(kéo linh tinh ra khỏi phạm vi container) thì k làm gì
    // tránh crash trang
    if (!active || !over) return;

    //activeDraggingCardData: là cái card đang đc kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    //overCard: là cái card đag tương tác trên hoặc dưới so với cái card đc kéo ở trên.
    const { id: overCardId } = over;

    //Tìm 2 cái columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    //Nếu k tồn tại 1 trong 2 column thì k gì hết, tránh cash trang web
    if (!activeColumn || !overColumn) return;

    //kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu thì k làm gì hết
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        //Tìm vị trí(index) của cái overCard trong column đích(nơi mà activeCard sắp đc thả)
        const overCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        );

        //Logic tính toán "cardIndex mới" (trên hoặc dưới của overCard) lấy chuẩn ra từ code của dndkit

        let newCardIndex;

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        console.log("isBelowOverItem", isBelowOverItem);
        console.log("modifier", modifier);
        console.log("newCardIndex", newCardIndex);


        //clone mảng mới
        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //column cũ
        if(nextActiveColumn){
          //Xóa card ở column active(column cũ) lúc kéo nó sang column mới
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        
          //Cập nhật lại cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        //column mới
        if(nextOverColumn){
          //Kiểm tra xem card đang kéo có tồn tại ở overColumn hay chưa nếu có thì xóa nó trc
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        
          //Tiếp theo là thêm cái card đang kéo vào OverColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        
          //Cập nhật lại cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        console.log("nextColumns", nextColumns);
        return nextColumns;
      });
    }
  };

  // Trigger Khi kết thúc kéo 1 phần tử
  const handleDragEnd = (event) => {
    console.log("handleDragEnd", event);
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("Hành động kéo thả Card - Tạm thời ko làm gì cả!");
      return;
    }

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
      styles: { active: { opacity: "0.5" } },
    }),
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}//Dùng closeseCorners thay vì closestCenter
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
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
