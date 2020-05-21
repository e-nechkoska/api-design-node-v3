import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'
import mongoose from 'mongoose'
import { connect } from '../../utils/db'
import { format } from 'morgan'

const run = async () => {
    await connect('mongodb://localhost:27017/api-test');

    const item = Item.create({
        name: 'Clean up',
        createdBy: mongoose.Types.ObjectId(),
        list: mongoose.Types.ObjectId()
    })
    
    
    item.then(() => {
        mongoose.disconnect();
        console.log(item);
    });
}

run();
// export default crudControllers(Item)
