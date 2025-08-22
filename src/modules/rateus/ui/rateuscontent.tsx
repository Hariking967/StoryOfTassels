"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  stars: z.enum(["1", "2", "3", "4", "5"], {
    errorMap: () => ({ message: "Stars must be between 1 and 5" }),
  }),
  review: z.string().min(3, "Message must be at least 3 characters"),
});

export default function ReviewForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: reviews } = useSuspenseQuery(
    trpc.reviews.getMany.queryOptions()
  );

  type reviewType = {
    id: string;
    name: string;
    stars: string;
    review: string;
  };

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  const createReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.reviews.getMany.queryOptions()
        );
        router.push("/rateus/success");
      },
      onError: (err) => {
        setError("Review submission failed. Please try again.");
        console.error("Mutation error:", err);
        router.push("/rateus/failed");
      },
    })
  );

  const onSubmit = (values: z.infer<typeof reviewSchema>) => {
    createReview.mutate({
      ...values,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10 pt-10 min-h-screen bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b]">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 w-100 md:p-8"
            >
              <div className="flex flex-col g-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Leave a Review</h1>
                </div>

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stars */}
                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stars</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="1 - 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!!error && (
                  <Alert className="bg-destructive/10 border-none m-1.5">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  disabled={createReview.isPending}
                  className="w-full m-1.5"
                  type="submit"
                >
                  {createReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
