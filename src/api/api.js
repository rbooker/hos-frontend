import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class HOSApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${HOSApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Authorization-----------------------------------------------------------------

   /** Get token for login from username, password. */

   static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  // Members-----------------------------------------------------------------------
  /** Get the current member. */

  static async getCurrentUser(username) {
    let res = await this.request(`members/${username}`);
    return res.member;
  }

  /** Get all members */

  static async getAllUsers() {
    let res = await this.request(`members/`);
    return res.members;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`members/${username}`, data, "patch");
    return res.member;
  }

  /** Delete member */
   static async deleteUser(username) {
    let res = await this.request(`members/${username}`, {}, "delete");
    return res.deleted;
  }

  //Shows -------------------------------------------------------------------------
  /** Get all shows for a given day or, if no parameter is provided, get all shows */


  static async getShowsForDay(dayOfWeek) {
    let res;
    if(dayOfWeek)
      res = await this.request(`shows/`, { "dayOfWeek": `${dayOfWeek}` });
    else
      res = await this.request(`shows/`);
    return res.shows;
  }

  /** Get a show by its ID */

  static async getShowByID(showID) {
    let res = await this.request(`shows/${showID}`);
    return res.show;
  }

  /** Create a new show */

  static async createNewShow(data) {
    let res = await this.request(`shows/`, data, "post");
    return res.show;
  }

  /** Edit details for an existing show */
  static async editDetailsForShow(showID, data) {
    let res = await this.request(`shows/${showID}`, data, "patch");
    return res.show;
  }

  /** Delete show */
  static async deleteShow(showID) {
    let res = await this.request(`shows/${showID}`, {}, "delete");
    return res.deleted;
  }

  //Playlists ------------------------------------------------------------------------

  /** Get a playlist by its ID */

  static async getPlaylistByID(playlistID) {
    let res = await this.request(`playlists/${playlistID}`);
    return res.playlist;
  }

  /**Get all playlists */
  static async getAllPlaylists() {
    let res = await this.request(`playlists/`);
    return res.playlists;
  }

  /** Create a new playlist */

  static async createNewPlaylist(data) {
    let res = await this.request(`playlists/`, data, "post");
    return res.playlist;
  }

  /** Edit details for an existing playlist */
  static async editDetailsForPlaylist(playlistID, data) {
    let res = await this.request(`playlists/${playlistID}`, data, "patch");
    return res.playlist;
  }

   /** Delete playlist */
   static async deletePlaylist(playlistID) {
    let res = await this.request(`playlists/${playlistID}`, {}, "delete");
    return res.deleted;
  }

  //Songs -------------------------------------------------------------------------------

  /** Add a new song */
  static async addNewSong(data) {
    let res = await this.request(`songs/`, data, "post");
    return res.songAdded;
  }

   /** Edit details for an existing song */
   static async editDetailsForSong(songID, data) {
    let res = await this.request(`songs/${songID}`, data, "patch");
    return res.songUpdated;
  }

   /** Delete song */
   static async deleteSong(data) {
    let res = await this.request(`songs/`, data, "delete");
    return res.deletedSongInfo;
  }

  

  //Favorites------------------------------------------------------------------------

   /** Get all of a Member's favorites by their ID */
  static async getFavoritesByUserID(userID) {
    let res = await this.request(`favorites/${userID}`);
    return res.memberFavorites;
  }

  /**Add a new member favorite */
  static async addFavorite(data) {
    let res = await this.request(`favorites/`, data, "post");
    return res.favorite;
  }

  /**Remove an existing member favorite */
  static async removeFavorite(data) {
    let res = await this.request(`favorites/`, data, "delete");
    return res.deletedFavorite;
  }

  //Payments-----------------------------------------------------------------------------
  static async makePayment(data) {
  let res = await this.request(`payments/`, data, "post");
  return res;
}

}




export default HOSApi;
