// URL base da API — mude para a URL do Azure em produção
const API_URL = "http://localhost:8000";

export interface Categoria {
  id: number;
  nome: string;
}

export interface CategoriaRel {
  nome: string;
}

export interface Produto {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  vendedor: string;
  categoria_rel?: CategoriaRel | null;
}

export interface NovoProdutoPayload {
  titulo: string;
  descricao: string;
  preco: number;
  categoria_id: number | null;
  vendedor: string;
}

// --- Categorias ---

export async function listarCategorias(): Promise<Categoria[]> {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) throw new Error("Erro ao buscar categorias");
  return response.json();
}

export async function criarCategoria(dados: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.detail || "Erro ao criar categoria");
  }
  return response.json();
}

// --- Produtos ---

export async function listarProdutos(): Promise<Produto[]> {
  const response = await fetch(`${API_URL}/produtos`);
  if (!response.ok) throw new Error("Erro ao buscar produtos");
  return response.json();
}

export async function criarProduto(dados: NovoProdutoPayload): Promise<Produto> {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.detail || "Erro ao criar produto");
  }
  return response.json();
}

export async function deletarProduto(id: number): Promise<unknown> {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao deletar produto");
  return response.json();
}
