import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLinkEntryComponent } from './active-link-entry.component';

describe('ActiveLinkEntryComponent', () => {
  let component: ActiveLinkEntryComponent;
  let fixture: ComponentFixture<ActiveLinkEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveLinkEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveLinkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
