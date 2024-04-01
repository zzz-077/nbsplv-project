import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SelectedMusic } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css'],
})
export class MusicCardComponent {
  @Input() AlbumMusics: any = {};
  @Input() allMusicId: string[] = [];
  @Input() UsersListMusicID: string = '';
  @Input() index: number = 0;
  @Input() albumImg_child: string = '';
  @Output() cardClicked: EventEmitter<void> = new EventEmitter<void>();
  addPlaylistMusicId: string = '';
  isAddinPlaylistClicked: boolean = false;
  clickedCard: any = null;
  constructor(
    private localStg: LocalstoragesService,
    private artistData: ArtistDataService
  ) {}

  // for User playlists
  ngOnInit() {
    if (this.UsersListMusicID) {
      this.artistData.getMusic(this.UsersListMusicID).subscribe((musicData) => {
        this.AlbumMusics = musicData;
        this.albumImg_child = this.AlbumMusics.album.images[1].url;
      });
    }
  }

  musicClick(music: any) {
    this.cardClicked.emit();
    if (this.clickedCard === music) {
      this.clickedCard = null;
    } else {
      this.clickedCard = music;
    }
    // console.log('index', this.AlbumMusics);
    let selectedMusic: SelectedMusic = {
      index: 0,
      musicId: '',
      albumMusicIds: [],
    };
    if (this.UsersListMusicID) {
      selectedMusic = {
        index: this.index - 1,
        musicId: music.id,
        albumMusicIds: this.allMusicId,
      };
    } else {
      selectedMusic = {
        index: this.index - 1,
        musicId: music.id,
        albumMusicIds: this.allMusicId,
      };
    }
    this.localStg.setSelectedMusic(selectedMusic);
  }

  addInPlaylist(musicId: string) {
    this.addPlaylistMusicId = musicId;
    this.isAddinPlaylistClicked = true;
  }

  PopupCancelled() {
    this.isAddinPlaylistClicked = false;
  }
}
