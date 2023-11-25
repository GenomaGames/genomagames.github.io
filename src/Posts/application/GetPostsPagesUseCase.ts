import { isLocale } from "@/src/lib/isEnumValue";
import { UseCase } from "@/src/Shared/application/UseCase";

import { PostsRepository, postsRepository } from "../domain/PostsRepository";

interface Input {
  locale: string;
}

export class GetPostsPagesUseCase implements UseCase<Input, number[]> {
  constructor(private postsRepository: PostsRepository) {}

  public async run({ locale }: Input): Promise<number[]> {
    if (!isLocale(locale)) {
      throw new Error(`Locale "${locale}" not valid`);
    }

    const totalPages: number = await this.postsRepository.getTotalPages(locale);

    const pages: number[] = new Array(totalPages)
      .fill(0)
      .map((value, index) => index + 1);

    return pages;
  }
}

export const getPostsPagesUseCase = new GetPostsPagesUseCase(postsRepository);
