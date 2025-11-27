const KEY_USERS = "rm_users_v1";
const KEY_MESAS = "rm_mesas_v1";
const KEY_RESERVAS = "rm_reservas_v1";
const KEY_AUTH = "rm_auth_token_v1"; 
const KEY_CLIENTES_SIMPLES = "rm_clientes_simples_v1";
const KEY_CARDAPIO = "rm_cardapio_v1";

const read = (k) => JSON.parse(localStorage.getItem(k) || "[]");
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const generateId = (arr) => (arr.length ? Math.max(...arr.map((a) => a.id)) + 1 : 1);
const makeToken = (userId) => `fake-jwt-${userId}-${Date.now()}`;

function findUserByEmail(email) {
  return read(KEY_USERS).find((u) => u.email === email);
}


export const authRegister = ({ nome, email, password, role = "cliente" }) => {
  const users = read(KEY_USERS);
  if (users.find((u) => u.email === email)) {
    return { mensagem: "Email já cadastrado", erro: true };
  }
  const newUser = {
    id: generateId(users),
    nome,
    email,
    password,
    role, 
  };
  users.push(newUser);
  write(KEY_USERS, users);
  const token = makeToken(newUser.id);
  localStorage.setItem(KEY_AUTH, JSON.stringify({ token, userId: newUser.id }));
  return { mensagem: "Cadastro realizado", erro: false, token };
};

export const authLogin = ({ email, password }) => {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return { mensagem: "Credenciais inválidas", erro: true };
  }
  const token = makeToken(user.id);
  localStorage.setItem(KEY_AUTH, JSON.stringify({ token, userId: user.id }));
  return { mensagem: "Logado com sucesso", erro: false, token };
};

export const authLogout = () => {
  localStorage.removeItem(KEY_AUTH);
  return { mensagem: "Logout", erro: false };
};

export const getAuthUser = () => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const users = read(KEY_USERS);
  const user = users.find((u) => u.id === auth.userId);
  if (!user) return { mensagem: "Usuário não encontrado", erro: true };
  const { password, ...rest } = user;
  return { mensagem: "OK", erro: false, usuario: rest };
};

export const updateProfile = ({ nome, email }) => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const users = read(KEY_USERS);
  const idx = users.findIndex((u) => u.id === auth.userId);
  if (idx === -1) return { mensagem: "Usuário não encontrado", erro: true };

  const other = users.find((u) => u.email === email && u.id !== auth.userId);
  if (other) return { mensagem: "Email em uso", erro: true };

  users[idx].nome = nome;
  users[idx].email = email;
  write(KEY_USERS, users);
  const { password, ...rest } = users[idx];
  return { mensagem: "Perfil atualizado", erro: false, usuario: rest };
};


export const createMesa = ({ codigo, n_lugares }) => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const mesas = read(KEY_MESAS);
  const newMesa = {
    id: generateId(mesas),
    codigo,
    n_lugares,
    status: "disponivel", 
  };
  mesas.push(newMesa);
  write(KEY_MESAS, mesas);
  return { mensagem: "Mesa cadastrada", erro: false, mesa: newMesa };
};

export const listMesas = () => {
  const mesas = read(KEY_MESAS);
  return { mensagem: "OK", erro: false, mesas };
};

export const updateMesa = ({ id, codigo, n_lugares, status }) => {
  const mesas = read(KEY_MESAS);
  const idx = mesas.findIndex((m) => m.id === id);
  if (idx === -1) return { mensagem: "Mesa não encontrada", erro: true };
  mesas[idx] = { ...mesas[idx], codigo, n_lugares, status };
  write(KEY_MESAS, mesas);
  return { mensagem: "Mesa atualizada", erro: false, mesa: mesas[idx] };
};

export const deleteMesa = (id) => {
  let mesas = read(KEY_MESAS);
  mesas = mesas.filter((m) => m.id !== id);
  write(KEY_MESAS, mesas);
  return { mensagem: "Mesa excluída", erro: false };
};


