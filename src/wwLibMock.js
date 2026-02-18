export const wwLib = {
    resolveObjectPropertyPath(obj, path) {
        if (!path || !obj) return obj;
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    },
    wwCollection: {
        getCollectionData(data) {
            return Array.isArray(data) ? data : (data?.data || []);
        }
    },
    wwVariable: {
        useComponentVariable({ uid, name, type, defaultValue }) {
            return {
                setValue: (val) => console.log(`Set variable ${name} for ${uid} to`, val),
                getValue: () => defaultValue
            };
        }
    },
    getFrontDocument() {
        return window.document;
    }
};

window.wwLib = wwLib;
