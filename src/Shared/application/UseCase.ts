export interface UseCase<TInput = unknown, TOutput = unknown> {
  run(input: TInput): Promise<TOutput>;
}
