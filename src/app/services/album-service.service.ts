import { APIResponse, Album, Artiste, Tracks } from './../interfaceAlbum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {
  private key: string = "12ab60fe";

  constructor(private http: HttpClient) {
   }

   getTrackListAlbum(artist_name: string, album_id: string): Observable<APIResponse<Artiste<Tracks>>>{
     let params = new HttpParams()
     .set('client_id', this.key)
     .set('name', artist_name)
     .set('album_id', album_id);

     return this.http.get<APIResponse<Artiste<Tracks>>>(`${env.BASE_URL_JAMENDO_TR}`, {
       params: params,
     });
   }
   getAlbumList(ordering: string, search?: string): Observable<APIResponse<Artiste<Album>>>{
     let params = new HttpParams().set('client_id', this.key).set('name', ordering);
    if(search){
      params = new HttpParams().set('client_id', this.key).set('name', ordering).set('album_name', search);
    }

    return this.http.get<APIResponse<Artiste<Album>>>(`${env.BASE_URL_JAMENDO_AL}` , {
      params: params,
    })
   }
}
