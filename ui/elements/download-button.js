import { html, css, LitElement } from "https://esm.sh/lit@2.6.1";

export class DownloadButton extends LitElement {
  static properties = {
    downloaded: { type: String },
    url: { type: String },
  };

  static styles = css`
    button,
    :host {
      width: 1em;
      height: 1em;
      color: inherit;
    }
    input,
    button {
      font-size: inherit;
      color: inherit;
      background: rgb(0, 0, 0, 0);
      border: none;
      outline: none;
      padding: 0;
      font-family: var(--m1-font);
    }
    button:hover {
      color: var(--a1-color);
      cursor: pointer;
    }
    svg {
      height: max(1em, 1rem);
      width: max(1em, 1rem);
      color: inherit;
    }
    .started {
      color: var(--a1-color);
    }
    dialog {
      width: 80vw;
      height: 4em;
      padding: 0em;
      border: none;
      background: none;
      overflow: visible;
    }
    dialog > div {
      display: grid;
      height: 100%;
      grid-template-rows: auto 1fr 1fr 1fr;
      place-items: center;
      border-radius: 1em;
      background-color: var(--m1-color);
      outline: 1px solid white;
    }
    h1 {
      font-size: 0.5em;
      color: var(--a1-color);
      height: max-content;
    }
    dialog button {
      width: auto;
      height: auto;
      font-size: 0.5em;
      background-color: var(--m2-color);
      padding-left: 0.5em;
      padding-right: 0.5em;
      border-radius: 1em;
      color: white;
      font-weight: bold;
    }
  `;

  render() {
    return html`<button class="download" type="button">
      ${this.renderDownload()}
    </button>`;
  }

  renderDownload() {
    return html`<svg
      aria-hidden="true"
      fill="currentColor"
      height="48"
      viewBox="0 0 20 20"
      width="48"
    >
      <path
        fill="currentColor"
        d="M9.634,10.633c0.116,0.113,0.265,0.168,0.414,0.168c0.153,0,0.308-0.06,0.422-0.177l4.015-4.111c0.229-0.235,0.225-0.608-0.009-0.836c-0.232-0.229-0.606-0.222-0.836,0.009l-3.604,3.689L6.35,5.772C6.115,5.543,5.744,5.55,5.514,5.781C5.285,6.015,5.29,6.39,5.522,6.617L9.634,10.633z"
      ></path>
      <path
        fill="currentColor"
        d="M17.737,9.815c-0.327,0-0.592,0.265-0.592,0.591v2.903H2.855v-2.903c0-0.327-0.264-0.591-0.591-0.591c-0.327,0-0.591,0.265-0.591,0.591V13.9c0,0.328,0.264,0.592,0.591,0.592h15.473c0.327,0,0.591-0.264,0.591-0.592v-3.494C18.328,10.08,18.064,9.815,17.737,9.815z"
      ></path>
    </svg>`;
  }
}
customElements.define("download-button", DownloadButton);
