import { List } from './List';

export interface PaginatedList<TEntity> extends List<TEntity> {
  page: number;
  hasMore: boolean;
}
