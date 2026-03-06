let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

document.addEventListener("DOMContentLoaded",renderizarTabela);

function abrirModal(){
    document.getElementById("modal").style.display = "block";
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
    limparCampos();
}

function salvarFilme() {
    const capa = document.getElementById("capa").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const ano = document.getElementById("ano").value;
    const classificacao = document.getElementById("classificacao").value.trim();
    const produtora = document.getElementById("produtora").value.trim();

    if(!nome || !genero) {
        alert("Nome e Gênero são obrigatórios!");
        return;
    }

    const existe = filmes.find
    (filme => filme.nome === nome);

    if (existe) {
        alert("Filme já cadastrado!");
        return;
    }

    const novoFilme = {
        id: Date.now(),
        capa,
        nome,
        genero,
        ano,
        classificacao,
        produtora
    };

    filmes.push(novoFilme);
    atualizarLocalStorage();
    renderizarTabela();
    fecharModal();
}

function renderizarTabela() {
    const tabela = document.getElementById("dados");
    tabela.innerHTML = "";

    filmes.forEach(filme =>{
        tabela.innerHTML += `
        <tr>
            <td><img src="${filme.capa}"></td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.produtora}</td>
            <td>
            <button onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>
            </tr>
            `;
    });
}

function excluirFilme(id){
    filmes = filmes.filter(filme => filme.id !== id)
    atualizarLocalStorage();
    renderizarTabela();
}

function atualizarLocalStorage(){
    localStorage.setItem("filmes",JSON.stringify(filmes));
}

function limparCampos(){
    document.getElementById("capa").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("classificacao").value = "";
    document.getElementById("produtora").value = "";
}

const filtrar = document.getElementById("filtrar").value;

function buscarPorGenero(){
    const filtrar = document.getElementById("filtrar").value.trim().toLowerCase();
    const tabela = document.getElementById("dados");

    tabela.innerHTML = "";

    const filtrados = filmes.filter(filme => 
        filme.genero.toLowerCase() === filtrar
    );

    filtrados.forEach(filme =>{
        tabela.innerHTML += `
        <tr>
            <td><img src="${filme.capa}"></td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.produtora}</td>
            <td>
            <button onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>
        </tr>
        `;
    });
}

function mostrarTodos(){
    document.getElementById("filtrar").value = "";
    renderizarTabela();
}