class SwApiService {
  _apiBase = "https://swapi.dev/api";
  async getRsrc(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received  ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
 async getAllPeople() {
     const res = await this.getRsrc(`/people/`);
    return res.results
  }
  getPerson(id) {
    return this.getRsrc(`/people/${id}/`);
  }
 async getAllPlanets() {
     const res = await this.getRsrc(`/planets/`);
    return res.results
  }
  getPlanet(id) {
    return this.getRsrc(`/planet/${id}/`);
  }
 async getAllStarShips() {
     const res = await this.getRsrc(`/starships/`);
    return res.results
  }
  getStarShip(id) {
    return this.getRsrc(`/starship/${id}/`);
  }
}
const swapi = new SwApiService();

swapi.getPerson(4).then((person) => {
    // person.forEach(element => {
        console.log(person.name);
    // });
});
