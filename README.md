# YT Download

YT Download is a Deno library that allows you to download YouTube videos.
It is losely based on [ytdl-core](https://github.com/fent/node-ytdl-core), for which there is a direct [port](https://github.com/DjDeveloperr/ytdl_core).

This is a rewrite keeping only the core functionality, hopefully making it easier to maintain.

## Basic Usage
```js
import { ytDownload } from "https://deno.land/x/yt_download/mod.ts";

// Gets a download stream for a given video ID.
// The highest bitrate is chosen for the given options.
// The default options require audio and video.
//
// NOTE: Often there is a higher bitrate option that does not include audio.
const stream = await ytDownload("rEq1Z0bjdwc");

// Pipe the stream to a file to save it
const destFile = await Deno.open(`./result.mp4`, {
  create: true,
  write: true,
  truncate: true,
});
await stream.pipeTo(destFile.writable);
```

## Options

```js
// Options can be passed to filter certain formats
await ytDownload("rEq1Z0bjdwc", {
  hasAudio: true,
  hasVideo: false,
  mimeType: `audio/webm; codecs="opus"`,
});
```

## Manual Filter

The options only provide common ways to filter.
But it is possible to manually filter the available formats.
```js
import { getFormats, getDataStream } from "https://deno.land/x/yt_download/mod.ts";
const formats = await getFormats("rEq1Z0bjdwc");
const stream = await getDataStream(formats[2]); // Select the format you want to download
```
