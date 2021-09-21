import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actorId: string = "";
  fullName: string = "";
  bYear: number = 0;
  section = 1
  actorsDB: any[] = [];

  constructor(private dbService: DatabaseService){}

  ngOnInit(): void {
    this.onGetActors();
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
    this.dbService.getActors().subscribe((data:any) =>{ // why not any[]?
      this.actorsDB = data;
    });
  }

  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onSelectUpdate(item:any) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe((data:any)=>{
      this.onGetActors;
    })
  }

  onDeleteActor(item:any) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

}
