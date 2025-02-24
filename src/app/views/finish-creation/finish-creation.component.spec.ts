import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishCreationComponent } from './finish-creation.component';

describe('FinishCreationComponent', () => {
  let component: FinishCreationComponent;
  let fixture: ComponentFixture<FinishCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
