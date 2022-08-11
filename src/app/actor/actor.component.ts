import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

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
  enrolledMovies: any[] = [];
  availableMovies: any[] = [];
  from:number = 0;
  to:number = 0;
  count:number = 0;

  constructor(private dbService: DatabaseService){}

  showActorList(showEvent:boolean){
    this.showEvent = showEvent;
  }

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId: number){
    this.section = sectionId;
    this.resetValue();
  }

  resetValue(){
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }

  onGetActors(){
    this.dbService.getActors().subscribe((data:any) =>{
      this.actorsDB = data;
    });
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any) =>{
      this.moviesDB = data;
    });
  }

  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe((data:any) => {
      this.onGetActors();
    });
  }

  onSelectUpdate(item:any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onSetActor(item:any) {
    if(this.actorId != item.actorId){
      console.log("Apply new change");

      // get item values into local value
      this.fullName = item.title;
      this.bYear = item.year;
      this.actorId = item._id;

      // function to make the list for easily choosing actor
      this.onFindMovie(this.actorId);
      this.setAvailableMovie(this.moviesDB, this.enrolledMovies);

      // show the actor table to choose
      if(!this.showEvent){
        this.showActorList(true);
      }
    }
  }

  setMovie(movie:any){
    this.title = movie.title;
    this.year = movie.year;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(
      result =>{
        console.log("OK");
        this.onGetActors();
      },(err) =>{
        console.log("Error:");
        console.error();
      },()=>{
        console.log("Complete!");
      }

    )
  }

  onExtraTask(){
    this.dbService.deleteActorMovie(this.actorId,this.movieId).subscribe((data:any)=>{
      this.ngOnInit();
    })
  }

  onFindMovie(actorId:string){
    this.count++;
    //console.log(this.count+" time to call for "+ movieId); // for check
    for(var actor of this.actorsDB){
      if(actor._id == actorId){
        this.enrolledMovies = actor.movies;
        break;
      }
    }
  }

  setAvailableMovie(moviesDB:any[], enrolledMovies:any[]){
    let bMovies = JSON.parse(JSON.stringify(moviesDB));
    for(let i = 0;i<enrolledMovies.length;i++){ // maybe I can use forEach
      for(let j = 0; j<bMovies.length;j++){
        if(enrolledMovies[i]._id == bMovies[j]._id){
          bMovies.splice(j,1);
          break;
        }
      }
    }
    this.availableMovies = bMovies;
  }

  onDeleteActor(item:any) {
    this.dbService.deleteActor(item._id).subscribe((data:any) => {
      this.onGetActors();
    });
  }

}
