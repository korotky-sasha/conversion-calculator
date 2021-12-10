import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'currency-converter' },
  {
    path: 'currency-converter',
    loadChildren: () =>
      import('./modules/currency-converter/currency-converter.module').then(
        (m) => m.CurrencyConverterModule
      ),
  },
  { path: '**', redirectTo: 'currency-converter' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
