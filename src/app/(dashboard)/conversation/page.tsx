"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ResponseType as sendMessageResponseType,
  useSendMessage,
} from "@/features/conversation/api/use-send-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as z from "zod";
import { formSchema } from "./constants";

export default function ConversationPage() {
  const [messages, setMessages] = useState<sendMessageResponseType["messages"]>(
    []
  );
  const mutation = useSendMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutation.mutate(
      { message: values["prompt"] },
      {
        onSuccess: (data) => {
          setMessages(data.messages);
          form.reset();
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <Heading
        title="Conversation"
        description="Try some interesting conversations with the AI ​​model"
        icon={MessageSquare}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8 flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="relative min-h-full">
            <div className="absolute inset-0 bg-[url('/logo.png')] bg-no-repeat bg-center bg-[length:60%] opacity-20"></div>
            <div className="relative z-10 space-y-4 p-4">
              {messages.map(
                (
                  message: sendMessageResponseType["messages"][number],
                  index: number
                ) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-pink-700 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <ReactMarkdown
                        className={`prose ${
                          message.role === "user"
                            ? "prose-invert"
                            : "prose-gray"
                        } max-w-none`}
                        components={{
                          pre: ({ ...props }) => (
                            <div className="overflow-auto w-full my-2 rounded-lg bg-gray-800 p-2">
                              <pre {...props} />
                            </div>
                          ),
                          code: ({ ...props }) => (
                            <code
                              className="bg-gray-800 rounded-lg p-1"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg border 
                w-full p-4 px-3 md:px-6 
                focus-within::shadow-sm
                grid grid-cols-12 gap-2
                bg-white
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={mutation.isPending}
                        placeholder="Send message to AI"
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={mutation.isPending}
                variant="ghost"
                size="icon"
                className="rounded-full relative hover:bg-pink-700/20 col-span-12 ml-auto lg:col-span-2"
              >
                <Image src="/chatgpt_send.svg" alt="send" fill />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
