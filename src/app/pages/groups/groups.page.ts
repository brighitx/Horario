import { DatabaseService, Estudios } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage {
  private grupos = [];
  id: string;
  estudios: Estudios;

  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) {
    this.estudios = this.router.getCurrentNavigation().extras.state.estudio;
    this.id = this.estudios.idEstudios;
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getGrupos();
      }
    })
  }

  getGrupos(){
      if(this.grupos.length === 0){
        this.db.getGrupos(this.id).then(data => {
        this.grupos = data;
      })
    }
  }

  itemSelected(item) {
    const navigationExtras: NavigationExtras = {
      state: {
        grupo: item
      }
    };
    this.router.navigate(['schedule'], navigationExtras);
  }

}
