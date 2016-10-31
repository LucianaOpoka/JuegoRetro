var juego= {
	filas: [[],[],[]],
	espacioVacio:{
		fila:2,
		columna:2
	},

	iniciar:function(){
		console.log(this.filas);
	},
	crearPieza(numero, fila, columna){
		var nuevoElemento = $("<div>");
		nuevoElemento.addClass("pieza");

		nuevoElemento.css ({
			backgroundImage: 'url(piezas/' + numero + '.png)',
			top: fila * 200,
			left: columna * 200,
		});

		return {
      	el:nuevoElemento,
      	numero:numero,
       	filaInicial:fila,
      	columnaInicial:columna,
    	};
	},
	instalarPiezas(unJuego){
		var counter = 1;
		for (var fila = 0; fila< 3; fila++) {
			
			for (var columna = 0; columna< 3; columna++) {
				
				if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {

					this.filas[fila][columna] = null;

				} else {
					var pieza = this.crearPieza(counter++, fila, columna);
					unJuego.append(pieza.el);
					this.filas[fila][columna] = pieza;
				}
				
			}
		}
		return unJuego;
	},
	moverFichaFilaColumna(ficha,fila,columna){
		ficha.el.css({
			top: fila * 200,
			left: columna *200
		})
	},
	guardarEspacioVacio(fila, columna){
		this.espacioVacio.fila = fila;
		this.espacioVacio.columna = columna;

		this.filas[fila][columna] = null;
	},
	intercambiarPosicionConEspacioVacio(fila,columna){
		var ficha = this.filas[fila] && this.filas[fila][columna];
		if (ficha) {
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
			this.moverFichaFilaColumna(ficha, this.espacioVacio.fila, this.espacioVacio.columna);
			this.guardarEspacioVacio(fila, columna);
		}
	},

	moverHaciaAbajo(){
		var filaOriginal = this.espacioVacio.fila-1;
    	var columnaOriginal = this.espacioVacio.columna;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	},

	moverHaciaArriba(){
		var filaOriginal = this.espacioVacio.fila+1;
    	var columnaOriginal = this.espacioVacio.columna;
    	this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	},
	moverHaciaLaDerecha(){
		var filaOriginal = this.espacioVacio.fila;
    	var columnaOriginal = this.espacioVacio.columna-1;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	},
	moverHaciaLaIzquierda(){
		var filaOriginal = this.espacioVacio.fila;
    	var columnaOriginal = this.espacioVacio.columna+1;
	    this.intercambiarPosicionConEspacioVacio(filaOriginal,columnaOriginal);
	},

	chequearSiGano(){
		for (var fi = 0; fi < this.filas.length; fi++) {
			
			for (var co = 0; co < this.filas.length; co++) {
				var ficha = this.filas[fi][co];
				if( ficha && !(ficha.filaInicial == fi && ficha.columnaInicial == co)){
					return false;
				}
				
			}
		}
			
			return alert("HAS GANADO!! VUELVE A INTENTARLO!.");
	},

	capturarTeclas(){
		var that = this;
    	$(document).keydown(function(evento) {
       		switch(evento.which) {
            	case 37:
              	that.moverHaciaLaIzquierda();
           		 break;

            	case 38:
              	that.moverHaciaArriba();
           		 break;

            	case 39:
              	that.moverHaciaLaDerecha();
           		 break;

            	case 40:
              	that.moverHaciaAbajo();
            	break;

            	default: return; 
       		 }

        	that.chequearSiGano();

        	evento.preventDefault();
   		});

	},

	
	mezclarFichas(veces){
		var metodos = ["moverHaciaAbajo","moverHaciaArriba","moverHaciaLaIzquierda","moverHaciaLaDerecha"];
		if (veces <=0) {return;};
		var that= this;
		var numeroRandom = Math.floor(Math.random() * 4);
		var nombreDeMetodo = metodos[numeroRandom];
		this[nombreDeMetodo]();

		setTimeout(function(){
			that.mezclarFichas(veces-1);

		},10);
	},

	iniciar: function(el) {
		this.instalarPiezas(el);
		this.mezclarFichas(200);
		this.capturarTeclas();
		},
}

$ (function(){
	var elemento = $("#juego");
  juego.iniciar(elemento);

})

