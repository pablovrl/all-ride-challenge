import { Component, Input } from '@angular/core';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() locations: Location[] = [];
  @Input() center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  @Input() zoom: number = 12;

  constructor() { }

}
