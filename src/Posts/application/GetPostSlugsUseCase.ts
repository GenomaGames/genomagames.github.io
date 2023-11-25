import { isLocale } from "@/src/lib/isEnumValue";
import { UseCase } from "@/src/Shared/application/UseCase";

import { PostsRepository, postsRepository } from "../domain/PostsRepository";

interface Input {
  locale: string;
}

export class GetPostSlugsUseCase implements UseCase<Input, string[]> {
  constructor(private postsRepository: PostsRepository) {}

  public async run({ locale }: Input): Promise<string[]> {
    if (!isLocale(locale)) {
      throw new Error(`Locale "${locale}" not valid`);
    }

    return this.postsRepository.getPostSlugs(locale);
  }
}

export const getPostSlugsUseCase = new GetPostSlugsUseCase(postsRepository);
