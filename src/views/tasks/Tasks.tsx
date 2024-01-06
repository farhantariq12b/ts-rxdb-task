import React, { useEffect } from 'react'
import ImageMarker, { Marker } from 'react-image-marker';
import { CustomMarkerInterface } from '../../interfaces/marker';
import CustomMarker from '../../components/CustomMarker';
import { getUserDetails } from '../../reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMarkerDetails, getMarkersByUser, isMarkerLoading, setMarkers } from '../../reducers/markerSlice';
import Loader from '../../components/Loader';
import { getDatabase } from '../../schemas/db';
import houseImage from '../../assets/images/home.jpeg';

const Tasks: React.FC = () => {
  const user = useAppSelector(getUserDetails);
  const markers = useAppSelector(getMarkersByUser);
  const isLoading = useAppSelector(isMarkerLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMarkerDetails())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Loader />
  }

  const handleMarkerAdd = async (marker: Marker) => {
    try {
      const taskName = prompt("Enter task name");
      const db = await getDatabase();
      const markersCollection = db.markers;

      if (!taskName) {
        return;
      }

      const newMarker: CustomMarkerInterface = {
        id: Date.now(),
        top: marker.top,
        left: marker.left,
        createdBy: user?.username!,
        name: taskName,
      };

      const createdMarker = await markersCollection.insert(newMarker)
      dispatch(setMarkers(createdMarker.toJSON()));

    } catch (error) {
      console.log('Error while adding new marker', error)
    }
  }

  return (
    <ImageMarker
      src={houseImage}
      extraClass="w-[800px] h-[600px]"
      markers={markers}
      onAddMarker={handleMarkerAdd}
      markerComponent={CustomMarker}
    />
  )
}

export default Tasks