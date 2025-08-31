import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const bookingRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt));
    return data;
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        phoneNumber: z.string({
          invalid_type_error: "Phone number is required",
        }),
        loggedin_email: z.string().email("Invalid email address"),
        email: z.string().email("Invalid email address"),
        typeOfService: z.string().min(1, "Type of service is required"),
        date: z.string().min(1, "Name is required"),
        status: z.string().default("Requested"),
        price: z.string().min(1, "Price is required"),
        description: z.string().min(1, "Description is required..."), // Added description
      })
    )
    .mutation(async ({ input }) => {
      const [newBooking] = await db
        .insert(bookings)
        .values({ ...input })
        .returning();
      return newBooking;
    }),
  updatePrice: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        price: z.string().min(1, "Price is required"),
        description: z.string().optional(), // Added description
      })
    )
    .mutation(async ({ input }) => {
      const [updatedBooking] = await db
        .update(bookings)
        .set({
          price: input.price,
          ...(input.description !== undefined && {
            description: input.description,
          }),
        })
        .where(eq(bookings.id, input.id))
        .returning();
      return updatedBooking;
    }),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string().min(1, "Status is required"),
        description: z.string().optional(), // Added description
      })
    )
    .mutation(async ({ input }) => {
      const [updatedBooking] = await db
        .update(bookings)
        .set({
          status: input.status,
          ...(input.description !== undefined && {
            description: input.description,
          }),
        })
        .where(eq(bookings.id, input.id))
        .returning();
      return updatedBooking;
    }),
});
