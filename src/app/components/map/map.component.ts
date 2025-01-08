import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input() locations: Location[] = [];
  @Input() center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  @Input() zoom: number = 12;
  @ViewChild('googleMap', { static: false }) googleMap!: GoogleMap;
  private bounds!: google.maps.LatLngBounds;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locations'] && this.locations.length > 0) this.adjustBounds();
  }

  adjustBounds(): void {
    if (this.locations.length === 1) {
      this.center = {
        lat: this.locations[0].lat,
        lng: this.locations[0].lng
      }
      return;
    }

    this.bounds = new google.maps.LatLngBounds();
    this.locations.forEach(location => {
      const latLng = new google.maps.LatLng(location.lat, location.lng);
      this.bounds.extend(latLng);
    });

    if (this.googleMap) this.googleMap.fitBounds(this.bounds);
  }
}
