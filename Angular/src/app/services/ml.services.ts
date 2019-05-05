import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MlService {
    
    constructor(private http: HttpClient) { 
        console.log("Servicio de Mercado Libre Listo");
    }
    
    getQuery(q:string){
        return this.http.get('http://localhost/api/items?q='+q);
    }

    getItem(id:string){
        return this.http.get('http://localhost/api/items/'+id);
    }

}
