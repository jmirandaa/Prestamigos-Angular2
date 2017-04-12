export class Usuario {
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

	getNombre() : string {
		return this.nombre;
	}

	getApellidos() : string {
		return this.apellidos;
	}

	getEmail() : string {
		return this.email;
	}

	//Setters
	setId(id : number){
		this.id = id;
	}

	setNombre (nombre : string)
	{
		this.nombre = nombre;
	}	

	setApellidos (apellidos : string)
	{
		this.apellidos = apellidos;
	}

	setEmail (email : string)
	{
		this.email = email;
	}

	setPassword (password : string)
	{
		this.password = password;
	}
}