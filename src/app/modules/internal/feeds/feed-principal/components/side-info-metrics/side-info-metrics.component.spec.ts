import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideInfoMetricsComponent } from './side-info-metrics.component';

describe('SideInfoMetricsComponent', () => {
  let component: SideInfoMetricsComponent;
  let fixture: ComponentFixture<SideInfoMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideInfoMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideInfoMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
