import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToArray(num: number): number[] {
  return Array.from({ length: num }, (_, i) => i + 1);
}


// @/src/utils/guest.ts
export const getOrCreateGuestId = (): string => {
  const key = "chat_guest_id";
  let guestId = localStorage.getItem(key);

  if (!guestId) {
    const timePart = Date.now().toString(36); // shorter timestamp
    const randomPart = Math.random().toString(36).substring(2, 6); // 4 random chars
    guestId = `g_${timePart}${randomPart}`;
    localStorage.setItem(key, guestId);
  }

  return guestId;
};

