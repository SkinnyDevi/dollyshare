import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTextComponent } from './share-text.component';

describe('ShareTextComponent', () => {
  let component: ShareTextComponent;
  let fixture: ComponentFixture<ShareTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
