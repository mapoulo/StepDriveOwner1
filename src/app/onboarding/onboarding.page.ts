import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('mySlider', {static: false}) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  swipeNext(){
    this.slides.slideNext();
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
  goToRegister(){
    this.router.navigate(['register']);
  }
}
