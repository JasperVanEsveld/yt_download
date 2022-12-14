import { decipherFormatURLs } from "./decipher.ts";
import { Format, VideoInfo } from "./types.ts";

export const BASE_URL = "https://www.youtube.com/watch?v=";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0";

export async function ytDownload(
  id: string,
  options: Options = { hasAudio: true, hasVideo: true }
) {
  const formats = await getFormats(id, options);
  if (formats.length === 0) {
    throw "No matching formats found";
  }
  return getDataStream(formats[0]);
}

export async function getVideoInfo(id: string): Promise<undefined | VideoInfo> {
  try {
    const url = `${BASE_URL}${id}&hl=en`;
    const resp = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    const html = await resp.text();
    const responses = html.match(
      /ytInitialPlayerResponse = ([\S\s]+)?(?=;var meta)/
    );
    const playerInfo = JSON.parse(responses![1]);
    const playerURL = html.match(/"jsUrl":"([^"]+)"/)![1];
    await decipherFormatURLs(playerInfo, playerURL);
    return playerInfo;
  } catch {
    return undefined;
  }
}

type Options = {
  hasVideo?: boolean;
  hasAudio?: boolean;
  mimeType?: string;
};

export async function getFormats(
  id: string,
  { hasAudio, hasVideo, mimeType }: Options = {}
) {
  const info = await getVideoInfo(id);
  if (info === undefined) {
    throw "Video not found";
  }
  const result = [
    ...info.streamingData.adaptiveFormats,
    ...info.streamingData.formats,
  ];
  result.sort((a, b) => b.bitrate - a.bitrate);
  return result
    .filter(
      (format) =>
        hasAudio === undefined ||
        (hasAudio && format.audioQuality !== undefined) ||
        (!hasAudio && format.audioQuality === undefined)
    )
    .filter(
      (format) =>
        hasVideo === undefined ||
        (hasVideo && format.qualityLabel !== undefined) ||
        (!hasVideo && format.qualityLabel === undefined)
    )
    .filter((format) => mimeType === undefined || mimeType === format.mimeType);
}

export async function getDataStream(format: Format) {
  return (await fetch(format.url)).body!;
}
