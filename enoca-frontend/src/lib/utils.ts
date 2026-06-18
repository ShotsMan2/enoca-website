import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Birleştirilmiş tailwind sınıflarını oluşturmak için yardımcı fonksiyon.
 * Hem clsx (koşullu sınıflar) hem de tailwind-merge (çakışan sınıfları çözme) kullanır.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
