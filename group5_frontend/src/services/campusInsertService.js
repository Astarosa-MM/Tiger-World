import axios from "axios";

// Use full URL since this runs in Node
const API_BASE = "http://localhost:3000/api/insert";

/**
 * Insert Campus
 */
export async function insertCampus(data) {
  const res = await axios.post(API_BASE, data);
  return res.data;
}