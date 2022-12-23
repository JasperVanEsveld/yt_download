import { count } from "./count.ts";

export function getValue(source: string, name: string) {
  const trimmed = trimStart(source, name)?.trim();
  if (trimmed === undefined) {
    throw "Variable not found";
  }

  const end = findIndex(
    trimmed,
    matchObject,
    matchFunction,
    matchArray,
    matchLiteral
  );
  if (end === undefined) {
    throw "Error parsing variables value";
  }
  return trimmed.slice(0, end);
}

function matchObject(source: string) {
  for (const { braces, amount } of count(source)) {
    if (braces === 0) {
      return amount === 1 ? undefined : amount;
    }
  }
}

function matchFunction(source: string) {
  if (!source.trim().startsWith("function")) {
    return;
  }
  const bodyStart = source.indexOf("{");
  const body = source.slice(bodyStart);
  for (const { braces, amount } of count(body)) {
    if (braces === 0) {
      return amount === 1 ? undefined : bodyStart + amount;
    }
  }
}

function matchArray(source: string) {
  for (const { brackets, amount } of count(source)) {
    if (brackets === 0) {
      return amount === 1 ? undefined : amount;
    }
  }
}

function matchLiteral(source: string) {
  return source.indexOf(";");
}

function trimStart(source: string, name: string) {
  const start = findIndex(
    source,
    (source) => {
      const match = `var ${name}=`;
      const idx = source.indexOf(match);
      if (idx == -1) {
        return;
      }
      return idx + match.length;
    },
    (source) => {
      const match = `${name}=`;
      const idx = source.indexOf(match);
      if (idx == -1) {
        return;
      }
      return idx + match.length;
    }
  );
  if (start === undefined) {
    return;
  }
  return source.slice(start).trim();
}

function findIndex(
  source: string,
  ...matchers: ((value: string) => number | undefined)[]
) {
  for (const matcher of matchers) {
    const result = matcher(source);
    if (result !== undefined && result !== -1) {
      return result;
    }
  }
}
