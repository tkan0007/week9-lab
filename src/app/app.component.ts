import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab';
  isActor:boolean=true;
  isMovie:boolean=false;
  toggleTitle:string="Switch to Movie"

  changeState(){
    if(this.isActor){
      this.isMovie = false;
    }else{
      this.isMovie = true;
    }
    if(this.isActor){
      this.toggleTitle = "Switch to Actor";
    }else{
      this.toggleTitle = "Switch to Movie";
    }
    this.isActor = !this.isActor;
    this.isMovie = !this.isMovie;
  }
}
