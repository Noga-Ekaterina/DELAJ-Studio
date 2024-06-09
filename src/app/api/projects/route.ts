import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  const { key } = request.query;

  if ( request.query.key ) {
    
  } else {
    return Response.json({message: 'Без ключа'})
  }

  return Response.json({message: 'aaa'})
}