import { Component, OnInit } from '@angular/core';
import { Document } from './document';
import { DocumentService } from './document.service';
import { Observable, of, timer } from 'rxjs';

@Component({
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers: [DocumentService]
})

export class DocumentsComponent implements OnInit {
    pageTitle: string = "Document Dashboard";
    documents: Document[];
    errorMessage: string;
    mode = "Observable";

    constructor(
        private documentService: DocumentService
    ){}

    ngOnInit() {
        let timer1 = timer(0, 5000);
        timer1.subscribe(() => this.getDocuments());
    }

    getDocuments() {
        this.documentService.getDocuments()
                            .subscribe(
                                documents => this.documents = documents,
                                error => this.errorMessage = <any>error
                            );
    }
}
