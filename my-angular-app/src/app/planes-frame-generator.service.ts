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

  constructor() { 
    this.generateICAOList();
  }

  private generateICAOList() {
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    for (let i = 0; i < 5; i++) {
      this.icaoList.push(
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)] +
        letters[Math.floor(Math.random() * 26)] 

      );
    }
  }

  getFrames(): Observable<PlaneFrame[]> {
    return interval(1000).pipe(
      map(() => this.icaoList.map((icao) => this.generateFrame(icao)))
    );
  }

  private generateFrame(icao: string): PlaneFrame {
    return {
      icao,
      speed: Math.floor(Math.random() * 1000),
      lat: Math.random() * 180 - 90,
      lon: Math.random() * 360 - 180,
      alt: Math.floor(Math.random() * 10000),
      timestamp: Date.now()
    };
  }
}
