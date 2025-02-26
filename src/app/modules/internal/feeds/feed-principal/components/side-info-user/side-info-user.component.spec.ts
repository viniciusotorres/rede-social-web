import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideInfoUserComponent } from './side-info-user.component';

describe('SideInfoUserComponent', () => {
  let component: SideInfoUserComponent;
  let fixture: ComponentFixture<SideInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideInfoUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
