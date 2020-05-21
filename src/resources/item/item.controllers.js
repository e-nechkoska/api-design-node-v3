import { Item } from './item.model'
import mongoose from 'mongoose'
import { connect } from '../../utils/db'

const run = async () => {
    await connect('mongodb://localhost:27017/api-test');

    const item = Item.create({
        name: 'Clean up',
        createdBy: mongoose.Types.ObjectId(),
        list: mongoose.Types.ObjectId()
    })
    
    // update document
    const updated = await Item.findOneAndUpdate(
        item._id, 
        { name: 'eat' },
        { new: true }
    ).exec();

    console.log(updated);

    // item.then(() => {
    //     mongoose.disconnect();
    //     console.log(item);
    // });
}

run();
