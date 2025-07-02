import { logOutAction } from "@/actions/auth";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sizeToReadable(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 ** 2) {
    return `${Math.round(size / 1024)} KB`;
  } else if (size < 1024 ** 3) {
    return `${(size / 1024 ** 2).toFixed(1)} MB`;
  } else {
    return `${(size / 1024 ** 3).toFixed(2)} GB`;
  }
}

export async function logOutHandler() {
  try {
    await logOutAction();
    toast.info("Çıkış Yapıldı");
  } catch (error: any) {
    console.error("Logout error", error);
    toast.error("Hata Meydana geldi: ", {
      description: error.message,
    });
  }
}
export function createDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createPasswordHash(password: string) {

  const hashed = await bcrypt.hash(password, 10);
  return hashed;
}

export async function checkPassword(plainPassword: string, hashedPassword: string) {

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
