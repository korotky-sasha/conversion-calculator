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
  {
    path: 'length-unit-converter',
    loadChildren: () =>
      import('./modules/length-unit-converter/length-unit-converter.module').then(
        (m) => m.LengthUnitConverterModule
      ),
  },
  { path: '**', redirectTo: 'currency-converter' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
