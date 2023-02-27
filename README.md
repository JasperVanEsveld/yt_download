# YT Download

YT Download is a Deno library that allows you to download YouTube videos.
It is losely based on [ytdl-core](https://github.com/fent/node-ytdl-core), for which there is a direct [port](https://github.com/DjDeveloperr/ytdl_core).

This is a rewrite keeping only the core functionality, hopefully making it easier to maintain.

## Install
The main use of yt_download is as a library, but when installed it can also be used as a command line tool.

```
deno install --allow-net --allow-write -n yt_download https://deno.land/x/yt_download@1.5/mod.ts

yt_download https://www.youtube.com/watch?v=rEq1Z0bjdwc ./hello_there.mp4
yt_download rEq1Z0bjdwc ./hello_there_muted.mp4 --no-audio
yt_download rEq1Z0bjdwc ./hello_there.mp3 --no-video --mime-type='audio/webm; codecs=""opus""'
```

Or even as a desktop application using [deuteron](https://github.com/JasperVanEsveld/deuteron)!

Either download the latest binary from the [releases](https://github.com/JasperVanEsveld/yt_download/releases)
or compile it yourself:
```
deuteron --title yt-download --webview-url "https://jaspervanesveld.github.io/yt_download/" --allow-net https://deno.land/x/yt_download@1.5/mod.ts
```

![image](https://user-images.githubusercontent.com/9715316/221702787-89df70e3-1dd0-4246-9bdb-4926a930a7eb.png)


## Basic Usage
```js
import { ytDownload } from "https://deno.land/x/yt_download@1.5/mod.ts";

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
import { getFormats, getDataStream } from "https://deno.land/x/yt_download@1.5/mod.ts";
const formats = await getFormats("rEq1Z0bjdwc");
const stream = await getDataStream(formats[2]); // Select the format you want to download
```
