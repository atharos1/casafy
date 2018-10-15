var api = class {
  static get baseUrl() {
    return "http://127.0.0.1:8080/api/";
  }

  static get timeout() {
    return 5 * 1000;
  }

  static async fetch(url, method, async, data) {
    if (async == null) async = true;
    return $.ajax({
      url: url,
      async: async,
      method: method,
      timeout: api.timeout,
      data: data
    });
  }

  static async get(url, async) {
    return api.fetch(url, "GET", async, null);
  }

  static async post(url, body, async) {
    return api.fetch(url, "POST", async, JSON.stringify(body));
  }

  static async put(url, body, async) {
    return api.fetch(url, "PUT", async, JSON.stringify(body));
  }

  static async delete(url, async) {
    return api.fetch(url, "DELETE", async, null);
  }
};

api.rooms = class {
  static get url() {
    return api.baseUrl + "rooms/";
  }

  static create(room, async) {
    return api.post(api.rooms.url, room, async);
  }

  static modify(room, async) {
    return api.put(api.rooms.url + id, room, async);
  }

  static delete(id, async) {
    return api.delete(api.rooms.url + id, async);
  }

  static async get(id, async) {
    return api.get(api.rooms.url + id, async);
  }

  static async getDevices(id, async) {
    return api.get(api.rooms.url + id + "/devices", async);
  }

  static async getAll(async) {
    return api.get(api.rooms.url, async);
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

  static getAll(async) {
    return api.get(api.devices.url, async);
  }

  static create(device, async) {
    return api.post(api.devices.url, device, async);
  }

  static get(id, async) {
    return api.get(api.devices.url + id, async);
  }

  static modify(device, async) {
    return api.put(api.devices.url + device.id, device, async);
  }

  static delete(id, async) {
    return api.delete(api.devices.url + id, async);
  }
};
