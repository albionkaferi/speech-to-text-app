import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex flex-col items-center space-y-1 mb-8">
        <h1 className="font-extrabold text-2xl">Contact Us</h1>
        <h2>Send us suggestions, issues, and other inquiries.</h2>
        <div>
          <a href="mailto:kevinkaferi@gmail.com" className="flex">
            <span className="underline ml-2">kevinkaferi@gmail.com</span>
          </a>
        </div>
      </div>
      <div className="bg-white rounded-md p-4 w-full max-w-md">
        <ContactForm />
      </div>
    </div>
  );
}
