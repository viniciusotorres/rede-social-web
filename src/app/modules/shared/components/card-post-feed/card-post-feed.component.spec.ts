import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPostFeedComponent } from './card-post-feed.component';

describe('CardPostFeedComponent', () => {
  let component: CardPostFeedComponent;
  let fixture: ComponentFixture<CardPostFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPostFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPostFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
