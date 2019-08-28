import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/Camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loginForm: FormGroup;
  
  users = {
    schoolname: '',
    registration: '',
    email: '',
    cellnumber: '',
    cost: '',
    desc: '',
    open: '',
    closed: '',
    allday: '',
   
  }


  db = firebase.firestore();
  storage = firebase.storage().ref();
  businessdata = {
    schoolname: '',
    registration: '',
    image: '',
    email: '',
    cellnumber: '',
    cost: '',
    desc: '',
    address: '',
    open: '',
    closed: '',
    allday: 'true',


  }



  validation_messages = {
    'schoolname': [
      {type: 'required', message: 'email is required.'},
      {type: 'minlength', message: 'email is valid.'},
      {type: 'maxlength', message: 'email must be less than 10 char or less'},
    ],
    'registration': [
     {type: 'required', message: 'registration is required.'},
     {type: 'minlength', message: 'registration must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'registration must be less than 8 char or less'},
   ],
   'email': [
    {type: 'required', message: 'email is required.'},
    {type: 'minlength', message: 'email is valid.'},
    {type: 'maxlength', message: 'email must be less than 8 char or less'},
  ],
  'cellnumber': [
    {type: 'required', message: 'cellnumber is required.'},
    {type: 'minlength', message: 'cellnumber must be atleast 10 char or more.'},
    {type: 'maxlength', message: 'cellnumber must be less than 10 char or less'},
  ],
  'cost': [
    {type: 'required', message: 'cost is required.'},
    {type: 'minlength', message: 'cost is required.'},
    {type: 'maxlength', message: 'cost is required.'},
  ],
  'address': [
    {type: 'required', message: 'address is required.'},
    {type: 'minlength', message: 'address is required.'},
    {type: 'maxlength', message: 'address is required.'},
  ],
  'open': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ],
  'closed': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ],
  'allday': [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'password must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Password must be less than 8 char or less'},
  ]
  }
  profileForm: FormGroup
  profileImage: string;
  userProv: any;
  uploadprogress: number;
  isuploading: boolean;
  userProfile: any;
  isuploaded: boolean;
  imageSelected: boolean;
  constructor(public formBuilder: FormBuilder ,public forms: FormBuilder,public router:Router,public camera: Camera,) {
    
    this.loginForm = this.forms.group({
      schoolname: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      registration: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      cellnumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      cost: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      desc: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      address: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      open: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      closed: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      allday: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
    })

   

  }

  ngOnInit() {
  }


  // image upload

  async selectImage(){
    let option: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    await this.camera.getPicture(option).then( res => {
      console.log(res);
      const image = `data:image/jpeg;base64,${res}`;

      this.profileImage = image;
      // const UserImage = this.storage.child(this.userProv.getUser().uid+'.jpg');
      let imageRef =this.storage.child('image').child('imageName');

    const upload = imageRef.putString(image, 'data_url');
     upload.on('state_changed', snapshot => {
       let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       this.uploadprogress = progress;
       if (progress == 100){
        this.isuploading = false;
       }
     }, err => {
     }, () => {
      upload.snapshot.ref.getDownloadURL().then(downUrl => {
        this.userProfile.image = downUrl;
        console.log('Image downUrl', downUrl);

        this.isuploaded = true;
      })
     })
    }, err => {
      console.log("Something went wrong: ", err);
    })
    this.imageSelected = true;
  }
  



  // await(){
  //   this.router.navigateByUrl('/Awaiting')
  // }
  createAccount(){
        
        this.db.collection('businesses').doc(this.businessdata.schoolname).set(this.businessdata).then(res => {
          console.log('Profile created');
          this.router.navigateByUrl('/awaiting')
        }).catch(error => {
          console.log('Error');
        });
      }
    }

