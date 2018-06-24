import { Component, OnInit } from '@angular/core';
import { AlunoComponent } from '../aluno/aluno.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfessorService } from '../services/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  professor: AlunoComponent = new AlunoComponent();
  professores: Object[] = [];
  mensagem: string = '';
  idProfessor: string ;


  constructor(private service: ProfessorService, private route: ActivatedRoute, private router: Router){

      this.route.params.subscribe(params => {
          let id = params['id'];
          this.idProfessor = id;
          if(id){
              this.service.listaId(id)
              .subscribe(resp => {
                 console.log(resp);
                 this.professor = resp;
              });
          }
      });
  }

    ngOnInit(): void {
        this.carrega();
    }

  cadastrar(event) {
      event.preventDefault();
      
      if(this.idProfessor){
          this.service.altera(this.idProfessor, this.professor)
          .subscribe(()=> {
              this.professor = new AlunoComponent();
              this.mensagem = this.professor.nome+" alterado com sucesso!";
              alert('Alterado com sucesso!');
              this.router.navigate(['/professor']);
              this.carrega();
          })

      }else{
          console.log(this.professor);
          this.service.cadastrarProfessor(this.professor)
          .subscribe(()=>{
              this.mensagem = this.professor.nome+" cadastrado com sucesso!";
              this.professor = new AlunoComponent();
              this.carrega();
          })
      }
  }
  
  carrega() {
      this.service.listaProfessores()
      .subscribe(res => {
          this.professores = res;
          console.log(this.professores);
      })
  }

  remove(professor) {
      console.log(professor);
      this.service.remove(professor.id)
      .subscribe(() => {
          let novosProfessores = this.professores.slice(0);
          let indice = novosProfessores.indexOf(professor);
          novosProfessores.splice(indice, 1);
          this.professores = novosProfessores;

          this.mensagem = "Aluno "+ professor.nome +" removido com sucesso!";
      })
  }

}
