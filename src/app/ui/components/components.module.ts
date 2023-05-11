import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { PipesModule } from 'src/app/aplication/pipes/pipes.module';



@NgModule({
  declarations: [
    TableComponent,
    ModalComponent,
    AddPokemonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    TableComponent,
    ModalComponent,
    AddPokemonComponent,
  ]
})
export class ComponentsModule { }
