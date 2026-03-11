import { prisma } from "../config/prisma.js";
import { userSchema } from "../validator/users.validator.js";

class UserService {
    async findAll() {
        return await prisma.user.findMany();
    }

    async findById(id) {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        return user || null;
    }

    async createUser(data) {
        // 1. Validation avec Zod
        const result = userSchema.safeParse(data);
        
        if (!result.success) {
            const formattedErrors = result.error.errors.map((err) => ({
                path: err.path.join(','),
                message: err.message
            }));
            
            const error = new Error('Validation failed');
            error.statusCode = 400;
            error.details = formattedErrors; // Changé 'errors.errors' qui n'existait pas
            throw error;
        }

        // 2. Création dans Prisma
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email
            }
        });
        return newUser;
    }

    async updateUser(id, { name, email }) {
        const user = await this.findById(id);
        if (!user) return null;

        return await prisma.user.update({
            where: { id: id },
            data: { name, email },
        });
    }

    async deleteUser(id) {
        const user = await this.findById(id);
        if (!user) return false;

        await prisma.user.delete({
            where: { id: id },
        });
        return true;
    }
}

export default new UserService(); // Export d'une instance pour plus de simplicité