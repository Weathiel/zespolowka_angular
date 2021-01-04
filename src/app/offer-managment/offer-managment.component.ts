import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Offer } from '../offer';
import { MatDialog, PageEvent, MatDialogRef, MAT_DIALOG_DATA, Sort, MatTableDataSource } from '@angular/material';
import { first } from 'rxjs/operators';
import { ManagementDialogComponent } from '../management-dialog/management-dialog.component';
import { OffersService } from '../services/offers.service';
import { Car } from '../car';
import { CarsService } from '../services/cars.service';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-offer-managment',
  templateUrl: './offer-managment.component.html',
  styleUrls: ['./offer-managment.component.css']
})
export class OfferManagmentComponent implements OnInit {
  car: Car[];
  offers: Offer[];
  displayedColumns: string[] = ['offerId', 'cars.model', 'cars.brand',
   'price', 'archivized', 'mileage', 'edit', 'delete'];
  pageIndex = 0;
  pageSize = 10;
  length: number;
  pageSizeOptions: number[] = [ 10, 1, 30 ];
  sortBy = 'offerId';
  sortOrder = 'asc';
  dataSource: MatTableDataSource<Offer>;

  constructor(private offersService: OffersService,
              private carsService: CarsService,
              public dialog: MatDialog) {
    offersService.getAll(this.pageIndex, this.pageSize, this.sortBy, this.sortOrder).subscribe(data => {
      this.offers = data;
      this.offers.every(back => back.priceBack = back.price);
      this.dataSource = new MatTableDataSource(this.offers);
    });
   }

  ngOnInit() {
    this.offersService.getLenght().subscribe((data: number) => {
      this.length = data;
    });
  }

  changePage(event: PageEvent) {
    this.offersService.getAll(event.pageIndex, event.pageSize, this.sortBy, this.sortOrder).subscribe(data => {
      this.offers = data;
      this.dataSource.data = this.offers;
    });
  }

  sort(sort: Sort) {
    if (sort.direction !== null) {
      this.sortOrder = sort.direction;
      this.sortBy = sort.active;
      this.offersService.getAll(this.pageIndex, this.pageSize, this.sortBy, this.sortOrder).subscribe(data => this.dataSource.data = data);
    }
  }

  create() {

    this.carsService.getAll().pipe().subscribe(car => {

      const dialogRef = this.dialog.open(CreateOfferDialogComponent, {
        width: '500px',
        data: {cars: car}
      });

      dialogRef.afterClosed().pipe(first()).subscribe(off => {
        const img = off.imageUpload;
        off.imageUpload = null;
        this.offersService.create(off, img).subscribe((nes: Offer) => {
          this.offersService.setImage(nes, img);
          this.offers.push(nes);
          this.dataSource = new MatTableDataSource(this.offers);
          this.offersService.getLenght().subscribe((data: number) => {
            this.length = data;
          });
        });

      });

    });
  }


  edit(id) {
    const dialogRef = this.dialog.open(EditOfferDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().pipe(first()).subscribe(role => {
      const offer = this.offers.find(ele => ele.offerId === id);
      offer.price = role.price;
      offer.archivized = role.archivized;
      this.offersService.update(id, offer).pipe(first()).subscribe();
    });
  }

  delete(id) {
    const dialogRef = this.dialog.open(ManagementDialogComponent, {
      width: '350px',
      data: {data: false}
    });

    dialogRef.afterClosed().pipe(first()).subscribe((data: boolean) => {
      if (data === true) { this.offersService.delete(id).subscribe();
                           this.dataSource.data = this.dataSource.data.filter(dat => {
                            if (dat.offerId !== id) {
                              return dat;
                              }
                           });
                          }
    });
  }

  filter() {
    this.carsService.getAll().pipe().subscribe(car => {
      this.offersService.getLenght().subscribe(length => this.offersService.getAll(0, length, `offerId`, `asc`).subscribe(allOffers => {
        const dialogRef = this.dialog.open(FilterOfferDialogComponent, {
          width: '500px',
          data: {cars: car, offers: allOffers}
        });
        dialogRef.afterClosed().pipe(first()).subscribe(data => {
          if (data != null) {
            this.offers = data;
            this.dataSource = new MatTableDataSource(this.offers);
            this.length = data.length;
          }
        });
      }));
    });

  }


}

@Component({
  selector: 'app-offer-managment-dialog',
  templateUrl: 'edit-offer-dialog.html'
})
export class EditOfferDialogComponent {
  private price: number;
  private archivized: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditOfferDialogComponent>) {
    }

