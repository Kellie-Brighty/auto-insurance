import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "@/common/button/index.component";
import { CameraIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface CaptureImageComponentProps {
  label: string;
  onCaptureImage: (imageDataURL: string) => void;
}

const CaptureImageComponent: React.FC<CaptureImageComponentProps> = ({
  label,
  onCaptureImage,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImg, setCapturedImg] = useState("");

  const handleStartStreaming = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length === 0) {
        // No camera found.
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setStream(mediaStream);
    } catch (error) {
      console.error(error);
      // Something went wrong while searching for the camera.
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const context = canvas.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const capturedImageDataUrl = canvas.toDataURL("image/png");
      onCaptureImage(capturedImageDataUrl);
      setCapturedImg(capturedImageDataUrl);
      console.log(capturedImageDataUrl)

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };
  }, [stream]);

  return (
    <div className={"space-y-2"}>
      <span className={"font-medium"}>{label}</span>

      {!stream ? (
        <button
          onClick={handleStartStreaming}
          className={
            "w-full h-auto aspect-video p-8 flex flex-col items-center justify-center gap-2 text-gray-dark border-2 border-dashed border-gray-main rounded-md cursor-pointer"
          }
        >
          {capturedImg ? (
            <Image src={capturedImg} alt="img" width={200} height={200} />
          ) : (
            <>
              <CameraIcon className={"w-8 h-8"} />
              <span className={"font-medium"}>
                Click here to capture the image.
              </span>
            </>
          )}
        </button>
      ) : (
        <>
          <div className={"relative aspect-video rounded-md overflow-hidden"}>
            <video ref={videoRef} autoPlay></video>
          </div>

          <ButtonComponent
            size={"base"}
            variant={"filled"}
            onClick={handleCaptureImage}
          >
            Capture
          </ButtonComponent>
        </>
      )}
    </div>
  );
};

export default CaptureImageComponent;
