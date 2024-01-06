import React from 'react';
import { Tooltip } from 'react-tooltip';
import { generateInitials } from '../../utils';
import { CustomMarkerProps } from '../../interfaces/marker';
import { MarkerComponentProps } from 'react-image-marker';
import { useNavigate } from 'react-router-dom';

const CustomMarker: React.FC<MarkerComponentProps> = (props) => {
  const navigate = useNavigate();
  const { itemNumber, id, name, createdBy } = props as CustomMarkerProps;

  return (
    <div className="relative inline-block">
      <div
        id={`component_${itemNumber}`}
        className="relative inline-block px-3 py-2 bg-blue-500 text-white text-decoration-none rounded transition duration-300 ease-in-out hover:before:border-t-blue-700 hover:bg-blue-700 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-2/4
        before:border-8 before:border-transparent before:border-t-blue-500 " 
      >
        {generateInitials(createdBy)}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-t-8 border-transparent border-blue-500"></div>
      </div>
      <Tooltip
        anchorSelect={`#component_${itemNumber}`}
        clickable
        place="bottom"
        className="flex justify-center"
      >
        <div>
          Task Name: {name}
          <br />
          Created by: {createdBy}
          <br />
          <button className="block mt-2 px-3 py-2 bg-blue-500 text-white border-none rounded cursor-pointer transition duration-300 ease-in-out hover:bg-blue-700" onClick={() => navigate(`/task-detail/${id}`)}>
            View more
          </button>
        </div>
      </Tooltip>
    </div>
  );
};

export default CustomMarker;
