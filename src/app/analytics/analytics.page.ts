import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToPastB() {
    this.router.navigate(['past-b']);
  }
}
