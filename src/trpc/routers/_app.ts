import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { bookingRouter } from "@/modules/booking/server/procedure";

export const appRouter = createTRPCRouter({
  bookings: bookingRouter,
});

export type AppRouter = typeof appRouter;
