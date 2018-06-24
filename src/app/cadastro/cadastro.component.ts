import { Component, OnInit } from '@angular/core';
import { AlunoComponent } from '../aluno/aluno.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro.service';
import { ProfessorService } from '../services/professor.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  alunos: AlunoComponent[] = [];
  cadAluno: AlunoComponent = new AlunoComponent();
  professores: AlunoComponent[] = [];
  mensagem: string = '';
  idAluno: string ;

    constructor(private service: CadastroService, private serviceProf: ProfessorService, private route: ActivatedRoute,private router: Router){
        this.carregar(); 

        this.route.params.subscribe(params => {
            let id = params['id'];
            this.idAluno = id;
                if(id){
                    this.service.listaId(id)
                    .subscribe(resp => {
                        console.log(resp);
                        this.cadAluno = resp;
                    });
                }
        });
    }

  cadastrar(event){
      event.preventDefault();
      
      console.log(JSON.stringify(this.cadAluno));
      let header = new Headers();
      header.append('Content-Type', 'application/json')

      if(this.idAluno){
          this.service.alterar(this.idAluno, this.cadAluno)
          .subscribe(() => {
              this.carregar();
              console.log(this.cadAluno);
              this.mensagem = 'Alterado com sucesso!';
              //this.router.navigate(['']);
          })
      } else {
          this.service.cadastra(this.cadAluno)
          .subscribe(() => {
              this.carregar();
              this.mensagem = 'Cadastrado com sucesso!';
              this.cadAluno = new AlunoComponent; 
          })
      }
  }

  carregar() {
    this.serviceProf.listaProfessores().subscribe(res=> {
        this.professores = res;
    });
  }

  remove(alunos: AlunoComponent) {
      console.log("Chamou aqui" + alunos.nome);

      this.service.remove(alunos.id)
      .subscribe(
          ()=> {
            //   let novosAlunos = this.alunos.slice(0);
            //   let indice = novosAlunos.indexOf(alunos);
            //   novosAlunos.splice(indice, 1);
            //   this.alunos = novosAlunos;
              
              this.mensagem = "Aluno "+ alunos.nome +" removido com sucesso!";
              this.carregar();
          } ,
          erro => console.log(erro)
      );
  }

}
