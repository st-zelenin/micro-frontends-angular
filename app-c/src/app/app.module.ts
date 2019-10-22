import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [AppComponent, EmptyComponent],
  imports: [BrowserModule, AppRoutingModule],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const ngCustomElement = createCustomElement(AppComponent, {
      injector: this.injector
    });

    customElements.define('fmp-app-host', ngCustomElement);
  }
}
