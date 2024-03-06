import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css'],
})
export class MusicCardComponent {
  @Input() AlbumMusics: any = {};
  @Input() index: number = 0;
  @Input() albumImg_child: string = '';
  constructor(private artistData: ArtistDataService) {}

  ngOnInit() {
    // this.artistData.getMusic(this.AlbumMusics.id).subscribe((musicImg) => {
    //   this.AlbumMusics = {
    //     ...this.AlbumMusics,
    //     img: musicImg,
    //   };
    // });
  }
}
