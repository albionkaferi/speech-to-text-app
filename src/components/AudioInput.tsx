"use client"

import { useState } from 'react';

type AudioData = Blob | null;

const AudioInput = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<any | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [showOutput, setShowOutput] = useState<boolean>(false);
  
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

    const audioBlob = await fetch(audioUrl).then(res => res.blob());

    try {
        const response: any = await sendAudioToServer(audioBlob);
        setTranscription(response);
        setShowOutput(true);
    } catch (error) {
        console.error('Failed to transcribe audio', error);
    }
}

  const onCopy = async () => {
    await navigator.clipboard.writeText(transcription);
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
    <div className=''>
    <div className='flex flex-col justify-center items-center bg-neutral-200 rounded-lg shadow-lg p-4 w-auto'>
        <div className='space-x-4'>
            <button onClick={recording ? stopRecording : startRecording} className='bg-green-400 text-white rounded-full py-2 px-3 mb-8'>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <button disabled={audioUrl ? false : true} onClick={onTranscribe} className='bg-blue-400 text-white disabled:bg-neutral-300 disabled:text-neutral-400 rounded-full py-2 px-3'>
                Transcribe
            </button>
        </div>
        <audio src={audioUrl as string} controls className='mb-2'/>
    </div>
    <div id="output" className="mt-12 border-gray-300" hidden={!showOutput}>
        <div className="flex justify-between p-2">
            <h2 className="text-md font-bold text-gray-700">Result</h2>
            <button id="copyBtn" onClick={onCopy} className="px-2 py-1 rounded-md hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            </button>
        </div>
        <textarea value={transcription || ''} className="resize-none w-full max-w-lg px-3 py-2 border rounded-md text-gray-700" rows={4} readOnly={true}></textarea> 
    </div>
    </div>
  );
}

export default AudioInput;
