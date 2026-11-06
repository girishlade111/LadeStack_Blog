import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

interface PaletteSpec {
  bgTop: [number, number, number];
  bgBottom: [number, number, number];
  accent: [number, number, number];
  border: [number, number, number];
}

function createEditorialPng(width: number, height: number, spec: PaletteSpec): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowStride = 1 + width * 3;
  const raw = Buffer.alloc(rowStride * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    raw[rowOffset] = 0; // filter type None
    const t = y / (height - 1);
    const baseR = Math.round(spec.bgTop[0] * (1 - t) + spec.bgBottom[0] * t);
    const baseG = Math.round(spec.bgTop[1] * (1 - t) + spec.bgBottom[1] * t);
    const baseB = Math.round(spec.bgTop[2] * (1 - t) + spec.bgBottom[2] * t);

    const isTopAccentBar = y >= 48 && y < 56;
    const isRuleY = y === 120 || y === height - 96;
    const isGridY = y % 60 === 0;

    for (let x = 0; x < width; x++) {
      const px = rowOffset + 1 + x * 3;
      const inMargin = x >= 72 && x < width - 72;

      if (isTopAccentBar && x >= 72 && x < 280) {
        raw[px] = spec.accent[0];
        raw[px + 1] = spec.accent[1];
        raw[px + 2] = spec.accent[2];
      } else if (isRuleY && inMargin) {
        raw[px] = spec.border[0];
        raw[px + 1] = spec.border[1];
        raw[px + 2] = spec.border[2];
      } else if ((isGridY || x % 60 === 0) && inMargin && y > 120 && y < height - 96) {
        raw[px] = Math.round((baseR * 4 + spec.border[0]) / 5);
        raw[px + 1] = Math.round((baseG * 4 + spec.border[1]) / 5);
        raw[px + 2] = Math.round((baseB * 4 + spec.border[2]) / 5);
      } else {
        raw[px] = baseR;
        raw[px + 1] = baseG;
        raw[px + 2] = baseB;
      }
    }
  }

  const idat = zlib.deflateSync(raw, { level: 6 });
  const iend = Buffer.alloc(0);

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', iend),
  ]);
}

const TARGETS: Array<{ relPath: string; palette: PaletteSpec }> = [
  {
    relPath: 'og-default.png',
    palette: {
      bgTop: [251, 250, 247],
      bgBottom: [243, 240, 232],
      accent: [154, 52, 18],
      border: [214, 208, 196],
    },
  },
  {
    relPath: 'images/covers/astro-seo-architecture.png',
    palette: {
      bgTop: [251, 250, 247],
      bgBottom: [241, 238, 228],
      accent: [154, 52, 18],
      border: [210, 203, 190],
    },
  },
  {
    relPath: 'images/covers/grid-storage-thermodynamics.png',
    palette: {
      bgTop: [248, 250, 249],
      bgBottom: [235, 242, 239],
      accent: [15, 118, 110],
      border: [198, 212, 207],
    },
  },
  {
    relPath: 'images/covers/static-publishing-economics.png',
    palette: {
      bgTop: [250, 249, 252],
      bgBottom: [239, 237, 246],
      accent: [29, 78, 216],
      border: [204, 201, 218],
    },
  },
];

function main() {
  for (const target of TARGETS) {
    const outPath = path.join(PUBLIC_DIR, target.relPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const png = createEditorialPng(1200, 630, target.palette);
    fs.writeFileSync(outPath, png);
  }
  console.log(`[social-images] Generated ${TARGETS.length} 1200x630 PNG social preview images in public/.`);
}

main();
