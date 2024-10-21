import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSelfFeedComponent } from './card-self-feed.component';

describe('CardSelfFeedComponent', () => {
  let component: CardSelfFeedComponent;
  let fixture: ComponentFixture<CardSelfFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSelfFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSelfFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
