// // "use client";

// // import React, { useState } from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { useForm } from "react-hook-form";
// // import { useRouter } from "next/navigation";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Alert, AlertTitle } from "@/components/ui/alert";
// // import { OctagonAlertIcon, OctagonIcon } from "lucide-react";
// // import Link from "next/link";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import { useTRPC } from "@/trpc/client";
// // import { useSuspenseQuery } from "@tanstack/react-query";
// // import { authClient } from "@/lib/auth-client";

// // const formSchema = z.object({
// //   name: z.string().min(1, "Name is required"),
// //   phoneNumber: z.string({ invalid_type_error: "Phone number is required" }),
// //   email: z.string().email("Invalid email address"),
// //   loggedin_email: z.string().email("Invalid email"),
// //   typeOfService: z.string().min(1, "Type of service is required"),
// //   date: z.string().min(1, "Name is required"),
// // });

// // export default function BookingForm() {
// //   const router = useRouter();
// //   const [error, setError] = useState<string | null>(null);
// //   const [pending, setPending] = useState(false);
// //   const trpc = useTRPC();
// //   const queryClient = useQueryClient();
// //   const { data } = useSuspenseQuery(trpc.bookings.getMany.queryOptions());
// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       date: "",
// //     },
// //   });
// //   const createBooking = useMutation(
// //     trpc.bookings.create.mutationOptions({
// //       onSuccess: async () => {
// //         await queryClient.invalidateQueries(
// //           trpc.bookings.getMany.queryOptions()
// //         );
// //         router.push("/booking/success");
// //       },
// //       onError: (error) => {
// //         console.error(error);
// //         router.push("/booking/failed");
// //       },
// //     })
// //   );
// //   const onSubmit = (data: z.infer<typeof formSchema>) => {
// //     const { data: session } = authClient.useSession();
// //     createBooking.mutate({
// //       ...data,
// //       loggedin_email: session?.user.email ?? "nosession@gmail.com",
// //       price: "--",
// //     });
// //   };

// //   return (
// //     <>
// //       <div className="flex flex-col items-center gap-6 mt-10 pt-10 h-screen bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b]">
// //         <Card className="overflow-hidden p-0">
// //           <CardContent className="grid p-0">
// //             <Form {...form}>
// //               <form
// //                 onSubmit={form.handleSubmit(onSubmit)}
// //                 className="p-6 w-100 md:p-8"
// //               >
// //                 <div className="flex flex-col g-6">
// //                   <div className="flex flex-col items-center text-center">
// //                     <h1 className="text-2xl font-bold">Booking Form</h1>
// //                   </div>
// //                   <div className="grid gap-3 m-1.5">
// //                     <FormField
// //                       control={form.control}
// //                       name="name"
// //                       render={({ field }) => {
// //                         return (
// //                           <FormItem>
// //                             <FormLabel>Name</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="text"
// //                                 placeholder="me@gmail.com"
// //                                 {...field}
// //                               ></Input>
// //                             </FormControl>
// //                             <FormMessage></FormMessage>
// //                           </FormItem>
// //                         );
// //                       }}
// //                     ></FormField>
// //                   </div>
// //                   <div className="grid gap-3 m-1.5">
// //                     <FormField
// //                       control={form.control}
// //                       name="email"
// //                       render={({ field }) => {
// //                         return (
// //                           <FormItem>
// //                             <FormLabel>Email</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="email"
// //                                 placeholder="me@gmail.com"
// //                                 {...field}
// //                               ></Input>
// //                             </FormControl>
// //                             <FormMessage></FormMessage>
// //                           </FormItem>
// //                         );
// //                       }}
// //                     ></FormField>
// //                     <FormField
// //                       control={form.control}
// //                       name="phoneNumber"
// //                       render={({ field }) => {
// //                         return (
// //                           <FormItem>
// //                             <FormLabel>Phone Number</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="text"
// //                                 placeholder="1234567890"
// //                                 {...field}
// //                               ></Input>
// //                             </FormControl>
// //                             <FormMessage></FormMessage>
// //                           </FormItem>
// //                         );
// //                       }}
// //                     ></FormField>
// //                     <FormField
// //                       control={form.control}
// //                       name="typeOfService"
// //                       render={({ field }) => {
// //                         return (
// //                           <FormItem>
// //                             <FormLabel>Service</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="text"
// //                                 placeholder="birthday"
// //                                 {...field}
// //                               ></Input>
// //                             </FormControl>
// //                             <FormMessage></FormMessage>
// //                           </FormItem>
// //                         );
// //                       }}
// //                     ></FormField>
// //                     <FormField
// //                       control={form.control}
// //                       name="date"
// //                       render={({ field }) => {
// //                         return (
// //                           <FormItem>
// //                             <FormLabel>Date</FormLabel>
// //                             <FormControl>
// //                               <Input
// //                                 type="date"
// //                                 placeholder="01-08-2025"
// //                                 {...field}
// //                                 value={field.value || ""}
// //                                 onChange={field.onChange}
// //                               />
// //                             </FormControl>
// //                             <FormMessage />
// //                           </FormItem>
// //                         );
// //                       }}
// //                     ></FormField>
// //                   </div>
// //                   {!!error && (
// //                     <Alert className="bg-destructive/10 border-none m-1.5">
// //                       <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
// //                       <AlertTitle>{error}</AlertTitle>
// //                     </Alert>
// //                   )}
// //                   <Button
// //                     disabled={pending}
// //                     className="w-full m-1.5"
// //                     type="submit"
// //                   >
// //                     Book
// //                   </Button>
// //                 </div>
// //               </form>
// //             </Form>
// //           </CardContent>
// //         </Card>
// //         {(() => {
// //           const { data: session } = authClient.useSession();
// //           return (
// //             <div className="w-full max-w-2xl mt-8 space-y-4">
// //               {data
// //                 ?.filter(
// //                   (d: any) =>
// //                     d.loggedin_email ===
// //                     (session?.user.email ?? "nosession@gmail.com")
// //                 )
// //                 .map((d: any, idx: number) => (
// //                   <Card
// //                     key={d.id ?? idx}
// //                     className="flex flex-row items-center justify-between p-4"
// //                   >
// //                     <div className="flex flex-col">
// //                       <span className="font-semibold text-lg">{d.name}</span>
// //                       <span className="text-sm text-muted-foreground">
// //                         {d.typeOfService}
// //                       </span>
// //                       <span className="text-xs text-gray-500">{d.date}</span>
// //                     </div>
// //                     {/* Middle section: show price only if price !== '--' */}
// //                     {d.price !== "--" && (
// //                       <div className="flex flex-col items-center justify-center flex-1">
// //                         <span className="text-lg font-bold">${d.price}</span>
// //                       </div>
// //                     )}
// //                     <div className="ml-8">
// //                       <span className="px-3 py-1 rounded bg-gray-100 text-gray-800 text-sm font-medium">
// //                         {d.status}
// //                       </span>
// //                     </div>
// //                   </Card>
// //                 ))}
// //             </div>
// //           );
// //         })()}
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { OctagonAlertIcon } from "lucide-react";
// import Link from "next/link";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { authClient } from "@/lib/auth-client";

