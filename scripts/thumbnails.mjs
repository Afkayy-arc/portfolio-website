// Regenerate project thumbnails: `npx -y playwright install chromium && npx -y -p playwright node scripts/thumbnails.mjs` (run from the repo root).
// Renders one designed thumbnail per project (1200x750) from an HTML/SVG template.
import { chromium } from "playwright";
import { writeFileSync } from "fs";

const HUE = { blue: "#60a5fa", violet: "#a78bfa", emerald: "#34d399", amber: "#fbbf24", rose: "#fb7185", cyan: "#22d3ee" };
const DEEP = { blue: "#0b1220", violet: "#120f22", emerald: "#0a1a15", amber: "#1a1408", rose: "#1c0d12", cyan: "#081a1e" };

const seatGrid = (h) => {
  let s = "";
  const states = ["free", "free", "free", "sel", "free", "held", "free", "sold", "free", "free", "sel", "free"];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 14; c++) {
      const st = states[(r * 5 + c * 3) % states.length];
      const fill = st === "sel" ? h : st === "held" ? HUE.amber : st === "sold" ? HUE.rose : "rgba(255,255,255,.10)";
      const op = st === "free" ? 1 : st === "sold" ? 0.55 : 1;
      s += `<rect x="${c * 46}" y="${r * 46}" width="36" height="36" rx="7" fill="${fill}" opacity="${op}"/>`;
    }
  return `<g transform="translate(600,150)">${s}<rect x="170" y="130" width="230" height="140" rx="10" fill="none" stroke="${h}" stroke-width="3" stroke-dasharray="8 6"/><rect x="0" y="-60" width="640" height="26" rx="6" fill="${h}" opacity=".25"/><text x="320" y="-41" text-anchor="middle" font-family="ui-monospace,Menlo" font-size="14" fill="${h}" letter-spacing="6">STAGE</text></g>`;
};

const arcSeats = (h) => {
  let s = "";
  for (let row = 0; row < 6; row++) {
    const R = 240 + row * 46, n = 14 + row * 2;
    for (let i = 0; i < n; i++) {
      const a = Math.PI * (0.12 + (0.76 * i) / (n - 1));
      const x = 900 - R * Math.cos(a), y = 470 - R * Math.sin(a) * 0.62;
      const st = (row * 7 + i * 3) % 11;
      const fill = st === 0 ? h : st === 4 ? HUE.rose : st === 7 ? HUE.amber : "rgba(255,255,255,.12)";
      s += `<circle cx="${x}" cy="${y}" r="11" fill="${fill}"/>`;
    }
  }
  return `<g>${s}<rect x="770" y="480" width="260" height="30" rx="8" fill="${h}" opacity=".3"/><text x="900" y="501" text-anchor="middle" font-family="ui-monospace,Menlo" font-size="13" fill="${h}" letter-spacing="5">STAGE</text><g transform="translate(560,590)"><rect width="330" height="56" rx="28" fill="${h}"/><text x="165" y="35" text-anchor="middle" font-family="-apple-system,Inter,sans-serif" font-size="18" font-weight="600" fill="#0b0b10">Checkout · 2 seats · $90</text></g></g>`;
};

const stars = (h) => {
  const star = (x, y, f) => `<path transform="translate(${x},${y}) scale(2.6)" d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" fill="${f}"/>`;
  return `<g>${[0, 1, 2, 3].map((i) => star(580 + i * 92, 200, h)).join("")}${star(948, 200, "rgba(255,255,255,.15)")}<defs><clipPath id="half"><rect x="948" y="200" width="32" height="70"/></clipPath></defs><g clip-path="url(#half)">${star(948, 200, h)}</g>
  <g transform="translate(580,320)" font-family="-apple-system,Inter,sans-serif" font-size="20" fill="rgba(255,255,255,.75)"><rect width="460" height="130" rx="14" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.12)"/><text x="22" y="40">Loved it. The seekh kebabs were charred</text><text x="22" y="72">just right and the naan came out hot.</text><text x="22" y="104" fill="${h}">Already planning the next visit.</text></g>
  <g transform="translate(580,480)"><rect width="230" height="54" rx="27" fill="${h}"/><text x="115" y="34" text-anchor="middle" font-family="-apple-system,Inter,sans-serif" font-size="17" font-weight="600" fill="#0b0b10">Copy &amp; open Google</text></g>
  <g transform="translate(840,470)" fill="rgba(255,255,255,.6)">${[...Array(36)].map((_, i) => ((i * 7) % 3 ? `<rect x="${(i % 6) * 12}" y="${Math.floor(i / 6) * 12}" width="10" height="10" rx="2"/>` : "")).join("")}</g></g>`;
};