    onClick(): void {
      const result = {archivized: this.archivized, price: this.price};
      this.dialogRef.close(result);
    }

}

@Component({
  selector: 'app-offer-managment-filter-dialog',
  templateUrl: 'filter-offer-dialog.html',
  styleUrls: ['./offer-managment.component.css']
})

export class FilterOfferDialogComponent {
  newCars: Car = new Car();
  newOffers: Offer = new Offer();
  minValue: number;
  maxValue: number;
  date = new FormControl(new Date());
  maxDate = new FormControl(new Date());
  color: string;
  // tslint:disable-next-line:variable-name
  prod_country: string;
  englishCar: boolean;
  minMilleage: number;
  maxMilleage: number;

  constructor(
    public dialogRef: MatDialogRef<FilterOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    selectBrand(brand) {
      return this.data.cars.filter(elementbrand => elementbrand.brand === brand);
    }

    selectModel(model) {
      return this.data.cars.filter(elementmodel => elementmodel.model === model);
    }

    selectColor(color) {
      return this.data.offers.filter(elementcolor => elementcolor.color === color);
    }


    onClick(): void {
       const foundCar = this.data.cars.find(searchCar => {
         if (searchCar.brand === this.newCars.brand
           && searchCar.model === this.newCars.model
           && searchCar.gas_type === this.newCars.gas_type
           && searchCar.body_type === this.newCars.body_type) {
             return searchCar;
           }
      });

       console.log(foundCar);



       const offer = this.data.offers.filter((searchOffer: Offer) => {

        if (this.minMilleage == null || searchOffer.mileage >= this.minMilleage) {
          if (this.maxMilleage == null || searchOffer.mileage <= this.maxMilleage) {
            if (this.minValue == null || searchOffer.price >= this.minValue) {
              if (this.maxValue == null || searchOffer.price <= this.maxValue) {
                if (foundCar == null || foundCar.carId === searchOffer.cars.carId) {
                  if (this.englishCar == null || this.englishCar === searchOffer.englishCar) {
                    if (this.prod_country == null || this.prod_country === searchOffer.prod_country) {
                      if (searchOffer.production_date == null) {
                        return searchOffer;
                      }
                      const prodDate = new Date(searchOffer.production_date);
                      // console.log(prodDate);
                      if (this.date.value == null || this.date.value <= prodDate) {
                        if (this.maxDate.value == null || this.maxDate.value >= prodDate) {
                          return searchOffer;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    });

       this.dialogRef.close(offer);
    }

}

@Component({
  selector: 'app-offer-managment-create-dialog',
  templateUrl: 'create-offer-dialog.html',
  styleUrls: ['./offer-managment.component.css']
})
export class CreateOfferDialogComponent {
  newCars: Car = new Car();
  value = 0;
  date = new FormControl(new Date());
  color: string;
  // tslint:disable-next-line:variable-name
  prod_country: string;
  englishCar: boolean;
  milleage: number;
  imageUpload = new FormData();

  constructor(
    public dialogRef: MatDialogRef<CreateOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    }

    selectBrand(brand) {
      return this.data.cars.filter(elementbrand => elementbrand.brand === brand);
    }

    selectModel(model) {
      return this.data.cars.filter(elementmodel => elementmodel.model === model);
    }

    onClick(): void {
       const foundCar = this.data.cars.find(searchCar => {
         if (searchCar.brand === this.newCars.brand
           && searchCar.model === this.newCars.model
           && searchCar.gas_type === this.newCars.gas_type
           && searchCar.body_type === this.newCars.body_type) {
             return searchCar;
           }
      });
       const creation: Offer = new Offer();
       creation.cars = foundCar;
       creation.carId = foundCar.carId;
       creation.archivized = false;
       creation.color = this.color;
       creation.englishCar = this.englishCar;
       creation.price = this.value;
       creation.prod_country = this.prod_country;
       creation.production_date = this.date.value;
       creation.mileage = this.milleage;
       creation.imageUpload = this.imageUpload;
       this.dialogRef.close(creation);
    }

    imageInputChange(event) {
      const file = event.target.files[0];
      this.imageUpload.append('file', file);
    }

}
