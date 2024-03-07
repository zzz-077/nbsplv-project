import { Component } from '@angular/core';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {
  UserData = {
    id: '',
    name: '',
    img: 'assets/userDefault_img.png',
    playlists: {},
  };
  constructor(private localStg: LocalstoragesService) {
    this.localStg.isUserdata$.subscribe((data) => {
      if (data) {
        this.UserData = {
          id: data.id,
          name: data.name,
          img: data.img,
          playlists: data.playlists,
        };
      }
      console.log(this.UserData.playlists);
      console.log(this.UserData);
    });
  }
  getPlaylistNames(): string[] {
    return Object.keys(this.UserData.playlists);
  }
}
