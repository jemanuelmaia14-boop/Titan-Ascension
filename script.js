// ===============================
// TITAN ASCENSION - SCRIPT GLOBAL
// ===============================

function getValor(chave, padrao){
    return Number(localStorage.getItem(chave)) || padrao;
}

function setValor(chave, valor){
    localStorage.setItem(chave, valor);
}

// ---------- RANK ----------
function calcularRank(nivel){
    if(nivel >= 100) return "Monarca";
    if(nivel >= 80) return "SSS";
    if(nivel >= 60) return "SS";
    if(nivel >= 45) return "S";
    if(nivel >= 35) return "A";
    if(nivel >= 25) return "B";
    if(nivel >= 15) return "C";
    if(nivel >= 10) return "D";
    if(nivel >= 5) return "E";
    return "F";
}

// ---------- PERFIL ----------
function salvarPerfil(){
    const nomeInput = document.getElementById("nomeInput");
    const fotoInput = document.getElementById("fotoInput");

    if(nomeInput && nomeInput.value){
        localStorage.setItem("nomeJogador", nomeInput.value);
        alert("Nome salvo com sucesso!");
    }

    if(fotoInput && fotoInput.files[0]){
        const reader = new FileReader();

        reader.onload = function(){
            localStorage.setItem("fotoPerfil", reader.result);
            mostrarFoto();
            carregarDashboard();
            alert("Foto salva com sucesso!");
        }

        reader.readAsDataURL(fotoInput.files[0]);
    }
}

function mostrarFoto(){
    const fotoSalva = localStorage.getItem("fotoPerfil");
    const preview = document.getElementById("previewFoto");

    if(preview && fotoSalva){
        preview.innerHTML = `<img src="${fotoSalva}">`;
    }
}

// ---------- MISSÕES ----------
function completarMissao(valorXP, atributo){
    let xp = getValor("xp", 0);
    let nivel = getValor("nivel", 1);

    xp += valorXP;

    let atributoAtual = getValor(atributo, 1);
    atributoAtual++;
    setValor(atributo, atributoAtual);

    if(xp >= 100){
        xp -= 100;
        nivel++;
        alert("🔥 LEVEL UP! Você chegou ao nível " + nivel);
    } else {
        alert("✅ Missão concluída! +" + valorXP + " XP");
    }

    setValor("xp", xp);
    setValor("nivel", nivel);

    ganharBauAleatorio();
}

// ---------- MOEDAS ----------
function ganharMoedas(valor){
    let moedas = getValor("moedas", 0);
    moedas += valor;
    setValor("moedas", moedas);
}

// ---------- ATRIBUTOS ----------
function carregarAtributos(){
    const forca = getValor("forca", 1);
    const conhecimento = getValor("conhecimento", 1);
    const disciplina = getValor("disciplina", 1);
    const energia = getValor("energia", 1);

    if(document.getElementById("forcaValor")){
        document.getElementById("forcaValor").innerText = forca;
        document.getElementById("conhecimentoValor").innerText = conhecimento;
        document.getElementById("disciplinaValor").innerText = disciplina;
        document.getElementById("energiaValor").innerText = energia;
    }
}

// ---------- HABILIDADES ----------
function carregarHabilidades(){
    const habilidades = ["Leitura", "Programacao", "Academia", "Ingles"];

    habilidades.forEach(habilidade => {
        let xp = getValor("xp" + habilidade, 0);
        let nivel = getValor("nivel" + habilidade, 1);

        const xpBar = document.getElementById("xp" + habilidade);
        const valor = document.getElementById("valor" + habilidade);
        const nivelTexto = document.getElementById("nivel" + habilidade);

        if(xpBar && valor && nivelTexto){
            xpBar.style.width = xp + "%";
            valor.innerText = xp;
            nivelTexto.innerText = nivel;
        }
    });
}

function ganharHabilidade(nomeHabilidade, valorXP){
    let xp = getValor("xp" + nomeHabilidade, 0);
    let nivel = getValor("nivel" + nomeHabilidade, 1);

    xp += valorXP;

    if(xp >= 100){
        xp -= 100;
        nivel++;
        alert("🚀 Habilidade evoluiu! " + nomeHabilidade + " nível " + nivel);
    }

    setValor("xp" + nomeHabilidade, xp);
    setValor("nivel" + nomeHabilidade, nivel);
}

// ---------- BAÚS ----------
function ganharBauAleatorio(){
    let chance = Math.random();
    let bau = null;

    if(chance < 0.50){
        bau = "Baú Comum";
    } else if(chance < 0.80){
        bau = "Baú Raro";
    } else if(chance < 0.95){
        bau = "Baú Épico";
    } else {
        bau = "Baú Lendário";
    }

    let baus = JSON.parse(localStorage.getItem("baus")) || [];
    baus.push(bau);
    localStorage.setItem("baus", JSON.stringify(baus));

    alert("🎁 Você recebeu um " + bau + "!");
}

