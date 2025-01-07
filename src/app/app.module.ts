import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { ButtonComponent } from './components/button/button.component';

const socketIoConfig: SocketIoConfig = {
  url: 'https://stage.allrideapp.com/tech_interview?room=pablovrl',
  options: {
    transports: ['websocket']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocationCardComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(socketIoConfig),
    GoogleMapsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
