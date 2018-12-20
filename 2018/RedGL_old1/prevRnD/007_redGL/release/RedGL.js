/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.4.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}(this,function(){return function(t){function n(a){if(r[a])return r[a].exports;var e=r[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,n),e.l=!0,e.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,a){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:a})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=4)}([function(t,n,r){"use strict";function a(t){n.ARRAY_TYPE=i=t}function e(t){return t*s}function u(t,n){return Math.abs(t-n)<=o*Math.max(1,Math.abs(t),Math.abs(n))}Object.defineProperty(n,"__esModule",{value:!0}),n.setMatrixArrayType=a,n.toRadian=e,n.equals=u;var o=n.EPSILON=1e-6,i=n.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,s=(n.RANDOM=Math.random,Math.PI/180)},function(t,n,r){"use strict";function a(){var t=new g.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function e(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t}function u(t){var n=new g.ARRAY_TYPE(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n}function o(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t}function i(t,n,r,a,e,u,o,i,s){var c=new g.ARRAY_TYPE(9);return c[0]=t,c[1]=n,c[2]=r,c[3]=a,c[4]=e,c[5]=u,c[6]=o,c[7]=i,c[8]=s,c}function s(t,n,r,a,e,u,o,i,s,c){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t[8]=c,t}function c(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function f(t,n){if(t===n){var r=n[1],a=n[2],e=n[5];t[1]=n[3],t[2]=n[6],t[3]=r,t[5]=n[7],t[6]=a,t[7]=e}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t}function M(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=f*o-i*c,h=-f*u+i*s,l=c*u-o*s,v=r*M+a*h+e*l;return v?(v=1/v,t[0]=M*v,t[1]=(-f*a+e*c)*v,t[2]=(i*a-e*o)*v,t[3]=h*v,t[4]=(f*r-e*s)*v,t[5]=(-i*r+e*u)*v,t[6]=l*v,t[7]=(-c*r+a*s)*v,t[8]=(o*r-a*u)*v,t):null}function h(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8];return t[0]=o*f-i*c,t[1]=e*c-a*f,t[2]=a*i-e*o,t[3]=i*s-u*f,t[4]=r*f-e*s,t[5]=e*u-r*i,t[6]=u*c-o*s,t[7]=a*s-r*c,t[8]=r*o-a*u,t}function l(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],s=t[7],c=t[8];return n*(c*u-o*s)+r*(-c*e+o*i)+a*(s*e-u*i)}function v(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=r[0],l=r[1],v=r[2],d=r[3],b=r[4],m=r[5],p=r[6],P=r[7],E=r[8];return t[0]=h*a+l*o+v*c,t[1]=h*e+l*i+v*f,t[2]=h*u+l*s+v*M,t[3]=d*a+b*o+m*c,t[4]=d*e+b*i+m*f,t[5]=d*u+b*s+m*M,t[6]=p*a+P*o+E*c,t[7]=p*e+P*i+E*f,t[8]=p*u+P*s+E*M,t}function d(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=r[0],l=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=s,t[6]=h*a+l*o+c,t[7]=h*e+l*i+f,t[8]=h*u+l*s+M,t}function b(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=Math.sin(r),l=Math.cos(r);return t[0]=l*a+h*o,t[1]=l*e+h*i,t[2]=l*u+h*s,t[3]=l*o-h*a,t[4]=l*i-h*e,t[5]=l*s-h*u,t[6]=c,t[7]=f,t[8]=M,t}function m(t,n,r){var a=r[0],e=r[1];return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=e*n[3],t[4]=e*n[4],t[5]=e*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t}function p(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t}function P(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=-r,t[4]=a,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function E(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function O(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t}function x(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,s=e+e,c=r*o,f=a*o,M=a*i,h=e*o,l=e*i,v=e*s,d=u*o,b=u*i,m=u*s;return t[0]=1-M-v,t[3]=f-m,t[6]=h+b,t[1]=f+m,t[4]=1-c-v,t[7]=l-d,t[2]=h-b,t[5]=l+d,t[8]=1-c-M,t}function A(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15],p=r*i-a*o,P=r*s-e*o,E=r*c-u*o,O=a*s-e*i,x=a*c-u*i,A=e*c-u*s,q=f*d-M*v,y=f*b-h*v,w=f*m-l*v,R=M*b-h*d,L=M*m-l*d,S=h*m-l*b,_=p*S-P*L+E*R+O*w-x*y+A*q;return _?(_=1/_,t[0]=(i*S-s*L+c*R)*_,t[1]=(s*w-o*S-c*y)*_,t[2]=(o*L-i*w+c*q)*_,t[3]=(e*L-a*S-u*R)*_,t[4]=(r*S-e*w+u*y)*_,t[5]=(a*w-r*L-u*q)*_,t[6]=(d*A-b*x+m*O)*_,t[7]=(b*E-v*A-m*P)*_,t[8]=(v*x-d*E+m*p)*_,t):null}function q(t,n,r){return t[0]=2/n,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/r,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t}function y(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"}function w(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))}function R(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t}function L(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t}function S(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t}function _(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t[6]=n[6]+r[6]*a,t[7]=n[7]+r[7]*a,t[8]=n[8]+r[8]*a,t}function I(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]}function N(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=t[4],i=t[5],s=t[6],c=t[7],f=t[8],M=n[0],h=n[1],l=n[2],v=n[3],d=n[4],b=n[5],m=n[6],p=n[7],P=n[8];return Math.abs(r-M)<=g.EPSILON*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(a-h)<=g.EPSILON*Math.max(1,Math.abs(a),Math.abs(h))&&Math.abs(e-l)<=g.EPSILON*Math.max(1,Math.abs(e),Math.abs(l))&&Math.abs(u-v)<=g.EPSILON*Math.max(1,Math.abs(u),Math.abs(v))&&Math.abs(o-d)<=g.EPSILON*Math.max(1,Math.abs(o),Math.abs(d))&&Math.abs(i-b)<=g.EPSILON*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(s-m)<=g.EPSILON*Math.max(1,Math.abs(s),Math.abs(m))&&Math.abs(c-p)<=g.EPSILON*Math.max(1,Math.abs(c),Math.abs(p))&&Math.abs(f-P)<=g.EPSILON*Math.max(1,Math.abs(f),Math.abs(P))}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.fromMat4=e,n.clone=u,n.copy=o,n.fromValues=i,n.set=s,n.identity=c,n.transpose=f,n.invert=M,n.adjoint=h,n.determinant=l,n.multiply=v,n.translate=d,n.rotate=b,n.scale=m,n.fromTranslation=p,n.fromRotation=P,n.fromScaling=E,n.fromMat2d=O,n.fromQuat=x,n.normalFromMat4=A,n.projection=q,n.str=y,n.frob=w,n.add=R,n.subtract=L,n.multiplyScalar=S,n.multiplyScalarAndAdd=_,n.exactEquals=I,n.equals=N;var Y=r(0),g=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(Y);n.mul=v,n.sub=L},function(t,n,r){"use strict";function a(){var t=new Z.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t}function e(t){var n=new Z.ARRAY_TYPE(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n}function u(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)}function o(t,n,r){var a=new Z.ARRAY_TYPE(3);return a[0]=t,a[1]=n,a[2]=r,a}function i(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function s(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t}function c(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t}function f(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t}function M(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t}function h(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t}function l(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t}function v(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t}function d(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t}function b(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t}function m(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t}function p(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t}function P(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t}function E(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return Math.sqrt(r*r+a*a+e*e)}function O(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return r*r+a*a+e*e}function x(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a}function A(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t}function q(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t}function y(t,n){var r=n[0],a=n[1],e=n[2],u=r*r+a*a+e*e;return u>0&&(u=1/Math.sqrt(u),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u),t}function w(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function R(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2];return t[0]=e*s-u*i,t[1]=u*o-a*s,t[2]=a*i-e*o,t}function L(t,n,r,a){var e=n[0],u=n[1],o=n[2];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t}function S(t,n,r,a,e,u){var o=u*u,i=o*(2*u-3)+1,s=o*(u-2)+u,c=o*(u-1),f=o*(3-2*u);return t[0]=n[0]*i+r[0]*s+a[0]*c+e[0]*f,t[1]=n[1]*i+r[1]*s+a[1]*c+e[1]*f,t[2]=n[2]*i+r[2]*s+a[2]*c+e[2]*f,t}function _(t,n,r,a,e,u){var o=1-u,i=o*o,s=u*u,c=i*o,f=3*u*i,M=3*s*o,h=s*u;return t[0]=n[0]*c+r[0]*f+a[0]*M+e[0]*h,t[1]=n[1]*c+r[1]*f+a[1]*M+e[1]*h,t[2]=n[2]*c+r[2]*f+a[2]*M+e[2]*h,t}function I(t,n){n=n||1;var r=2*Z.RANDOM()*Math.PI,a=2*Z.RANDOM()-1,e=Math.sqrt(1-a*a)*n;return t[0]=Math.cos(r)*e,t[1]=Math.sin(r)*e,t[2]=a*n,t}function N(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[3]*a+r[7]*e+r[11]*u+r[15];return o=o||1,t[0]=(r[0]*a+r[4]*e+r[8]*u+r[12])/o,t[1]=(r[1]*a+r[5]*e+r[9]*u+r[13])/o,t[2]=(r[2]*a+r[6]*e+r[10]*u+r[14])/o,t}function Y(t,n,r){var a=n[0],e=n[1],u=n[2];return t[0]=a*r[0]+e*r[3]+u*r[6],t[1]=a*r[1]+e*r[4]+u*r[7],t[2]=a*r[2]+e*r[5]+u*r[8],t}function g(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2],c=r[3],f=c*a+i*u-s*e,M=c*e+s*a-o*u,h=c*u+o*e-i*a,l=-o*a-i*e-s*u;return t[0]=f*c+l*-o+M*-s-h*-i,t[1]=M*c+l*-i+h*-o-f*-s,t[2]=h*c+l*-s+f*-i-M*-o,t}function T(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0],u[1]=e[1]*Math.cos(a)-e[2]*Math.sin(a),u[2]=e[1]*Math.sin(a)+e[2]*Math.cos(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t}function j(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[2]*Math.sin(a)+e[0]*Math.cos(a),u[1]=e[1],u[2]=e[2]*Math.cos(a)-e[0]*Math.sin(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t}function D(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0]*Math.cos(a)-e[1]*Math.sin(a),u[1]=e[0]*Math.sin(a)+e[1]*Math.cos(a),u[2]=e[2],t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t}function V(t,n){var r=o(t[0],t[1],t[2]),a=o(n[0],n[1],n[2]);y(r,r),y(a,a);var e=w(r,a);return e>1?0:e<-1?Math.PI:Math.acos(e)}function z(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"}function F(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function Q(t,n){var r=t[0],a=t[1],e=t[2],u=n[0],o=n[1],i=n[2];return Math.abs(r-u)<=Z.EPSILON*Math.max(1,Math.abs(r),Math.abs(u))&&Math.abs(a-o)<=Z.EPSILON*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(e-i)<=Z.EPSILON*Math.max(1,Math.abs(e),Math.abs(i))}Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.len=n.sqrDist=n.dist=n.div=n.mul=n.sub=void 0,n.create=a,n.clone=e,n.length=u,n.fromValues=o,n.copy=i,n.set=s,n.add=c,n.subtract=f,n.multiply=M,n.divide=h,n.ceil=l,n.floor=v,n.min=d,n.max=b,n.round=m,n.scale=p,n.scaleAndAdd=P,n.distance=E,n.squaredDistance=O,n.squaredLength=x,n.negate=A,n.inverse=q,n.normalize=y,n.dot=w,n.cross=R,n.lerp=L,n.hermite=S,n.bezier=_,n.random=I,n.transformMat4=N,n.transformMat3=Y,n.transformQuat=g,n.rotateX=T,n.rotateY=j,n.rotateZ=D,n.angle=V,n.str=z,n.exactEquals=F,n.equals=Q;var X=r(0),Z=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(X);n.sub=f,n.mul=M,n.div=h,n.dist=E,n.sqrDist=O,n.len=u,n.sqrLen=x,n.forEach=function(){var t=a();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=3),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2];return n}}()},function(t,n,r){"use strict";function a(){var t=new T.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t}function e(t){var n=new T.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function u(t,n,r,a){var e=new T.ARRAY_TYPE(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=a,e}function o(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function i(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t}function s(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t}function c(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}function f(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t}function M(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t}function h(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t}function l(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t}function v(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t}function d(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t}function b(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t}function m(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t}function p(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t}function P(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(r*r+a*a+e*e+u*u)}function E(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return r*r+a*a+e*e+u*u}function O(t){var n=t[0],r=t[1],a=t[2],e=t[3];return Math.sqrt(n*n+r*r+a*a+e*e)}function x(t){var n=t[0],r=t[1],a=t[2],e=t[3];return n*n+r*r+a*a+e*e}function A(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t}function q(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t}function y(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u;return o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=a*o,t[2]=e*o,t[3]=u*o),t}function w(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function R(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t[3]=i+a*(r[3]-i),t}function L(t,n){return n=n||1,t[0]=T.RANDOM(),t[1]=T.RANDOM(),t[2]=T.RANDOM(),t[3]=T.RANDOM(),y(t,t),m(t,t,n),t}function S(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3];return t[0]=r[0]*a+r[4]*e+r[8]*u+r[12]*o,t[1]=r[1]*a+r[5]*e+r[9]*u+r[13]*o,t[2]=r[2]*a+r[6]*e+r[10]*u+r[14]*o,t[3]=r[3]*a+r[7]*e+r[11]*u+r[15]*o,t}function _(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],s=r[2],c=r[3],f=c*a+i*u-s*e,M=c*e+s*a-o*u,h=c*u+o*e-i*a,l=-o*a-i*e-s*u;return t[0]=f*c+l*-o+M*-s-h*-i,t[1]=M*c+l*-i+h*-o-f*-s,t[2]=h*c+l*-s+f*-i-M*-o,t[3]=n[3],t}function I(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}function N(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function Y(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=n[0],i=n[1],s=n[2],c=n[3];return Math.abs(r-o)<=T.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(a-i)<=T.EPSILON*Math.max(1,Math.abs(a),Math.abs(i))&&Math.abs(e-s)<=T.EPSILON*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-c)<=T.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))}Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.len=n.sqrDist=n.dist=n.div=n.mul=n.sub=void 0,n.create=a,n.clone=e,n.fromValues=u,n.copy=o,n.set=i,n.add=s,n.subtract=c,n.multiply=f,n.divide=M,n.ceil=h,n.floor=l,n.min=v,n.max=d,n.round=b,n.scale=m,n.scaleAndAdd=p,n.distance=P,n.squaredDistance=E,n.length=O,n.squaredLength=x,n.negate=A,n.inverse=q,n.normalize=y,n.dot=w,n.lerp=R,n.random=L,n.transformMat4=S,n.transformQuat=_,n.str=I,n.exactEquals=N,n.equals=Y;var g=r(0),T=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(g);n.sub=c,n.mul=f,n.div=M,n.dist=P,n.sqrDist=E,n.len=O,n.sqrLen=x,n.forEach=function(){var t=a();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=4),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}()},function(t,n,r){"use strict";function a(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}Object.defineProperty(n,"__esModule",{value:!0}),n.vec4=n.vec3=n.vec2=n.quat=n.mat4=n.mat3=n.mat2d=n.mat2=n.glMatrix=void 0;var e=r(0),u=a(e),o=r(5),i=a(o),s=r(6),c=a(s),f=r(1),M=a(f),h=r(7),l=a(h),v=r(8),d=a(v),b=r(9),m=a(b),p=r(2),P=a(p),E=r(3),O=a(E);n.glMatrix=u,n.mat2=i,n.mat2d=c,n.mat3=M,n.mat4=l,n.quat=d,n.vec2=m,n.vec3=P,n.vec4=O},function(t,n,r){"use strict";function a(){var t=new L.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t}function e(t){var n=new L.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function o(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t}function i(t,n,r,a){var e=new L.ARRAY_TYPE(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=a,e}function s(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t}function c(t,n){if(t===n){var r=n[1];t[1]=n[2],t[2]=r}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t}function f(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*u-e*a;return o?(o=1/o,t[0]=u*o,t[1]=-a*o,t[2]=-e*o,t[3]=r*o,t):null}function M(t,n){var r=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=r,t}function h(t){return t[0]*t[3]-t[2]*t[1]}function l(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*i+u*s,t[1]=e*i+o*s,t[2]=a*c+u*f,t[3]=e*c+o*f,t}function v(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+u*i,t[1]=e*s+o*i,t[2]=a*-i+u*s,t[3]=e*-i+o*s,t}function d(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1];return t[0]=a*i,t[1]=e*i,t[2]=u*s,t[3]=o*s,t}function b(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t}function m(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t}function p(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}function P(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2))}function E(t,n,r,a){return t[2]=a[2]/a[0],r[0]=a[0],r[1]=a[1],r[3]=a[3]-t[2]*r[1],[t,n,r]}function O(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t}function x(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}function A(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function q(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=n[0],i=n[1],s=n[2],c=n[3];return Math.abs(r-o)<=L.EPSILON*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(a-i)<=L.EPSILON*Math.max(1,Math.abs(a),Math.abs(i))&&Math.abs(e-s)<=L.EPSILON*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-c)<=L.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))}function y(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t}function w(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.clone=e,n.copy=u,n.identity=o,n.fromValues=i,n.set=s,n.transpose=c,n.invert=f,n.adjoint=M,n.determinant=h,n.multiply=l,n.rotate=v,n.scale=d,n.fromRotation=b,n.fromScaling=m,n.str=p,n.frob=P,n.LDU=E,n.add=O,n.subtract=x,n.exactEquals=A,n.equals=q,n.multiplyScalar=y,n.multiplyScalarAndAdd=w;var R=r(0),L=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(R);n.mul=l,n.sub=x},function(t,n,r){"use strict";function a(){var t=new R.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function e(t){var n=new R.ARRAY_TYPE(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t}function o(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t}function i(t,n,r,a,e,u){var o=new R.ARRAY_TYPE(6);return o[0]=t,o[1]=n,o[2]=r,o[3]=a,o[4]=e,o[5]=u,o}function s(t,n,r,a,e,u,o){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t}function c(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=r*u-a*e;return s?(s=1/s,t[0]=u*s,t[1]=-a*s,t[2]=-e*s,t[3]=r*s,t[4]=(e*i-u*o)*s,t[5]=(a*o-r*i)*s,t):null}function f(t){return t[0]*t[3]-t[1]*t[2]}function M(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1],M=r[2],h=r[3],l=r[4],v=r[5];return t[0]=a*c+u*f,t[1]=e*c+o*f,t[2]=a*M+u*h,t[3]=e*M+o*h,t[4]=a*l+u*v+i,t[5]=e*l+o*v+s,t}function h(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=Math.sin(r),f=Math.cos(r);return t[0]=a*f+u*c,t[1]=e*f+o*c,t[2]=a*-c+u*f,t[3]=e*-c+o*f,t[4]=i,t[5]=s,t}function l(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1];return t[0]=a*c,t[1]=e*c,t[2]=u*f,t[3]=o*f,t[4]=i,t[5]=s,t}function v(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=r[0],f=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=a*c+u*f+i,t[5]=e*c+o*f+s,t}function d(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t[4]=0,t[5]=0,t}function b(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t}function m(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t}function p(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"}function P(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1)}function E(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t}function O(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t}function x(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t}function A(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t}function q(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]}function y(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=t[4],i=t[5],s=n[0],c=n[1],f=n[2],M=n[3],h=n[4],l=n[5];return Math.abs(r-s)<=R.EPSILON*Math.max(1,Math.abs(r),Math.abs(s))&&Math.abs(a-c)<=R.EPSILON*Math.max(1,Math.abs(a),Math.abs(c))&&Math.abs(e-f)<=R.EPSILON*Math.max(1,Math.abs(e),Math.abs(f))&&Math.abs(u-M)<=R.EPSILON*Math.max(1,Math.abs(u),Math.abs(M))&&Math.abs(o-h)<=R.EPSILON*Math.max(1,Math.abs(o),Math.abs(h))&&Math.abs(i-l)<=R.EPSILON*Math.max(1,Math.abs(i),Math.abs(l))}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.clone=e,n.copy=u,n.identity=o,n.fromValues=i,n.set=s,n.invert=c,n.determinant=f,n.multiply=M,n.rotate=h,n.scale=l,n.translate=v,n.fromRotation=d,n.fromScaling=b,n.fromTranslation=m,n.str=p,n.frob=P,n.add=E,n.subtract=O,n.multiplyScalar=x,n.multiplyScalarAndAdd=A,n.exactEquals=q,n.equals=y;var w=r(0),R=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(w);n.mul=M,n.sub=O},function(t,n,r){"use strict";function a(){var t=new C.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function e(t){var n=new C.ARRAY_TYPE(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function o(t,n,r,a,e,u,o,i,s,c,f,M,h,l,v,d){var b=new C.ARRAY_TYPE(16);return b[0]=t,b[1]=n,b[2]=r,b[3]=a,b[4]=e,b[5]=u,b[6]=o,b[7]=i,b[8]=s,b[9]=c,b[10]=f,b[11]=M,b[12]=h,b[13]=l,b[14]=v,b[15]=d,b}function i(t,n,r,a,e,u,o,i,s,c,f,M,h,l,v,d,b){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=s,t[8]=c,t[9]=f,t[10]=M,t[11]=h,t[12]=l,t[13]=v,t[14]=d,t[15]=b,t}function s(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function c(t,n){if(t===n){var r=n[1],a=n[2],e=n[3],u=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=a,t[9]=u,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t}function f(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15],p=r*i-a*o,P=r*s-e*o,E=r*c-u*o,O=a*s-e*i,x=a*c-u*i,A=e*c-u*s,q=f*d-M*v,y=f*b-h*v,w=f*m-l*v,R=M*b-h*d,L=M*m-l*d,S=h*m-l*b,_=p*S-P*L+E*R+O*w-x*y+A*q;return _?(_=1/_,t[0]=(i*S-s*L+c*R)*_,t[1]=(e*L-a*S-u*R)*_,t[2]=(d*A-b*x+m*O)*_,t[3]=(h*x-M*A-l*O)*_,t[4]=(s*w-o*S-c*y)*_,t[5]=(r*S-e*w+u*y)*_,t[6]=(b*E-v*A-m*P)*_,t[7]=(f*A-h*E+l*P)*_,t[8]=(o*L-i*w+c*q)*_,t[9]=(a*w-r*L-u*q)*_,t[10]=(v*x-d*E+m*p)*_,t[11]=(M*E-f*x-l*p)*_,t[12]=(i*y-o*R-s*q)*_,t[13]=(r*R-a*y+e*q)*_,t[14]=(d*P-v*O-b*p)*_,t[15]=(f*O-M*P+h*p)*_,t):null}function M(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],s=n[6],c=n[7],f=n[8],M=n[9],h=n[10],l=n[11],v=n[12],d=n[13],b=n[14],m=n[15];return t[0]=i*(h*m-l*b)-M*(s*m-c*b)+d*(s*l-c*h),t[1]=-(a*(h*m-l*b)-M*(e*m-u*b)+d*(e*l-u*h)),t[2]=a*(s*m-c*b)-i*(e*m-u*b)+d*(e*c-u*s),t[3]=-(a*(s*l-c*h)-i*(e*l-u*h)+M*(e*c-u*s)),t[4]=-(o*(h*m-l*b)-f*(s*m-c*b)+v*(s*l-c*h)),t[5]=r*(h*m-l*b)-f*(e*m-u*b)+v*(e*l-u*h),t[6]=-(r*(s*m-c*b)-o*(e*m-u*b)+v*(e*c-u*s)),t[7]=r*(s*l-c*h)-o*(e*l-u*h)+f*(e*c-u*s),t[8]=o*(M*m-l*d)-f*(i*m-c*d)+v*(i*l-c*M),t[9]=-(r*(M*m-l*d)-f*(a*m-u*d)+v*(a*l-u*M)),t[10]=r*(i*m-c*d)-o*(a*m-u*d)+v*(a*c-u*i),t[11]=-(r*(i*l-c*M)-o*(a*l-u*M)+f*(a*c-u*i)),t[12]=-(o*(M*b-h*d)-f*(i*b-s*d)+v*(i*h-s*M)),t[13]=r*(M*b-h*d)-f*(a*b-e*d)+v*(a*h-e*M),t[14]=-(r*(i*b-s*d)-o*(a*b-e*d)+v*(a*s-e*i)),t[15]=r*(i*h-s*M)-o*(a*h-e*M)+f*(a*s-e*i),t}function h(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],s=t[7],c=t[8],f=t[9],M=t[10],h=t[11],l=t[12],v=t[13],d=t[14],b=t[15];return(n*o-r*u)*(M*b-h*d)-(n*i-a*u)*(f*b-h*v)+(n*s-e*u)*(f*d-M*v)+(r*i-a*o)*(c*b-h*l)-(r*s-e*o)*(c*d-M*l)+(a*s-e*i)*(c*v-f*l)}function l(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],s=n[5],c=n[6],f=n[7],M=n[8],h=n[9],l=n[10],v=n[11],d=n[12],b=n[13],m=n[14],p=n[15],P=r[0],E=r[1],O=r[2],x=r[3];return t[0]=P*a+E*i+O*M+x*d,t[1]=P*e+E*s+O*h+x*b,t[2]=P*u+E*c+O*l+x*m,t[3]=P*o+E*f+O*v+x*p,P=r[4],E=r[5],O=r[6],x=r[7],t[4]=P*a+E*i+O*M+x*d,t[5]=P*e+E*s+O*h+x*b,t[6]=P*u+E*c+O*l+x*m,t[7]=P*o+E*f+O*v+x*p,P=r[8],E=r[9],O=r[10],x=r[11],t[8]=P*a+E*i+O*M+x*d,t[9]=P*e+E*s+O*h+x*b,t[10]=P*u+E*c+O*l+x*m,t[11]=P*o+E*f+O*v+x*p,P=r[12],E=r[13],O=r[14],x=r[15],t[12]=P*a+E*i+O*M+x*d,t[13]=P*e+E*s+O*h+x*b,t[14]=P*u+E*c+O*l+x*m,t[15]=P*o+E*f+O*v+x*p,t}function v(t,n,r){var a=r[0],e=r[1],u=r[2],o=void 0,i=void 0,s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=void 0,m=void 0;return n===t?(t[12]=n[0]*a+n[4]*e+n[8]*u+n[12],t[13]=n[1]*a+n[5]*e+n[9]*u+n[13],t[14]=n[2]*a+n[6]*e+n[10]*u+n[14],t[15]=n[3]*a+n[7]*e+n[11]*u+n[15]):(o=n[0],i=n[1],s=n[2],c=n[3],f=n[4],M=n[5],h=n[6],l=n[7],v=n[8],d=n[9],b=n[10],m=n[11],t[0]=o,t[1]=i,t[2]=s,t[3]=c,t[4]=f,t[5]=M,t[6]=h,t[7]=l,t[8]=v,t[9]=d,t[10]=b,t[11]=m,t[12]=o*a+f*e+v*u+n[12],t[13]=i*a+M*e+d*u+n[13],t[14]=s*a+h*e+b*u+n[14],t[15]=c*a+l*e+m*u+n[15]),t}function d(t,n,r){var a=r[0],e=r[1],u=r[2];return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function b(t,n,r,a){var e=a[0],u=a[1],o=a[2],i=Math.sqrt(e*e+u*u+o*o),s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=void 0,d=void 0,b=void 0,m=void 0,p=void 0,P=void 0,E=void 0,O=void 0,x=void 0,A=void 0,q=void 0,y=void 0,w=void 0,R=void 0,L=void 0,S=void 0,_=void 0,I=void 0;return Math.abs(i)<C.EPSILON?null:(i=1/i,e*=i,u*=i,o*=i,s=Math.sin(r),c=Math.cos(r),f=1-c,M=n[0],h=n[1],l=n[2],v=n[3],d=n[4],b=n[5],m=n[6],p=n[7],P=n[8],E=n[9],O=n[10],x=n[11],A=e*e*f+c,q=u*e*f+o*s,y=o*e*f-u*s,w=e*u*f-o*s,R=u*u*f+c,L=o*u*f+e*s,S=e*o*f+u*s,_=u*o*f-e*s,I=o*o*f+c,t[0]=M*A+d*q+P*y,t[1]=h*A+b*q+E*y,t[2]=l*A+m*q+O*y,t[3]=v*A+p*q+x*y,t[4]=M*w+d*R+P*L,t[5]=h*w+b*R+E*L,t[6]=l*w+m*R+O*L,t[7]=v*w+p*R+x*L,t[8]=M*S+d*_+P*I,t[9]=h*S+b*_+E*I,t[10]=l*S+m*_+O*I,t[11]=v*S+p*_+x*I,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)}function m(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[4],o=n[5],i=n[6],s=n[7],c=n[8],f=n[9],M=n[10],h=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=u*e+c*a,t[5]=o*e+f*a,t[6]=i*e+M*a,t[7]=s*e+h*a,t[8]=c*e-u*a,t[9]=f*e-o*a,t[10]=M*e-i*a,t[11]=h*e-s*a,t}function p(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],s=n[3],c=n[8],f=n[9],M=n[10],h=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e-c*a,t[1]=o*e-f*a,t[2]=i*e-M*a,t[3]=s*e-h*a,t[8]=u*a+c*e,t[9]=o*a+f*e,t[10]=i*a+M*e,t[11]=s*a+h*e,t}function P(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],s=n[3],c=n[4],f=n[5],M=n[6],h=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e+c*a,t[1]=o*e+f*a,t[2]=i*e+M*a,t[3]=s*e+h*a,t[4]=c*e-u*a,t[5]=f*e-o*a,t[6]=M*e-i*a,t[7]=h*e-s*a,t}function E(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function O(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function x(t,n,r){var a=r[0],e=r[1],u=r[2],o=Math.sqrt(a*a+e*e+u*u),i=void 0,s=void 0,c=void 0;return Math.abs(o)<C.EPSILON?null:(o=1/o,a*=o,e*=o,u*=o,i=Math.sin(n),s=Math.cos(n),c=1-s,t[0]=a*a*c+s,t[1]=e*a*c+u*i,t[2]=u*a*c-e*i,t[3]=0,t[4]=a*e*c-u*i,t[5]=e*e*c+s,t[6]=u*e*c+a*i,t[7]=0,t[8]=a*u*c+e*i,t[9]=e*u*c-a*i,t[10]=u*u*c+s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}function A(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function q(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function y(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function w(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=a+a,s=e+e,c=u+u,f=a*i,M=a*s,h=a*c,l=e*s,v=e*c,d=u*c,b=o*i,m=o*s,p=o*c;return t[0]=1-(l+d),t[1]=M+p,t[2]=h-m,t[3]=0,t[4]=M-p,t[5]=1-(f+d),t[6]=v+b,t[7]=0,t[8]=h+m,t[9]=v-b,t[10]=1-(f+l),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function R(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t}function L(t,n){var r=n[0],a=n[1],e=n[2],u=n[4],o=n[5],i=n[6],s=n[8],c=n[9],f=n[10];return t[0]=Math.sqrt(r*r+a*a+e*e),t[1]=Math.sqrt(u*u+o*o+i*i),t[2]=Math.sqrt(s*s+c*c+f*f),t}function S(t,n){var r=n[0]+n[5]+n[10],a=0;return r>0?(a=2*Math.sqrt(r+1),t[3]=.25*a,t[0]=(n[6]-n[9])/a,t[1]=(n[8]-n[2])/a,t[2]=(n[1]-n[4])/a):n[0]>n[5]&n[0]>n[10]?(a=2*Math.sqrt(1+n[0]-n[5]-n[10]),t[3]=(n[6]-n[9])/a,t[0]=.25*a,t[1]=(n[1]+n[4])/a,t[2]=(n[8]+n[2])/a):n[5]>n[10]?(a=2*Math.sqrt(1+n[5]-n[0]-n[10]),t[3]=(n[8]-n[2])/a,t[0]=(n[1]+n[4])/a,t[1]=.25*a,t[2]=(n[6]+n[9])/a):(a=2*Math.sqrt(1+n[10]-n[0]-n[5]),t[3]=(n[1]-n[4])/a,t[0]=(n[8]+n[2])/a,t[1]=(n[6]+n[9])/a,t[2]=.25*a),t}function _(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],s=e+e,c=u+u,f=o+o,M=e*s,h=e*c,l=e*f,v=u*c,d=u*f,b=o*f,m=i*s,p=i*c,P=i*f,E=a[0],O=a[1],x=a[2];return t[0]=(1-(v+b))*E,t[1]=(h+P)*E,t[2]=(l-p)*E,t[3]=0,t[4]=(h-P)*O,t[5]=(1-(M+b))*O,t[6]=(d+m)*O,t[7]=0,t[8]=(l+p)*x,t[9]=(d-m)*x,t[10]=(1-(M+v))*x,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function I(t,n,r,a,e){var u=n[0],o=n[1],i=n[2],s=n[3],c=u+u,f=o+o,M=i+i,h=u*c,l=u*f,v=u*M,d=o*f,b=o*M,m=i*M,p=s*c,P=s*f,E=s*M,O=a[0],x=a[1],A=a[2],q=e[0],y=e[1],w=e[2];return t[0]=(1-(d+m))*O,t[1]=(l+E)*O,t[2]=(v-P)*O,t[3]=0,t[4]=(l-E)*x,t[5]=(1-(h+m))*x,t[6]=(b+p)*x,t[7]=0,t[8]=(v+P)*A,t[9]=(b-p)*A,t[10]=(1-(h+d))*A,t[11]=0,t[12]=r[0]+q-(t[0]*q+t[4]*y+t[8]*w),t[13]=r[1]+y-(t[1]*q+t[5]*y+t[9]*w),t[14]=r[2]+w-(t[2]*q+t[6]*y+t[10]*w),t[15]=1,t}function N(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,s=e+e,c=r*o,f=a*o,M=a*i,h=e*o,l=e*i,v=e*s,d=u*o,b=u*i,m=u*s;return t[0]=1-M-v,t[1]=f+m,t[2]=h-b,t[3]=0,t[4]=f-m,t[5]=1-c-v,t[6]=l+d,t[7]=0,t[8]=h+b,t[9]=l-d,t[10]=1-c-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Y(t,n,r,a,e,u,o){var i=1/(r-n),s=1/(e-a),c=1/(u-o);return t[0]=2*u*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*s,t[6]=0,t[7]=0,t[8]=(r+n)*i,t[9]=(e+a)*s,t[10]=(o+u)*c,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*u*2*c,t[15]=0,t}function g(t,n,r,a,e){var u=1/Math.tan(n/2),o=1/(a-e);return t[0]=u/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(e+a)*o,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*e*a*o,t[15]=0,t}function T(t,n,r,a){var e=Math.tan(n.upDegrees*Math.PI/180),u=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),s=2/(o+i),c=2/(e+u);return t[0]=s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=c,t[6]=0,t[7]=0,t[8]=-(o-i)*s*.5,t[9]=(e-u)*c*.5,t[10]=a/(r-a),t[11]=-1,t[12]=0,t[13]=0,t[14]=a*r/(r-a),t[15]=0,t}function j(t,n,r,a,e,u,o){var i=1/(n-r),s=1/(a-e),c=1/(u-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(n+r)*i,t[13]=(e+a)*s,t[14]=(o+u)*c,t[15]=1,t}function D(t,n,r,a){var e=void 0,u=void 0,o=void 0,i=void 0,s=void 0,c=void 0,f=void 0,M=void 0,h=void 0,l=void 0,v=n[0],d=n[1],b=n[2],m=a[0],p=a[1],P=a[2],E=r[0],O=r[1],x=r[2];return Math.abs(v-E)<C.EPSILON&&Math.abs(d-O)<C.EPSILON&&Math.abs(b-x)<C.EPSILON?mat4.identity(t):(f=v-E,M=d-O,h=b-x,l=1/Math.sqrt(f*f+M*M+h*h),f*=l,M*=l,h*=l,e=p*h-P*M,u=P*f-m*h,o=m*M-p*f,l=Math.sqrt(e*e+u*u+o*o),l?(l=1/l,e*=l,u*=l,o*=l):(e=0,u=0,o=0),i=M*o-h*u,s=h*e-f*o,c=f*u-M*e,l=Math.sqrt(i*i+s*s+c*c),l?(l=1/l,i*=l,s*=l,c*=l):(i=0,s=0,c=0),t[0]=e,t[1]=i,t[2]=f,t[3]=0,t[4]=u,t[5]=s,t[6]=M,t[7]=0,t[8]=o,t[9]=c,t[10]=h,t[11]=0,t[12]=-(e*v+u*d+o*b),t[13]=-(i*v+s*d+c*b),t[14]=-(f*v+M*d+h*b),t[15]=1,t)}function V(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=a[0],s=a[1],c=a[2],f=e-r[0],M=u-r[1],h=o-r[2],l=f*f+M*M+h*h;l>0&&(l=1/Math.sqrt(l),f*=l,M*=l,h*=l);var v=s*h-c*M,d=c*f-i*h,b=i*M-s*f;return t[0]=v,t[1]=d,t[2]=b,t[3]=0,t[4]=M*b-h*d,t[5]=h*v-f*b,t[6]=f*d-M*v,t[7]=0,t[8]=f,t[9]=M,t[10]=h,t[11]=0,t[12]=e,t[13]=u,t[14]=o,t[15]=1,t}function z(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}function F(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))}function Q(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t[9]=n[9]+r[9],t[10]=n[10]+r[10],t[11]=n[11]+r[11],t[12]=n[12]+r[12],t[13]=n[13]+r[13],t[14]=n[14]+r[14],t[15]=n[15]+r[15],t}function X(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t[9]=n[9]-r[9],t[10]=n[10]-r[10],t[11]=n[11]-r[11],t[12]=n[12]-r[12],t[13]=n[13]-r[13],t[14]=n[14]-r[14],t[15]=n[15]-r[15],t}function Z(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=n[11]*r,t[12]=n[12]*r,t[13]=n[13]*r,t[14]=n[14]*r,t[15]=n[15]*r,t}function k(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t[4]=n[4]+r[4]*a,t[5]=n[5]+r[5]*a,t[6]=n[6]+r[6]*a,t[7]=n[7]+r[7]*a,t[8]=n[8]+r[8]*a,t[9]=n[9]+r[9]*a,t[10]=n[10]+r[10]*a,t[11]=n[11]+r[11]*a,t[12]=n[12]+r[12]*a,t[13]=n[13]+r[13]*a,t[14]=n[14]+r[14]*a,t[15]=n[15]+r[15]*a,t}function U(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]}function W(t,n){var r=t[0],a=t[1],e=t[2],u=t[3],o=t[4],i=t[5],s=t[6],c=t[7],f=t[8],M=t[9],h=t[10],l=t[11],v=t[12],d=t[13],b=t[14],m=t[15],p=n[0],P=n[1],E=n[2],O=n[3],x=n[4],A=n[5],q=n[6],y=n[7],w=n[8],R=n[9],L=n[10],S=n[11],_=n[12],I=n[13],N=n[14],Y=n[15];return Math.abs(r-p)<=C.EPSILON*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(a-P)<=C.EPSILON*Math.max(1,Math.abs(a),Math.abs(P))&&Math.abs(e-E)<=C.EPSILON*Math.max(1,Math.abs(e),Math.abs(E))&&Math.abs(u-O)<=C.EPSILON*Math.max(1,Math.abs(u),Math.abs(O))&&Math.abs(o-x)<=C.EPSILON*Math.max(1,Math.abs(o),Math.abs(x))&&Math.abs(i-A)<=C.EPSILON*Math.max(1,Math.abs(i),Math.abs(A))&&Math.abs(s-q)<=C.EPSILON*Math.max(1,Math.abs(s),Math.abs(q))&&Math.abs(c-y)<=C.EPSILON*Math.max(1,Math.abs(c),Math.abs(y))&&Math.abs(f-w)<=C.EPSILON*Math.max(1,Math.abs(f),Math.abs(w))&&Math.abs(M-R)<=C.EPSILON*Math.max(1,Math.abs(M),Math.abs(R))&&Math.abs(h-L)<=C.EPSILON*Math.max(1,Math.abs(h),Math.abs(L))&&Math.abs(l-S)<=C.EPSILON*Math.max(1,Math.abs(l),Math.abs(S))&&Math.abs(v-_)<=C.EPSILON*Math.max(1,Math.abs(v),Math.abs(_))&&Math.abs(d-I)<=C.EPSILON*Math.max(1,Math.abs(d),Math.abs(I))&&Math.abs(b-N)<=C.EPSILON*Math.max(1,Math.abs(b),Math.abs(N))&&Math.abs(m-Y)<=C.EPSILON*Math.max(1,Math.abs(m),Math.abs(Y))}Object.defineProperty(n,"__esModule",{value:!0}),n.sub=n.mul=void 0,n.create=a,n.clone=e,n.copy=u,n.fromValues=o,n.set=i,n.identity=s,n.transpose=c,n.invert=f,n.adjoint=M,n.determinant=h,n.multiply=l,n.translate=v,n.scale=d,n.rotate=b,n.rotateX=m,n.rotateY=p,n.rotateZ=P,n.fromTranslation=E,n.fromScaling=O,n.fromRotation=x,n.fromXRotation=A,n.fromYRotation=q,n.fromZRotation=y,n.fromRotationTranslation=w,n.getTranslation=R,n.getScaling=L,n.getRotation=S,n.fromRotationTranslationScale=_,n.fromRotationTranslationScaleOrigin=I,n.fromQuat=N,n.frustum=Y,n.perspective=g,n.perspectiveFromFieldOfView=T,n.ortho=j,n.lookAt=D,n.targetTo=V,n.str=z,n.frob=F,n.add=Q,n.subtract=X,n.multiplyScalar=Z,n.multiplyScalarAndAdd=k,n.exactEquals=U,n.equals=W;var B=r(0),C=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(B);n.mul=l,n.sub=X},function(t,n,r){"use strict";function a(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}function e(){var t=new E.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function u(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function o(t,n,r){r*=.5;var a=Math.sin(r);return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=Math.cos(r),t}function i(t,n){var r=2*Math.acos(n[3]),a=Math.sin(r/2);return 0!=a?(t[0]=n[0]/a,t[1]=n[1]/a,t[2]=n[2]/a):(t[0]=1,t[1]=0,t[2]=0),r}function s(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],s=r[1],c=r[2],f=r[3];return t[0]=a*f+o*i+e*c-u*s,t[1]=e*f+o*s+u*i-a*c,t[2]=u*f+o*c+a*s-e*i,t[3]=o*f-a*i-e*s-u*c,t}function c(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+o*i,t[1]=e*s+u*i,t[2]=u*s-e*i,t[3]=o*s-a*i,t}function f(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s-u*i,t[1]=e*s+o*i,t[2]=u*s+a*i,t[3]=o*s-e*i,t}function M(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),s=Math.cos(r);return t[0]=a*s+e*i,t[1]=e*s-a*i,t[2]=u*s+o*i,t[3]=o*s-u*i,t}function h(t,n){var r=n[0],a=n[1],e=n[2];return t[0]=r,t[1]=a,t[2]=e,t[3]=Math.sqrt(Math.abs(1-r*r-a*a-e*e)),t}function l(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],s=r[0],c=r[1],f=r[2],M=r[3],h=void 0,l=void 0,v=void 0,d=void 0,b=void 0;return l=e*s+u*c+o*f+i*M,l<0&&(l=-l,s=-s,c=-c,f=-f,M=-M),1-l>1e-6?(h=Math.acos(l),v=Math.sin(h),d=Math.sin((1-a)*h)/v,b=Math.sin(a*h)/v):(d=1-a,b=a),t[0]=d*e+b*s,t[1]=d*u+b*c,t[2]=d*o+b*f,t[3]=d*i+b*M,t}function v(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u,i=o?1/o:0;return t[0]=-r*i,t[1]=-a*i,t[2]=-e*i,t[3]=u*i,t}function d(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t}function b(t,n){var r=n[0]+n[4]+n[8],a=void 0;if(r>0)a=Math.sqrt(r+1),t[3]=.5*a,a=.5/a,t[0]=(n[5]-n[7])*a,t[1]=(n[6]-n[2])*a,t[2]=(n[1]-n[3])*a;else{var e=0;n[4]>n[0]&&(e=1),n[8]>n[3*e+e]&&(e=2);var u=(e+1)%3,o=(e+2)%3;a=Math.sqrt(n[3*e+e]-n[3*u+u]-n[3*o+o]+1),t[e]=.5*a,a=.5/a,t[3]=(n[3*u+o]-n[3*o+u])*a,t[u]=(n[3*u+e]+n[3*e+u])*a,t[o]=(n[3*o+e]+n[3*e+o])*a}return t}function m(t,n,r,a){var e=.5*Math.PI/180;n*=e,r*=e,a*=e;var u=Math.sin(n),o=Math.cos(n),i=Math.sin(r),s=Math.cos(r),c=Math.sin(a),f=Math.cos(a);return t[0]=u*s*f-o*i*c,t[1]=o*i*f+u*s*c,t[2]=o*s*c-u*i*f,t[3]=o*s*f+u*i*c,t}function p(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}Object.defineProperty(n,"__esModule",{value:!0}),n.setAxes=n.sqlerp=n.rotationTo=n.equals=n.exactEquals=n.normalize=n.sqrLen=n.squaredLength=n.len=n.length=n.lerp=n.dot=n.scale=n.mul=n.add=n.set=n.copy=n.fromValues=n.clone=void 0,n.create=e,n.identity=u,n.setAxisAngle=o,n.getAxisAngle=i,n.multiply=s,n.rotateX=c,n.rotateY=f,n.rotateZ=M,n.calculateW=h,n.slerp=l,n.invert=v,n.conjugate=d,n.fromMat3=b,n.fromEuler=m,n.str=p;var P=r(0),E=a(P),O=r(1),x=a(O),A=r(2),q=a(A),y=r(3),w=a(y),R=(n.clone=w.clone,n.fromValues=w.fromValues,n.copy=w.copy,n.set=w.set,n.add=w.add,n.mul=s,n.scale=w.scale,n.dot=w.dot,n.lerp=w.lerp,n.length=w.length),L=(n.len=R,n.squaredLength=w.squaredLength),S=(n.sqrLen=L,n.normalize=w.normalize);n.exactEquals=w.exactEquals,n.equals=w.equals,n.rotationTo=function(){var t=q.create(),n=q.fromValues(1,0,0),r=q.fromValues(0,1,0);return function(a,e,u){var i=q.dot(e,u);return i<-.999999?(q.cross(t,n,e),q.len(t)<1e-6&&q.cross(t,r,e),q.normalize(t,t),o(a,t,Math.PI),a):i>.999999?(a[0]=0,a[1]=0,a[2]=0,a[3]=1,a):(q.cross(t,e,u),a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=1+i,S(a,a))}}(),n.sqlerp=function(){var t=e(),n=e();return function(r,a,e,u,o,i){return l(t,a,o,i),l(n,e,u,i),l(r,t,n,2*i*(1-i)),r}}(),n.setAxes=function(){var t=x.create();return function(n,r,a,e){return t[0]=a[0],t[3]=a[1],t[6]=a[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],S(n,b(n,t))}}()},function(t,n,r){"use strict";function a(){var t=new V.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t}function e(t){var n=new V.ARRAY_TYPE(2);return n[0]=t[0],n[1]=t[1],n}function u(t,n){var r=new V.ARRAY_TYPE(2);return r[0]=t,r[1]=n,r}function o(t,n){return t[0]=n[0],t[1]=n[1],t}function i(t,n,r){return t[0]=n,t[1]=r,t}function s(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t}function c(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t}function f(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t}function M(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t}function h(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t}function l(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t}function v(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t}function d(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t}function b(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t}function m(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t}function p(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t}function P(t,n){var r=n[0]-t[0],a=n[1]-t[1];return Math.sqrt(r*r+a*a)}function E(t,n){var r=n[0]-t[0],a=n[1]-t[1];return r*r+a*a}function O(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)}function x(t){var n=t[0],r=t[1];return n*n+r*r}function A(t,n){return t[0]=-n[0],t[1]=-n[1],t}function q(t,n){return t[0]=1/n[0],t[1]=1/n[1],t}function y(t,n){var r=n[0],a=n[1],e=r*r+a*a;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e),t}function w(t,n){return t[0]*n[0]+t[1]*n[1]}function R(t,n,r){var a=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=a,t}function L(t,n,r,a){var e=n[0],u=n[1];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t}function S(t,n){n=n||1;var r=2*V.RANDOM()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t}function _(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e,t[1]=r[1]*a+r[3]*e,t}function I(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e+r[4],t[1]=r[1]*a+r[3]*e+r[5],t}function N(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[3]*e+r[6],t[1]=r[1]*a+r[4]*e+r[7],t}function Y(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[4]*e+r[12],t[1]=r[1]*a+r[5]*e+r[13],t}function g(t){return"vec2("+t[0]+", "+t[1]+")"}function T(t,n){return t[0]===n[0]&&t[1]===n[1]}function j(t,n){var r=t[0],a=t[1],e=n[0],u=n[1];return Math.abs(r-e)<=V.EPSILON*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(a-u)<=V.EPSILON*Math.max(1,Math.abs(a),Math.abs(u))}Object.defineProperty(n,"__esModule",{value:!0}),n.forEach=n.sqrLen=n.sqrDist=n.dist=n.div=n.mul=n.sub=n.len=void 0,n.create=a,n.clone=e,n.fromValues=u,n.copy=o,n.set=i,n.add=s,n.subtract=c,n.multiply=f,n.divide=M,n.ceil=h,n.floor=l,n.min=v,n.max=d,n.round=b,n.scale=m,n.scaleAndAdd=p,n.distance=P,n.squaredDistance=E,n.length=O,n.squaredLength=x,n.negate=A,n.inverse=q,n.normalize=y,n.dot=w,n.cross=R,n.lerp=L,n.random=S,n.transformMat2=_,n.transformMat2d=I,n.transformMat3=N,n.transformMat4=Y,n.str=g,n.exactEquals=T,n.equals=j;var D=r(0),V=function(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n.default=t,n}(D);n.len=O,n.sub=c,n.mul=f,n.div=M,n.dist=P,n.sqrDist=E,n.sqrLen=x,n.forEach=function(){var t=a();return function(n,r,a,e,u,o){var i=void 0,s=void 0;for(r||(r=2),a||(a=0),s=e?Math.min(e*r+a,n.length):n.length,i=a;i<s;i+=r)t[0]=n[i],t[1]=n[i+1],u(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}()}])});
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedShaderInfo`,
        description : `
            - RedShaderInfo 인스턴스 생성자
            - <b>유일키</b>만 지원.
            - <b>단 프레그먼트/버텍스의 키는 따로 관리함.</b>
            - 쉐이더정보는 <b>Object.freeze</b> 상태로 반환됨.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            type : [
                {type:'String'},
                '- 버텍스 쉐이더(RedShaderInfo.VERTEX_SHADER)',
                '- 프레그먼트 쉐이더(RedShaderInfo.FRAGMENT_SHADER)'
            ],
            source : [
                {type:'String'},
                '- 생성할 쉐이더 소스문자열'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, 쉐이더소스)
        `,
        return : 'RedShaderInfo Instance'
    }
:DOC*/
var RedShaderInfo;
(function () {
    var parseData;
    var tGL;
    var tShader;
    var tDatas;
    RedShaderInfo = function (redGL, key, type, source) {
        if (!(this instanceof RedShaderInfo)) return new RedShaderInfo(redGL, key, type, source)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (typeof type != 'string') throw 'type - 문자열만 허용됩니다.'
        if (typeof source != 'string') throw 'source - 문자열만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['shaderInfo']) {
            redGL['__datas']['shaderInfo'] = {}
            redGL['__datas']['shaderInfo'][RedShaderInfo.FRAGMENT_SHADER] = {}
            redGL['__datas']['shaderInfo'][RedShaderInfo.VERTEX_SHADER] = {}
        }
        tDatas = redGL['__datas']['shaderInfo']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[type][key]) throw key + '는 '+type+'정보에 이미 존재하는 RedShaderInfo 입니다.'
        tGL = redGL.gl
        // 쉐이더생성
        switch (type) {
            case RedShaderInfo.VERTEX_SHADER:
                tShader = tGL.createShader(tGL.VERTEX_SHADER);
                break
            case RedShaderInfo.FRAGMENT_SHADER:
                tShader = tGL.createShader(tGL.FRAGMENT_SHADER);
                break
            default:
                throw '쉐이더 타입을 확인하세요!'
                break
        }
        tGL.shaderSource(tShader, source)
        tGL.compileShader(tShader)
        if (!tGL.getShaderParameter(tShader, tGL.COMPILE_STATUS)) {
            console.log(tGL.getShaderInfoLog(tShader))
            throw '쉐이더 컴파일에 실패하였습니다.';
        }
        parseData = source.match(/.attribute[\s\S]+?\;|.uniform[\s\S]+?\;/g)
        parseData.forEach(function (v, index) {
            parseData[index] = v.trim().replace(';', '').split('[')[0]
        })
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`type`,
			description : `RedShaderInfo.VERTEX_SHADER or RedShaderInfo.FRAGMENT_SHADER`,
			example : `인스턴스.type`,
			return : 'String'
		}
	    :DOC*/
        this['type'] = type
        /**DOC:
		{
            title :`shader`,
			description : `실제 쉐이더`,
			example : `인스턴스.shader`,
			return : 'String'
		}
	    :DOC*/
        this['shader'] = tShader
        /**DOC:
		{
            title :`parseData`,
			description : `쉐이더소스 내부의 attribute와 uniform정보를 추출하여 가짐.(인스턴스.parseData)`,
			example : `인스턴스.parseData`,
			return : 'String'
		}
	    :DOC*/
        this['parseData'] = parseData
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[type][key] = this
        Object.freeze(this)
        // console.log(this)
    }
    /**DOC:
		{
            title :`FRAGMENT_SHADER`,
            code: 'CONST',
			description : `
				프레그먼트 쉐이더 상수.
			`,
			example : `
				RedShaderInfo.FRAGMENT_SHADER
			`,
			return : 'String'
		}
	:DOC*/
    RedShaderInfo.FRAGMENT_SHADER = 'fragmentShader'
    /**DOC:
		{
            title :`VERTEX_SHADER`,
            code: 'CONST',
			description : `
				버텍스 쉐이더 상수.
			`,
			example : `
				RedShaderInfo.FRAGMENT_SHADER
			`,
			return : 'String'
		}
	:DOC*/
    RedShaderInfo.VERTEX_SHADER = 'vertexShader'
    Object.freeze(RedShaderInfo)
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedProgramInfo`,
        description : `
            - RedProgramInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 기존 캐싱된 프로그램 정보를 반환함.
            - 프로그램 정보는 <b>Object.freeze</b> 상태로 반환됨.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            vShaderInfo : [
                {type:'RedShaderInfo'}
            ],
            fShaderInfo : [
                {type:'RedShaderInfo'}
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            test.createProgramInfo(
                'basic',
                test.getShaderInfo('basic', RedProgramInfo.VERTEX_SHADER),
                test.getShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER)
            )
        `,
        return : 'RedProgramInfo Instance'
    }
:DOC*/
var RedProgramInfo;
(function () {
    var tGL;
    var tDatas;
    var tProgram;
    var info;
    var self;
    var tList;
    tList = []
    RedProgramInfo = function (redGL, key, vShaderInfo, fShaderInfo, makeUniformValue) {
        if (!(this instanceof RedProgramInfo)) return new RedProgramInfo(redGL, key, vShaderInfo, fShaderInfo, makeUniformValue)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if( !makeUniformValue) throw 'makeUniformValue - 반드시 정의해야합니다.'
        if (!vShaderInfo instanceof RedShaderInfo) throw 'vShaderInfo - RedShaderInfo만 허용됩니다.'
        if (!fShaderInfo instanceof RedShaderInfo) throw 'fShaderInfo - RedShaderInfo만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedProgramInfo']) {
            redGL['__datas']['RedProgramInfo'] = {}
        }
        tDatas = redGL['__datas']['RedProgramInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) return console.log('캐싱프로그램 리턴!', key), tDatas[key]
        tGL = redGL.gl
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`attributes`,
			description : `쉐이더에 등록된 attribute 정보들`,
			example : `인스턴스.attributes`,
			return : 'Object'
		}
	    :DOC*/
        this['attributes'] = {}
        /**DOC:
		{
            title :`uniforms`,
			description : `쉐이더에 등록된 uniform 정보들`,
			example : `인스턴스.uniforms`,
			return : 'Object'
		}
	    :DOC*/
        this['uniforms'] = {}
        self = this;
        // 프로그램생성!
        tProgram = tGL.createProgram();
        tGL.attachShader(tProgram, vShaderInfo['shader'])
        tGL.attachShader(tProgram, fShaderInfo['shader'])
        tGL.linkProgram(tProgram)
        // 프로그램 링크 확인
        if (!tGL.getProgramParameter(tProgram, tGL.LINK_STATUS)) throw "프로그램을 초기화 할 수 없습니다." +
        tGL.useProgram(tProgram);
        info = {}
        tList.length = 0
        tList.push(vShaderInfo, fShaderInfo)
        tList.forEach(function (data) {
            if (data['parseData']) {
                data['parseData'].forEach(function (v) {
                    var tInfo;
                    tInfo = {}
                    v = v.split(' ')
                    if (v[0] == 'attribute') {
                        tInfo['location'] = tGL.getAttribLocation(tProgram, v[2]);
                        self['attributes'][v[2]] = tInfo
                    } else {
                        tInfo['location'] = tGL.getUniformLocation(tProgram, v[2]);
                        self['uniforms'][v[2]] = tInfo
                    }
                })
            }
        });
        /**DOC:
		{
            title :`program`,
			description : `실제 프로그램`,
			example : `인스턴스.program`,
			return : 'WebGLProgram'
		}
	    :DOC*/
        this['program'] = tProgram
        /**DOC:
		{
            title :`shaderInfos`,
			description : `프로그램에 사용된 RedShaderInfo정보`,
			example : `인스턴스.shaderInfos`,
			return : 'Object'
		}
	    :DOC*/
        this['shaderInfos'] = {
            vShaderInfo: vShaderInfo,
            fShaderInfo: fShaderInfo
        }
        this['__UUID'] = REDGL_UUID++
        /**DOC:
		{
            title :`makeUniformValue`,
            description : `
             - 재질마다 필요한 유니폼에대한 정의를 내리는 함수.
             - RedMaterialDefine에 의해 재질을 정의할때 이 함수가 호출되어 재질이 알고있어야 할 유니폼정보가 추가된다. 
            `,
			example : `인스턴스.makeUniformValue`,
			return : 'Object'
		}
	    :DOC*/
        this['makeUniformValue'] = makeUniformValue
        // 캐싱
        tDatas[key] = this
        Object.freeze(this)
        // console.log(this)
    }

    Object.freeze(RedProgramInfo)
})();
"use strict";
var RedBaseCamera;
/**DOC:
    {
        constructorYn : true,
        title :`RedBaseCamera`,
        description : `
            - RedBaseCamera 가장 기본적인 카메라 생성기
        `,
        return : 'RedBaseCamera Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedBaseCamera = function (redGL, key) {
        if (!(this instanceof RedBaseCamera)) return new RedBaseCamera(redGL, key)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key는 문자열만 허용됩니다.'
        var aspect
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedBaseCamera']) redGL['__datas']['RedBaseCamera'] = {}
        tDatas = redGL['__datas']['RedBaseCamera']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedBaseCamera 입니다.'
        /**DOC:
            {
                title :`uPMatrix`,
                code : 'PROPERTY',
                description : `
                    - 퍼스펙티브 매트릭스
                    - 고정유니폼으로서 쉐이더내에 uPMatrix 유니폼과 연동된다.
                `,
                return : 'mat4(Float32Arrat)'
            }
        :DOC*/
        Object.defineProperty(this,'uPMatrix',{
            value : mat4.create(),
            enumerable : true
        })
        /**DOC:
            {
                title :`uCameraMatrix`,
                description : `
                    - 카메라 매트릭스
                    - 고정유니폼으로서 쉐이더내에 uCameraMatrix 유니폼과 연동된다.
                `,
                return : 'mat4(Float32Arrat)'
            }
        :DOC*/
        Object.defineProperty(this,'uCameraMatrix',{
            value : mat4.create(),
            enumerable : true
        })
        /**DOC:
            {
                title :`fov`,
                description : `
                    - 카메라 fov
                    - 기본값 45(실제 연산시에는 라디안으로 적용해서 계산됨)
                `,
                return : 'Number'
            }
        :DOC*/
        this['fov'] = 45
        /**DOC:
            {
                title :`aspect`,
                description : `- 카메라 aspect`,
                return : 'Number'
            }
        :DOC*/
        this['aspect'] = 0.1;
        /**DOC:
            {
                title :`near`,
                description : `
                    - 카메라 near
                    - 기본값 0.1
                `,
                return : 'Number'
            }
        :DOC*/
        this['near'] = 0.1
        /**DOC:
            {
                title :`far`,
                description : `
                    - 카메라 far
                    - 기본값 1000.0
                `,
                return : 'Number'
            }
        :DOC*/
        this['far'] = 1000.0
        Object.defineProperty(this,'__desiredCoords',{
            value : new Float32Array([0, 0, 0]),
            enumerable : true
        })
        Object.defineProperty(this,'__desiredRotation',{
            value : new Float32Array([0, 0, 0]),
            enumerable : true
        })
        this['__UUID'] = REDGL_UUID++
        this['__canvas'] = redGL.__canvas
        this.update()
        // 캐싱
        tDatas[key] = this
    }
    var tempRotationMTX = mat4.create()
    RedBaseCamera.prototype = {
        /**DOC:
            {
                title :`setPosition`,
                code : 'FUNCTION',
                description : `
                    - 포지션 설정매서드.
                `,
                params : {
                    x : [
                        {type:'Number'},
                        `x포지션`
                    ],
                    y : [
                        {type:'Number'},
                        `y포지션`
                    ],
                    z : [
                        {type:'Number'},
                        `z포지션`
                    ]
                },
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        setPosition: function (x, y, z) {
            this['__desiredCoords'][0] = x
            this['__desiredCoords'][1] = y
            this['__desiredCoords'][2] = z
            return this
        },
        /**DOC:
            {
                title :`moveForward`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 앞으로 이동
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        moveForward: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveBack`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 뒤로 이동
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        moveBack: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveLeft`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 왼쪽으로 이동
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        moveLeft: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveRight`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 오른쪽으로 이동
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        moveRight: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveUp`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 위로 이동
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        moveUp: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveDown`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 아래로 이동
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        moveDown: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`lookAt`,
                code : 'FUNCTION',
                description : `
                    - 카메라가 targetPosition을 바라보게 설정함.
                `,
                params : {
                    targetPosition : [
                        {type:'position vec3(Float32Array)'},
                        `바라볼 포지션`
                    ]
                },
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        lookAt: (function () {
            var up = new Float32Array([0, 1, 0]);
            return function (targetPosition) {
                //out, eye, center, up
                mat4.lookAt(this['uCameraMatrix'], this['__desiredCoords'], targetPosition, up);
            }
        })(),
        identity: function () {
            mat4.identity(this['uCameraMatrix'])
        },
        /**DOC:
            {
                title :`update`,
                code : 'FUNCTION',
                description : `
                    - 퍼스팩티브업데이트
                `,
                return : 'RedBaseCamera Instance'
            }
        :DOC*/
        update: (function () {
            return function () {
                // 퍼스펙티브만 관여
                this['aspect'] = this['__canvas'].clientWidth / this['__canvas'].clientHeight
                mat4.identity(this['uPMatrix'])
                mat4.perspective(this['uPMatrix'], this['fov'] * Math.PI / 180, this['aspect'], this['near'], this['far'])
                return this
            }
        })()
    }
    Object.freeze(RedBaseCamera)
})();
"use strict";
var RedCubeTextureInfo;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedCubeTextureInfo`,
			description : `
				- Cube 텍스쳐 생성기
				- <h1>실험중...이거하면서 프레임버퍼도 생성해봐야곘군..</h1>
				- 큐브맵은 tGL.TEXTURE2 인덱스를 전용으로 쓴다.
			`,
			return : 'RedCubeTextureInfo Instance'
		}
	:DOC*/
	RedCubeTextureInfo = function (redGL, srcList) {
		if (!(this instanceof RedCubeTextureInfo)) return new RedCubeTextureInfo(redGL, srcList)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (!(srcList instanceof Array)) throw 'srcList는 Array만 허용됩니다.'
		var texture;
		var i;
		var loadedNum ;
		var self;
		self = this
		tGL = redGL.gl
		loadedNum = 0
		
		var i = srcList.length
		this['__imgList'] = []
		while (i--) {
			var img = new Image()
			img.src = srcList[i]
			img.onload = function(){
				loadedNum++
				this.onload = null
				if(loadedNum==6){
					self.__allLoaed(tGL)
				}
			}
			this['__imgList'][i] = img
		}
	
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		this['__targetIndex'] = 0
		// 로딩이 다되었는지
		this['loaded'] = 0
		// 액티브된적이있는지
		this['actived'] = 0
		// 웹지엘 텍스쳐인지
		this['__webglCubeTexture'] = 1
		this['__UUID'] = REDGL_UUID++
		tGL.activeTexture(tGL.TEXTURE0)
		this['texture'] = tGL.createTexture()

	}
	RedCubeTextureInfo.prototype['__allLoaed'] = function () {
		// 로딩상태 플래그를 완료로 설정
		this['loaded'] = 1
		// 타겟인덱스를 설정함		
		this['__targetIndex'] = 2
		console.log(this)
		tGL.activeTexture(tGL.TEXTURE0)
		tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, this['texture'])
		this['__imgList'].forEach(function (img, index) {
			
			// console.log(
			// 	tGL.TEXTURE_CUBE_MAP_POSITIVE_X,
			// 	tGL.TEXTURE_CUBE_MAP_NEGATIVE_X,
			// 	 tGL.TEXTURE_CUBE_MAP_POSITIVE_Y, 
			// 	 tGL.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			// 	  tGL.TEXTURE_CUBE_MAP_POSITIVE_Z,
			// 	   tGL.TEXTURE_CUBE_MAP_NEGATIVE_Z
			// )
			tGL.texImage2D(
				tGL.TEXTURE_CUBE_MAP_POSITIVE_X + index,
				0,
				tGL.RGBA,
				tGL.RGBA,
				tGL.UNSIGNED_BYTE,
				img
			);
		})
		
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR);
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR);
		tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
		tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
		tGL.generateMipmap(tGL.TEXTURE_CUBE_MAP);

	}
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedBufferInfo`,
        description : `
            - RedBufferInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 기존 캐싱된 버퍼 정보를 반환함.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            bufferType : [
                {type:'String'},
                '- 버퍼타입을 지정',
                '- RedBufferInfo.ARRAY_BUFFER or RedBufferInfo.ELEMENT_ARRAY_BUFFER'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            shaderPointerKey : [
                {type:'null or String'},
                '- <b>arrayBuffer일때만 사용</b>',
                '- Shade내의 바인딩될 attribute이름'
            ],
            arrayData : [
                {type:'TypedArray'},
                '버퍼 raw data'
            ],
            pointSize : [
                {type:'Integer'},
                '포인트 구성사이즈'
            ],
            pointNum : [
                {type:'Integer'},
                '포인트 갯수',
                '입력하지않으면 rawData/pointSize로 자동입력'
            ],
            arrayType : [
                {type:'glConst'},
                'ex) gl.FLOAT'
            ],
            normalize : [
                {type:'Boolean'},
                '기본값 : false'
            ],
            stride : [
                {type:'Integer'},
                '기본값 : 0'
            ],
            offset : [
                {type:'Integer'},
                '기본값 : 0'
            ],
            drawMode : [
                {type:'glConst'},
                '기본값 : gl.STATIC_DRAW'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedBufferInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedBufferInfo.FRAGMENT_SHADER, 쉐이더소스)
            test.createProgramInfo(
                'basic',
                test.createShaderInfo('basic', RedBufferInfo.VERTEX_SHADER),
                test.createShaderInfo('basic', RedBufferInfo.FRAGMENT_SHADER)
            )
        `,
        return : 'RedBufferInfo Instance'
    }
