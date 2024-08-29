import { NextRequest } from 'next/server';

export const resolveRequestBody = async <T>(req: NextRequest) => {
  let body;
  req.method !== 'GET' && (body = await req.json());

  return body as T;
};
