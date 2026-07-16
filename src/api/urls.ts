import api from "./axios";
import type { Url } from "../types";

interface CreateUrlPayload {
  originalUrl: string;
  customAlias?: string;
}

export const createShortUrl = async (
  payload: CreateUrlPayload,
): Promise<Url> => {
  const res = await api.post("/api/urls", payload);
  return res.data.data;
};

export const getUserUrls = async (): Promise<Url[]> => {
  const res = await api.get("/api/urls");
  return res.data.data;
};
