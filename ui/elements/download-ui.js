import { html, css, LitElement } from "https://esm.sh/lit@2.6.1";

export class DownloadUI extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-gap: 1rem;
      place-items: center;
      align-items: center;
      justify-items: center;
      color: white;
      width: 100%;
    }
    search-input {
      font-size: 3rem;
    }
    download-button {
      font-size: 6rem;
    }
    #placeholder {
      height: 6rem;
    }
    @media only screen and (max-width: 1250px) {
      search-input {
        font-size: 1.2rem;
      }
    }
  `;
  static properties = {
    query: { type: String },
    url: { type: String },
  };

  options = {
    hasVideo: true,
    hasAudio: true,
  };

  connectedCallback() {
    super.connectedCallback();
    window.deno.onMessage((url) => {
      if (url !== "error") {
        this.url = url;
      }
    });
  }

  fetchDownloadURL() {
    this.url = undefined;
    if (this.query !== undefined) {
      window.deno.send(
        JSON.stringify({ options: this.options, query: this.query })
      );
    }
  }

  download() {
    const link = document.createElement("a");
    const download_url = new URL("/download", window.location.origin);
    download_url.searchParams.set("url", this.url);
    link.href = download_url.toString();
    link.download = ``;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return html`<search-input
        @search=${(e) => {
          this.query = e.detail;
          this.fetchDownloadURL();
        }}
      ></search-input>
      <download-options
        @options=${(e) => {
          this.options = e.detail;
          this.fetchDownloadURL();
        }}
      ></download-options>
      ${this.url !== undefined
        ? html`<download-button
            @click=${() => this.download()}
          ></download-button>`
        : html`<span id="placeholder"></span>`} `;
  }
}
customElements.define("download-ui", DownloadUI);
