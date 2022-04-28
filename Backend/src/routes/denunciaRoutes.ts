import {Request, response, Response, Router} from 'express';
import Denuncia from '../models/Denuncia';
import User from '../models/User';
import usersRoutes from './usersRoutes';

class DenunciaRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getDenuncias(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allDenuncias = await Denuncia.find().populate('user');
        if (allDenuncias.length == 0){
            res.status(404).send("There are no denuncias yet!")
        }
        else{
            res.status(200).send(allDenuncias);
        }
    }

    public async getDenunciasByName(req: Request, res: Response) : Promise<void> {
        const denunciaFound = await Denuncia.findOne({name: req.params.nameDenuncia}).populate('user');;
        if(denunciaFound == null){
            res.status(404).send("The denuncia doesn't exist!");
        }
        else{
            res.status(200).send(denunciaFound);
        }
    }


    public async addDenunciaUser(req: Request, res: Response) : Promise<void> {
        const {name, description, date} = req.body;

        const user = await User.findOne({name: req.body.user});

        if(user==null){
            res.status(404).send("Usuario denunciado no existe");
        }
        else{
            const newDenuncia = new Denuncia({name, description, user, date});
            const savedDenuncia = await newDenuncia.save();

            user.denuncias.push(newDenuncia._id);
            const userToUpdate = await User.findOneAndUpdate({ name : user.name }, { denuncias: user.denuncias});
            res.status(200).send('Denuncia added!');
        }
    }


    public async updateDenuncia(req: Request, res: Response) : Promise<void> {
        const {name, description, date} = req.body;
        const user = await User.findOne({name: req.body.user});
        if(user==null){
            res.status(404).send('User not found');
        }
        else{
            const denunciaUpdated = await Denuncia.findOneAndUpdate({name: req.params.nameDenuncia},{name:name, description:description, user: user._id, date:date});
            if(denunciaUpdated == null){
                res.status(404).send("Denuncia not found");
            }
            else{
                res.status(200).send("Denuncia updated");
            }
        }
        
    }

    public async deleteDenuncia(req: Request, res: Response) : Promise<void> {
        const denunciaToDelete = await Denuncia.findOneAndDelete ({name: req.params.nameDenuncia});
        if (denunciaToDelete == null){
            res.status(404).send("La denuncia no existe")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    
    routes() {
        this.router.get('/', this.getDenuncias);
        this.router.get('/:nameDenuncia', this.getDenunciasByName);
        this.router.post('/', this.addDenunciaUser);
        this.router.put('/:nameDenuncia', this.updateDenuncia);
        this.router.delete('/:nameDenuncia', this.deleteDenuncia);
    }
}
const denunciaRoutes = new DenunciaRoutes();

export default denunciaRoutes.router;