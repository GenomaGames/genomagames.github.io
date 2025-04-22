import { routing } from "@/src/i18n/routing";
import { isLocale } from "@/src/lib/isEnumValue";
import { UseCase } from "@/src/Shared/application/UseCase";

import { Game } from "../domain/Game";
import { GamesRepository, gamesRepository } from "../domain/GamesRepository";

interface Input {
  locale: string;
  slug: string;
}

export class GetGameBySlugUseCase implements UseCase<Input, Game | null> {
  constructor(private gamesRepository: GamesRepository) {}

  public async run({
    locale = routing.defaultLocale,
    slug,
  }: Input): Promise<Game | null> {
    if (!isLocale(locale)) {
      throw new Error(`Locale "${locale}" not valid`);
    }

    if (!slug) {
      throw new Error("Slug is required");
    }

    const game = await this.gamesRepository.getGameBySlug(slug, locale);

    return game;
  }
}

export const getGameBySlugUseCase = new GetGameBySlugUseCase(gamesRepository);