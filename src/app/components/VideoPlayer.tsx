import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{ stream?: MediaStream; videoRef: React.RefObject<HTMLVideoElement> | null }> = ({ stream, videoRef }) => {

    useEffect(() => {
        if (videoRef?.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);
    console.log(stream,'streamy')
    return (
        <video
            data-testid="peer-video"
            style={{ width: "100%" }}
            ref={videoRef}
            autoPlay
            muted={true}
        />
    );
};
