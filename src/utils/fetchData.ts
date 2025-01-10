import fsPromises from "fs/promises";
import nodePath from "path";

export const fetchData = async (path: string) => {
  try {
    const filePath = nodePath.join(process.cwd(), `public/Assets/${path}`);
    const jsonData = await fsPromises.readFile(filePath, "utf-8");

    const serializeData = JSON.parse(jsonData);

    return serializeData;
  } catch (error) {
    return error;
  }
};