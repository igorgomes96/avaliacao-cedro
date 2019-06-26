import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/shared/models/restaurante';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurante-novo',
  templateUrl: './restaurante-novo.component.html',
  styleUrls: ['./restaurante-novo.component.css']
})
export class RestauranteNovoComponent implements OnInit {

  restaurante = new Restaurante();
  constructor(private restaurantesService: RestaurantesService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  salvar(restaurante: Restaurante) {
    this.restaurantesService.post(restaurante)
    .subscribe(_ => {
      this.toastr.success('Restaurante salvo com sucesso!', 'Sucesso!', { progressBar: true });
      this.router.navigate(['/restaurantes']);
    });
  }

  cancelar() {
    this.router.navigate(['/restaurantes']);
  }


}
