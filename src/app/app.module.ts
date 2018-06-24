import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AlunoComponent } from './aluno/aluno.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ProfessorComponent } from './professor/professor.component';
import { routing } from './app.routes';
import { HttpClient} from '@angular/common/http';
import { CadastroService } from './services/cadastro.service';
import { ProfessorService } from './services/professor.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    CadastroComponent,
    ProfessorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule    
  ],
  providers: [CadastroService, ProfessorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
