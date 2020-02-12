import { DatabaseService, Grupos, Estudios } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  private _grupos: Grupos[];
  id: string;
  estudios: Estudios;
  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) {
    this.estudios = this.router.getCurrentNavigation().extras.state.estudio;
    this.id = this.estudios.idEstudios.toString();
    this._grupos = [];
  }

  ngOnInit() {
  }

  public get grupos(): Grupos[] {
    if (this._grupos.length === 0) {
      this._grupos = this.db.getGrupos(this.id);
    }
    
    return this._grupos;
  }

}
