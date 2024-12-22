import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVenuesComponent } from './your-venues.component';

describe('YourVenuesComponent', () => {
  let component: YourVenuesComponent;
  let fixture: ComponentFixture<YourVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YourVenuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
