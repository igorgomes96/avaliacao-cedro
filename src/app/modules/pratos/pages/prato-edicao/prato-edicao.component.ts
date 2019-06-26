import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PratosService } from 'src/app/core/services/pratos.service';
import { ToastrService } from 'ngx-toastr';
import { Prato } from 'src/app/shared/models/prato';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-prato-edicao',
  templateUrl: './prato-edicao.component.html',
  styleUrls: ['./prato-edicao.component.css']
})
export class PratoEdicaoComponent implements OnInit {

  prato: Prato;
  constructor(private route: ActivatedRoute,
    private pratosService: PratosService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data
      .pipe(filter(routeData => routeData.hasOwnProperty('prato')))
      .subscribe((data: any) => {
        this.prato = data.prato;
      });
  }

  salvar(prato: Prato) {
    this.pratosService.put(prato.id, prato)
    .subscribe(_ => {
      this.toastr.success('Prato salvo com sucesso!', 'Sucesso!', { progressBar: true });
      this.router.navigate(['/pratos']);
    });
  }

  cancelar() {
    this.router.navigate(['/pratos']);
  }

}
