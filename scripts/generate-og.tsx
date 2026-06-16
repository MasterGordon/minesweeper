import { ImageResponse } from "@vercel/og";
import sharp from "sharp";
import { join } from "node:path";

const root = join(import.meta.dir, "..");

const MINE_SIZE = 160;

// Mirrors the --bg-brand gradient from src/index.css
const BG_BRAND =
  "linear-gradient(225deg, rgb(251, 175, 21), rgb(251, 21, 242), rgb(21, 198, 251))";

const fontsourceDir = join(root, "node_modules/@fontsource");
const titleFont = await Bun.file(
  join(
    fontsourceDir,
    "spline-sans-mono/files/spline-sans-mono-latin-700-normal.woff",
  ),
).arrayBuffer();
const bodyFont = await Bun.file(
  join(fontsourceDir, "spline-sans/files/spline-sans-latin-400-normal.woff"),
).arrayBuffer();

// Upscale the pixel-art mine with nearest-neighbor
const mineData = await sharp(
  await Bun.file(join(root, "src/assets/themes/basic/mine.png")).bytes(),
)
  .resize(MINE_SIZE, MINE_SIZE, { kernel: "nearest" })
  .png()
  .toBuffer();
const mineUri = `data:image/png;base64,${mineData.toString("base64")}`;

type Target = {
  file: string;
  title: string;
  subtitle: string;
};

const targets: Target[] = [
  {
    file: "og.png",
    title: "Business Minesweeper",
    subtitle:
      "Endless multiplayer minesweeper — clear an ever-expanding board, climb the leaderboard, collect themes.",
  },
];

const card = ({ title, subtitle }: Target) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: BG_BRAND,
      color: "#ffffff",
      fontFamily: "Spline Sans",
      padding: "80px",
    }}
  >
    <img src={mineUri} width={MINE_SIZE} height={MINE_SIZE} alt="" />
    <div
      style={{
        fontSize: 84,
        fontWeight: 700,
        marginTop: 40,
        textAlign: "center",
        color: "#ffffff",
        fontFamily: "Spline Sans Mono",
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: 36,
        color: "rgba(255, 255, 255, 0.9)",
        marginTop: 28,
        textAlign: "center",
        maxWidth: 900,
        lineHeight: 1.4,
      }}
    >
      {subtitle}
    </div>
  </div>
);

for (const target of targets) {
  const response = new ImageResponse(card(target), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Spline Sans", data: bodyFont, weight: 400, style: "normal" },
      {
        name: "Spline Sans Mono",
        data: titleFont,
        weight: 700,
        style: "normal",
      },
    ],
  });
  const buffer = await response.arrayBuffer();
  const out = join(root, "public", target.file);
  await Bun.write(out, buffer);
  console.log(`✓ generated public/${target.file} (${buffer.byteLength} bytes)`);
}
