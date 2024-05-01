import { Component} from '@angular/core';
import { BlogWebpageView } from './models';
import { ArticlePara, CodeContent, ConsoleContent, DisplayMe, GitContent, H1Content, H2Content, ImageContent, ListContent, QouteContent, ShortCodeContent, TextContent, UrlContent, VideoContent } from '../editor/models';
import { CreatorBaseComponent } from './creatorbase.comp';
import { AppConstants } from '../app.constants';
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
export class HtmlResultComponent extends CreatorBaseComponent {
  blogDetails = new BlogWebpageView();
  public HTMLOUTPUT: String;
  //htmlLinkAnchors = new Map();
  htmlLinkAnchors : string[] = [];
  public JSONOUTPUT : String;
  frompage: string = "";
  includeTOC:boolean=false;

  override ngOnInit() {
    this.sub = this.activeRouter.queryParams.subscribe(params => {
      this.currentPageLSID = params['lsid'];
      this.frompage = params['frompage'];
      console.log('route parameter frompage = ' + this.frompage);
      if (this.frompage == undefined) 
        this.frompage = "creator";
      console.log('route parameter lsid = ' + this.currentPageLSID);
      if (this.currentPageLSID != undefined && this.currentPageLSID != null) {
        console.log('load from LS or Server lsid = ' + this.currentPageLSID);
        let localBlogDetails = this.blogService.getObjectByID(AppConstants.TYPE_BLOGSTORY_OBJECT,this.currentPageLSID);
        if (localBlogDetails != null) {
          //console.log('load object from LS =  ' + JSON.stringify(localBlogDetails));
          this.blogDetails = this.blogDetails.decodeBlog(localBlogDetails);
          this.JSONOUTPUT = JSON.stringify(localBlogDetails);
        }
        else {
          console.log("not found in LS");
        }

        
      }
    });
  }

  private encodeArticlePara(paras: DisplayMe[]) {
   // console.log("siddx" + JSON.stringify(paras))
    let counter = 1;
    let HTMLOUTPUT = "";
    paras.forEach(para => {
      HTMLOUTPUT += this.encodeArticleParaType(para as ArticlePara, counter);
      counter++;
    })
    return HTMLOUTPUT;
  }

