"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  expectRatioOptions,
  formSchema,
  outputFormatOptions,
} from "./constants";

export default function ImagePage() {
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      ratio: "3:2",
      outputType: "webp",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setImages([]);
    console.log(values);
    form.reset();
  };

  const isPending = false;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <Heading
        title="Image Generation"
        description="Let AI materialize your imagination"
        icon={ImageIcon}
        iconColor="text-purple-600"
        bgColor="text-purple-600/10"
      />
      <div className="px-4 lg:px-8 flex flex-col flex-1">
        <div className="flex flex-col flex-1">
          {isPending && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Loader className="text-muted-foreground size-20 animate-spin" />
              <p className="text-muted-foreground text-xl">
                Images generating...
              </p>
            </div>
          )}
          {!isPending && images.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              No images generated
            </div>
          )}
          {images.length !== 0 && <div>Images will be rendered here</div>}
        </div>

        <div className="py-4">
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
                  <FormItem className="col-span-12 lg:col-span-7">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isPending}
                        placeholder="A cute puppy"
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="ratio"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Expect Ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        {expectRatioOptions.map((expectRatio) => (
                          <SelectItem
                            value={expectRatio.value}
                            key={expectRatio.value}
                          >
                            {expectRatio.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="outputType"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choice output format type" />
                      </SelectTrigger>
                      <SelectContent>
                        {outputFormatOptions.map((outputFormat) => (
                          <SelectItem
                            value={outputFormat.value}
                            key={outputFormat.value}
                          >
                            {outputFormat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                variant="ghost"
                size="icon"
                className="rounded-full relative hover:bg-pink-700/20 col-span-12 ml-auto lg:col-span-1"
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
