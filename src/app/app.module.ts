import { NgModule }                from '@angular/core';
import { ServiceWorkerModule }     from '@angular/service-worker';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule }        from "@angular/flex-layout";
import { MatButtonModule }         from '@angular/material/button';
import { MatToolbarModule }        from '@angular/material/toolbar';
import { MatSliderModule }         from "@angular/material/slider";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { environment }      from '../environments/environment';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
