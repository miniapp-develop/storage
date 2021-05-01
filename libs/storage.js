import wxx from "./wxx";

const vendor = require("@mini-dev/vendor");

const storage = {
    get(key, defaultValue) {
        return wxx('getStorage')({key}).then(ds => {
            if (!ds) {
                return defaultValue;
            }
            const data = JSON.parse(ds);
            return data.data || defaultValue;
        });
    },
    getSync(key, defaultValue) {
        const ds = vendor.getStorageSync(key);
        if (!ds) {
            return defaultValue;
        }
        const data = JSON.parse(ds);
        return data.data || defaultValue;
    },
    getAll(includeValues) {
        return wxx('getStorageInfo')().then(res => {
            if (includeValues) {
                res.entries = res.keys.map(key => {
                    return [key, this.getSync(key)];
                });
            }
            return res;
        });
    },
    getAllSync(includeValues) {
        const res = vendor.getStorageInfoSync();
        if (includeValues) {
            res.entries = res.keys.map(key => {
                return [key, this.getSync(key)];
            });
        }
        return res;
    },
    set(key, data) {
        return wxx('setStorage')({key, data});
    },
    setSync(key, data) {
        const wrap = {
            data
        };
        vendor.setStorageSync(key, JSON.stringify(wrap));
        return this;
    },
    remove(key) {
        return wxx('removeStorage')({key});
    },
    removeSync(key) {
        vendor.removeStorageSync(key);
        return this;
    },
    clear() {
        return wxx('clearStorage')();
    },
    clearSync() {
        vendor.clearStorageSync();
        return this;
    }
};

export default storage;
