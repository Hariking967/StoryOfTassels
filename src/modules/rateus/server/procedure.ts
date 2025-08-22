import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";

export const reviewsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt), desc(reviews.stars));
    return data;
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        stars: z.enum(["1", "2", "3", "4", "5"]), // must be string
        review: z.string().min(1, "Review is required"),
      })
    )
    .mutation(async ({ input }) => {
      const [newReview] = await db
        .insert(reviews)
        .values({ ...input })
        .returning();
      return newReview;
    }),
});
