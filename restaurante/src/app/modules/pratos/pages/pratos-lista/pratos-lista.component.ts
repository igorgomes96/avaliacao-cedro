import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/shared/models/prato';
import { PratosService } from 'src/app/core/services/pratos.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { PagedResult } from 'src/app/shared/models/paged-result';

@Component({
  selector: 'app-pratos-lista',
  templateUrl: './pratos-lista.component.html',
  styleUrls: ['./pratos-lista.component.css']
})
export class PratosListaComponent implements OnInit {

  pratos: PagedResult<Prato> = {
    currentPage: 1,
    pageCount: 0,
    pageSize: 5,
    result: [],
    totalRecords: 0
  };
  constructor(private pratosService: PratosService) { }

  ngOnInit() {
    this.carregaPratos();
  }

  carregaPratos() {
    this.pratosService.getAll({ pageSize: this.pratos.pageSize, pageNumber: this.pratos.currentPage })
      .subscribe((pratos: PagedResult<Prato>) => {
        this.pratos = pratos;
      });
  }

  alteraPagina(pagina: number) {
    this.pratos.currentPage = pagina;
    this.carregaPratos();
  }

  alteraTamanhoPagina(tamanhoPagina: number) {
    this.pratos.pageSize = tamanhoPagina;
    this.carregaPratos();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não conseguirá desfazer a exclussão desse prato.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((confirmacao) => {
      if (confirmacao.value) {
        this.pratosService.delete(id)
          .pipe(
            switchMap(_ => this.pratosService.getAll({ pageSize: this.pratos.pageSize, pageNumber: this.pratos.currentPage }))
          ).subscribe((pratos: PagedResult<Prato>) => {
            this.pratos = pratos;
          });
      }
    });
  }

}
