import { APIResponse, Artiste } from './../../interfaceAlbum';
import { Album } from '../../interfaceAlbum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumServiceService } from 'src/app/services/album-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public artistInfo!: Array<Artiste<Album>>;
  public albums!: Array<Album>;
  public artist: string = "dylan+lord";
  private routeSub!: Subscription;
  private albumSub!: Subscription;

  constructor(private alservice: AlbumServiceService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if(params['album_name']){
        this.getInfoAlbumJamendo(this.artist, params['album_name']);
        this.getInfoAlbumJamendo(this.artist);
      }else{
        this.getInfoAlbumJamendo(this.artist);
        this.getInfoAlbumJamendo(this.artist);
      }
    })
  }

  openAlbum(id: string): void{
    this.route.navigate(['details', id]);
  }

  getInfoAlbumJamendo(name: string,search?: string): void{
    this.albumSub = this.alservice
    .getAlbumList(name, search)
    .subscribe((albumList: APIResponse<Artiste<Album>>) => {
      this.artistInfo = albumList.results;
      console.log(albumList);
    });
  }
  getAlbumFromArtist(artistApi: Artiste<Album>): void{
    this.albums = artistApi.albums;
    console.log("Albums : "+this.albums);
  }

  ngOnDestroy(): void {
    if(this.albumSub){
      this.albumSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
