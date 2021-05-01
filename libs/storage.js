const {vendor, ex} = require("@mini-dev/vendor");

const storage = {
    get(key, defaultValue) {
        return ex('getStorage')({key}).then(ds => {
            if (!ds) {
                return defaultValue;
            }
            const wrap = JSON.parse(ds);
            return wrap.data || defaultValue;
        });
    },
    getSync(key, defaultValue) {
        const ds = vendor.getStorageSync(key);
        if (!ds) {
            return defaultValue;
        }
        const wrap = JSON.parse(ds);
        return wrap.data || defaultValue;
    },
    getAll(includeValues) {
        return ex('getStorageInfo')().then(res => {
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
        return ex('setStorage')({key, data});
    },
    setSync(key, data) {
        const wrap = {
            data
        };
        vendor.setStorageSync(key, JSON.stringify(wrap));
        return this;
    },
    remove(key) {
        return ex('removeStorage')({key});
    },
    removeSync(key) {
        vendor.removeStorageSync(key);
        return this;
    },
    clear() {
        return ex('clearStorage')();
    },
    clearSync() {
        vendor.clearStorageSync();
        return this;
    }
};

export default storage;