:DOC*/
var RedBufferInfo;
(function () {
    var tGL;
    var tDatas;
    var tBufferType;
    var tBuffer;
    RedBufferInfo = function (redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
        if (!(this instanceof RedBufferInfo)) return new RedBufferInfo(redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof bufferType != 'string') throw 'bufferType - 문자열만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (bufferType == RedBufferInfo.ARRAY_BUFFER && typeof shaderPointerKey != 'string') throw 'pointer - 문자열만 허용됩니다.'
        if (typeof pointSize != 'number' || pointSize != parseInt(pointSize)) throw 'pointSize - Integer만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedBufferInfo']) {
            redGL['__datas']['RedBufferInfo'] = {}
        }
        tDatas = redGL['__datas']['RedBufferInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedBufferInfo 입니다.'
        tGL = redGL.gl
        // 버퍼생성!
        tBuffer = tGL.createBuffer();
        tBufferType = bufferType
        switch (bufferType) {
            case RedBufferInfo.ARRAY_BUFFER:
                bufferType = tGL.ARRAY_BUFFER
                if (!(arrayData instanceof Float32Array || arrayData instanceof Float64Array)) {
                    throw 'TypedArray형식을 사용해야합니다.'
                }
                break
            case RedBufferInfo.ELEMENT_ARRAY_BUFFER:
                bufferType = tGL.ELEMENT_ARRAY_BUFFER
                if (
                    !(arrayData instanceof Uint8Array ||
                        arrayData instanceof Uint16Array ||
                        arrayData instanceof Uint32Array ||
                        arrayData instanceof Int8Array ||
                        arrayData instanceof Int16Array ||
                        arrayData instanceof Int32Array)
                ) throw 'TypedArray형식을 사용해야합니다.'
                break
            default:
                throw '지원하지 않는 버퍼타입입니다. '
        }
        tGL.bindBuffer(bufferType, tBuffer);
        tGL.bufferData(bufferType, arrayData, drawMode = drawMode ? drawMode : tGL.STATIC_DRAW);
        // 정보생성
        /**DOC:
		{
            title :`shaderPointerKey`,
			description : `쉐이더연동될 포인터 네임`,
			example : `인스턴스.shaderPointerKey`,
			return : 'Strinf'
        }
        :DOC*/
        this['shaderPointerKey'] = shaderPointerKey
        /**DOC:
		{
            title :`arrayType`,
            description : `
                - 버퍼적용시 전달할 타입드 어레이 타입
                - 입력된 arrayData와 맞지않은 형식일경우..에러방출
            `,
			example : `인스턴스.arrayType`,
			return : 'glConst'
        }
        :DOC*/
        if (arrayType) {
            var passed = false
            if (arrayData instanceof Int8Array) { passed = arrayType == tGL.BYTE }
            else if (arrayData instanceof Uint8Array) { passed = arrayType == tGL.UNSIGNED_BYTE }
            else if (arrayData instanceof Int16Array) { passed = arrayType == tGL.SHORT }
            else if (arrayData instanceof Uint16Array) { passed = arrayType == tGL.UNSIGNED_SHORT }
            else if (arrayData instanceof Int32Array) { passed = arrayType == tGL.INT }
            else if (arrayData instanceof Uint32Array) { passed = arrayType == tGL.UNSIGNED_INT }
            else if (arrayData instanceof Float32Array) { passed = arrayType == tGL.FLOAT }
            if (!passed) throw "arrayData 형식과 arrayType이 맞지않습니다.";
            this['arrayType'] = arrayType
        }
        else throw '버퍼데이터의 형식을 지정해주세요'
        /**DOC:
		{
            title :`pointSize`,
			description : `포인트 구성수`,
			example : `인스턴스.pointSize`,
			return : 'Integer'
        }
        :DOC*/
        if (pointSize) this['pointSize'] = pointSize
        else throw 'pointSize를 입력하세요'
        // 포인트수 

        if (typeof (pointNum = pointNum ? pointNum : arrayData.length / pointSize) != 'number' || pointNum != parseInt(pointNum)) throw 'pointNum - Integer만 허용됩니다.'
        /**DOC:
		{
            title :`pointNum`,
			description : `버퍼의 포인트 전체 갯수`,
			example : `인스턴스.pointNum`,
			return : 'Integer'
		}
	    :DOC*/
        this['pointNum'] = pointNum
        /**DOC:
		{
            title :`normalize`,
			description : `버퍼 적용시 노말라이즈 할지 여부`,
			example : `인스턴스.normalize`,
			return : 'Boolean'
		}
	    :DOC*/
        this['normalize'] = normalize ? normalize : false
        //
        if (typeof (stride = stride ? stride : 0) != 'number' || stride != parseInt(stride)) throw 'stride - Integer만 허용됩니다.' // 0 = move forward size * sizeof(type) each iteration to get the next position
        if (typeof (offset = offset ? offset : 0) != 'number' || offset != parseInt(offset)) throw 'offset - Integer만 허용됩니다.' // start at the beginning of the buffer
        /**DOC:
		{
            title :`stride`,
			description : `0 = move forward size * sizeof(type) each iteration to get the next position`,
			example : `인스턴스.stride`,
			return : 'Integer'
		}
	    :DOC*/
        this['stride'] = stride
        /**DOC:
		{
            title :`offset`,
			description : `start at the beginning of the buffer`,
			example : `인스턴스.offset`,
			return : 'Integer'
		}
	    :DOC*/
        this['offset'] = offset
        /**DOC:
		{
            title :`enabled`,
			description : `버퍼의 로케이션이 활성화 되었는지 여부`,
			example : `인스턴스.enabled`,
			return : 'Boolean'
		}
	    :DOC*/
        this['enabled'] = 0
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`bufferType`,
			description : `RedBufferInfo.ARRAY_BUFFER or RedBufferInfo.ELEMENT_ARRAY_BUFFER`,
			example : `인스턴스.bufferType`,
			return : 'String'
		}
	    :DOC*/
        this['bufferType'] = tBufferType
        /**DOC:
		{
            title :`buffer`,
			description : `실제버퍼`,
			example : `인스턴스.buffer`,
			return : 'WebGLBuffer'
		}
	    :DOC*/
        this['buffer'] = tBuffer
        /**DOC:
		{
            title :`drawMode`,
			description : `그리기모드`,
			example : `인스턴스.drawMode`,
			return : 'glConst'
		}
	    :DOC*/
        this['drawMode'] = drawMode
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    /**DOC:
		{
            title :`ARRAY_BUFFER`,
            code:'CONST',
			description : `ARRAY_BUFFER 지정 상수`,
			example : `RedBufferInfo.ARRAY_BUFFER`,
			return : 'String'
		}
    :DOC*/
    RedBufferInfo.ARRAY_BUFFER = 'arrayBuffer'
    /**DOC:
		{
            title :`ELEMENT_ARRAY_BUFFER`,
            code:'CONST',
			description : `ELEMENT_ARRAY_BUFFER 지정 상수`,
			example : `RedBufferInfo.ELEMENT_ARRAY_BUFFER`,
			return : 'String'
		}
    :DOC*/
    RedBufferInfo.ELEMENT_ARRAY_BUFFER = 'elementArrayBuffer'
    Object.freeze(RedBufferInfo)
})();
"use strict";
var RedDirectionalLightInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedDirectionalLightInfo`,
        description : `
            - RedDirectionalLightInfo 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // firstScene 키로 Scene생성
            RedDirectionalLightInfo(test,RedDirectionalLightInfo.DIRECTIONAL)
        `,
        return : 'RedDirectionalLightInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedDirectionalLightInfo = function (redGL) {
        if (!(this instanceof RedDirectionalLightInfo)) return new RedDirectionalLightInfo(redGL)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedDirectionalLightInfo']) redGL['__datas']['RedDirectionalLightInfo'] = {}
        tDatas = redGL['__datas']['RedDirectionalLightInfo']
        /**DOC:
		{
            title :`type`,
            description : `라이트 타입`,
            code:'PROPERTY',
            example : `인스턴스.type`,
            return : 'String'
        }
        :DOC*/
        this['type'] = RedDirectionalLightInfo['TYPE']
        /**DOC:
		{
            title :`color`,
            description : `라이트 컬러`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32'
        }
        :DOC*/
        this['color'] = new Float32Array([255, 255, 255, 255])
         /**DOC:
		{
            title :`direction`,
            description : `라이트 포지션`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32'
        }
        :DOC*/
        this['direction'] = new Float32Array([0, 0, 0])
       
    }
    RedDirectionalLightInfo['TYPE'] = 'directional'
    Object.freeze(RedDirectionalLightInfo)
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedFixedAttributeKey`,
        description : `
            - 고정 어트리뷰트 상수값     
        `,
        return : 'RedFixedAttributeKey Object'
    }
