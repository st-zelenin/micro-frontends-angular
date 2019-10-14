console.log("app-a-wrapper module");

if (!customElements.get("fmp-app-a-wrapper")) {
  class AppsWrapper extends HTMLElement {
    constructor() {
      super();
      console.log("app-a-wrapper constructor");

      const host = "http://localhost:5001";

      var shadow = this.attachShadow({ mode: "open" });
      // var iframe = document.createElement("iframe");
      // iframe.src = `${host}/index.html`;
      var wrapper = document.createElement("div");

      /*
<script src="runtime-es2015.js" type="module"></script>
<script src="polyfills-es2015.js" type="module"></script>
<script src="runtime-es5.js" nomodule defer></script>
<script src="polyfills-es5.js" nomodule defer></script>
<script src="styles-es2015.js" type="module"></script>
<script src="styles-es5.js" nomodule defer></script>
<script src="vendor-es2015.js" type="module"></script>
<script src="main-es2015.js" type="module"></script>
<script src="vendor-es5.js" nomodule defer></script>
<script src="main-es5.js" nomodule defer></script>

*/

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

        wrapper.appendChild(script);
      }

      /*
<script src="runtime-es2015.js" type="module"></script>
<script src="polyfills-es2015.js" type="module"></script>
<script src="runtime-es5.js" nomodule defer></script>
<script src="polyfills-es5.js" nomodule defer></script>
<script src="styles-es2015.js" type="module"></script>
<script src="styles-es5.js" nomodule defer></script>
<script src="vendor-es2015.js" type="module"></script>
<script src="main-es2015.js" type="module"></script>
<script src="vendor-es5.js" nomodule defer></script>
<script src="main-es5.js" nomodule defer></script>



      <script src="runtime-es2015.js" type="module"></script>
      <script src="polyfills-es2015.js" type="module"></script>
      <script src="runtime-es5.js" nomodule defer></script>
      <script src="polyfills-es5.js" nomodule defer></script>
      <script src="styles-es2015.js" type="module"></script>
      <script src="styles-es5.js" nomodule defer></script>
      <script src="vendor-es2015.js" type="module">
      </script><script src="main-es2015.js" type="module"></script>
      <script src="vendor-es5.js" nomodule defer></script>
      <script src="main-es5.js" nomodule defer></script>
      */

      var app = document.createElement("fmp-app-a");

      wrapper.appendChild(app);
      shadow.appendChild(wrapper);
    }
  }

  customElements.define("fmp-app-a-wrapper", AppsWrapper);
}
