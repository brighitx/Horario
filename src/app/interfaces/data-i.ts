import { Grupos } from '../core/model/grupos';

export abstract class IData {
    abstract getEstudios(): string[];
    abstract getGrupos(idEstudios: number): Array<Grupos>;
    abstract getHorario();
}