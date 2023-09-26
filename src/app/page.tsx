import AudioInput from "@/components/AudioInput";


export default function Home() {
  return (
    <main className="flex flex-col items-center w-screen h-screen">
      <h1 className="text-6xl font-extrabold text-neutral-700 mt-12 mb-20">
        Transcribely
      </h1>
      
      <AudioInput />
    </main>
  )
}
