import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_BMbFZsAh.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Mekkiou/Desktop/portfolio/","cacheDir":"file:///C:/Users/Mekkiou/Desktop/portfolio/node_modules/.astro/","outDir":"file:///C:/Users/Mekkiou/Desktop/portfolio/dist/","srcDir":"file:///C:/Users/Mekkiou/Desktop/portfolio/src/","publicDir":"file:///C:/Users/Mekkiou/Desktop/portfolio/public/","buildClientDir":"file:///C:/Users/Mekkiou/Desktop/portfolio/dist/","buildServerDir":"file:///C:/Users/Mekkiou/Desktop/portfolio/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"sitemap.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml\\/?$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/dislike/[postid]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/dislike\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"dislike","dynamic":false,"spread":false}],[{"content":"postId","dynamic":true,"spread":false}]],"params":["postId"],"component":"src/pages/api/dislike/[postId].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/like/[postid]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/like\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"like","dynamic":false,"spread":false}],[{"content":"postId","dynamic":true,"spread":false}]],"params":["postId"],"component":"src/pages/api/like/[postId].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://astounding-starship-ecec42.netlify.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/lib/data-utils.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/components/PageHead.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/projects/[...id].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/projects/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/sitemap.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/sitemap.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Mekkiou/Desktop/portfolio/src/pages/image/[...id].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/image/[...id].png@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/dislike/[postId]@_@ts":"pages/api/dislike/_postid_.astro.mjs","\u0000@astro-page:src/pages/api/like/[postId]@_@ts":"pages/api/like/_postid_.astro.mjs","\u0000@astro-page:src/pages/image/[...id].png@_@ts":"pages/image/_---id_.png.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/sitemap.xml@_@ts":"pages/sitemap.xml.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/projects/[...id]@_@astro":"pages/projects/_---id_.astro.mjs","\u0000@astro-page:src/pages/projects/[...page]@_@astro":"pages/projects/_---page_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","C:\\Users\\Mekkiou\\Desktop\\portfolio\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_D48STd5E.mjs","C:/Users/Mekkiou/Desktop/portfolio/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","\u0000@astrojs-manifest":"manifest_B2cn6Uhg.mjs","C:\\Users\\Mekkiou\\Desktop\\portfolio\\.astro\\content-assets.mjs":"chunks/content-assets_ScLmS6OB.mjs","\u0000astro:assets":"chunks/_astro_assets_l1STTsV_.mjs","@/components/react/projects-header":"_astro/projects-header.DopcjyZx.js","@/components/react/projects-grid":"_astro/projects-grid.BxB43Z9n.js","@/components/ui/pagination":"_astro/pagination.BrFR0gUN.js","@/components/react/skills":"_astro/skills.BV_yiDuH.js","@/components/react/expertise":"_astro/expertise.i8zf-1jC.js","@/components/react/parcours":"_astro/parcours.CXgBnfKB.js","@/components/react/contact-form":"_astro/contact-form.DdP-AIUK.js","@/components/react/navbar":"_astro/navbar.-CX21Zea.js","@/components/ui/scroll-area":"_astro/scroll-area.DZqAbf93.js","C:/Users/Mekkiou/Desktop/portfolio/src/components/react/footer-likes":"_astro/footer-likes.C2Itz9nf.js","@astrojs/react/client.js":"_astro/client.BGorravR.js","C:/Users/Mekkiou/Desktop/portfolio/src/components/TableOfContents.astro?astro&type=script&index=0&lang.ts":"_astro/TableOfContents.astro_astro_type_script_index_0_lang.DqFV0k4g.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Mekkiou/Desktop/portfolio/src/components/TableOfContents.astro?astro&type=script&index=0&lang.ts","function s(){const t=document.querySelector(\"header\"),c=t?t.offsetHeight:0,a=new IntersectionObserver(e=>{e.forEach(o=>{const r=o.target.querySelector(\"h2, h3, h4, h5, h6\");if(!r)return;const d=r.getAttribute(\"id\"),n=document.querySelector(`#table-of-contents li a[href=\"#${d}\"]`);if(!n)return;const i=o.isIntersecting?\"add\":\"remove\";n.classList[i](\"text-foreground\")})},{rootMargin:`-${c}px 0px 0px 0px`});document.querySelectorAll(\".prose section\").forEach(e=>{a.observe(e)})}document.addEventListener(\"astro:page-load\",s);document.addEventListener(\"astro:after-swap\",s);"]],"assets":["/_astro/ec.hzccm.css","/_astro/ec.8zarh.js","/_astro/mémoire.De86Izzi.png","/_astro/gestion_projet.CYULL9zp.png","/_astro/image_representative_projet_golem.COSXJYwB.png","/_astro/logbook.B3nuCB7c.png","/_astro/image_representative_auto_ia.S1Y_T0cd.png","/_astro/image_representative_tutorat.DNRj1fkH.png","/_astro/image_representative_auto_rapport_commercial.mGGJxALb.png","/_astro/data_science.DF4cs36D.png","/_astro/image_representative_bourse.Dr8HlREQ.png","/_astro/TP_Data_science.CLsE4EUS.png","/_astro/index.s8ll7FGo.css","/apple-touch-icon.png","/favicon-96x96.png","/favicon.ico","/favicon.svg","/logo.png","/logo.svg","/logobg.png","/ogImage.png","/site.webmanifest","/web-app-manifest-192x192.png","/web-app-manifest-512x512.png","/fonts/ClashDisplay-Semibold.eot","/fonts/ClashDisplay-Semibold.ttf","/fonts/ClashDisplay-Semibold.woff","/fonts/ClashDisplay-Semibold.woff2","/fonts/GeistMonoVF.woff2","/fonts/GeistVF.woff2","/fonts/_montserrat_bold.ttf","/fonts/_montserrat_regular.ttf","/static/cisco.png","/static/cnam.png","/static/cojocarudavidme.png","/static/cursor.png","/static/CV_Mekkiou_Adam_M1.pdf","/static/data_science.png","/static/david-dark-code.png","/static/doc technique_loogbook.pdf","/static/doc_user_logbook.pdf","/static/Gestion_de_projet_L3.pdf","/static/gestion_projet.png","/static/image_representative_auto_ia.png","/static/image_script_python.png","/static/Le-Rebours_logo.png","/static/Lettres_Recommandation_Mekkiou_Adam.pdf","/static/logbook.png","/static/logo IXI groupe.png","/static/logo.png","/static/logo.svg","/static/Memoire-L3-STS-Adam-Mekkiou.pdf","/static/modern-portfolio.png","/static/Mémoire-L3-STS-Adam-Mekkiou.pdf","/static/mémoire.png","/static/profile.jpg","/static/Rapport_Projet_Data_Science_L3.pdf","/static/tailci.png","/static/TP1_lerebours_Mekkiou_Adam_STS.ipynb","/static/TP2_Mekkiou_Adam_STS1.ipynb","/static/TP4_Mekkiou_Adam_STS_LeRebours .ipynb","/static/TP_Data_science.png","/static/upn.jpg","/_astro/button.Cz7R1VBp.js","/_astro/chevron-right.DDP3Kvf-.js","/_astro/client.BGorravR.js","/_astro/code.BjyBVuiQ.js","/_astro/consts.DuUZ5-wP.js","/_astro/contact-form.DdP-AIUK.js","/_astro/createLucideIcon.BA92dhOu.js","/_astro/expertise.i8zf-1jC.js","/_astro/footer-likes.C2Itz9nf.js","/_astro/index.BeBTQngw.js","/_astro/index.BpxR8OyZ.js","/_astro/index.CRVbtxaI.js","/_astro/index.CVVkBhRr.js","/_astro/index.P_0-a57H.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/navbar.-CX21Zea.js","/_astro/pagination.BrFR0gUN.js","/_astro/parcours.CXgBnfKB.js","/_astro/projects-grid.BxB43Z9n.js","/_astro/projects-header.DopcjyZx.js","/_astro/proxy.D3NmTiqj.js","/_astro/scroll-area.DZqAbf93.js","/_astro/skills.BV_yiDuH.js","/_astro/utils.Cd13OnTz.js","/static/Automatisation IA/certificat_formation_python_agent_ia_udemy.pdf","/static/Automatisation IA/certificat_formation_python_agent_ia_udemy.png","/static/Automatisation IA/image_representative_auto_ia.png","/static/Automatisation IA/WorkFlow_N8N_LLM.png","/static/Automatisation_Rapport_Commercial_L3/image_2_power_automate_workflow_rapport_commercial.png","/static/Automatisation_Rapport_Commercial_L3/image_hébergement_local_power_automate_workflow_rapport_commercial.png","/static/Automatisation_Rapport_Commercial_L3/image_power_automate_workflow_rapport_commercial.png","/static/Automatisation_Rapport_Commercial_L3/image_representative_auto_rapport_commercial.png","/static/Automatisation_Rapport_Commercial_L3/image_script_python.png","/static/Automatisation_Rapport_Commercial_L3/resultat_automatisation_excel.png","/static/Automatisation_Rapport_Commercial_L3/tableaux_commercial_power_automate_rapport_commercial.png","/static/Dev_Full_Stack_Tutorat/bdd1.png","/static/Dev_Full_Stack_Tutorat/creation_demande.png","/static/Dev_Full_Stack_Tutorat/demandes.png","/static/Dev_Full_Stack_Tutorat/image_representative_tutorat.png","/static/Dev_Full_Stack_Tutorat/login.png","/static/Dev_Full_Stack_Tutorat/partie_etudiant.png","/static/Dev_Full_Stack_Tutorat/schéma_uml_bdd.png","/static/Dev_Full_Stack_Bourse/actionsnonpossedées.png","/static/Dev_Full_Stack_Bourse/actions_traders.png","/static/Dev_Full_Stack_Bourse/bddBourse.png","/static/Dev_Full_Stack_Bourse/image_representative_bourse.png","/static/Dev_Full_Stack_Bourse/schema_uml_bdd_gestion_bourse.png","/static/Dev_Full_Stack_Bourse/traders.png","/static/Dev_Full_Stack_Bourse/vendre_action.png","/static/Gestion_Projet_Automatisation/Golem - Exemple catégorie mail.png","/static/Gestion_Projet_Automatisation/Golem - Workflow Fonctionnel.png","/static/Gestion_Projet_Automatisation/image_exemple_mail.PNG","/static/Gestion_Projet_Automatisation/image_representative_projet_golem.png","/404.html","/robots.txt","/rss.xml","/sitemap.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"qFv6DPyYXduv3tn1o0GDmPcGIUr4CNOnJ8pDV92DCa0=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
