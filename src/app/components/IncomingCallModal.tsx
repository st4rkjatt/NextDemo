'use client';
import { Phone, PhoneOff } from 'lucide-react';
import { CallerType } from '../utils/helper/types';


export default function IncomingCallModal({ callerName, caller, handleAccept, handleReject }: { callerName: string, caller: string, handleAccept: () => void, handleReject: () => void }) {
console.log(callerName,'caller name')
  return (

    <div className=" bg-gray-900 text-white p-6 rounded-xl shadow-xl w-[40%] h-[60vh]  ">
      <div className="grid grid-cols-1 gap-4 text-center h-full  place-items-center">
        <div className="w-20 h-20 col-start-1  rounded-full bg-gray-700 flex items-center justify-center text-4xl">
          👤
        </div>
        <h2 className="text-xl font-semibold mt-4">{callerName} is calling...</h2>
        <p className="text-sm text-gray-400 mt-1">Incoming video call</p>


        <div className="col-span-1 col-end-2  flex flex-col items-center">

          <div className="flex justify-center gap-6">
            <button
              className="bg-green-500 hover:bg-green-600 p-4 rounded-full cursor-pointer"
              onClick={handleAccept}
            >
              <Phone className="text-white" />
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 p-4 rounded-full cursor-pointer"
              onClick={handleReject}
            >
              <PhoneOff className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
