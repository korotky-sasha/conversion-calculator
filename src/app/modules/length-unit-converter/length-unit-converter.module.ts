import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule }     from '@angular/material/button';
import { MatOptionModule }     from "@angular/material/core";
import { MatIconModule }       from '@angular/material/icon';
import { MatInputModule }      from '@angular/material/input';
import { MatSelectModule }     from "@angular/material/select";
import { FlexLayoutModule }    from '@angular/flex-layout';

import { LengthUnitConverterRoutingModule } from './length-unit-converter-routing.module';
import { LengthUnitConverterComponent }     from './components/currency-converter/length-unit-converter.component';

@NgModule({
  declarations: [ LengthUnitConverterComponent ],
  imports: [
    CommonModule,
    LengthUnitConverterRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LengthUnitConverterModule {
}
