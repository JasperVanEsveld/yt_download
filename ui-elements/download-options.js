import { html, css, LitElement } from "https://esm.sh/lit@2.6.1";

export class DownloadOptions extends LitElement {
  static styles = css``;

  render() {
    return html`<form
      @change=${(e) => {
        let options;
        switch (e.target.value) {
          case "both":
            options = { hasVideo: true, hasAudio: true };
            break;
          case "audio":
            options = { hasVideo: false, hasAudio: true };
            break;
          case "video":
            options = { hasVideo: true, hasAudio: false };
            break;
        }
        this.dispatchEvent(new CustomEvent("options", { detail: options }));
      }}
    >
      <fieldset>
        <legend>Download:</legend>

        <div>
          <input type="radio" id="both" name="drone" value="both" checked />
          <label for="both">video & audio</label>
        </div>

        <div>
          <input type="radio" id="video" name="drone" value="video" />
          <label for="video">video</label>
        </div>

        <div>
          <input type="radio" id="audio" name="drone" value="audio" />
          <label for="audio">audio</label>
        </div>
      </fieldset>
    </form>`;
  }
}
customElements.define("download-options", DownloadOptions);
