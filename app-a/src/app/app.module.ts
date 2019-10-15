import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Routes } from '@angular/router';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const ngCustomElement = createCustomElement(AppComponent, { injector });
    customElements.define("fmp-app-a", ngCustomElement);
  }

  ngDoBootstrap(): void {}
}
