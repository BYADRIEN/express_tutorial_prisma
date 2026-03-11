import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "Le nom est trop court"),
    // Au lieu de z.string().email(), on utilise directement la méthode dédiée si elle est disponible
    email: z.email("Adresse email invalide") 
});