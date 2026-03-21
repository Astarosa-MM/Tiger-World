/**
 * ------------------------------------------------------------
 * Insert Elevator Stop Service
 * ------------------------------------------------------------
 *
 * Provides functions to interact with the backend API for
 * inserting elevator/stair stops into a transport shaft.
 *
 * Behavior:
 * - Inserts one or more stops for a given elevator/stair shaft.
 * - Backend enforces continuity (no internal gaps in stops).
 * - Returns warning if building has floors not served by any transport shaft.
 */

import axios from "axios";

const API_BASE = "/api/transport-shafts";

/**
 * Insert stops into a transport shaft.
 *
 * @param {number|string} shaftId - ID of the transport shaft.
 * @param {number[]} floorIds - Array of floor IDs to insert stops for.
 * @param {boolean} [autoFill=false] - If true, backend will fill internal gaps automatically.
 * @returns {Promise<{message: string, warning?: string}>}
 */
export async function insertElevatorStops(shaftId, floorIds, autoFill = false) {
  try {
    const response = await axios.post(`${API_BASE}/${shaftId}/stops`, {
      floor_ids: floorIds,
      auto_fill: autoFill
    });
    return response.data; // { message, warning }
  } catch (err) {
    // axios wraps errors; backend error is usually in err.response.data
    if (err.response && err.response.data) {
      throw new Error(err.response.data.error || "Unknown API error");
    }
    throw err;
  }
}