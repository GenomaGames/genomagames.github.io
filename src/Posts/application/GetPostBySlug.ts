import { UseCase } from "@/src/Shared/application/UseCase";
import { Post } from "../domain/Post";
import { PostsRepository, postsRepository } from "../domain/PostsRepository";

export class GetPostBySlugUseCase implements UseCase<string, Post> {
  constructor(private postsRepository: PostsRepository) {}

  public async run(slug: string): Promise<Post> {
    return this.postsRepository.getPostBySlug(slug);
  }
}

export const getPostBySlugUseCase = new GetPostBySlugUseCase(postsRepository);
