import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, SubjectType, SUBJECTS } from '../../models/subject.model';
import { SpacedRepetitionService } from '../../services/spaced-repetition.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subjects = SUBJECTS;
  targetExamDate: string = '';
  
  constructor(private spacedRepetitionService: SpacedRepetitionService) { }
  
  ngOnInit(): void {
    this.spacedRepetitionService.getUserProgress().subscribe(progress => {
      if (progress?.targetExamDate) {
        this.targetExamDate = progress.targetExamDate.toISOString().split('T')[0];
      } else {
        // Set default target date to September 13th, 2025
        const defaultDate = new Date('2025-09-13');
        this.targetExamDate = defaultDate.toISOString().split('T')[0];
      }
    });
  }
  
  updateTargetDate(): void {
    if (this.targetExamDate) {
      this.spacedRepetitionService.setTargetExamDate(new Date(this.targetExamDate));
    }
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
