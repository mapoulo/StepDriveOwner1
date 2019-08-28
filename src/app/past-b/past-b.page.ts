import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-b',
  templateUrl: './past-b.page.html',
  styleUrls: ['./past-b.page.scss'],
})
export class PastBPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToGraph() {
    this.router.navigate(['graphs']);
  }
}
