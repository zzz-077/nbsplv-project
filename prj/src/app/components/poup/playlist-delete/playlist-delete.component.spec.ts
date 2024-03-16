import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDeleteComponent } from './playlist-delete.component';

describe('PlaylistDeleteComponent', () => {
  let component: PlaylistDeleteComponent;
  let fixture: ComponentFixture<PlaylistDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistDeleteComponent]
    });
    fixture = TestBed.createComponent(PlaylistDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
