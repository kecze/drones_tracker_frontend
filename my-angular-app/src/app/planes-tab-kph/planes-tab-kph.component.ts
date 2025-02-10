import { Component, OnInit } from '@angular/core';
import { PlanesHistoryServiceService } from '../planes-history-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planes-tab-kph',
  imports: [CommonModule],
  templateUrl: './planes-tab-kph.component.html',
  styleUrls: ['./planes-tab-kph.component.css']
})
export class PlanesTabKphComponent implements OnInit {
  planes: any[] = [];

  constructor(private historyService: PlanesHistoryServiceService) { }

  ngOnInit() {
    this.historyService.history$.subscribe((history) => {
      this.planes = Object.values(history).map((frames) => frames[frames.length - 1]);
    });
  }
}
