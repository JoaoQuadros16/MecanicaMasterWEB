const form = document.getElementById("form-cliente");
const lista = document.getElementById("lista-clientes");

async function renderizarClientes() {
  lista.innerHTML = "";
  const clientes = await listarClientes();

  if (clientes.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "lista-vazia";
    vazio.textContent = "Nenhum cliente cadastrado ainda.";
    lista.appendChild(vazio);
    return;
  }

  clientes.forEach((cliente) => {
    const item = document.createElement("li");
    item.className = "cliente-item";

    const info = document.createElement("div");
    info.className = "cliente-info";

    const avatar = document.createElement("div");
    avatar.className = "cliente-avatar";
    avatar.textContent = cliente.nome.charAt(0).toUpperCase();

    const nomeEl = document.createElement("span");
    nomeEl.className = "cliente-nome";
    nomeEl.textContent = cliente.nome;

    const telefoneEl = document.createElement("span");
    telefoneEl.className = "cliente-telefone";
    telefoneEl.textContent = cliente.telefone;

    const textos = document.createElement("div");
    textos.className = "cliente-textos";
    textos.appendChild(nomeEl);
    textos.appendChild(telefoneEl);

    info.appendChild(avatar);
    info.appendChild(textos);

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = async () => {
      await excluirCliente(cliente.id);
      renderizarClientes();
    };

    item.appendChild(info);
    item.appendChild(btnExcluir);
    lista.appendChild(item);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const novoCliente = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value
  };

  await criarCliente(novoCliente);
  form.reset();
  renderizarClientes();
});

renderizarClientes();
