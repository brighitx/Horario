import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { IData } from '../interfaces/data-i';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private plt: Platform, private sqlite: SQLite) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'Horario16.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.dbReady.next(true);
        });
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getEstudios() {
    return this.database.executeSql("SELECT * from estudios", []).then((data) => {
      let estudios = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          estudios.push({
            idEstudios: data.rows.item(i).idEstudios,
            nombre: data.rows.item(i).nombre
          });
        }
      }
      return estudios;
    })
  }

  getGrupos(idEstudio) {
    return this.database.executeSql('Select * from grupo WHERE idEstudios=' + idEstudio + '', []).then((data) => {
      let grupos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          grupos.push({
            idGrupo: data.rows.item(i).idGrupo,
            nombre: data.rows.item(i).nombre,
            idEstudios: data.rows.item(i).idEstudios
          });
        }
      }
      return grupos;
    })
  }

  getDiaSemana() {
    return this.database.executeSql('Select nombre from diaSemana', []).then((data) => {
      let diaSemana = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          diaSemana.push({
            nombre: data.rows.item(i).nombre
          });
        }
      }
      return diaSemana;
    })
  }
  getHoraSemana() {
    return this.database.executeSql('Select descripcion from horasSemana', []).then((data) => {
      let horasSemana = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          horasSemana.push({
            descripcion: data.rows.item(i).descripcion
          });
        }
      }
      return horasSemana;
    })
  }

  getDiaClase(idGrupo) {
    return this.database.executeSql('Select idDiaClase from diaClase WHERE idGrupo=' + idGrupo + '', []).then((data) => {
      let diaClase = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          diaClase.push({
            idDiaClase: data.rows.item(i).idDiaClase
          });
        }
      }
      return diaClase;
    })
  }

  getHoraClase(idDiaClasey, idHoraSemana) {
    return this.database.executeSql('Select idHoraClase from horaClase WHERE idHorasSemana =' + idHoraSemana + ' and idDiaClase="' + idDiaClasey + '" ', []).then((data) => {
      let horaClase = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          horaClase.push({
            idHoraClase: data.rows.item(i).idHoraClase
          });
        }
      }
      return horaClase;
    })
  }

  getMateria(idMateriad) {
    return this.database.executeSql('Select materia.nombre from materia JOIN materiahoraclase ON materiahoraclase.idHoraClase=' + idMateriad + ' and materia.idMateria= materiahoraclase.idMateria', []).then((data) => {
      let materia = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          materia.push({
            nombre: data.rows.item(i).nombre
          });
        }
      }
      return materia;
    })
  }

  getDescripcion(nombreMateria) {
    return this.database.executeSql('Select completo from materia Where nombre="' + nombreMateria + '"', []).then((data) => {
      let materia = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          materia.push({
            completo: data.rows.item(i).completo
          });
        }
      }
      return materia;
    })
  }

}
