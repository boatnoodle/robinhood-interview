export type Options<T> = {
  offset?: number;
  limit?: number;
  sort?: SortMongo<T>;
};

export type SortMongo<T> = {
  [key in keyof T]?: 1 | -1;
};
