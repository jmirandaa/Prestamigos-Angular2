import {Deuda} from '../modelo/Deuda';
import {Usuario} from '../modelo/Usuario';

export class Operacion {
	private id : number;
	private fechaRegistro : Date;
	private cantidad : number;
	private deuda : Deuda;
	private tipo : number;
	private usuario : Usuario;

	constructor() {

	}

	//Setters
	setId(id : number) {
		this.id = id;
	}

	setFechaRegistro(fechaRegistro : Date){
		this.fechaRegistro = fechaRegistro;
	}

	setCantidad(cantidad : number) {
		this.cantidad = cantidad;
	}

	setDeuda(deuda : Deuda) {
		this.deuda = deuda;
	}

	setTipo(tipo : number) {
		this.tipo = tipo;
	}

	setUsuario(usuario : Usuario){
		this.usuario = usuario;
	}

	//Getters
	getId() : number{
		return this.id;
	}

	getFechaRegistro() : Date {
		return this.fechaRegistro;
	}

	getCantidad() : number {
		return this.cantidad;
	}

	getDeuda() : Deuda {
		return this.deuda;
	}

	getTipo() : number {
		return this.tipo;
	}

	getUsuario() : Usuario {
		return this.usuario;
	}
}