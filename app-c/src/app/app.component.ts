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
    const script: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.appendChild(this.document.body, script);
    // script.defer = true;
    script.onload = xxx => {
      const container = this.document.getElementById('app-a-container');
      // const AppA = customElements.get('fmp-app-a');
      container.appendChild(this.renderer.createElement('fmp-app-a'));
      // container.appendChild(new AppA());
    };
    script.src = 'http://localhost:5001/main.js';
  }
}
