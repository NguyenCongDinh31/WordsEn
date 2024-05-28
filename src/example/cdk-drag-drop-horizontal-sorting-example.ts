import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/**
 * @title Drag&Drop horizontal sorting
 */
@Component({
  selector: 'cdk-drag-drop-horizontal-sorting-example',
  templateUrl: 'cdk-drag-drop-horizontal-sorting-example.html',
  styleUrl: 'cdk-drag-drop-horizontal-sorting-example.css',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
})
export class CdkDragDropHorizontalSortingExample {
  apiKey = 'WBBcwnwQpV89';
  lang = 'en';
  msgCheck = '';
  synth = window.speechSynthesis;
  utterThis = new SpeechSynthesisUtterance('');
  isShowAnswer = false;

  constructor(private http: HttpClient) {}
  originWords = {
    en: '',
    vi: '',
  };
  enExample: string[] = [];
  vnExample: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.enExample, event.previousIndex, event.currentIndex);
  }

  loadData(enWordsEl: any, enWordsVi: any) {
    this.originWords.en = enWordsEl.value.trim();
    this.originWords.vi = enWordsVi.value.trim();
    enWordsEl.value = '';
    enWordsVi.value = '';

    this.enExample = this.originWords.en.split(' ');
    this.vnExample = this.originWords.vi.split(' ');
    this.shuffle(this.enExample);
    this.isShowAnswer = false;
  }

  shuffle(array: string[]) {
    array.sort(() => Math.random() - 0.5);
  }

  checkResult() {
    const tempOriginEn = this.originWords.en.split(' ');
    if (JSON.stringify(tempOriginEn) === JSON.stringify(this.enExample)) {
      this.msgCheck = 'Đúng!!';
    } else {
      this.msgCheck = 'Sai!!';
    }
  }

  speakText() {
    this.synth.cancel();
    this.utterThis.text = this.originWords.en;
    this.utterThis.rate = 0.5;
    this.synth.speak(this.utterThis);
  }

  showAnswer() {
    this.isShowAnswer = true;
  }

  doAgain() {
    this.shuffle(this.enExample);
    this.isShowAnswer = false;
    this.msgCheck = '';
  }
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
