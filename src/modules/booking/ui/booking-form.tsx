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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.number({ invalid_type_error: "Phone number is required" }),
  email: z.string().email("Invalid email address"),
  typeOfService: z.string().min(1, "Type of service is required"),
  date: z.string().min(1, "Name is required"),
});

export default function BookingForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {};

  return (
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
    </div>
  );
}
