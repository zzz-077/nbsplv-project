import { Component, OnInit } from '@angular/core';
import { SelectedMusic } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.css'],
})
export class PlayBarComponent {
  selectedMusic: SelectedMusic = {
    index: 0,
    musicId: '',
    albumMusicIds: [],
  };
  musicData: any = {
    albumImg: '',
    musicName: '',
    duration: 0,
    musicUrl: '',
  };
  isSoundMuted: boolean = false;
  isSoundPaused: boolean = false;
  audio: HTMLAudioElement = new Audio();
  isLoader: boolean = false;
  constructor(
    private localStg: LocalstoragesService,
    private artistData: ArtistDataService
  ) {
    this.isLoader = true;
    this.localStg.selectedMusic$.subscribe((selectedMusic) => {
      this.selectedMusic = selectedMusic;
      this.artistData
        .getMusic(selectedMusic.musicId)
        .subscribe((musicData: any) => {
          this.musicData = {
            albumImg: musicData.album.images[1].url,
            musicName: musicData.name,
            duration: musicData.duration_ms,
            musicUrl: musicData.preview_url,
          };
          this.isLoader = false;
          this.audio.src = this.musicData.musicUrl;
        });
      this.isSoundPaused = false;

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

  nextMusicClick() {
    this.isLoader = true;
    const AlbumMusics = this.selectedMusic.albumMusicIds;
    const musicId = this.selectedMusic.index;
    let nextMusicId;
    nextMusicId = AlbumMusics.find((music, index) => {
      return index === musicId + 1;
    });
    console.log(AlbumMusics);

    if (nextMusicId === undefined) {
      this.selectedMusic = {
        index: 0,
        musicId: this.selectedMusic.albumMusicIds[0],
        albumMusicIds: AlbumMusics,
      };
      this.localStg.setSelectedMusic(this.selectedMusic);
    } else {
      this.selectedMusic = {
        index: musicId + 1,
        musicId: nextMusicId,
        albumMusicIds: AlbumMusics,
      };
      this.isLoader = false;
      this.localStg.setSelectedMusic(this.selectedMusic);
    }
  }

  prevMusicClick() {
    this.isLoader = true;
    const AlbumMusics = this.selectedMusic.albumMusicIds;
    const musicId = this.selectedMusic.index;
    let prevMusicId;
    prevMusicId = AlbumMusics.find((music, index) => {
      return index === musicId - 1;
    });
    if (prevMusicId === undefined) {
      this.selectedMusic = {
        index: this.selectedMusic.albumMusicIds.length - 1,
        musicId:
          this.selectedMusic.albumMusicIds[
            this.selectedMusic.albumMusicIds.length - 1
          ],
        albumMusicIds: AlbumMusics,
      };
      this.localStg.setSelectedMusic(this.selectedMusic);
    } else {
      this.selectedMusic = {
        index: musicId - 1,
        musicId: prevMusicId,
        albumMusicIds: AlbumMusics,
      };
      this.isLoader = false;
      this.localStg.setSelectedMusic(this.selectedMusic);
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
  }
}
