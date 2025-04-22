import fs from "fs/promises";
import path from "path";

import { Locale } from "@/src/lib/Locale";
import { List } from "@/src/Shared/domain/List";

import { Game } from "./Game";

export class GamesRepository {
  constructor() {}

  public async getGames(_locale: Locale): Promise<List<Game>> {
    try {
      const gamesFilePath = path.join(
        process.cwd(),
        "data",
        "games",
        "games.json",
      );
      const gamesData = await fs.readFile(gamesFilePath, "utf8");
      const games: Game[] = JSON.parse(gamesData);

      return {
        entities: games.map((game) => ({
          ...game,
          releasedAt: game.releasedAt ? new Date(game.releasedAt) : null,
        })),
      };
    } catch (error) {
      console.error("Error loading games:", error);
      return { entities: [] };
    }
  }

  public async getGameBySlug(slug: string, _locale: Locale): Promise<Game | null> {
    try {
      const { entities } = await this.getGames(_locale);
      
      return entities.find(game => game.slug === slug) || null;
    } catch (error) {
      console.error(`Error getting game by slug ${slug}:`, error);
      return null;
    }
  }
}

export const gamesRepository = new GamesRepository();
