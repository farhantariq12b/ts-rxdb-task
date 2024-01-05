import React, { useState } from 'react'
import ImageMarker, { Marker } from 'react-image-marker';
import { MACHINE_IMAGE_URL } from '../../constants';
import { CustomMarkerInterface } from '../../interfaces/marker';
import CustomMarker from '../../components/CustomMarker';

const Tasks: React.FC = () => {
  const [markers, setMarkers] = useState<Array<CustomMarkerInterface>>([])

  return (
    <ImageMarker
      src={MACHINE_IMAGE_URL}
      markers={markers}
      onAddMarker={(marker: Marker) => {
        const deviceId = prompt("Enter user name");

        if (!deviceId) {
          return;
        }

        const newMarker: CustomMarkerInterface = {
          top: marker.top,
          left: marker.left,
          status: "success",
          createdBy: deviceId,
          deviceId: deviceId,
          content: "Everything looks good here"
        };
        setMarkers([...markers, newMarker]);
      }}
      markerComponent={CustomMarker}
    />
  )
}

export default Tasks