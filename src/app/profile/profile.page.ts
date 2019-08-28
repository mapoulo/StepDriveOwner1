import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // reference to firebase firestore
  db = firebase.firestore();
  // reference to firebase storage for image uploads
  storage = firebase.storage().ref();
  // to store data from the form inputs
  businessdata = {
    schoolname: '',
    registration: null,
    image: '',
    email: '',
    cellnumber: null,
    cost: '',
    desc: '',
    address: '',
    open: null,
    closed: null,
    allday: true
  }
  profileForm: FormGroup
  constructor(public formBuilder: FormBuilder) { 
    this.profileForm = this.formBuilder.group({
      schoolname: new FormControl ('', Validators.compose([
        Validators.required,
      ])),
    registration: new FormControl ('', Validators.compose([
      Validators.required,
    ])),
    image: new FormControl ('', Validators.compose([
      Validators.required,
    ])),
    email: new FormControl ('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      Validators.maxLength(50),
      Validators.minLength(6)
    ])),
    cellnumber: new FormControl ('', Validators.compose([
      Validators.required,
    ])),
    cost: new FormControl ('', Validators.compose([
      Validators.required,
    ])),
    desc: new FormControl ('', Validators.compose([
      Validators.required,
    ])),
    address: new FormControl ('', Validators.compose([
      Validators.required,
    ])),
    open: new FormControl ('2019-08-22T00:00:32.767+02:00', Validators.compose([
      Validators.required,
    ])),
    closed: new FormControl ('2019-08-22T00:00:32.767+02:00', Validators.compose([
      Validators.required,
    ])),
    allday: new FormControl ('true', Validators.compose([
      Validators.required,
    ]))
    })
  }

  ngOnInit() {
  }
  addBusinessData() {
    console.log(this.profileForm.value);
    this.db.collection('businesses').doc(this.profileForm.value.schoolname).set(this.profileForm.value).then(res => {
      console.log('Success');
    }).catch(err => {
      console.log('Failed');
    })
  }
}
