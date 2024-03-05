import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCardComponent } from './music-card.component';

describe('MusicCardComponent', () => {
  let component: MusicCardComponent;
  let fixture: ComponentFixture<MusicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicCardComponent]
    });
    fixture = TestBed.createComponent(MusicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
