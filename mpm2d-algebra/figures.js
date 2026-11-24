"use strict";

const svgNamespace = "http://www.w3.org/2000/svg";

function svgElement(tag, attrs, text) {
  const node = document.createElementNS(svgNamespace, tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  if (text !== undefined) node.textContent = text;
  return node;
}

function triangleFigure({opposite, adjacent, hypotenuse, angle = "θ"}) {
  const labels = [["opposite", opposite], ["adjacent", adjacent], ["hypotenuse", hypotenuse]];
  const description = labels.filter(([, value]) => value).map(([name, value]) => `${name} ${value === "?" ? "unknown" : value}`);
  const svg = svgElement("svg", {
    viewBox:"0 0 330 176", role:"img",
    "aria-label":`Right triangle, angle ${angle}. ${description.join(", ")}. Sketch not to scale.`
  });
  svg.append(
    svgElement("path", {d:"M32 143 L242 143 L242 25 Z", class:"triangle-outline"}),
    svgElement("path", {d:"M229 143 V130 H242", class:"diagram-mark"}),
    svgElement("path", {d:"M65 143 A33 33 0 0 0 61 127", class:"diagram-mark"}),
    svgElement("text", {x:82,y:137,class:"diagram-angle"}, angle)
  );
  if (opposite) svg.append(svgElement("text", {x:252,y:89}, opposite));
  if (adjacent) svg.append(svgElement("text", {x:137,y:166,"text-anchor":"middle"}, adjacent));
  if (hypotenuse) svg.append(svgElement("text", {x:118,y:79,"text-anchor":"middle"}, hypotenuse));
  return svg;
}

function coordinateFigure(text) {
  const matches = Array.from(text.matchAll(/\b([ABC]|[Pp]oint)?\s*\(\s*([−-]?\d+)\s*,\s*([−-]?\d+)\s*\)/g));
  const points = matches.map(([, name, x, y]) => ({
    name: name?.length === 1 ? name : "", x:Number(x.replace("−","-")), y:Number(y.replace("−","-"))
  })).filter(({x,y}) => Number.isFinite(x) && Number.isFinite(y));
  const unique = points.filter((point, i) => points.findIndex(({x,y}) => x === point.x && y === point.y) === i);
  if (!unique.length) return null;

  const xMin = Math.min(0, ...unique.map(({x}) => x)) - 1;
  const xMax = Math.max(0, ...unique.map(({x}) => x)) + 1;
  const yMin = Math.min(0, ...unique.map(({y}) => y)) - 1;
  const yMax = Math.max(0, ...unique.map(({y}) => y)) + 1;
  const scale = Math.min(270 / (xMax - xMin), 165 / (yMax - yMin));
  const width = (xMax - xMin) * scale;
  const height = (yMax - yMin) * scale;
  const xPos = (x) => (330 - width) / 2 + (x - xMin) * scale;
  const yPos = (y) => (210 - height) / 2 + (yMax - y) * scale;
  const svg = svgElement("svg", {viewBox:"0 0 330 210",role:"img",
    "aria-label":`Coordinate plane with points ${unique.map(({name,x,y}) => `${name} (${x}, ${y})`).join(", ")}.`});
  const step = Math.max(1, Math.ceil(15 / scale));
  for (let x = Math.ceil(xMin/step)*step; x <= xMax; x += step) {
    svg.append(svgElement("line", {x1:xPos(x),x2:xPos(x),y1:yPos(yMin),y2:yPos(yMax),class:x ? "plot-grid" : "plot-axis"}));
  }
  for (let y = Math.ceil(yMin/step)*step; y <= yMax; y += step) {
    svg.append(svgElement("line", {x1:xPos(xMin),x2:xPos(xMax),y1:yPos(y),y2:yPos(y),class:y ? "plot-grid" : "plot-axis"}));
  }
  svg.append(
    svgElement("text", {x:xPos(xMax)+5,y:yPos(0)+4}, "x"),
    svgElement("text", {x:xPos(0)+5,y:yPos(yMax)-4}, "y"),
    svgElement("text", {x:xPos(0)-5,y:yPos(0)+14,"text-anchor":"end"}, "0"),
    svgElement("text", {x:165,y:205,"text-anchor":"middle",class:"plot-scale"}, `Grid spacing: ${step} ${step === 1 ? "unit" : "units"}`)
  );
  for (const {name,x,y} of unique) {
    const px = xPos(x);
    const py = yPos(y);
    const right = px < 165;
    svg.append(
      svgElement("circle", {cx:px,cy:py,r:4.5,class:"plot-point"}),
      svgElement("text", {x:px+(right ? 7 : -7),y:py-7,"text-anchor":right ? "start" : "end",class:"plot-label"}, name || `(${x}, ${y})`)
    );
  }
  return svg;
}

function renderPracticeFigure(figure, topic, diagram, text) {
  const triangle = topic === "Trigonometry" && diagram;
  const svg = triangle ? triangleFigure(diagram) : topic === "Analytic geometry" ? coordinateFigure(text) : null;
  figure.replaceChildren();
  figure.hidden = !svg;
  if (!svg) return;
  const caption = document.createElement("figcaption");
  caption.textContent = triangle ? "Sketch not to scale" : "Given coordinates";
  figure.append(svg, caption);
}
