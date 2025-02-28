import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListEntryComponent } from './contact-list-entry.component';

describe('ContactListEntryComponent', () => {
  let component: ContactListEntryComponent;
  let fixture: ComponentFixture<ContactListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
