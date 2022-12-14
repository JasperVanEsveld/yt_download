import { Format, VideoInfo } from "./types.ts";
import { BASE_URL } from "./mod.ts";

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
  const decipherFuncName = playerFile.match(
    /c=([^(]+)\(decodeURIComponent/
  )![1];

  const decipherFunc = getDefinition(playerFile, decipherFuncName);

  const unknownVars = extractVars(decipherFunc);
  unknownVars.delete("a");

  const definitions = [...unknownVars]
    .map((varName) => getDefinition(playerFile, varName))
    .join("");

  const result = `${definitions}${decipherFunc}return ${decipherFuncName}(sig);`;
  return new Function("sig", result) as (sig: string) => string;
}

function getNFunction(playerFile: string) {
  let nFuncName = playerFile.match(/\("n"\)\)&&\(b=([^(]+)\(b\)/)![1];
  if (nFuncName.includes("[")) {
    const def = getArrayDefinition(playerFile, nFuncName.split("[")[0]);
    const from = def.indexOf("[") + 1;
    const to = def.indexOf("]");
    nFuncName = def.substring(from, to);
  }
  const nFunc = getDefinition(playerFile, nFuncName);
  const result = `${nFunc}return ${nFuncName}(ncode);`;
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

function getDefinition(source: string, name: string) {
  const regex = new RegExp(`${name}=((.|\\s)+?)(?=};)};`);
  return `const ${source.match(regex)![0]}`;
}

function getArrayDefinition(source: string, name: string) {
  const regex = new RegExp(`${name}=((.|\\s)+?)(?=];)];`);
  return `const ${source.match(regex)![0]}`;
}
