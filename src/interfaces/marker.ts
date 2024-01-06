import { Marker, MarkerComponentProps } from "react-image-marker";

export interface CustomMarkerInterface extends Marker {
  id?: number;
  createdBy: string;
  name: string;
  checklist?: ChecklistInterface[]
}

export interface ItemDetail {
  title: string;
  description: string;
  checklist_id?: number;
  status?: "blocked" | "notApplicable" | "completed" | "empty";
  descriptionStatus?:
    | "blocked"
    | "info"
    | "completed"
    | "warning"
    | "empty";
}

export interface ChecklistInterface {
  id?: number;
  name: string;
  marker_id: string;
  items?: ItemDetail[];
}

export interface CustomMarkerProps extends MarkerComponentProps {
  id?: number;
  createdBy: string;
  name: string;
}
