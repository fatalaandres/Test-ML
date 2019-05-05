import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MlService } from '../../services/ml.services';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: []
})
export class SingleComponent implements OnInit {

  err:boolean;
  isLoading = true;
  single:any;
  img:any;
  categories:any;
  breadcrumb=[];
  constructor(private activatedRoute:ActivatedRoute, private ml:MlService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
      if (params['id']){
      var id:string = params['id'];
      this.ml.getItem(id)
      .subscribe( (data:any) => {
        this.isLoading=false;
        if(data.error){
          this.err=true;
        }else{
          this.single = data;
          this.img = data.pictures[0].secure_url;
          this.categories = data.category_ml.path_from_root;
          for (let c of this.categories) {
            this.breadcrumb.push(c.name);
          }
          // console.log(this.single);
        }
      })
    }
      
    })
    

  }

}
