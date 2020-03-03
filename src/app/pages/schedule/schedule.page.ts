import { HoraClase } from './../../core/model/horaClase';
import { DiaClase } from './../../core/model/diaClase';
import { Grupos } from './../../core/model/grupos';
import { Materia } from './../../core/model/materia';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from './../../services/database.service';
import { ToastController } from '@ionic/angular';

export interface DiaSemana {
  nombre: string;
}
export interface HorasSemana {
  descripcion: string;
}
export interface Descripcion {
  completo: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {
  indice: number = 0;
  grupo: Grupos;

  diaSemana: DiaSemana[] = [];
  horaSemana: HorasSemana[] = [];

  materia: Materia[] = [];
  listaMaterias: Materia[] = [];

  diaClase: DiaClase[] = [];
  horaClase: HoraClase[] = [];

  horario: string[][];
  elementos: number[] = [];

  descripcion: Descripcion[] = [];

  constructor(private db: DatabaseService, private router: Router, public toastController: ToastController) {
    this.horario = [];
    this.grupo = this.router.getCurrentNavigation().extras.state.grupo;
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.getDiaHoraSemana();
        this.getListaMaterias();
      }
    });
    this.getHorario();
  }

  getDiaHoraSemana() {
    this.db.getDiaSemana().then(data => {
      this.diaSemana = data;
    });
    this.db.getHoraSemana().then(data => {
      this.horaSemana = data;
    });
  }

  getListaMaterias() {
      this.db.getDiaClase(this.grupo.idGrupo).then(data => {
        this.diaClase = data;
        this.getHoraClase();
      });
  }

  getHoraClase() {
    for (const value of this.diaClase) {
      for (let j = 1; j < 7; j++) {
        this.db.getHoraClase(value.idDiaClase, j).then(data => {
          this.horaClase = data;
          this.getMateria(this.horaClase[0].idHoraClase);
        });
      }
    }
  }

  getMateria(idHoraClase) {
    this.db.getMateria(idHoraClase).then(data => {
      this.materia = data;
      if (this.materia.length > 1) {
        this.listaMaterias.push(this.materia[0]);
        this.listaMaterias[this.indice].nombre = this.materia.map(e => e.nombre).join('/');
      } else {
        this.listaMaterias.push(this.materia[0]);
      }
      this.indice = this.listaMaterias.length;
    });
  }

  matrizHorario() {
    this.horario[0] = [];
    this.horario[0][0] = 'Horas';
    for (let index = 0; index < 5; index++) {
      this.horario[0][index + 1] = this.diaSemana[index].nombre;
    }
    for (let i = 1, j = 0, iMateria = 0; i < 7; i++ , j++) {
      this.horario[i] = [];
      this.horario[i][0] = this.horaSemana[j].descripcion;
      for (let index = 0; index < 5; index++) {
        this.horario[i][index + 1] = this.listaMaterias[iMateria].nombre;
        iMateria++;
      }
    }
    for (let i = 0; i <= this.horario.length; i++) {
      this.elementos.push(i);
    }
  }

  request() {
    return new Promise(resolve => {
      setTimeout(() => { resolve(""); }, 1700);
    });
  }
  async getHorario() {
    await this.request();
    this.matrizHorario();
  }

  obtenerDescripcion(materia) {
    const materias: string[] = materia.split("/");
    let descripciones: string[] = [];
    for (let index = 0; index < materias.length; index++) {
      this.db.getDescripcion(materias[index]).then(data => {
        this.descripcion = data;
        descripciones[index] = this.descripcion[0].completo;
      }).then(() => {
        var descripcion = descripciones.join();
        this.presentToast(descripcion);
      });
    }

  }
  async presentToast(descripcion) {
    const toast = await this.toastController.create({
      message: descripcion,
      duration: 2000
    });
    toast.present();
  }

}
