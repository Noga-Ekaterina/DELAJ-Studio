import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import vacancies from '../career'

export async function GET(request: Request) {
  
  return NextResponse.json(vacancies);
}