import { DOCUMENT, Location } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Renderer2,
  EventEmitter
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-c';
  routerModule = RouterModule;

  private appA: AppElement;
  private appB: AppElement;

  private store = {
    title: 'hello'
  };

  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    location: Location
  ) {
    location.onUrlChange((url, state) => {
      console.log('url', url, 'state', state);
    });
  }

  ngOnInit(): void {
    const scriptA: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, scriptA);

    scriptA.onload = () => {
      const container = this.document.getElementById('app-a-container');
      const element: AppElement = this.renderer.createElement('fmp-app-a');
      element.store = this.store;
      element.addEventListener(
        'routechanged',
        ({ detail: url }: CustomEvent) => {
          console.log('from a to parent', url);
          this.router.navigate([url]);

          if (this.appB) {
            this.appB.externalRoute = url;
          }
        }
      );
      container.appendChild(element);

      this.appA = element;
    };

    scriptA.src = 'http://localhost:5001/app-a.js';

    const scriptB: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, scriptB);

    scriptB.onload = () => {
      const container = this.document.getElementById('app-a-container');
      const element: AppElement = this.renderer.createElement('fmp-app-b');
      element.store = this.store;
      element.addEventListener(
        'routechanged',
        ({ detail: url }: CustomEvent) => {
          console.log('from b to parent', url);
          this.router.navigate([url]);

          if (this.appA) {
            this.appA.externalRoute = url;
          }
        }
      );

      container.appendChild(element);

      this.appB = element;
    };

    scriptB.src = 'http://localhost:5002/app-b.js';
  }

  goHome() {
    this.router.navigate(['/']);
    this.appA.externalRoute = this.appB.externalRoute = '/';
  }
}

interface AppElement extends HTMLElement {
  routeChanged: EventEmitter<string>;
  externalRoute: string;
  store: {};
}
