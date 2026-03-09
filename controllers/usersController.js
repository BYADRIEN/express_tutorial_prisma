import { parse } from "path";
import UserService from "../services/userServices.js"
import { create } from "domain";

const service = new UserService()

export const getUsers =  (req, res) => {
    const users = service.findAll();
    res.json(users);
};

export const getUserById = (req , res ) => {
    const { id } = req.params;
    const user = service.findById(parseInt(id))
    if(!user){
        res.status(404).json({
            message: "User not found"
        })
        return
    }
    res.json(user);
}

export const createUser = (req, res) => {
        const { name,age } = req.body;
        const createUser = service.createUser({name, age});
        if(!createUser){
            res.status(404).json({
                message:"an error  occured"
            });
            return
        }
        res.status(201).json({
            message:"User created success",
            user: createUser
        });
}
 export const updateUser = (req , res) => { 
            const { id } = req.params
            const { name,age } = req.body;
            const updateUser = service.updateUser(parseInt(id), { name, age })
            if(!updateUser){
                res.status(404).json({
                    message: "An error occured"
                })
                return;
            }
            res.json({
                message: "user update success",
                user: updateUser
            })
   }
   export const deleteUser = (req, res) => {
            const { id } = req.params
            const isDelete = service.deleteUser(parseInt(id))
            if(!isDelete){
                res.status(400).json({
                    message:"You cant delete this account"
                })
                return;
            }
            res.json({
                message:"user deleted success"
            })
   }