import { routing } from "@/src/i18n/routing";
import { isLocale } from "@/src/lib/isEnumValue";
import { UseCase } from "@/src/Shared/application/UseCase";
import { PaginatedList } from "@/src/Shared/domain/PaginatedList";

import { Post } from "../domain/Post";
import { PostsRepository, postsRepository } from "../domain/PostsRepository";

interface Input {
  page: number;
  locale: string;
}

const MINIMUM_PAGE = 1;

export class ListPostsUseCase implements UseCase<Input, PaginatedList<Post>> {
  constructor(private postsRepository: PostsRepository) {}

  public async run({
    page = 1,
    locale = routing.defaultLocale,
  }: Input): Promise<PaginatedList<Post>> {
    if (!isLocale(locale)) {
      throw new Error(`Locale "${locale}" not valid`);
    }

    const totalPages: number = this.postsRepository.getTotalPages(locale);

    if (totalPages === 0) {
      return {
        entities: [],
        page: page,
        hasMore: page < totalPages,
      };
    }

    if (page > totalPages || page < MINIMUM_PAGE) {
      throw new Error(
        `Invalid page number: ${page} (totalPages: ${totalPages})`,
      );
    }

    const postPaths: string[] =
      await this.postsRepository.getPaginatedPostsPaths({
        page,
        locale,
      });

    const posts = await Promise.all(
      postPaths.map((postPath) =>
        this.postsRepository.getPostByPath({ locale, postPath }),
      ),
    );

    const sortedPosts = posts.sort((postA, postB) =>
      postA.date > postB.date ? -1 : 1,
    );

    return {
      entities: sortedPosts,
      page: page,
      hasMore: page < totalPages,
    };
  }
}

export const listPostsUseCase = new ListPostsUseCase(postsRepository);