// const formSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   phoneNumber: z.string({ invalid_type_error: "Phone number is required" }),
//   email: z.string().email("Invalid email address"),
//   loggedin_email: z.string().email("Invalid email"),
//   typeOfService: z.string().min(1, "Type of service is required"),
//   date: z.string().min(1, "Name is required"),
// });

// export default function BookingForm() {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const [pending, setPending] = useState(false);
//   const trpc = useTRPC();
//   const queryClient = useQueryClient();

//   // Wrap data fetching in try/catch
//   const { data, error: e } = useSuspenseQuery(
//     trpc.bookings.getMany.queryOptions()
//   );
//   if (e) {
//     console.log(e);
//   }

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       date: "",
//     },
//   });

//   const createBooking = useMutation(
//     trpc.bookings.create.mutationOptions({
//       onSuccess: async () => {
//         try {
//           await queryClient.invalidateQueries(
//             trpc.bookings.getMany.queryOptions()
//           );
//           router.push("/booking/success");
//         } catch (err) {
//           setError("Failed to refresh bookings after creation.");
//           console.error("Error onSuccess (invalidate/push):", err);
//         }
//       },
//       onError: (error) => {
//         setError("Booking failed. Please try again.");
//         console.error("Mutation error:", error);
//         router.push("/booking/failed");
//       },
//     })
//   );

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     try {
//       const { data: session } = authClient.useSession();
//       createBooking.mutate({
//         ...data,
//         loggedin_email: session?.user.email ?? "nosession@gmail.com",
//         price: "--",
//       });
//     } catch (err) {
//       setError("Unexpected error during booking.");
//       console.error("onSubmit error:", err);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center gap-6 mt-10 pt-10 h-screen bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b]">
//         <Card className="overflow-hidden p-0">
//           <CardContent className="grid p-0">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="p-6 w-100 md:p-8"
//               >
//                 <div className="flex flex-col g-6">
//                   <div className="flex flex-col items-center text-center">
//                     <h1 className="text-2xl font-bold">Booking Form</h1>
//                   </div>
//                   <div className="grid gap-3 m-1.5">
//                     <FormField
//                       control={form.control}
//                       name="name"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="text"
//                               placeholder="me@gmail.com"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="grid gap-3 m-1.5">
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="email"
//                               placeholder="me@gmail.com"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="phoneNumber"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Phone Number</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="text"
//                               placeholder="1234567890"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="typeOfService"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Service</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="text"
//                               placeholder="birthday"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="date"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Date</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="date"
//                               placeholder="01-08-2025"
//                               {...field}
//                               value={field.value || ""}
//                               onChange={field.onChange}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   {!!error && (
//                     <Alert className="bg-destructive/10 border-none m-1.5">
//                       <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
//                       <AlertTitle>{error}</AlertTitle>
//                     </Alert>
//                   )}
//                   <Button
//                     disabled={pending}
//                     className="w-full m-1.5"
//                     type="submit"
//                   >
//                     Book
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//         {(() => {
//           try {
//             const { data: session } = authClient.useSession();
//             return (
//               <div className="w-full max-w-2xl mt-8 space-y-4">
//                 {data
//                   ?.filter(
//                     (d: any) =>
//                       d.loggedin_email ===
//                       (session?.user.email ?? "nosession@gmail.com")
//                   )
//                   .map((d: any, idx: number) => (
//                     <Card
//                       key={d.id ?? idx}
//                       className="flex flex-row items-center justify-between p-4"
//                     >
//                       <div className="flex flex-col">
//                         <span className="font-semibold text-lg">{d.name}</span>
//                         <span className="text-sm text-muted-foreground">
//                           {d.typeOfService}
//                         </span>
//                         <span className="text-xs text-gray-500">{d.date}</span>
//                       </div>
//                       {/* Middle section: show price only if price !== '--' */}
//                       {d.price !== "--" && (
//                         <div className="flex flex-col items-center justify-center flex-1">
//                           <span className="text-lg font-bold">${d.price}</span>
//                         </div>
//                       )}
//                       <div className="ml-8">
//                         <span className="px-3 py-1 rounded bg-gray-100 text-gray-800 text-sm font-medium">
//                           {d.status}
//                         </span>
//                       </div>
//                     </Card>
//                   ))}
//               </div>
//             );
//           } catch (err) {
//             setError("Failed to render bookings list.");
//             console.error("Error rendering bookings list:", err);
//             return null;
//           }
//         })()}
//       </div>
//     </>
//   );
// }

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
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  typeOfService: z.string().min(1, "Type of service is required"),
  date: z.string().min(1, "Date is required"),
});

