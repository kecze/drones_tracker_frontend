import { Component, OnInit } from '@angular/core';
import { PlanesHistoryServiceService } from '../planes-history-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-planes-tab-mph',
  imports: [CommonModule],
  templateUrl: './planes-tab-mph.component.html',
  styleUrls: ['./planes-tab-mph.component.css']
})
export class PlanesTabMphComponent implements OnInit{
  planes: any[] = [];
  
  constructor(private historyService: PlanesHistoryServiceService) { }

  ngOnInit() {
    this.historyService.history$.subscribe((history) => {
      this.planes = Object.values(history).map((frames) => frames[frames.length - 1]);
  });
  }

  convertKphToMph(kph: number): number {
    return kph * 0.621371;
  }

  convertMetersToFeet(meters: number): number {
    return meters * 3.28084;
  }
}
