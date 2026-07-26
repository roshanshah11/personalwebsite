// Generates src/components/constellationData.ts from the HYG v4.4 catalogue.
// Field stars give each figure genuine detail; the asterism line lists are
// authored here by star name (NOT taken from Stellarium, which is GPL).
//
// Usage:
//   curl -L -o hyg.csv.gz \
//     https://codeberg.org/astronexus/hyg/media/branch/main/data/hyg/CURRENT/hyg_v44.csv.gz
//   node scripts/gen-constellations.mjs hyg.csv.gz src/components/constellationData.ts
//
// Set PLOT=1 to print an ASCII preview of each projected figure.
// The catalogue itself is ~13 MB and is deliberately not committed.
import { writeFileSync, createReadStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { createInterface } from "node:readline";

const SRC = process.argv[2];
const OUT = process.argv[3];
const MAG_LIMIT = 7.0;

// Asterisms keyed by constellation abbreviation. Each entry names its stars
// (Bayer abbreviation as it appears in HYG's `bayer` column) and the strokes
// that connect them. Authored from standard star-chart geometry.
const ASTERISMS = {
    Ori: {
        name: "Orion",
        stars: ["Alp", "Gam", "Del", "Eps", "Zet", "Kap", "Bet"],
        // Betelgeuse Bellatrix Mintaka Alnilam Alnitak Saiph Rigel
        lines: [["Alp", "Gam"], ["Gam", "Del"], ["Del", "Eps"], ["Eps", "Zet"],
            ["Zet", "Alp"], ["Zet", "Kap"], ["Del", "Bet"], ["Kap", "Bet"]],
    },
    UMa: {
        name: "Big Dipper",
        stars: ["Alp", "Bet", "Gam", "Del", "Eps", "Zet", "Eta"],
        lines: [["Alp", "Bet"], ["Bet", "Gam"], ["Gam", "Del"], ["Del", "Alp"],
            ["Del", "Eps"], ["Eps", "Zet"], ["Zet", "Eta"]],
    },
    Cas: {
        name: "Cassiopeia",
        stars: ["Bet", "Alp", "Gam", "Del", "Eps"],
        lines: [["Bet", "Alp"], ["Alp", "Gam"], ["Gam", "Del"], ["Del", "Eps"]],
    },
    Cyg: {
        name: "Cygnus",
        stars: ["Alp", "Gam", "Bet", "Eps", "Del"],
        lines: [["Alp", "Gam"], ["Gam", "Bet"], ["Eps", "Gam"], ["Gam", "Del"]],
    },
    Lyr: {
        name: "Lyra",
        stars: ["Alp", "Zet", "Bet", "Gam", "Del"],
        lines: [["Alp", "Zet"], ["Zet", "Bet"], ["Bet", "Gam"], ["Gam", "Del"], ["Del", "Zet"]],
    },
    Sco: {
        name: "Scorpius",
        stars: ["Bet", "Del", "Pi", "Alp", "Tau", "Eps", "Mu", "Zet", "Eta", "The", "Iot", "Kap", "Lam", "Ups"],
        lines: [["Bet", "Del"], ["Pi", "Del"], ["Del", "Alp"], ["Alp", "Tau"], ["Tau", "Eps"],
            ["Eps", "Mu"], ["Mu", "Zet"], ["Zet", "Eta"], ["Eta", "The"], ["The", "Iot"],
            ["Iot", "Kap"], ["Kap", "Lam"], ["Lam", "Ups"]],
    },
    Leo: {
        name: "Leo",
        stars: ["Eps", "Mu", "Zet", "Gam", "Eta", "Alp", "Del", "Bet", "The"],
        lines: [["Eps", "Mu"], ["Mu", "Zet"], ["Zet", "Gam"], ["Gam", "Eta"], ["Eta", "Alp"],
            ["Gam", "Del"], ["Del", "Bet"], ["Bet", "The"], ["The", "Alp"]],
    },
    Cru: {
        name: "Crux",
        stars: ["Alp", "Bet", "Gam", "Del"],
        lines: [["Gam", "Alp"], ["Bet", "Del"]],
    },
};

function splitCsv(line) {
    const out = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') { q = !q; continue; }
        if (c === "," && !q) { out.push(cur); cur = ""; continue; }
        cur += c;
    }
    out.push(cur);
    return out;
}

