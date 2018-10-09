class apiManager {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 60 * 1000;
  }

  static fetch(url, init) {
    return new Promise(function(resolve, reject) {
      var timeout = setTimeout(function() {
        reject(new Error("Time out"));
      }, api.timeout);

      fetch(url, init)
        .then(function(response) {
          clearTimeout(timeout);
          if (!response.ok) reject(new Error(response.statusText));

          return response.json();
        })
        .then(function(data) {
          resolve(data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
}

class apiRoomManager {
  static get url() {
    return api.baseUrl + "rooms/";
  }

  static add(room) {
    return api.fetch(api.room.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(room)
    });
  }

  static modify(room) {
    return api.fetch(api.room.url + room.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(room)
    });
  }

  static delete(id) {
    return api.fetch(api.room.url + id, {
      method: "DELETE"
    });
  }

  static get(id) {
    return api.fetch(api.room.url + id);
  }

  static getAll() {
    return api.fetch(api.room.url);
  }
}

apiManager.room = apiRoomManager;
