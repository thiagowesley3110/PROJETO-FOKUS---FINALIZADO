const html = document.querySelector('html')
const focobt = document.querySelector('.app__card-button--foco')
const curtobt = document.querySelector('.app__card-button--curto')
const longobt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botao = document.querySelectorAll('.app__card-button')
const startpausebt =document.querySelector('#start-pause')
const musicafocoinput = document.querySelector('#alternar-musica')
const iniciaroupausarbt = document.querySelector('#start-pause span')
const iniciaroupausarbticone = document.querySelector('.app__card-primary-butto-icon')
const temponatela = document.querySelector('#timer')


const musica = new Audio('sons/luna-rise-part-one.mp3')
const musicabeep = new Audio('sons/beep.mp3')
const musicaplay = new Audio('sons/play.wav')
const musicapause = new Audio('sons/pause.mp3')


let tempodecorridoemsegundos = 1500
let intervaloid = null

musica.loop = true

musicafocoinput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focobt.addEventListener('click', () => {
    tempodecorridoemsegundos = 1500
    alterarcontexto('foco')
    focobt.classList.add('active')
})

curtobt.addEventListener('click', () => {
    tempodecorridoemsegundos = 300
    alterarcontexto('descanso-curto')
    curtobt.classList.add('active')
})

longobt.addEventListener('click', () => {
    tempodecorridoemsegundos = 900
    alterarcontexto('descanso-longo')
    longobt.classList.add('active')
})

function alterarcontexto (contexto) {
    mostrartempo()
    botao.forEach(function (contexto){
    contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` 
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `             
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?,<br>
                <strong class="app__title-strong"> Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = ` 
            Hora de voltar à superfície.,<br>
                <strong class="app__title-strong"> Faça uma pausa longa.?</strong>
            `
        default:
            break;
    }
}

const contagemregressiva = () => {
    if(tempodecorridoemsegundos <= 0){
        musicabeep.play();
        alert('Tempo finalizado!!')
        return
        zerar()
    }
    tempodecorridoemsegundos -= 1 
    mostrartempo()
}

startpausebt.addEventListener('click', iniciaroupausar)

function iniciaroupausar() {
    if(intervaloid){
        musicapause.play();
        
        
        zerar()
        return
    }
    musicaplay.play();
    intervaloid = setInterval(contagemregressiva, 1000)
    iniciaroupausarbt.textContent = "Pausar"
    iniciaroupausarbticone.setAttribute('src',`imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloid)
    iniciaroupausarbt.textContent = "Continuar"
    iniciaroupausarbticone.setAttribute('src',`imagens/play_arrow.png`)
    intervaloid = null
}

function mostrartempo() {
    const tempo = new Date(tempodecorridoemsegundos * 1000)
    const tempoformatado = tempo.toLocaleTimeString('pt-Br', {minute:'2-digit',second:'2-digit'})
    temponatela.innerHTML=`${tempoformatado}`
}
mostrartempo()
