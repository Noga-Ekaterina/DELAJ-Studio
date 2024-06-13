import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import projects from '../../projects'

export async function GET() {
  return NextResponse.json(projects.kids);
}