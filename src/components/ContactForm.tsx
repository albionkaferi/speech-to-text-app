"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty." }),
  email: z.string().min(1, { message: "Email cannot be empty." }),
  message: z.string().min(1, { message: "Message cannot be empty." }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const sendEmail = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.error) {
          throw new Error("Please directly email kevinkaferi@gmail.com");
        }
        return "Message successfully sent!";
      } catch (error) {
        throw error;
      }
    };
    toast.promise(sendEmail(values), {
      loading: "Sending...",
      success: (successMessage) => {
        return successMessage;
      },
      error: (errorMessage) => {
        return errorMessage.toString();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
    </Form>
  );
}
