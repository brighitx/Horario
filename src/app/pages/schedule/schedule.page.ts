import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Grupos, diaClase } from './../../services/database.service';

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
  diaClase: diaClase[] = [];
  //diauwu: diaClase;
  itemList: Array<Object>;
  horaClase = [];
  total = [];
  constructor(private db: DatabaseService, private activeRoute: ActivatedRoute, private router: Router) {
    this.grupo = this.router.getCurrentNavigation().extras.state.grupo;
    //this.diauwu = {idDiaClase: "e"};
    this.id = this.grupo.idGrupo;
    this.itemList = [];
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getDiaSemana();
        this.getDiaClase();
        this.getNoseQue();
        //this.getTotal();
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

  getNoseQue(){
    this.db.readOwo(this.id).then((data) => {
      this.itemList = <Array<Object>> data;
      console.log(this.itemList)
    })
  }


  getMateria(date) {
    console.log("ueuwuew", date)
    this.db.getMateria(date).then(data => {
      this.materia = data;
    })
  }

  getTotal() {
    for (let index = 0, j = 1; index < this.diaClase.length; index++ , j++) {
      for (let j = 1; j < 6; j++) {
        this.db.getHoraClase(this.diaClase[index], j).then(data => {
          console.log(this.diaClase[index])
          console.log(j)
          console.log(data)
          this.getMateria(data);
        })
      }
    }
  }



}
