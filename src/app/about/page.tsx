import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Globe, Speech, Keyboard } from "lucide-react";

const uses = [
  {
    icon: <Speech size={28} />,
    title: "Accessibility",
    description:
      "Provide individuals with hearing impairments real-time transcriptions.",
  },
  {
    icon: <Globe size={28} />,
    title: "Translation",
    description:
      "Transcribe the most common languages in the world in seconds.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-notebook-pen"
      >
        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
        <path d="M2 6h4" />
        <path d="M2 10h4" />
        <path d="M2 14h4" />
        <path d="M2 18h4" />
        <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
      </svg>
    ),
    title: "Note Taking",
    description:
      "Speak your thoughts and have them transcribed into text for quick notes.",
  },
  {
    icon: <Keyboard size={28} />,
    title: "Typing Alternative",
    description: "Save time replacing tedious typing with effortless speaking.",
  },
];

const faq = [
  {
    value: "item-1",
    trigger: "Is this free?",
    content: "Yes, this is 100% free to use.",
  },
  {
    value: "item-2",
    trigger: "Is my audio saved?",
    content:
      "We do not store any of your audio data or transcriptions on our servers.",
  },
  {
    value: "item-3",
    trigger: "How does this work?",
    content: "Transcriptions are generated using OpenAI's Whisper model.",
  },
  {
    value: "item-4",
    trigger: "What languages are supported?",
    content:
      "Afrikaans, Arabic, Armenian, Azerbaijani, Belarusian, Bosnian, Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Galician, German, Greek, Hebrew, Hindi, Hungarian, Icelandic, Indonesian, Italian, Japanese, Kannada, Kazakh, Korean, Latvian, Lithuanian, Macedonian, Malay, Marathi, Maori, Nepali, Norwegian, Persian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swahili, Swedish, Tagalog, Tamil, Thai, Turkish, Ukrainian, Urdu, Vietnamese, and Welsh.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-extrabold text-2xl mb-6">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-9/12 mb-12">
        {faq.map((item) => (
          <AccordionItem value={item.value} key={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <h1 className="font-extrabold text-2xl mb-6">Use Cases</h1>
      <div className="grid md:grid-cols-2 gap-4 place-content-center mb-8">
        {uses.map((item, index) => (
          <div
            className="flex flex-col w-[260px] border rounded-md p-4"
            key={index}
          >
            <div className="flex">
              {item.icon}
              <h2 className="font-semibold text-xl mb-2 ml-2">{item.title}</h2>
            </div>
            <p className="text-neutral-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
