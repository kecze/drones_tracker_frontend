import { Component } from '@angular/core';
import { PlanesHistoryServiceService } from './planes-history-service.service';
import { PlanesMapComponent } from './planes-map/planes-map.component'; 
import { PlanesTabKphComponent } from './planes-tab-kph/planes-tab-kph.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, PlanesMapComponent, PlanesTabKphComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drones tracker';
  planes: any[] = [];

  constructor(private historyService: PlanesHistoryServiceService) {
    this.historyService.history$.subscribe(history => {
      this.planes = Object.values(history).map(frames => frames[frames.length - 1]);
    });
  }
}