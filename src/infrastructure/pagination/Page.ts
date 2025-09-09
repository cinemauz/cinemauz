export interface Page<T> {
  data: T[];
  totalElement: number;
  totalPages: number;
  pageSize: number;
}

type customeQueryOptionDetails = {
  query: string;
  parameters: unknown[];
};

export interface findAllCustomeQueryOptions {
  data: customeQueryOptionDetails;
  count: customeQueryOptionDetails;
  take?: number;
}
