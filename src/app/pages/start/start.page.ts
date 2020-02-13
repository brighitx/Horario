import { Router, NavigationExtras } from '@angular/router';

import { DatabaseService, Estudios } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  private estudios: Estudios[];
  
  constructor(private db: DatabaseService, private route: Router) { }
  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getEstudies().subscribe(devs => {
          this.estudios = devs;
        });
      }
    });
  }

  itemSelected(item) {
    const navigationExtras: NavigationExtras = {
      state: {
        estudio: item
      }
    };
    this.route.navigate(['groups'], navigationExtras);
  }

}
