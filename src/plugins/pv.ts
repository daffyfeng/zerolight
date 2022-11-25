import { logSiteAccess } from "@/api/common";

const events: any[] = [],
  timer: any = null;
const MAX_CACHE_LEN = 5,
  MAX_WAITING_TIME = 5e3;

function clickCollection() {
  document.addEventListener(
    "click",
    function (e: any) {
      let t;
      const n = e.path,
        r: any = {
          eventType: "click",
        },
        o = n.find(function (e: any) {
          return (
            e.hasAttribute &&
            (e.hasAttribute("data-warden-container") ||
              e.hasAttribute("data-warden-event-id") ||
              e.hasAttribute("data-warden-title"))
          );
        });
      o &&
        ((r.params = extractParamsByPath(n)),
        (r.url = window.location.href),
        emit(r));
    },
    !0
  );
}

function extractParamsByPath(e: any[]) {
  let r: number = -1;
  e = e ? e : [];
  const n = /^data-warden-/;
  try {
    e.forEach(function (e, t) {
      e = (e && e.attributes && Array.from(e.attributes)) || [];
      if (
        e.find(function (e: any) {
          return e.nodeName.match(n)
            ? e.nodeName.match(n)
            : -1 !== e.nodeName.indexOf("data-warden-container");
        })
      ) {
        throw (r = t);
        Error();
      }
    });
  } catch (e) {
    console.log(e);
  }
  if (r < 0) return {};

  e = Array.from(e[r].attributes) || [];
  const o: any = {};
  e.forEach(function (e) {
    let t;
    e.nodeName.indexOf("data-warden") < 0 ||
      ((t = e.nodeName.replace(n, "")), (o[t] = e.nodeValue));
  });
  return o;
}

function emit(e: any) {
  // const t = undefined;
  // (events = events.concat(e)),
  //   clearTimeout(timer),
  //   events.length >= MAX_CACHE_LEN || t
  //     ? send()
  //     : (timer = setTimeout(function () {
  //         send();
  //       }, MAX_WAITING_TIME));
  logSiteAccess(e.params);
}

function send() {
  console.log("send");
  console.log(events);
}

const pv = {
  install(app: any, options: any) {
    clickCollection();
  },
};

export default pv;