:DOC*/
var RedFixedAttributeKey;
RedFixedAttributeKey = {
    /**DOC:
    {
        code : 'CONST',
        title :`aVertexPosition`,
        description : `
            - 버텍스 포지션 어트리뷰트 고정키 
        `,
        return : 'aVertexPosition'
    }
    :DOC*/
    aVertexPosition: 'aVertexPosition',
    /**DOC:
    {
        code : 'CONST',
        title :`aTexcoord`,
        description : `
            - uv 어트리뷰트 고정키 
        `,
        return : 'aTexcoord'
    }
    :DOC*/
    aTexcoord: 'aTexcoord',
    /**DOC:
    {
        code : 'CONST',
        title :`aVertexNormal`,
        description : `
            - 노멀 포지션 어트리뷰트 고정키
        `,
        return : 'aVertexNormal'
    }
    :DOC*/
    aVertexNormal: 'aVertexNormal'
}
Object.freeze(RedFixedAttributeKey)
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedGeometryInfo`,
        description : `
            - RedGeometryInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 에러발생         
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            verticesBufferInfo : [
                {type:'RedBufferInfo'},
                '- 버텍스버퍼정보',
                '- RedBufferInfo.ARRAY_BUFFER 타입만가능'
            ],
            indicesBufferInfo : [
                {type:'RedBufferInfo'},
                '- 인덱스버퍼정보',
                '- RedBufferInfo.ELEMENT_ARRAY_BUFFER 타입만가능'
            ],
            texcoordBufferInfo : [
                {type:'RedBufferInfo'},
                '- UV버퍼정보',
                '- RedBufferInfo.ARRAY_BUFFER 타입만가능'
            ],
            normalBufferInfo : [
                {type:'RedBufferInfo'},
                '- normal버퍼정보',
                '- RedBufferInfo.ARRAY_BUFFER 타입만가능'
            ]
        },
        example : `
            //TODO:
        `,
        return : 'RedGeometryInfo Instance'
    }
