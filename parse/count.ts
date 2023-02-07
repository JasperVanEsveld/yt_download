/**
 * Per character returns the amount of brackets/braces that still need to be closed.
 *
 * This function is not pretty...
 * @param body
 * @returns
 */
export function* count(body: string) {
  let brackets = 0;
  let braces = 0;
  const state = {
    string: false,
    stringStart: "",
    regex: false,
    regexCharSet: false,
    escaped: false,
    single: false,
    double: false,
    template: false,
    templateCount: 0,
    cashTemplate: false,
    previous: "",
  };
  const doCount = () => {
    return !(state.string || state.regex);
  };
  let res = 0;
  for (const char of body) {
    res++;
    if (state.escaped) {
      state.escaped = false;
      continue;
    }
    switch (char) {
      case "{":
        if (state.template && state.cashTemplate) {
          state.string = false;
          state.templateCount = braces;
        }
        if (doCount()) {
          braces++;
        }
        break;
      case "}":
        if (doCount()) {
          braces--;
        }
        if (state.template && state.templateCount === braces) {
          state.string = true;
        }
        break;
      case "'":
        if (doCount()) {
          state.string = true;
          state.stringStart = "'";
        } else if (state.stringStart === "'") {
          state.string = false;
        }
        break;
      case '"':
        if (doCount()) {
          state.string = true;
          state.stringStart = '"';
        } else if (state.stringStart === '"') {
          state.string = false;
        }
        break;
      case "`":
        if (doCount()) {
          state.string = true;
          state.template = true;
          state.stringStart = "`";
        } else if (state.stringStart === "`") {
          state.string = false;
          state.template = false;
        }
        break;
      case "$":
        if (state.template && state.string) {
          state.cashTemplate = true;
        }
        break;
      case "[":
        if (state.regex) {
          state.regexCharSet = true;
        }
        if (state.template && state.cashTemplate) {
          state.string = false;
          state.templateCount = braces;
        }
        if (doCount()) {
          brackets++;
        }
        break;
      case "]":
        if (state.regex && state.regexCharSet) {
          state.regexCharSet = false;
        }
        if (doCount()) {
          brackets--;
        }
        if (state.template && state.templateCount === brackets) {
          state.string = true;
        }
        break;
      case "\\":
        if (state.string || (state.regex && !state.regexCharSet)) {
          state.escaped = true;
        }
        break;
      case "/":
        if (doCount() && [",", "(", "="].includes(state.previous)) {
          state.regex = true;
        } else if (state.regex && !state.regexCharSet) {
          state.regex = false;
        }
        break;
    }
    if (char !== "$") {
      state.cashTemplate = false;
    }
    state.previous = char;
    yield { braces, brackets, amount: res };
  }
}
