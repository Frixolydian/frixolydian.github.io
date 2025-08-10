const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('Oct 25, 2025 17:30:00').getTime(),
    x = setInterval(function() {

        let now = new Date().getTime(),
        distance = countDown - now;

        document.getElementById('dias').innerText = Math.floor(distance / (day)),
        document.getElementById('horas').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutos').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('segundos').innerText = Math.floor((distance % (minute)) / second);

    }, second)


    function playPauseAudio() {
        var audio = document.getElementById("song");
        var button = document.getElementById("playPause");

        if (audio.paused) {
            // Si está pausado, lo reproducimos
            audio.play();
            button.classList.remove("play");
            button.classList.add("pause");
            button.setAttribute("aria-label", "Pause Audio");
        } else {
            // Si está reproduciéndose, lo pausamos
            audio.pause();
            button.classList.remove("pause");
            button.classList.add("play");
            button.setAttribute("aria-label", "Play Audio");
        }
    }
            let isPlaying = false;

            function playPauseAudio() {
                const audio = document.getElementById("song");
                const button = document.getElementById("playPause");

                if (!isPlaying) {
                    // Intenta reproducir y maneja la promesa para Safari
                    const playPromise = audio.play();
                    
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                isPlaying = true;
                                button.classList.remove("play");
                                button.classList.add("pause");
                                button.setAttribute("aria-label", "Pause Audio");
                            })
                            .catch(error => {
                                console.log("Error al reproducir el audio: ", error);
                                isPlaying = false;
                            });
                    }
                } else {
                    audio.pause();
                    isPlaying = false;
                    button.classList.remove("pause");
                    button.classList.add("play");
                    button.setAttribute("aria-label", "Play Audio");
                }
            }

            // Escuchar cuando termina el audio
            document.getElementById("song").addEventListener('ended', () => {
                isPlaying = false;
                const button = document.getElementById("playPause");
                button.classList.remove("pause");
                button.classList.add("play");
                button.setAttribute("aria-label", "Play Audio");
            });

            // Inicialización cuando se carga la página
            document.addEventListener('DOMContentLoaded', function() {
                const audio = document.getElementById("song");
                audio.load();
            });

            // Manejo especial para iOS/Safari
            document.addEventListener('touchstart', function() {
                const audio = document.getElementById("song");
                if (audio.paused && !isPlaying) {
                    audio.load();
                }
            }, { passive: true });
 


  
            window.addEventListener('resize', ajustarEstilos);
            window.onload = ajustarEstilos;


            function ajustarEstilos() {
                const viewportWidth = window.innerWidth;
                const minViewport = 180; // Viewport más pequeño
                const maxViewport = 1920; // Viewport más grande
              
                // Progresión geométrica directa entre leftMin y leftMax
                const leftMin = -48; // Valor mínimo
                const leftMax = 17;  // Valor máximo
                const progress = (viewportWidth - minViewport) / (maxViewport - minViewport);
                const leftValue =
                  leftMin + (leftMax - leftMin) * (1 - Math.pow(1 - progress, 5));
              
                // Progresión geométrica directa entre scaleMin y scaleMax
                const scaleMin = 0.17; // Escala mínima
                const scaleMax = 1.2; // Escala máxima
                const scaleValue =
                  scaleMin + (scaleMax - scaleMin) * Math.pow(progress, .4);
              
                // Aplicar estilos dinámicos
                const portada = document.querySelector('.portada');
                portada.style.left = `${leftValue}vw`;
                portada.style.transform = `scale(${scaleValue})`;
              
                console.log(`Viewport: ${viewportWidth}px, Left: ${leftValue}vw, Scale: ${scaleValue}`);
              }




         window.onload = () => {
    const loaderContainer = document.getElementById('loader-container');
    const mainContent = document.getElementById('main-content');
    const portada = document.querySelector('.portada');

    if (!loaderContainer || !mainContent || !portada) {
        console.error("No se encontraron uno o más elementos necesarios.");
        return;
    }



    // Función para ocultar el loader con transición
    function ocultarLoader() {
        loaderContainer.classList.add('fade-out'); // Agrega la clase para desvanecer
        setTimeout(() => {
            loaderContainer.style.display = 'none'; // Oculta completamente el loader
            mainContent.style.display = 'flex'; // Muestra el contenido principal
            mainContent.style.opacity = 1; // Aparece suavemente
            ajustarEstilos(); // Ajusta estilos de acuerdo al viewport
            ajustarBorderRadius(); // Ajusta el border-radius después de que el contenido se muestra
            iniciarAnimacion(); // Inicia la animación de la portada
        }, 1000); // Tiempo igual a la duración de la transición en CSS
    }

    // Función para animar la portada
    function iniciarAnimacion() {
        setTimeout(() => {
            portada.classList.add('visible'); // Activa la animación
        }, 100); // Espera mínima para sincronizar
    }

    ocultarLoader(); // Llamar para iniciar el flujo
};

window.addEventListener('resize', ajustarEstilos);








function ajustarBorderRadius() {
    const containers = document.querySelectorAll('.container3'); // Selecciona todos los elementos con clase container3
    containers.forEach((container) => {
      const ancho = container.offsetWidth; // Obtiene el ancho actual de cada contenedor
      const radio = ancho / 2; // Calcula el radio como la mitad del ancho
      container.style.borderRadius = `${radio}px ${radio}px 0 0`; // Aplica el border-radius dinámicamente
    });
  }
  
  // Ajusta el border-radius al cargar la página
  window.addEventListener('load', ajustarBorderRadius);
  
  // Ajusta el border-radius cuando se cambia el tamaño del viewport
  // window.addEventListener('resize', ajustarBorderRadius);









// VENTANAS EMERGENTES

let ventcer = document.getElementById('ventcer');
function openventcer(){
ventcer.classList.add('show');
}
function closeventcer(){
ventcer.classList.remove('show');
}


let ventcel = document.getElementById('ventcel');
function openventcel(){
ventcel.classList.add('show');
}
function closeventcel(){
ventcel.classList.remove('show');
}


let ventmen = document.getElementById('ventmen');
function openventmen(){
ventmen.classList.add('show');
}
function closeventmen(){
ventmen.classList.remove('show');
}


let ventdr = document.getElementById('ventdr');
function openventdr(){
ventdr.classList.add('show');
}
function closeventdr(){
ventdr.classList.remove('show');
}


let ventreg = document.getElementById('ventreg');
function openventreg(){
ventreg.classList.add('show');
}
function closeventreg(){
ventreg.classList.remove('show');
}


let ventcom = document.getElementById('ventcom');
function openventcom(){
ventcom.classList.add('show');
}
function closeventcom(){
ventcom.classList.remove('show');
}


let ventmus = document.getElementById('ventmus');
function openventmus(){
ventmus.classList.add('show');
}
function closeventmus(){
ventmus.classList.remove('show');
}


let ventad = document.getElementById('ventad');
function openventad(){
ventad.classList.add('show');
}
function closeventad(){
ventad.classList.remove('show');
}