:DOC*/
var RedGeometryInfo;
(function () {
    var tGL;
    var tDatas;
    var k;
    RedGeometryInfo = function (redGL, key, verticesBufferInfo, indicesBufferInfo, texcoordBufferInfo, normalBufferInfo) {
        if (!(this instanceof RedGeometryInfo)) return new RedGeometryInfo(redGL, key, verticesBufferInfo, indicesBufferInfo, texcoordBufferInfo, normalBufferInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (verticesBufferInfo && !(verticesBufferInfo instanceof RedBufferInfo)) throw 'verticesBufferInfo는 RedBufferInfo만 가능합니다.'
        if (indicesBufferInfo && !(indicesBufferInfo instanceof RedBufferInfo)) throw 'indicesBufferInfo RedBufferInfo만 가능합니다.'
        if (texcoordBufferInfo && !(texcoordBufferInfo instanceof RedBufferInfo)) throw 'texcoordBufferInfo RedBufferInfo만 가능합니다.'
        if (normalBufferInfo && !(normalBufferInfo instanceof RedBufferInfo)) throw 'normalBufferInfo RedBufferInfo만 가능합니다.'
        //
        if (verticesBufferInfo && verticesBufferInfo.bufferType != RedBufferInfo.ARRAY_BUFFER) throw 'verticesBufferInfo ARRAY_BUFFER 가능합니다.'
        if (indicesBufferInfo && indicesBufferInfo.bufferType != RedBufferInfo.ELEMENT_ARRAY_BUFFER) throw 'indicesBufferInfo는 ELEMENT_ARRAY_BUFFER만 가능합니다.'
        if (texcoordBufferInfo && texcoordBufferInfo.bufferType != RedBufferInfo.ARRAY_BUFFER) throw 'texcoordBufferInfo ARRAY_BUFFER 가능합니다.'
        if (normalBufferInfo && normalBufferInfo.bufferType != RedBufferInfo.ARRAY_BUFFER) throw 'normalBufferInfo ARRAY_BUFFER 가능합니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedGeometryInfo']) {
            redGL['__datas']['RedGeometryInfo'] = {}
        }
        tDatas = redGL['__datas']['RedGeometryInfo']
        // 기존에 등록된 녀석이면 재생성X
        if (tDatas[key]) throw key + '는 이미 존재하는 RedGeometryInfo 입니다.'
        tGL = redGL.gl
        // 지오메트리생성!!
        /**DOC:
		{
            title :`attributes`,
            description : `
                - attribute Buffer 정보들
                - vertexPosition,texcoord,normal 정보를 가진다.(존재하지 않을경우 키 자체가 없다.)
            `,
			example : `인스턴스.attributes`,
			return : 'Object'
        }
        :DOC*/
        this.attributes = {
            // vertexPosition: null, //이넘 고유키값
            // texcoord: null, //이넘 고유키값
            // normal : null //이넘 고유키값
        }
        /**DOC:
		{
            title :`indices`,
			description : `indices Buffer 정보`,
			example : `인스턴스.indices`,
			return : 'RedbufferInfo'
        }
        :DOC*/
        this.indices = null
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        if (verticesBufferInfo) {
            if(verticesBufferInfo['shaderPointerKey'] == RedFixedAttributeKey['aVertexPosition']) this['attributes']['vertexPosition'] = verticesBufferInfo // 버텍스버퍼
            else throw 'verticesBufferInfo의 shaderPointerKey는 aVertexPosition만 가질수있습니다.'
        }
        if (texcoordBufferInfo) {
            if(texcoordBufferInfo['shaderPointerKey'] == RedFixedAttributeKey['aTexcoord']) this['attributes']['texcoord'] = texcoordBufferInfo // 코디네이트버퍼
            else throw 'texcoordBufferInfo의 shaderPointerKey는 aTexcoord만 가질수있습니다.'
        }
        if (normalBufferInfo) {
            if(normalBufferInfo['shaderPointerKey'] == RedFixedAttributeKey['aVertexNormal']) this['attributes']['normal'] = normalBufferInfo // 노말버퍼
            else throw 'normalBufferInfo의 shaderPointerKey는 aVertexNormal만 가질수있습니다.'
        }
        //
        this['__attributeList'] = []
        for (k in this['attributes']) {
            this['__attributeList'].push(this['attributes'][k])
        }
        //
        this['indices'] = indicesBufferInfo
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
    }
    Object.freeze(RedGeometryInfo)
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshInfo`,
        description : `
            <h2>RedMeshBaseInfo 상속객체</h2>
            - RedGL에서 사용할 재질정보를 정의
            - 타입키에 해당하는 정의가 존재하지않을경우 에러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 고유키',
                '- <span style="color:red"><b>입력하지않으면 그냥 UUID를 생성해버릴까..</b></span>'
            ],
            geometryInfo : [
                {type:'RedGeometryInfo'},
                '- 지오메트리정보'
            ],
            materialInfo : [
                {type:'RedMaterialInfo'},
                '- 재질정보'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            RedMeshInfo(test, 'firstMesh',geometryInfo, materialInfo)
        `,
        return : 'RedMeshInfo Instance'
    }
:DOC*/
var RedMeshInfo;
(function () {
    var tGL;
    var tDatas;
    RedMeshInfo = function (redGL, key, geometryInfo, materialInfo) {
        if (!(this instanceof RedMeshInfo)) return new RedMeshInfo(redGL, key, geometryInfo, materialInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (!(geometryInfo instanceof RedGeometryInfo)) throw 'geometryInfo - RedGeometryInfo만 허용됩니다.'
        if (!(materialInfo instanceof RedMaterialInfo)) throw 'materialInfo - RedMaterialInfo만 허용됩니다.'
        tGL = redGL.gl
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedMeshInfo']) redGL['__datas']['RedMeshInfo'] = {}
        tDatas = redGL['__datas']['RedMeshInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedMeshInfo 입니다.'
        RedMeshBaseInfo.call(this, redGL)
        /**DOC:
		{
            title :`geometryInfo`,
            description : `
                - 메쉬가 소유하고있는 geometryInfo
            `,
			example : `인스턴스.geometryInfo`,
			return : 'RedGeometryInfo'
        }
        :DOC*/
        this['geometryInfo'] = geometryInfo
        /**DOC:
		{
            title :`materialInfo`,
            description : `
                - 메쉬가 소유하고있는 materialInfo
            `,
			example : `인스턴스.materialInfo`,
			return : 'RedMaterialInfo'
        }
        :DOC*/
        this['materialInfo'] = materialInfo
        // 캐싱
        tDatas[key] = this
    }
    Object.freeze(RedMeshInfo)
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshBaseInfo`,
        description : `
            - 메쉬에 기본적으로 필요한 정보세팅
            - 시스템적으로 호출
        `,
        return : 'RedMeshBaseInfo Instance'
    }
