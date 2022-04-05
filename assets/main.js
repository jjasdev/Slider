/**
 * @fileoverview Slider web implementado con Vanilla JS, fácil de usar en cualquier proyecto o sitio web.
 * @version 0.1
 * @author Juanjo Alonso Sánchez <juanjoalsz@gmail.com>
 * @copyright juanjoalsz@gmail.com
 */
 "use strict";

 //--VARIABLES
 /**
 * Tipo de dato Slider
 * @typedef {Object} Slider
 * @property {number} indice Indice correspondiente al primer elemento mostrado
 * @property {number} tiempo Tiempo que transcurre entre elemento y elemento
 */
/**
  * Configuración por defecto del slider de banners
  * @type {Slider}
  */
    const configSliderBanners = {
        indice: 0,
        tiempo: 8000
    }
  /**
  * Array con los botones para avanzar en la muestra de banners en el slider
  * @type {Array}
  */
   let botonesSlider = [ "anterior", "siguiente" ];


//--FUNCIONES
/**
  * Establece el año en el footer
  * @returns {void}
  */
 function establecerYear(){ 
    const today = new Date();
    const nodoYear = document.querySelector(".footer__copy-year"); 
    nodoYear.innerHTML = today.getFullYear();
}
/**
  * Muestra por defecto el elemento que hemos establecido en la configuración y le asocia su indicador
  * @param {NodeList} nodosElemento Contenedores que alojan los elementos
  * @param {number} elementoInicial Índice del elemento a mostrar inicialmente
  * @param {Node} nodoIndicador Contenedor que aloja los indicadores
  * @param {number} numeroElementos Número de elementos a mostrar
  * @returns {void}
  */
 function configurarSlider(nodosElemento, elementoInicial, nodoIndicador, numeroElementos){ 
     //Mostramos únicamente un banner, el resto los ocultamos
    for (let index = 0; index < numeroElementos; index++) {
        if (index !== elementoInicial) {
            nodosElemento.item(index).setAttribute('data-active', 'false');
            nodosElemento.item(index).classList.add(`${nodosElemento.item(index).className}--hide`);
        } else {
            nodosElemento.item(index).setAttribute('data-active', 'true');
        }
    }
    //Creamos los indicadores    
    crearIndicadores(nodoIndicador, numeroElementos)
}
/**
  * Crea los indicadores correspondientes y marca el inicial
  * @param {Node} nodoIndicador Contenedor que aloja los indicadores
  * @param {number} numeroElementos Número de indicadores
  * @returns {void}
  */
 function crearIndicadores(nodoIndicador, numeroElementos){ 
   //Creamos los indicadores    
   for (let indice = 0; indice < numeroElementos; indice++) {
       let indicator = document.createElement('div');
       indicator.classList.add(`${nodoIndicador.className}-item`);
       indicator.setAttribute("data-indice", String(indice));
       nodoIndicador.append(indicator);
   }    
   //Marcamos el indicador inicial
   nodoIndicador.firstElementChild.classList.add(`${nodoIndicador.className}-item--active`);
}
/**
  * Muestra un nuevo elemento en función de si se ha indicado que sea el anterior o el posterior
  * @param {string} tipoBoton Tipo de botón seleccionado (anterior o posterior)
  * @param {NodeList} nodosElemento Contenedores que alojan los elementos
  * @param {Node} nodoIndicador Contenedor que aloja los indicadores
  * @param {number} numeroElementos Número de elementos del nodo
  * @returns {void}
  */
 function mostrarNuevoElemento(tipoBoton, nodosElemento, nodoIndicador, numeroElementos){ 
    const indicators = document.querySelectorAll(`.${nodoIndicador.className}-item`);
    let indiceNuevoElemento = 0;
    let claseNodo = '';
    if (tipoBoton.includes('anterior')) {
        //Comprobamos en qué elemento nos encontramos.       
        nodosElemento.forEach((elemento, index)=> {
            if(elemento.getAttribute('data-active') === 'true') {
                claseNodo = `${nodosElemento[index].className}`;
                elemento.classList.add(`${nodosElemento[index].className}--hide`);
                elemento.setAttribute('data-active', 'false');
                indicators.item(Number(elemento.getAttribute('data-indice'))).classList.remove(`${nodoIndicador.className}-item--active`);
                //Si estamos en el primero mostramos el último y sino mostramos el anterior
                if (elemento.getAttribute('data-indice') === '0') { 
                    indiceNuevoElemento = numeroElementos - 1;                      
                } else {
                    indiceNuevoElemento = Number(elemento.getAttribute('data-indice')) - 1;
                }
            }
        });                       
    } else if (tipoBoton.includes('siguiente')) {
        //Comprobamos en qué elemento nos encontramos.       
        nodosElemento.forEach((elemento, index)=> {
            if(elemento.getAttribute('data-active') === 'true') {
                claseNodo = `${nodosElemento[index].className}`;
                elemento.classList.add(`${nodosElemento[index].className}--hide`);
                elemento.setAttribute('data-active', 'false');
                indicators.item(Number(elemento.getAttribute('data-indice'))).classList.remove(`${nodoIndicador.className}-item--active`);
                //Si estamos en el último mostramos el primero y sino mostramos el posterior
                if (elemento.getAttribute('data-indice') === String(numeroElementos - 1)) { 
                    indiceNuevoElemento = 0;                      
                } else {
                    indiceNuevoElemento = Number(elemento.getAttribute('data-indice')) + 1;
                }
            }
        });
    }
    //Activamos el nuevo elemento y marcamos el indicador corresponidente
    nodosElemento.item(indiceNuevoElemento).classList.remove(`${claseNodo}--hide`);
    nodosElemento.item(indiceNuevoElemento).setAttribute('data-active', 'true');
    indicators.item(indiceNuevoElemento).classList.add(`${nodoIndicador.className}-item--active`);
}

//--CÓDIGO
//Pinta el año
establecerYear();

//Slider
const botonPrevSlider = document.querySelector(".slider-banner__button--anterior");
const botonNextSlider = document.querySelector(".slider-banner__button--siguiente");
const contentBanner = document.querySelectorAll(".banner");
const indicatorContainerSlider = document.querySelector(".slider-banner__indicator");
//Solo mostramos el carrusel si tiene más de un banner
if (contentBanner.length > 1) {
    configurarSlider(contentBanner, configSliderBanners.indice, indicatorContainerSlider, contentBanner.length);
    botonPrevSlider.addEventListener("click", (event) =>{       
        event.preventDefault();    
        mostrarNuevoElemento(botonesSlider[0], contentBanner, indicatorContainerSlider, contentBanner.length);
    });
    botonNextSlider.addEventListener("click", (event) =>{       
        event.preventDefault();    
        mostrarNuevoElemento(botonesSlider[1], contentBanner, indicatorContainerSlider, contentBanner.length);
    });
    //Motrar banners en el slider automáticamente
    setInterval(()=> {        
        mostrarNuevoElemento(botonesSlider[1], contentBanner, indicatorContainerSlider, contentBanner.length);
    }, configSliderBanners.tiempo);
} else {
    botonPrevSlider.style.display = 'none';
    botonNextSlider.style.display = 'none';
    indicatorContainerSlider.style.display = 'none';
}