import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
})
export class Pagination {

  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  goToPage(page: number) {
    if (page >=0 && page < this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }
}
