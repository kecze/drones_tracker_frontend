import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

interface PlaneFrame {
  icao: string;
  speed: number;
  lat: number;
  lon: number;
  alt: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlanesFrameGeneratorService {
  private icaoList: string[] = [];
  private basePositions: { [icao: string]: { lat: number, lon: number, speed: number, direction: number } } = {};

  constructor() { 
    this.generateICAOList();
  }

  private generateICAOList() {
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const baseLat = 52.15594; 
    const baseLon = 20.99754;  
    const areaRange = 0.2;  

    for (let i = 0; i < 5; i++) {
      const icao = 
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)];
      this.icaoList.push(icao);
      this.basePositions[icao] = {
        lat: baseLat + (Math.random() * areaRange * 2 - areaRange),
        lon: baseLon + (Math.random() * areaRange * 2 - areaRange),
        speed: Math.floor(Math.random() * 1000),
        direction: Math.random() * 360
      };
    }
  }

  getFrames(): Observable<PlaneFrame[]> {
    return interval(1000).pipe(
      map(() => this.icaoList.map((icao) => this.generateFrame(icao)))
    );
  }

  private generateFrame(icao: string): PlaneFrame {
    const base = this.basePositions[icao];
    const range = 0.004; 

    const newLat = base.lat + (Math.sin(base.direction * Math.PI / 180) * range);
    const newLon = base.lon + (Math.cos(base.direction * Math.PI / 180) * range);

    base.speed = Math.floor(Math.random() * 1000);
    base.direction += (Math.random() * 60 - 30);

    base.lat = newLat;
    base.lon = newLon;
    return {
      icao,
      speed: base.speed,
      lat: base.lat,
      lon: base.lon,
      alt: Math.floor(Math.random() * 10000),
      timestamp: Date.now()
    };
  }
}