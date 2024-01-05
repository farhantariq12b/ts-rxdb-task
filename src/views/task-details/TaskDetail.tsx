import React from 'react'
import arrowDownSVG from '../../assets/svgs/arrow-down.svg'
import Item from '../../components/Item';
import StatusBox from '../../components/StatusBox';


const TaskDetail: React.FC = () => {
  return (
    <>
      <div className="bg-greywhite border border-solid border-gray-200 p-5">
        <div className='text-lg font-semibold'>
          Task Name
        </div>
        <div className="flex gap-2 items-center">
          <StatusBox color='red' />
          <p className="text-red-600">Ticket progress is blocked</p>
        </div>
      </div>

      <div className="relative bg-greywhite border border-solid border-gray-200">
        <div className="p-5 flex justify-between border-b items-center border-solid border-b-gray-200 cursor-pointer">
          <h2 className="font-semibold text-greyblack text-[18px] leading-[normal] whitespace-nowrap">
            Checklist
          </h2>

          <img src={arrowDownSVG} alt="arrow-down svg" className="w-[12px] h-[12px]" />
        </div>


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
            7 STEPS
          </div>
        </div>

        <div className='gap-5 flex flex-col pt-5'>
          <Item
            title="Check item 1"
            description="Not started"
            status='empty'
          />

          <Item
            title="Electrical connection, general, 3-pin. Electrical"
            description="Blocked :Part installation done"
            status='blocked'
            descriptionStatus='blocked'
          />

          <Item
            title="Electrical connection, general, 3-pin. Electrical"
            description="Blocked :Part installation done"
            status='notApplicable'
            descriptionStatus='notApplicable'
          />

          <Item
            title="Electrical connection, general, 3-pin. Electrical"
            description="Blocked :Part installation done"
            descriptionStatus='warning'
          />

          <Item
            title="Electrical connection, general, 3-pin. Electrical"
            description="Blocked :Part installation done"
            status='completed'
            descriptionStatus='completed'
          />

          <Item
            title="Electrical connection, general, 3-pin. Electrical"
            description="Blocked :Part installation done"
            status='completed'
            descriptionStatus='notApplicable'
          />

          <Item
            title="Electrical connection, general, 3-pin. Electrical"
            description="Blocked :Part installation done"
            status='completed'
            descriptionStatus='warning'
          />

        </div>

        <div className="p-5 font-medium text-blue-500 text-[16px] tracking-[0] leading-[22px] whitespace-nowrap flex gap-4 items-center cursor-pointer">
          <img
            className="w-[30px] h-[30px]"
            alt="Icon checklist"
            src="https://c.animaapp.com/Lso8nhQc/img/icon-checklist-3.svg"
          />
          ADD NEW ITEM
        </div>

      </div>
    </>
  )
}

export default TaskDetail