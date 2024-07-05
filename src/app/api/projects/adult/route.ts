import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import projects from '../../project-links'

export async function GET() {
  return NextResponse.json(projects.adult);
}