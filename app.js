/* para la funcionalidad, lo primero que hay que hacer, es seleccionar todos los elementos */
const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');

//getElementById es para cuando tienen id
const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');
const iconoControl = document.getElementById('iconoControl');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

//declaracion de un array para las canciones
const canciones = [
    {
        titulo:'NADIE',
        nombre:'Peso Pluma',
        fuente:'music/NADIE - Peso Pluma.m4a'
    },
    {
        titulo:'PRESIDENTE',
        nombre:'Gabito Ballesteros, Natanael Cano, Luis R Conriquez, Netón Vega',
        fuente:'music/PRESIDENTE - Gabito Ballesteros, Natanael Cano, Luis R Conriquez, Netón Vega.m4a'
    },
    {
        titulo:'el Mayor de Los Ranas',
        nombre:'Victor Valverde x JR Torres',
        fuente:'music/Victor Valverde x JR Torres - el Mayor de Los Ranas.m4a'
    }
];

//indice de la cancion a ejecutar, muestra titulo, nombre y se la trae de su fuente 
let indiceCancionActual = 0;
function actualizarInfoCancion(){
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata', function(){});
};

//metadatos de las canciones
cancion.addEventListener('loadedmetadata', ()=>{
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

//evento que controla la reproduccion de la musica (play y pause)
botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
    if(cancion.paused){
        reproducirCancion();
        
    }else {
        pausarCancion();
        
    }
}

function reproducirCancion(){
    cancion.play();
    iconoControl.classList.add('bi-pause-fill') 
    iconoControl.classList.remove('bi-play-fill')
};
function pausarCancion(){
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill') 
    iconoControl.classList.add('bi-play-fill')
}

//animacion de el input
cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused)
    {
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
})
progreso.addEventListener('change', function(){
    reproducirCancion();
})

//botones de adelante y atras
botonAdelante.addEventListener('click', ()=>{
    indiceCancionActual = (indiceCancionActual +1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', ()=>{
    indiceCancionActual = (indiceCancionActual -1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();






