import fs from 'fs'
// import { stringify } from 'querystring'; // Note: inutile ici si tu utilises JSON.stringify

const usersFile = './data/users.json' // Ajout de la majuscule ici

export const readUsers = () => {
    // Utilisation de usersFile avec la majuscule
    const data = fs.readFileSync(usersFile); 
    return JSON.parse(data);
}

export const writeUsers = (users) => {
    // Utilisation de usersFile avec la majuscule
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}