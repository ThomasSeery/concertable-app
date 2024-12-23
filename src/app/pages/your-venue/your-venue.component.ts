import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VenueService } from '../../services/venue/venue.service';

@Component({
  selector: 'app-your-venue',
  standalone: false,
  
  templateUrl: './your-venue.component.html',
  styleUrl: './your-venue.component.scss'
})
export class YourVenueComponent implements AfterViewInit {

  constructor(private venueService: VenueService) { }

  ngAfterViewInit(): void {
    console.log("yourvenue");
    this.venueService.getUserVenue().subscribe((venue) => console.log(venue));
  }
}
