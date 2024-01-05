import React from 'react';
import Property1Empty from '../icons/Property1Empty';
import StatusBox from '../StatusBox';
import Property1Blocked from '../icons/Property1Blocked';
import Property1NotApplicable from '../icons/Property1NotApplicable';
import Property1Completed from '../icons/Property1Completed';

interface ItemDetail {
  title: string;
  description: string;
  status?: 'blocked' | 'notApplicable' | 'completed' | 'empty';
  descriptionStatus?: 'blocked' | 'notApplicable' | 'completed' | 'empty' | 'warning';
}

const statusMappings: Record<string, string> = {
  blocked: 'red',
  notApplicable: 'blue',
  warning: 'yellow',
  completed: 'green',
  empty: 'gray',
};

const iconMappings: Record<string, React.ReactNode> = {
  blocked: <Property1Blocked className="w-[30px] cursor-pointer h-[30px]" />,
  notApplicable: <Property1NotApplicable className="w-[30px] cursor-pointer h-[30px]" />,
  completed: <Property1Completed className="w-[30px] cursor-pointer h-[30px]" />,
  empty: <Property1Empty className="w-[30px] cursor-pointer h-[30px]" />,
};

const Item: React.FC<ItemDetail> = ({ title, description, descriptionStatus = 'empty', status = 'empty' }) => {

  const textColorVariant = {
    red: 'text-red-600',
    gray: 'text-black',
  }[status === 'blocked' ? 'red' : 'gray'];

  const descriptionColorVariant = {
    red: 'text-red-600',
    gray: 'text-gray-400',
  }[status === 'blocked' ? 'red' : 'gray'];

  return (
    <div className="flex px-5 gap-4 items-center">
      {iconMappings[status]}

      <div className="flex flex-col gap-1">
        <h2 className={`font-normal ${textColorVariant} text-[16px] tracking-[0] leading-[22px] whitespace-nowrap`}>
          {title}
        </h2>

        <div className="flex gap-2">
          <StatusBox color={statusMappings[descriptionStatus]} />
          <p className={`font-normal ${descriptionColorVariant} text-[12px] tracking-[0] leading-[normal] whitespace-nowrap`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
