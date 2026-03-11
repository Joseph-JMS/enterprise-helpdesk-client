import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'priorityClass'
})
export class PriorityClassPipe implements PipeTransform {
    transform(priority: string): string {
        switch (priority) {
            case 'CRITICAL': return 'badge bg-danger';
            case 'HIGH': return 'badge bg-warning text-dark';
            case 'MEDIUM': return 'badge bg-info text-dark';
            case 'LOW': return 'badge bg-secondary';
            default: return 'badge bg-secondary';
        }
    }
}