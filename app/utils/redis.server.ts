import * as redis from "redis";
import type { RedisFormData } from "../types/redis";

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (error) => console.log(`Redis client error: ${error}`));

const KEY_VERSION = "1";

export function generateCode(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export async function saveToRedis(data: RedisFormData) {
  await client.connect();
  await client.set(`f-${KEY_VERSION}-${data.formId}`, JSON.stringify(data));
  await client.quit();
}

export async function getDataFromRedis(
  formId: string
): Promise<RedisFormData | null> {
  await client.connect();
  const data = await client.get(`f-${KEY_VERSION}-${formId}`);
  await client.quit();

  if (!data) {
    return null;
  }

  const formData = JSON.parse(data) as RedisFormData;

  return formData;
}

export async function requireRedisData(
  request: Request
): Promise<RedisFormData> {
  const url = new URL(request.url);
  const formId = url.searchParams.get("formId");

  if (typeof formId !== "string" || !formId) {
    throw new Error("Missing formId");
  }

  const formData = await getDataFromRedis(formId);

  if (!formData) {
    throw new Error(`No data found!`);
  }

  return formData;
}

export async function deleteFormData(formId: string) {
  await client.connect();
  await client.del(`f-${KEY_VERSION}-${formId}`);
  await client.quit();
}
