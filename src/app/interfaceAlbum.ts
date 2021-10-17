export interface Artiste<T> {
  name: string,
  joindate: string,
  albums: Array<T>,
  tracks: Array<T>,
}
export interface Tracks{
  album_name: string,
  name: string,
  duration: string,
  audio: string,
  image: string,
  audiodownload: string,
  audiodownload_allowed: boolean,
}
export interface Album{
  id: string,
  name: string,
  releasedate: string,
  image: string,
}
export interface APIResponse<T>{
  results: Array<T>,
}

