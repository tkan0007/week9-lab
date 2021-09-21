import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { DatabaseService } from './database.service';

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
