import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <h1 className="font-extrabold text-2xl mb-8">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-9/12">
        {faq.map((item) => (
          <AccordionItem value={item.value} key={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
