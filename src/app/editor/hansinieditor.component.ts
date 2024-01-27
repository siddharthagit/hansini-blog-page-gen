import { AfterViewInit, Component, ElementRef, HostListener, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogContent, BlogImageFile, BlogPara, CodeContent, ImageContent, LineContent, ListContent, TextContent, VideoContent } from './models';
import { HansiniMockService } from './hansinimock.service';
import 'prismjs';
import { PopOverAct } from './models';
import { CreatorService } from '../creator/creator.service';
import { ActivatedRoute } from '@angular/router';
import { EditorAppConstants } from '../app.constants';


@Component({
    selector: 'hansini-editor',
    templateUrl: './hansinieditor.component.html',
    styleUrls: ['./hansinieditor.css']
})

/**
 * 
 * Enter => create new line next to current
 * Shift + Enter = > insert <BR>
 */
export class HansiniEditor implements OnInit, OnChanges, AfterViewInit  {

    blogcontent: BlogContent = new BlogContent();
    openLineExists: boolean = false;
    currentSelectedLine: number = -1;
    clickedPopover: number = -1;
    clickedActionbar: number = -1;

    //for holding listType object values
    listTypeObject: string = "";

    testDummyString: string = "sidd is back <b>HO OH</b>";

    selMenutext: string = "";
    sel: Selection = window.getSelection();
    selRange: Range;
    selContent: string;

    Prism: any;

    currentActionLine: number = -1;

    javaCode: string = "";
    javaCode2: string = `public class JakartaRestfulApp extends Application {
        private final <Set> classes;
    
        public JakartaRestfulApp() {
            HashSet> c = new HashSet>();
            c.add(MenuResource.class);
            classes = Collections.unmodifiableSet(c);
        }
    
        @Override
        public <Set> getClasses() {
            return classes;
        }
    }`;

    //localStoreName:string = "";
    protected sub: any;
    public currentPageLSID;

    @ViewChildren('hansiniBlogFields') hansiniBlogFields: QueryList<ElementRef>
    
    constructor(protected sanitizer: DomSanitizer, mockService: HansiniMockService, protected localService:CreatorService,
        protected activeRouter: ActivatedRoute) {
        //this.blogcontent = service.populateWithTestData();
        let para1 = new BlogPara("", "text");
        let dc: TextContent = new TextContent();
        dc.data = "this is test  <b> bold</b>"
        para1.content = dc
        this.blogcontent.para.push(para1);

    }

    ngAfterContentInit 
    ngAfterViewInit(): void {
        console.log("ngAfterViewInit");

        
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.sub = this.activeRouter.queryParams.subscribe(params => {
            this.currentPageLSID = params['lsid'];
            console.log('route parameter lsid = ' + this.currentPageLSID);
            if (this.currentPageLSID != undefined && this.currentPageLSID != null) {
              console.log('load from LS or Server lsid = ' + this.currentPageLSID);
              let localBlogDetails = this.localService.findObjectByIDFromLS(this.currentPageLSID);
              if (localBlogDetails != null) {
                console.log('load object from LS =  ' + JSON.stringify(localBlogDetails));
                this.blogcontent = this.decodeBlogContent(localBlogDetails);
                console.log(JSON.stringify(this.blogcontent))
              }
              else {
                console.log("not found in LS");
              }
            }
            else {
                this.currentPageLSID = this.localService.createPageId();
            }
          });
        console.log("ngOnChanges" + this.hansiniBlogFields.toArray());
    }


    ngOnInit(): void {
       
        console.log("ngOnInit");
        //load and call Prism  
        //this.Prism.highlightAll();
    }


    saveConentLS() {
        this.blogcontent.id = this.currentPageLSID;
        this.localService.addOrUpdateObjectWithKeyToLS(EditorAppConstants.localStoreEditName,  this.currentPageLSID, this.blogcontent);
    }

    decodeBlogContent(json: Object): BlogContent {
        let user = Object.create(BlogContent.prototype);
        return Object.assign(user, json, {
        });
    }

