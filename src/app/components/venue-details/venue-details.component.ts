import { Component, Input } from '@angular/core';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue/venue.service';

@Component({
  selector: 'app-venue-details',
  standalone: false,
  
  templateUrl: './venue-details.component.html',
  styleUrl: './venue-details.component.scss'
})
export class VenueDetailsComponent {
  @Input() venue: Venue | undefined;
  @Input() editMode?: boolean

  constructor(private venueService: VenueService) { }
}
