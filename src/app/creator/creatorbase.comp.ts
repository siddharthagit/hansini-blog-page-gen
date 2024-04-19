import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { CreatorFSService } from "./service/creator.fsservice";
import { CreatorLSService } from "./service/creator.lsservice";
import { UploadService } from "./upload.service";

@Component({
    template: ''
})
export abstract class CreatorBaseComponent implements OnInit {
    DEBUG_INFO: string;

    public currentPageLSID;
    protected formDataChanged: boolean = false;
    protected formDataChangedDate: Date = new Date();
    protected sub: any;
   

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    constructor(protected sanitizer: DomSanitizer,
        protected blogService: CreatorLSService,
        protected blogFSService: CreatorFSService,
        protected router: Router,
        protected activeRouter: ActivatedRoute, protected fb: FormBuilder,
        protected uploadS: UploadService,
        protected elementRef: ElementRef) {

    }
}