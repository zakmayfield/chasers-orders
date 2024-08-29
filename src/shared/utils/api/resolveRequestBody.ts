import { NextRequest } from 'next/server';

export const resolveRequestBody = async (req: NextRequest) => {
  let body;
  req.method !== 'GET' && (body = await req.json());

  return body;
};
