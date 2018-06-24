import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from "rxjs";
import { AlunoComponent } from "../aluno/aluno.component";
import { Professor } from "../model/professor.model";

@Injectable()
export class ProfessorService {

    url: string = "http://localhost:9090/professores";

    constructor(private http:HttpClient){    }

    cadastrarProfessor(professor: AlunoComponent){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
          };

        return this.http.post(this.url, JSON.stringify(professor), httpOptions)

    }

    listaProfessores(): Observable<AlunoComponent[]> {
        return this.http.get<AlunoComponent[]>(this.url)
    }

    listaId(id): Observable<Professor> {
        return this.http.get<Professor>(this.url+"/"+id)
    }

    remove(id) {
        return this.http.delete(this.url+"/"+id);
    }

    altera(id, professor) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
          };
       // let headers = new HttpHeaders();
       // headers.append('Content-Type','application/json');
       // headers.append('Authorization','my-auth-token');

        return this.http.put(this.url+"/"+id, JSON.stringify(professor),httpOptions)
    }


}