const nodes = (h, labels, accents = []) => {
  const w = 170, gap = 26, y = 300;
  let s = "";
  labels.forEach((l, i) => {
    const x = 545 + i * (w + gap) * 0.6;
    const yy = y + (i % 2 ? 90 : 0);
    const a = accents[i] || h;
    s += `<g transform="translate(${x},${yy})"><rect width="${w}" height="76" rx="14" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)"/><rect x="14" y="16" width="26" height="26" rx="7" fill="${a}" opacity=".9"/><text x="50" y="34" font-family="-apple-system,Inter,sans-serif" font-size="14" font-weight="600" fill="#fff">${l[0]}</text><text x="50" y="56" font-family="-apple-system,Inter,sans-serif" font-size="12" fill="rgba(255,255,255,.55)">${l[1]}</text><circle cx="${w}" cy="38" r="5" fill="${a}"/><circle cx="0" cy="38" r="5" fill="${a}"/></g>`;
    if (i < labels.length - 1) {
      const x2 = 545 + (i + 1) * (w + gap) * 0.6, y1 = yy + 38, y2 = y + ((i + 1) % 2 ? 90 : 0) + 38;
      s += `<path d="M${x + w} ${y1} C ${x + w + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}" fill="none" stroke="${h}" stroke-width="2.5" opacity=".8"/>`;
    }
  });
  return `<g>${s}</g>`;
};

const columns = (h) => {
  const stages = ["extract", "validate", "transform", "reclassify", "load"], cols = [HUE.cyan, HUE.amber, HUE.violet, HUE.blue, HUE.emerald];
  let s = "";
  stages.forEach((st, i) => {
    const x = 560 + i * 118;
    s += `<g transform="translate(${x},170)"><rect width="104" height="380" rx="12" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)"/><text x="12" y="26" font-family="ui-monospace,Menlo" font-size="12" fill="${cols[i]}">${st}</text><circle cx="90" cy="20" r="4" fill="${cols[i]}"/>`;
    for (let r = 0; r < 4 - (i % 2); r++) s += `<rect x="10" y="${48 + r * 62}" width="84" height="48" rx="7" fill="${r === 1 && i === 1 ? "rgba(251,113,133,.25)" : "rgba(255,255,255,.08)"}" stroke="${r === 1 && i === 1 ? HUE.rose : "rgba(255,255,255,.1)"}"/><rect x="18" y="${58 + r * 62}" width="${40 + ((r * 17 + i * 9) % 30)}" height="6" rx="3" fill="rgba(255,255,255,.4)"/><rect x="18" y="${74 + r * 62}" width="28" height="6" rx="3" fill="${cols[(i + r) % 5]}" opacity=".9"/>`;
    s += `</g>`;
    if (i < 4) s += `<path d="M${x + 104} 360 L ${x + 118} 360" stroke="${h}" stroke-width="2.5"/>`;
  });
  s += `<path d="M 720 560 C 720 600, 640 600, 640 560" fill="none" stroke="${HUE.amber}" stroke-width="2.5" stroke-dasharray="6 5"/><text x="600" y="590" font-family="ui-monospace,Menlo" font-size="12" fill="${HUE.amber}">retry ×1</text>`;
  return `<g>${s}</g>`;
};

