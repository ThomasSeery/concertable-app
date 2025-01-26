import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListingService } from '../../services/listing/listing.service';
import { Venue } from '../../models/venue';
import { of } from 'rxjs';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-listings',
  standalone: false,
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.scss'
})
export class ListingsComponent  implements OnChanges {

  @Input() venue?: Venue
  @Input() editMode?: boolean
  protected listings?: Listing[]

  constructor(private listingService: ListingService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['venue'])
      this.getListings();
  }

  getListings() {
    console.log("getActiveListings");
    console.log(this.venue);
    if(this.venue?.id) 
      this.listingService.getActiveListingsByVenueId(this.venue.id).subscribe((listingsResponse) => {console.log(listingsResponse); this.listings = listingsResponse})
  }

  createListing(listing: Listing) {
    this.listingService.createListing(listing).subscribe();
  }

  
  
}
