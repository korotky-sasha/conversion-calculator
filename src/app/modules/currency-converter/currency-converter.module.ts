import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';

import { CurrencyConverterRoutingModule } from './currency-converter-routing.module';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [
    CommonModule,
    CurrencyConverterRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CurrencyConverterModule {}
