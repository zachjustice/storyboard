export interface Action {
  id: number;
  description: string;
  created: string;
  modified: string;
  author: number;
  prevPage: number;
  nextPage: number;
}
