import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';
import { AuthParseService } from '../../services/auth.parse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { ExpenseModel } from '../../models/expense.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  displayedColumns: string[] = [ 'expenseType', 'propertyName', 'dateOfExpense', 'value'];
  dataSource;
  limit:number = environment.listItemsPerPage;
  currentPage = 0;
  currentCount = 0;
  isLastPage = false;

  constructor(
      public authService: AuthParseService,
      private route: ActivatedRoute,
      private expenseService: ExpensesService,
      public router: Router) { }

  ngOnInit() {
    this.getExpenses(this.currentPage);
  }

  private newExpense(){
    this.router.navigate(['new-expense']);
  }
  
  navExpense(row){
    console.log("click: "+JSON.stringify(row));
    this.router.navigate(['new-expense', {id:row.id}]);
  }

  nextPage(){
    if(this.currentCount >= environment.listItemsPerPage){
      this.currentPage++;
      this.getExpenses(this.currentPage);
    }
  }

  previousPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.getExpenses(this.currentPage);
    }
  }

  getExpenses(page:number = 0){
    this.expenseService.getExpenses(page).then((data) => {
      this.currentCount = Object.keys(data).length;
      this.dataSource = new MatTableDataSource<any>(data);
      if(this.currentCount < environment.listItemsPerPage){
        this.isLastPage = true;
      }else{
        this.isLastPage = false;
      }
    });
  }

}