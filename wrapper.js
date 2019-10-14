console.log("AppsWrapper module");

if (!customElements.get("fmp-apps-wrapper")) {
  class AppsWrapper extends HTMLElement {
    appA;
    appB;

    constructor() {
      super();
      console.log("AppsWrapper constructor");
      this.store = {
        title: "FMP"
      };

      var shadow = this.attachShadow({ mode: "open" });
      var wrapper = document.createElement("div");

      this.appA = document.createElement("fmp-app-a");
      this.appA.store = this.store;

      this.appB = document.createElement("fmp-app-b");
      this.appB.store = this.store;

      wrapper.appendChild(this.appA);
      wrapper.appendChild(this.appB);
      shadow.appendChild(wrapper);

      var changeTitleButton = document.getElementById("title-change");
      changeTitleButton.addEventListener("click", () => {
        this.appA.store = this.appB.store = { title: new Date().getTime() };
      });
    }
  }

  customElements.define("fmp-apps-wrapper", AppsWrapper);
}
