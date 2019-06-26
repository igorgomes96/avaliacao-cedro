import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/shared/models/prato';
import { PratosService } from 'src/app/core/services/pratos.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pratos-lista',
  templateUrl: './pratos-lista.component.html',
  styleUrls: ['./pratos-lista.component.css']
})
export class PratosListaComponent implements OnInit {

  pratos: Prato[] = [];
  constructor(private pratosService: PratosService) { }

  ngOnInit() {
    this.pratosService.getAll()
      .subscribe((pratos: Prato[]) => {
        this.pratos = pratos;
      });
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
            switchMap(_ => this.pratosService.getAll())
          ).subscribe((pratos: Prato[]) => {
            this.pratos = pratos;
          });
      }
    });
  }

}
