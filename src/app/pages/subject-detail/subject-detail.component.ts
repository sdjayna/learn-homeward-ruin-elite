import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, SubjectType, SUBJECTS, Topic } from '../../models/subject.model';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  subject: Subject | undefined;
  selectedTopic: Topic | null = null;
  topicQuestions: Question[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const subjectType = params.get('type');
      if (subjectType) {
        this.subject = SUBJECTS.find(s => s.type === subjectType);
        this.selectedTopic = null;
        this.topicQuestions = [];
      }
    });
  }
  
  selectTopic(topic: Topic): void {
    this.selectedTopic = topic;
    this.loadTopicQuestions(topic.id);
  }
  
  loadTopicQuestions(topicId: string): void {
    this.questionService.getQuestionsByTopic(topicId).subscribe(questions => {
      this.topicQuestions = questions;
    });
  }
  
  getSubjectIcon(type: SubjectType): string {
    switch (type) {
      case SubjectType.Mathematics:
        return '➗';
      case SubjectType.English:
        return '📝';
      case SubjectType.VerbalReasoning:
        return '🔤';
      case SubjectType.NonVerbalReasoning:
        return '🧩';
      default:
        return '📚';
    }
  }
}
