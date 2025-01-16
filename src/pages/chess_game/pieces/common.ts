export function parseSVG(svg: string): HTMLElement {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  return svgElement;
}
