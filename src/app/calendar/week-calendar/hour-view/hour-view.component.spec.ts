import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourViewComponent } from './hour-view.component';

describe('HourViewComponent', () => {
  let component: HourViewComponent;
  let fixture: ComponentFixture<HourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