:DOC*/
var RedMeshBaseInfo;
(function () {
    var tGL
    RedMeshBaseInfo = function (redGL) {
        tGL = redGL.gl
         /**DOC:
		{
            title :`uMVMatrix`,
            description : `
                - modelView Matrix를 반환
                - <span style="color:red"><b>uMVMatrix라는 키값은 쉐이더에서 사용되는 고정값이다.</b></span>
            `,
			example : `인스턴스.uMVMatrix`,
			return : 'mat4(Float32Array)'
        }
        :DOC*/
        Object.defineProperty(this,'uMVMatrix',{
            value : mat4.create(),
            enumerable : true
        })
         /**DOC:
		{
            title :`uNMatrix`,
            description : `
                - modelView 노멀 Matrix를 반환
                - <span style="color:red"><b>uNMatrix라는 키값은 쉐이더에서 사용되는 고정값이다.</b></span>
            `,
			example : `인스턴스.uNMatrix`,
			return : 'mat4(Float32Array)'
        }
        :DOC*/
        Object.defineProperty(this,'uNMatrix',{
            value : mat4.create(),
            enumerable : true
        })
        /**DOC:
		{
            title :`position`,
            description : `
                - positionXYZ를 Float32Array로 가진다.
            `,
			example : `인스턴스.position`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        Object.defineProperty(this,'position',{
            value : new Float32Array([0, 0, 0]),
            enumerable : true
        })
        // this['position'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`rotation`,
            description : `
                - rotationXYZ를 Float32Array로 가진다.
            `,
			example : `인스턴스.rotation`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        Object.defineProperty(this,'rotation',{
            value : new Float32Array([0, 0, 0]),
            enumerable : true
        })
        /**DOC:
		{
            title :`scale`,
            description : `
                - scaleXYZ를 Float32Array로 가진다.
            `,
			example : `인스턴스.rotation`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        Object.defineProperty(this,'scale',{
            value : new Float32Array([1, 1, 1]),
            enumerable : true
        })
        /**DOC:
		{
            title :`geometryInfo`,
            description : `
                - 메쉬가 소유하고있는 geometryInfo
            `,
			example : `인스턴스.geometryInfo`,
			return : 'RedGeometryInfo'
        }
        :DOC*/
        this['geometryInfo'] = null
        /**DOC:
		{
            title :`materialInfo`,
            description : `
                - 메쉬가 소유하고있는 materialInfo
            `,
			example : `인스턴스.materialInfo`,
			return : 'RedMaterialInfo'
        }
        :DOC*/
        this['materialInfo'] = null
        /**DOC:
		{
            title :`drawMode`,
            description : `
                - 실제 메쉬를 그릴때 어떠한 방식으로 그릴지 결정
                - ex) gl.TRIANGLES
            `,
			example : `인스턴스.drawMode`,
			return : 'glConst'
        }
        :DOC*/
        this['drawMode'] = tGL.TRIANGLES
         /**DOC:
		{
            title :`useCullFace`,
            description : `
                - 실제 메쉬를 그릴때 cullFace를 사용할지 여부
                - 기본값 : true
            `,
			example : `인스턴스.useCullFace`,
			return : 'boolean'
        }
        :DOC*/
        this['useCullFace'] = true
        /**DOC:
		{
            title :`cullFace`,
            description : `
                - 실제 메쉬를 그릴때 cullFace를 어떤 방식으로 그릴지 결정
                - 기본값 : gl.BACK
            `,
			example : `인스턴스.cullFace`,
			return : 'glConst'
        }
        :DOC*/
        this['cullFace'] = tGL.BACK 
        /**DOC:
		{
            title :`useBlendMode`,
            description : `
                - draw시 블렌드모드 사용여부
                - 기본값 : true
            `,
			example : `인스턴스.useBlendMode`,
			return : 'boolean'
        }
        :DOC*/
        this['useBlendMode'] = true
        /**DOC:
		{
            title :`blendFactor1`,
            description : `
                - draw시 blendFactor1
            `,
			example : `인스턴스.blendFactor1`,
			return : 'glConst'
        }
        :DOC*/
        this['blendFactor1'] = tGL.ONE
        /**DOC:
		{
            title :`blendFactor2`,
            description : `
                - draw시 blendFactor2
            `,
			example : `인스턴스.blendFactor2`,
			return : 'glConst'
        }
        :DOC*/
        this['blendFactor2'] = tGL.ONE_MINUS_SRC_ALPHA
        /**DOC:
		{
            title :`useDepthTest`,
            description : `
                - draw시 depthTest 사용여부
                - 기본값 : true
            `,
			example : `인스턴스.useDepthTest`,
			return : 'boolean'
        }
        :DOC*/
        this['useDepthTest'] = true
        /**DOC:
		{
            title :`depthTestFunc`,
            description : `
                - depthTest 옵션
                - 기본값 : tGL.LESS
            `,
			example : `인스턴스.depthTestFunc`,
			return : 'glConst'
        }
        :DOC*/
        this['depthTestFunc'] = tGL.LESS
        /**DOC:
		{
            title :`children`,
            description : `
                - 자식노드리스트
            `,
			example : `인스턴스.children`,
			return : 'Array'
        }
        :DOC*/
        // 캐싱
        this['children'] = []
        this['__UUID'] = REDGL_UUID++
    }
    Object.freeze(RedMeshBaseInfo)
})();
"use strict";
var RedPrimitive;
/**DOC:
    {
        constructorYn : true,
        title :`RedPrimitive`,
        description : `
            - RedPrimitive 생성기
        `,
        return : 'RedPrimitive Instance'
    }
:DOC*/
(function () {
    var tType;
    var tDatas;;
    var createGeo;
    var checkShareInfo;
    var calculateNormals = function(vs, ind){
        var x=0; 
        var y=1;
        var z=2;
        
        var ns = [];
        for(var i=0;i<vs.length;i=i+3){ //for each vertex, initialize normal x, normal y, normal z
            ns[i+x]=0.0;
            ns[i+y]=0.0;
            ns[i+z]=0.0;
        }
        
        for(var i=0;i<ind.length;i=i+3){ //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
            var v1 = [];
            var v2 = [];
            var normal = [];	
            //p2 - p1
            v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
            v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
            v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
            //p0 - p1
            v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
            v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
            v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
            //cross product by Sarrus Rule
            normal[x] = v1[y]*v2[z] - v1[z]*v2[y];
            normal[y] = v1[z]*v2[x] - v1[x]*v2[z];
            normal[z] = v1[x]*v2[y] - v1[y]*v2[x];
            for(j=0;j<3;j++){ //update the normals of that triangle: sum of vectors
                ns[3*ind[i+j]+x] =  ns[3*ind[i+j]+x] + normal[x];
                ns[3*ind[i+j]+y] =  ns[3*ind[i+j]+y] + normal[y];
                ns[3*ind[i+j]+z] =  ns[3*ind[i+j]+z] + normal[z];
            }
        }
        //normalize the result
        for(var i=0;i<vs.length;i=i+3){ //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)
        
            var nn=[];
            nn[x] = ns[i+x];
            nn[y] = ns[i+y];
            nn[z] = ns[i+z];
            
            var len = Math.sqrt((nn[x]*nn[x])+(nn[y]*nn[y])+(nn[z]*nn[z]));
            if (len == 0) len = 1.0;
            
            nn[x] = nn[x]/len;
            nn[y] = nn[y]/len;
            nn[z] = nn[z]/len;
            
            ns[i+x] = nn[x];
            ns[i+y] = nn[y];
            ns[i+z] = nn[z];
        }
        
        return ns;
    }
    checkShareInfo = function (redGL) {
        if (!redGL['__datas']['RedPrimitive']) redGL['__datas']['RedPrimitive'] = {}
        return redGL['__datas']['RedPrimitive']
    }
    RedPrimitive = {}
    createGeo = function (redGL, tType, vertices, indices, uvs, normals) {
        vertices = new Float32Array(vertices)
        indices = new Uint16Array(indices)
        uvs = new Float32Array(uvs)
        normals = new Float32Array(normals)
        vertices = redGL.createArrayBufferInfo(tType + '_vertices', RedFixedAttributeKey['aVertexPosition'], vertices, 3, vertices.length / 3, redGL.gl.FLOAT)
        indices = redGL.createIndexBufferInfo(tType + '_indices', indices, 1, indices.length, redGL.gl.UNSIGNED_SHORT)
        if (uvs) uvs = redGL.createArrayBufferInfo(tType + '_uvs', RedFixedAttributeKey['aTexcoord'], uvs, 2, uvs.length / 2, redGL.gl.FLOAT)
        if (normals) normals = redGL.createArrayBufferInfo(tType + '_normals', RedFixedAttributeKey['aVertexNormal'], normals, 3, normals.length / 3, redGL.gl.FLOAT)
        return redGL.createGeometryInfo(tType, vertices, indices, uvs, normals)
    }
    /**DOC:
        {
            code : 'FUNCTION',
            title :`plane`,
            description : `
                - plane 지오메트리가 반환됨,
                - 생성시 내부적으로 'RedPrimitivePlane' + '_' + width + '_' + height + '_' + segmentW + '_' + segmentH 키로 캐싱한뒤..
                - share되는 지오메트리를 생성한다.
            `,
            return : 'RedPrimitivePlane Instance'
        }
    :DOC*/
    RedPrimitive.plane = (function () {
        var width_half;
        var height_half;
        var gridX;
        var gridY;
        var gridX1;
        var gridY1;
        var segment_width;
        var segment_height;
        var ix, iy;
        var tX, tY;
        var a, b, c, d;
        return function RedPrimitivePlane(redGL, width, height, segmentW, segmentH) {
            if (!(this instanceof RedPrimitivePlane)) return new RedPrimitivePlane(redGL, width, height, segmentW, segmentH)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'

            width = width || 1, height = height || 1
            segmentH = segmentH || 1, segmentH = segmentH || 1
            width_half = width / 2, height_half = height / 2
            gridX = Math.floor(segmentW) || 1, gridY = Math.floor(segmentH) || 1
            gridX1 = gridX + 1, gridY1 = gridY + 1
            segment_width = width / gridX, segment_height = height / gridY

            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPrimitivePlane' + '_' + width + '_' + height + '_' + segmentW + '_' + segmentH
            if (tDatas[tType]) {
                console.log('기존에 생성된 공융 프리미티브를 사용함! : ' + tType)
                return tDatas[tType]
            }

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!

            // buffers Data
            var vertices = [];
            var indices = [];
            var uvs = [];
            var normals = [];
            // generate vertices, normals and uvs
            for (iy = 0; iy < gridY1; iy++) {
                tY = iy * segment_height - height_half
                for (ix = 0; ix < gridX1; ix++) {
                    tX = ix * segment_width - width_half,
                        vertices.push(tX, - tY, 0),
                        normals.push(0, 0, 1),
                        uvs.push(ix / gridX, 1 - (iy / gridY))
                }
            }
            // indices
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    a = ix + gridX1 * iy,
                        b = ix + gridX1 * (iy + 1),
                        c = (ix + 1) + gridX1 * (iy + 1),
                        d = (ix + 1) + gridX1 * iy,
                        // faces
                        indices.push(a, b, d, b, c, d)
                }
            }
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices, uvs, normals)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })();
    /**DOC:
        {
            code : 'FUNCTION',
            title :`cube`,
            description : `
                - cube 지오메트리가 반환됨,
                - 생성시 내부적으로 'RedPrimitiveCube' + '_' + width + '_' + height + '_' + depth + '_' + widthSegments + '_' + heightSegments + '_' + depthSegments 키로 캐싱한뒤..
                - share되는 지오메트리를 생성한다.
            `,
            return : 'RedPrimitivePlane Instance'
        }
    :DOC*/
    RedPrimitive.cube = (function () {
        var numberOfVertices;
        var groupStart;
        var buildPlane;
        buildPlane = function (vertices, indices, uvs, normals, u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
            var segmentWidth = width / gridX;
            var segmentHeight = height / gridY;
            var widthHalf = width / 2;
            var heightHalf = height / 2;
            var depthHalf = depth / 2;
            var gridX1 = gridX + 1;
            var gridY1 = gridY + 1;
            var vertexCounter = 0;
            var groupCount = 0;
            var ix, iy;
            var vector = []
            // generate vertices, normals and uvs
            for (iy = 0; iy < gridY1; iy++) {
                var y = iy * segmentHeight - heightHalf;
                for (ix = 0; ix < gridX1; ix++) {
                    var x = ix * segmentWidth - widthHalf;
                    // set values to correct vector component
                    vector[u] = x * udir;
                    vector[v] = y * vdir;
                    vector[w] = depthHalf;
                    // now apply vector to vertex buffer
                    vertices.push(vector.x, vector.y, vector.z);
                    // set values to correct vector component
                    vector[u] = 0;
                    vector[v] = 0;
                    vector[w] = depth > 0 ? 1 : - 1;
                    // now apply vector to normal buffer
                    normals.push(vector.x, vector.y, vector.z);
                    // uvs
                    uvs.push(ix / gridX);
                    uvs.push(1 - (iy / gridY));
                    // counters
                    vertexCounter += 1;
                }
            }
            // indices
            // 1. you need three indices to draw a single face
            // 2. a single segment consists of two faces
            // 3. so we need to generate six (2*3) indices per segment
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    var a = numberOfVertices + ix + gridX1 * iy;
                    var b = numberOfVertices + ix + gridX1 * (iy + 1);
                    var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                    var d = numberOfVertices + (ix + 1) + gridX1 * iy;
                    // faces
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                    // increase counter
                    groupCount += 6;
                }
            }
            // calculate new start value for groups
            groupStart += groupCount;
            // update total number of vertices
            numberOfVertices += vertexCounter;

        }
        return function RedPrimitiveCube(redGL, width, height, depth, widthSegments, heightSegments, depthSegments) {
            if (!(this instanceof RedPrimitiveCube)) return new RedPrimitiveCube(redGL, width, height, depth, widthSegments, heightSegments, depthSegments)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'

            width = width || 1;
            height = height || 1;
            depth = depth || 1;
            // segments
            widthSegments = Math.floor(widthSegments) || 1;
            heightSegments = Math.floor(heightSegments) || 1;
            depthSegments = Math.floor(depthSegments) || 1;

            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPrimitiveCube' + '_' + width + '_' + height + '_' + depth + '_' + widthSegments + '_' + heightSegments + '_' + depthSegments
            if (tDatas[tType]) {
                console.log('기존에 생성된 공융 프리미티브를 사용함! : ' + tType)
                return tDatas[tType]
            }

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!

            // buffers Data
            var vertices = [];
            var indices = [];
            var uvs = [];
            var normals = [];
            numberOfVertices = 0;
            groupStart = 0;
            //TODO: 적화필요
            buildPlane(vertices, indices, uvs, normals, 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0); // px
            buildPlane(vertices, indices, uvs, normals, 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1); // nx
            buildPlane(vertices, indices, uvs, normals, 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
            buildPlane(vertices, indices, uvs, normals, 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3); // ny
            buildPlane(vertices, indices, uvs, normals, 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4); // pz
            buildPlane(vertices, indices, uvs, normals, 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5); // nz
            console.log(vertices, indices, uvs, normals)
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices, uvs, normals)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })();
    /**DOC:
        {
            code : 'FUNCTION',
            title :`grid`,
            description : `
                - grid 지오메트리가 반환됨,
                - 생성시 내부적으로 'RedPrimitiveFloor' + '_' + w + '_' + h 키로 캐싱한뒤..
                - share되는 지오메트리를 생성한다.
            `,
            return : 'RedPrimitiveFloor Instance'
        }
    :DOC*/
    RedPrimitive.grid = (function () {
        var dim;
        var lines;
        var inc;
        var i;
        var t0,t1,t2,t3;
        return function RedPrimitiveFloor(redGL, w, h) {
            if (!(this instanceof RedPrimitiveFloor)) return new RedPrimitiveFloor(redGL, w, h)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            w= w ? w : 50
            h= h ? h : 50
            tType = 'RedPrimitiveFloor' + '_' + w + '_' + h
            if (tDatas[tType]) {
                console.log('기존에 생성된 공융 프리미티브를 사용함! : ' + tType)
                return tDatas[tType]
            }

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!

            // buffers Data
            var vertices = [];
            var indices = [];
            dim = w ,
                lines = h,
                inc = 2 * dim / lines

            for (i = 0; i <= lines; i++) {

                t0 = i * inc
                t1 = lines + 1
                t2 = 6 * i
                t3 = 6 * t1
                vertices[t2] = -dim,
                    vertices[t2 + 1] = 0,
                    vertices[t2 + 2] = -dim + t0,
                    vertices[t2 + 3] = dim,
                    vertices[t2 + 4] = 0,
                    vertices[t2 + 5] = -dim + t0,
                    vertices[t3 + t2] = -dim + t0,
                    vertices[t3 + t2 + 1] = 0,
                    vertices[t3 + t2 + 2] = -dim,
                    vertices[t3 + t2 + 3] = -dim + t0,
                    vertices[t3 + t2 + 4] = 0,
                    vertices[t3 + t2 + 5] = dim,

                    indices[2 * i] = 2 * i,
                    indices[2 * i + 1] = 2 * i + 1,
                    indices[2 * t1 + 2 * i] = 2 * t1 + 2 * i,
                    indices[2 * t1 + 2 * i + 1] = 2 * t1 + 2 * i + 1
            }

            console.log(vertices, indices )
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })();
    /**DOC:
        {
            code : 'FUNCTION',
            title :`sphere`,
            description : `
                - sphere 지오메트리가 반환됨,
                - 생성시 내부적으로 'RedPrimitiveSphere' + '_' + radius + '_' + widthSegments + '_' + heightSegments + '_' + phiStart + '_' + phiLength + '_' + thetaStart + '_' + thetaLength 키로 캐싱한뒤..
                - share되는 지오메트리를 생성한다.
            `,
            return : 'RedPrimitiveSphere Instance'
        }
    :DOC*/
    RedPrimitive.sphere = (function () {
        var thetaEnd;
        var ix, iy;
        var index
        var grid = [];
        var vertex = new Float32Array([0, 0, 0])
        var normal = new Float32Array([0, 0, 0])
        var a, b, c, d;
        return function RedPrimitiveSphere(redGL, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
            if (!(this instanceof RedPrimitiveSphere)) return new RedPrimitiveSphere(redGL, radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
            if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'

            radius = radius || 1;
            widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
            heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
            phiStart = phiStart !== undefined ? phiStart : 0;
            phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;
            thetaStart = thetaStart !== undefined ? thetaStart : 0;
            thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

            thetaEnd = thetaStart + thetaLength;
            ix, iy;
            index = 0;
            grid.length = 0
            vertex[0] = 0, vertex[1] = 0, vertex[2] = 0
            normal[0] = 0, normal[1] = 0, normal[2] = 0

            // 저장할 공간확보하고
            tDatas = checkShareInfo(redGL)
            // 기존에 생성된 녀석이면 생성된 프리미티브 정보를 넘긴다.
            tType = 'RedPrimitiveSphere' + '_' + radius + '_' + widthSegments + '_' + heightSegments + '_' + phiStart + '_' + phiLength + '_' + thetaStart + '_' + thetaLength
            if (tDatas[tType]) {
                console.log('기존에 생성된 공융 프리미티브를 사용함! : ' + tType)
                return tDatas[tType]
            }

            ////////////////////////////////////////////////////////////////////////////
            // 데이터 생성!

            // buffers Data
            var vertices = [];
            var indices = [];
            var uvs = [];
            var normals = [];
            // generate vertices, normals and uvs
            for (iy = 0; iy <= heightSegments; iy++) {
                var verticesRow = [];
                var v = iy / heightSegments;
                for (ix = 0; ix <= widthSegments; ix++) {
                    var u = ix / widthSegments;
                    // vertex
                    vertex.x = - radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                    vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    vertices.push(vertex.x, vertex.y, vertex.z);
                    // normal
                    normal[0] = vertex.x
                    normal[1] = vertex.y
                    normal[2] = vertex.z
                    vec3.normalize(normal, normal)
                    normals.push(normal[0], normal[1], normal[2]);
                    // uv
                    uvs.push(u, 1 - v);
                    verticesRow.push(index++);
                }
                grid.push(verticesRow);
            }
            // indices
            for (iy = 0; iy < heightSegments; iy++) {
                for (ix = 0; ix < widthSegments; ix++) {
                    a = grid[iy][ix + 1]
                    b = grid[iy][ix]
                    c = grid[iy + 1][ix]
                    d = grid[iy + 1][ix + 1]
                    if (iy !== 0 || thetaStart > 0) indices.push(a, b, d)
                    if (iy !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(b, c, d)
                }
            }
            console.log(vertices, indices, uvs, normals)
            ////////////////////////////////////////////////////////////////////////////
            // 캐싱
            tDatas[tType] = createGeo(redGL, tType, vertices, indices, uvs, normals)
            // console.log(redGL['__datas']['RedPrimitive'])
            return tDatas[tType]
        }
    })()
    Object.freeze(RedPrimitive)
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialInfo`,
        description : `
            - 재질 생성기.
            - 타입키에 해당하는 <b>RedMaterialDefine</b> 정의가 존재하지않을경우 에러.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            typeName : [
                {type:'String'},
                '- 재질 타입 지정'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            // basic이라는 이름으로 프로그램을 만든다. 
            test.createProgramInfo(
                'basic',
                test.getShaderInfo('basic', RedProgramInfo.VERTEX_SHADER),
                test.getShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER)
            )
            // basic이라는 타입의 재질 정의한다.
            RedMaterialDefine(test, test.getProgramInfo('basic'))
            // basic재질을 실제로 생성한다.
            RedMaterialInfo(test,'basic')
        `,
        return : 'RedMaterialInfo Instance'
    }
:DOC*/
var RedMaterialInfo;
(function () {
    var tDefineMap
    var tDegineData;
    var tUniform;
    var typeMAP;
    var k, t0;
    typeMAP = {
        f: {
            16: 'uniformMatrix4fv',
            12: 'uniformMatrix3fv',
            8: 'uniformMatrix2fv',
            4: 'uniform4fv',
            3: 'uniform3fv',
            2: 'uniform2fv',
            1: 'uniform1f'
        },
        i: {
            16: 'uniformMatrix4iv',
            12: 'uniformMatrix3iv',
            8: 'uniformMatrix2iv',
            4: 'uniform4iv',
            3: 'uniform3iv',
            2: 'uniform2iv',
            1: 'uniform1iv'
        }
    }
    RedMaterialInfo = function (redGL, typeName, diffuseInfo) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, typeName, diffuseInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof typeName != 'string') throw 'typeName은 문자열만 허용됩니다.'
        // 디파인더에서 재질정의를 찾고
        tDefineMap = redGL['__datas']['RedMaterialDefine']
        tDegineData = tDefineMap[typeName]
        if (!tDegineData) throw typeName + '재질은 존재하지않습니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `재질에 사용된 프로그램정보`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = tDegineData['programInfo']
        /**DOC:
		{
            title :`diffuseInfo`,
            description : `
                - diffuseInfo
            `,
			example : `인스턴스.diffuseInfo`,
			return : 'RedTextureInfo'
        }
        :DOC*/
        this['diffuseInfo'] = diffuseInfo
        /**DOC:
		{
            title :`uniforms`,
            description : `
                - 렌더링시 참고할 유니폼데이터
            `,
			example : `인스턴스.uniforms`,
			return : 'Object'
        }
        :DOC*/
        this['uniforms'] = tUniform = {}
        // 유니폼은 프로그램에 의하여 생성되고, 재질정보를 토대로 렌더시 참조
        tDegineData['programInfo'].makeUniformValue(this)
        /**DOC:
		{
            title :`needUniformList`,
            description : `
                - 렌더링시 유니폼리스트를 다시 만들어야할지 여부
                - 시스템에서 자동으로 설정한다.
            `,
			example : `인스턴스.needUniformList`,
			return : 'Boolean'
        }
        :DOC*/
        this['needUniformList'] = true
        // 유니폼을 업데이트할 glMethod를 찾는다. 
        for (k in tUniform) {
            t0 = tUniform[k]
            if (t0 instanceof Float32Array || t0 instanceof Float64Array) {
                t0['__uniformMethod'] = typeMAP['f'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (
                t0 instanceof Uint8Array ||
                t0 instanceof Uint16Array ||
                t0 instanceof Uint32Array ||
                t0 instanceof Int8Array ||
                t0 instanceof Int16Array ||
                t0 instanceof Int32Array
            ) {
                t0['__uniformMethod'] = typeMAP['i'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (t0 instanceof RedAtlasUVInfo) {
            } else if (t0 instanceof RedTextureInfo || t0 instanceof RedCubeTextureInfo) {
            } else if (t0 instanceof RedAtlasTextureInfo) {
                this['uniforms']['uAtlascoord'] = t0['atlasUVInfo']
            } else throw k + '는 올바르지 않은 타입입니다.'
        }
        this['__UUID'] = REDGL_UUID++
    }
    Object.freeze(RedMaterialInfo)
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialDefine`,
        description : `
            - RedGL에서 사용할 재질정보를 정의.
            - <b>유일키</b>만 지원하며 키 중복일경우 에러발생.
            - <b>Object.freeze</b> 상태로 정의됨.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            programInfo : [
                {type:'RedProgramInfo'},
                '- 재질과 바인딩될 RedProgramInfo 지정'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            // basic이라는 이름으로 프로그램을 만든다. 
            test.createProgramInfo(
                'basic',
                test.getShaderInfo('basic', RedProgramInfo.VERTEX_SHADER),
                test.getShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER)
            )
            // basic이라는 타입의 재질을 만든다.
            RedMaterialDefine(test, test.getProgramInfo('basic'))
        `,
        return : 'RedMaterialDefine Instance'
    }
:DOC*/
var RedMaterialDefine;
(function () {
    var tDatas;
    var tKey;
    RedMaterialDefine = function (redGL, programInfo) {
        if (!(this instanceof RedMaterialDefine)) return new RedMaterialDefine(redGL, programInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (!(programInfo instanceof RedProgramInfo)) throw 'RedProgramInfo 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedMaterialDefine']) redGL['__datas']['RedMaterialDefine'] = {}
        tKey = programInfo['key']
        tDatas = redGL['__datas']['RedMaterialDefine']
        // 기존에 등록된 녀석이면 에러
        if (tDatas[tKey]) throw tKey + '는 이미 존재하는 RedMaterialDefine 입니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `실제 재질을 만들때 참고할 programInfo`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = programInfo
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[tKey] = this
        Object.freeze(this)
    }
    Object.freeze(RedMaterialDefine)
})();
"use strict";
var RedSceneInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedSceneInfo`,
        description : `
            - RedGL에서 사용할 Scene정보를 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 존재하는 키일경우 에러.'
            ],
            camera : [
                {type:'RedBaseCamera'},
                '- 사용할 카메라 객체등록'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // firstScene 키로 Scene생성
            RedSceneInfo(test,'firstScene')
        `,
        return : 'RedSceneInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedSceneInfo = function (redGL, key, camera) {
        if (!(this instanceof RedSceneInfo)) return new RedSceneInfo(redGL, key, camera)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key는 문자열만 허용됩니다.'
        if (!(camera instanceof RedBaseCamera)) throw 'camera는 RedBaseCamera 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedSceneInfo']) redGL['__datas']['RedSceneInfo'] = {}
        tDatas = redGL['__datas']['RedSceneInfo']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedSceneInfo 입니다.'
        /**DOC:
		{
            title :`children`,
			description : `씬이 물고있는 Mesh리스트들`,
			example : `인스턴스.children`,
			return : 'Array'
        }
        :DOC*/
        this['children'] = []
        /**DOC:
		{
            title :`camera`,
			description : `씬이 가지고있는 카메라`,
			example : `인스턴스.camera`,
			return : 'RedBaseCamera'
        }
        :DOC*/
        this['camera'] = camera
        this['lights'] = {
            ambient : [],
            directional : [],
            point : [],
            spot : []
        }
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        Object.seal(RedSceneInfo)
    }
    RedSceneInfo.prototype = {
        /**DOC:
		{
            title :`setSkyBox`,
            description : `스카이박스 설정`,
            code:'FUNCTION',
			example : `인스턴스.setSkyBox`
        }
        :DOC*/
        setSkyBox: function (v) {
            this['skyBox'] = v
        },
        /**DOC:
		{
            title :`setGrid`,
            description : `그리드 설정`,
            code:'FUNCTION',
			example : `인스턴스.setGrid`
        }
        :DOC*/
        setGrid: function (v) {
            this['grid'] = v
        },
          /**DOC:
		{
            title :`addLight`,
            description : `라이트 설정`,
            code:'FUNCTION',
			example : `인스턴스.addLight`
        }
        :DOC*/
        addLight: (function () {
            var tDatas;
            return function (v) {
                if (v instanceof RedDirectionalLightInfo) {
                    tDatas = this['lights'][RedDirectionalLightInfo.TYPE]
                    if (tDatas.length == 16) throw '직사광 최대갯수는 16개입니다.'
                    else tDatas.push(v)
                } else throw '등록할수 없는 타입입니다.'
            }
        })()
    }
    Object.freeze(RedSceneInfo)
})();
"use strict";
var RedTextureInfo;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedTextureInfo`,
			description : `
				- 기본 텍스쳐 생성기
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'}
				],
				src : [
					{type:'String or CanvasElement'},
					'텍스쳐경로나 캔버스 오브젝트만 사용가능'
				]
				// targetIndex : [
				// 	{type:'Integer'},
				// 	'- 타겟 인덱스를 지정한다.',
				// 	'- 기본값 : 1 (기본인덱스는 1번을 사용함)',
				// 	'- 아틀라스텍스쳐의 경우 하드웨어 지원 텍스쳐수의 절반을 parseInt한 값을 시작으로 끝까지 시스템에서 자동으로 부여함.'

				// ]
			},
			example : `
				var testGL
				testGL = RedGL(document.getElementById('test'), true)
				RedTextureInfo(testGL, 'asset/crate.png')
			`,
			return : 'RedTextureInfo Instance'
		}
	:DOC*/
	RedTextureInfo = function (redGL, src, targetIndex, internalFormat, format, type) {
		if (!(this instanceof RedTextureInfo)) return new RedTextureInfo(redGL, src, targetIndex, internalFormat, format, type)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (typeof src !='string' && !(src instanceof Element && src.nodeName == 'CANVAS')) throw 'src는 문자열과 캔버스 오브젝트만 허용됩니다.'
		var texture;
		var img;
		var level = 0;
		var width = 2;
		var height = 2;
		var border = 0;
		var self;
		self = this
		tGL = redGL.gl
		internalFormat = internalFormat ? internalFormat : tGL.RGBA;
		format = format ? format : tGL.RGBA;
		type = type ? type : tGL.UNSIGNED_BYTE;
		targetIndex = targetIndex ? targetIndex : 1
		texture = tGL.createTexture()
		tGL.activeTexture(tGL.TEXTURE0)
		tGL.bindTexture(tGL.TEXTURE_2D, texture)
		// 초기이미지 설정
		tGL.texImage2D(
			tGL.TEXTURE_2D,
			level,
			internalFormat,
			width,
			height,
			border,
			format,
			type,
			new Uint8Array(
				222, 222, 222, 255,
				66, 66, 66, 255,
				66, 66, 66, 255,
				222, 222, 222, 255
			)
		)
		img = new Image();
		// 캔버스 일경우 캔버스이미지데이터를 활용함
		img.src = src instanceof Element ? src.toDataURL() : src
		img.crossOrigin = 'anonymous'
		img.addEventListener('load', function () {
			// 로딩상태 플래그를 완료로 설정
			self['loaded'] = 1
			// 타겟인덱스를 설정함		
			self['__targetIndex'] = targetIndex
			// tGL.activeTexture(tGL.TEXTURE_2D, tGL.TEXTURE0)
			tGL.activeTexture(tGL.TEXTURE0)
			tGL.bindTexture(tGL.TEXTURE_2D, self['texture'])
			tGL.texImage2D(tGL.TEXTURE_2D, 0, tGL.RGBA, tGL.RGBA, tGL.UNSIGNED_BYTE, self['__img'])
			tGL.texParameterf(tGL.TEXTURE_2D, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR_MIPMAP_NEAREST);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
			tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
			tGL.generateMipmap(tGL.TEXTURE_2D)
			// img.onload = null
		});
		// tGL.bindTexture(tGL.TEXTURE_2D, null)
		this['__img'] = img
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		this['__targetIndex'] = 0
		// 로딩이 다되었는지
		this['loaded'] = 0
		// 액티브된적이있는지
		this['actived'] = 0
		// 웹지엘 텍스쳐인지
		this['__webglTexture'] = 1
		this['__UUID'] = REDGL_UUID++
		this['texture'] = texture
	}
	RedTextureInfo.prototype.updateTexture = function(src){
		console.log('업데이트',src)
		self['loaded'] = 0
		this['__img'].src=src instanceof Element ? src.toDataURL() : src
	}
})();
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasUVInfo`,
        description : `
            - <b>RedAtlasTextureManager</b>에 의해 자동 생성된 <b>RedAtlasUVInfo</b>.
            - <span style="color:red">렌더링시 고정 유니폼인 <b>uAtlascoord</b>에 사용된다.</span>
            - 사용자 생성은 금지한다.
            - Object.freeze 상태로 반환.
        `,
        params : {
            uvArray : [
                {type:'Array'},
                '- 생성초기값'
            ]
        },
        return : 'RedAtlasUVInfo instance'
    }
