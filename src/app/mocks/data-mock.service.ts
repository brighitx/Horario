import { HoraClase } from './../core/model/horaClase';
import { DiaClase } from './../core/model/diaClase';
import { DiaSemana, HorasSemana } from './../pages/schedule/schedule.page';
import { Materia } from './../core/model/materia';
import { Grupos } from './../core/model/grupos';
import { Estudios } from './../core/model/estudios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataMockService {

  private estudios: Estudios[] = [];
  private allGrupos: Grupos[] = [];
  private grupos: Grupos[] = [];
  private materia: Materia[] = [];
  private diaSemana: DiaSemana[] = [];
  private horaSemana: HorasSemana[] = [];

  private listaMaterias: Materia[] = [];

  private allDiaClase: DiaClase[] = [];
  private allHoraClase: HoraClase[] = [];

  private horario: string[][];
  private elementos: number[] = [];
  constructor() {
    this.getEstudios();
    this.crearGrupos();
    this.getDiaSemana();
    this.getHoraSemana();
    this.crearDiaClase();
  }

  getEstudios() {
    const idEstudios: string[] = ['1', '2', '3', '4', '5', '6'];
    const nombre: string[] = ['ESO', 'DIV', 'BAC', 'PCPI', 'GM', 'GS'];
    for (let i = 0; i <= idEstudios.length; i++) {
      this.estudios.push({
        idEstudios: idEstudios[i],
        nombre: nombre[i]
      });
    }
  }

  getGrupos(idEstudio) {
    for (const grupo of this.allGrupos) {
      if (grupo.idEstudios === idEstudio) {
        this.grupos.push({
          idGrupo: grupo.idGrupo,
          nombre: grupo.nombre,
          idEstudios: grupo.idEstudios
        });
      }
    }
  }

  getDiaSemana() {
    const idDiaSemana: string[] = ['1', '2', '3', '4', '5'];
    const nombre: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
    for (let i = 0; i <= idDiaSemana.length; i++) {
      this.diaSemana.push({
        nombre: nombre[i]
      });
    }
  }

  getHoraSemana() {
    const idHorasSemana: string[] = ['1', '2', '3', '4', '5', '6'];
    const descripcion: string[] = ['8:15', '9:10', '10:05', '11:25', '12:15', '13:10'];
    for (let i = 0; i <= idHorasSemana.length; i++) {
      this.horaSemana.push({
        descripcion: descripcion[i]
      });
    }
  }


  crearGrupos() {
    const idGrupo: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    const nombre: string[] = ['e1a', 'e1b', 'e1c', 'e1d', 'e2a', 'e2b', 'e2c', 'e2d', '1af', '1ga(loe)', '1inf', '1a', '1b'];
    const idEstudios: string[] = ['1', '1', '1', '1', '1', '1', '1', '1', '6', '5', '6', '3', '3'];
    for (let i = 0; i <= idGrupo.length; i++) {
      this.allGrupos.push({
        idGrupo: idGrupo[i],
        nombre: nombre[i],
        idEstudios: idEstudios[i]
      });
    }
  }

  crearDiaClase() {
    const idDiaClase: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    const idGrupo: string[] = ['1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '3', '3', '3', '3', '3'];
    const idDiaSemana: string[] = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];
    for (let i = 0; i <= idDiaClase.length; i++) {
      this.allDiaClase.push({
        idDiaClase: idDiaClase[i]
      });
    }
  }
}
