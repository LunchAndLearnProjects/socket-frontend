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
  name: String = '';
  messages: any = [];
  message: String = '';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('chat view biatch')
    this.activatedRoute.params.subscribe((params: Params) => {
      this.name = params['name'];
    });
    this.socket.on('loaded messages', function(messageList){
      console.log('messages: ' + JSON.stringify(messageList));
      this.messages = messageList;
      // this.element.scrollIntoView(false);
    }.bind(this));
    this.socket.on('chat message', function(message){
      this.messages.push(message);
      // this.element.scrollIntoView(false);
    }.bind(this));
    this.socket.emit('load messages');
  }

  sendMessage(){
    this.socket.emit('chat message', { username: this.name, value: this.message });
    this.message = '';
  }

  findColor(username, messageName){
    if (username != messageName)
      return 'success';
    return 'info';
  }
}
