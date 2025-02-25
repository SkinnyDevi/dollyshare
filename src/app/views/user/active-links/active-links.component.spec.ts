import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserActiveLinksComponent } from './active-links.component';


describe('ActiveLinksComponent', () => {
  let component: UserActiveLinksComponent;
  let fixture: ComponentFixture<UserActiveLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActiveLinksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActiveLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
