import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListBoxComponent } from './contact-list-box.component';

describe('ContactListBoxComponent', () => {
  let component: ContactListBoxComponent;
  let fixture: ComponentFixture<ContactListBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
