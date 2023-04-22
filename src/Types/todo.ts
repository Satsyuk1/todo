export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  categorieId: string;
  userId: string;
}

export interface TodoInfo {
  title: string;
  categorieId?: string;
}
