

export class AppCache<T> {
     map:Record<string,T>={};

    getData(key:string){
        return this.map[key];
    }

    setData(key:string, value:T){
        this.map[key] = value
    }
}