import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import projects from '../projects';

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = request.nextUrl;
      const id = searchParams.get('id');
      const project = projects.find(item => item.id === id);
      if (project) {
        return NextResponse.json({item: project});
      } else {
        return NextResponse.json({item: null});
      }
    } catch {
      return NextResponse.json({item: null});
    }
}