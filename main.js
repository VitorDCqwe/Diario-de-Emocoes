function analisarHumor(texto) {
    const positivo = ['feliz','alegre','animado','grato','ótimo','bem','contente','calmo'];
    const negativo = ['triste','cansado','chateado','pessimo','mal','deprimido','ansioso','estressado','raiva'];
    const textoMin = texto.lowerCase();
    let score = 0;
    positivo.forEach(palavra => {
        if (textoMin.includes(palavra) ) score++
    })
    negativo.forEach(palavra => {
        if (textoMin.includes(palavra) ) score-- 
    })
    if (score > 0) return {humor: 'Feliz', emoji: '😄'};
    else if (score < 0) return {humor: 'Triste', emoji: '😭'};
    else return {humor: 'Neutro', emoji: '😐'};
}

function salvarEntrada() {
    const usuario = document.getElementById ("usuario").value.trim();
    const data = document.getElementById ("data").value;
    const titulo = document.getElementById ("titulo").value.trim();
    const texto = document.getElementById ("texto").value.trim();
    if (!usuario || !data || !titulo || !texto) {
        alert ("Por favor, preencha todos os campos.");
        return;
    }
    const analise = analisarHumor(texto);
    const novaEntrada = {
        usuario,
        data,
        titulo,
        texto,
        humor: analise.humor,
        emoji: analise.emoji
    };

    const entradas = JSON.parse(localStorage.getItem("diarioEmocoes")) || [];
    entradas.unshift(novaEntrada);
    localStorage.setItem("diarioEmocoes",JSON.stringify(entradas));
    document.querySelector("form").reset();
    document.getElementById("data").value = new Date().toISOString().slice(0, 16);
    mostrarEntradas();

}

function mostrarEntradas() {
    const lista = document.getElementById("listaEntradas");
    lista.innerHTML = "";
    const entradas = JSON.parse(localStorage.getItem("diarioEmocoes")) || [];
    if(entradas.length === 0) {
        lista.innerHTML = "<p> Seu diário ainda está vazio </p>";
        return;
    }
    entradas.forEach(entrada => {
        const div = document.createElement("div");
        div.classList.add("entrada");
        div.innerHTML = `
        <h3>${entrada.titulo}</h3>
        <p><strong>Usuário: </strong>${new Date(entrada.data).toLocaleString("pt-BR")}</p>
        <p>${entrada.texto}</p>
        <p class="humor"><strong>Humor: </strong>${entrada.humor}<span class="emoji">${entrada.emoji}</span></p>
        `;
        lista.appendChild(div);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("data").value = new Date().toISOString().slice(0,16);
    mostrarEntradas();
})

function mostrarFrase() {
    const entradas = JSON.parse(localStorage.getItem("diarioEmocoes"))|| [];
    if(entradas.length === 0) {
        alert("Você ainda não fez nenhuma entrada no Diário.");
        return;
    }
    const utimaEntrada = entradas[0];
    const humor = utimaEntrada.humor;
}

const frases = {
    "Feliz": [
        "Constinue espalhando assa alegria!",
        "Sua felicidade é contagiante. Viva intensamente!",
        "Aproveite esse bom momento para conquistar ainda mais"
    ],
    "Triste": [
        "Dias difíceis fazem parte. Você não está só",
        "Respire fundo. Tudo passa. Você é mais forte do que imagina.",
        "Permita-se sentir e cuidar de você. Vai melhorar."
    ],
    "Neutro": [
        "Cada dia é uma nova chance de escrever sua história.",
        "O quilíbrio é poder",
        "Às vezes, só o tempo e o silêncio nos mostram o caminho certo."
    ],
};

const opcoes = frases[humor] || frases["Neutro"];
const aleatoria = opcoes[Math.floor(Math.random() * opcoes.length)];
document.getElementById("fraseMotivacional").textContent = `"${aleatoria}`;
if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(aleatoria);
    utterance.lang = "pt-br";
    window.speechSynthesis.speak(utterance);
}
else {
    alert ("Esse navegador não suporta leitura em voz alta.");
}