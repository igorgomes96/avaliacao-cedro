import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/shared/models/prato';
import { PratosService } from 'src/app/core/services/pratos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prato-novo',
  templateUrl: './prato-novo.component.html',
  styleUrls: ['./prato-novo.component.css']
})
export class PratoNovoComponent implements OnInit {

  prato = new Prato();
  constructor(private pratosService: PratosService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  salvar(prato: Prato) {
    this.pratosService.post(prato)
    .subscribe(_ => {
      this.toastr.success('Prato salvo com sucesso!', 'Sucesso!', { progressBar: true });
      this.router.navigate(['/pratos']);
    });
  }

  cancelar() {
    this.router.navigate(['/pratos']);
  }

}
