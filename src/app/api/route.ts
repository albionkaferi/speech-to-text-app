import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";


async function streamToBuffer(readableStream: any) {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}


export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: "No body in request" }, { status: 400 });
  }

  try {
    
    const formData = new FormData();
    const buffer = await streamToBuffer(request.body);
    formData.append('file', buffer, { filename: 'audio.wav', contentType: 'audio/wav' });
    formData.append('model', 'whisper-1');

    const WHISPER_API_ENDPOINT = "https://api.openai.com/v1/audio/transcriptions";
    const TOKEN = process.env.OPEN_AI_KEY;

    const response = await axios.post(WHISPER_API_ENDPOINT, formData, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary}`
    },
    });

    return NextResponse.json({ transcription: response.data });

  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
