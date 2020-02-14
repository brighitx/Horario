import { Router, NavigationExtras } from '@angular/router';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage {
  private estudios = [];

  constructor(private db: DatabaseService, private route: Router) {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getEstudios();
      }
    })
  }
  getEstudios() {
    this.db.getEstudios().then(data => {
      this.estudios = data;
    })
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
