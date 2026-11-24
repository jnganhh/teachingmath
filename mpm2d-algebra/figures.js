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

function quadraticFigure({a, b, c, xMin, xMax, yMin, yMax, target}) {
  const svg = svgElement("svg", {viewBox:"0 0 330 225", role:"img",
    "aria-label":`Coordinate graph of the given parabola${target === undefined ? "." : ` and the horizontal line y = ${target}.`}`});
  const left = 27, top = 13, width = 278, height = 188;
  const xPos = (x) => (x - xMin) * width / (xMax - xMin);
  const yPos = (y) => (yMax - y) * height / (yMax - yMin);
  const graph = svgElement("svg", {x:left, y:top, width, height, overflow:"hidden"});

  for (let x = xMin; x <= xMax; x++) {
    const px = xPos(x);
    graph.append(svgElement("line", {x1:px,x2:px,y1:0,y2:height,class:x ? "plot-grid" : "plot-axis"}));
    if (x) svg.append(svgElement("text", {x:left+px,y:top+yPos(0)+15,"text-anchor":"middle",class:"plot-tick"}, String(x)));
  }
  for (let y = yMin; y <= yMax; y++) {
    const py = yPos(y);
    graph.append(svgElement("line", {x1:0,x2:width,y1:py,y2:py,class:y ? "plot-grid" : "plot-axis"}));
    if (y && y % 2 === 0) svg.append(svgElement("text", {x:left+xPos(0)-5,y:top+py+4,"text-anchor":"end",class:"plot-tick"}, String(y)));
  }

  const curve = [];
  for (let i = 0; i <= 100; i++) {
    const x = xMin + (xMax-xMin)*i/100;
    curve.push(`${xPos(x)},${yPos(a*x*x + b*x + c)}`);
  }
  graph.append(svgElement("polyline", {points:curve.join(" "),class:"quadratic-curve"}));
  if (target !== undefined) {
    const y = yPos(target);
    graph.append(svgElement("line", {x1:0,x2:width,y1:y,y2:y,class:"target-line"}));
    svg.append(svgElement("text", {x:left+width-5,y:top+y-6,"text-anchor":"end",class:"plot-tick"}, `y = ${target}`));
  }
  svg.prepend(graph);
  svg.append(
    svgElement("text", {x:left+width+8,y:top+yPos(0)+4}, "x"),
    svgElement("text", {x:left+xPos(0)+6,y:top-1}, "y")
  );
  return svg;
}

function renderPracticeFigure(figure, topic, diagram, text) {
  const triangle = topic === "Trigonometry" && diagram;
  const quadratic = topic === "Quadratic equations" && diagram;
  const svg = triangle ? triangleFigure(diagram)
    : quadratic ? quadraticFigure(diagram)
    : topic === "Analytic geometry" ? coordinateFigure(text) : null;
  figure.replaceChildren();
  figure.hidden = !svg;
  if (!svg) return;
  const caption = document.createElement("figcaption");
  caption.textContent = triangle ? "Sketch not to scale" : quadratic ? "Quadratic relation" : "Given coordinates";
  figure.append(svg, caption);
}