  private encodeArticleParaType(para: ArticlePara, counter: number) {
    if (para.type == 'h1') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      return "<h1 id='" + dynaId + "'>" + (para.content as H1Content).data + "</h1>";
    }
    if (para.type == 'h2') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      return "<h2 id='" + dynaId + "'>" + (para.content as H2Content).data + "</h2>";
    }
    if (para.type == 'h3') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      return "<h3 id='" + dynaId + "'>" + (para.content as H1Content).data + "</h3>";
    }
    if (para.type == 'txt') {
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      //this.buildAndStoreLink(para);
      //let ret = "<h3 id='" + dynaId + "'>" + para.heading + "</h3>";
      return "<div class='post-text'>" + (para.content as TextContent).data + "</div>";
    }
    if (para.type == 'img') {
      let paragraph: ImageContent = para.content as ImageContent;
      return '<figure class="figure">'
      +'<img src="' + paragraph.url +'" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">'
      + '<figcaption class="figure-caption">' + paragraph.caption + '</figcaption>'
      + '</figure>';
    }
    if (para.type == 'vid') {
      return this.processVIDTypeParagraph(counter, para);
    }
    if (para.type == 'url') {
      let urlCont: UrlContent =  para.content as unknown as UrlContent
      return this.processURLTypeParagraph(urlCont);
    }
    if (para.type == 'lis') {
      return this.processLISTypeParagraph(counter, para);
    }
    if (para.type == 'quo') {
      return this.processQUOTypeParagraph(counter, para);
    }
    if (para.type == 'sec') {
      return this.processSectionParagraph();
    }
    if (para.type == 'cod') {
      return this.processCodeTypeParagraph(para);
    }
    if (para.type == 'ssc') {
      return this.processSSCTypeParagraph(para);
    }
    if (para.type == 'con') {
      return this.processConsoleTypeParagraph(para);
    }
    if (para.type == 'git') {
      //for GIT type heading contains the github URL
      let dynaId = this.buildDynamicHTMLID(counter, para.type);
      this.buildAndStoreLink(para);
      let container =   "<div class='sourceFragment' id='" + dynaId + "'>"
                      +     "<div class=\"headerblock\"><span class='title'>Download Sourcecode<span>"
                      +       "<a class='btn float-sm-right copyBtn' href='" + (para as unknown as GitContent).title + "' target='_blank'>Repo</a>"
                      +     "</div>";

      return container + "<div class='bodyblock'><div class='github'><ul>" + (para as unknown as GitContent).url + "</ul></div></div></div>";
    }
    
    else return "";
  }

  private processSectionParagraph() {
    return '<div class="sectionfragment">'+'</div>'
  }

  private processVIDTypeParagraph(counter: number, para: ArticlePara) {
    let cc: VideoContent = para.content as VideoContent;
    let cx = 
    '<div class="post-text">'
       + cc.title
    + '</div>'
    + '<div class="row">'
        + '<iframe width="460" height="445" [src]="showYoutubeVideo(paragraph.content.url)" frameborder="0" allowfullscreen>'
        + '</iframe>'
    + '</div>'
    + '<div class="row">'
    
    + '</div>'

    return cx;
  }

  private processQUOTypeParagraph(counter: number, para: ArticlePara) {
    let cc: QouteContent = para.content as QouteContent;

    let cx ='<div class="qoufragment">'
                    +'<blockquote class="blockquote">'
                    + cc.data
                    + '</blockquote>'
                    +'</div>';

    return cx;
  }

  processURLTypeParagraph(urlCont: UrlContent) {
    console.log("processURLTypeParagraph" + JSON.stringify(urlCont));
    return "<div class='urlfragment'>"
              + "<div class='headerblock'>"
                + "<span class='title'> <a href='" + urlCont.url + "'>"+urlCont.title+"</a></span>"
              + "</div>" 
              + "<div class='bodyblock'>"
                  + "<div class='post-text'>" + urlCont.data  + "</div>"
              + "</div>"
            + "</div>";
  }

  /**
   * Returns <tasklistref><header>title</header><tasks><ul>
   * @param counter
   * @param para
   */
  private processLISTypeParagraph(counter: number, para: ArticlePara) {
    let dynaId = this.buildDynamicHTMLID(counter, para.type);
    this.buildAndStoreLink(para);
    let taskArr = (para.content as unknown as ListContent).li;
    //console.log("tasklist splitted size" + JSON.stringify(para));
    let list = "";
    for (let i = 0; i < taskArr.length; i++) {
      if ( taskArr[i].length>1 && taskArr[i]!=' ') {
        list = list + "<li>" + taskArr[i] + "</li>";
      }
    }
    let ret =   "<div class=\"lisfragment\" id='" + dynaId + "'>"
              +     "<div class=\"headerblock\"><span class='title'></span></div>"
              +     "<div class='bodyblock'>"
              +         "<ul>"
              +            list
              +         "</ul>"
              +      "</div>"
              +  "</div>"
    console.log("tasklist HTML " + ret);
    return ret ;
  }

  private buildAndStoreLink(para: ArticlePara) {
    console.warn("adding a new link " + para.type);
    let link = '<a href="' + para.id + '">' + para.content['data'] + '</a>';
    //this.htmlLinkAnchors.set(para.heading, link);
    this.htmlLinkAnchors.push(link);
    console.warn("this.htmlLinkAnchors size = " + this.htmlLinkAnchors.length);
  }

  private buildDynamicHTMLID(counter: number, elementType: string) {
    return counter + "_" + elementType;
  }

  private encodeWholeHTML(blog: BlogWebpageView) {
    let dynaId = "mainheading_h2";
    let link = '<a href="#' + dynaId + '">' + blog.name + '</a>';
    //this.htmlLinkAnchors.set(blog.name, link);
    this.htmlLinkAnchors.push(link);
    let heading = "<h2 classs='title' id='a'>" + blog.name + "</h2>";
    let summary = "<div class='summary'>" + blog.pre.summ + "</div>";
    return  heading + summary;
  }

  private buildTOC() {
    if (!this.includeTOC) return "";
    console.log("build TOC with link size = " + this.htmlLinkAnchors.length);
    let ul = "<div id='toc' class='toc'><div class='headerblock'><h2>Table of Content</h2></div><div class='bodyblock'><ul>";
    let li = "";
    this.htmlLinkAnchors.forEach(function (value) {
      console.log(value);
      li = li + "<li>" + value + "</li>";
    });
    ul = ul + li + "</ul></div></div>";
    return ul;
  }

  /**
   * Returns <CodeFragment><fileName><pre><code>
   * @param code
   */
  private processCodeTypeParagraph(code: ArticlePara) {
    let cc: CodeContent = code.content as CodeContent;
    let codePrefix = '<div class="codeFragment"><div class="header><div class="filename">'
                    // + '<button class="btn float-sm-right copyBtn">Copy</button>'
                     + '</div></div>'
                     + '<div class="body">'
                     + cc.data
                     + '</body>'
                     + '<div class="w8-100"><pre class="prettyprint w8-100">'
                     + '<code class="language-' + cc.lang + '">';
    let codeSuffix = '</code></pre></div></div>';
    return codePrefix + this.encodeCode(cc.data) + codeSuffix;
  }

   /**
   * Returns <CodeFragment><fileName><pre><code>
   * @param code
   */
   private processSSCTypeParagraph(code: ArticlePara) {
    let cc: ShortCodeContent = code.content as ShortCodeContent;
    let codePrefix = '<div class="codeFragment"><div class="headerblock><div class="filename">'
                    // + '<button class="btn float-sm-right copyBtn">Copy</button>'
                     + '</div></div>'
                     + '<div class="bodyBlock">'
                     + cc.desc
                     + '</body>'
                     + '<div class="w8-100"><pre class="prettyprint w8-100">'
                     + '<code class="language-java">';
    let codeSuffix = '</code></pre></div></div>';
    return codePrefix + this.encodeCode(cc.data) + codeSuffix;
  }

  processConsoleTypeParagraph (code: ArticlePara) {
    let cc: ConsoleContent = code.content as ConsoleContent;
    return '<div class="consoleFragment">'
                    +   '<div class="headerblock">'
                    +     '<span class="title">' + cc.title + "</span>"
                    +   '</div>'
                     + '<div class="bodyBlock">'
                     +    '<div class="w8-100">'
                     +      '<pre><code class="console">'
                     +          this.encodeCode(cc.data)
                     +      '</code></<pre>'
                     + '  </div></div>'
                     + '</div>'
                    + '</div>';
    
  }

  private encodeCode(code: String) {
    code = this.encode_entities(code);
    //console.log("C= " + code);
    return code;
  }

  private encode_entities(str) {
    var rv = '';
    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i); rv += this.char2entity[ch] || ch;
    } return rv;
  }

  private char2entity = { "'": '&#39;', '"': '&quot;', '<': '&lt;', '>': '&gt;', '&#038;': '&amp;' };

  generate() {
    console.log("Starting generate");
    this.HTMLOUTPUT ="";
    this.htmlLinkAnchors = [];
    // console.clear();
    if (this.frompage == "creator" || this.frompage == "") {
      console.log("Starting HTML Output");
      this.HTMLOUTPUT = "<div id='hansini'><input id='lsid' type='hidden' value='" + this.blogDetails.lsid + "'> "
      + this.buildTOC()
      + this.encodeWholeHTML(this.blogDetails)
      + this.encodeArticlePara(this.blogDetails.paras)
      +  "</div>";
      console.log("Ending HTML Output");
    }
    else if (this.frompage == "timelinecreator") {
      console.log("Starting timelinecreator HTMLOUTPUT");
    }

    
  }

  
}


