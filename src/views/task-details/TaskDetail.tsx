import React, { useEffect, useMemo } from "react";
import StatusBox from "../../components/StatusBox";
import Checklist from "../../components/Checklist";
import { useParams } from "react-router-dom";
import { fetchMarkerById, getChecklistsByUser, getMarkerDetails, setChecklistItem, setChecklistItemStatus, setChecklists } from "../../reducers/markerSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ChecklistInterface, ItemDetail } from "../../interfaces/marker";
import { getDatabase } from "../../schemas/db";


const TaskDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const checklists = useAppSelector(getChecklistsByUser)
  const markerDetails = useAppSelector(getMarkerDetails)
  const { id: taskId } = useParams();

  useEffect(() => {
    dispatch(fetchMarkerById(Number(taskId) || 0))
    // eslint-disable-next-line
  }, [taskId])

  const handleAddNewChecklist = async () => {
    const input = prompt("Please enter checklist name.");

    if (!input) {
      return;
    }

    try {
      const db = await getDatabase();
      const checklistCollections = db.checklists;

      const newChecklist: ChecklistInterface = {
        id: Date.now(),
        name: input,
        marker_id: taskId!,
        items: [],
      };

      const createdChecklist = await checklistCollections.insert(newChecklist);

      dispatch(setChecklists([...checklists, createdChecklist.toJSON()]))

    } catch (error) {
      console.log('Error while inserting data', error)
    }
  };

  const handleAddNewItem = async (checklistIndex: number) => {
    const title =
      prompt("Please enter title of item (mandatory).") || "Untitled";
    const description =
      prompt("Please enter description for the item (mandatory)") || "";

    const newItem: ItemDetail = {
      title,
      description,
      status: "empty",
      descriptionStatus: "empty",
      checklist_id: checklists[checklistIndex].id
    };

    try {
      const db = await getDatabase();
      const checklistCollections = db.checklists;

      // Find the checklist in the database
      const checklistDocument = await checklistCollections.findOne({
        selector: {
          marker_id: taskId,
        },
      }).exec();

      if (checklistDocument) {
        const checklist = checklistDocument.toJSON();

        checklist.items = [...checklist.items]

        checklist.items.push(newItem);

        await checklistDocument.update({
          $set: {
            items: checklist.items,
          },
        });
      }
    } catch (error) {
      console.error('Error while updating checklist with new item', error);
      // Handle the error, e.g., show a user-friendly message
    }


    dispatch(setChecklistItem({ newItem, checklistIndex }))
  };

  const handleItemClick = async (checklistIndex: number, itemIndex: number) => {
    const updatedChecklists = [...checklists];

    const clickedItem = updatedChecklists[checklistIndex].items?.at(itemIndex);

    if (!clickedItem) {
      return;
    }

    if (
      clickedItem?.status === "notApplicable" ||
      clickedItem?.status === "blocked"
    ) {
      return;
    }

    const itemStatus = clickedItem?.status === "completed" ? "empty" : "completed";

    try {
      const db = await getDatabase();
      const checklistCollections = db.checklists;

      const checklistDocument = await checklistCollections.findOne({
        selector: {
          marker_id: taskId,
        },
      }).exec();


      if (checklistDocument) {
        const checklist = checklistDocument.toJSON();

        checklist.items = [...checklist.items]

        checklist.items[itemIndex] = { ...clickedItem, status: itemStatus };

        await checklistDocument.update({
          $set: {
            items: checklist.items,
          },
        });
      }
    } catch (error) {
      console.error('Error while updating checklist item status', error);
    }

    dispatch(setChecklistItemStatus({ checklistIndex, itemIndex, itemStatus }))
  };

  const isTicketStatusBlocked = useMemo(() => {
    return !!checklists
      .flatMap((checklist) => checklist.items)
      .find((item) => item?.status === "blocked");
  }, [checklists]);

  return (
    <>
      {!markerDetails ?
        <p className="font-bold text-lg justify-center mt-20 flex">No task found</p>
        :
        <>
          <div className="flex justify-between bg-greywhite border border-solid border-gray-200 p-5">
            <div className="">
              <div className="text-lg font-semibold">{markerDetails?.name}</div>
              {isTicketStatusBlocked && (
                <div className="flex gap-2 items-center">
                  <StatusBox color="red" />
                  <p className="text-red-600">Ticket progress is blocked</p>
                </div>
              )}
            </div>
            <button
              className="block mt-2 px-3 py-2 bg-blue-500 text-white border-none rounded cursor-pointer transition duration-300 ease-in-out hover:bg-blue-700"
              onClick={handleAddNewChecklist}
            >
              Add new checklist
            </button>
          </div>

          {checklists.length ? (
            checklists.map((checklist, index) => (
              <Checklist
                key={index}
                name={checklist.name}
                items={checklist.items || []}
                onAddNewItem={() => handleAddNewItem(index)}
                onUpdateItemStatus={(itemIndex) =>
                  handleItemClick(index, itemIndex)
                }
              />
            ))
          ) : (
            <p className="flex justify-center p-5 border-b border-b-gray-200">
              No checklists found Add to create new checklist
            </p>
          )}
        </>
      }

    </>
  );
};

export default TaskDetail;
