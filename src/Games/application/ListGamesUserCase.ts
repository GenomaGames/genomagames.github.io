import { routing } from "@/src/i18n/routing";
import { isLocale } from "@/src/lib/isEnumValue";
import { UseCase } from "@/src/Shared/application/UseCase";
import { List } from "@/src/Shared/domain/List";

import { Game } from "../domain/Game";
import { GamesRepository, gamesRepository } from "../domain/GamesRepository";

interface Input {
  locale: string;
}

export class ListGamesUseCase implements UseCase<Input, List<Game>> {
  constructor(private gamesRepository: GamesRepository) {}

  public async run({
    locale = routing.defaultLocale,
  }: Input): Promise<List<Game>> {
    if (!isLocale(locale)) {
      throw new Error(`Locale "${locale}" not valid`);
    }

    const games: List<Game> = await this.gamesRepository.getGames(locale);

    return games;
  }
}

export const listGamesUseCase = new ListGamesUseCase(gamesRepository);
