import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, PageEvent, MatDialogRef, MatTableDataSource, Sort, MAT_DIALOG_DATA } from '@angular/material';
import { first } from 'rxjs/operators';
import { ManagementDialogComponent } from '../management-dialog/management-dialog.component';
import { Orders } from '../orders';
import { OrdersService } from '../services/orders.service';
import { OffersService } from '../services/offers.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-orders-managment',
  templateUrl: './orders-managment.component.html',
  styleUrls: ['./orders-managment.component.css']
})
export class OrdersManagmentComponent implements OnInit {
  dataSource: MatTableDataSource<Orders>;
  orders: Orders[];
  displayedColumns: string[] = ['orderId', 'user.userId', 'totalPrice',
   'discount', 'contract.done', 'contract.deposit', 'createdDate', 'edit', 'delete'];
  pageSize = 10;
  pageIndex = 0;
  length: number;
  sortBy = 'orderId';
  sortOrder = 'asc';
  pageSizeOptions: number[] = [ 10, 1, 30 ];

  constructor(private ordersService: OrdersService,
              private offersService: OffersService,
              private authService: AuthenticationService,
              public dialog: MatDialog) {
    ordersService.getAll(this.pageIndex, this.pageSize, this.sortBy, this.sortOrder).subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(this.orders);
    });
   }


  ngOnInit() {
    this.ordersService.getLenght().subscribe((data: number) => {
      this.length = data;
    });
  }

  filter() {
      // tslint:disable-next-line:max-line-length
      this.offersService.getLenght().subscribe(length => this.ordersService.getAll(0, length, `orderId`, `ASC`).subscribe(allOrders => {
        const dialogRef = this.dialog.open(FilterOrdersDialogComponent, {
          width: '500px',
          data: {orders: allOrders}
        });
        dialogRef.afterClosed().pipe(first()).subscribe(data => {
          if (data != null){
            this.orders = data;
            this.dataSource = new MatTableDataSource(this.orders);
            this.length = data.length;
          }
        });
      }));

  }

  sort(sort: Sort) {
    if (sort.direction != null) {
      this.sortOrder = sort.direction;
      this.sortBy = sort.active;
    }
    // tslint:disable-next-line:max-line-length
    this.ordersService.getAll(this.pageIndex, this.pageSize, this.sortBy, this.sortOrder).subscribe(data => this.dataSource.data = data);
  }


  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ordersService.getAll(event.pageIndex, event.pageSize, this.sortBy, this.sortOrder).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  edit(id) {
    const dialogRef = this.dialog.open(EditOrdersDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().pipe(first()).subscribe(role => {
      const order = this.orders.find(ele => ele.orderId === id);
      order.totalPrice += (order.totalPrice * (0.01 * order.discount));
      order.totalPrice -= (order.totalPrice * (0.01 * role.discount));
      order.discount = role.discount;
      order.contract.done = role.done;
      if (order.contract.done) {
        order.offers.archivized = true;
        this.offersService.update(order.offers.offerId, order.offers).pipe(first()).subscribe();
      }
      this.ordersService.update(id, order).pipe(first()).subscribe();
    });
  }

  delete(id) {
    const dialogRef = this.dialog.open(ManagementDialogComponent, {
      width: '350px',
      data: {data: false}
    });

    dialogRef.afterClosed().pipe(first()).subscribe((data: boolean) => {
      if (data === true) { this.ordersService.delete(id).subscribe(); 
      }
    });
  }

}

@Component({
  selector: 'app-orders-management-dialog',
  templateUrl: 'edit-orders-dialog.html'
})
export class EditOrdersDialogComponent {
  private discount: number;
  private done: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditOrdersDialogComponent>) {
    }

    onClick(): void {
      const result = {done: this.done, discount: this.discount};
      this.dialogRef.close(result);
    }

}

@Component({
  selector: 'app-offer-managment-filter-dialog',
  templateUrl: 'filter-order-dialog.html',
  styleUrls: ['./orders-managment.component.css']
})

export class FilterOrdersDialogComponent {
  orderId: string;
  // tslint:disable-next-line:variable-name
  userId: string;
  done: boolean;
  minDiscount: number;
  maxDiscount: number;
  minValue: number;
  maxValue: number;

  constructor(
    public dialogRef: MatDialogRef<FilterOrdersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onClick(): void {
      const order = this.data.orders.filter((o: Orders) => {
        console.log(o.userId);
        if (this.orderId == null || Number(this.orderId) === o.orderId) {
          if (this.userId == null || Number(this.userId) === o.userId) {
            if (this.maxValue == null || this.maxValue >= o.totalPrice) {
              if (this.minValue == null || this.minValue <= o.totalPrice) {
                if (this.minDiscount == null || this.minDiscount <= o.discount) {
                  if (this.maxDiscount == null || this.maxDiscount >= o.discount) {
                    return o;
                  }
                }
              }
            }
          }
        }
      });

      this.dialogRef.close(order);
    }

}
