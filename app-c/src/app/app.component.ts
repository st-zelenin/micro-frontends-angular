import { DOCUMENT, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('app-a') isAppA: string;
  // tslint:disable-next-line: no-input-rename
  @Input('app-b') isAppB: string;

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

    console.log('app-c', this);
  }

  ngOnInit(): void {
    this.addApps();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(({ url }: NavigationEnd) => {
        this.updateAppAExternalRoute(url);
        this.updateAppBExternalRoute(url);
      });
  }

  private addApps() {
    if (this.isAppA === '') {
      this.createAppA();
      return;
    }

    if (this.isAppB === '') {
      this.createAppB();
      return;
    }

    this.loadAppA();
    this.loadAppB();
  }

  private loadAppA() {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, script);
    script.onload = this.createAppA;
    script.src = 'http://localhost:5001/app-a.js';
  }

  private loadAppB() {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, script);
    script.onload = this.createAppB;
    script.src = 'http://localhost:5002/app-b.js';
  }

  private createAppA = () => {
    const element: AppElement = this.renderer.createElement('fmp-app-a');
    element.addEventListener(
      'appinitialized',
      () => {
        element.store = this.store;
      },
      { once: true }
    );

    element.addEventListener('routechanged', ({ detail: url }: CustomEvent) => {
      console.log('from a to parent', url);
      this.router.navigate([url]);

      this.updateAppBExternalRoute(url);
    });
    this.appsContainer.appendChild(element);

    this.appA = element;
  }

  private createAppB = () => {
    const element: AppElement = this.renderer.createElement('fmp-app-b');
    element.addEventListener(
      'appinitialized',
      () => {
        element.store = this.store;
      },
      { once: true }
    );

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
