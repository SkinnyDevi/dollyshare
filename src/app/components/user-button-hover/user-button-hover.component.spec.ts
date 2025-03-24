import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserButtonHoverComponent } from './user-button-hover.component';

describe('UserButtonHoverComponent', () => {
  let component: UserButtonHoverComponent;
  let fixture: ComponentFixture<UserButtonHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserButtonHoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserButtonHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
