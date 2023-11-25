export interface PaginatedList<TEntity> {
  entities: TEntity[];
  page: number;
  hasMore: boolean;
}
