import React, { useMemo, useState } from "react";
import StatusBox from "../../components/StatusBox";
import Checklist from "../../components/Checklist";

interface ItemDetail {
  title: string;
  description: string;
  status?: "blocked" | "notApplicable" | "completed" | "empty";
  descriptionStatus?:
    | "blocked"
    | "info"
    | "completed"
    | "warning"
    | "empty";
}

interface ChecklistDetail {
  name: string;
  items: ItemDetail[];
}

const TaskDetail: React.FC = () => {
  const [checklists, setChecklists] = useState<ChecklistDetail[]>([
    {
      name: "Checklist items",
      items: [
        {
          title: "Check item 1",
          description: "Not started",
          status: "empty",
          descriptionStatus: "empty",
        },
        {
          title: "Electrical connection, general, 3-pin. Electrical",
          description: "Blocked :Part installation done",
          status: "blocked",
          descriptionStatus: "blocked",
        },
        {
          title: "Check item 3",
          description: "Final installation done",
          status: "notApplicable",
          descriptionStatus: "info",
        },
        {
          title: "L3.1 LED surface-mounted wall light Architech",
          description: "L3.1 LED surface-mounted wall light",
          status: "empty",
          descriptionStatus: "warning",
        },
        {
          title: "Electrical connection, general, 3-pin.",
          description: "Done: Part installation done",
          status: "completed",
          descriptionStatus: "completed",
        },
        {
          title: "Check item 3",
          description: "Final installation done",
          status: "completed",
          descriptionStatus: "completed",
        },
        {
          title: "L3.1 LED surface-mounted wall light",
          description: "L3.1 LED surface-mounted wall light",
          status: "completed",
          descriptionStatus: "warning",
        },
      ],
    },
  ]);

  const handleAddNewChecklist = () => {
    const input = prompt("Please enter checklist name.");

    if (!input) {
      return;
    }

    const newChecklist: ChecklistDetail = {
      name: input,
      items: [],
    };

    setChecklists((prevChecklists) => [...prevChecklists, newChecklist]);
  };

  const handleAddNewItem = (checklistIndex: number) => {
    const title = prompt("Please enter title of item (mandatory).") || "Untitled";
    const description = prompt("Please enter description for the item (mandatory)") || "";

    const newItem: ItemDetail = {
      title,
      description,
      status: "empty",
    };

    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items.push(newItem);

    setChecklists([...updatedChecklists]);
  };

  const handleItemClick = (checklistIndex: number, itemIndex: number) => {
    const updatedChecklists = [...checklists];

    const clickedItem = updatedChecklists[checklistIndex].items[itemIndex];

    if (
      clickedItem.status === "notApplicable" ||
      clickedItem.status === "blocked"
    ) {
      return;
    }

    clickedItem.status =
      clickedItem.status === "completed" ? "empty" : "completed";

    clickedItem.descriptionStatus = clickedItem.status;

    updatedChecklists[checklistIndex].items[itemIndex] = clickedItem;
    setChecklists([...updatedChecklists]);
  };

  const isTicketStatusBlocked = useMemo(() => {
    return !!checklists
      .flatMap((checklist) => checklist.items)
      .find((item) => item.status === "blocked");
  }, [checklists]);

  return (
    <>
      <div className="flex justify-between bg-greywhite border border-solid border-gray-200 p-5">
        <div className="">
          <div className="text-lg font-semibold">Task Name</div>
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

      {checklists.map((checklist, index) => (
        <Checklist
          key={index}
          name={checklist.name}
          items={checklist.items}
          onAddNewItem={() => handleAddNewItem(index)}
          onUpdateItemStatus={(itemIndex) => handleItemClick(index, itemIndex)}
        />
      ))}
    </>
  );
};

export default TaskDetail;
