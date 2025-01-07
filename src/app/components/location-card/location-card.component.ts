import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent {
  @Input() location!: Location;
  @Output() onGoToLocation: EventEmitter<Location> = new EventEmitter();

  constructor() { }

  emitGoToLocation(): void {
    this.onGoToLocation.emit(this.location);
  }

}
