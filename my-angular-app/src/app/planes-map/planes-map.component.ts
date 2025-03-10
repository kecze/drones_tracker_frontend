import { Component, AfterViewInit, Input, OnChanges } from '@angular/core';
import { PlanesHistoryServiceService } from '../planes-history-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-planes-map',
  standalone: true, 
  templateUrl: './planes-map.component.html',
  styleUrls: ['./planes-map.component.css']
})
export class PlanesMapComponent implements AfterViewInit, OnChanges {
  private map: any; 
  private markers: L.Marker[] = [];
  private paths: { [icao: string]: L.Polyline } = {};

  @Input() planes: any[] = []; 

  constructor(private historyService: PlanesHistoryServiceService) {}

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
        html: `<div style="font-size: 12px; font-weight: bold; color: black;">✈${plane.icao}</div>
              <div style="font-size: 9px; color: black; background-color: rgba(255, 255, 255, 0.7); padding: 2px; border-radius: 5px; white-space: nowrap; display: inline-block;">
              Lat: ${plane.lat.toFixed(4)} | Lon: ${plane.lon.toFixed(4)}
              </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([plane.lat, plane.lon], { icon })
        .addTo(this.map)
        .bindPopup(`ICAO: ${plane.icao}<br>Speed: ${plane.speed} km/h`);
      this.markers.push(marker);
    });

    this.drawPaths();

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

  private drawPaths(): void {
    this.historyService.history$.subscribe(history => {
      Object.keys(history).forEach(icao => {
        const pathCoordinates: [number, number][] = history[icao].map(frame => [frame.lat, frame.lon] as [number, number]);
        if (this.paths[icao]) {
          this.paths[icao].setLatLngs(pathCoordinates);
        } else {
          const polyline = L.polyline(pathCoordinates, {
            color: 'red',
            weight: 2
          }).addTo(this.map);
          this.paths[icao] = polyline;
        }
      });
    });
  }
}