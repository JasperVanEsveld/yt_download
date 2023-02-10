import { toID } from "./id.ts";
import { Command } from "https://deno.land/x/cliffy@v0.25.7/mod.ts";
import ProgressBar from "https://deno.land/x/progress@v1.3.6/mod.ts";
import { getFormats } from "./mod.ts";
import { throwFormatNotFound } from "./error.ts";

export async function main() {
  await new Command()
    .name("yt-download")
    .description(`Command line tool to download youtube videos`)
    .option("--no-audio", "Only accept", {
      default: true,
    })
    .option("--no-video", "Disable video", {
      default: true,
    })
    .option(
      "--mime-type <string>",
      "Filter on mime type, example \"audio/webm; codecs='opus'\""
    )
    .arguments("<url|id:string> <file-path:string>")
    .action(async function (options, source, path) {
      const id = toID(source);
      const parsedOptions = {
        hasAudio: options.audio,
        hasVideo: options.video,
        mimeType: options.mimeType,
      };
      const formats = await getFormats(id, parsedOptions);
      if (formats.length === 0) {
        throwFormatNotFound(parsedOptions);
      }
      const format = formats[0];
      const response = await fetch(format.url);
      const length = Number.parseInt(response.headers.get("Content-Length")!);
      const file = await Deno.open(path, { create: true, write: true });
      const progress = new ProgressBar({
        title: `${id}`,
        total: length,
        display: ":title :time :bar :percent ",
      });
      let current = 0;
      for await (const buffer of response.body!) {
        file.write(buffer);
        current += buffer.length;
        progress.render(current);
      }
    })
    .parse(Deno.args);
}
