import { Grupos } from '../core/model/grupos';

export abstract class IData {
    //abstract getEstudios(): string[];
    abstract getGrupos(idEstudios: string): Grupos[];
    //abstract getHorario();
}