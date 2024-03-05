import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  albums: any[] = [];
  filteredAlbums: any[] = [];
  sliders = [
    {
      quote: 'Rhythms of the Heart: Beats That Speak',
      img: 'assets/main_banner1.jpg',
    },
    {
      quote: 'Harmonies of the Soul: Exploring the Melodies Within',
      img: 'assets/main_banner2.jpg',
    },
    {
      quote: 'Symphony of Emotions: A Journey Through Sound',
      img: 'assets/main_banner3.jpg',
    },
    {
      quote: 'Painting with Musical Notes',
      img: 'assets/main_banner4.jpg',
    },
  ];
  selectedAlbum: any = {};
  isSearchedAlbums: boolean = true;
  searchtestSubject: Subject<string> = new Subject<string>();
  constructor(private router: Router, private artistData: ArtistDataService) {
    this.searchtestSubject.pipe(debounceTime(500)).subscribe((searchText) => {
      this.filterSearch(searchText);
    });
    this.artistData.getArtistAlbums().subscribe((albums) => {
      if (Array.isArray(albums)) {
        albums.forEach((album: any) => {
          this.albums.push({
            id: album.id,
            name: album.name,
            release_date: album.release_date,
            total_tracks: album.total_tracks,
            img: album.images[1].url,
          });
          this.filteredAlbums.push({
            id: album.id,
            name: album.name,
            release_date: album.release_date,
            total_tracks: album.total_tracks,
            img: album.images[1].url,
          });
        });
      }
    });
  }

  filterSearch(searchText: string) {
    if (searchText.trim() === '') {
      this.isSearchedAlbums = true;
      this.filteredAlbums = this.albums;
    } else {
      this.artistData.getFilteredAlbums(searchText).subscribe(
        (albums) => {
          if (albums.length > 0) {
            this.isSearchedAlbums = true;
          } else {
            this.isSearchedAlbums = false;
            // console.log(this.isSearchedAlbums);
          }
          // console.log(this.isSearchedAlbums);
          this.filteredAlbums = [];
          this.filteredAlbums = albums.map((album: any) => {
            return {
              id: album.id,
              name: album.name,
              release_date: album.release_date,
              total_tracks: album.total_tracks,
              img: album.images[1]?.url || '',
            };
          });
        },
        (error) => {
          console.error('Error fetching filtered albums:', error);
          this.filteredAlbums = [];
        }
      );
    }
  }

  onSearchInput(event: any) {
    this.searchtestSubject.next(event.target.value);
  }

  albumClick(album: any) {
    this.artistData.setClickedAlbum(album);
    this.router.navigate([`album/${album.id}`]);
  }
}
