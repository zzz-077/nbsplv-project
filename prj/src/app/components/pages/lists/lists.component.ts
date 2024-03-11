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
  };
  playlists: any[] = [];

  constructor(private localStg: LocalstoragesService) {
    this.localStg.isUserdata$.subscribe((data) => {
      if (data) {
        this.UserData = {
          id: data.id,
          name: data.name,
          img: data.img,
        };
      }

      this.playlists = data.playlists;
      this.playlists = Object.values(data.playlists);
      // console.log(this.playlists);
    });
  }
}
