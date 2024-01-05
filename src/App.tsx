import React, { useEffect, useState } from "react";
import ImageMarker, { Marker, MarkerComponentProps } from "react-image-marker";
import { Tooltip } from "react-tooltip";
import "./App.css";
import styled from 'styled-components';
import { getDatabase } from './schemas/db';
import { generateInitials } from "./utils";
import { CustomMarkerProps } from "./interfaces/marker";

const MACHINE_IMAGE =
  "https://previews.123rf.com/images/parmenov/parmenov1802/parmenov180200071/95660952-architectural-plan-of-a-house-layout-of-the-apartment-top-view-with-the-furniture-in-the-drawing.jpg";

interface CustomMarker extends Marker {
  status: "success" | "error" | "warning";
  content: string;
  createdBy: string;
  deviceId?: string | number;
}

const CustomMarkerWrapper = styled.div`
  &.__custom-marker {
    position: relative;
    display: inline-block;

    div.__anchor {
      position: relative;
      display: inline-block;
      padding: 8px 12px;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;

      &:before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-top-color: #3498db;
      }

      &:hover {
        background-color: #2c3e50;
      }
    }

    .react-tooltip.__custom-tooltip {
      display: flex;
      justify-content: center;

      button.__view-more {
        display: block;
        margin-top: 8px;
        padding: 6px 12px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #2c3e50;
        }
      }
    }

    .beacon {
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #e74c3c;
    }
  }
`;

const CustomMarkerComp = (props: MarkerComponentProps) => {
  const { itemNumber, content, status, createdBy } = props as CustomMarkerProps;

  return (
    <CustomMarkerWrapper className="__custom-marker">
      <div id={`component_${itemNumber}`} className="__anchor">
        {generateInitials(createdBy)}
      </div>
      <Tooltip
        anchorSelect={`#component_${itemNumber}`}
        clickable
        place="bottom"
        className="__custom-tooltip"
      >
        <div>
          Task Name: {content}
          <br />
          Status: {status}
          <br />
          <button className="__view-more">View more</button>
        </div>
      </Tooltip>
      {status === 'error' && <span className="beacon"></span>}
    </CustomMarkerWrapper>
  );
};


function App() {
  const [markers, setMarkers] = useState<Array<CustomMarker>>([]);
  
  useEffect(() => {
    getDatabase().then((db: any) => {
      console.log(db.markers)
      const test = db.markers?.find()
      console.log(test.id)
    });  
  }, [])
  const handleClear = () => {
    setMarkers([]);
  };
  const downloadMarkers = () => {
    const markersJson = {
      markers,
      documents: {
        a: "123",
        b: "lasdjfl;as"
      }
    };
    console.log(JSON.stringify(markersJson));
  };
  return (
    <div className="App">
      <div className="frame">
        <ImageMarker
          src={MACHINE_IMAGE}
          markers={markers}
          onAddMarker={(marker: Marker) => {
            const deviceId = prompt("Enter user name");

            if (!deviceId) {
              return;
            }

            const newMarker: CustomMarker = {
              top: marker.top,
              left: marker.left,
              status: "success",
              createdBy: deviceId,
              deviceId: deviceId,
              content: "Everything looks good here"
            };
            setMarkers([...markers, newMarker]);
          }}
          markerComponent={CustomMarkerComp}
        />
      </div>
      <button onClick={handleClear}>Clear</button>
      <button onClick={downloadMarkers}>Download</button>
    </div>
  );
}

export default App;
