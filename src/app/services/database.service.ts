import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, VirtualTimeScheduler } from 'rxjs';


export interface Estudios {
  idEstudios: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  estudios = new BehaviorSubject([]);
  grupos: Grupos[] = [];

  constructor(private plt: Platform, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'Horario16.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.loadEstudios();
          this.dbReady.next(true);
        });
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getEstudios(): Observable<Estudios[]> {
    return this.estudios.asObservable();
  }

  loadEstudios() {
    return this.database.executeSql('Select * from estudios', []).then(data => {
      const estudios: Estudios[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          estudios.push({
            idEstudios: data.rows.item(i).idEstudios,
            nombre: data.rows.item(i).nombre
          });
        }
      }
      this.estudios.next(estudios);
    });
  }

  GetEstudiosA() {
    return new Promise((resolve, reject) => {
      this.database.executeSql("SELECT * FROM estudios", [])
        .then(
          (data) => {
            console.log('entro en el select all users');
            let arrayEstudios = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                arrayEstudios.push({
                  idEstudios: data.rows.item(i).idEstudios,
                  nombre: data.rows.item(i).nombre,
                });
              }
              console.log(arrayEstudios);
              resolve(arrayEstudios);
            }
          })
        .catch((error) => {
          console.log('error al leer all users ', error)
          reject(error);
        }
        )
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
