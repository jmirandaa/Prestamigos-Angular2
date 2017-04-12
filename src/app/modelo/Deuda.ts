export class Deuda {
	private id : number;
	private fechaRegistro : Date;
	private email : string;
	private password : string;
	private nombre : string;
	private apellidos : string;

	constructor(id : number) {
		this.id = id;
	}

	//Getters
	getId() : number {
		return this.id;
	}

	//Setters
	setId(id : number){
		this.id = id;
	}
}