import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priorityLabel'
})
export class PriorityLabelPipe implements PipeTransform {
    transform(priority: string): string {
        switch (priority) {
            case 'CRITICAL': return 'Critica';
            case 'HIGH': return 'Alta';
            case 'MEDIUM': return 'Media';
            case 'LOW': return 'Baja';
            default: return priority;
        }
    }
}