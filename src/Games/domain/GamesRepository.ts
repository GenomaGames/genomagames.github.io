import { Locale } from "@/src/lib/Locale";
import { List } from "@/src/Shared/domain/List";

import { Game } from "./Game";

export class GamesRepository {
  constructor() {}

  public async getGames(locale: Locale): Promise<List<Game>> {
    const games: List<Game> = {
      entities: [],
    };

    return games;
  }
}

export const gamesRepository = new GamesRepository();
