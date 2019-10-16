console.log('AppsWrapper module');

if (!customElements.get('fmp-apps-wrapper')) {
  class AppsWrapper extends HTMLElement {
    appA;
    appB;

    constructor() {
      super();
      console.log('AppsWrapper constructor');
      this.store = {
        title: 'FMP'
      };

      var shadow = this.attachShadow({ mode: 'open' });
      var wrapper = document.createElement('div');

      this.appA = document.createElement('fmp-app-a');
      this.appA.store = this.store;
      this.appA.location = '/';
      this.appA.addEventListener(
        'routechanged',
        this.handleAppARouteChange,
        false
      );

      this.appB = document.createElement('fmp-app-b');
      this.appB.store = this.store;
      this.appB.location = '/';
      this.appB.addEventListener(
        'routechanged',
        this.handleAppBRouteChange,
        false
      );

      wrapper.appendChild(this.appA);
      wrapper.appendChild(this.appB);
      shadow.appendChild(wrapper);

      var changeTitleButton = document.getElementById('title-change');
      changeTitleButton.addEventListener('click', () => {
        this.appA.store = this.appB.store = { title: new Date().getTime() };
      });

      var homeButton = document.getElementById('home');
      homeButton.addEventListener('click', () => {
        this.appA.location = this.appB.location = '/';
      });
    }

    handleAppARouteChange = ({ detail }) => {
      const { event, skip } = detail;
      console.log('app A rote changed', event, skip);

      if (detail.url !== '/') {
        this.appB.location = '/';
      }
    };

    handleAppBRouteChange = ({ detail }) => {
      const { event, skip } = detail;
      console.log('app B rote changed', event, skip);
      
      if (detail.url !== '/') {
        this.appA.location = '/';
      }
    };
  }

  customElements.define('fmp-apps-wrapper', AppsWrapper);
}
