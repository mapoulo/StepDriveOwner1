import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  db = firebase.firestore();
  users = [];
  todo =[];

  constructor(private router:Router) {
    this.db.collection('businesses').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        // this.users = doc.data();
        this.users.push(doc.data());
        console.log('The number of users is:',this.users.length);
        
        
      })
    });


   }

  ngOnInit() {
  }
  goToPastB() {
    this.router.navigate(['past-b']);
  }
}
