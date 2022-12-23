import { Format, VideoInfo } from "./types.ts";
import { BASE_URL } from "./mod.ts";
import { getValue } from "./parse/mod.ts";

export async function decipherFormatURLs(info: VideoInfo, playerURL: string) {
  const url = new URL(playerURL, BASE_URL);
  const playerFile = await (await fetch(url)).text();
  const decipher = getDecipherFunction(playerFile);
  const nCode = getNFunction(playerFile);
  info.streamingData.adaptiveFormats.forEach((format) => {
    setFormatURL(format, decipher, nCode);
  });
  info.streamingData.formats.forEach((format) => {
    setFormatURL(format, decipher, nCode);
  });
}

function setFormatURL(
  format: Format,
  decipher: (sig: string) => string,
  nCode: (sig: string) => string
) {
  const params = new URLSearchParams(format.url || format.signatureCipher);
  const { s, sp, url } = Object.fromEntries(params);
  if (s === undefined) return format.url;
  const components = new URL(decodeURIComponent(url));
  const deciphered = decipher(s);
  components.searchParams.set(sp || "signature", deciphered);
  const n = components.searchParams.get("n")!;
  components.searchParams.set("n", nCode(n));
  format.url = components.toString();
}

function getDecipherFunction(playerFile: string) {
  const name = playerFile.match(/c=([^(]+)\(decodeURIComponent/)![1];

  const decipherFunc = define(playerFile, name);
  const unknownVars = extractVars(decipherFunc);
  unknownVars.delete("a");

  const definitions = [...unknownVars]
    .map((varName) => define(playerFile, varName))
    .join("");

  const result = `${definitions};${decipherFunc}return ${name}(sig);`;
  return new Function("sig", result) as (sig: string) => string;
}

function getNFunction(playerFile: string) {
  let name = playerFile.match(/\("n"\)\)&&\(b=([^(]+)\(b\)/)![1];

  if (name.includes("[")) {
    const value = getValue(playerFile, name.split("[")[0]);
    const from = value.indexOf("[") + 1;
    const to = value.indexOf("]");
    name = value.substring(from, to);
  }
  const definition = define(playerFile, name);
  const result = `${definition};return ${name}(ncode);`;
  return new Function("ncode", result) as (sig: string) => string;
}

function extractVars(func: string) {
  const unknownVars = new Set<string>();
  for (const [_match, variable] of [
    ...func.matchAll(/(?:{|;)(?!return )([^.=]+)/g),
  ]) {
    unknownVars.add(variable);
  }
  return unknownVars;
}

function define(source: string, name: string) {
  return `const ${name} = ${getValue(source, name)};`;
}
