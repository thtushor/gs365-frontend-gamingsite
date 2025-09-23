import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// @/src/utils/guest.ts
export const getOrCreateGuestId = (): string => {
  const key = "chat_guest_id";
  let guestId = localStorage.getItem(key);

  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem(key, guestId);
  }

  return guestId;
};
