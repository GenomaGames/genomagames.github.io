import { UseCase } from "@/src/Shared/application/UseCase";
import { PostsRepository, postsRepository } from "../domain/PostsRepository";

interface Input {
  locale: string;
}

export class GetPostSlugsUseCase implements UseCase<Input, string[]> {
  constructor(private postsRepository: PostsRepository) {}

  public async run(input: Input): Promise<string[]> {
    return this.postsRepository.getPostSlugs();
  }
}

export const getPostSlugsUseCase = new GetPostSlugsUseCase(postsRepository);
