import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieId: string = "";
  actorId: string = "";
  title: string = "";
  year: number = 0;
  fullName:string = "";
  bYear:number = 0;
  section = 1
  showEvent:boolean = false;
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  enrolledActors: any[] = [];
  availableActors: any[] = [];
  from:number = 0;
  to:number = 0;
  count:number = 0;

  constructor(private dbService: DatabaseService){}

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionId: number){
    this.section = sectionId;
    this.resetValue();
  }

  showActorList(showEvent:boolean){
    this.showEvent = showEvent;
  }

  resetValue(){
    this.title = "";
    this.year = 0;
    this.movieId = "";
    this.showEvent = false;
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any) =>{
      this.moviesDB = data;
    });
  }

  onGetActors(){
    this.dbService.getActors().subscribe((data:any) =>{
      this.actorsDB = data;
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


  setMovie(item:any) {
    if(this.movieId != item.movieId){
      console.log("Apply new change");

      // get item values into local value
      this.title = item.title;
      this.year = item.year;
      this.movieId = item._id;

      // function to make the list for easily choosing actor
      this.onFindActor(this.movieId);
      this.setAvailableActor(this.actorsDB, this.enrolledActors);

      // show the actor table to choose
      if(!this.showEvent){
        this.showActorList(true);
      }
    }
  }

  setActor(actor:any) {
    this.fullName = actor.name;
    this.bYear = actor.bYear;
    this.actorId = actor._id;
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

// the simplest but not responsive
//this.availableActors = this.actorsDB;

// For making the responsive list, but not working after running a time.
  onAddActor(){
    this.dbService.addActorMovie(this.movieId,this.actorId).subscribe((data:any)=>{
      this.ngOnInit();
    })
  }

  // find actors from moviesDB, not involving any http request
  onFindActor(movieId:string){
    this.count++;
    //console.log(this.count+" time to call for "+ movieId); // for check
    for(var movie of this.moviesDB){
      if(movie._id == movieId){
        this.enrolledActors = movie.actors;
        break;
      }
    }
  }
  // Set adaptive array for Add actor
  setAvailableActor(actorsDB:any[], enrolledActors:any[]){
    // For test
    //this.ngOnInit(); // to initialize the DBs
    //let availableActorsObj = Object.assign({}, {data: actorsDB});
    // End
    let aActors = JSON.parse(JSON.stringify(actorsDB));
    // For test
    //console.log(aActors);
    //console.log("Number of actor in DB:" + actorsDB.length);
    //console.log("Number of actor in DB:" + aActors.length);
    //console.log("Inside of setAvailableActor")
    //console.log(aActors);
    // End
    for(let i = 0;i<enrolledActors.length;i++){ // maybe I can use forEach
      for(let j = 0; j<aActors.length;j++){
        if(enrolledActors[i]._id == aActors[j]._id){
          aActors.splice(j,1);
          break;
        }
      }
    }
    //return availableActors;
    //console.log("After cutting off existed actors in movie");
    //console.log(aActors);
    this.availableActors = aActors;
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
