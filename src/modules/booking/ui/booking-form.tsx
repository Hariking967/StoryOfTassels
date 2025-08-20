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
import { OctagonAlertIcon, OctagonIcon } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string({ invalid_type_error: "Phone number is required" }),
  email: z.string().email("Invalid email address"),
  loggedin_email: z.string().email("Invalid email"),
  typeOfService: z.string().min(1, "Type of service is required"),
  date: z.string().min(1, "Name is required"),
});

export default function BookingForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(trpc.bookings.getMany.queryOptions());
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
    },
  });
  const createBooking = useMutation(
    trpc.bookings.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.bookings.getMany.queryOptions()
        );
        router.push("/booking/success");
      },
      onError: (error) => {
        console.error(error);
        router.push("/booking/failed");
      },
    })
  );
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { data: session } = authClient.useSession();
    createBooking.mutate({
      ...data,
      loggedin_email: session?.user.email ?? "nosession@gmail.com",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-10 pt-10 h-screen bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b]">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 w-100 md:p-8"
              >
                <div className="flex flex-col g-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Booking Form</h1>
                  </div>
                  <div className="grid gap-3 m-1.5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="me@gmail.com"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    ></FormField>
                  </div>
                  <div className="grid gap-3 m-1.5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="me@gmail.com"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="1234567890"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="typeOfService"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Service</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="birthday"
                                {...field}
                              ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                placeholder="01-08-2025"
                                {...field}
                                value={field.value || ""}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>
                  </div>
                  {!!error && (
                    <Alert className="bg-destructive/10 border-none m-1.5">
                      <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}
                  <Button
                    disabled={pending}
                    className="w-full m-1.5"
                    type="submit"
                  >
                    Book
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        {(() => {
          const { data: session } = authClient.useSession();
          return (
            <div className="w-full max-w-2xl mt-8 space-y-4">
              {data
                ?.filter(
                  (d: any) =>
                    d.loggedin_email ===
                    (session?.user.email ?? "nosession@gmail.com")
                )
                .map((d: any, idx: number) => (
                  <Card
                    key={d.id ?? idx}
                    className="flex flex-row items-center justify-between p-4"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">{d.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {d.typeOfService}
                      </span>
                      <span className="text-xs text-gray-500">{d.date}</span>
                    </div>
                    <div className="ml-8">
                      <span className="px-3 py-1 rounded bg-gray-100 text-gray-800 text-sm font-medium">
                        {d.status}
                      </span>
                    </div>
                  </Card>
                ))}
            </div>
          );
        })()}
      </div>
    </>
  );
}
