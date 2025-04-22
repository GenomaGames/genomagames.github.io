import { Locale } from "@/src/lib/Locale";

export type LocalizedString = {
  [key in Locale]: string;
};

// The raw data model as stored in JSON
export interface GameData {
  coverImage: {
    src: string;
  } | null;
  isInDevelopment: boolean;
  name: LocalizedString;
  releasedAt: string | null; // ISO date string in storage
  slug: string;
  summary: LocalizedString;
}

// The domain model used in the application
export interface Game {
  coverImage: {
    src: string;
  } | null;
  isInDevelopment: boolean;
  name: string; // Already localized
  releasedAt: Date | null; // Converted to Date object
  slug: string;
  summary: string; // Already localized
}
