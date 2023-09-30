"use client"

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import cubes from '../../public/cubes.json';

type AudioData = Blob | null;

const AudioInput = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<any | null>(null);
  const [transitionCompleted, setTransitionCompleted] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const wrapperElement = document.getElementById('wrapper');
    if (audioUrl && !transitionCompleted && wrapperElement) {
      const handleTransitionEnd = () => {
        setTransitionCompleted(true);
      };
      wrapperElement.addEventListener('transitionend', handleTransitionEnd);
      return () => {
        wrapperElement.removeEventListener('transitionend', handleTransitionEnd);
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
      const audioBlob: AudioData = new Blob(audioChunks, { type: 'audio/wav' });
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

    const audioBlob = await fetch(audioUrl).then(res => res.blob());

    try {
        const response: any = await sendAudioToServer(audioBlob);
        setTranscription(response);
        setLoading(false);
    } catch (error) {
        console.error('Failed to transcribe audio', error);
    }
}

  const sendAudioToServer = async (audioBlob: Blob) => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: audioBlob,
        headers: {
          'Content-Type': audioBlob.type,
        },
      });
      const data = await response.json();
      return data.transcription.text;
    } catch (error) {
      console.error('Failed to send audio', error);
    }
  }; 
  
  return (
    <>
    {!showOutput ? 
      <div id='wrapper' className={`flex justify-center items-center transition-all duration-700 ease-in-out ${ audioUrl ? "bg-neutral-100 w-[400px] h-[200px] rounded-2xl" : "bg-teal-300 w-20 h-20 rounded-[50%]"}`}>
          {!audioUrl ?
            <button className='flex justify-center items-center bg-teal-400 rounded-full h-20 w-20 shadow-xl shadow-teal-300' onClick={recording ? stopRecording : startRecording}>
              {recording ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
              </svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
              }
            </button>
          :
          (transitionCompleted && 
            <div className='w-full px-4 space-y-4 flex flex-col items-center'>
              <div className='space-x-4'>
                <button className='py-2 px-3 rounded-full bg-teal-400 text-white' onClick={onTranscribe}>Transcribe</button>
                <button className='py-2 px-3 rounded-full border border-teal-400 text-teal-400'>Restart</button>
              </div>
              <audio src={audioUrl as string} controls className=''/>
            </div>
          )}
      </div>
    : ( loading ? 
        <Lottie animationData={cubes} loop={true} /> 
        :
        <div className='max-w-md w-1/2 p-4 bg-neutral-100 rounded-md divide-y-2'>
          <div className='flex justify-between items-center mb-2'>
            <h1>Result</h1>
            <button>copy</button>
          </div>
          <p className='pt-2 '>
            {transcription}
          </p>
        </div>
      )
    }
    </>
  );
}

export default AudioInput;