const search = (h) => `<g transform="translate(560,170)">
  <rect width="580" height="62" rx="31" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.16)"/><circle cx="31" cy="31" r="9" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/><path d="M38 38l7 7" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/><text x="58" y="38" font-family="-apple-system,Inter,sans-serif" font-size="18" fill="rgba(255,255,255,.85)">Can I get my deposit back if I cancel?</text>
  ${[[0.92, HUE.emerald, "kb-012 · Refunds"], [0.67, HUE.blue, "kb-073 · Cancellations"], [0.33, HUE.amber, "kb-080 · Payments"]].map(([sc, c, l], i) => `<g transform="translate(0,${100 + i * 96})"><rect width="580" height="80" rx="14" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)"/><text x="18" y="28" font-family="ui-monospace,Menlo" font-size="13" fill="${c}">${l}</text><text x="560" y="28" text-anchor="end" font-family="ui-monospace,Menlo" font-size="13" fill="${c}">${sc}</text><rect x="18" y="42" width="544" height="6" rx="3" fill="rgba(255,255,255,.1)"/><rect x="18" y="42" width="${544 * sc}" height="6" rx="3" fill="${c}"/><rect x="18" y="58" width="${300 + i * 60}" height="6" rx="3" fill="rgba(255,255,255,.3)"/></g>`).join("")}
  <g transform="translate(0,392)"><rect width="580" height="70" rx="14" fill="${h}" opacity=".14" stroke="${h}"/><text x="18" y="28" font-family="ui-monospace,Menlo" font-size="12" fill="${h}">answer · grounded in kb-012</text><text x="18" y="54" font-family="-apple-system,Inter,sans-serif" font-size="16" fill="#fff">Refunds are issued within 5 to 7 working days.</text></g></g>`;

const phone = (h, inner) => `<g transform="translate(720,120)"><rect width="270" height="540" rx="40" fill="#0d0e12" stroke="rgba(255,255,255,.18)" stroke-width="3"/><rect x="95" y="16" width="80" height="22" rx="11" fill="#000"/><g transform="translate(20,60)">${inner}</g></g>`;

const purrfect = (h) =>
  phone(h, `<circle cx="115" cy="90" r="64" fill="${h}" opacity=".18"/><g transform="translate(78,52)" fill="${h}"><ellipse cx="37" cy="52" rx="24" ry="20"/><circle cx="12" cy="26" r="11"/><circle cx="34" cy="14" r="11"/><circle cx="58" cy="18" r="11"/><circle cx="70" cy="42" r="10"/></g><text x="115" y="188" text-anchor="middle" font-family="-apple-system,Inter,sans-serif" font-size="20" font-weight="600" fill="#fff">Maine Coon · 88%</text><text x="115" y="212" text-anchor="middle" font-family="-apple-system,Inter,sans-serif" font-size="13" fill="rgba(255,255,255,.55)">on-device detection</text>
  ${["Vaccination · 12 Sep", "Vet 1.2 km · open", "Weight 5.4 kg ↑"].map((t, i) => `<g transform="translate(0,${240 + i * 62})"><rect width="230" height="50" rx="12" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.12)"/><circle cx="24" cy="25" r="7" fill="${[HUE.amber, HUE.emerald, h][i]}"/><text x="44" y="31" font-family="-apple-system,Inter,sans-serif" font-size="14" fill="rgba(255,255,255,.85)">${t}</text></g>`).join("")}`);

const blog = (h) => `<g transform="translate(560,150)"><rect width="600" height="460" rx="16" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)"/>
  <rect x="24" y="24" width="150" height="14" rx="7" fill="${h}"/><rect x="24" y="56" width="420" height="22" rx="6" fill="rgba(255,255,255,.85)"/><rect x="24" y="86" width="300" height="22" rx="6" fill="rgba(255,255,255,.85)"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="24" y="${130 + i * 20}" width="${520 - (i % 3) * 90}" height="9" rx="4" fill="rgba(255,255,255,.28)"/>`).join("")}
  <g transform="translate(24,280)"><rect width="250" height="150" rx="12" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.12)"/><text x="16" y="30" font-family="ui-monospace,Menlo" font-size="12" fill="${h}">Authorization: Bearer</text><text x="16" y="54" font-family="ui-monospace,Menlo" font-size="12" fill="rgba(255,255,255,.5)">eyJhbGciOiJIUzI1NiIs…</text><rect x="16" y="76" width="72" height="24" rx="6" fill="${HUE.emerald}" opacity=".25"/><text x="52" y="93" text-anchor="middle" font-family="ui-monospace,Menlo" font-size="12" fill="${HUE.emerald}">admin</text><rect x="96" y="76" width="60" height="24" rx="6" fill="rgba(255,255,255,.1)"/><text x="126" y="93" text-anchor="middle" font-family="ui-monospace,Menlo" font-size="12" fill="rgba(255,255,255,.7)">user</text></g>
  <g transform="translate(300,280)"><rect width="276" height="150" rx="12" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.12)"/><text x="16" y="30" font-family="ui-monospace,Menlo" font-size="12" fill="${HUE.rose}">redis · cache</text><text x="16" y="70" font-family="-apple-system,Inter,sans-serif" font-size="40" font-weight="600" fill="#fff">−60%</text><text x="16" y="96" font-family="-apple-system,Inter,sans-serif" font-size="13" fill="rgba(255,255,255,.55)">database reads</text></g></g>`;

