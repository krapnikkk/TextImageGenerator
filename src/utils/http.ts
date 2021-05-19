const BASE_ROOT: string = "http://api.krapnik.cn:3003";
const API_PREFIX: string = "/api/tools/";
export const http = {
    get: (url: string) => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_ROOT}${API_PREFIX}${url}`).then((res) => {
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            })
        });
    },
    post: (url: string, params: {[key:string]:string|number}):Promise<{[key:string]:string|number}> => {
        return new Promise((resolve, reject) => {
            fetch(`${BASE_ROOT}${API_PREFIX}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(params)
            }).then((res) => {
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            })
        });
    }
}

