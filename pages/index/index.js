import {storage} from '../../libs/index';

Page({
    data: {},
    onLoad(query) {

    },

    onTapStorage(e) {
        storage.setSync('storage/key_1', 'value_1');
        console.log(storage.getSync('storage/key_1'));
        console.log(storage.getAllSync());
        console.log(storage.getAllSync(true));
    }
});
