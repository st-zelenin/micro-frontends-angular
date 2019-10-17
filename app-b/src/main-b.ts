import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app-b/app.module';
import { environment } from './environments/environment';

declare let __webpack_public_path__: any;
__webpack_public_path__ = environment.publicPath;

// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
