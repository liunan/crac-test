import { Component, OnInit } from '@angular/core';

import { Question } from './question';

import { QuestionRepoA } from './repoA';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  
  questions = QuestionRepoA;
  commited:boolean;
  done:number;
  score:number;
  total:number;
  
  constructor() {
    this.commited = false;
    this.done = 0;
    this.score = 0;
    this.total = 30;

   }

  ngOnInit() {        
    while(this.filtered.length<this.total)
    {
      let idx =Math.floor(Math.random()*(this.questions.length+1));
      let item = this.questions[idx];
      item.A = item.C[0];//正确答案

      let newPos = Math.floor(Math.random()*4);//[0,1,2,3]
      item.C[0] = item.C[newPos];
      item.C[newPos] = item.A;

      //console.log(idx);
      this.filtered.push(this.questions[idx]);
    }
  }

  checkAnswer(answer:string,idx:number):void{
    if(this.filtered[idx].U == undefined)
      ++this.done;

    //console.log(`${idx}:${answer}`);
    this.filtered[idx].U = answer;  
  }

  commit():void{
    this.score=0;
    for(let item in this.filtered)
    {        
      if(this.filtered[item].A === this.filtered[item].U)
        ++this.score;
    }

    this.commited = true;

    
  }


  

  filtered:Question[]=[];
}
