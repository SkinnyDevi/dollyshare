import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTextComponent } from './download-text.component';

describe('DownloadTextComponent', () => {
  let component: DownloadTextComponent;
  let fixture: ComponentFixture<DownloadTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
