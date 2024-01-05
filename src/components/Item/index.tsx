import React from "react";
import StatusBox from "../StatusBox";
import blockItem from "../../assets/svgs/blocked-item.svg";
import completedItem from "../../assets/svgs/completed-item.svg";
import notApplicableItem from "../../assets/svgs/not-applicable.svg";
import uncheckedItem from "../../assets/svgs/unchecked-item.svg";

interface ItemDetail {
  title: string;
  description: string;
  handleClick?: () => void;
  status?: "blocked" | "notApplicable" | "completed" | "empty";
  descriptionStatus?:
    | "blocked"
    | "info"
    | "completed"
    | "empty"
    | "warning";
}

const statusMappings: Record<string, string> = {
  blocked: "red",
  info: "blue",
  warning: "yellow",
  completed: "green",
  empty: "gray",
};

const Item: React.FC<ItemDetail> = ({
  title,
  description,
  descriptionStatus = "empty",
  status = "empty",
  handleClick,
}) => {
  const textColorVariant = {
    red: "text-red-600",
    gray: "text-black",
  }[status === "blocked" ? "red" : "gray"];

  const descriptionColorVariant = {
    red: "text-red-600",
    gray: "text-gray-400",
  }[status === "blocked" ? "red" : "gray"];

  return (
    <div className="flex px-5 gap-4 items-center">
      {((classes: string) => {
        switch (status) {
          case "blocked":
            return (
              <img
                src={blockItem}
                className={classes}
                alt="checkbox-item"
                onClick={handleClick}
              />
            );
          case "notApplicable":
            return (
              <img
                src={notApplicableItem}
                className={classes}
                alt="checkbox-item"
                onClick={handleClick}
              />
            );
          case "completed":
            return (
              <img
                src={completedItem}
                className={classes}
                alt="checkbox-item"
                onClick={handleClick}
              />
            );
          case "empty":
            return (
              <img
                src={uncheckedItem}
                className={classes}
                alt="checkbox-item"
                onClick={handleClick}
              />
            );
          default:
            return null;
        }
      })("w-[30px] h-[30px] cursor-pointer")}

      <div className="flex flex-col gap-1">
        <h2
          className={`font-normal ${textColorVariant} text-[16px] tracking-[0] leading-[22px] whitespace-nowrap`}
        >
          {title}
        </h2>

        <div className="flex gap-2">
          <StatusBox color={statusMappings[descriptionStatus]} />
          <p
            className={`font-normal ${descriptionColorVariant} text-[12px] tracking-[0] leading-[normal] whitespace-nowrap`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);
