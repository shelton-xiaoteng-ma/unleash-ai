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
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  aspectRatioOptions,
  formSchema,
  outputFormatOptions,
} from "./constants";

import {
  ResponseType,
  useImageCreatePrediction,
} from "@/features/image/api/use-image-create-prediction";
import { useImageGetPrediction } from "@/features/image/api/use-image-get-prediction";
import { useProModal } from "@/features/subscription/store/use-pro-modal";
import { APIError } from "@/lib/errors";
import { replicatePendingStatus } from "@/lib/replicate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ImagePage() {
  const router = useRouter();
  const { open } = useProModal();
  const [image, setImage] = useState<string | null>(null);
  const predictionIdRef = useRef<string | null>(null);
  const { mutate, isPending: isPendingCreatePrediction } =
    useImageCreatePrediction();

  const { data: imageData, isLoading: isLoadingImage } = useImageGetPrediction(
    predictionIdRef.current
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      aspectRatio: "3:2",
      outputFormat: "webp",
    },
  });

  const resetRef = useRef(form.reset);

  const isLoading = useMemo(() => {
    return (
      isLoadingImage ||
      isPendingCreatePrediction ||
      (imageData?.prediction_status &&
        replicatePendingStatus.includes(imageData?.prediction_status))
    );
  }, [isLoadingImage, isPendingCreatePrediction, imageData]);

  useEffect(() => {
    if (imageData?.imageUrl) {
      setImage(imageData.imageUrl);
      resetRef.current({});
    }
  }, [imageData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setImage(null);
    mutate(
      {
        prompt: values["prompt"],
        aspectRatio: values["aspectRatio"],
        outputFormat: values["outputFormat"],
      },
      {
        onSuccess: (data: ResponseType) => {
          predictionIdRef.current = data.prediction.id;
          router.refresh();
        },
        onError: (error: Error | APIError) => {
          if (error instanceof APIError && error?.response.status === 403) {
            toast.error("Free trial has expired");
            // Open ProModal
            open();
          } else {
            toast.error("Create prediction failed");
          }
        },
      }
    );
  };

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
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Loader className="text-muted-foreground size-20 animate-spin" />
              {imageData?.prediction_status && (
                <p className="text-xl">
                  Prediction current state: {imageData?.prediction_status}.
                </p>
              )}
              <p className="text-muted-foreground text-xl">
                Image generating...
              </p>
            </div>
          )}
          {!isLoading && !image && (
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              No image generated
              {imageData?.prediction_status && (
                <p className="text-muted-foreground">
                  The current prediction has been
                  <span className="pl-2 text-blue-300 underline">
                    {imageData?.prediction_status}
                  </span>
                </p>
              )}
            </div>
          )}
          {image && (
            <div className="relative h-full p-4">
              <Image
                fill
                src={image}
                alt="New Image"
                className="object-contain"
              />
            </div>
          )}
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
                render={({ field: { onChange, value } }) => (
                  <FormItem className="col-span-12 lg:col-span-7">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="A cute puppy"
                        value={value}
                        onChange={onChange}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="aspectRatio"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Aspect Ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        {aspectRatioOptions.map((aspectRatio) => (
                          <SelectItem
                            value={aspectRatio.value}
                            key={aspectRatio.value}
                          >
                            {aspectRatio.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="outputFormat"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
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
                disabled={isLoading}
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
