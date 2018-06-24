import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { AlunoComponent } from "../aluno/aluno.component";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class CadastroService {

    http: HttpClient;
    headers: Headers;
    url: string = 'http://localhost:9090/alunos';
    urlProfessor: string = 'http://localhost:9090/professores';
    constructor(http: HttpClient) {

        this.http = http;
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");

    }

    cadastra(aluno: AlunoComponent){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
          };

        console.log(JSON.stringify(aluno));
        return this.http.post(this.url, JSON.stringify(aluno), httpOptions)
    }

    lista(): Observable<AlunoComponent[]> {
        return this.http.get<AlunoComponent[]>(this.url)
    }

    listaId(id): Observable<AlunoComponent> {
        return this.http.get<AlunoComponent>(this.url+"/"+id)
    } 

    listaProfessores(): Observable<any> {
        return this.http.get(this.urlProfessor, {responseType: 'json'})
    }

    alterar(id, cadAluno: AlunoComponent) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
          };
        return this.http.put(this.url+"/"+id, JSON.stringify(cadAluno), httpOptions);
    }

    remove(id) {
        return this.http.delete(this.url+"/"+id)
    }
}