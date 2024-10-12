import { z } from "zod";

export const userSettings = z.object({
  placeQuestionMark: z.boolean().default(false),
  longPressOnDesktop: z.boolean().default(false),
});

export type UserSettings = z.infer<typeof userSettings>;
export type UserSettingsInput = z.input<typeof userSettings>;