export const createReserva = ({ data, n_pessoas, mesaId }) => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const reservas = read(KEY_RESERVAS);
  const mesas = read(KEY_MESAS);
  const mesa = mesas.find((m) => m.id === Number(mesaId));
  if (!mesa) return { mensagem: "Mesa inválida", erro: true };

  const newReserva = {
    id: generateId(reservas),
    userId: auth.userId,
    data,
    n_pessoas: Number(n_pessoas),
    mesaId: mesa.id,
    createdAt: new Date().toISOString(),
  };
  reservas.push(newReserva);
  write(KEY_RESERVAS, reservas);

  mesa.status = "ocupada";
  write(KEY_MESAS, mesas);

  return { mensagem: "Reserva realizada", erro: false, reserva: newReserva };
};

export const listMyReservas = () => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const reservas = read(KEY_RESERVAS).filter((r) => r.userId === auth.userId);
  const mesas = read(KEY_MESAS);
  const reservasComMesas = reservas.map((r) => ({
    ...r,
    mesa: mesas.find((m) => m.id === r.mesaId) || null,
  }));
  return { mensagem: "OK", erro: false, reservas: reservasComMesas };
};

export const deleteReserva = (id) => {
  const reservas = read(KEY_RESERVAS);
  const mesas = read(KEY_MESAS);

  const reserva = reservas.find((r) => r.id === id);
  if (!reserva) return { mensagem: "Reserva não encontrada", erro: true };

  const mesa = mesas.find((m) => m.id === reserva.mesaId);
  if (mesa) mesa.status = "disponivel";

  const novasReservas = reservas.filter((r) => r.id !== id);
  write(KEY_RESERVAS, novasReservas);
  write(KEY_MESAS, mesas);

  return { mensagem: "Reserva excluída e mesa liberada", erro: false };
};

export const updateReserva = (id, dados) => {
  const reservas = read(KEY_RESERVAS);
  const idx = reservas.findIndex((r) => r.id === id);
  if (idx === -1) return { mensagem: "Reserva não encontrada", erro: true };
  reservas[idx] = { ...reservas[idx], ...dados };
  write(KEY_RESERVAS, reservas);
  return { mensagem: "Reserva atualizada", erro: false, reserva: reservas[idx] };
};

export const seedInitial = () => {
  if (!localStorage.getItem(KEY_USERS)) {
    write(KEY_USERS, [
      { id: 1, nome: "Admin Restaurante", email: "adm@rest.com", password: "adm123", role: "adm" },
      { id: 2, nome: "Cliente Exemplo", email: "cliente@ex.com", password: "cli123", role: "cliente" },
    ]);
  }
  if (!localStorage.getItem(KEY_MESAS)) {
    write(KEY_MESAS, [
      { id: 1, codigo: "M-01", n_lugares: "4", status: "disponivel" },
      { id: 2, codigo: "M-02", n_lugares: "2", status: "disponivel" },
    ]);
  }
  if (!localStorage.getItem(KEY_RESERVAS)) {
    write(KEY_RESERVAS, []);
  }

  if (!localStorage.getItem(KEY_CARDAPIO)) {
    write(KEY_CARDAPIO, [
      { id: 1, nome: "X-Salada", preco: 18.90 },
      { id: 2, nome: "Pizza Média", preco: 32.00 },
      { id: 3, nome: "Lasanha", preco: 27.50 }
    ]);
  }

  if (!localStorage.getItem(KEY_CLIENTES_SIMPLES)) {
    write(KEY_CLIENTES_SIMPLES, []);
  }
};

export const cadastrarClienteSimples = (dados) => {
  const clientes = read(KEY_CLIENTES_SIMPLES);
  const novo = { id: generateId(clientes), ...dados };
  clientes.push(novo);
  write(KEY_CLIENTES_SIMPLES, clientes);
  return { mensagem: "Cliente cadastrado!", erro: false, cliente: novo };
};

export const listarClientesSimples = () => {
  return { mensagem: "OK", erro: false, clientes: read(KEY_CLIENTES_SIMPLES) };
};

export const listarCardapio = () => {
  return { mensagem: "OK", erro: false, itens: read(KEY_CARDAPIO) };
};
