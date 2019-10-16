import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [AppComponent, EmptyComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector, router: Router) {
    const ngCustomElement = createCustomElement(AppComponent, { injector });
    customElements.define('fmp-app-b', ngCustomElement);

    console.log('router B', router);
  }

  ngDoBootstrap(): void {}
}
