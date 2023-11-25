import { UseCase } from "@/src/Shared/application/UseCase";
import { PostsRepository, postsRepository } from "../domain/PostsRepository";

interface Input {
  locale: string;
}

export class GetPostsPagesUseCase implements UseCase<Input, number[]> {
  constructor(private postsRepository: PostsRepository) {}

  public async run({ locale }: Input): Promise<number[]> {
    const totalPages: number = await this.postsRepository.getTotalPages();

    const pages: number[] = new Array(totalPages)
      .fill(0)
      .map((value, index) => index + 1);

    return pages;
  }
}

export const getPostsPagesUseCase = new GetPostsPagesUseCase(postsRepository);
