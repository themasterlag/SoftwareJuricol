import { Pipe, PipeTransform } from '@angular/core';
import { isString } from 'util';



@Pipe({
  name: 'arrayFilter'
})

export class ArrayTextFilter implements PipeTransform {

  private filtersCount : number;

  private analizarFiltro(filterObject: Object){
    this.filtersCount = 0;
  
    for(var nombreAtr in filterObject){
      if(filterObject[nombreAtr] != ""){
        this.filtersCount++;
      }
    }
    
    return (this.filtersCount > 0);
  }

  transform(items: any[], filtros: Object): any[] {
 
    if(!items) return [];
    if(!filtros) return items;
   
    return items.filter( it => {
       let encontrado : boolean = false; 
       let filtroEvaluable : boolean = false;
       let filtrosCorrectos : number = 0;
      
      filtroEvaluable = this.analizarFiltro(filtros);

      for(var nombreAtr in filtros){
        it[nombreAtr] = it[nombreAtr]+"";

        if(filtroEvaluable){
          if(filtros[nombreAtr] != ""){
            if(it[nombreAtr].toLocaleLowerCase().includes(filtros[nombreAtr].toLocaleLowerCase())){
              filtrosCorrectos++;
            }
          }
        }
        else{
          filtrosCorrectos=0;
        }

      }
     
      return (filtrosCorrectos == this.filtersCount);
    });
   }
   
   
} 