const crm = (h) => `<g transform="translate(560,150)">
  ${["email", "chat", "call"].map((c, i) => `<g transform="translate(0,${i * 90})"><rect width="140" height="60" rx="12" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.12)"/><circle cx="26" cy="30" r="8" fill="${[HUE.blue, HUE.emerald, HUE.amber][i]}"/><text x="46" y="36" font-family="-apple-system,Inter,sans-serif" font-size="15" fill="#fff">${c}</text><path d="M140 30 C 200 30, 200 ${120 - i * 90 + 30}, 250 ${120 - i * 90 + 30}" fill="none" stroke="${h}" stroke-width="2.5" opacity=".7"/></g>`).join("")}
  <g transform="translate(250,110)"><rect width="120" height="80" rx="14" fill="${h}" opacity=".18" stroke="${h}"/><text x="60" y="36" text-anchor="middle" font-family="ui-monospace,Menlo" font-size="12" fill="${h}">n8n webhook</text><text x="60" y="58" text-anchor="middle" font-family="ui-monospace,Menlo" font-size="12" fill="rgba(255,255,255,.7)">→ postgres</text></g>
  <path d="M370 150 L 420 150" stroke="${h}" stroke-width="2.5"/>
  <g transform="translate(420,20)"><rect width="230" height="260" rx="14" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)"/><text x="16" y="28" font-family="ui-monospace,Menlo" font-size="12" fill="rgba(255,255,255,.55)">activity · per rep</text>${[120, 190, 80, 160, 210].map((v, i) => `<rect x="${20 + i * 40}" y="${240 - v}" width="26" height="${v}" rx="5" fill="${[h, h, HUE.amber, h, HUE.emerald][i]}" opacity=".9"/>`).join("")}</g></g>`;

const art = {
  tickly: seatGrid,
  houdini: arcSeats,
  tapreview: stars,
  clinic: (h) => nodes(h, [["WhatsApp", "intake"], ["LLM", "triage"], ["Calendar", "slot"], ["Stripe", "deposit"], ["Reminder", "TTS · 18:00"]], [HUE.emerald, HUE.violet, HUE.blue, HUE.amber, HUE.rose]),
  crm,
  "mern-blog": blog,
  purrfect,
  rag: search,
  etl: columns,
};

const meta = {
  tickly: ["Tickly", "Seat-map ticketing · 1,000+ seats · mutex locks", "blue", "01"],
  houdini: ["Houdini Tickets", "Real-time seat storefront · 500+ concurrent buyers", "violet", "02"],
  tapreview: ["TapReview", "QR → rating → generated review → Google", "amber", "03"],
  clinic: ["Dental clinic automation", "n8n · LLM intake · Stripe · WhatsApp · TTS reminders", "emerald", "04"],
  crm: ["CRM interaction logger", "n8n webhooks → PostgreSQL → per-rep dashboards", "cyan", "05"],
  "mern-blog": ["MERN blog platform", "JWT · roles · rich text · Redis −60% reads", "rose", "06"],
  purrfect: ["Purrfect Assistant", "Flutter · on-device breed detection · vet finder", "violet", "07"],
  rag: ["RAG semantic search", "embeddings · similarity · grounded answers", "blue", "08"],
  etl: ["Transaction ETL", "Airflow · 100K rows/day · validate → reclassify → load", "cyan", "09"],
};

const page = (slug) => {
  const [title, sub, hue, n] = meta[slug];
  const h = HUE[hue];
  return `<!doctype html><html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs><radialGradient id="g" cx="80%" cy="20%" r="80%"><stop offset="0" stop-color="${h}" stop-opacity=".28"/><stop offset="1" stop-color="${h}" stop-opacity="0"/></radialGradient><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="rgba(255,255,255,.08)"/></pattern></defs>
  <rect width="1200" height="750" fill="${DEEP[hue]}"/><rect width="1200" height="750" fill="url(#dots)"/><rect width="1200" height="750" fill="url(#g)"/>
  ${art[slug](h)}
  <g font-family="-apple-system,BlinkMacSystemFont,Inter,system-ui,sans-serif">
    <text x="64" y="120" font-family="ui-monospace,Menlo" font-size="18" fill="${h}">${n}</text>
    <rect x="64" y="150" width="40" height="40" rx="10" fill="${h}"/>
    <text x="64" y="260" font-size="52" font-weight="600" fill="#fff" letter-spacing="-2">${title.length > 18 ? title.split(" ").slice(0, 2).join(" ") : title}</text>
    ${title.length > 18 ? `<text x="64" y="316" font-size="52" font-weight="600" fill="#fff" letter-spacing="-2">${title.split(" ").slice(2).join(" ")}</text>` : ""}
    <text x="64" y="${title.length > 18 ? 366 : 310}" font-size="20" fill="rgba(255,255,255,.62)">${sub}</text>
    <text x="64" y="690" font-family="ui-monospace,Menlo" font-size="14" fill="rgba(255,255,255,.4)">abdullahbuilds.vercel.app</text>
  </g></svg></body></html>`;
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 1 });
for (const slug of Object.keys(meta)) {
  const f = `/tmp/thumb-${slug}.html`;
  writeFileSync(f, page(slug));
  await p.goto("file://" + f);
  await p.screenshot({ path: `${process.cwd()}/public/projects/${slug}.png`, type: "png" });
  console.log("rendered", slug);
}
await b.close();
