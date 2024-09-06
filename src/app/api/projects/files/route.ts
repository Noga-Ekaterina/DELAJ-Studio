import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id || !type) {
    return NextResponse.json({ message: 'Missing id or type' }, { status: 400 });
  }

  const directoryPath = path.join(process.cwd(), `public/Assets/Projects/${type[0].toUpperCase() + type.slice(1)}/Project-${id}/Content`);

  try {
    const files = await fs.promises.readdir(directoryPath);
    return NextResponse.json(files.sort((a: string, b: string) => {
      const aNum = +a.slice(0, a.indexOf('.'));
      const bNum = +b.slice(0, b.indexOf('.'));
      return (aNum > bNum) ? 1 : -1
    }));
  } catch (error) {
    console.error('Error reading directory:', error);

    const errorMessage = (error as Error).message || 'Unknown error';

    return NextResponse.json({ message: 'Error reading files', error: errorMessage }, { status: 500 });
  }
}
