import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteButtonComponent } from './route-button.component';

describe('FormButtonComponent', () => {
  let component: RouteButtonComponent;
  let fixture: ComponentFixture<RouteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RouteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
