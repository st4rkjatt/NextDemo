import React from "react";
import { Video, MicOff, PhoneOff } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

interface VideoCallingProps {
    stream?: MediaStream | null;
    handleCallClose: () => void;
    videoRef: React.RefObject<HTMLVideoElement> | null;
    partnerVideo: React.RefObject<HTMLVideoElement> | null;
}

const VideoCalling: React.FC<VideoCallingProps> = ({
    stream,
    handleCallClose,
    videoRef,
    partnerVideo,
}) => {

    console.log(stream, 'stream in video calling')
    return (
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl w-full max-w-4xl h-[70vh] flex flex-col justify-between">
            {/* Video Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* <VideoPlayer stream={stream} videoRef={videoRef} label="You" />
                <VideoPlayer stream={null} videoRef={partnerVideo} label="Partner" /> */}
                <VideoPlayer stream={stream ?? undefined} videoRef={videoRef} />
                <VideoPlayer stream={undefined} videoRef={partnerVideo} />
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-6">
                <button className="p-4 bg-white text-black rounded-full hover:bg-gray-200">
                    <Video size={20} />
                </button>
                <button className="p-4 bg-white text-black rounded-full hover:bg-gray-200">
                    <MicOff size={20} />
                </button>
                <button
                    onClick={handleCallClose}
                    className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                    <PhoneOff size={20} />
                </button>
            </div>
        </div>
    );
};

export default VideoCalling;
