import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistDataService {
  private clientId = 'b3b6638a73a44662be955a3235338ef0';
  private clientSecret = '456e1a4e4d044be5bdff4fb122cb4c0f';
  private token: string = '';
  private artistId: string = '61TQfpvTjHYQjPrvtJPwVa';
  private albums: string =
    'albums?include_groups=album,single,compilation,appears_on&offset=0&limit=20&locale=en-CA,en;q=0.9,ka;q=0.8';
  constructor(private http: HttpClient) {}

  private async getToken(): Promise<string> {
    if (!this.token) {
      const tokenResponse = await this.http
        .post<any>(
          'https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization:
                'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
            }),
          }
        )
        .toPromise();
      this.token = tokenResponse.access_token;
    }
    return this.token;
  }

  getGenres(): Observable<any> {
    return new Observable<any>((observer) => {
      this.getToken()
        .then((token) => {
          this.http
            .get<any>(
              'https://api.spotify.com/v1/browse/categories?locale=sv_US',
              {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + token,
                }),
              }
            )
            .subscribe(
              (data) => {
                observer.next(data.categories.items);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getArtistInfo(): Observable<any> {
    return new Observable<any>((observer) => {
      this.getToken()
        .then((token) => {
          this.http
            .get<any>(`https://api.spotify.com/v1/artists/${this.artistId}`, {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
              }),
            })
            .subscribe(
              (data) => {
                observer.next(data);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getArtistAlbums(): Observable<any> {
    return new Observable<any>((observer) => {
      this.getToken()
        .then((token) => {
          this.http
            .get<any>(
              `https://api.spotify.com/v1/artists/${this.artistId}/${this.albums}`,
              {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + token,
                }),
              }
            )
            .subscribe(
              (data) => {
                observer.next(data.items);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getArtistAlbumsTracks(albumId: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.getToken()
        .then((token) => {
          this.http
            .get<any>(
              `https://api.spotify.com/v1/albums/${albumId}/tracks?offset=0&limit=20&locale=en-CA,en;q=0.9,ka;q=0.8`,
              {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + token,
                }),
              }
            )
            .subscribe(
              (data) => {
                observer.next(data);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}