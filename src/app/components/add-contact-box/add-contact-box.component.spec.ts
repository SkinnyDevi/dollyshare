import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactBoxComponent } from './add-contact-box.component';

describe('AddContactBoxComponent', () => {
  let component: AddContactBoxComponent;
  let fixture: ComponentFixture<AddContactBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
