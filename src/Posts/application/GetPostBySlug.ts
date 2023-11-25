import { isLocale } from "@/src/lib/isEnumValue";
import { UseCase } from "@/src/Shared/application/UseCase";

import { Post } from "../domain/Post";
import { PostsRepository, postsRepository } from "../domain/PostsRepository";

interface Input {
  slug: string;
  locale: string;
}

export class GetPostBySlugUseCase implements UseCase<Input, Post> {
  constructor(private postsRepository: PostsRepository) {}

  public async run({ slug, locale }: Input): Promise<Post> {
    if (!isLocale(locale)) {
      throw new Error(`Locale "${locale}" not valid`);
    }

    return this.postsRepository.getPostBySlug({ slug, locale });
  }
}

export const getPostBySlugUseCase = new GetPostBySlugUseCase(postsRepository);
