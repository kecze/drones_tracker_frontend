import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-planes-map',
  standalone: true, 
  templateUrl: './planes-map.component.html',
  styleUrls: ['./planes-map.component.css']
})
export class PlanesMapComponent implements AfterViewInit {
  private map: any;
  private markers: L.Marker[] = [];

  @Input() planes: any[] = []; 

  ngAfterViewInit(): void {
    this.initMap();
    this.updateMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private updateMap(): void {
    this.markers.forEach(marker => marker.removeFrom(this.map));
    this.markers = [];
    this.planes.forEach(plane => {
      const icon = L.divIcon({
        className: 'plane-icon',
        html: `<div style="font-size: 12px; font-weight: bold; color: black;">✈${plane.icao}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      const marker = L.marker([plane.lat, plane.lon], { icon })
        .addTo(this.map)
        .bindPopup(`ICAO: ${plane.icao}<br>Speed: ${plane.speed} km/h`);
      this.markers.push(marker);
    });

    if (this.planes.length > 0) {
      const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
      this.map.fitBounds(bounds);
    }
  }

  ngOnChanges(): void {
    if (this.map) {
      this.updateMap(); 
    }
  }
}