function abrirBau(tipoBau){
    let baus = JSON.parse(localStorage.getItem("baus")) || [];
    const index = baus.indexOf(tipoBau);

    if(index === -1){
        alert("Você não possui esse baú.");
        return;
    }

    baus.splice(index, 1);
    localStorage.setItem("baus", JSON.stringify(baus));

    let itensPossiveis = [];

    if(tipoBau === "Baú Comum"){
        itensPossiveis = [
            "📘 Fragmento de Conhecimento",
            "💧 Núcleo de Energia",
            "🪙 Bolsa Pequena de Moedas"
        ];
    }

    if(tipoBau === "Baú Raro"){
        itensPossiveis = [
            "⚔️ Medalha da Disciplina",
            "📖 Livro do Conhecimento",
            "🟣 Cristal Roxo"
        ];
    }

    if(tipoBau === "Baú Épico"){
        itensPossiveis = [
            "🔥 Núcleo de Evolução",
            "💎 Cristal de Ascensão",
            "🛡️ Emblema do Guardião"
        ];
    }

    if(tipoBau === "Baú Lendário"){
        itensPossiveis = [
            "👑 Coroa do Titã",
            "🌌 Aura Ascendente",
            "⚡ Relíquia do Sistema"
        ];
    }

    const item = itensPossiveis[Math.floor(Math.random() * itensPossiveis.length)];

    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    inventario.push(item);
    localStorage.setItem("inventario", JSON.stringify(inventario));

    alert("🎉 Você abriu " + tipoBau + " e ganhou: " + item);

    carregarBaus();
    carregarInventario();
}

function carregarBaus(){
    const area = document.getElementById("bausPerfil");

    if(!area) return;

    const baus = JSON.parse(localStorage.getItem("baus")) || [];

    if(baus.length === 0){
        area.innerHTML = "<p>Nenhum baú disponível.</p>";
        return;
    }

    area.innerHTML = "";

    baus.forEach(bau => {
        area.innerHTML += `
            <div class="mini-card">
                <p>🎁 ${bau}</p>
                <button onclick="abrirBau('${bau}')">Abrir</button>
            </div>
        `;
    });
}

// ---------- DASHBOARD ----------
function carregarDashboard(){
    const nome = localStorage.getItem("nomeJogador") || "Jogador";
    const foto = localStorage.getItem("fotoPerfil");
    const classe = localStorage.getItem("classe") || "Recruta";

    const nivel = getValor("nivel", 1);
    const xp = getValor("xp", 0);
    const moedas = getValor("moedas", 0);
    const rank = calcularRank(nivel);

    const forca = getValor("forca", 1);
    const conhecimento = getValor("conhecimento", 1);
    const disciplina = getValor("disciplina", 1);
    const energia = getValor("energia", 1);

    if(document.getElementById("dashboardNome")){
        document.getElementById("dashboardNome").innerText = nome;
        document.getElementById("dashboardClasse").innerText = "Classe: " + classe;

        if(document.getElementById("dashboardRank")){
            document.getElementById("dashboardRank").innerText = rank;
        }

        document.getElementById("dashboardNivel").innerText = "Nível " + nivel;
        document.getElementById("dashboardXP").innerText = xp;
        document.getElementById("dashboardXPBar").style.width = xp + "%";

        if(document.getElementById("dashboardMoedas")){
            document.getElementById("dashboardMoedas").innerText = moedas;
        }

        document.getElementById("dashForca").innerText = forca;
        document.getElementById("dashConhecimento").innerText = conhecimento;
        document.getElementById("dashDisciplina").innerText = disciplina;
        document.getElementById("dashEnergia").innerText = energia;
    }

    if(foto && document.getElementById("dashboardFoto")){
        document.getElementById("dashboardFoto").innerHTML = `<img src="${foto}">`;
    }
}

// ---------- LOJA ----------
function carregarLoja(){
    const moedas = getValor("moedas", 0);

    if(document.getElementById("moedasLoja")){
        document.getElementById("moedasLoja").innerText = moedas;
    }
}

function comprarItem(nomeItem, preco){
    let moedas = getValor("moedas", 0);

    if(moedas >= preco){
        moedas -= preco;
        setValor("moedas", moedas);

        let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
        inventario.push(nomeItem);

        localStorage.setItem("inventario", JSON.stringify(inventario));

        alert("✅ Item comprado: " + nomeItem);
        carregarLoja();
    } else {
        alert("❌ Moedas insuficientes.");
    }
}

// ---------- INVENTÁRIO ----------
function carregarInventario(){
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const area = document.getElementById("inventarioPerfil");

    if(area){
        if(inventario.length === 0){
            area.innerHTML = "<p>Nenhum item comprado ainda.</p>";
        } else {
            area.innerHTML = "";

            inventario.forEach(item => {
                area.innerHTML += `
                    <div class="mini-card">
                        <p>${item}</p>
                    </div>
                `;
            });
        }
    }
}

// ---------- CLASSES ----------
function escolherClasse(nomeClasse){
    localStorage.setItem("classe", nomeClasse);
    alert("Classe escolhida: " + nomeClasse);
    carregarDashboard();
}

// ---------- TEMA ----------
function aplicarTema(){
    const tema = localStorage.getItem("tema") || "escuro";

    if(tema === "claro"){
        document.body.classList.add("tema-claro");
    } else {
        document.body.classList.remove("tema-claro");
    }
}

function ativarTemaClaro(){
    localStorage.setItem("tema", "claro");
    aplicarTema();
}

function ativarTemaEscuro(){
    localStorage.setItem("tema", "escuro");
    aplicarTema();
}

// ---------- RESET ----------
function resetarProgresso(){
    const confirmar = confirm("Tem certeza que deseja apagar todo o progresso?");

    if(confirmar){
        localStorage.clear();
        alert("Progresso resetado.");
        location.href = "../index.html";
    }
}

// ---------- INICIAR SISTEMA ----------
mostrarFoto();
carregarAtributos();
carregarHabilidades();
carregarDashboard();
carregarLoja();
carregarInventario();
carregarBaus();
aplicarTema();