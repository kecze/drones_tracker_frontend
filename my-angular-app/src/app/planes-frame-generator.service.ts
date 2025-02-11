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
  private basePositions: { [icao: string]: { lat: number, lon: number } } = {};

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
        lon: baseLon + (Math.random() * areaRange * 2 - areaRange)
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
    const range = 0.009; 

    return {
      icao,
      speed: Math.floor(Math.random() * 1000),
      lat: base.lat + (Math.random() * range * 2 - range),
      lon: base.lon + (Math.random() * range * 2 - range),
      alt: Math.floor(Math.random() * 10000),
      timestamp: Date.now()
    };
  }
}