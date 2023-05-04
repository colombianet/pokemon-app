export interface Pokemon {
  id:       number;
  name:     string;
  image:    string;
  attack:   number;
  defense:  number;
  hp:       number;
  type?:     Type;
  idAuthor: number;
}

export enum Type {
  Default = "default",
  Original = "Original",
}
