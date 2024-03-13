import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, forkJoin, from, merge, mergeMap } from 'rxjs';
import { user } from 'src/app/shared/models/userModel';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  constructor(private firestore: AngularFirestore) {}

  createPlaylist(
    userId: string,
    playlistName: string,
    playlistIcon: string
  ): Observable<void> {
    const playlistObject = {
      playlistIcon: playlistIcon,
      playlistName: playlistName,
      playlistSongs: [],
    };

    const userDocRef = this.firestore.collection('users').doc(userId);

    return from(userDocRef.get()).pipe(
      mergeMap((doc) => {
        const userData = doc.data() as user;
        const playlists = userData.playlists;
        const updatedPlaylists = {
          ...playlists,
          [playlistName]: playlistObject,
        };

        return from(userDocRef.update({ playlists: updatedPlaylists }));
      }),
      catchError((error) => {
        console.log('ERROR CAUGHT IN createPlaylist()', error);
        throw error;
      })
    );
  }

  addMusicInPlaylists(
    userId: string,
    selectedPlaylistsArr: string[],
    songID: string
  ): Observable<void[]> {
    const userDocRef = this.firestore.collection('users').doc(userId);
    const observables = from(userDocRef.get()).pipe(
      mergeMap((doc) => {
        const userData = doc.data() as user;
        const playlists = userData.playlists || {};

        // Update each playlist in the local copy of playlists
        selectedPlaylistsArr.forEach((playlistName) => {
          playlists[playlistName] = {
            ...playlists[playlistName],
            playlistSongs: [
              ...(playlists[playlistName]?.playlistSongs || []),
              songID,
            ],
          };
        });

        // Update the entire playlists object in the database
        return from(userDocRef.update({ playlists }));
      }),
      catchError((error) => {
        console.log('ERROR CAUGHT IN addMusicInPlaylists()', error);
        throw error;
      })
    );

    return forkJoin(observables);
  }
}
