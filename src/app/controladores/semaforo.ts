import * as momento from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(momento);

// clase para objeto Empleado
export class Semaforo {

    // atributos 
    
    
    private fechaActual:Date= null;
    private fechaVencimiento:Date = null; 
    
    private diasRestantes:number = null;





    // metodos
    constructor(){
        this.fechaActual= new Date();
    }



    public SetFechaVencimiento(FechaVencimiento){
        this.fechaVencimiento = FechaVencimiento;
    }

 


    public CalcularSemaforoDemandas(){
    
        this.CalcularDiasFaltantes();
         
    }

    public GetDiasRestantes(){
        // console.log(this.diasRestantes);
        return this.diasRestantes;
    }


    CalcularDiasFaltantes(){
        let fecha1 = new Date(this.fechaActual);
        // console.log(fecha1)
        let fecha2 = new Date(this.fechaVencimiento);
        // console.log(fecha2)
        let range = moment.range(fecha1, fecha2);
        // console.log("v "+(fecha2.getDate()+1))
        if((fecha1.getMonth()+fecha1.getDate()) == (fecha2.getMonth()+(fecha2.getDate()+1) )){
            // console.log("aqui 0 dias")
            this.diasRestantes = 0;
        }
        else{
            this.diasRestantes = (range.diff('days'));
            if(this.diasRestantes >= 0){
                this.diasRestantes = this.diasRestantes + 1;
            }
        }
    }
}