export default function BookingForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  // Query bookings
  const { data: bookings } = useSuspenseQuery(
    trpc.bookings.getMany.queryOptions()
  );
  type bookingType = {
    name: string;
    phoneNumber: string;
    email: string;
    typeOfService: string;
    date: string;
    status: string;
    id: string;
    loggedin_email: string;
    price: string;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { date: "" },
  });

  const createBooking = useMutation(
    trpc.bookings.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.bookings.getMany.queryOptions()
        );
        router.push("/booking/success");
      },
      onError: (err) => {
        setError("Booking failed. Please try again.");
        console.error("Mutation error:", err);
        router.push("/booking/failed");
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createBooking.mutate({
      ...values,
      loggedin_email: session?.user.email ?? "nosession@gmail.com",
      price: "--", // backend will update later
    });
    await fetch("/api/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.TESTING_ADMIN_EMAIL,
        to: process.env.TESTING_ADMIN_EMAIL,
        subject: "NEW BOOKING!",
        body: `Booked by: ${values.name}\n for: ${values.typeOfService}\n on: ${values.date}\nContact: ${values.phoneNumber}\n Email: ${values.email}`,
      }),
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
                  <h1 className="text-2xl font-bold">Booking Form</h1>
                </div>

                {/* Form fields */}
                {["name", "email", "phoneNumber", "typeOfService", "date"].map(
                  (fieldName) => (
                    <div className="grid gap-3 m-1.5" key={fieldName}>
                      <FormField
                        control={form.control}
                        name={fieldName as keyof z.infer<typeof formSchema>}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{fieldName}</FormLabel>
                            <FormControl>
                              <Input
                                type={fieldName === "date" ? "date" : "text"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                )}

                {!!error && (
                  <Alert className="bg-destructive/10 border-none m-1.5">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button
                  disabled={createBooking.isPending}
                  className="w-full m-1.5"
                  type="submit"
                >
                  {createBooking.isPending ? "Booking..." : "Book"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {/* Booking list */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        <p className="text-4xl font-semibold text-center w-full">
          Your Bookings
        </p>
        {bookings
          ?.filter(
            (d: bookingType) =>
              d.loggedin_email ===
              (session?.user.email ?? "nosession@gmail.com")
          )
          .map((d: bookingType, idx: number) => (
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
              {d.price !== "--" && (
                <div className="flex flex-col items-center justify-center flex-1">
                  <span className="text-lg font-bold">${d.price}</span>
                </div>
              )}
              <div className="ml-8">
                <span className="px-3 py-1 rounded bg-gray-100 text-gray-800 text-sm font-medium">
                  {d.status === "Completed" ? (
                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => router.push("/rateus")}
                    >
                      Rate
                    </Button>
                  ) : (
                    d.status
                  )}
                </span>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
