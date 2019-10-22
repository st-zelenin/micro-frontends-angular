import { enableProdMode, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production && false) {
  enableProdMode();
}

platformBrowserDynamic([{ provide: ɵALLOW_MULTIPLE_PLATFORMS, useValue: true }])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