:DOC*/
var RedAtlasUVInfo;
RedAtlasUVInfo = function (uvArray) {
    if (!(this instanceof RedAtlasUVInfo)) return new RedAtlasUVInfo(uvArray)
    if (!(uvArray instanceof Array)) throw 'uvArray는 Array만 허용합니다.'
    this['value'] = new Float32Array(uvArray)
    this['value']['__UUID'] = this['__UUID'] = REDGL_UUID++
    Object.freeze(this)
}
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasInfo`,
        description : `
            - <b>RedAtlasTextureManager</b>에 의해 자동 생성된 <b>RedAtlasInfo</b>.
            - 고유값으로 캐싱되며, 사용자 생성은 금지한다.
            - 하드웨어가 지원하는 최대크기(최대 4096*4096으로 제한)의 <b>Atlas</b>객체를 가진다.
            - 소스맵을 기반으로 <b>RedAtlasTextureInfo</b>를 내부적으로 가진다.
            - <b>Atlas</b>정보가 업데이트되면 자동 갱신된다.
            - Object.seal 상태로 반환.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                `
                    - RedGL 객체.
                `
            ],
            targetAtlas : [
                {type:'Atlas instance'},
                `
                    - Atlas 인스턴스 객체를 주입.
                `
            ]
        },
        return : 'RedAtlasInfo Instance'
    }
:DOC*/
var RedAtlasInfo;
RedAtlasInfo = function (redGL, targetAtlas) {
    if (!(this instanceof RedAtlasInfo)) return new RedAtlasInfo(redGL, targetAtlas)
    if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
    /**DOC:
    {
        title :`RedAtlasInfo`,
        code : 'PROPERTY',
        description : `
            Atlas정보(Atlas).
        `,
        example : `
            인스턴스.atlas
        `,
        return : 'Atlas Instance'
    }
    :DOC*/
    this['atlas'] = targetAtlas
    /**DOC:
    {
        title :`textureInfo`,
        code : 'PROPERTY',
        description : `
            텍스쳐 정보(RedAtlasTextureInfo)
        `,
        example : `
            인스턴스.textureInfo
        `,
        return : 'RedAtlasTextureInfo를 Instance'
    }
    :DOC*/
    this['textureInfo'] = null
    Object.seal(this)
}
"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasTextureManager`,
        description : `
            - <b>Atlas를 생성하고 텍스쳐관련작업을 자동으로 관리하는 오브젝트</b>
        `,
        params : {
            redGL : [
                {type:'RedGL'},
                '- redGL Instance'
            ],
            srcList : [
				{type:'String or Array'},
				'단일 문자열로 들어오면 알아서 배열로 바꿈.'
			],
			callback : [
				 {type:'Function'},
				 '아틀라스 완성후 실행할 콜백.'
			]
        },
        example : `
            RedAtlasTextureManager(redGLInstance, 원하는경로, 콜백이필요하면 콜백)
        `,
        return : 'RedAtlasTextureManager OBJECT'
    }
:DOC*/
var RedAtlasTextureManager;
(function () {
	var MAX_TEXTURE_SIZE;
	var MAX_TEXTURE_IMAGE_UNITS; // 최대 허용 이미지유닛수
	var atlasInfoList; // 아틀라스 객체 리스트
	var atlasKeyMap; // 아틀라스에 등록된 이미지 맵정보
	var tRedGL;
	var tTextureUnitIndex; // 텍스쳐 유닛인덱스
	var tAtlas; // 대상 아틀라스
	var createAtlas; // 아틀라스 캔버스 생성기
	var atlasPack; // 아틀라스에 이미지를 실제로 업로드하는 녀석
	atlasKeyMap = {}
	atlasInfoList = []
	createAtlas = function (image) {
		var canvas;
		var t0;
		if (image && (image['width'] > MAX_TEXTURE_SIZE || image['height'] > MAX_TEXTURE_SIZE)) throw MAX_TEXTURE_SIZE + ' - 최대 허용사이즈보다 이미지가 큽니다.'
		canvas = document.createElement('canvas');
		canvas.width = MAX_TEXTURE_SIZE, canvas.height = MAX_TEXTURE_SIZE;
		canvas.style.background = 'transparent', canvas.style.margin = '3px', canvas.style.display = 'inline-block'
		// document.body.appendChild(canvas)
		// 아틀라스 생성
		tAtlas = new Atlas(canvas);
		tAtlas['atlasInfo'] = RedAtlasInfo(tRedGL, tAtlas)
		tTextureUnitIndex++
		if (tTextureUnitIndex == MAX_TEXTURE_IMAGE_UNITS) tTextureUnitIndex = MAX_TEXTURE_IMAGE_UNITS - parseInt(MAX_TEXTURE_IMAGE_UNITS / 2)
		tAtlas['__targetIndex'] = tTextureUnitIndex // console.log(tAtlas)
		atlasInfoList.push(tAtlas['atlasInfo'])

	}
	atlasPack = function (targetImage) {
		tAtlas = atlasInfoList[0]['atlas']
		var node = tAtlas.pack(targetImage);
		var i, len;
		if (node === false) {
			// 아틀라스를 전체를 돌면서 찾아야하고..
			i = 0, len = atlasInfoList.length
			for (i; i < len; i++) {
				// 기존있는놈중에 들어가면 종료시키고
				tAtlas = atlasInfoList[i]['atlas']
				node = tAtlas.pack(targetImage);
				if (node) break
			}
			// 여기까지 흘러들어오면 아틀라스캔버스 자체를 추가한다.
			if (node === false) {
				createAtlas(targetImage)
				node = tAtlas.pack(targetImage)
			}
		}
		// RedAtlasTextureInfo를 생성하고 맵에 담아둠
		console.log(tAtlas.uv()[targetImage.id])
		atlasKeyMap[targetImage.id] = new RedAtlasTextureInfo(
			tAtlas.uv()[targetImage.id],
			tAtlas['atlasInfo']
		)
		return node
	}
	RedAtlasTextureManager = function (redGL, srcList, callback) {
		if (!(this instanceof RedAtlasTextureManager)) return new RedAtlasTextureManager(redGL, srcList, callback)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (!(srcList instanceof Array)) srcList = [srcList]
		tRedGL = redGL
		MAX_TEXTURE_SIZE = redGL['detect']['MAX_TEXTURE_SIZE']
		MAX_TEXTURE_IMAGE_UNITS = redGL['detect']['MAX_TEXTURE_IMAGE_UNITS']
		if (tTextureUnitIndex == undefined) tTextureUnitIndex = MAX_TEXTURE_IMAGE_UNITS - parseInt(MAX_TEXTURE_IMAGE_UNITS / 2)
		if (MAX_TEXTURE_SIZE > 4096) MAX_TEXTURE_SIZE = 4096
		console.log('MAX_TEXTURE_SIZE', MAX_TEXTURE_SIZE)
		console.log('MAX_TEXTURE_IMAGE_UNITS', MAX_TEXTURE_IMAGE_UNITS)
		if (!tAtlas) createAtlas()
		var loaded, targetNum;
		loaded = 0
		targetNum = srcList.length
		srcList.forEach(function (src) {
			var img = new Image();
			var id = src
			if (atlasKeyMap[id]) return // 이미존재하면 나가리..
			img.id = id
			img.src = src
			img.onload = function () {
				var node = atlasPack(this)
				loaded++
				if (targetNum == loaded) {
					atlasInfoList.forEach(function (v) {
						if (!v['textureInfo']) v['textureInfo'] = RedTextureInfo(redGL, v['atlas']['canvas'], v['atlas']['__targetIndex'])
						else v['textureInfo'].updateTexture(v['atlas']['canvas'])
					})
					if (callback) callback()
				}
			};
		})
		return RedAtlasTextureManager
	}
	/**DOC:
		{
			title :`getByKey`,
			code : 'PROPERTY',
			description : `
				- 이미지등록시 사용된 src를 key로 해당하는 RedAtlasTextureInfo 맵을 조회한다.
			`,
			example : `
				RedAtlasTextureManager.getByKey('찾고싶은 src')
			`,
			return : 'RedAtlasTextureInfo instance'
		}
	:DOC*/
	RedAtlasTextureManager.getByKey = function (key) {
		return atlasKeyMap[key]
	}
	Object.freeze(RedAtlasTextureManager)
})();
"use strict";
var RedAtlasTextureInfo;
(function () {
    var checkMap;;
    checkMap = {}
    /**DOC:
        {
            constructorYn : true,
            title :`RedAtlasTextureInfo`,
            description : `
                - <b>RedAtlasTextureManager</b>에 의해 자동 생성된 <b>RedAtlasTextureInfo</b>.
                - 고유값으로 캐싱되며, 사용자 생성은 금지한다.
                - Object.freeze 상태로 반환.
            `,
            params : {
                atlasUVInfo : [
                    {type:'Array'},
                    `
                        - 아틀라스상의 Rect정보.
                    `
                ],
                parentAtlasInfo : [
                    {type:'Atlas instance'},
                    `
                        - Atlas 인스턴스 객체.
                    `
                ]
            },
            return : 'RedAtlasTextureInfo Instance'
        }
    :DOC*/
    RedAtlasTextureInfo = (function () {
        var t0;
        var tKey;
        return function (atlasUVInfo, parentAtlasInfo) {
            if (!(this instanceof RedAtlasTextureInfo)) return new RedAtlasTextureInfo(atlasUVInfo, parentAtlasInfo)
            if (!(atlasUVInfo instanceof Array)) throw 'atlasUVInfo는 Array만 허용합니다.'
            if (!(parentAtlasInfo instanceof RedAtlasInfo)) throw 'parentAtlasInfo는 RedAtlasInfo  인스턴스만 허용합니다.'
            t0 = [
                atlasUVInfo[0][0],
                1.0-atlasUVInfo[2][1],
                (atlasUVInfo[1][0] - atlasUVInfo[0][0]),
                (atlasUVInfo[2][1] - atlasUVInfo[0][1])
            ]
            tKey = t0.toString()
            if (checkMap[tKey]) atlasUVInfo = checkMap[tKey]
            else atlasUVInfo = checkMap[tKey] = RedAtlasUVInfo(t0)
            console.log(atlasUVInfo)
            /**DOC:
                {
                    title :`atlasUVInfo`,
                    code : 'PROPERTY',
                    description : `
                        - atlasUVInfo 반환
                    `,
                    example : `
                        인스턴스.atlasUVInfo
                    `,
                    return : 'RedAtlasUVInfo Instance'
                }
            :DOC*/
            this['atlasUVInfo'] = atlasUVInfo
            /**DOC:
                {
                    title :`parentAtlasInfo`,
                    code : 'PROPERTY',
                    description : `
                        - parentAtlasInfo 반환
                    `,
                    example : `
                        인스턴스.parentAtlasInfo
                    `,
                    return : 'RedAtlasInfo Instance'
                }
            :DOC*/
            this['parentAtlasInfo'] = parentAtlasInfo
            this['__webglAtlasTexture'] = 1
            Object.freeze(this)
        }
    })()
})();
"use strict";
var RedRender;
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshInfo`,
        description : `
           - 렌더러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            redScene : [
                {type:'RedSceneInfo'},
                '- RedSceneInfo을 일단 최초 렌더 그룹으로 본다.',
                `- <span style="color:red"><b>
                   - 월드는 과연필요한가 -_-?
                   - 씬이 카메라는 먹으면 어짜피 같은효과가 아닌가?
                 </b></span>
                `
            ],
            callback : [
                {type:'Function'},
                '- 루프시 사전에 돌릴 콜백등록'
            ]
        },
        example : `
            var renderer = RedRender(RedGL Instance, RedSceneInfo Instance, function (time) {
                // 렌더링시 사전호출될 콜백
            })
            renderer.start()
        `,
        return : 'RedRender Instance'
    }
