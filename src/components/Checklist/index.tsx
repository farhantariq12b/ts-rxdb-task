import React, { useState } from "react";
import arrowDownSVG from "../../assets/svgs/arrow-down.svg";
import arrowUpSVG from "../../assets/svgs/arrow-up.svg";
import Item from "../../components/Item";

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

interface ChecklistProps {
  name: string;
  items: ItemDetail[];
  onAddNewItem: () => void;
  onUpdateItemStatus: (index: number) => void;
}

const Checklist: React.FC<ChecklistProps> = ({
  name,
  items,
  onAddNewItem,
  onUpdateItemStatus,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative bg-greywhite border border-solid transition-[height] duration-1000 border-gray-200">
      <button
        className="p-5 w-full flex justify-between border-b items-center border-solid border-b-gray-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="font-semibold text-greyblack text-[18px] leading-[normal] whitespace-nowrap">
          {name}
        </h2>

        <img
          src={expanded ? arrowDownSVG : arrowUpSVG}
          alt="arrow-down svg"
          className="w-[12px] h-[12px]"
        />
      </button>

      {expanded && (
        <>
          <div className="flex justify-between px-5 py-3 items-center border-b border-b-gray-200">
            <div className="flex gap-4 items-center">
              <div className="font-semibold text-white rounded-lg p-2 text-[12px] text-center tracking-[0] leading-[normal] whitespace-nowrap bg-[#062A4F]">
                CI
              </div>

              <div className=" font-normal text-greyblack text-[16px] tracking-[0] leading-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                Light Bulb 150S
              </div>
            </div>

            <div className="font-normal text-gray-500 text-[12px] text-right tracking-[0] leading-[normal] whitespace-nowrap">
              {items?.length || 0} STEPS
            </div>
          </div>
          <div className="gap-5 flex flex-col pt-5">
            {items.map((item, index) => (
              <Item
                key={index}
                title={item.title}
                description={item.description}
                status={item.status}
                descriptionStatus={item.descriptionStatus}
                handleClick={() => onUpdateItemStatus(index)}
              />
            ))}
          </div>
          <button
            data-testid="add-new-item"
            className="p-5 font-medium text-blue-500 text-[16px] tracking-[0] leading-[22px] whitespace-nowrap flex gap-4 items-center cursor-pointer"
            onClick={onAddNewItem}
          >
            <img
              className="w-[30px] h-[30px]"
              alt="Icon checklist"
              src="https://c.animaapp.com/Lso8nhQc/img/icon-checklist-3.svg"
            />
            Add New Item
          </button>
        </>
      )}
    </div>
  );
};

export default React.memo(Checklist);
