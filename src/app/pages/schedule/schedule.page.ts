import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Grupos } from './../../services/database.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  id: string;
  grupo: Grupos;
  diaSemana = [];
  materia = [];
  diaClase = [];
  horaClase = [];
  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) {
    this.grupo = this.router.getCurrentNavigation().extras.state.grupo;
    this.id = this.grupo.idGrupo;
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getDiaSemana();
        this.getMateria();
      }
    })
  }

  getDiaSemana() {
    if (this.diaSemana.length === 0) {
      this.db.getNombreDia().then(data => {
        this.diaSemana = data;
      })
    }
  }

  getDiaClase() {
    if (this.diaClase.length === 0) {
      this.db.getDiaClase(this.id).then(data => {
        this.diaClase = data;
      })
    }
  }

  getHoraClase() {
    
  }
  getMateria() {
    if (this.materia.length === 0) {
      this.db.getMateria(62).then(data => {
        this.materia = data;
      })
    }
  }

  getTotal() {
    for (let index = 0; index < this.diaClase.length; index++) {
      if (this.horaClase.length === 0) {
        this.db.getHoraClase(index, ).then(data => {
          this.horaClase = data;
        })
      }

    }
  }



}