    resetPointer() {
        //this.currentSelectedLine = -1;
        this.clickedPopover = -1;
        this.clickedActionbar = -1;
    }

    addLine(linetyep: string = "text") {
        console.log("addLine " + linetyep + " this.currentSelectedLine =" + this.currentSelectedLine);
        if (this.openLineExists) {
            console.log("open line exist returning")
            //return;
        }
        //this.blogcontent.para.push(new BlogPara(this.createlineId(), linetyep));

        //insert at the next index
        this.blogcontent.para.splice(this.currentSelectedLine + 1, 0, new BlogPara(this.createlineId(), linetyep))

        this.openLineExists = true;
        //console.log(this.openLineExists);
        this.focusNewItem(linetyep);
        this.resetPointer();

        this.saveConentLS();
    }


    actPopover(index: number) {
        this.resetPointer();
        this.clickedPopover = index;
        console.log("ss" + index);
    }

    actPopoverActionbar(index: number) {
        this.resetPointer();
        this.clickedActionbar = index;
        console.log("ss" + index);
    }

    showPopover(index: number) {
        let ret = index == this.clickedPopover;
        return ret;
    }

    showPopoverActionbar(index: number) {
        let ret = index == this.clickedActionbar;
        return ret;
    }

    createTypeItem(event: any) {
        //     console.log(event);
        this.addLine(event);
    }

    actionOnItem(event: PopOverAct) {
        //     console.log(event);
        console.log("actionOnItem" + JSON.stringify(event));
        if (event.act == "up") {
            this.takeUp(event.line);
        }
        else if (event.act == "down") {
            this.takeDown(event.line);
        }
        else if (event.act == "del") {
            this.deletePara(event.line);
        }
    }

    takeUp(current: number) {
        console.log("takeUp" + current);
        if (current > 0) {
          let topParagraph = this.blogcontent.para[current - 1];
          this.blogcontent.para[current - 1] = this.blogcontent.para[current];
          this.blogcontent.para[current] = topParagraph;
        }
      }
    
      takeDown(current: number) {
        console.log("takeDown" + current);
        if (current > 0 && current < this.blogcontent.para.length) {
          let topParagraph = this.blogcontent.para[current +  1];
          this.blogcontent.para[current + 1] = this.blogcontent.para[current];
          this.blogcontent.para[current] = topParagraph;
        }
      }
    
      deletePara(order: number) {
        console.log("delete item order = " + order);
        this.blogcontent.para.splice(order, 1);
      }
    //for actionpopup
    getCurrentParaType() {
        return this.currentSelectedLine > -1 ? this.blogcontent.para[this.currentSelectedLine].type : "un";
    }
    getTotalPara() {
        return this.blogcontent.para.length;
    }


    extactYoutubeVideo(inUrl: string) {
        var video_id = ""; //bzSTpdcs-EI
        console.log("extractVideo inUrl = " + inUrl);
        if (inUrl != null) {
          if (inUrl.indexOf("v=") > -1) {
            video_id = inUrl.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if (ampersandPosition != -1) {
              video_id = video_id.substring(0, ampersandPosition);
            }
          }
        }
      
        video_id = "https://www.youtube.com/embed/" + video_id;
        console.log("extractVideo : video_id= " + video_id);
        return video_id;
    }

    showYoutubeVideo(inUrl: string) {
        console.log("showYoutubeVideo  = " + inUrl);
        inUrl = this.extactYoutubeVideo(inUrl);
        return this.sanitizer.bypassSecurityTrustResourceUrl(inUrl)
    }


