import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_API_URL') private baseUrl: string,
    @Inject("VERSION") private version: string
  ) { }
  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.version ? requestParameter.version : this.version}/${requestParameter.controller}${requestParameter.action ? "/" + requestParameter.action : ""}`;
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}${id ? "/" + id : ""}?${requestParameter.queryString ? requestParameter.queryString : ""}`;
    }
    return this.httpClient.get<T>(url, {headers: requestParameter.headers});
  }

  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if(requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}?${requestParameter.queryString ? requestParameter.queryString : ""}`;
    }
    return this.httpClient.post<T>(url, body, {headers: requestParameter.headers});
  }

  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if(requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}?${requestParameter.queryString ? requestParameter.queryString : ""}`;
    }
    return this.httpClient.put<T>(url, body, {headers: requestParameter.headers});
  }

  delete<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if(requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}?${requestParameter.queryString ? requestParameter.queryString : ""}`;
    }
    return this.httpClient.delete<T>(url, {headers: requestParameter.headers, body: body});
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  version?: string = "v1";
}
