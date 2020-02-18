import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Grupos, diaClase, horaClase, materia } from './../../services/database.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  id: string;
  grupo: Grupos;
  diaSemana = [];
  materia: materia[] = [];
  materiaOWO: materia[] = [];
  diaClase: diaClase[] = [];
  horaClase: horaClase[] = [];
  total = [];
  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) {
    this.grupo = this.router.getCurrentNavigation().extras.state.grupo;
    this.id = this.grupo.idGrupo;
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getDiaSemana();
        this.getDiaClase();
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
        console.log("Jum",this.diaClase);
        console.log("Jum",this.diaClase.length);
        console.log("Jum",this.diaClase[0].idDiaClase);
        this.getTotal();
      })
    }
  }

  getTotal() {
    for (let index = 0, j = 1; index < this.diaClase.length; index++ , j++) {
          for (let j = 1; j < 7; j++) {
            this.db.getHoraClase(this.diaClase[index].idDiaClase, j).then(data => {
              this.horaClase = data;
              console.log("prueba");
              console.log(this.horaClase[0].idHoraClase);
              this.getMateria(this.horaClase[0].idHoraClase);
           })
          }
      }
    }

    getMateria(date) {
    this.db.getMateria(date).then(data => {
      this.materia = data;
      if(this.materia.length > 1){
        
        this.materiaOWO.push(this.materia[0]);
      
      }else{
        this.materiaOWO.push(this.materia[0]);
      }
    })
  }
  



}
