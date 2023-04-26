import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, map } from "rxjs";

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
	fromObject: {
		action: 'opensearch',
		format: 'json',
		origin: '*',
	},
});

@Injectable()
export class JohNameService {
	constructor(private http: HttpClient) {}

	search(term: string) {
		if (term === '') {
			return of([]);
		}

		return this.http
			.get<[any, string[]]>(WIKI_URL, { params: PARAMS.set('search', term) })
			.pipe(map((response) => response[1]));
	}
}