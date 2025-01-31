import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Venue } from '../../models/venue';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../models/event';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-venue-events',
  standalone: false,
  
  templateUrl: './venue-events.component.html',
  styleUrl: './venue-events.component.scss'
})
export class VenueEventsComponent implements OnInit{
  @Input() venue?: Venue
  events: Event[] = [];

  constructor(private eventService: EventService, protected authService: AuthService) { }

  ngOnInit(): void {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    if(this.venue) {
      this.eventService.getUpComingEventsByVenueId(this.venue.id).subscribe((events) => {console.log("x",events); this.events = events});
    }
    
  }

  onViewDetails(event: Event) {

  }
}
