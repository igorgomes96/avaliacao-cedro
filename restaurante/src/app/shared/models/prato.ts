import { Restaurante } from './restaurante';

export class Prato {
    id: number;
    nome: string;
    preco: string;
    restauranteId: number;

    restaurante: Restaurante;
}
