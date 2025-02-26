import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonInputFieldComponent } from './common-input-field.component';

describe('CommonInputFieldComponent', () => {
  let component: CommonInputFieldComponent;
  let fixture: ComponentFixture<CommonInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
