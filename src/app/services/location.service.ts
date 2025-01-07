import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private socket: Socket) {
    this.socket.on('connect', () => {
      console.log('Successfully connected to the server!');
    });

    socket.on('connect_error', (error: any) => {
      console.error('Connection error:', error);
    });
  }

  emitNewLocation(location: Location) {
    this.socket.emit('newLocation', location);
  }

  onEmittedLocation() {
    return this.socket.fromEvent<Location>('newLocation');
  }

}
