"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loading.json";
import RecordButton from "./RecordButton";
import { toast } from "sonner";

type AudioData = Blob | null;

const AudioInput = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<any | null>(null);
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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

  const copy = async () => {
    await navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {!showOutput ? (
        <div className="flex flex-col items-center space-y-8">
          {!audioUrl && (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-lg">
                {recording ? "Listening..." : "Start Recording Below"}
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
          )}
          <div
            id="wrapper"
            className={`flex justify-center items-center transition-all duration-700 ease-in-out ${
              audioUrl
                ? "bg-neutral-100 w-[400px] h-[200px] rounded-2xl"
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
        <div className="flex flex-col max-w-md w-1/2 space-y-4">
          <div className="p-4 bg-neutral-100 rounded-md divide-y-2">
            <div className="flex justify-between items-center mb-2">
              <h1>Result</h1>
              <button id="copyBtn" onClick={copy}>
                {copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="pt-2 ">{transcription}</p>
          </div>
          <button
            className="py-2 px-3 rounded-full border border-teal-400 text-teal-400"
            onClick={restart}
          >
            Restart
          </button>
        </div>
      )}
    </>
  );
};

export default AudioInput;