    //Keyboard handing
    /*@HostListener('document:keyup', ['$event'])
    handleDeleteKeyboardEvent(event: KeyboardEvent) {
        console.log(event);
        if(event.key === 'Delete')
        {
          // remove something... or call remove funtion this.remove();
          
        }
      }
    */

    
    @HostListener('window:mouseup', ['$event'])
    handleMouseEvent(event: Event) {
        console.log("mouse");
        console.log(event);
        if (event.type == "mouseup") {

            //close all open popovers....
            var menu1: any = document.querySelector(".selMenu");
            var menu2: any = document.querySelector(".langMenu");
            menu1.style.visibility = "hidden";
            menu2.style.visibility = "hidden";


            let pp: any = event
            console.log(pp.target.id);
            if ( pp.target.id == "lang-code-dd" || pp.target.id == "lang-code") {
               
            }

            if (this.currentSelectedLine == -1) return;

            let para: BlogPara = this.blogcontent.para[this.currentSelectedLine]
            console.log(this.currentSelectedLine)
            console.log(para);
            if (para.type == "code") return;

            let sel: Selection = window.getSelection();
            console.log(sel)
            let range: Range = sel.getRangeAt(0);
            console.log(range.toString());
            //selMenu treatment
            if (range.toString() != "") {
                var menu: any = document.querySelector(".selMenu");
                let rect = range.getBoundingClientRect();
                menu.style.display = "block";
                menu.style.visibility = "visible";
                menu.style.left = Math.round(rect.left) + "px";
                menu.style.top = Math.round(rect.top) - 58 + "px";
            }
        }
    }
    /**
     * Shift + Enter => inject new line 
     * Enter => exit from the block and insert new block
     * @param event 
     * @returns 
     */
    @HostListener('document:keyup', ['$event'])
    handleEnterKeyboardEvent(event: KeyboardEvent) {
        console.log(event);
        let pp: any = event
        console.log(pp.target.id);
        //window.document.execCommand('insertHTML', false, "\n");

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation()
        if (event.key === 'Enter' && event.shiftKey == true) {
            console.log("handle shift enter");
            let para: BlogPara = this.blogcontent.para[this.currentSelectedLine]
            //if text type 
            if (para.type == "text") {
                let content: TextContent = para.content as (TextContent);
                console.log(para.content);
                //content.data = content.data + "<br>";
                var selection = window.getSelection();
                console.log(selection);
                let currrange: Range = selection.getRangeAt(0);
                console.log(currrange);
                console.log(currrange.toString());

                br = document.createElement("br");
                currrange.deleteContents();
                var br = document.createElement("br");
                currrange.insertNode(br);
            }
        }

        else if (event.key === 'Enter') {
            //list
            const target = event.target as HTMLInputElement;
            //console.log(target.className);
            if ((target.classList.contains("ha-list"))) {
                console.log("handle list");
                console.log("inside list >" + this.listTypeObject + "<");
                this.listTypeObject.trim()
                this.listTypeObject = this.listTypeObject.replace("br", "");
                this.listTypeObject = this.listTypeObject.replace("div", "");
                let itemArr: Array<string> = this.listTypeObject.split("\n");
                let listContent: any = this.blogcontent.para[this.currentSelectedLine].content
                listContent.li = [];
                itemArr.forEach(i => {
                    console.log("inside list " + i);
                    if (i.trim())
                        listContent.li.push(i.trim());
                })

                //add a new li
                listContent.li.push(" ");
                this.listTypeObject = "";

            }
            else {
                console.log("handle others");
                this.addLine();
            }
            //return;
        }
        return false;
    }

    public createlineId(): string {
        var randomNumberBetween1000and2000 = 1000 + Math.floor(Math.random() * 1000);
        return randomNumberBetween1000and2000 + "";
    }

    onFileChangedLS(event: Event, contentholder: BlogImageFile) {
        console.log("onFileChanged event" + JSON.stringify(event.currentTarget));
        const target = event.target as HTMLInputElement;

        if (target.files && target.files.length > 0) {

            let reader = new FileReader();
            let file: File = target.files[0];

            contentholder.name = file.name;
            contentholder.type = file.type;


            console.log("onFileChanged file " + JSON.stringify(file));
            reader.readAsDataURL(file);
            reader.onload = () => {
                let fileMeta = { name: file.name, type: file.text };
                // console.log("done" + JSON.stringify(reader.result));
                let filePreview = reader.result;//'data:image/png' + ';base64,' + reader.result.slice(',')[1];
                //let filepath:string = "bp" + Date.now();
                contentholder.url = (reader.result as string);
            };
        }
    }


