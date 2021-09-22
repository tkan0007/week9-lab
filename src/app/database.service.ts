import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  result: any;

  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data:object) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id: string, data:any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  // for Movie
  getMovies() {
    return this.http.get("/movies");
  }
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  createMovie(data:object) {
    return this.http.post("/movies", data, httpOptions);
  }
  updateMovie(id: string, data:any) {
    let url = "/movies/" + id;
    return this.http.put(url, data, httpOptions);
  }
  addActorMovie(movieId:string, actorId:string){
    let url = "movies/addActorMovie/"+movieId+"/"+actorId;
    return this.http.put(url,httpOptions);
  }
  deleteMovie(title: string) {
    let url = "/movies/" + title;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieByDuration(from: number, to: number){
    let url = "/movies/delDuration/"+from+"/"+to;
    return this.http.delete(url,httpOptions);
  }
}
