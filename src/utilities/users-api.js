import sendRequest from './send-request';
const BASE_URL = "/api/users";

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function getAll() {
  return sendRequest(`${BASE_URL}/notes`);
}


export function handleCreateNote(noteData){
  return sendRequest(`${BASE_URL}/notes`, 'POST', noteData)
}