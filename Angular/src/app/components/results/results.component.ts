import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MlService } from '../../services/ml.services';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: []
})
export class ResultsComponent implements OnInit {

  sub:any;
  items:any;
  filters:any;
  breadcrumb=[];
  msj=false;
  isLoading = true;

  constructor( private activatedRoute:ActivatedRoute, private ml:MlService, private router: Router) { }

  ngOnInit() {


    this.sub = this.activatedRoute.queryParamMap
    .subscribe(params => {
      if (params.get('search')){
        var s:string = params.get('search');
        // console.log(s);
        this.ml.getQuery(s)
        .subscribe( (data:any) => {
          this.isLoading = false;
          this.items = data.results;
          this.filters = data.filters;
          for (let f of this.filters) {
            if(f.id == 'category'){
              for (let c of f.values[0].path_from_root) {
                this.breadcrumb.push(c.name)
              }
            }else{
              this.breadcrumb.push(f.values[0].name)
            }
          }
          // console.log(this.breadcrumb)
          // console.log(this.filters)
          // console.log(this.items);
          // console.log(data);
        },
        (err) => {
          console.log('error');  
        })
      }else{
        this.isLoading = false;
        this.msj = true;
      }
          
    });
  }

  

}
