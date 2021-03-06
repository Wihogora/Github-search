import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Repository } from '../repository';


@Component({
  selector: 'app-gitform',
  templateUrl: './gitform.component.html',
  styleUrls: ['./gitform.component.css']
})
export class GitformComponent implements OnInit {

  username= new User("");
  repos=new Repository("",0,new Date(),"","");
  constructor(private http:HttpClient) { 
    this.repos=new Repository("",0,new Date(),"","");
    }
  Check(){
    interface ApiResponse{
      name:string;
      public_repos:number;
      created_at:Date;
      followers:string;
      html_url:string
    }
    this.http.get<ApiResponse>("https://api.github.com/users/"+
    this.username.username+"?access_token=cc2a8e007c02b44eef2871c2baa5af672ca47d33")
    .subscribe((data:any)=>{
      
      console.log(data);
      this.repos.name= data.name;
      this.repos.public_repos=data.public_repos;
      this.repos.created_at=data.created_at;
      this.repos.followers=data.followers;
      this.repos.html_url=data.html_url;
    });
    console.log(this.repos);
  }
  // console.log(this.username)


  ngOnInit() {
  }

}
