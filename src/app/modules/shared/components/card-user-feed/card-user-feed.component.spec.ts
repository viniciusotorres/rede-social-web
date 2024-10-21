import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserFeedComponent } from './card-user-feed.component';

describe('CardUserFeedComponent', () => {
  let component: CardUserFeedComponent;
  let fixture: ComponentFixture<CardUserFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUserFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