const rows = [];
const rl = createInterface({
    input: createReadStream(SRC).pipe(createGunzip()),
    crlfDelay: Infinity,
});

let header = null;
let idx = {};
for await (const line of rl) {
    if (!header) {
        header = splitCsv(line);
        header.forEach((h, i) => { idx[h.replace(/"/g, "")] = i; });
        continue;
    }
    if (!line) continue;
    const f = splitCsv(line);
    const con = f[idx.con];
    if (!ASTERISMS[con]) continue;
    const mag = parseFloat(f[idx.mag]);
    if (!Number.isFinite(mag) || mag > MAG_LIMIT) continue;
    const ra = parseFloat(f[idx.ra]);   // decimal hours
    const dec = parseFloat(f[idx.dec]); // degrees
    if (!Number.isFinite(ra) || !Number.isFinite(dec)) continue;
    rows.push({
        con,
        mag,
        ra: ra * 15 * Math.PI / 180, // hours -> radians
        dec: dec * Math.PI / 180,
        bayer: f[idx.bayer],
        comp: parseInt(f[idx.comp] || "1", 10),
        proper: f[idx.proper],
    });
}

const DEG = 180 / Math.PI;

// Gnomonic (tangent-plane) projection about a center. X is negated so the
// result reads the way the sky does from the ground, with RA increasing left.
function project(star, ra0, dec0) {
    const dra = star.ra - ra0;
    const cosc = Math.sin(dec0) * Math.sin(star.dec) +
        Math.cos(dec0) * Math.cos(star.dec) * Math.cos(dra);
    if (cosc <= 0.2) return null; // behind/too far from the tangent point
    const x = (Math.cos(star.dec) * Math.sin(dra)) / cosc;
    const y = (Math.cos(dec0) * Math.sin(star.dec) -
        Math.sin(dec0) * Math.cos(star.dec) * Math.cos(dra)) / cosc;
    return [-x * DEG, y * DEG];
}

// Debug-only ASCII preview so the projected figures can be eyeballed.
function plot(name, stars, lines) {
    const W = 61, H = 25;
    const grid = Array.from({ length: H }, () => new Array(W).fill(" "));
    const px = (x) => Math.round(((x + 20) / 40) * (W - 1));
    const py = (y) => Math.round(((20 - y) / 40) * (H - 1));
    const set = (c, r, ch) => { if (r >= 0 && r < H && c >= 0 && c < W) grid[r][c] = ch; };
    for (const [a, b] of lines) {
        const [x0, y0] = [px(stars[a][0]), py(stars[a][1])];
        const [x1, y1] = [px(stars[b][0]), py(stars[b][1])];
        const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
        for (let i = 0; i <= steps; i++) {
            set(Math.round(x0 + ((x1 - x0) * i) / steps), Math.round(y0 + ((y1 - y0) * i) / steps), ".");
        }
    }
    for (const [x, y, mag] of stars) {
        if (mag < 3.5) set(px(x), py(y), "@");
        else if (mag < 5) set(px(x), py(y), "o");
    }
    console.log(`\n--- ${name} ---`);
    console.log(grid.map((r) => r.join("")).join("\n"));
}

const result = [];

for (const [abbr, def] of Object.entries(ASTERISMS)) {
    const all = rows.filter((r) => r.con === abbr);

    // Resolve each named Bayer star to its brightest matching component.
    const named = {};
    for (const key of def.stars) {
        // Doubles carry a superscript in HYG ("Bet-1" for Albireo), so accept a
        // trailing index and take the brightest component as the chart star.
        const matches = all.filter((r) => r.bayer.replace(/-?\d+$/, "") === key);
        if (!matches.length) { console.warn(`MISSING ${abbr} ${key}`); continue; }
        matches.sort((a, b) => a.mag - b.mag);
        named[key] = matches[0];
    }

    // Tangent point = mean direction of the asterism stars.
    const anchors = Object.values(named);
    const ra0 = Math.atan2(
        anchors.reduce((s, r) => s + Math.sin(r.ra), 0),
        anchors.reduce((s, r) => s + Math.cos(r.ra), 0)
    );
    const dec0 = anchors.reduce((s, r) => s + r.dec, 0) / anchors.length;

    // Project the asterism, measure its extent, then normalize to local units.
    const anchorXY = {};
    for (const [k, r] of Object.entries(named)) {
        const p = project(r, ra0, dec0);
        if (p) anchorXY[k] = p;
    }
    const xs = Object.values(anchorXY).map((p) => p[0]);
    const ys = Object.values(anchorXY).map((p) => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const halfW = Math.max(...xs.map((x) => Math.abs(x - cx)));
    const halfH = Math.max(...ys.map((y) => Math.abs(y - cy)));
    const extent = Math.max(halfW, halfH);
    const TARGET = 13; // local units for the figure's larger half-extent
    const k = TARGET / extent;

    // Field stars: everything in the constellation that lands inside a modest
    // margin around the asterism, so we get real texture without sprawl.
    const stars = [];
    const keyToIndex = {};
    const LIMIT = TARGET * 1.5;
    for (const r of all) {
        const p = project(r, ra0, dec0);
        if (!p) continue;
        const x = (p[0] - cx) * k;
        const y = (p[1] - cy) * k;
        if (Math.abs(x) > LIMIT || Math.abs(y) > LIMIT * 0.95) continue;
        const namedKey = Object.keys(named).find((kk) => named[kk] === r);
        if (namedKey) keyToIndex[namedKey] = stars.length;
        stars.push([Math.round(x * 100) / 100, Math.round(y * 100) / 100, Math.round(r.mag * 10) / 10]);
    }

    // Any asterism star clipped by the margin gets appended so lines resolve.
    for (const key of Object.keys(anchorXY)) {
        if (keyToIndex[key] !== undefined) continue;
        const p = anchorXY[key];
        keyToIndex[key] = stars.length;
        stars.push([
            Math.round((p[0] - cx) * k * 100) / 100,
            Math.round((p[1] - cy) * k * 100) / 100,
            Math.round(named[key].mag * 10) / 10,
        ]);
    }

    const lines = def.lines
        .filter(([a, b]) => keyToIndex[a] !== undefined && keyToIndex[b] !== undefined)
        .map(([a, b]) => [keyToIndex[a], keyToIndex[b]]);

    result.push({ name: def.name, abbr, stars, lines });
    console.log(`${def.name.padEnd(12)} ${String(stars.length).padStart(4)} stars, ${lines.length} strokes`);
    if (process.env.PLOT) plot(def.name, stars, lines);
}

const total = result.reduce((s, c) => s + c.stars.length, 0);
console.log(`TOTAL ${total} stars`);

const body = `// GENERATED FILE — do not edit by hand.
// Real star positions for eight constellations, derived from the HYG v4.4
// stellar database (https://codeberg.org/astronexus/hyg), which is licensed
// CC BY-SA 4.0 by David Nash / astronexus.
//
// Every star down to magnitude ${MAG_LIMIT.toFixed(1)} within each figure's frame is included, so the
// shape reads from the real star field rather than from a stick figure alone.
// Coordinates are a gnomonic projection about each constellation's mean
// direction, scaled to local scene units; \`mag\` is real apparent magnitude
// (lower is brighter). Asterism strokes are authored in-house from standard
// chart geometry — deliberately NOT Stellarium's line data, which is GPL.

export type StarConstellation = {
    name: string;
    abbr: string;
    /** [x, y, apparent magnitude] in local units. */
    stars: [number, number, number][];
    /** Index pairs into \`stars\` defining each asterism stroke. */
    lines: [number, number][];
};

export const STAR_CONSTELLATIONS: StarConstellation[] = ${JSON.stringify(result, null, 4)
        .replace(/\[\n {16}/g, "[")
        .replace(/,\n {16}/g, ", ")
        .replace(/\n {12}\]/g, "]")
    };
`;

writeFileSync(OUT, body);
console.log(`wrote ${OUT}`);
