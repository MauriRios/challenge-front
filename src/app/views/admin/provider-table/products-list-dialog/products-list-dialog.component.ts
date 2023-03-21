import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCardLgImage } from '@angular/material/card';
import { Sort } from '@angular/material/sort';
import { Product } from 'src/app/models/product.model';
import { Provider } from 'src/app/models/provider.model';
import { ProviderDataService } from 'src/app/services/provider-data.service';

@Component({
  selector: 'app-products-list-dialog',
  templateUrl: './products-list-dialog.component.html',
  styleUrls: ['./products-list-dialog.component.css']
})
export class ProductsListDialogComponent implements OnInit, AfterViewInit {

  productList: Product[] = [];
  provider: Provider = new Provider();
  sortedData: Product[];

  constructor(private providerDataService : ProviderDataService,) {
  }

  ngOnInit(): void {
    this.getProvider();

  }
  ngAfterViewInit(): void {
    this.getProvider();
  }

  getProvider():void{
    let id = localStorage.getItem('idProvider');
    this.providerDataService.getProviderById(+id!).subscribe(
      data => {
        this.provider = data;
        this.productList = this.provider.productList.map( data => data );
        this.sortedData = this.productList.slice();
        console.log(this.productList)
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.productList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
          case 'name':
            return compare(a.name, b.name, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'stock':
          return compare(a.stock, b.stock, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


