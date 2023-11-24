"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loading.json";
import RecordButton from "./RecordButton";
import { toast } from "sonner";
import Dots from "./Dots";
import Output from "./Output";

type AudioData = Blob | null;

const AudioInput = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<any | null>(null);
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const wrapperElement = document.getElementById("wrapper");
    if (audioUrl && !transitionCompleted && wrapperElement) {
      const handleTransitionEnd = () => {
        setTransitionCompleted(true);
      };
      wrapperElement.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        wrapperElement.removeEventListener(
          "transitionend",
          handleTransitionEnd
        );
      };
    }
  }, [audioUrl, transitionCompleted]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const localMediaRecorder = new MediaRecorder(stream);
    const audioChunks: BlobPart[] = [];

    localMediaRecorder.ondataavailable = (event: BlobEvent) => {
      audioChunks.push(event.data);
    };

    localMediaRecorder.onstop = () => {
      const audioBlob: AudioData = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl: string = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    };

    setMediaRecorder(localMediaRecorder);
    localMediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = (): void => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);

      mediaRecorder.stream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    }
  };

  const onTranscribe = async () => {
    if (!audioUrl) return;

    setShowOutput(true);
    setLoading(true);

    const audioBlob = await fetch(audioUrl).then((res) => res.blob());

    try {
      const response: any = await sendAudioToServer(audioBlob);
      setTranscription(response);
      setLoading(false);
    } catch (error) {
      console.error("Failed to transcribe audio", error);
    }
  };

  const sendAudioToServer = async (audioBlob: Blob) => {
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: audioBlob,
        headers: {
          "Content-Type": audioBlob.type,
        },
      });
      const data = await response.json();
      return data.transcription.text;
    } catch (error) {
      toast.error("Failed to send audio.");
    }
  };

  const restart = () => {
    setAudioUrl(null);
    setShowOutput(false);
    setTransitionCompleted(false);
  };

  return (
    <div className="relative w-full h-[400px] flex justify-center items-center overflow-hidden">
      {!audioUrl && (
        <div className="absolute top-1/2 left-1/2">
          <Dots />
        </div>
      )}
      {!showOutput ? (
        <div
          id="wrapper"
          className={`flex justify-center items-center transition-all duration-700 ease-in-out ${
            audioUrl
              ? "bg-neutral-50 outline outline-1 outline-neutral-200 w-[400px] h-[200px] rounded-2xl"
              : "bg-teal-400 w-20 h-20 rounded-[50%]"
          }`}
        >
          {!audioUrl ? (
            <RecordButton
              recording={recording}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
          ) : (
            transitionCompleted && (
              <div className="w-full px-4 space-y-4 flex flex-col items-center">
                <div className="space-x-4">
                  <button
                    className="py-2 px-3 rounded-full bg-teal-400 text-white"
                    onClick={onTranscribe}
                  >
                    Transcribe
                  </button>
                  <button
                    className="py-2 px-3 rounded-full border border-teal-400 text-teal-400"
                    onClick={restart}
                  >
                    Restart
                  </button>
                </div>
                <audio src={audioUrl as string} controls className="" />
              </div>
            )
          )}
        </div>
      ) : loading ? (
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{
            width: 600,
            height: 500,
            overflow: "hidden",
            position: "relative",
          }}
        />
      ) : (
        <Output transcription={transcription} restart={restart} />
      )}
    </div>
  );
};

export default AudioInput;
