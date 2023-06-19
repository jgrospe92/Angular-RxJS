import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { EMPTY, Subject, catchError } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject();
  errorMessage$ = this.errorMessageSubject.asObservable();

  selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) { }

  products$ = this.productService.productWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

  onSelected(productId: number): void {
    this.productService.selectedProductChange(productId);
  }
}
