import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  {
    path: 'test-a',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule)
  },
  {
    path: '**',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
