import React from 'react';
import { Tooltip } from 'react-tooltip';
import { generateInitials } from '../../utils';
import { CustomMarkerProps } from '../../interfaces/marker';
import { MarkerComponentProps } from 'react-image-marker';

const CustomMarker: React.FC<MarkerComponentProps> = (props) => {
  const { itemNumber, content, status, createdBy } = props as CustomMarkerProps;

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
          Task Name: {content}
          <br />
          Status: {status}
          <br />
          <button className="block mt-2 px-3 py-2 bg-blue-500 text-white border-none rounded cursor-pointer transition duration-300 ease-in-out hover:bg-blue-700">
            View more
          </button>
        </div>
      </Tooltip>
      {status === 'error' && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-red-500"></span>
      )}
    </div>
  );
};

export default CustomMarker;
