import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
import { LengthUnitConverterComponent } from './components/currency-converter/length-unit-converter.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LengthUnitConverterComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LengthUnitConverterRoutingModule {
}
