import { Resend } from "resend";

export const resend = new Resend(process.env.TESTING_RESEND_API_KEY);
