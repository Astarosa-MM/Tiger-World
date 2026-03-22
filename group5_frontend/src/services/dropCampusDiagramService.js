import axios from "axios";

const API_BASE = "/api/drop";

/**
 * Delete a node/entity
 * type: "ROOM"|"HALLWAY"|"STOP"|"FLOOR"|"BUILDING"|"CAMPUS"|"ZONE"
 * id: numeric ID of the entity
 * auto_fill: optional, for elevator gap checks
 */
export async function dropEntity({ type, id, auto_fill = false }) {
  try {
    const res = await axios.delete(`${API_BASE}`, { data: { type, id, auto_fill } });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.error || "Unknown API error");
    }
    throw err;
  }
}

/**
 * Delete a connection between two nodes
 */
export async function dropConnection({ ownerA_type, ownerA_id, ownerB_type, ownerB_id }) {
  try {
    const res = await axios.post(`${API_BASE}/drop_connection/delete`, {
      ownerA_type,
      ownerA_id,
      ownerB_type,
      ownerB_id
    });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.error || "Unknown API error");
    }
    throw err;
  }
}