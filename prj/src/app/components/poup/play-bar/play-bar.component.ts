import { Component, OnInit } from '@angular/core';
import { SelectedMusic } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css'],
})
export class PlayBarComponent {
  selectedMusic: SelectedMusic = {
    albumImg: '',
    musicName: '',
    duration: 0,
    musicUrl: '',
  };
  isSoundMuted: boolean = false;
  isSoundPaused: boolean = false;
  audio: HTMLAudioElement = new Audio();

  constructor(private localStg: LocalstoragesService) {
    this.localStg.selectedMusic$.subscribe((selectedMusic) => {
      selectedMusic.duration = selectedMusic.duration;
      this.selectedMusic = selectedMusic;
      this.audio.src = selectedMusic.musicUrl;
      this.audio.load();
    });
  }

  songMuteClick() {
    this.isSoundMuted = !this.isSoundMuted;
    if (this.isSoundMuted) {
      this.audio.volume = 0;
    } else {
      this.audio.volume = 1;
    }
  }

  songPauseClick() {
    if (this.isSoundPaused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isSoundPaused = !this.isSoundPaused;
  }

  updateCurrentTime(value: any) {
    const currentVal = value.value;

    this.audio.currentTime = currentVal;
    console.log(this.audio.currentTime);
  }
}
