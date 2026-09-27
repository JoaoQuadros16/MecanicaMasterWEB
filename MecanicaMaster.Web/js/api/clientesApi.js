// Centraliza toda comunicação com a API de Clientes.
// Assim, se a URL da API mudar, você só mexe aqui.

const API_BASE_URL = "https://localhost:7186/api";

async function listarClientes() {
  const resposta = await fetch(`${API_BASE_URL}/clientes`);
  if (!resposta.ok) throw new Error("Erro ao buscar clientes");
  return resposta.json();
}

async function criarCliente(cliente) {
  const resposta = await fetch(`${API_BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  if (!resposta.ok) throw new Error("Erro ao criar cliente");
  return resposta.json();
}

async function excluirCliente(id) {
  const resposta = await fetch(`${API_BASE_URL}/clientes/${id}`, {
    method: "DELETE"
  });
  if (!resposta.ok) throw new Error("Erro ao excluir cliente");
}
