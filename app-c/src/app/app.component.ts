import { DOCUMENT, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Renderer2
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private appA: AppElement;
  private appB: AppElement;

  private store = {
    title: 'hello'
  };

  private get appsContainer() {
    return this.document.getElementById('apps-container');
  }

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
    scriptA.onload = this.creatAppA;
    scriptA.src = 'http://localhost:5001/app-a.js';

    const scriptB: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, scriptB);

    scriptB.onload = this.creatAppB;

    scriptB.src = 'http://localhost:5002/app-b.js';

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(({ url }: NavigationEnd) => {
        this.updateAppAExternalRoute(url);
        this.updateAppBExternalRoute(url);
      });

    this.creatAppA();
    this.creatAppB();
  }

  private creatAppA = () => {
    const element: AppElement = this.renderer.createElement('fmp-app-a');
    element.store = this.store;
    element.addEventListener('routechanged', ({ detail: url }: CustomEvent) => {
      console.log('from a to parent', url);
      this.router.navigate([url]);

      this.updateAppBExternalRoute(url);
    });
    this.appsContainer.appendChild(element);

    this.appA = element;
  }

  private creatAppB = () => {
    const element: AppElement = this.renderer.createElement('fmp-app-b');
    element.store = this.store;
    element.addEventListener('routechanged', ({ detail: url }: CustomEvent) => {
      console.log('from b to parent', url);
      this.router.navigate([url]);

      this.updateAppAExternalRoute(url);
    });

    this.appsContainer.appendChild(element);

    this.appB = element;
  }

  private updateAppBExternalRoute(url) {
    if (this.appB) {
      this.appB.externalRoute = url;
    }
  }

  private updateAppAExternalRoute(url) {
    if (this.appA) {
      this.appA.externalRoute = url;
    }
  }
}

interface AppElement extends HTMLElement {
  routeChanged: EventEmitter<string>;
  externalRoute: string;
  store: {};
}