    ////Utility Methods
    sanitize(val: string | null) {
        //console.log("sanitize " + JSON.stringify(val));
        if (val != null) {
            return this.sanitizer.bypassSecurityTrustUrl(val);
        }
        return "";
    }

    debug() {
        console.log(this.hansiniBlogFields.toArray());
        let paraSize = this.blogcontent.para.length - 1;
        console.log(paraSize);
        this.hansiniBlogFields.last.nativeElement.focus();
        document.getElementById("ha_item_" + paraSize).focus();
    }

    focusNewItem(type: string) {
        console.log("focusNewItem " + type);
        setTimeout(() => {
            let paraSize = this.blogcontent.para.length - 1;
            let fieldId: string = "ha_item_";
            if (type == "text") {
                fieldId = "ha_item_p_"
            }
            console.log("fieldId = " + fieldId + paraSize);
            let currentElem: HTMLElement = document.getElementById(fieldId + paraSize);
            currentElem.contentEditable = "true";
            currentElem.focus();
        }, 500);
    }

    handleHaInputBlur() {

    }

    isFieldEditable(selIndex: number) {
        //console.log(selIndex + "  " +this.currentSelectedLine);
        return selIndex == this.currentSelectedLine;
    }

    //pure js


    //Selmenu Related
    selMenuAction(act: string) {
        if (act == "bold") {
            let sel: Selection = window.getSelection();
            let range: Range = sel.getRangeAt(0);
            console.log(range.toString());
            let selContent: string = range.toString();
            range.deleteContents();

            var el = document.createElement("b");
            el.classList.add("ha-display-bold")
            el.innerHTML = selContent;
            range.insertNode(el);
        }
        else if (act == "italic") {
            let sel: Selection = window.getSelection();
            let range: Range = sel.getRangeAt(0);
            console.log(range);
            let selContent: string = range.toString();
            range.deleteContents();

            var el = document.createElement("i");
            el.classList.add("ha-display-italic")
            el.innerHTML = selContent;
            range.insertNode(el);

        }
        else if (act == "url") {
            var menu: any = document.querySelector(".selMenu-linkinput");
            menu.style.display = "block";
            menu.style.visibility = "visible";

            this.sel = window.getSelection();
            this.selRange = this.sel.getRangeAt(0);
            this.selContent = this.selRange.toString();
        }
        else if (act == "urlsubmit") {
            this.selRange.deleteContents();
            console.log(this.selRange);
            console.log(this.selContent);
            var eurl = document.createElement("a");
            eurl.setAttribute('href', this.selMenutext);
            var urlText = document.createTextNode(this.selContent);
            eurl.classList.add("ha-display-url")
            eurl.appendChild(urlText);
            this.selRange.insertNode(eurl);
        }

    }


    /** Lang Menu Action */
    selLangMenuAction (lang:string) {
        console.log("selLangMenuAction" + lang);
        console.log("selLangMenuAction this.currentActionLine" + this.currentActionLine);
        let type: any = this.blogcontent.para[this.currentActionLine].type
        if (type == "code") {
            let content: any = this.blogcontent.para[this.currentActionLine].content;
            (content as CodeContent ).lang = lang;
        }
    }

    showLangPopup (id:number, event:any) {
        console.log("lang popup show" + id);
        var menu: any = document.querySelector(".langMenu");
        menu.style.display = "block";
        menu.style.visibility = "visible";
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY - 58 + "px";

        this.currentActionLine = id;
        return;
    }

    showVideoEdit(content:VideoContent) {
        console.log(JSON.stringify(content.url));
        let ret:boolean = true;
        if (content==null || content.url =="" ||  content.url ==undefined) 
            ret = true;

        console.log(ret);
        return ret;
    }

    showVideoContent(content:VideoContent) {
        console.log(JSON.stringify(content.url));
        let ret:boolean = false;
        if (content.url) 
            ret = true;

        console.log(ret);
        return ret;
    }

    

    saveVideoCap () {

    }

    editVideoURL () {

    }

   
}


