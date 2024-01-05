import { Marker, MarkerComponentProps } from "react-image-marker";

export interface CustomMarkerInterface extends Marker {
  status: "success" | "error" | "warning";
  content: string;
  createdBy: string;
  deviceId?: string | number;
}

export interface CustomMarkerProps extends MarkerComponentProps {
  content: string;
  status: string;
  createdBy: string;
}
