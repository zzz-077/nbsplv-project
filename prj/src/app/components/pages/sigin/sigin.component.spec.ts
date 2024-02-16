import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginComponent } from './sigin.component';

describe('SiginComponent', () => {
  let component: SiginComponent;
  let fixture: ComponentFixture<SiginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiginComponent]
    });
    fixture = TestBed.createComponent(SiginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
