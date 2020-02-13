import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, VirtualTimeScheduler } from 'rxjs';
import { Grupos } from '../core/model/grupos';
import { IData } from '../interfaces/data-i';

export interface Estudios {
  idEstudios: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements IData {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  estudios: Estudios[];
  grupos: Grupos[];

  constructor(private plt: Platform, private sqlite: SQLite, private http: HttpClient) {
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

  getEstudies() {
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

  getGrupos(idEstudio): Grupos[] {
    this.database.executeSql('Select * from grupo WHERE idEstudios=' + idEstudio + '', []).then((data) => {
      this.grupos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.grupos.push({
            idGrupo: data.rows.item(i).idGrupo,
            nombre: data.rows.item(i).nombre,
            idEstudios: data.rows.item(i).idEstudios
          });
        }
      }
    });
    return this.grupos;
  }

}
