import fs from "fs/promises";
import path from "path";

import { Locale } from "@/src/lib/Locale";
import { List } from "@/src/Shared/domain/List";

import { Game, GameData } from "./Game";

export class GamesRepository {
  constructor() {}

  // Transforms GameData from storage to localized Game domain model
  private mapToGame(gameData: GameData, locale: Locale): Game {
    return {
      coverImage: gameData.coverImage,
      isInDevelopment: gameData.isInDevelopment,
      name: gameData.name[locale],
      releasedAt: gameData.releasedAt ? new Date(gameData.releasedAt) : null,
      slug: gameData.slug,
      summary: gameData.summary[locale],
    };
  }

  public async getGames(locale: Locale): Promise<List<Game>> {
    try {
      const gamesFilePath = path.join(
        process.cwd(),
        "data",
        "games",
        "games.json",
      );
      const fileContent = await fs.readFile(gamesFilePath, "utf8");
      const gamesData: GameData[] = JSON.parse(fileContent);

      // Map each GameData to a localized Game domain model
      return {
        entities: gamesData.map(gameData => this.mapToGame(gameData, locale)),
      };
    } catch (error) {
      console.error("Error loading games:", error);
      return { entities: [] };
    }
  }

  public async getGameBySlug(slug: string, locale: Locale): Promise<Game | null> {
    try {
      const { entities } = await this.getGames(locale);
      
      return entities.find(game => game.slug === slug) || null;
    } catch (error) {
      console.error(`Error getting game by slug ${slug}:`, error);
      return null;
    }
  }
}

export const gamesRepository = new GamesRepository();
