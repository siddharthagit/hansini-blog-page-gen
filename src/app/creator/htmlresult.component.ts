import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CreatorService } from './creator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlogDetails, BlogParagraph } from './models';
import { AppConstants } from "../app.constants";
/**
 * HTML Structure
 * <div id="hansini">
 * <H1> Title
 * <div id="summary"> Introduction
 * <div id="toc"> Introduction
 *
 * <div id="mainImage"> Main Image
 * <div id="paragraphs">
 *   <h2>
 *   <h3>
 *   <description>
 *   <codeSample>
 *     <file>
 *     <pre><code>
 *   </codeSample>
 *   <list>
 *   <url>
 *   <sourcecoderef>
 *   <lis>
 *
 */
@Component({
  selector: 'blog-post',
  templateUrl: './htmlresult.component.html',
  styleUrls: ['./creator.css', './htmlresult.css']
})
export class HtmlResultComponent implements OnInit {
  DEBUG_INFO: string;
  blogDetails = new BlogDetails();
  public currentPageLSID;
  protected sub: any;
  public HTMLOUTPUT: String;
  //htmlLinkAnchors = new Map();
  htmlLinkAnchors : string[];
  public JSONOUTPUT : String;

  constructor(protected sanitizer: DomSanitizer,
    protected blogService: CreatorService,
    protected router: Router,
    protected activeRouter: ActivatedRoute, protected fb: FormBuilder) {
      this.htmlLinkAnchors = [];
  }

  ngOnInit() {
    this.sub = this.activeRouter.queryParams.subscribe(params => {
      this.currentPageLSID = params['lsid'];
      console.log('route parameter lsid = ' + this.currentPageLSID);
      if (this.currentPageLSID != undefined && this.currentPageLSID != null) {
        console.log('load from LS or Server lsid = ' + this.currentPageLSID);
        let localBlogDetails = this.blogService.findObjectByIDFromLS(this.currentPageLSID);
        if (localBlogDetails != null) {
          console.log('load object from LS =  ' + JSON.stringify(localBlogDetails));
          this.blogDetails = this.blogDetails.decodeBlog(localBlogDetails);

          this.JSONOUTPUT = JSON.stringify(localBlogDetails);
        }
        else {
          console.log("not found in LS");
        }

        // console.clear();
        let paragraphHTML = this.encodeParagraphs(this.blogDetails);
        console.log("Starting HTML Output");
        this.HTMLOUTPUT = "<div id='hansini'><input id='lsid' type='hidden' value='" + this.blogDetails.lsid + "'> "
        + this.buildTOC()
        + this.encodeWholeHTML(this.blogDetails)
        + paragraphHTML
        +  "</div>";
        console.log("Ending HTML Output");
      }
    });
  }

  private encodeParagraphs(blog: BlogDetails) {
    let counter = 1;
    let HTMLOUTPUT = "";
    this.blogDetails.paragraphs.forEach(para => {
      HTMLOUTPUT += this.encodeParagraph(para, counter);
      counter++;
    })
    return HTMLOUTPUT;
  }

