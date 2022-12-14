import { ytDownload } from "./mod.ts";

const stream = await ytDownload("rEq1Z0bjdwc", {
  mimeType: `audio/webm; codecs="opus"`,
});

const destFile = await Deno.open(`./result.mp4`, {
  create: true,
  write: true,
  truncate: true,
});
await stream.pipeTo(destFile.writable);
