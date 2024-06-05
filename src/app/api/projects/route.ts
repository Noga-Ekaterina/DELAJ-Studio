import { projects } from "../data/projects";

//@ts-ignore
export default async function GET(req) {
  return Response.json(projects);
}