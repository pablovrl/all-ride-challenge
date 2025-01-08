import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { MapGeocoder } from '@angular/google-maps';
import { Location } from './models/location.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  locations: Location[] = [];
  address: string = '';
  results: any[] = [];
  typingTimeout!: any;
  loadingGeocoder: boolean = false;
  center: google.maps.LatLngLiteral = { lat: -33.456940, lng: -70.64827 };
  zoom: number = 12;
  apiKeyLoaded: boolean = false;

  constructor(
    private locationService: LocationService,
    private geocoder: MapGeocoder
  ) { }

  ngOnInit() {
    this.loadGoogleMapsScript()
      .then(() => {
        this.listenToNewLocations();
        this.apiKeyLoaded = true;
      })
      .catch((error) => console.error('Error loading Google Maps script:', error));
  }

  listenToNewLocations() {
    this.locationService.onEmittedLocation().subscribe((location) => {
      this.addNewLocation(location);
    });
  }

  addNewLocation(location: Location) {
    this.locations = [location, ...this.locations];
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
      this.geocoder.geocode({ address: this.address }).subscribe(({ results }) => {
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
    const newLocation: Location = {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
      address: result.formatted_address
    }

    this.addNewLocation(newLocation);
    this.locationService.emitNewLocation(newLocation);

    this.clearAddress();
    this.clearResults();
  }

  goToLocation(location: Location): void {
    this.center = { lat: location.lat, lng: location.lng };
    this.zoom = 12;
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Google Maps script failed to load.')));
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps script failed to load.'));

      document.head.appendChild(script);
    });
  }
}
