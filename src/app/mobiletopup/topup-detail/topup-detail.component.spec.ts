import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupDetailComponent } from './topup-detail.component';

describe('TopupDetailComponent', () => {
  let component: TopupDetailComponent;
  let fixture: ComponentFixture<TopupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
