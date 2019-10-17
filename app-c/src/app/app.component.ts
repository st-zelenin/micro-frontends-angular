import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-c';
  routerModule = RouterModule;

  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const scriptA: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, scriptA);
    // script.defer = true;
    scriptA.onload = xxx => {
      const container = this.document.getElementById('app-a-container');
      // const AppA = customElements.get('fmp-app-a');
      container.appendChild(this.renderer.createElement('fmp-app-a'));
      // container.appendChild(new AppA());
    };
    scriptA.src = 'http://localhost:5001/app-a.js';

    const scriptB: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, scriptB);
    // script.defer = true;
    scriptB.onload = xxx => {
      const container = this.document.getElementById('app-a-container');
      // const AppA = customElements.get('fmp-app-a');
      container.appendChild(this.renderer.createElement('fmp-app-b'));
      // container.appendChild(new AppA());
    };
    scriptB.src = 'http://localhost:5002/app-b.js';


  }

  goHome() {
    this.router.navigate(['/']);
  }
}
