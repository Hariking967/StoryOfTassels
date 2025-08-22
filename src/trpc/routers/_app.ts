import { baseProcedure, createTRPCRouter } from "../init";
import { bookingRouter } from "@/modules/booking/server/procedure";
import { reviewsRouter } from "@/modules/rateus/server/procedure";

export const appRouter = createTRPCRouter({
  bookings: bookingRouter,
  reviews: reviewsRouter,
});

export type AppRouter = typeof appRouter;
