

console.log('AppsWrapper module')

if (!customElements.get('fmp-apps-wrapper')) {
  class AppsWrapper extends HTMLElement {
    constructor() {
      super();
      console.log('AppsWrapper constructor')
      this.store = {
        title: 'FMP',
      };
  
      var shadow = this.attachShadow({mode: 'open'});
      var wrapper = document.createElement('div');
      
      var appA = document.createElement('fmp-app-a');
      appA.store = this.store;
  
      var appB = document.createElement('fmp-app-b');
      appB.store = this.store;
  
      wrapper.appendChild(appA);
      wrapper.appendChild(appB);
      shadow.appendChild(wrapper);
    }
  }

  customElements.define('fmp-apps-wrapper', AppsWrapper);
}