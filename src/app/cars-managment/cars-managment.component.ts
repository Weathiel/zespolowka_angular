import { Component, OnInit, Inject } from '@angular/core';
import { Sort, MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { first } from 'rxjs/operators';
import { Offer } from '../offer';
import { CarsService } from '../services/cars.service';
import { Car } from '../car';
import { FilterOfferDialogComponent } from '../offer-managment/offer-managment.component';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-cars-managment',
  templateUrl: './cars-managment.component.html',
  styleUrls: ['./cars-managment.component.css']
})
export class CarsManagmentComponent implements OnInit {
  cars: Car[];
  displayedColumns: string[] = ['carId', 'brand', 'model',
   'body_type', 'gas_type', 'engine_power', 'edit', 'delete'];
  pageIndex = 0;
  pageSize = 10;
  length: number;
  pageSizeOptions: number[] = [ 10, 1, 30 ];
  sortBy = 'carId';
  offers: Car[];
  sortOrder = 'asc';
  dataSource: MatTableDataSource<Car>;
  constructor(private carsService: CarsService,
              private offersService: OffersService,
              public dialog: MatDialog) {
                this.carsService.getAll().subscribe(ca => {
                  this.dataSource = new MatTableDataSource(ca);
                });
              }

  ngOnInit() {
    this.carsService.getLenght().subscribe(nes => this.length = nes);
  }

  filter() {
    this.carsService.getAll().pipe().subscribe(car => {
        const dialogRef = this.dialog.open(FilterCarsDialogComponent, {
          width: '500px',
          data: {cars: car}
        });
        dialogRef.afterClosed().pipe(first()).subscribe(data => {
          if (data != null) {
            this.offers = data;
            this.dataSource = new MatTableDataSource(this.offers);
            this.length = data.length;
          }
        });
    });

  }

  delete(id) {
    this.carsService.delete(id).subscribe();
  }

  edit(id) {

  }

  sort(sort: Sort) {
    if (sort.direction !== null) {
      this.sortOrder = sort.direction;
      this.sortBy = sort.active;
      this.carsService.getAll().subscribe(data => this.dataSource.data = data);
    }
  }

  create() {

      const dialogRef = this.dialog.open(CreateCarsDialogComponent, {
        width: '500px',
        data: {}
      });

      dialogRef.afterClosed().pipe(first()).subscribe(off => {
        this.carsService.create(off).subscribe();
        this.carsService.getLenght().subscribe(data => {
          this.length = data;
          this.cars.push(off);
          this.dataSource = new MatTableDataSource(this.cars);
        });

    });
  }

}

@Component({
  selector: 'app-cars-managment-dialog',
  templateUrl: 'create-cars-dialog.html'
})
export class CreateCarsDialogComponent {
  private model: string;
  private brand: string;
  // tslint:disable-next-line:variable-name
  private gas_type: string;
  // tslint:disable-next-line:variable-name
  private body_type: string;
  // tslint:disable-next-line:variable-name
  private engine_power: number;

  constructor(
    public dialogRef: MatDialogRef<CreateCarsDialogComponent>) {
    }

    onClick(): void {
      const c = new Car();
      c.body_type = this.body_type;
      c.brand = this.brand;
      c.engine_power = this.engine_power;
      c.gas_type = this.gas_type;
      c.model = this.model;
      this.dialogRef.close(c);
    }

}

@Component({
  selector: 'app-cars-managment-filter-dialog',
  templateUrl: 'filter-cars-dialog.html'
})

export class FilterCarsDialogComponent {
  newCars: Car = new Car();
  // tslint:disable-next-line:variable-name
  prod_country: string;
  englishCar: boolean;
  minMilleage: number;
  maxMilleage: number;

  selectBrand(brand) {
    return this.data.cars.filter(elementbrand => elementbrand.brand === brand);
  }

  selectModel(model) {
    return this.data.cars.filter(elementmodel => elementmodel.model === model);
  }

  constructor(
    public dialogRef: MatDialogRef<FilterCarsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onClick(): void {

      const foundCar = this.data.cars.filter(searchCar => {
        if ( (searchCar.brand === this.newCars.brand || this.newCars.brand == null)
          && (searchCar.model === this.newCars.model || this.newCars.model == null)
          && (searchCar.gas_type === this.newCars.gas_type || this.newCars.gas_type == null)
          && (searchCar.body_type === this.newCars.body_type || this.newCars.gas_type == null)) {
            return searchCar;
          }
     });

      this.dialogRef.close(foundCar);
    }

}
