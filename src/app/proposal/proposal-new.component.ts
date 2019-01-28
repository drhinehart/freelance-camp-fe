import { Component } from '@angular/core';
import { Proposal } from './proposal';
import { ProposalService } from './proposal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'proposal-new',
  templateUrl: './proposal-new.component.html',
  styleUrls: ['proposal-new.component.scss'],
  providers: [ProposalService]
})

export class ProposalNewComponent {
    proposal = new Proposal;
    submitted: boolean = false;

    constructor(
        private proposalService: ProposalService
    ){}

    createProposal(proposal) {
        this.submitted = true;
        this.proposalService.createProposal(proposal)
            .subscribe(
                data => {
                    return true;
             }, error => {
                    console.log("Error saving proposal");
                    return Observable.throw(error);
            });
    }
}

