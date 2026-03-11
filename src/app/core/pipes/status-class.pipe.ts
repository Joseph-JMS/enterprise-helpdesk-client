import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'statusClass'
})
export class StatusClassPipe implements PipeTransform {
    transform(status: string): string {
        switch (status) {
            case 'OPEN': return 'badge bg-primary';
            case 'IN_PROGRESS': return 'badge bg-warning text-dark';
            case 'RESOLVED': return 'badge bg-success';
            case 'CLOSED': return 'badge bg-secondary';
            case 'CANCELLED': return 'badge bg-danger';
            default: return 'badge bg-secondary';
        }
    }
}