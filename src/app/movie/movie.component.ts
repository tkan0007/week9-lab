import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieId: string = "";
  title: string = "";
  year: number = 0;
  section = 1
  moviesDB: any[] = [];
  from:number = 0;
  to:number = 0;

  constructor(private dbService: DatabaseService){}

  ngOnInit(): void {
    this.onGetMovies();
  }

  changeSection(sectionId: number){
    this.section = sectionId;
    this.resetValue();
  }

  resetValue(){
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any) =>{
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe((data:any) => {
      this.onGetMovies();
    });
  }

  onSelectUpdate(item:any) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.updateMovie(this.movieId, obj).subscribe(
      result =>{
        console.log("OK");
        this.onGetMovies();
      },(err) =>{
        console.log("Error:");
        console.error();
      },()=>{
        console.log("Complete!");
      }

    )
  }

  onDeleteMovie() {
    let obj = {title:this.title};
    this.dbService.deleteMovie(obj.title).subscribe((data:any) => {
      this.onGetMovies();
    });
  }

  onDeleteMovieByDuration(){
    let obj = {from:this.from, to: this.to};
    this.dbService.deleteMovieByDuration(obj.from, obj.to).subscribe((data:any) => {
      this.onGetMovies();
    });
  }

}
