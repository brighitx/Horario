import { DatabaseService} from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras  } from '@angular/router';
import { Estudios } from './../../core/model/estudios';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage {
  private grupos = [];
  estudios: Estudios;

  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) {
    this.estudios = this.router.getCurrentNavigation().extras.state.estudio;
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getGrupos();
      }
    })
  }

  getGrupos(){
      if(this.grupos.length === 0){
        this.db.getGrupos(this.estudios.idEstudios).then(data => {
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
