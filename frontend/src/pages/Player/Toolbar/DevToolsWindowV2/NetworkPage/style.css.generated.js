function v(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r}function p(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);t&&(a=a.filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),e.push.apply(e,a)}return e}function m(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?p(Object(e),!0).forEach(function(a){v(r,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):p(Object(e)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(e,a))})}return r}var d=(r,t,e)=>{for(var a of Object.keys(r)){var u;if(r[a]!==((u=t[a])!==null&&u!==void 0?u:e[a]))return!1}return!0},l=r=>t=>{var e=r.defaultClassName,a=m(m({},r.defaultVariants),t);for(var u in a){var i,o=(i=a[u])!==null&&i!==void 0?i:r.defaultVariants[u];if(o!=null){var n=o;typeof n=="boolean"&&(n=n===!0?"true":"false");var f=r.variantClassNames[u][n];f&&(e+=" "+f)}}for(var[b,s]of r.compoundVariants)d(b,a,r.defaultVariants)&&(e+=" "+s);return e};var w="riaubm0",x="riaubm2",P="riaubm1",j="riaubm6",y=l({defaultClassName:"riaubm7",variantClassNames:{current:{true:"riaubm8",false:"riaubm9"},failedResource:{true:"riaubma",false:"riaubmb"},showingDetails:{true:"riaubmc",false:"riaubmd"}},defaultVariants:{},compoundVariants:[]}),g="riaubm5",V="riaubm4",h="riaubm3";export{w as container,x as nameSection,P as networkBox,j as networkHeader,y as networkRowVariants,g as timingBar,V as timingBarEmptySection,h as timingBarWrapper};
