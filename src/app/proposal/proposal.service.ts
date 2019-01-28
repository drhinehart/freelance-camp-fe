import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { Proposal } from './proposal';

@Injectable()
export class ProposalService {
    private proposalsUrl = 'http://localhost:3002/proposals';

    constructor(
        private http: Http
    ) {}

    public getProposals(): Observable<Proposal[]> {
        return this.http.get(this.proposalsUrl)
                        .pipe(map((response: Response) => <Proposal[]>response.json()), catchError(this.handleError));
    }

    public getProposal(id: number) {
      return this.http.get(this.proposalsUrl + "/" + id)

    }

    public createProposal(proposal) {
      let headers = new Headers({ 'content-type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.proposalsUrl, JSON.stringify(proposal), { headers: headers })
                      .pipe(map((response: Response) => response.json()));
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      }
}