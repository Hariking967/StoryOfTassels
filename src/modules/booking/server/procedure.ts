import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const bookingRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx, input }) => {
    const data = await db.select().from(bookings).orderBy(desc(bookings.date));
    return data;
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        phoneNumber: z.string({
          invalid_type_error: "Phone number is required",
        }),
        email: z.string().email("Invalid email address"),
        loggedin_email: z.string().email("Invalid email address"),
        typeOfService: z.string().min(1, "Type of service is required"),
        date: z.string().min(1, "Name is required"),
        status: z.string().default("Requested"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [newBooking] = await db
        .insert(bookings)
        .values({ ...input })
        .returning();
      return newBooking;
    }),
});
