import {Schema, model} from 'mongoose';

const DenunciaSchema = new Schema({
    name: {type:String, unique:true},
    description: {type:String},
    user: {type: Schema.Types.ObjectId, required:true, ref: 'User'},
    date: {type: Date}
})

export default model('Denuncia', DenunciaSchema);