import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
    transform(status: string): string {
        switch (status) {
            case 'OPEN': return 'Abierto';
            case 'IN_PROGRESS': return 'En Progreso';
            case 'RESOLVED': return 'Resuelto';
            case 'CLOSED': return 'Cerrado';
            case 'CANCELLED': return 'Cancelado';
            default: return status;
        }
    }
}