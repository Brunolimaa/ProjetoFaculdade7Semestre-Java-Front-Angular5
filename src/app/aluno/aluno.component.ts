import { Component, OnInit } from '@angular/core';
import { Professor } from '../model/professor.model';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent {

  nome: string;
  curso: string;
  id: string;
  cod: string;

}
