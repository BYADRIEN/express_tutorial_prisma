import UserService from "../services/userServices.js"; 
import { z } from "zod"; // On importe Zod directement ici

// --- TON VALIDATEUR (Défini ici pour éviter l'erreur de fichier manquant) ---
const userSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "Le nom doit contenir au moins 3 lettres"),
    email: z.string()
        .email("L'adresse email n'est pas valide")
        .toLowerCase()
});

const service = UserService; 

export const getUsers = async (req, res) => {
    try {
        const users = await service.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await service.findById(parseInt(id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        // 1. On valide les données entrantes
        const validatedData = userSchema.parse(req.body);

        // 2. Si c'est ok, on envoie les données PROPRES au service
        const newUser = await service.createUser(validatedData);
        
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
   } catch (error) {
        if (error instanceof z.ZodError) {
            console.log("❌ ERREUR DE VALIDATION :");
            
            // On utilise .flatten() qui est beaucoup plus stable pour le log
            const fieldErrors = error.flatten().fieldErrors;
            console.log(fieldErrors); 

            return res.status(400).json({
                message: "Erreur de validation",
                details: fieldErrors
            });
        }

        console.error("💥 Erreur système :", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        // On utilise .partial() pour que Zod n'oblige pas à renvoyer TOUS les champs
        const validatedData = userSchema.partial().parse(req.body);
        
        const updatedUser = await service.updateUser(parseInt(id), validatedData);
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.flatten().fieldErrors });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await service.deleteUser(parseInt(id));
        
        if (!isDeleted) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};