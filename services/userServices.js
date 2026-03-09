import { readUsers, writeUsers } from "../utils/filehelper.js";

class UserService {
    findAll() {
        return readUsers();
    }

    findById(id) {
        const users = this.findAll();
        // Attention : force le type en nombre si tes IDs sont des nombres
        const user = users.find((u) => u.id === Number(id));
        return user || null;
    }

    createUser({ name, age }) {
        if (!name || !age) return null;

        const users = this.findAll();
        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name,
            age
        };

        users.push(newUser);
        writeUsers(users);
        return newUser;
    }

    updateUser(id, { name, age }) {
        const users = this.findAll();
        const user = users.find((u)=> u.id == id)
        if(!user) return null
        user.name = name
        user.age = age 
        writeUsers(users)
        return users;
    }

    deleteUser(id){
        const users = this.findAll()
                const user = users.find((u)=> u.id == id)
if(!user) return false
const _users = users.filter((u) => u.id !== id)
writeUsers(_users)
return true 
    }
}

export default UserService;