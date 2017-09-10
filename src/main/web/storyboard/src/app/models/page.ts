import {Action} from "./action";
import {Author} from "./author";

export interface Page {
  id: number;
  content: string;
  created: string;
  modified: string;
  author: Author;
  actions: Action[];
}
