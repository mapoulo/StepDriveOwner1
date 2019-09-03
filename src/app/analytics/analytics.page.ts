import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  users = [];

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
    firebase.auth().onAuthStateChanged(res => {
      this.user.uid = res.uid;
    })
    this.getRequests();
  }
  goToPastB() {
    this.router.navigate(['past-b']);
  }
  getRequests() {
    
    this.db.collection('request').where('schooluid', '==',this.user.uid).get().then(res => {
      console.log(res);
      
      res.forEach(doc => {
        console.log(doc.data());
        
        let date = doc.data().datecreated
        let newDate = date.split(" ")
        if (newDate[0] == "Mon") {
          this.mon.push(doc.data())
        } else if (newDate[0] == "Tue") {
          this.tue.push(doc.data())
        }else if (newDate[0] == "wed") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "thu") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "fri") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "sat") {
          this.tue.push(doc.data())
        }
        else if (newDate[0] == "sun") {
          this.tue.push(doc.data())
        }
      })
      // this.createBarChart();
      console.log(this.mon);
      
    }).catch(err => {
      console.log(err);
      
    })
  }
}
