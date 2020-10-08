!function() {
  e = function() {
      "use strict";
      window.innerShiv = function() {
          function n(e, t, r) {
              return /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(r) ? e : t + "></" + r + ">"
          }
          var s, o = document, d = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" ");
          return function(e, t) {
              if (!s && ((s = o.createElement("div")).innerHTML = "<nav></nav>",
              1 !== s.childNodes.length)) {
                  for (var r = o.createDocumentFragment(), a = d.length; a--; )
                      r.createElement(d[a]);
                  r.appendChild(s)
              }
              if (e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/(<([\w:]+)[^>]*?)\/>/g, n),
              s.innerHTML = (r = e.match(/^<(tbody|tr|td|col|colgroup|thead|tfoot)/i)) ? "<table>" + e + "</table>" : e,
              r = r ? s.getElementsByTagName(r[1])[0].parentNode : s,
              !1 === t)
                  return r.childNodes;
              a = o.createDocumentFragment();
              for (var i = r.childNodes.length; i--; )
                  a.appendChild(r.firstChild);
              return a
          }
      }()
  }
  ,
  t = {
      exports: {}
  },
  e.call(t.exports, t, t.exports),
  t.exports;
  var e, t;
  (function() {
      window.SPR = function() {
          function n() {}
          return n.shop = Shopify.shop,
          n.host = "https://productreviews.shopifycdn.com",
          n.version = "v4",
          n.api_url = n.host + "/proxy/" + n.version,
          n.badgeEls = [],
          n.reviewEls = [],
          n.elSettings = {},
          n.$ = void 0,
          n.extraAjaxParams = {
              shop: n.shop
          },
          n.registerCallbacks = function() {
              return this.$(document).bind("spr:badge:loaded", "undefined" != typeof SPRCallbacks && null !== SPRCallbacks ? SPRCallbacks.onBadgeLoad : void 0),
              this.$(document).bind("spr:product:loaded", "undefined" != typeof SPRCallbacks && null !== SPRCallbacks ? SPRCallbacks.onProductLoad : void 0),
              this.$(document).bind("spr:reviews:loaded", "undefined" != typeof SPRCallbacks && null !== SPRCallbacks ? SPRCallbacks.onReviewsLoad : void 0),
              this.$(document).bind("spr:form:loaded", "undefined" != typeof SPRCallbacks && null !== SPRCallbacks ? SPRCallbacks.onFormLoad : void 0),
              this.$(document).bind("spr:form:success", "undefined" != typeof SPRCallbacks && null !== SPRCallbacks ? SPRCallbacks.onFormSuccess : void 0),
              this.$(document).bind("spr:form:failure", "undefined" != typeof SPRCallbacks && null !== SPRCallbacks ? SPRCallbacks.onFormFailure : void 0)
          }
          ,
          n.loadStylesheet = function() {
              var e;
              return (e = document.createElement("link")).setAttribute("rel", "stylesheet"),
              e.setAttribute("type", "text/css"),
              e.setAttribute("href", "https://productreviews.shopifycdn.com/assets/v4/spr-805222bdeda8199e3a86a468a398e3070e6126868692225ffa23ac7502b1eca2.css"),
              e.setAttribute("media", "screen"),
              document.getElementsByTagName("head")[0].appendChild(e)
          }
          ,
          n.initRatingHandler = function() {
              return n.$(document).on("mouseover mouseout", "form a.spr-icon-star", function(e) {
                  var t, r, a;
                  return t = e.currentTarget,
                  a = n.$(t).attr("data-value"),
                  r = n.$(t).parent(),
                  "mouseover" === e.type ? (r.find("a.spr-icon:lt(" + a + ")").addClass("spr-icon-star-hover"),
                  r.find("a.spr-icon:gt(" + (a - 1) + ")").removeClass("spr-icon-star-hover")) : r.find("a.spr-icon").removeClass("spr-icon-star-hover")
              })
          }
          ,
          n.initDomEls = function() {
              return this.badgeEls = this.$(".shopify-product-reviews-badge[data-id]"),
              this.reviewEls = this.$("#shopify-product-reviews[data-id]"),
              this.$.each(this.reviewEls, (a = this,
              function(e, t) {
                  var r;
                  return r = a.$(t).attr("data-id"),
                  a.elSettings[r] = {},
                  a.elSettings[r].reviews_el = "#" + (a.$(t).attr("data-reviews-prefix") ? a.$(t).attr("data-reviews-prefix") : "reviews_"),
                  a.elSettings[r].form_el = "#" + (a.$(t).attr("data-form-prefix") ? a.$(t).attr("data-form-prefix") : "form_")
              }
              ));
              var a
          }
          ,
          n.loadProducts = function() {
              return this.$.each(this.reviewEls, (i = this,
              function(e, t) {
                  var r, a;
                  if (r = i.$(t).attr("data-id"),
                  "false" !== i.$(t).attr("data-autoload"))
                      return a = i.$.extend({
                          product_id: r,
                          version: i.version
                      }, i.extraAjaxParams),
                      i.$.get(i.api_url + "/reviews/product", a, i.productCallback, "jsonp")
              }
              ));
              var i
          }
          ,
          n.loadBadges = function() {
              var e, t, r, a, i, n;
              if (0 < (r = this.$.map(this.badgeEls, (n = this,
              function(e) {
                  return n.$(e).attr("data-id")
              }
              ))).length) {
                  for (t = 7,
                  i = []; 0 < (e = r.splice(0, t)).length; )
                      a = this.$.extend(this.extraAjaxParams, {
                          product_ids: e
                      }),
                      i.push(this.$.get(this.api_url + "/reviews/badges", a, this.badgesCallback, "jsonp"));
                  return i
              }
          }
          ,
          n.pageReviews = function(e) {
              var t, r, a;
              return a = this.$(e).data("product-id"),
              r = this.$(e).data("page"),
              t = this.$.extend({
                  page: r,
                  product_id: a
              }, this.extraAjaxParams),
              this.$.get(this.api_url + "/reviews", t, this.paginateCallback, "jsonp"),
              !1
          }
          ,
          n.submitForm = function(e) {
              var t, r, a;
              return t = this.$(e).serializeObject(),
              t = this.$.extend(t, this.extraAjaxParams),
              t = (t = this.$.param(t)).replace(/%0D%0A/g, "%0A"),
              this.$.ajax({
                  url: this.api_url + "/reviews/create",
                  type: "GET",
                  dataType: "jsonp",
                  data: t,
                  success: this.formCallback,
                  beforeSend: (a = this,
                  function() {
                      return a.$(".spr-button-primary").attr("disabled", "disabled")
                  }
                  ),
                  complete: (r = this,
                  function() {
                      return r.$(".spr-button-primary").removeAttr("disabled")
                  }
                  )
              }),
              !1
          }
          ,
          n.reportReview = function(e) {
              var t;
              return confirm("Are you sure you want to report this review as inappropriate?") && (t = this.$.extend({
                  id: e
              }, this.extraAjaxParams),
              this.$.get(this.api_url + "/reviews/report", t, this.reportCallback, "jsonp")),
              !1
          }
          ,
          n.toggleReviews = function(e) {
              return this.$("#shopify-product-reviews[data-id='" + e + "']").find(".spr-reviews").toggle()
          }
          ,
          n.toggleForm = function(e) {
              return this.$("#shopify-product-reviews[data-id='" + e + "']").find(".spr-form").toggle()
          }
          ,
          n.setRating = function(e) {
              var t, r, a;
              return t = this.$(e).parents("form"),
              a = this.$(e).attr("data-value"),
              r = this.$(e).parent(),
              t.find("input[name='review[rating]']").val(a),
              this.setStarRating(a, r)
          }
          ,
          n.setStarRating = function(e, t) {
              return t.find("a:lt(" + e + ")").removeClass("spr-icon-star-empty spr-icon-star-hover"),
              t.find("a:gt(" + (e - 1) + ")").removeClass("spr-icon-star-hover").addClass("spr-icon-star-empty")
          }
          ,
          n.badgesCallback = function(e) {
              var r;
              return r = e.badges,
              n.$.map(n.badgeEls, function(e) {
                  var t;
                  if (t = n.$(e).attr("data-id"),
                  r[t] !== undefined)
                      return n.$(e).replaceWith(r[t]),
                      n.triggerEvent("spr:badge:loaded", {
                          id: t
                      })
              })
          }
          ,
          n.productCallback = function(e) {
              var t;
              return t = e.remote_id.toString(),
              n.renderProduct(t, e.product_stripped, e.aggregate_rating),
              n.renderForm(t, e.form),
              n.renderReviews(t, e.reviews)
          }
          ,
          n.renderProduct = function(t, r, a) {
              return this.$.map(this.reviewEls, (i = this,
              function(e) {
                  if (t === i.$(e).attr("data-id"))
                      return i.$(e).html([innerShiv(r, !1), a]),
                      i.triggerEvent("spr:product:loaded", {
                          id: t
                      })
              }
              ));
              var i
          }
          ,
          n.renderForm = function(e, t) {
              return this.$(this.elSettings[e].form_el + e).html(t),
              this.triggerEvent("spr:form:loaded", {
                  id: e
              })
          }
          ,
          n.renderReviews = function(e, t) {
              return n.$(n.elSettings[e].reviews_el + e).html(t),
              n.triggerEvent("spr:reviews:loaded", {
                  id: e
              })
          }
          ,
          n.formCallback = function(e) {
              var t, r, a, i;
              return i = e.status,
              a = e.remote_id,
              r = e.form,
              (t = n.$(n.elSettings[a].form_el + a)).html(r),
              "failure" === i && n.initStarRating(t),
              "success" === i && (n.$("#shopify-product-reviews[data-id='" + a + "'] .spr-summary-actions-newreview").hide(),
              n.$(".spr-form-message-success").focus()),
              n.triggerEvent("spr:form:" + i, {
                  id: a
              })
          }
          ,
          n.initStarRating = function(e) {
              var t, r, a;
              if ((a = e.find("input[name='review[rating]']")) && a.val())
                  return r = a.val(),
                  t = e.find(".spr-starrating"),
                  this.setStarRating(r, t)
          }
          ,
          n.paginateCallback = function(e) {
              var t, r;
              return r = e.remote_id.toString(),
              t = e.reviews,
              n.renderReviews(r, t)
          }
          ,
          n.reportCallback = function(e) {
              var t;
              return t = "#report_" + e.id,
              n.$(t).replaceWith("<span class='spr-review-reportreview'>" + n.$(t).attr("data-msg") + "</span>")
          }
          ,
          n.loadjQuery = function(e) {
              return n.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", function() {
                  return n.$ = jQuery.noConflict(!0),
                  e()
              })
          }
          ,
          n.loadScript = function(e, t) {
              var r;
              return (r = document.createElement("script")).type = "text/javascript",
              r.readyState ? r.onreadystatechange = function() {
                  if ("loaded" === r.readyState || "complete" === r.readyState)
                      return r.onreadystatechange = null,
                      t()
              }
              : r.onload = function() {
                  return t()
              }
              ,
              r.src = e,
              document.getElementsByTagName("head")[0].appendChild(r)
          }
          ,
          n.loadjQueryExtentions = function(r) {
              return r.fn.serializeObject = function() {
                  var e, t;
                  return e = {},
                  t = this.serializeArray(),
                  r.each(t, function() {
                      return e[this.name] ? (e[this.name].push || (e[this.name] = [e[this.name]]),
                      e[this.name].push(this.value || "")) : e[this.name] = this.value || ""
                  }),
                  e
              }
          }
          ,
          n.triggerEvent = function(e, t) {
              return this.$(document).trigger(e, t)
          }
          ,
          n
      }(),
      SPR.loadStylesheet(),
      SPR.loadjQuery(function() {
          return SPR.$.ajaxSetup({
              cache: !1
          }),
          SPR.loadjQueryExtentions(SPR.$),
          SPR.$(document).ready(function() {
              return SPR.registerCallbacks(),
              SPR.initRatingHandler(),
              SPR.initDomEls(),
              SPR.loadProducts(),
              SPR.loadBadges()
          })
      })
  }
  ).call(this)
}("undefined" != typeof global ? global : "undefined" != typeof window && window);
