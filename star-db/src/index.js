import SwApiService from "./services/swapi-service"
const swapi = new SwApiService();

swapi.getPerson(4).then((person) => {
    // person.forEach(element => {
        console.log(person.name);
    // });
});
