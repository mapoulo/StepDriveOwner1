import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-pastbookings',
  templateUrl: './pastbookings.page.html',
  styleUrls: ['./pastbookings.page.scss'],
})
export class PastbookingsPage implements OnInit {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  
  constructor() { }

  ngOnInit() {
  }

}
