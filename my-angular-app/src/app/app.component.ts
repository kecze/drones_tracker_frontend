import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlanesTabKphComponent } from './planes-tab-kph/planes-tab-kph.component'; 
import { PlanesHistoryServiceService } from './planes-history-service.service';
import { CommonModule } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlanesTabKphComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drones tracker';
}
