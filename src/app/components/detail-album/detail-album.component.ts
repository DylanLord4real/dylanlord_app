import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AlbumServiceService } from 'src/app/services/album-service.service';
import { Artiste, Tracks, APIResponse } from './../../interfaceAlbum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.scss']
})
export class DetailAlbumComponent implements OnInit {
  private name: string = "dylan+lord";
  albumId!: string;
  public tracks!: Array<Tracks>;
  public tracksInfo!: Array<Artiste<Tracks>>;
  trackSub!: Subscription;
  routeSub!: Subscription;
  constructor(private serv: AlbumServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.albumId = params['album_id'];
      console.log(this.albumId);
      this.getListTracks(this.albumId);
    })
  }

  getListTracks(name_album: string): void{
    this.trackSub = this.serv
    .getTrackListAlbum(this.name, name_album)
    .subscribe((trackList: APIResponse<Artiste<Tracks>>) => {
      this.tracksInfo = trackList.results;
      console.log(trackList);
    })
  }

}