:DOC*/
(function () {
    var tDatas;
    var SIN, COS;
    SIN = Math.sin, COS = Math.cos
    var mat4Inverse = function (a, b) {
        b || (b = a); var c = a[0], d = a[1], e = a[2], g = a[3], f = a[4], h = a[5], i = a[6], j = a[7], k = a[8], l = a[9], n = a[10], o = a[11], m = a[12], p = a[13], r = a[14], s = a[15], A = c * h - d * f, B = c * i - e * f, t = c * j - g * f, u = d * i - e * h, v = d * j - g * h, w = e * j - g * i, x = k * p - l * m, y = k * r - n * m, z = k * s - o * m, C = l * r - n * p, D = l * s - o * p, E = n * s - o * r, q = A * E - B * D + t * C + u * z - v * y + w * x; if (!q) return null; q = 1 / q; b[0] = (h * E - i * D + j * C) * q; b[1] = (-d * E + e * D - g * C) * q; b[2] = (p * w - r * v + s * u) * q; b[3] = (-l * w + n * v - o * u) * q; b[4] = (-f * E + i * z - j * y) * q; b[5] = (c * E - e * z + g * y) * q; b[6] = (-m * w + r * t - s * B) * q; b[7] = (k * w - n * t + o * B) * q; b[8] =
            (f * D - h * z + j * x) * q; b[9] = (-c * D + d * z - g * x) * q; b[10] = (m * v - p * t + s * A) * q; b[11] = (-k * v + l * t - o * A) * q; b[12] = (-f * C + h * y - i * x) * q; b[13] = (c * C - d * y + e * x) * q; b[14] = (-m * u + p * B - r * A) * q; b[15] = (k * u - l * B + n * A) * q; return b
    }
    RedRender = function (redGL, redScene, callback) {
        if (!(this instanceof RedRender)) return new RedRender(redGL, redScene, callback)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        var self;
        self = this
        // 씬생성!!
        this['callback'] = callback
        this['targetScene'] = redScene
        this['__UUID'] = REDGL_UUID++
        this['numDrawCall'] = 0
        //
        var k; //루프변수
        var tScene; // 대상 RedScene
        var tMesh; // 대상 메쉬
        var tMVMatrix; // 대상 메쉬의 매트릭스 
        var tNMatrix; // 대상 메쉬의 노멀매트릭스
        ///////////////////////////////////////////////////////////////////
        var a, aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz;
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33;
        var b0, b1, b2, b3;
        var b00, b01, b02, b10, b11, b12, b20, b21, b22
        var aX, aY, aZ;
        ///////////////////////////////////////////////////////////////////
        var tGL; // 대상 RedGL의 gl context
        var tMeterial; // 대상 재질
        var tProgramInfo; // 대상 프로그램 정보
        var tProgram; // 대상 프로그램
        var tGeometry; // 대상 지오메트리
        var tAttrGroup; // 대상 버퍼정보그룹
        var tAttrGroupList; // 대상 버퍼정보그룹을 리스트화함
        var tAttrLocationGroup; // 대상 Attribute의 location 정보들
        var tAttrBufferInfo; // 대상 RedBufferInfo 
        var tAttrPointer; // 대상 Attrobute가 반영될 쉐이더내의 변수이름
        var tUniformGroup; // 대상 유니폼 그룹
        var tUniformGroupList; // 대상 유니폼 그룹을 리스트화함
        var tUniformLocationGroup; // 대상 프로그램의 uniform location 정보들
        var tUniformKey, tUniformValue; // 대상 유니폼 키와 값
        var tLocation; // 대상 location 정보
        var tIndicesBuffer; // 인덱스 버퍼
        var tVertexPositionBuffer; // 포지션 버퍼
        ///////////////////////////////////////////////////////////////////
        var cacheProgram; // 이전 대상 프로그램        
        var cacheAttrUUID; // 어트리뷰트 캐싱정보
        var cacheDrawBufferUUID; // draw버퍼 캐싱정보
        var cacheTexture1_UUID; // 일반 텍스쳐 캐싱정보
        var cacheTexture2_UUID; // 큐브 텍스쳐 캐싱정보
        var cacheTextureAtlas_UUID; // 텍스쳐 아틀라스 캐싱정보
        var cacheActiveTextureIndex; // 액티브된 텍스쳐정보
        var cacheActiveCubeTextureIndex; // 액티브된 큐브특스쳐정보
        var cacheUAtlascoord_UUID; // 아틀라스 UV텍스쳐 정보
        ///////////////////////////////////////////////////////////////////
        var cacheUseCullFace; // 컬페이스 사용여부 캐싱정보
        var cacheCullFace; // 컬페이스 캐싱정보
        var cacheUseBlendMode; // 블렌드모드 사용여부 캐싱정보
        var cacheBlendModeFactor; // 블렌드팩터 캐싱정보
        var cacheUseDepthTest; // 뎁스테스트 사용여부 캐싱정보
        var cacheDepthTestFunc; // 뎁스테스트 팩터 캐싱정보
        ///////////////////////////////////////////////////////////////////
        var aspect;

        cacheAttrUUID = {}
        cacheTextureAtlas_UUID = {}
        this.render = function (time) {
            //TODO: 재질 소팅을 도입해야곘음 -_-;;
            //////////////////////////////////////////////////////////
            // cacheDrawBufferUUID 캐시를 한번제거함
            // 왜냐? 버퍼가 중간에 등록만되고..사용이 안될떄..대비
            cacheDrawBufferUUID = undefined
            //////////////////////////////////////////////////////////
            self['callback'] ? self['callback'](time) : 0
            self['numDrawCall'] = 0
            tGL = redGL.gl
            //////////////////////////////////////////////////////////////////
            tScene = self['targetScene']

            // TODO: 이부분은 리사이저이벤트로 날릴수 있을듯        ... 흠 프로그램 변경때문에 안되남...   
            tScene['camera'].update()
            for (k in redGL['__datas']['RedProgramInfo']) {
                var tempProgramInfo;
                tempProgramInfo = redGL['__datas']['RedProgramInfo'][k]
                tGL.useProgram(tempProgramInfo['program'])
                // 파스팩티브 갱신
                tLocation = tempProgramInfo['uniforms']['uPMatrix']['location']
                tGL.uniformMatrix4fv(tLocation, false, tScene['camera']['uPMatrix'])
                // 카메라갱신
                tLocation = tempProgramInfo['uniforms']['uCameraMatrix']['location']
                tGL.uniformMatrix4fv(tLocation, false, tScene['camera']['uCameraMatrix'])
                // 라이트갱신
                // console.log(tScene['lights'])
                self.setDirectional(tempProgramInfo)
               
            }
            cacheProgram = null // 캐쉬된 프로그램을 삭제
            //////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////
            tGL.clear(tGL.COLOR_BUFFER_BIT);
            self.drawSkyBox(tScene['skyBox'], time)
            self.drawGrid(tScene['grid'], time)
            tGL.clear(tGL.DEPTH_BUFFER_BIT);
            self.draw(tScene['children'], time)
            // Set the backbuffer's alpha to 1.0
            requestAnimationFrame(self.render)
        };
        this.setDirectional = (function(){
            var tDirectionList = [],tColorList = []
            return function(programInfo){
                if (programInfo['uniforms']['uDirectionnalLightDirection']) {
                    tDirectionList.length = 0
                    tColorList.length = 0
                    tScene['lights']['directional'].forEach(function (v, i) {
                        tDirectionList[i * 3 + 0] = v['direction'][0]
                        tDirectionList[i * 3 + 1] = v['direction'][1]
                        tDirectionList[i * 3 + 2] = v['direction'][2]
                        tColorList[i * 4 + 0] = v['color'][0]/255
                        tColorList[i * 4 + 1] = v['color'][1]/255
                        tColorList[i * 4 + 2] = v['color'][2]/255
                        tColorList[i * 4 + 3] = v['color'][3]/255
                    })
                    tLocation = programInfo['uniforms']['uDirectionnalLightDirection']['location']
                    tGL.uniform3fv(tLocation, new Float32Array(tDirectionList))
                    tLocation = programInfo['uniforms']['uDirectionnalLightColor']['location']
                    tGL.uniform4fv(tLocation, new Float32Array(tColorList))
                    tLocation = programInfo['uniforms']['uDirectionalNum']['location']
                    tGL.uniform1i(tLocation, tScene['lights']['directional'].length)
                }
            }
        })()
        this.drawGrid = (function () {
            var list = [];
            return function (grid) {
                if (grid) {
                    list.length = 0
                    list.push(grid)
                    self.draw(list)
                }
            }
        })();
        this.drawSkyBox = (function () {
            var list = [];
            return function (skyBox) {
                if (skyBox) {
                    // 스카이박스 스케일은 카메라 far와 연동됨
                    skyBox['scale'][0] = skyBox['scale'][1] = skyBox['scale'][2] = tScene['camera']['far']
                    list.length = 0
                    list.push(skyBox)
                    self.draw(list)
                }
            }
        })();
        this.draw = function (renderList, time, parentMTX) {
            var i, i2; // 루프변수
            i = renderList.length
            while (i--) {
                self['numDrawCall']++
                tMesh = renderList[i]
                tMVMatrix = tMesh['uMVMatrix']
                
                // 매트릭스 초기화
                tMVMatrix[0] = 1, tMVMatrix[1] = 0, tMVMatrix[2] = 0, tMVMatrix[3] = 0,
                    tMVMatrix[4] = 0, tMVMatrix[5] = 1, tMVMatrix[6] = 0, tMVMatrix[7] = 0,
                    tMVMatrix[8] = 0, tMVMatrix[9] = 0, tMVMatrix[10] = 1, tMVMatrix[11] = 0,
                    tMVMatrix[12] = 0, tMVMatrix[13] = 0, tMVMatrix[14] = 0, tMVMatrix[15] = 1
                // 기본 변환
                a = tMVMatrix
                // 이동
                aX = tMesh['position'][0], aY = tMesh['position'][1], aZ = tMesh['position'][2];
                a[12] = a[0] * aX + a[4] * aY + a[8] * aZ + a[12];
                a[13] = a[1] * aX + a[5] * aY + a[9] * aZ + a[13];
                a[14] = a[2] * aX + a[6] * aY + a[10] * aZ + a[14];
                a[15] = a[3] * aX + a[7] * aY + a[11] * aZ + a[15];
                // xyz축 회전 
                tRx = tMesh['rotation'][0], tRy = tMesh['rotation'][1], tRz = tMesh['rotation'][2]
                aSx = SIN(tRx), aCx = COS(tRx), aSy = SIN(tRy), aCy = COS(tRy), aSz = SIN(tRz), aCz = COS(tRz),
                    a00 = a[0], a01 = a[1], a02 = a[2],
                    a10 = a[4], a11 = a[5], a12 = a[6],
                    a20 = a[8], a21 = a[9], a22 = a[10],
                    b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
                    b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
                    b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
                    a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
                    a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
                    a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22;
                // 스케일
                aX = tMesh['scale'][0], aY = tMesh['scale'][1], aZ = tMesh['scale'][2]
                a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX;
                a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                    a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                    a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15]
                // 부모가있으면 곱함
                if (parentMTX) {
                    // 부모매트릭스 복사
                    var parentClone = new glMatrix.ARRAY_TYPE(16);
                    parentClone[0] = parentMTX[0], parentClone[1] = parentMTX[1], parentClone[2] = parentMTX[2], parentClone[3] = parentMTX[3],
                        parentClone[4] = parentMTX[4], parentClone[5] = parentMTX[5], parentClone[6] = parentMTX[6], parentClone[7] = parentMTX[7],
                        parentClone[8] = parentMTX[8], parentClone[9] = parentMTX[9], parentClone[10] = parentMTX[10], parentClone[11] = parentMTX[11],
                        parentClone[12] = parentMTX[12], parentClone[13] = parentMTX[13], parentClone[14] = parentMTX[14], parentClone[15] = parentMTX[15]
                    /////////////////////////////////////////////////////////////////////////////////////////////
                    // 매트립스 곱
                    a00 = parentClone[0], a01 = parentClone[1], a02 = parentClone[2], a03 = parentClone[3],
                        a10 = parentClone[4], a11 = parentClone[5], a12 = parentClone[6], a13 = parentClone[7],
                        a20 = parentClone[8], a21 = parentClone[9], a22 = parentClone[10], a23 = parentClone[11],
                        a30 = parentClone[12], a31 = parentClone[13], a32 = parentClone[14], a33 = parentClone[15],
                        // Cache only the current line of the second matrix
                        b0 = tMVMatrix[0], b1 = tMVMatrix[1], b2 = tMVMatrix[2], b3 = tMVMatrix[3],
                        tMVMatrix[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[4], b1 = tMVMatrix[5], b2 = tMVMatrix[6], b3 = tMVMatrix[7],
                        tMVMatrix[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[8], b1 = tMVMatrix[9], b2 = tMVMatrix[10], b3 = tMVMatrix[11],
                        tMVMatrix[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[12], b1 = tMVMatrix[13], b2 = tMVMatrix[14], b3 = tMVMatrix[15],
                        tMVMatrix[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
                    /////////////////////////////////////////////////////////////////////////////////////////////
                }
                // 정보세팅
                tMeterial = tMesh['materialInfo']
                tProgramInfo = tMeterial['programInfo']
                tProgram = tProgramInfo['program']
                tGeometry = tMesh['geometryInfo']
                tAttrGroup = tGeometry['attributes']
                tAttrGroupList = tGeometry['__attributeList']
                tAttrLocationGroup = tProgramInfo['attributes']
                tUniformGroup = tMeterial['uniforms']
                tUniformLocationGroup = tProgramInfo['uniforms']
                tIndicesBuffer = tGeometry['indices']
                tVertexPositionBuffer = tAttrGroup['vertexPosition']


                // 프로그램 세팅 & 캐싱
                cacheProgram != tProgram ? tGL.useProgram(tProgram) : 0
                cacheProgram = tProgram
                // 어트리뷰트 입력
                i2 = tAttrGroupList.length
                while (i2--) {
                    tAttrBufferInfo = tAttrGroupList[i2], // 대상버퍼구하고
                        tAttrPointer = tAttrBufferInfo['shaderPointerKey'] // 바인딩할 쉐이더 변수키를 알아낸다.
                    if (tAttrLocationGroup[tAttrPointer]) { // 정보매칭이 안되는 녀석은 무시한다 
                        tLocation = tAttrLocationGroup[tAttrPointer]['location'] // 로케이션도 알아낸다.
                        // 캐싱된 attribute정보과 현재 대상정보가 같다면 무시
                        cacheAttrUUID[tLocation] == tAttrBufferInfo['__UUID'] ?
                            0 :
                            (
                                tGL.bindBuffer(tGL.ARRAY_BUFFER, tAttrBufferInfo['buffer']), // 실제 버퍼 바인딩하고
                                tAttrBufferInfo['enabled'] ? 0 : (tGL.enableVertexAttribArray(tLocation), tAttrBufferInfo['enabled'] = 1), // 해당로케이션을 활성화 시킨다
                                tGL.vertexAttribPointer(
                                    tLocation,
                                    tAttrBufferInfo['pointSize'],
                                    tAttrBufferInfo['arrayType'],
                                    tAttrBufferInfo['normalize'],
                                    tAttrBufferInfo['stride'],
                                    tAttrBufferInfo['offset']
                                ),
                                cacheAttrUUID[tLocation] = tAttrBufferInfo['__UUID'] // 상태 캐싱
                            )
                    }
                }
                // 재질이 처음만들어진경우 유니폼맵을 기반으로 유니폼 렌더리스트로 만든다. 
                if (tMeterial['needUniformList']) {
                    tMeterial['__uniformList'] = []
                    for (k in tUniformGroup) {
                        tMeterial['__uniformList'].push({
                            key: k,
                            value: tUniformGroup[k],
                            location: tUniformLocationGroup[k]['location']
                        })
                    }
                    tMeterial['needUniformList'] = false
                }
                // 유니폼 입력
                tUniformGroupList = tMeterial['__uniformList']
                i2 = tUniformGroupList.length
                var bitmapRenderable = true
                while (i2--) {
                    tUniformKey = tUniformGroupList[i2]['key'],
                        tUniformValue = tUniformGroupList[i2]['value'],
                        tLocation = tUniformGroupList[i2]['location']
                    if (tUniformKey == 'uAtlascoord') {
                        //TODO: 고정유니폼을 태울 방법을 고민해야겠어...
                        // console.log(tUniformGroup[tUniformKey])               
                        // console.log(tLocation)   
                        cacheUAtlascoord_UUID == tUniformGroup[tUniformKey]['__UUID'] ? 0 : tGL.uniform4fv(tLocation, tUniformGroup[tUniformKey]['value'])
                        cacheUAtlascoord_UUID = tUniformGroup[tUniformKey]['__UUID']
                    } else if (tUniformValue['__uniformMethod']) {
                        tUniformValue['__isMatrix'] // 매트릭스형태인지 아닌지 파악
                            ?
                            tGL[tUniformValue['__uniformMethod']](tLocation, false, tUniformGroup[tUniformKey]) :
                            tGL[tUniformValue['__uniformMethod']](tLocation, tUniformGroup[tUniformKey])
                    } else if (tUniformValue['__webglAtlasTexture']) {

                        var tTexture;
                        tTexture = tUniformValue['parentAtlasInfo']['textureInfo']
                        if (cacheTextureAtlas_UUID[tTexture['__targetIndex']] == undefined) bitmapRenderable = false
                        if (tTexture['loaded']) {
                            if (cacheTextureAtlas_UUID[tTexture['__targetIndex']] != tTexture['__UUID']) {
                                // console.log('오남')
                                tTexture['actived'] ? 0 : tGL.activeTexture(tGL.TEXTURE0 + tTexture['__targetIndex'])
                                tTexture['actived'] = 1
                                // tGL.activeTexture(tGL.TEXTURE0 + tTexture['__targetIndex'])
                                tGL.bindTexture(tGL.TEXTURE_2D, tTexture['texture'])
                                cacheTextureAtlas_UUID[tTexture['__targetIndex']] = tTexture['__UUID']
                            }
                            cacheActiveTextureIndex != tTexture['__targetIndex'] ? tGL.uniform1i(tLocation, tTexture['__targetIndex']) : 0
                            cacheActiveTextureIndex = tTexture['__targetIndex']
                        }
                    } else if (tUniformValue['__webglTexture']) {

                        if (cacheTexture1_UUID == undefined) bitmapRenderable = false
                        if (tUniformValue['loaded']) {
                            if (cacheTexture1_UUID != tUniformValue['__UUID']) {
                                tUniformValue['actived'] ? 0 : tGL.activeTexture(tGL.TEXTURE0 + tUniformValue['__targetIndex'])
                                tUniformValue['actived'] = 1
                                // tGL.activeTexture(tGL.TEXTURE0 + tUniformValue['__targetIndex'])
                                tGL.bindTexture(tGL.TEXTURE_2D, tUniformValue['texture'])
                                cacheTexture1_UUID = tUniformValue['__UUID']
                            }
                            cacheActiveTextureIndex != tUniformValue['__targetIndex'] ? tGL.uniform1i(tLocation, tUniformValue['__targetIndex']) : 0
                            cacheActiveTextureIndex = tUniformValue['__targetIndex']
                        }
                    } else if (tUniformValue['__webglCubeTexture']) {
                        if (cacheTexture2_UUID == undefined) bitmapRenderable = false
                        if (tUniformValue['loaded']) {
                            if (cacheTexture2_UUID != tUniformValue['__UUID']) {
                                tUniformValue['actived'] ? 0 : tGL.activeTexture(tGL.TEXTURE0 + tUniformValue['__targetIndex'])
                                tUniformValue['actived'] = 1
                                // tGL.activeTexture(tGL.TEXTURE0 + tUniformValue['__targetIndex'])
                                tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, tUniformValue['texture'])
                                cacheTexture2_UUID = tUniformValue['__UUID']
                            }
                            cacheActiveCubeTextureIndex != tUniformValue['__targetIndex'] ? tGL.uniform1i(tLocation, tUniformValue['__targetIndex']) : 0
                            cacheActiveCubeTextureIndex = tUniformValue['__targetIndex']
                        }
                    } else throw '안되는 나쁜 타입인거야!!'
                }

                
                // TODO: 이건 상태봐서 업데이트 할지말지 결정하자
                if(tUniformLocationGroup['uNMatrix']){
                    tNMatrix =  mat4.clone(tMVMatrix)
                    mat4Inverse(tNMatrix,tNMatrix)
                    mat4.transpose(tNMatrix,tNMatrix)
                    tGL.uniformMatrix4fv(tUniformLocationGroup['uNMatrix']['location'], false, tNMatrix )
                }
                // uMVMatrix 입력 //TODO: 이것도 자동으로 하고싶은데...
                tGL.uniformMatrix4fv(tUniformLocationGroup['uMVMatrix']['location'], false, tMVMatrix)
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                // GL 드로잉상태관련 캐싱들 처리
                // TODO: CCW도먹어야하나?
                // 컬페이스 사용여부 캐싱처리
                if (cacheUseCullFace != tMesh['useCullFace']) {
                    (cacheUseCullFace = tMesh['useCullFace']) ? tGL.enable(tGL.CULL_FACE) : tGL.disable(tGL.CULL_FACE)
                }
                if (cacheCullFace != tMesh['cullFace']) tGL.cullFace(tMesh['cullFace']), cacheCullFace = tMesh['cullFace']
                // 뎁스테스트 사용여부 캐싱처리
                if (cacheUseDepthTest != tMesh['useDepthTest']) (cacheUseDepthTest = tMesh['useDepthTest']) ? tGL.enable(tGL.DEPTH_TEST) : tGL.disable(tGL.DEPTH_TEST)
                // 뎁스테스팅 캐싱처리
                if (cacheDepthTestFunc != tMesh['depthTestFunc']) tGL.depthFunc(cacheDepthTestFunc = tMesh['depthTestFunc'])
                // 블렌딩 사용여부 캐싱처리
                if (cacheUseBlendMode != tMesh['useBlendMode']) {
                    (cacheUseBlendMode = tMesh['useBlendMode']) ? tGL.enable(tGL.BLEND) : tGL.disable(tGL.BLEND)
                }
                // 블렌딩팩터 캐싱처리
                if (cacheBlendModeFactor != (tMesh['blendFactor1'] + tMesh['blendFactor2'])) {
                    tGL.blendFunc(tMesh['blendFactor1'], tMesh['blendFactor2'])
                    cacheBlendModeFactor = tMesh['blendFactor1'] + tMesh['blendFactor2']
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                if (tIndicesBuffer) {
                    if (bitmapRenderable) {
                        cacheDrawBufferUUID == tIndicesBuffer['__UUID'] ? 0 : tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIndicesBuffer['buffer'])
                        tGL.drawElements(tMesh['drawMode'], tIndicesBuffer['pointNum'], tGL.UNSIGNED_SHORT, 0)
                        cacheDrawBufferUUID = tIndicesBuffer['__UUID']
                    }
                } else {
                    tGL.drawArrays(tMesh['drawMode'], 0, tVertexPositionBuffer['pointNum'])
                    cacheDrawBufferUUID = tVertexPositionBuffer['__UUID']
                }
                // 자식을 콜
                tMesh['children'].length ? self.draw(tMesh['children'], time, tMVMatrix) : 0
            }
        }
    }
    /**DOC:
        {
            title :`RedMeshInfo`,
            code : `PROPERTY`,
            description : `
                - 렌더러 시작 매서드
            `,
            example : `
                var renderer = RedRender(RedGL Instance, RedSceneInfo Instance, function (time) {
                    // 렌더링시 사전호출될 콜백
                })
                renderer.start()
            `,
            return : `RedRender Instance`
        }
    :DOC*/
    RedRender.prototype = {
        start: function () {
            requestAnimationFrame(this.render)
        },
        pause: function () {
            //TODO:
        },
        resume: function () {
            //TODO:
        }
    }
    Object.freeze(RedRender)
})();
"use strict";
var redGLDetect;

(function () {
	var checkList, reg, makeCamelCase, i, k;
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`redGLDetect`,
			description : `
				- webgl 기본정보를 디텍팅한다.
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'}
				]
			},
			example : `
				redGLDetect(RedGL Instance)
			`,
			return : 'redGLDetect Instance'
		}
	:DOC*/
	redGLDetect = function (redGL) {
		if (!(this instanceof redGLDetect)) return new redGLDetect(redGL)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		tGL = redGL.gl
		checkList = ('VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,' +
			'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,' +
			'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,' +
			'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS').split(',');

		reg = /[_]\S/g
		makeCamelCase = function (v) {
			return v.charAt(1).toUpperCase()
		};
		i = checkList.length
		while (i--) this[k = checkList[i]] = tGL.getParameter(tGL[k])
	}
})();
"use strict";
var RedSkyBoxInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedSkyBoxInfo`,
        description : `
            <h2>RedMeshBaseInfo 상속객체</h2>
            - 기본 스카이박스 생성기
        `,
        params:{
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            srcList : [
                {type:'Array'},
                `
                    tGL.TEXTURE_CUBE_MAP_POSITIVE_X<br>
                    tGL.TEXTURE_CUBE_MAP_NEGATIVE_X<br>
                    tGL.TEXTURE_CUBE_MAP_POSITIVE_Y<br>
                    tGL.TEXTURE_CUBE_MAP_NEGATIVE_Y<br>
                    tGL.TEXTURE_CUBE_MAP_POSITIVE_Z<br>
                    tGL.TEXTURE_CUBE_MAP_NEGATIVE_Z<br>
                순으로 입력
                `
            ]
        },
        return : 'RedSkyBoxInfo Instance'
    }
:DOC*/
(function () {
    RedSkyBoxInfo = function (redGL, srcList) {
        if (!(this instanceof RedSkyBoxInfo)) return new RedSkyBoxInfo(redGL, srcList)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (!(srcList instanceof Array)) throw 'srcList는 Array만 허용됩니다.'
        if (srcList.length != 6) throw 'srcList는 6개여야 합니다.'
        RedMeshBaseInfo.call(this, redGL)
        this['materialInfo'] = RedMaterialInfo(redGL, 'skybox', RedCubeTextureInfo(redGL, srcList))
        this['geometryInfo'] = RedPrimitive.cube(redGL)
        this['scale'][0] = 1000//TODO: 카메라 far 물어야함
        this['scale'][1] = 1000
        this['scale'][2] = 1000
        this['cullFace'] = redGL.gl.FRONT
    }
    Object.freeze(RedSkyBoxInfo)
})();
"use strict";
var RedGL;
var REDGL_UUID; // 내부에서 사용할 고유아이디
(function () {
	var getGL;
	var instanceList = [];
	REDGL_UUID = 0
	getGL = (function () {
		var checkList; // 체크할 리스트
		var option; // 기본초기화 옵션
		var t0, i;
		option = {
			alpha: false,
			depth: true,
			failIfMajorPerformanceCaveat: false,
			premultipliedAlpha: false,
			preserveDrawingBuffer: false,
			stencil: false
		}
		checkList = 'experimental-webgl,webgl,webkit-3d,moz-webgl,3d'.split(',')
		return function (cvs) {
			i = checkList.length
			while (i--) {
				if (t0 = cvs.getContext(checkList[i], option)) return t0
			}
			throw "웹지엘을 사용할수없습니다."
		}
	})();
	/**DOC:
		{
			constructorYn : true,
			title :`RedGL`,
			description : `
				- RedGL 인스턴스 생성자
			`,
			params : {
				canvas : [
					{type:'Canvas Element'}
				],
				fullMode : [
					{type:'Boolean'},
					'- 기본값 false',
					'- true일경우 윈도우사이즈가 변할때마다 추적함'
				]
			},
			example : `
				RedGL(document.getElementById('test'))
			`,
			return : 'RedGL Instance'
		}
	:DOC*/
	RedGL = function (canvas, fullMode) {
		if (!(this instanceof RedGL)) return new RedGL(canvas, fullMode)
		var tGL;
		this['__canvas'] = canvas
		this['gl'] = tGL = getGL(canvas)
		fullMode ? this.setSize() : 0 // 풀모드일경우....처음 확장
		this['fullMode'] = fullMode
		this['__UUID'] = REDGL_UUID++
		this['__datas'] = {}
		this['detect'] = redGLDetect(this)
		console.log('RedGL 생성완료')
		// 초기상태정의
		// tGL.clearColor(0,0,0,0)
		// set the depthTest
		tGL.enable(tGL.DEPTH_TEST);
		tGL.depthFunc(tGL.LESS)
		// tGL.depthMask(false)
		// 컬링 페이스 설정
		tGL.frontFace(tGL.CCW)
		tGL.enable(tGL.CULL_FACE);
		tGL.cullFace(tGL.BACK)
		// 블렌드모드설정
		tGL.enable(tGL.BLEND);
		tGL.blendFunc(tGL.ONE, tGL.ONE_MINUS_SRC_ALPHA);
		// tGL.blendFuncSeparate(tGL.SRC_ALPHA, tGL.ONE_MINUS_SRC_ALPHA,tGL.ZERO, tGL.ONE);
		// 픽셀 블렌딩 결정
		tGL.pixelStorei(tGL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		// 픽셀 플립 기본설정
		tGL.pixelStorei(tGL.UNPACK_FLIP_Y_WEBGL, true);
		// 시저박스 설정
		tGL.enable(tGL.SCISSOR_TEST);
		tGL.scissor(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
		// set the viewport rectangle
		tGL.viewport(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
		
		instanceList.push(this)
	}
	window.addEventListener('resize', function () {
		instanceList.forEach(function (v) {
			if (v['fullMode']) v.setSize()
		})
	})
	RedGL.prototype = {
		/**DOC:
		{
			title :`setSize`,
			code: 'FUNCTION',
			description : `
				wengl 캔버스의 크기를 지정함.
				인자를 입력하지 않으면 화면상의 풀사이즈로 적용됨
			`,
			params : {
				width : [
					{type:'Number'},
					'가로값'
				],
				height : [
					{type:'Number'},
					'세로값'
				]
			},
			example : `
				인스턴스.setSize(600,600)
			`
		}
		:DOC*/
		setSize: function (width, height) {
			console.log('실행을했냐!')
			var gl;
			var W, H;
			W = width ? width : (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth)
			H = height ? height : (document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight)
			gl = this.gl
			W = W
			H = H
			this.__canvas.width = W * window.devicePixelRatio
			this.__canvas.height = H * window.devicePixelRatio
			this.__canvas.style.width = W
			this.__canvas.style.height = H
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
			// set the scissor rectangle
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		},
		/**DOC:
		{
			title :`calcNormal`,
			code: 'FUNCTION',
			description : `
				- 버텍스 정보와 인덱스정보를 토대로 노말데이터(Float32Array생성.
				- <span style="color:red">이놈음 다른곳으로 옮겨야할듯</span>
			`,
			params : {
				pos : [
					{type:'Float32Array'},
					'버덱스 데이터 정보'
				],
				idx : [
					{type:'Uint16Array'},
					'인덱스 데이터 정보'
				]
			},
			example : `
				var vs = new Float32Array(10)
				var is = new Uint16Array(10)
				RedGL인스턴스.calcNormal(vs,is)
			`,
			return : 'Float32Array Instance'
		}
		:DOC*/
		calcNormal: (function () {
			var sqrt, v1, v2;
			sqrt = Math.sqrt,
				v1 = { x: 0, y: 0, z: 0 }, v2 = { x: 0, y: 0, z: 0 };
			return function calcNormal(pos, idx) {
				var i, j, k, l;
				var ns = new Float32Array(pos.length)
				for (i = 0, j = pos.length; i < j; i++) ns[i] = 0.0;
				for (i = 0, j = idx.length; i < j; i += 3) {
					k = 3 * idx[i + 1],
						l = 3 * idx[i],
						v1.x = pos[k] - pos[l],
						v1.y = pos[k + 1] - pos[l + 1],
						v1.z = pos[k + 2] - pos[l + 2],
						l = 3 * idx[i + 2],
						v2.x = pos[l] - pos[k],
						v2.y = pos[l + 1] - pos[k + 1],
						v2.z = pos[l + 2] - pos[k + 2];
					for (k = 0; k < 3; k++) {
						l = 3 * idx[i + k],
							ns[l] += v1.y * v2.z - v1.z * v2.y,
							ns[l + 1] += v1.z * v2.x - v1.x * v2.z,
							ns[l + 2] += v1.x * v2.y - v1.y * v2.x;
					}
				}
				for (i = 0, j = pos.length; i < j; i += 3) {
					v1.x = ns[i],
						v1.y = ns[i + 1],
						v1.z = ns[i + 2],
						k = sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z) || 0.00001,
						ns[i] = v1.x / k,
						ns[i + 1] = v1.y / k,
						ns[i + 2] = v1.z / k;
				}
				return ns;
			};
		})(),
		/**DOC:
		{
			title :`getSourceFromScript`,
			code: 'FUNCTION',
			description : `
				script 소스를 가져옴
			`,
			params : {
				id : [
					{type:'String'},
					'아이디'
				]
			},
			example : `
				RedShaderInfo.getSourceFromScript(id)
			`,
			return : 'String'
		}
		:DOC*/
		getSourceFromScript: (function () {
			var shaderScript
			var str, k;
			return function (id) {
				shaderScript = document.getElementById(id)
				if (!shaderScript) throw "쉐이더소스가 없음!"
				str = "";
				k = shaderScript.firstChild;
				while (k) {
					if (k.nodeType == 3) str += k.textContent;
					k = k.nextSibling;
				}
				return str
			}
		})(),
		/**DOC:
		{
			title :`createShaderInfo`,
			code : 'FUNCTION',
			description : `
				- RedGL 쉐이더 생성기.
				- 유일키만 지원하며 키 중복일경우 기존 캐싱된 쉐이더정보를 반환함.
				- 단 프레그먼트/버텍스의 키는 따로 관리함.
			`,
			params : {
				key : [
					{type:'String'},
					'- 등록될 키명'
				],
				type : [
					{type:'String'},
					'- 버텍스 쉐이더(RedShaderInfo.VERTEX_SHADER)',
					'- 프레그먼트 쉐이더(RedShaderInfo.FRAGMENT_SHADER)'
				],
				source : [
					{type:'String'},
					'- 생성할 쉐이더 소스문자열'
				]
			},
			example : `
			 	var test;
				test = RedGL(Canvas Element)
				// basic이라는 이름으로 버텍스 쉐이더를 만든다. 
				test.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, 쉐이더소스)
			`,
			return : 'RedShaderInfo Instance'
		}
		:DOC*/
		createShaderInfo: function (key, type, source) {
			return new RedShaderInfo(this, key, type, source)
		},
		/**DOC:
		{
			title :`getShaderInfo`,
			code : 'FUNCTION',
			description : `
				- 정의된 쉐이더를 조회
			`
		}
		:DOC*/
		getShaderInfo: function (key, type) {
			return this['__datas']['shaderInfo'][type][key]
		},
		/**DOC:
		{
			title :`createProgram`,
			code : 'FUNCTION',
			description : `프로그램 생성 단축 매서드`
		}
		:DOC*/
		createProgramInfo: function (key, vShaderInfo, fShaderInfo, makeUniformValue) {
			return new RedProgramInfo(this, key, vShaderInfo, fShaderInfo, makeUniformValue)
		},
		/**DOC:
		{
			title :`getProgramInfo`,
			code : 'FUNCTION',
			description : `프로그램 조회`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 프로그램을 조회함'
				]
			}
		}
		:DOC*/
		getProgramInfo: function (key) {
			return this['__datas']['RedProgramInfo'][key]
		},
		/**DOC:
		{
			title :`createArrayBufferInfo`,
			code : 'FUNCTION',
			description : `Array버퍼 생성 단축 매서드`
		}
		:DOC*/
		createArrayBufferInfo: function (key, shaderPointerKey, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			//TODO: pointNum, arrayType도 그냥 단축시켜버릴까 -_-
			return new RedBufferInfo(this, RedBufferInfo.ARRAY_BUFFER, key, shaderPointerKey, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		/**DOC:
		{
			title :`createIndexBufferInfo`,
			code : 'FUNCTION',
			description : `ElementArray버퍼 생성 단축 매서드`
		}
		:DOC*/
		createIndexBufferInfo: function (key, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			//TODO: pointNum, arrayType도 그냥 단축시켜버릴까 -_-
			return new RedBufferInfo(this, RedBufferInfo.ELEMENT_ARRAY_BUFFER, key, null, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		/**DOC:
		{
			title :`getArrayBufferInfo`,
			code : 'FUNCTION',
			description : `Array버퍼 조회 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 Array버퍼를 조회함'
				]
			}
		}
		:DOC*/
		getArrayBufferInfo: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		/**DOC:
		{
			title :`getIndexBufferInfo`,
			code : 'FUNCTION',
			description : `ElementArray버퍼 조회 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 ElementArray버퍼를 조회함'
				]
			}
		}
		:DOC*/
		getIndexBufferInfo: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		/**DOC:
		{
			title :`createGeometryInfo`,
			code : 'FUNCTION',
			description : `지오메트리정보 생성 단축 매서드`
		}
		:DOC*/
		createGeometryInfo: function (key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer) {
			//TODO: texcoordBuffer, normalBuffer 이없으면 자동생성할수있게!
			return new RedGeometryInfo(this, key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer)
		},
		/**DOC:
		{
			title :`getGeometryInfo`,
			code : 'FUNCTION',
			description : `지오메트리정보 조회 매서드.`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 지오메트리정보를 조회함'
				]
			}
		}
		:DOC*/
		getGeometryInfo: function (key) {
			return this['__datas']['RedGeometryInfo'][key]
		},
		/**DOC:
		{
			title :`createMaterialDefine`,
			code : 'FUNCTION',
			description : `재질정의정보 생성 단축 매서드`
		}
		:DOC*/
		createMaterialDefine: function (programInfo) {
			return new RedMaterialDefine(this, programInfo)
		},
		/**DOC:
		{
			title :`createMaterialInfo`,
			code : 'FUNCTION',
			description : `재질정보 생성 단축 매서드`
		}
		:DOC*/
		createMaterialInfo: function (typeName, diffuseInfo) {
			return new RedMaterialInfo(this, typeName, diffuseInfo)
		},
		/**DOC:
		{
			title :`createTextureInfo`,
			code : 'FUNCTION',
			description : `텍스쳐정보 생성 단축 매서드`
		}
		:DOC*/
		createTextureInfo: function (src, targetIndex, internalFormat, format, type, callback) {
			return new RedTextureInfo(this, src, targetIndex, internalFormat, format, type, callback)
		},
		/**DOC:
		{
			title :`createMeshInfo`,
			code : 'FUNCTION',
			description : `매시정보 단축 생성 매서드`
		}
		:DOC*/
		createMeshInfo: function (key, geometry, material) {
			return new RedMeshInfo(this, key, geometry, material)
		},
		/**DOC:
		{
			title :`getMeshInfo`,
			code : 'FUNCTION',
			description : `매시정보 조회 단축 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 매쉬를 조회함'
				]
			}
		}
		:DOC*/
		getMeshInfo: function (key) {
			return this['__datas']['RedMeshInfo'][key]
		},
		/**DOC:
		{
			title :`createSceneInfo`,
			code : 'FUNCTION',
			description : `씬정보 단축 생성 매서드`
		}
		:DOC*/
		createSceneInfo: function (key, camera) {
			return new RedSceneInfo(this, key, camera)
		}
	}
})();
"use strict";
var Atlas;
(function () {
    var Rect;
    Rect = function (x, y, w, h) {
        this.x = x; this.y = y;
        this.w = w; this.h = h;
    }

    Rect.prototype.fitsIn = function (outer) {
        return outer.w >= this.w && outer.h >= this.h;
    };

    Rect.prototype.sameSizeAs = function (other) {
        return this.w === other.w && this.h === other.h;
    };

    Atlas = function (x, y, w, h) {
        if (arguments.length === 1) {
            this.canvas = x;
            x = y = 0;
            w = this.canvas.width;
            h = this.canvas.height;
        }
        if (arguments.length === 2) {
            w = x; h = y; x = y = 0;
        }
        this.left = this.right = null;
        this.rect = new Rect(x, y, w, h);
        this.filled = false;
        this.tilepad = false;
        this._cache = [];
        this._uvcache = Object.create(null);
    }

    // pack image/rect to the atlas
    Atlas.prototype.pack = function (rect) {
        this._cache = [];
        this._uvcache = Object.create(null);
        rect = this._toRect(rect);

        if (this.img && this.tilepad) {
            rect = this._tilepad(rect);
        }

        if (this.left !== null) {
            return this._ontoCanvas(this.left.pack(rect) || this.right.pack(rect));
        }
        // if atlas filled or wont fit
        if (this.filled || !rect.fitsIn(this.rect)) {
            return false;
        }
        // if this atlas has been filled
        if (rect.sameSizeAs(this.rect)) {
            this.filled = true;
            return this._ontoCanvas(this);
        }
        if ((this.rect.w - rect.w) > (this.rect.h - rect.h)) {
            this.left = new Atlas(this.rect.x, this.rect.y, rect.w, this.rect.h);
            this.right = new Atlas(this.rect.x + rect.w, this.rect.y, this.rect.w - rect.w, this.rect.h);
        } else {
            this.left = new Atlas(this.rect.x, this.rect.y, this.rect.w, rect.h);
            this.right = new Atlas(this.rect.x, this.rect.y + rect.h, this.rect.w, this.rect.h - rect.h);
        }
        return this._ontoCanvas(this.left.pack(rect));
    };

    Atlas.prototype.expand = function (rect) {
        var self = this;
        rect = this._toRect(rect);

        if (this.img && this.tilepad) {
            rect = this._tilepad(rect);
        }

        var atlas;
        if (this.rect.w < this.rect.h) {
            atlas = new Atlas(0, 0, this.rect.w + rect.w, this.rect.h);
            atlas.right = new Atlas(this.rect.w, 0, rect.w, this.rect.h);
            atlas.left = this;
        } else {
            atlas = new Atlas(0, 0, this.rect.w, this.rect.h + rect.h);
            atlas.right = new Atlas(0, this.rect.h, this.rect.w, rect.h);
            atlas.left = this;
        }

        ['canvas', 'context', 'img'].forEach(function (p) {
            if (self[p]) {
                atlas[p] = self[p];
                self[p] = null;
            }
        });

        // resize canvas
        if (atlas.canvas) {
            if (!atlas.context) {
                atlas.context = atlas.canvas.getContext('2d');
            }
            var old = atlas.context.getImageData(0, 0, atlas.canvas.width, atlas.canvas.height);
            atlas.canvas.width = atlas.rect.w;
            atlas.canvas.height = atlas.rect.h;
            atlas.context.putImageData(old, 0, 0);
        }

        return (atlas.pack(rect) === false) ? atlas.expand(rect) : atlas;
    };

    Atlas.prototype.index = function () {
        var self = this;
        if (self._cache.length > 0) {
            return self._cache;
        }
        (function loop(atlas) {
            if (atlas.left !== null) {
                loop(atlas.left);
                loop(atlas.right);
            } else if (atlas.rect.name) {
                self._cache.push(atlas.rect);
            }
        }(self));
        return self._cache;
    };

    Atlas.prototype.uv = function (w, h) {
        var self = this;
        w = w || self.rect.w;
        h = h || self.rect.h;
        var isPad = this.tilepad;
        (function loop(atlas) {
            if (atlas.left !== null) {
                loop(atlas.left);
                loop(atlas.right);
            } else if (typeof atlas.rect.name !== 'undefined') {
                var p = (isPad) ? atlas.rect.w / 4 : 0;
                self._uvcache[atlas.rect.name] = [
                    [atlas.rect.x + p, atlas.rect.y + p],
                    [(atlas.rect.x + p) + (atlas.rect.w - (p * 2)), atlas.rect.y + p],
                    [(atlas.rect.x + p) + (atlas.rect.w - (p * 2)), (atlas.rect.y + p) + (atlas.rect.h - (p * 2))],
                    [(atlas.rect.x + p), (atlas.rect.y + p) + (atlas.rect.h - (p * 2))],
                ].map(function (uv) {
                    if (uv[0] !== 0) {
                        uv[0] = uv[0] / w;
                    }
                    if (uv[1] !== 0) {
                        uv[1] = uv[1] / h;
                    }
                    return uv;
                });
            }
        }(self));
        return self._uvcache;
    };

    Atlas.prototype.json = function (input) {
        var self = this;
        if (input) {
            if (typeof input === 'string') input = JSON.parse(input);
            return (function loop(obj) {
                if (!obj || !obj.rect) return;
                var atlas = new Atlas(obj.rect.x, obj.rect.y, obj.rect.w, obj.rect.h);
                if (obj.left) atlas.left = loop(obj.left);
                if (obj.right) atlas.right = loop(obj.right);
                return atlas;
            }(input));
        } else {
            return JSON.stringify(function loop(atlas) {
                var obj = {
                    left: null, right: null,
                    rect: atlas.rect, filled: atlas.filled
                };
                if (atlas.left !== null) {
                    obj.left = loop(atlas.left);
                    obj.right = loop(atlas.right);
                }
                return obj;
            }(self), null, 2);
        }
    };

    // Pads the image by tiling itself around itself
    Atlas.prototype._tilepad = function (rect) {
        var img = this.img;
        if (!img) return rect;

        var p = img.width / 2;

        var canvas = document.createElement('canvas');
        canvas.name = img.name || img.src;
        canvas.id = img.id || '';
        canvas.width = img.width + img.width;
        canvas.height = img.height + img.height;
        var ctx = canvas.getContext('2d');

        var pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.translate(p, p);
        ctx.fillRect(-p, -p, canvas.width + p, canvas.height + p);
        ctx.translate(-p, -p);

        this.img = canvas;

        return new Rect(rect.x, rect.y, this.img.width, this.img.height);
    };

    // if has an image and canvas, draw to the canvas as we go
    Atlas.prototype._ontoCanvas = function (node) {
        if (node && this.img && this.canvas) {
            if (!this.context) {
                this.context = this.canvas.getContext('2d');
            }
            this.canvas.ctx = this.context
            this.context.clearRect(node.rect.x, node.rect.y, node.rect.w, node.rect.h);
            this.context.drawImage(this.img, node.rect.x, node.rect.y, node.rect.w, node.rect.h);
            node.rect.name = this.img.id || this.img.name || this.img.src || null;
        }
        return node;
    };

    // make sure we're always working with rects
    Atlas.prototype._toRect = function (rect) {
        // if rect is an image
        if (rect.nodeName && (rect.nodeName === 'IMG' || rect.nodeName === 'CANVAS')) {
            this.img = rect;
            rect = new Rect(rect.x, rect.y, rect.width, rect.height);
        }
        // if rect is an object
        if (!(rect instanceof Rect)) {
            rect = new Rect(rect.x || 0, rect.y || 0, rect.w || rect.width, rect.h || rect.height);
        }
        return rect;
    };

    Atlas.prototype._debug = function () {
        if (!this.canvas) { return; }
        var context = this.canvas.getContext('2d');
        this.index().forEach(function (rect) {
            context.lineWidth = 1;
            context.strokeStyle = 'red';
            context.strokeRect(rect.x, rect.y, rect.w, rect.h);
        });
    };

})()