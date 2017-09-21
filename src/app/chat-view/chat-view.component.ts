import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  socket = io('http://localhost:3000');
  name : String = '';
  messages : any = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.name = params['name'];
    });
    this.socket.on('loaded messages', function(messageList){
      this.messages = messageList;
    }.bind(this));
    this.socket.on('chat message', function(message){
      this.messages.push(message);
    }.bind(this));
    this.socket.emit('load messages');
  }

}
