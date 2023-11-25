import { defaultLocale } from "@/src/i18n";
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
    locale = defaultLocale,
  }: Input): Promise<PaginatedList<Post>> {
    const totalPages: number = await this.postsRepository.getTotalPages();

    if (page > totalPages || page < MINIMUM_PAGE) {
      throw new Error(`Invalid page number ${page}`);
    }

    const postPaths: string[] =
      await this.postsRepository.getPaginatedPostsPaths(page);

    const posts = await Promise.all(
      postPaths.map((postPath) => this.postsRepository.getPostByPath(postPath)),
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
