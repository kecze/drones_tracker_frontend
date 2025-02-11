import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { PlanesFrameGeneratorService } from './planes-frame-generator.service';


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
export class PlanesHistoryServiceService {
  private history: { [icao: string]: PlaneFrame[] } = {};
  private historySubject = new BehaviorSubject<{ [icao: string]: PlaneFrame[] }>({});

  history$ = this.historySubject.asObservable();

  constructor(private generatorService: PlanesFrameGeneratorService) {
    this.generatorService.getFrames().subscribe((frames) => {
      console.log('Otrzymane dane frames:', frames);
      frames.forEach((frame) => {
        if (!this.history[frame.icao]) {
          this.history[frame.icao] = [];
        }
        this.history[frame.icao].push(frame);

        if (this.history[frame.icao].length > 20) {
          this.history[frame.icao].shift();
        }
      });
      this.historySubject.next(this.history);
    });
   }

   getHistory(icao: string): PlaneFrame[] {
      return this.history[icao] || [];
    }

    addFrame(icao: string, frame: PlaneFrame) {
      if (!this.history[icao]) {
        this.history[icao] = [];
      }
      this.history[icao].push(frame);

      if (this.history[icao].length > 20) {
        this.history[icao].shift();
      }
      this.historySubject.next(this.history);
    }
}
