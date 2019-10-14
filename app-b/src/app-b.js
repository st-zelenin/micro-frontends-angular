console.log("app-b-wrapper module");

if (!customElements.get("fmp-app-b-wrapper")) {
  class AppsWrapper extends HTMLElement {
    constructor() {
      super();
      console.log("app-b-wrapper constructor");

      const host = "http://localhost:5002";

      var shadow = this.attachShadow({ mode: "open" });
      var iframe = document.createElement("iframe");
      iframe.src = `${host}/index.html`;

      const chunks = [
        { src: "runtime-es2015.js", type: "module" },
        { src: "polyfills-es2015.js", type: "module" },
        { src: "runtime-es5.js", nomodule: true, defer: true },
        { src: "polyfills-es5.js", nomodule: true, defer: true },
        { src: "styles-es2015.js", type: "module" },
        { src: "styles-es5.js", nomodule: true, defer: true },
        { src: "vendor-es2015.js", type: "module" },
        { src: "main-es2015.js", type: "module" },
        { src: "vendor-es5.js", nomodule: true, defer: true },
        { src: "main-es5.js", nomodule: true, defer: true }
      ];


      for (const { src, type, nomodule, defer } of chunks) {
        const script = document.createElement("script");
        script.src = `${host}/${src}`;
        // script.type = type;
        script.nomodule = nomodule;
        script.defer = defer;

        // wrapper.appendChild(script);
      }

      // var app = document.createElement("fmp-app-b");

      // wrapper.appendChild(app);
      // shadow.appendChild(wrapper);

      shadow.appendChild(iframe);
    }
  }

  customElements.define("fmp-app-b-wrapper", AppsWrapper);
}
