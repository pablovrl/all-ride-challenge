import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { MapGeocoder } from '@angular/google-maps';
import { Location } from './models/location.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  markers: Location[] = [];
  address: string = '';
  results: any[] = [];
  typingTimeout!: any;
  loadingGeocoder: boolean = false;
  center: google.maps.LatLngLiteral = { lat: -33.456940, lng: -70.64827 };
  zoom: number = 12;

  constructor(
    private locationService: LocationService,
    private geocoder: MapGeocoder
  ) { }

  ngOnInit() {
    this.listenToNewLocations();
  }

  listenToNewLocations() {
    this.locationService.onEmittedLocation().subscribe((location: { lat: number, lng: number, address: string }) => {
      this.markers.push(location);
    });
  }

  onInputChange(): void {
    clearTimeout(this.typingTimeout);
    this.loadingGeocoder = true;
    this.clearResults();

    this.typingTimeout = setTimeout(() => {
      this.searchAddress();
    }, 250);
  }

  searchAddress(): void {
    if (this.address.trim()) {
      this.geocoder.geocode({address: this.address}).subscribe(({ results }) => {
        this.results = results;
        this.loadingGeocoder = false;
      });
    }
    
    if (this.address === '') this.clearResults();
  }

  clearResults(): void {
    this.results = [];
  }

  clearAddress(): void {
    this.address = '';
  }

  onSelectAddress(result: google.maps.GeocoderResult): void {
    const newMarker: Location = {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
      address: result.formatted_address
    }

    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.markers.unshift(newMarker);
    this.locationService.emitNewLocation(newMarker);

    this.clearAddress();
    this.clearResults();
  }

  goToLocation(location: Location): void {
    this.center = { lat: location.lat, lng: location.lng };
    this.zoom = 12;
  }
}
