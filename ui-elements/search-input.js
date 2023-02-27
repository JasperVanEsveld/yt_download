import { html, css, LitElement } from "https://esm.sh/lit@2.6.1";

export class SearchInput extends LitElement {
  static styles = css`
    button {
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
    :host {
      color: white;
      display: grid;
      place-items: center;
      grid-template-columns: 1fr max-content;
      z-index: 1;
      position: relative;
      background: var(--m1-color);
      border-radius: 1em;
      height: 2em;
      transition: all 200ms ease;
      transition-property: color, background;
      width: 80%;
    }
    :host(:focus-within) {
      background-color: var(--m4-color);
      color: black;
    }
    input {
      width: 100%;
      height: 2em;
      padding-left: 1em;
      padding-right: 1em;
      text-align: center;
      color: inherit;
    }
    svg {
      transform: translate(-1em, -0.1em);
      height: max(1em, 1rem);
      width: max(1em, 1rem);
      color: inherit;
    }
  `;

  firstUpdated() {
    this.shadowRoot.querySelector("input").focus();
  }

  last;
  searchTimer;

  onInputChange(query) {
    if (query !== undefined && query !== this.last) {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.last = query;
        this.dispatchEvent(new CustomEvent("search", { detail: query }));
      }, 300);
    }
  }

  render() {
    return html` <input
        type="search"
        autofocus
        @keyup=${(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            this.dispatchEvent(
              new CustomEvent("submit", { detail: e.target.value })
            );
          }
          this.onInputChange(e.target.value);
        }}
      />
      <button type="button">${this.renderSearchIcon()}</button>`;
  }

  renderSearchIcon() {
    return html`<svg
      aria-hidden="true"
      class="_11ni0ce26 _11ni0ceb p0ac3m1 p0ac3m3 p0ac3ma"
      fill="currentColor"
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.5 43.3788L34.1718 32.0507C36.8939 28.7827 38.2513 24.5911 37.9616 20.3479C37.672 16.1046 35.7575 12.1364 32.6166 9.26865C29.4757 6.40093 25.35 4.85455 21.098 4.95117C16.846 5.04779 12.7948 6.77999 9.78742 9.78742C6.77999 12.7948 5.04779 16.846 4.95117 21.098C4.85455 25.35 6.40093 29.4757 9.26865 32.6166C12.1364 35.7575 16.1046 37.672 20.3479 37.9616C24.5911 38.2513 28.7827 36.8939 32.0507 34.1718L43.3788 45.5L45.5 43.3788ZM7.99999 21.5C7.99999 18.8299 8.79175 16.2199 10.2751 13.9998C11.7585 11.7797 13.867 10.0494 16.3338 9.02762C18.8006 8.00583 21.515 7.73849 24.1337 8.25939C26.7525 8.78029 29.1579 10.066 31.0459 11.954C32.9339 13.8421 34.2197 16.2475 34.7406 18.8663C35.2615 21.485 34.9941 24.1994 33.9724 26.6662C32.9506 29.133 31.2202 31.2414 29.0002 32.7248C26.7801 34.2082 24.17 35 21.5 35C17.9208 34.996 14.4893 33.5724 11.9584 31.0415C9.42755 28.5107 8.00396 25.0792 7.99999 21.5Z"
        fill="currentColor"
      ></path>
    </svg>`;
  }
}
customElements.define("search-input", SearchInput);
