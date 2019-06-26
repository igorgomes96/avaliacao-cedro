import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Restaurante } from 'src/app/shared/models/restaurante';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurante-edicao',
  templateUrl: './restaurante-edicao.component.html',
  styleUrls: ['./restaurante-edicao.component.css']
})
export class RestauranteEdicaoComponent implements OnInit {

  restaurante: Restaurante;
  constructor(private route: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.data
      .pipe(filter(routeData => routeData.hasOwnProperty('restaurante')))
      .subscribe((data: any) => {
        this.restaurante = data.restaurante;
      });
  }

  salvar(restaurante: Restaurante) {
    this.restaurantesService.put(restaurante.id, restaurante)
    .subscribe(_ => {
      this.toastr.success('Restaurante salvo com sucesso!', 'Sucesso!', { progressBar: true });
      this.router.navigate(['/restaurantes']);
    });
  }

  cancelar() {
    this.router.navigate(['/restaurantes']);
  }

}
