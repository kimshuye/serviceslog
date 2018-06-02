import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupFormComponent } from './topup-form.component';

describe('TopupFormComponent', () => {
  let component: TopupFormComponent;
  let fixture: ComponentFixture<TopupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
