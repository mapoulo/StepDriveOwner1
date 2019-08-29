import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-past-b',
  templateUrl: './past-b.page.html',
  styleUrls: ['./past-b.page.scss'],
})
export class PastBPage implements OnInit {
  //database
  db = firebase.firestore();
  //array in a database
  reviews = [];
  constructor(private router: Router) { 
    this.db.collection('review').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        // this.users = doc.data();
        this.reviews.push(doc.data());
        console.log('The reviews:',this.reviews);    
      })
    });

  }

  ngOnInit() {
  }
  goToGraph() {
    this.router.navigate(['graphs']);
  }
}