  private encodeParagraph(para: BlogParagraph, counter: number) {
    if (para.type == 'H1') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      return "<h1 id='" + dynaId + "'>" + para.heading + "</h1>";
    }
    if (para.type == 'H2') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      return "<h2 id='" + dynaId + "'>" + para.heading + "</h2>";
    }
    if (para.type == 'H3') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      return "<h2 id='" + dynaId + "'>" + para.heading + "</h3>";
    }
    if (para.type == 'COD') {
      return this.processCodeTypeParagraph(para);
    }
    if (para.type == 'TXT') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      let ret = "<h3 id='" + dynaId + "'>" + para.heading + "</h3>";
      return ret + "<div class='txt_desc'>" + para.content + "</div>";
    }
    if (para.type == 'LIS') {
      return this.processLISTypeParagraph(counter, para);
    }
    if (para.type == 'GIT') {
      //for GIT type heading contains the github URL
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      let container =   "<div class='sourcecoderef' id='" + dynaId + "'>"
                      +     "<div class=\"filename\"><span class='title'>Download Sourcecode<span>"
                      +       "<a class='btn float-sm-right copyBtn' href='"+para.heading+"' target='_blank'>Repo</a>"
                      +     "</div>";

      let taskArr = para.content.split(/(\r\n|\n|\r)/gm);
      console.log("tasklist splitted " + taskArr.length);
      let body = "";
      for (let i = 0; i < taskArr.length; i++) {
        if ( taskArr[i].length>1 && taskArr[i]!=' ') {
          body = body + "<li class='list-unstyled' >" + taskArr[i] + "</li>";
        }
      }
      return container + "<div class='github'><ul>" + body + "</ul></div></div>";
    }
    else return "";
  }

  /**
   * Returns <tasklistref><header>title</header><tasks><ul>
   * @param counter
   * @param para
   */
  private processLISTypeParagraph(counter: number, para: BlogParagraph) {
    let dynaId = this.buildDynamicHTMLID(counter, para.type);
    this.buildAndStoreLink(para);
    let taskArr = para.content.split(/(\r\n|\n|\r)/gm);
    console.log("tasklist splitted size" + taskArr.length);
    let list = "";
    for (let i = 0; i < taskArr.length; i++) {
      if ( taskArr[i].length>1 && taskArr[i]!=' ') {
        list = list + "<li>" + taskArr[i] + "</li>";
      }
    }
    let ret =   "<div class=\"tasklistblock\" id='" + dynaId + "'>"
              +     "<div class=\"header\"><span class='title'>" + para.heading + "</span></div>"
              +     "<div class='bodyblock'>"
              +         "<ul>"
              +            list
              +         "</ul>"
              +      "</div>"
              +  "</div>"
    console.log("tasklist HTML " + ret);
    return ret ;
  }

  private buildAndStoreLink(para: BlogParagraph) {
    console.warn("adding a new link " + para.heading);
    let link = '<a href="' + para.heading + '">' + para.heading + '</a>';
    //this.htmlLinkAnchors.set(para.heading, link);
    this.htmlLinkAnchors.push(link);
    console.warn("this.htmlLinkAnchors size = " + this.htmlLinkAnchors.length);
  }

  private buildDynamicHTMLID(counter: number, elementType: string) {
    return counter + "_" + elementType;
  }

  private encodeWholeHTML(blog: BlogDetails) {
    let dynaId = "mainheading_h2";
    let link = '<a href="#' + dynaId + '">' + blog.name + '</a>';
    //this.htmlLinkAnchors.set(blog.name, link);
    this.htmlLinkAnchors.push(link);
    let heading = "<h2 classs='ss' id='a'>" + blog.name + "</h2>";
    let summary = "<div class='summary'>" + blog.summary + "</div>";
    return  heading + summary;
  }

  private buildTOC() {
    console.log("build TOC with link size = " + this.htmlLinkAnchors.length);
    let ul = "<div id='toc' class='toc'><h2>Table of Content</h2><ul class=\"toc_list\">";
    let li = "";

    /*
    this.htmlLinkAnchors.forEach((value: string, key: string) => {
      li = li + "<li>" + value + "</li>";
    });
    */

    this.htmlLinkAnchors.forEach(function (value) {
      console.log(value);
      li = li + "<li>" + value + "</li>";
    });

    ul = ul + li + "</ul></div>";


    return ul;
  }

  /**
   * Returns <CodeFragment><fileName><pre><code>
   * @param code
   */
  private processCodeTypeParagraph(code: BlogParagraph) {
    let codePrefix = '<div class="codeFragment"><div class="filename">'
                     + '<button class="btn float-sm-right copyBtn">Copy</button>'
                     + '<span class="title">' + code.heading + "</span>"
                     + '</div>'
                     + '<div class="w8-100"><pre class="prettyprint w8-100">'
                     + '<code class="language-' + code.meta['codeLang'] + '">';
    let codeSuffix = '</code></pre></div></div>';
    return codePrefix + this.encodeCode(code.content) + codeSuffix;
  }

  private encodeCode(code: String) {
    code = this.encode_entities(code);
    console.log("C= " + code);
    return code;
  }

  private encode_entities(str) {
    var rv = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i); rv += this.char2entity[ch] || ch;
    } return rv;
  }

  private char2entity = { "'": '&#39;', '"': '&quot;', '<': '&lt;', '>': '&gt;', '&#038;': '&amp;' };

}


