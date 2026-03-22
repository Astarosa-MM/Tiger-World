import axios from "axios";

const API_BASE = "/api/insert";

/**
 * Insert Campus
 */
export async function insertCampus(data) {
  const res = await axios.post(`${API_BASE}/01_insert_campus`, data);
  return res.data;
}

/**
 * Insert Building
 */
export async function insertBuilding(data) {
  const res = await axios.post(`${API_BASE}/02_insert_building`, data);
  return res.data;
}

/**
 * Insert Elevator
 */
export async function insertElevator(data) {
  const res = await axios.post(`${API_BASE}/03_insert_elevator`, data);
  return res.data;
}

/**
 * Insert Floor
 */
export async function insertFloor(data) {
  const res = await axios.post(`${API_BASE}/04_insert_floor`, data);
  return res.data;
}

/**
 * Insert Room
 */
export async function insertRoom(data) {
  const res = await axios.post(`${API_BASE}/05_insert_room`, data);
  return res.data;
}

/**
 * Insert Hallway
 */
export async function insertHallway(data) {
  const res = await axios.post(`${API_BASE}/06_insert_hallway`, data);
  return res.data;
}

/**
 * Insert Elevator Stop
 */
export async function insertElevatorStop(data) {
  const res = await axios.post(`${API_BASE}/07_insert_elevatorstop`, data);
  return res.data;
}

/**
 * Insert Zone
 */
export async function insertZone(data) {
  const res = await axios.post(`${API_BASE}/08_insert_zone`, data);
  return res.data;
}

/**
 * Insert Room-Zone Association
 */
export async function insertRoomZone(data) {
  const res = await axios.post(`${API_BASE}/09_insert_roomzone_association`, data);
  return res.data;
}

/**
 * Insert Connection
 */
export async function insertConnection(data) {
  const res = await axios.post(`${API_BASE}/10_insert_connection`, data);
  return res.data;
}