import { Breakpoint } from "@/types";

export default function getBreakpoint(viewport: number): Breakpoint {
  if (viewport > 1200) {
    return 'max';
  } else if (viewport < 1200 && viewport > 1025) {
    return 'lg';
  } else if (viewport < 1025 && viewport > 768) {
    return 'md';
  }
  return 'sm';
}