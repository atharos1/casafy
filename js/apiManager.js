var api = class {
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

  static get(url) {
    return api.fetch(url);
  }

  static post(url, body) {
    return api.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  }

  static put(url, body) {
    return api.fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body)
    });
  }

  static delete(url) {
    return api.fetch(url, {
      method: "DELETE"
    });
  }
};

api.rooms = class {
  static get url() {
    return api.baseUrl + "rooms/";
  }

  static create(room) {
    return api.post(api.rooms.url, room);
  }

  static modify(room) {
    return api.put(api.rooms.url + room.id, room);
  }

  static delete(id) {
    return api.delete(api.rooms.url + id);
  }

  static get(id) {
    return api.get(api.rooms.url + id);
  }

  static getDevices(id) {
    return api.get(api.rooms.url + id + "/devices");
  }

  static getAll() {
    return api.get(api.rooms.url);
  }

  static toggleFavorite(id) {
    api.rooms
      .get(id)
      .then(data => {
        var room = data["room"];
        var meta = JSON.parse(room["meta"]);

        meta["isFavorite"] = !meta["isFavorite"];
        room["meta"] = JSON.stringify(meta);

        api.rooms.modify(room);

        api.rooms
          .modify(room)
          .then(data => {
            return true;
          })
          .catch(error => {
            alert("Request failed: " + error);
            return false;
          });
      })
      .catch(error => {
        alert("Request failed: " + error);
        return false;
      });
  }

  static updateData(id, name, isFavorite, image) {
    /*api.rooms
      .get(id)
      .then(data => {
        var room = data["room"];
        var meta = JSON.parse(room["meta"]);

        if (name) room["name"] = name;

        if (isFavorite) meta["isFavorite"] = isFavorite;
        if (image) meta["image"] = image;
        room["meta"] = JSON.stringify(meta);

        api.rooms
          .modify(room)
          .then(data => {
            return true;
          })
          .catch(error => {
            alert("Request failed: " + error);
            return false;
          });
      })
      .catch(error => {
        alert("Request failed: " + error);
        return false;
      });*/
  }
};

api.devices = class {
  static get url() {
    return api.baseUrl + "devices/";
  }

  static getAll() {
    return api.fetch(api.devices.url);
  }

  static create(device) {
    return api.fetch(api.devices.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(room)
    });
  }

  static get(id) {
    return api.fetch(api.devices.url + id);
  }

  static modify(device) {
    return api.put(api.devices.url + device.id);
  }

  static delete(id) {
    return api.delete(api.devices.url + id);
  }
};
