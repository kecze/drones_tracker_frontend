import { Component, OnInit } from '@angular/core';
import { PlanesHistoryServiceService } from '../planes-history-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alternative-planes-tab',
  imports: [CommonModule],
  templateUrl: './alternative-planes-tab.component.html',
  styleUrls: ['./alternative-planes-tab.component.css'],
  standalone: true,
  providers: [PlanesHistoryServiceService]
})

export class AlternativePlanesTabComponent implements OnInit{
  planes: any[] = [];

  constructor(private planesHistoryService: PlanesHistoryServiceService) {}

  ngOnInit() {
    this.planesHistoryService.history$.subscribe(history => {
      console.log('Otrzymane dane z history$:', history);
      this.planes = Object.values(history).map(frames => frames[frames.length - 1]);
    });
}
}
