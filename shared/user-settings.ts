import { z } from "zod";

export const userSettings = z.object({
  placeQuestionMark: z.boolean().default(false),
  longPressOnDesktop: z.boolean().default(false),
  showRevealAnimation: z.boolean().refine((v) => typeof v === "undefined" || v),
});

export type UserSettings = z.infer<typeof userSettings>;
export type UserSettingsInput = z.input<typeof userSettings>;
