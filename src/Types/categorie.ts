export interface Categorie {
  _id: string;
  name: string;
  color: string;
  userId: string;
}

export type CategorieInfo = Omit<Categorie, "_id" | "userId">;
