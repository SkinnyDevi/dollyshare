import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActiveLinkComponent } from './manage-active-link.component';

describe('ManageActiveLinkComponent', () => {
  let component: ManageActiveLinkComponent;
  let fixture: ComponentFixture<ManageActiveLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageActiveLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageActiveLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
