import { AppModule } from './app-a/app.module';
import { environment } from './environments/environment';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

declare let __webpack_public_path__: any;
__webpack_public_path__ = environment.publicPath;

// if (environment.standAlone) {
// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
// }
