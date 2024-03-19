import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBarComponent } from './play-bar.component';

describe('PlayBarComponent', () => {
  let component: PlayBarComponent;
  let fixture: ComponentFixture<PlayBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayBarComponent]
    });
    fixture = TestBed.createComponent(PlayBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
