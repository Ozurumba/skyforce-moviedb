(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"Mg+u":function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),o=function(){return function(){}}(),e=u("pMnS"),b=u("oBZk"),i=u("ZZ/e"),s=u("gIcY"),a=u("H1oj"),r=u("Ke+j"),c=u("B/y7"),p=u("pWsK"),g=function(){function l(l){this.globals=l,this.title="movies"!==this.globals.router.url.split("/")[2]?"tv shows":"movies",this.type=null==this.globals.router.url.split("/")[2]?this.globals.router.url.split("/")[1]:this.globals.router.url.split("/")[2]}return l.prototype.ngOnInit=function(){this.globals.platform.is("mobile")&&(this.globals.splitPaneToggle=!1),(this.globals.platform.is("tablet")||this.globals.platform.is("desktop"))&&(this.title="movies"!==this.globals.router.url.split("/")[1]?"tv shows":"movies"),this.content.scrollToTop()},l}(),h=t.zb({encapsulation:0,styles:[["[_nghost-%COMP%]   h2[_ngcontent-%COMP%], [_nghost-%COMP%]   ion-title[_ngcontent-%COMP%]{text-transform:capitalize!important}"]],data:{}});function m(l){return t.Wb(0,[t.Sb(402653184,1,{content:0}),(l()(),t.Bb(1,0,null,null,18,"ion-header",[],null,null,null,b.P,b.j)),t.Ab(2,49152,null,0,i.C,[t.j,t.p,t.F],null,null),(l()(),t.Bb(3,0,null,0,10,"ion-toolbar",[],null,null,null,b.lb,b.F)),t.Ab(4,49152,null,0,i.Db,[t.j,t.p,t.F],null,null),(l()(),t.Bb(5,0,null,0,2,"ion-title",[],null,null,null,b.kb,b.E)),t.Ab(6,49152,null,0,i.Bb,[t.j,t.p,t.F],null,null),(l()(),t.Ub(7,0,["",""])),(l()(),t.Bb(8,0,null,0,5,"ion-buttons",[["slot","end"]],null,null,null,b.K,b.e)),t.Ab(9,49152,null,0,i.m,[t.j,t.p,t.F],null,null),(l()(),t.Bb(10,0,null,0,3,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0,o=l.component;return"click"===n&&(t=!1!==(null==o.globals?null:o.globals.navigate("search"))&&t),t}),b.J,b.d)),t.Ab(11,49152,null,0,i.l,[t.j,t.p,t.F],null,null),(l()(),t.Bb(12,0,null,0,1,"ion-icon",[["color","warning"],["name","search"]],null,null,null,b.Q,b.k)),t.Ab(13,49152,null,0,i.D,[t.j,t.p,t.F],{color:[0,"color"],name:[1,"name"]},null),(l()(),t.Bb(14,0,null,0,5,"ion-toolbar",[],null,null,null,b.lb,b.F)),t.Ab(15,49152,null,0,i.Db,[t.j,t.p,t.F],null,null),(l()(),t.Bb(16,0,null,0,3,"ion-searchbar",[["lines","none"],["no-border",""]],null,[[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var o=!0;return"ionBlur"===n&&(o=!1!==t.Nb(l,19)._handleBlurEvent(u.target)&&o),"ionChange"===n&&(o=!1!==t.Nb(l,19)._handleInputEvent(u.target)&&o),o}),b.Z,b.t)),t.Rb(5120,null,s.i,(function(l){return[l]}),[i.Pb]),t.Ab(18,49152,null,0,i.lb,[t.j,t.p,t.F],{placeholder:[0,"placeholder"]},null),t.Ab(19,16384,null,0,i.Pb,[t.p],null,null),(l()(),t.Bb(20,0,null,null,16,"ion-content",[["class","no-padding"]],null,null,null,b.M,b.g)),t.Ab(21,49152,[[1,4]],0,i.v,[t.j,t.p,t.F],null,null),(l()(),t.Bb(22,0,null,0,1,"movies-boxes",[["class","hidden-md"]],null,null,null,a.b,a.a)),t.Ab(23,114688,null,0,r.a,[c.a,p.a],{type:[0,"type"],collection:[1,"collection"]},null),(l()(),t.Bb(24,0,null,0,2,"div",[["class","hidden-xs"]],null,null,null,null,null)),(l()(),t.Bb(25,0,null,null,1,"movies-boxes",[],null,null,null,a.b,a.a)),t.Ab(26,114688,null,0,r.a,[c.a,p.a],{type:[0,"type"],collection:[1,"collection"]},null),(l()(),t.Bb(27,0,null,0,4,"div",[["class","hidden-xs"]],null,null,null,null,null)),(l()(),t.Bb(28,0,null,null,1,"h2",[["class","fs-16"],["style","margin-left: 15px;"]],null,null,null,null,null)),(l()(),t.Ub(29,null,["Upcoming ",""])),(l()(),t.Bb(30,0,null,null,1,"movies-boxes",[],null,null,null,a.b,a.a)),t.Ab(31,114688,null,0,r.a,[c.a,p.a],{type:[0,"type"],collection:[1,"collection"]},null),(l()(),t.Bb(32,0,null,0,4,"div",[["class","hidden-xs"]],null,null,null,null,null)),(l()(),t.Bb(33,0,null,null,1,"h2",[["class","fs-16"],["style","margin-left: 15px;"]],null,null,null,null,null)),(l()(),t.Ub(34,null,["Popular ",""])),(l()(),t.Bb(35,0,null,null,1,"movies-boxes",[],null,null,null,a.b,a.a)),t.Ab(36,114688,null,0,r.a,[c.a,p.a],{type:[0,"type"],collection:[1,"collection"]},null)],(function(l,n){var u=n.component;l(n,13,0,"warning","search"),l(n,18,0,t.Fb(1,"search for a ",u.title,"")),l(n,23,0,"series"==u.type?"on_the_air":"upcoming",u.type),l(n,26,0,"series"==u.type?"on_the_air":"upcoming",u.type),l(n,31,0,"top_rated",u.type),l(n,36,0,"popular",u.type)}),(function(l,n){var u=n.component;l(n,7,0,u.title),l(n,29,0,u.title),l(n,34,0,u.title)}))}function L(l){return t.Wb(0,[(l()(),t.Bb(0,0,null,null,1,"app-movies-listings",[],null,null,null,m,h)),t.Ab(1,114688,null,0,g,[p.a],null,null)],(function(l,n){l(n,1,0)}),null)}var d=t.xb("app-movies-listings",g,L,{},{},[]),f=u("Ip0R"),v=u("t/Na"),B=u("BviP"),y=u("j1ZV"),F=u("ZYCi"),j=function(){return function(){}}();u.d(n,"MoviesListingsPageModuleNgFactory",(function(){return A}));var A=t.yb(o,[],(function(l){return t.Kb([t.Lb(512,t.m,t.jb,[[8,[e.a,d]],[3,t.m],t.D]),t.Lb(4608,f.l,f.k,[t.z,[2,f.t]]),t.Lb(4608,s.r,s.r,[]),t.Lb(4608,i.c,i.c,[t.F,t.g]),t.Lb(4608,i.Ib,i.Ib,[i.c,t.m,t.w]),t.Lb(4608,i.Mb,i.Mb,[i.c,t.m,t.w]),t.Lb(4608,v.h,v.n,[f.c,t.I,v.l]),t.Lb(4608,v.o,v.o,[v.h,v.m]),t.Lb(5120,v.a,(function(l){return[l]}),[v.o]),t.Lb(4608,v.k,v.k,[]),t.Lb(6144,v.i,null,[v.k]),t.Lb(4608,v.g,v.g,[v.i]),t.Lb(6144,v.b,null,[v.g]),t.Lb(4608,v.f,v.j,[v.b,t.w]),t.Lb(4608,v.c,v.c,[v.f]),t.Lb(4608,s.b,s.b,[]),t.Lb(1073742336,f.b,f.b,[]),t.Lb(1073742336,s.q,s.q,[]),t.Lb(1073742336,s.g,s.g,[]),t.Lb(1073742336,i.Fb,i.Fb,[]),t.Lb(1073742336,v.e,v.e,[]),t.Lb(1073742336,v.d,v.d,[]),t.Lb(1073742336,B.c,B.c,[]),t.Lb(1073742336,s.n,s.n,[]),t.Lb(1073742336,y.a,y.a,[]),t.Lb(1073742336,F.o,F.o,[[2,F.t],[2,F.m]]),t.Lb(1073742336,j,j,[]),t.Lb(1073742336,o,o,[]),t.Lb(256,v.l,"XSRF-TOKEN",[]),t.Lb(256,v.m,"X-XSRF-TOKEN",[]),t.Lb(1024,F.k,(function(){return[[{path:"",component:g}]]}),[])])}))}}]);