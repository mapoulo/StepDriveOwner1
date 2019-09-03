import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-pastbookings',
  templateUrl: './pastbookings.page.html',
  styleUrls: ['./pastbookings.page.scss'],
})
export class PastbookingsPage implements OnInit {
  db = firebase.firestore();
user = {
  uid: ''
}
mon = []
tue = []
wed = []
thu = []
fri = []
sat = []
sun = []

  storage = firebase.storage().ref();
  requests=[];
  constructor() { 
    this.db.collection('request').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        // this.users = doc.data();
        this.requests.push(doc.data());
        console.log('The requests:',this.requests);
        
        
      })
    });


  }

  ngOnInit() {
  }
  
}
