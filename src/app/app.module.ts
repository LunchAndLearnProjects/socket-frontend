import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';

const ROUTES: Routes = [
  { path: ':name', component: ChatViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
