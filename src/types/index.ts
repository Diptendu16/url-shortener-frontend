export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Url {
  _id: string;
  originalUrl: string;
  shortCode: string;
  owner: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}
