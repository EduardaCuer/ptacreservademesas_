// apiMock.js
// Simula endpoints: /auth/login, /auth/cadastro, /perfil, /mesa, /reservas
// Armazena em localStorage

const KEY_USERS = "rm_users_v1";
const KEY_MESAS = "rm_mesas_v1";
const KEY_RESERVAS = "rm_reservas_v1";
const KEY_AUTH = "rm_auth_token_v1"; // token atual (obj: {token, userId})

/* helpers */
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
    role, // 'adm' or 'cliente'
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

  // check email uniqueness
  const other = users.find((u) => u.email === email && u.id !== auth.userId);
  if (other) return { mensagem: "Email em uso", erro: true };

  users[idx].nome = nome;
  users[idx].email = email;
  write(KEY_USERS, users);
  const { password, ...rest } = users[idx];
  return { mensagem: "Perfil atualizado", erro: false, usuario: rest };
};

/* MESAS */
export const createMesa = ({ codigo, n_lugares }) => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const mesas = read(KEY_MESAS);
  const newMesa = {
    id: generateId(mesas),
    codigo,
    n_lugares,
    status: "disponivel", // disponivel | ocupada
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

/* RESERVAS */
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
    data, // yyyy-mm-dd
    n_pessoas: Number(n_pessoas),
    mesaId: mesa.id,
    createdAt: new Date().toISOString(),
  };
  reservas.push(newReserva);
  write(KEY_RESERVAS, reservas);

  // opcional: marcar mesa como ocupada
  mesa.status = "ocupada";
  write(KEY_MESAS, mesas);

  return { mensagem: "Reserva realizada", erro: false, reserva: newReserva };
};

export const listMyReservas = () => {
  const auth = JSON.parse(localStorage.getItem(KEY_AUTH) || "null");
  if (!auth) return { mensagem: "Não autenticado", erro: true };
  const reservas = read(KEY_RESERVAS).filter((r) => r.userId === auth.userId);
  const mesas = read(KEY_MESAS);
  // anexar dados da mesa
  const reservasComMesas = reservas.map((r) => ({
    ...r,
    mesa: mesas.find((m) => m.id === r.mesaId) || null,
  }));
  return { mensagem: "OK", erro: false, reservas: reservasComMesas };
};

/* seed inicial (apenas se vazio) */
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
};

