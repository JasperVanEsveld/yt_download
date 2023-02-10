import { Options } from "./types.ts";

export function throwFormatNotFound(options: Options) {
  if (options.hasAudio && options.hasVideo && options.mimeType !== undefined) {
    throw new Error(
      `No format found with video and audio, that also has mime-type: ${options.mimeType}`
    );
  } else if (options.hasAudio && options.hasVideo) {
    throw new Error(`No format found with video and audio`);
  } else if (options.hasAudio && options.mimeType !== undefined) {
    throw new Error(
      `No format found with only audio, that also has mime-type: ${options.mimeType}`
    );
  } else if (options.hasAudio) {
    throw new Error(`No format found with only audio`);
  } else if (options.hasVideo && options.mimeType !== undefined) {
    throw new Error(
      `No format found with only video, that also has mime-type: ${options.mimeType}`
    );
  } else if (options.hasVideo) {
    throw new Error(`No format found with only video`);
  }
  throw new Error(`Are you sure you want no video and no audio?`);
}
