webpackJsonp([1], [function(e, t, n) {
    e.exports = n(64)
}, , , , , , function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        o = function() {
            function e() {
                n(this, e), this.blacklist = []
            }
            return r(e, [{
                key: "getBlacklist",
                value: function() {
                    return this.blacklist
                }
            }, {
                key: "setBlacklist",
                value: function(e) {
                    this.blacklist = e
                }
            }, {
                key: "inBlacklist",
                value: function(e) {
                    return this.blacklist.indexOf(e) !== -1
                }
            }]), e
        }();
    t["default"] = o
}, , , , , function(e, t, n) {
    e.exports.css = n(16)
}, function(e, t, n) {
    e.exports = n(11)
}, function(e, t) {}, function(e, t) {}, function(e, t) {}, function(e, t) {}, function(e, t, n) {
    e.exports = n.p + "nonproxy_endpoints.json"
}, function(e, t, n) {
    e.exports = n.p + "proxy_endpoints.json"
}, function(e, t, n) {
    e.exports = n.p + "img/navbar_icon.png"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t, n) {
        e.interceptors.push("RequestCounter"), e.defaults.useXDomain = !0, delete e.defaults.headers.common["X-Requested-With"], e.useApplyAsync(), t.when("/", {
            title: "Start",
            template: s["default"],
            controller: "StartCtrl",
            controllerAs: "start"
        }).when("/settings", {
            title: "Settings",
            template: l["default"],
            controller: "SettingsCtrl",
            controllerAs: "vm"
        }).when("/graph", {
            title: "Graph",
            template: d["default"],
            controller: "GraphCtrl",
            controllerAs: "vm"
        }).when("/about", {
            title: "About",
            template: p["default"],
            controller: "AboutCtrl",
            controllerAs: "about"
        }).otherwise({
            redirectTo: "/"
        }), n.debugEnabled(!1)
    }
    o.$inject = ["$httpProvider", "$routeProvider", "$logProvider"], Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(113),
        s = r(a),
        i = n(101),
        l = r(i),
        u = n(99),
        d = r(u),
        c = n(98),
        p = r(c);
    o.$inject = ["$httpProvider", "$routeProvider", "$logProvider"], t["default"] = o
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(25),
        i = r(s),
        l = n(66),
        u = r(l),
        d = n(90),
        c = r(d),
        p = n(97),
        f = r(p),
        g = n(20),
        v = r(g),
        m = n(22),
        h = r(m);
    t["default"] = a["default"].module("ldVOWLApp", ["ngRoute", "ngAnimate", "ui.bootstrap", i["default"].name, u["default"].name, c["default"].name, f["default"].name]).config(v["default"]).run(h["default"])
}, function(e, t) {
    "use strict";

    function n(e) {
        e.$on("$routeChangeSuccess", function(t, n) {
            n && n.$$route && n.$$route.title && (e.title = n.$$route.title)
        })
    }
    n.$inject = ["$rootScope"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$rootScope"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n() {}
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(23),
        i = r(s);
    t["default"] = a["default"].module("components.about", []).controller("AboutCtrl", i["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(27),
        i = r(s),
        l = n(31),
        u = r(l),
        d = n(37),
        c = r(d),
        p = n(61),
        f = r(p),
        g = n(63),
        v = r(g),
        m = n(24),
        h = r(m);
    t["default"] = a["default"].module("components", [i["default"].name, u["default"].name, c["default"].name, f["default"].name, v["default"].name, h["default"].name])
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o, a, s) {
        var i = this;
        i.selected = {
            uri: "none",
            name: "",
            type: "",
            value: 0,
            props: []
        }, i.showSelection = !1, i.onClick = function(e) {
            i.selected = e, r.requestCommentForClass(e.id), i.showSelection = !0
        }, i.stopLoading = function() {
            n.stopTBoxExtraction()
        }, i.restartLoading = function() {
            n.restartTBoxExtraction()
        }, i.startLoading = function() {
            var r = e.search().endpointURL,
                i = void 0 !== r ? r : o.getEndpointURL();
            void 0 === i || "" === i ? (a.clearAll(), o.setEndpointURL(), a.initMaps(), s.reset(), t.warn("[Graph] Endpoint URL is empty!")) : (i !== o.getEndpointURL() && (a.clearAll(), o.setEndpointURL(i), a.initMaps(), s.reset(), n.clearClasses()), e.search("endpointURL", i), t.debug("[Graph] Start to extract TBox information from '" + i + "'..."), n.startTBoxExtraction())
        }, i.startLoading()
    }
    n.$inject = ["$location", "$log", "TBoxExtractor", "DetailExtractor", "RequestConfig", "Data", "View"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$location", "$log", "TBoxExtractor", "DetailExtractor", "RequestConfig", "Data", "View"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(26),
        i = r(s),
        l = n(28),
        u = r(l);
    t["default"] = a["default"].module("components.graph", []).controller("GraphCtrl", i["default"]).directive("nodeLinkGraph", u["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t, n, r, o, a, i, u, d, c) {
        return {
            restrict: "EA",
            scope: {
                data: "=",
                onClick: "&"
            },
            link: function(p, f, g) {
                var v = parseInt(g.margin) || 20,
                    m = 0,
                    h = parseInt(g.height) || e.innerHeight,
                    y = [l["default"].rgb("#3366CC"), l["default"].rgb("#EE2867")],
                    b = 20,
                    P = 20,
                    R = 4,
                    S = l["default"].select(f[0]).append("svg").style("width", "100%"),
                    x = S.append("g"),
                    w = x.append("g").attr("class", "linkContainer"),
                    C = x.append("g").attr("class", "nodeContainer"),
                    I = S.append("g").attr("id", "notification"),
                    L = I.append("text").attr("class", "notification").style("opacity", 0),
                    O = null,
                    $ = 1500;
                e.onresize = function() {
                    h = e.innerHeight, S.attr("height", Math.max(h - 60, 0)), p.drawPlaceholder(p.data, m, h), p.$apply()
                }, p.paused = !1, p.disjointNodeWidth = 40, p.disjointNodeHeight = 20, p.node = {}, p.force = {}, p.cardinalSpline = {}, p.loopSpline = {}, p.linearLine = {}, p.zoom = l["default"].behavior.zoom().scaleExtent([.1, 2]).duration(150), p.translate = d.getTranslate(), p.scale = d.getScale(), p.color = l["default"].scale.linear().domain([1, o.size()]).interpolate(l["default"].interpolateHsl).range(y), p.data = {
                    nodes: r.getNodes(),
                    properties: n.getProperties(),
                    prefixes: o.getPrefixes(),
                    showTypes: a.getIncludeDataTypes(),
                    showLoops: a.getIncludeLoops(),
                    showDisjointNode: a.getIncludeDisjointNode(),
                    showSubclassRelations: a.getIncludeSubclassRelations(),
                    loading: u.getPendingRequests() > 0
                }, p.$watch(function() {
                    return s["default"].element(e)[0].innerWidth
                }, function() {
                    p.render(p.data)
                }), p.$watch("data.nodes.size", function() {
                    return t.debug("[Graph] Number of nodes has changed!"), p.render(p.data)
                }), p.$watch(function() {
                    return a.getIncludeDataTypes()
                }, function(e) {
                    return p.data.showTypes = e, p.render(p.data)
                }), p.$watch(function() {
                    return a.getIncludeLoops()
                }, function(e) {
                    return p.data.showLoops = e, p.render(p.data)
                }), p.$watch(function() {
                    return a.getIncludeDisjointNode()
                }, function(e) {
                    return p.data.showDisjointNode = e, p.render(p.data)
                }), p.$watch(function() {
                    return a.getIncludeSubclassRelations()
                }, function(e) {
                    return p.data.showSubclassRelations = e, p.render(p.data)
                }), p.$watch("data", function(e) {
                    if (null === O) return O = new Date, p.render(e);
                    var t = new Date;
                    return t - O > $ ? (O = t, p.render(e)) : void 0
                }, !0), p.$on("toggled-layout", function(e, t) {
                    p.paused = t, void 0 !== p.force && (t ? p.force.stop() : p.force.resume())
                }), p.$on("prefixes-changed", function() {
                    p.color = l["default"].scale.linear().domain([1, o.size()]).interpolate(l["default"].interpolateHsl).range(y), p.render(p.data)
                }), p.$on("edge-length-changed", function() {
                    void 0 !== p.force && p.force.start()
                }), p.$on("properties-changed", function() {
                    p.render(p.data)
                }), p.$on("pending-requests-changed", function(e, t) {
                    p.data.loading = t > 0, p.drawPlaceholder(p.data, m, h)
                }), p.lineColor = l["default"].scale.log().base(2).domain([1, 32]).range(["#000", "#777"]).clamp(!0), p.arrowColor = l["default"].scale.ordinal().domain([5, 6, 7, 8, 9]).range(["#777", "#666", "#555", "#333", "#000"]), p.cardinalSpline = l["default"].svg.line().x(function(e) {
                    return void 0 !== e ? e.x : 0
                }).y(function(e) {
                    return void 0 !== e ? e.y : 0
                }).interpolate("cardinal"), p.loopSpline = l["default"].svg.line().x(function(e) {
                    return e.x
                }).y(function(e) {
                    return e.y
                }).interpolate("cardinal").tension(0), p.linearLine = l["default"].svg.line().x(function(e) {
                    return e.x
                }).y(function(e) {
                    return e.y
                }).interpolate("linear"), p.drag = l["default"].behavior.drag().on("dragstart", function(e) {
                    e.fixed = !0, l["default"].select(this).classed("dragged", !0), p.paused ? p.force.stop() : p.force.resume(), l["default"].event.sourceEvent.stopPropagation()
                }).on("drag", function(e) {
                    e.px += l["default"].event.dx, e.py += l["default"].event.dy, e.x += l["default"].event.dx, e.y += l["default"].event.dy, p.tick()
                }).on("dragend", function(e) {
                    e.fixed = !1, l["default"].select(this).classed("dragged", !1), p.tick(), p.paused || p.force.resume()
                }), p.filterNodes = function(e) {
                    var t = !1;
                    return "property" === e.type && e.hasOwnProperty("isLoopNode") && e.isLoopNode ? p.data.showLoops && (t = !0) : "type" === e.type || "datatypeProperty" === e.type ? p.data.showTypes && (t = !0) : "disjointNode" === e.type ? p.data.showDisjointNode && (t = !0) : "subClassProperty" === e.type ? p.data.showSubclassRelations && (t = !0) : t = !0, t
                }, p.filterProps = function(e) {
                    var t = !0;
                    return (e.source === e.target && !p.data.showLoops || "disjointProperty" === e.type && !p.data.showDisjointNode || "subClassProperty" === e.type && !p.data.showSubclassRelations) && (t = !1), t
                }, p.getMarkerEnd = function(e, t) {
                    var n = parseInt(Math.min(Math.log2(t + 2), 5));
                    return "url(#" + e + "Arrow" + n + ")"
                }, p.calcRadius = function(e) {
                    var t = l["default"].scale.sqrt().domain([0, p.maxValue]).range([b, 65]);
                    return t(e.value)
                }, p.updateActive = function(e) {
                    if (!l["default"].event.defaultPrevented) {
                        "property" === e.type || "datatypeProperty" === e.type || "subClassProperty" === e.type || "type" === e.type ? p.data.selectedId = e.id : p.data.selectedId = "", p.data.selected = e.uri;
                        var o = {};
                        if ("property" === e.type || "datatypeProperty" === e.type || "subClassProperty" === e.type) {
                            t.debug("[Graph] Selected property '" + e.uri + "'."), o.item = {
                                id: e.id,
                                type: e.type
                            };
                            var a = n.getByNodeId(e.id);
                            if (void 0 !== a) {
                                var s = r.getById(a.source),
                                    i = r.getById(a.target);
                                void 0 !== s && (o.item.sourceName = s.name, o.item.sourceURI = s.uri), void 0 !== i && (o.item.targetName = i.name, o.item.targetURI = i.uri)
                            } else t.error("[Graph] Could not find property by id '" + e.id + "'!");
                            o.item.ordered = !0, "subClassProperty" === e.type ? o.item.commonCount = e.commonInstances : o.item.props = a.props.slice()
                        } else t.debug("[Graph] Selected class '" + e.uri + "'."), o.item = e;
                        return p.onClick(o)
                    }
                }, p.redraw = function() {
                    x.attr("transform", "translate(" + l["default"].event.translate + ")scale(" + l["default"].event.scale + ")"), d.setTranslate(l["default"].event.translate), d.setScale(l["default"].event.scale), p.scale = l["default"].event.scale, p.translate = l["default"].event.translate
                }, p.createArrowHeads = function(e) {
                    e.append("defs").selectAll("marker").data(i.getArrowHeads()).enter().append("marker").attr("id", function(e) {
                        return e.id
                    }).attr("class", function(e) {
                        return e["class"]
                    }).attr("viewBox", function(e) {
                        return "-1 " + (e.size + 1) * -1 + " " + 2 * (e.size + 1) + " " + 2 * (e.size + 1)
                    }).attr("refX", function(e) {
                        return 2 * e.size
                    }).attr("refY", 0).attr("markerWidth", function(e) {
                        return e.size
                    }).attr("markerHeight", function(e) {
                        return e.size
                    }).attr("orient", "auto").style("stroke", function(e) {
                        return "hovered" === e["class"] ? "#f00" : p.arrowColor(e.size)
                    }).style("fill", function(e) {
                        return "hovered" === e["class"] ? "#f00" : "subclass" === e["class"] ? "#fff" : p.arrowColor(e.size)
                    }).append("path").attr("d", function(e) {
                        return "M0," + e.size * -1 + "L" + 2 * e.size + ",0L0," + e.size + "Z"
                    })
                }, p.setUpNodes = function(e, t, n) {
                    p.node = C.selectAll(".node").data(n), p.node.enter().append("g").classed("node", !0).classed("class", function(e) {
                        return "class" === e.type
                    }).classed("equivalent", function(e) {
                        return void 0 !== e.hasEquivalent
                    }).classed("property", function(e) {
                        return "property" === e.type
                    }).classed("datatypeProperty", function(e) {
                        return "datatypeProperty" === e.type
                    }).classed("subClassProperty", function(e) {
                        return "subClassProperty" === e.type
                    }).classed("type", function(e) {
                        return "type" === e.type
                    }).classed("active", function(e) {
                        return e.uri === t.selected
                    }).classed("activeIndex", function(e) {
                        return e.id === t.selectedId
                    }).classed("external", function(e) {
                        return ("class" === e.type || "property" === e.type) && !o.isInternal(e.uri)
                    }).classed("disjointNode", function(e) {
                        return "disjointNode" === e.type
                    }).call(p.drag), p.node.exit().remove(), C.selectAll(".equivalent").append("circle").attr("r", function(e) {
                        return e.radius + R + "px"
                    }).style("fill", "#fff"), C.selectAll(".class").append("circle").classed("clazz", !0).attr("r", function(e) {
                        return e.radius + "px"
                    }).on("click", p.updateActive).on("mouseover", function() {
                        l["default"].select(this).style("fill", "#f00")
                    }).on("mouseout", function() {
                        l["default"].select(this).style("fill", "#acf")
                    }).append("title").text(function(e) {
                        return e.uri
                    }), C.selectAll(".external circle.clazz").style("fill", function(e) {
                        return p.color(o.getColor(e.uri))
                    }).on("mouseout", function(e) {
                        l["default"].select(this).style("fill", p.color(o.getColor(e.uri)))
                    }), C.selectAll(".property").append("rect").classed("propz", !0).attr("x", function(e) {
                        return i.calcPropBoxOffset(e)
                    }).attr("y", -1 * (P / 2)).attr("width", function(e) {
                        return i.calcPropBoxWidth(e)
                    }).attr("height", P).on("click", p.updateActive).on("mouseover", function() {
                        l["default"].select(this).style("fill", "#f00")
                    }).on("mouseout", function() {
                        l["default"].select(this).style("fill", "#acf")
                    }).append("title").text(function(e) {
                        return i.getName(e, !1, !1)
                    }), C.selectAll(".external rect.propz").style("fill", function(e) {
                        return p.color(o.getColor(e.uri))
                    }).on("mouseout", function(e) {
                        l["default"].select(this).style("fill", p.color(o.getColor(e.uri)))
                    }), C.selectAll(".datatypeProperty").append("rect").attr("x", function(e) {
                        return i.calcPropBoxOffset(e)
                    }).attr("y", -1 * (P / 2)).attr("width", function(e) {
                        return i.calcPropBoxWidth(e)
                    }).attr("height", P).on("click", p.updateActive).append("title").text(function(e) {
                        return i.getName(e, !1, !1)
                    }), C.selectAll(".subClassProperty").append("rect").attr("x", function(e) {
                        return i.calcPropBoxOffset(e)
                    }).attr("y", -1 * (P / 2)).attr("width", function(e) {
                        return i.calcPropBoxWidth(e)
                    }).attr("height", P).on("click", p.updateActive).append("title").text(function(e) {
                        return i.getName(e, !1, !1)
                    }), C.selectAll(".type").append("rect").attr("x", function(e) {
                        return i.calcPropBoxOffset(e)
                    }).attr("y", -1 * (P / 2)).attr("width", function(e) {
                        return i.calcPropBoxWidth(e)
                    }).attr("height", P).on("click", p.updateActive).append("title").text(function(e) {
                        return i.getName(e, !1, !1)
                    }), p.setUpDisjointNode(C), p.node.append("text").attr("class", "text").attr("dy", ".35em").attr("text-anchor", "middle").text(function(e) {
                        return "class" === e.type && void 0 !== e.radius ? i.getNameForSpace(e, 2 * e.radius) : i.getName(e, "property" === e.type || "datatypeProperty" === e.type, !0)
                    }), C.selectAll(".external text").style("fill", "white")
                }, p.setUpDisjointNode = function(e) {
                    e.selectAll(".disjointNode").append("rect").attr("x", -1 * (p.disjointNodeWidth / 2)).attr("y", -1 * (p.disjointNodeHeight / 2)).attr("width", p.disjointNodeWidth).attr("height", p.disjointNodeHeight), e.selectAll(".disjointNode").append("circle").classed("symbol", !0).attr("cx", -10).attr("r", 8), e.selectAll(".disjointNode").append("circle").classed("symbol", !0).attr("cx", 10).attr("r", 8)
                }, p.setUpLinks = function(e) {
                    p.createArrowHeads(w);
                    var t = p.link = w.selectAll("g.link").data(e),
                        n = t.enter().append("g").attr("class", "link").style("stroke", function(e) {
                            return p.lineColor(e.value)
                        });
                    p.link = n.append("path").attr("class", "link-line").classed("subClassProperty", function(e) {
                        return "subClassProperty" === e.type
                    }), t.exit().remove(), w.selectAll(".link-line").attr("marker-end", function(e) {
                        return p.getMarkerEnd("", e.value)
                    }).style("stroke-width", function(e) {
                        return Math.min(Math.log2(e.value + 2), 5)
                    }).on("mouseover", function() {
                        l["default"].select(this).attr("stroke", "red"), l["default"].select(this).attr("marker-end", function(e) {
                            return p.getMarkerEnd("hovered", e.value)
                        })
                    }).on("mouseout", function() {
                        l["default"].select(this).attr("stroke", function(e) {
                            return p.lineColor(e.value)
                        }), l["default"].select(this).attr("marker-end", function(e) {
                            return p.getMarkerEnd("", e.value)
                        })
                    }), w.selectAll(".subClassProperty").attr("marker-end", function(e) {
                        return p.getMarkerEnd("subclass", e.value)
                    }).on("mouseout", function() {
                        l["default"].select(this).attr("stroke", function(e) {
                            return p.lineColor(e.value)
                        }), l["default"].select(this).attr("marker-end", function(e) {
                            return p.getMarkerEnd("subclass", e.value)
                        })
                    }).style("stroke-dasharray", "5, 5")
                }, p.setUpDirectLinks = function(e) {
                    p.directLink = w.selectAll(".direct-link").data(e).enter().append("g").append("path").classed("disjointProperty", function(e) {
                        return "disjointProperty" === e.type
                    }), w.selectAll(".disjointProperty").attr("marker-end", "none").style("stroke-dasharray", "5, 5")
                }, p.recalculateLines = function(e) {
                    return e.source.id === e.target.id ? p.loopSpline(c.getLoopData(e)) : p.cardinalSpline(c.getLineData(e))
                }, p.recalculateDirectLines = function(e) {
                    var t = [];
                    return void 0 !== e.source && void 0 !== e.target && (t.push({
                        x: e.source.x,
                        y: e.source.y
                    }), t.push({
                        x: e.target.x,
                        y: e.target.y
                    })), p.linearLine(t)
                }, p.findNode = function(e) {
                    return p.nodesToDraw.find(function(t) {
                        return t.id === e
                    })
                }, p.drawPlaceholder = function(e, n, r) {
                    if (0 === e.nodes.size) {
                        t.debug("[Graph] Redraw placeholder! Loading: " + p.data.loading);
                        var o = 35,
                            a = 750;
                        if (p.data.loading) {
                            var s = 200,
                                i = (n - s) / 2,
                                l = Math.max((r - o) / 2, 50);
                            L.text("Loading classes...").attr("x", i + 5).attr("y", l - 24).transition().duration(a).style("opacity", 1)
                        } else {
                            var d = 350,
                                c = (n - d) / 2,
                                f = Math.max((r - o) / 2, 50),
                                g = u.getStatus(),
                                v = void 0;
                            if (g.length > 0) switch (g[0]) {
                                case -1:
                                    v = "Given SPARQL endpoint is not accessible.";
                                    break;
                                case 400:
                                    v = "Given SPARQL endpoint does not understand query.";
                                    break;
                                case 404:
                                    v = "Given SPARQL endpoint could not be found!";
                                    break;
                                case 500:
                                    v = "Given SPARQL endpoint returned an error.";
                                    break;
                                case 503:
                                    v = "Given SPARQL endpoint is temporally unavailable.";
                                    break;
                                default:
                                    v = "Extraction failed with unknown error '" + g[0] + "'."
                            } else v = "No classes found!";
                            L.text(v).attr("x", c + 5).attr("y", f - 24).transition().duration(a).style("opacity", 1)
                        }
                    } else L.attr("display", "none")
                }, p.render = function(e) {
                    if (void 0 !== p.force.stop && p.force.stop(), C.selectAll("*").remove(), w.selectAll("*").remove(), e && void 0 !== e.nodes) {
                        x.attr("transform", "translate(" + p.translate + ")scale(" + p.scale + ")"), p.zoom.on("zoom", p.redraw), p.zoom.translate(p.translate).scale(p.scale), S.call(p.zoom), p.maxValue = 0, p.nodesToDraw = Array.from(e.nodes.values()).filter(p.filterNodes).map(function(e) {
                            return e.value > p.maxValue && (p.maxValue = e.value), e
                        });
                        var t = [],
                            n = [],
                            r = [];
                        void 0 !== e.properties && e.properties.filter(p.filterProps).forEach(function(o) {
                            var a = p.findNode(o.source),
                                s = p.findNode(o.target);
                            if ("disjointProperty" !== o.type) {
                                var i = p.findNode(o.intermediate);
                                if (void 0 === a || void 0 === i || void 0 === s) return;
                                if ("property" !== a.type && "property" !== s.type) {
                                    var l = "property";
                                    if ("type" === s.type) {
                                        if (!e.showTypes) return;
                                        l = "datatypeProperty"
                                    }
                                    i.value = o.value, t.push({
                                        source: a,
                                        target: i,
                                        type: l
                                    }), t.push({
                                        source: i,
                                        target: s,
                                        type: l
                                    }), n.push({
                                        source: a,
                                        intermediate: i,
                                        target: s,
                                        value: o.value,
                                        type: o.type
                                    })
                                }
                            } else void 0 !== a && void 0 !== s && (t.push({
                                source: a,
                                target: s,
                                type: o.type
                            }), r.push({
                                source: a,
                                target: s,
                                value: o.value,
                                type: o.type
                            }))
                        }), m = l["default"].select(f[0]).node().offsetWidth - v, p.drawPlaceholder(e, m, h), p.force = l["default"].layout.force().charge(-500).linkStrength(1).linkDistance(c.getDistance).gravity(.03).size([m, h]), S.attr("width", m).attr("height", Math.max(h - 60, 0)), p.nodesToDraw.forEach(function(e) {
                            e.radius = p.calcRadius(e)
                        }), p.force.nodes(p.nodesToDraw).links(t), p.setUpLinks(n), p.setUpDirectLinks(r), p.setUpNodes(x, e, p.nodesToDraw), p.force.start(), p.force.on("tick", p.tick)
                    }
                }, p.tick = function() {
                    p.link.attr("d", p.recalculateLines), p.directLink.attr("d", p.recalculateDirectLines), p.node.attr("transform", function(e) {
                        return "translate(" + e.x + "," + e.y + ")"
                    })
                }
            }
        }
    }
    o.$inject = ["$window", "$log", "Properties", "Nodes", "Prefixes", "Filters", "GraphUtils", "Requests", "View", "Links"], Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(1),
        s = r(a),
        i = n(5),
        l = r(i);
    o.$inject = ["$window", "$log", "Properties", "Nodes", "Prefixes", "Filters", "GraphUtils", "Requests", "View", "Links"], t["default"] = o
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = this;
        n.collapse = !0, n.loading = !1, n.appVersion = "1.2.2", e.$on("pending-requests-changed", function(e, t) {
            n.loading = t > 0
        }), n.toggleCollapse = function() {
            n.collapse = !n.collapse
        }, n.isActive = function(e) {
            return e === t.path()
        }
    }
    r.$inject = ["$scope", "$location"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.$inject = ["$scope", "$location"], t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r() {
        return {
            restrict: "E",
            scope: {},
            controller: "HeaderCtrl",
            controllerAs: "header",
            bindToController: {
                appVersion: "@"
            },
            template: n(100)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(29),
        i = r(s),
        l = n(30),
        u = r(l);
    t["default"] = a["default"].module("components.header", []).controller("HeaderCtrl", i["default"]).directive("header", u["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(34),
        i = r(s),
        l = n(35),
        u = r(l),
        d = n(33),
        c = r(d);
    t["default"] = a["default"].module("blacklist", []).constant("PREFIX", i["default"]).constant("PROPERTY_BLACKLIST", u["default"]).constant("CLASS_BLACKLIST", c["default"])
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        RDF: ["List", "langString", "HTML", "XMLLiteral", "Property", "Bag", "Seq", "Alt"],
        RDFS: ["Resource", "Literal", "Class", "Datatype", "Statement", "Container", "ContainerMembershipProperty"],
        OWL: ["AllDifferent", "AnnotationProperty", "Class", "DataRange", "DatatypeProperty", "DeprecatedClass", "DeprecatedProperty", "FunctionalProperty", "InverseFunctionalProperty", "Nothing", "ObjectProperty", "Ontology", "OntologyProperty", "Restriction", "SymmetricProperty", "Thing", "TransitiveProperty"],
        SKOS: ["Collection", "Concept", "ConceptScheme", "OrderedCollection"]
    };
    t["default"] = n
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        RDF: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        RDFS: "http://www.w3.org/2000/01/rdf-schema#",
        OWL: "http://www.w3.org/2002/07/owl#",
        SKOS: "http://www.w3.org/2004/02/skos/core#"
    };
    t["default"] = n
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        RDF: ["type", "first", "rest", "value", "subject", "predicate", "object"],
        RDFS: ["subClassOf", "subPropertyOf", "domain", "range", "label", "comment", "member", "seeAlso", "isDefinedBy"],
        OWL: ["allValuesFrom", "backwardCompatibleWith", "cardinality", "complementOf", "differentFrom", "disjointWith", "distinctMembers", "equivalentClass", "equivalentProperty", "hasValue", "imports", "incompatibleWith", "intersectionOf", "inverseOf", "maxCardinality", "minCardinality", "oneOf", "onProperty", "priorVersion", "sameAs", "someValuesFrom", "unionOf", "versionInfo"],
        SKOS: ["altLabel", "broadMatch", "broader", "broaderTransitive", "changeNote", "closeMatch", "definition", "editorialNote", "exactMatch", "example", "hasTopConcept", "hiddenLabel", "historyNote", "inScheme", "mappingRelation", "member", "memberList", "narrowMatch", "narrower", "narrowerTransitive", "notation", "note", "prefLabel", "related", "relatedMatch", "scopeNote", "semanticRelation", "topConceptOf"]
    };
    t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o, a, s, i, l) {
        var u = this;
        u.currentLanguage = a.getLabelLanguage() || "en", u.currentLimit = a.getLimit(), u.availableLanguages = [{
            id: "en",
            name: "English"
        }, {
            id: "de",
            name: "German"
        }], u.propsOrdered = !0, u.propertyBlacklistInput = "", u.classBlacklistInput = "", u.separator = ", \n", u.enabled = [], u.initialize = function() {
            var e = i.getBlacklist(),
                n = l.getBlacklist();
            u.propsOrdered = a.getPropertiesOrdered();
            var r = [];
            r.RDF = t.getItem("blacklist_rdf"), r.RDFS = t.getItem("blacklist_rdfs"), r.OWL = t.getItem("blacklist_owl"), r.SKOS = t.getItem("blacklist_skos"), void 0 !== r.RDF && null !== r.RDF ? u.enabled.RDF = "true" === r.RDF : u.enabled.RDF = !0, void 0 !== r.RDFS && null !== r.RDFS ? u.enabled.RDFS = "true" === r.RDFS : u.enabled.RDFS = !0, void 0 !== r.OWL && null !== r.OWL ? u.enabled.OWL = "true" === r.OWL : u.enabled.OWL = !0, void 0 !== r.SKOS && null !== r.SKOS ? u.enabled.SKOS = "true" === r.SKOS : u.enabled.SKOS = !1, u.classBlacklistInput = e.join(u.separator), u.propertyBlacklistInput = n.join(u.separator)
        }, u.updateLabelLanguage = function() {
            a.setLabelLanguage(u.currentLanguage), e.debug('[Settings] Changed label language to "' + u.currentLanguage + '".')
        }, u.updatePropsOrdered = function() {
            a.setPropertiesOrdered(u.propsOrdered)
        }, u.updateList = function() {
            u.restoreDefaults(), u.save()
        }, u.saveExtractionSettings = function() {
            u.updateLabelLanguage(), u.updatePropsOrdered(), a.setLimit(u.currentLimit)
        }, u.saveBlacklists = function() {
            var e = u.propertyBlacklistInput.replace(/(\r\n|\n|\r|\s)/gm, ""),
                n = e.split(",");
            l.setBlacklist(n);
            var r = u.classBlacklistInput.replace(/(\r\n|\n|\r|\s)/gm, ""),
                o = r.split(",");
            i.setBlacklist(o), s.clearAll();
            var a = u.enabled.RDF ? "true" : "false",
                d = u.enabled.RDFS ? "true" : "false",
                c = u.enabled.OWL ? "true" : "false",
                p = u.enabled.SKOS ? "true" : "false";
            t.setItem("blacklist_rdf", a), t.setItem("blacklist_rdfs", d), t.setItem("blacklist_owl", c), t.setItem("blacklist_skos", p), t.setItem("class_blacklist", u.classBlacklistInput), t.setItem("property_blacklist", u.propertyBlacklistInput)
        }, u.restoreDefaults = function() {
            u.enabled.RDF = !0, u.enabled.RDFS = !0, u.enabled.OWL = !0, u.enabled.SKOS = !1, u.restoreListDefaults(), u.saveBlacklists()
        }, u.restoreListDefaults = function() {
            var e = [];
            for (var t in r)
                if (u.enabled[t] && r.hasOwnProperty(t))
                    for (var a = 0; a < r[t].length; a++) e.push(n[t] + r[t][a]);
            u.propertyBlacklistInput = e.join(u.separator);
            var s = [];
            for (var i in o)
                if (u.enabled[i] && o.hasOwnProperty(i))
                    for (var l = 0; l < o[i].length; l++) s.push(n[i] + o[i][l]);
            u.classBlacklistInput = s.join(u.separator)
        }, u.initialize()
    }
    n.$inject = ["$log", "Storage", "PREFIX", "PROPERTY_BLACKLIST", "CLASS_BLACKLIST", "RequestConfig", "Data", "ClassExtractor", "RelationExtractor"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$log", "Storage", "PREFIX", "PROPERTY_BLACKLIST", "CLASS_BLACKLIST", "RequestConfig", "Data", "ClassExtractor", "RelationExtractor"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(36),
        i = r(s),
        l = n(32),
        u = r(l);
    t["default"] = a["default"].module("components.settings", [u["default"].name]).controller("SettingsCtrl", i["default"])
}, function(e, t) {
    "use strict";

    function n(e, t, n, r) {
        var o = this;
        o.showEndpointUrl = !0, o.requestedEndpoint = t.search().endpointURL, o.endpointURL = void 0 !== o.requestedEndpoint ? o.requestedEndpoint : r.getEndpointURL(), o.pendingRequests = n.getPendingRequests(), o.failedRequests = n.getFailedRequests(), o.successfulRequests = n.getSuccessfulRequests(), o.errorStatus = n.getStatus(), e.$on("pending-requests-changed", function(e, t) {
            o.pendingRequests = t, o.successfulRequests = n.getSuccessfulRequests(), o.failedRequests = n.getFailedRequests(), o.errorStatus = n.getStatus()
        })
    }
    n.$inject = ["$scope", "$location", "Requests", "RequestConfig"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$scope", "$location", "Requests", "RequestConfig"], t["default"] = n
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        return {
            restrict: "E",
            scope: {},
            bindToController: {
                restart: "&",
                stop: "&"
            },
            controller: "EndpointGroupCtrl",
            controllerAs: "vm",
            template: n(102)
        }
    };
    t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(39),
        i = r(s),
        l = n(38),
        u = r(l);
    t["default"] = a["default"].module("components.sidebar.groups.endpoint", []).controller("EndpointGroupCtrl", u["default"]).directive("endpointGroup", i["default"])
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = this;
        n.filterDataTypes = !e.getIncludeDataTypes(), n.filterLoops = !e.getIncludeLoops(), n.filterDisjointNodes = !e.getIncludeDisjointNode(), n.filterSubclassRelations = !e.getIncludeSubclassRelations(), n.showEndpointUrl = !0, n.toggleDataTypes = function() {
            n.filterDataTypes = !e.toggleDataTypes(), n.filterDataTypes || t.extractDataTypes()
        }, n.toggleLoops = function() {
            n.filterLoops = !e.toggleLoops(), n.filterLoops || t.extractRelationLoops()
        }, n.toggleDisjointNode = function() {
            n.filterDisjointNodes = !e.toggleDisjointNode()
        }, n.toggleSubclassRelations = function() {
            n.includeSubclassRelations = !e.toggleSubclassRelations()
        }
    }
    r.$inject = ["Filters", "TBoxExtractor"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.$inject = ["Filters", "TBoxExtractor"], t["default"] = r
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        return {
            restrict: "E",
            scope: {},
            controller: "FilterGroupCtrl",
            controllerAs: "vm",
            template: n(103)
        }
    };
    t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(41),
        i = r(s),
        l = n(42),
        u = r(l),
        d = a["default"].module("components.sidebar.groups.filter", []).controller("FilterGroupCtrl", i["default"]).directive("filterGroup", u["default"]);
    t["default"] = d
}, function(e, t) {
    "use strict";

    function n(e, t, n, r) {
        var o = this;
        o.differentColors = n.getDifferentColors(), o.ccEdgeLength = r.getClassToClassDistance(), o.ctEdgeLength = r.getClassToDatatypeDistance(), o.layoutPaused = !1, o.updateClassToClassLength = function() {
            var t = parseInt(o.ccEdgeLength);
            r.setClassToClassDistance(t), e.$broadcast("edge-length-changed", t)
        }, o.updateClassToDatatypeLength = function() {
            var t = parseInt(o.ctEdgeLength);
            r.setClassToDatatypeDistance(t), e.$broadcast("edge-length-changed", t)
        }, o.toggleDifferentColors = function() {
            o.differentColors = n.toggleDifferentColors(), t.debug("[GraphSettings] " + (o.differentColors ? "Use" : "Don't use") + " different colors in graph.")
        }, o.toggleLayout = function() {
            o.layoutPaused = !o.layoutPaused, e.$broadcast("toggled-layout", o.layoutPaused), t.debug("[GraphSettings] " + (o.layoutPaused ? "Pause" : "Resume") + " force-directed layout.")
        }
    }
    n.$inject = ["$rootScope", "$log", "Prefixes", "Links"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$rootScope", "$log", "Prefixes", "Links"], t["default"] = n
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        return {
            restrict: "E",
            scope: {},
            controller: "GraphSettingsCtrl",
            controllerAs: "graphSettings",
            bindToController: !0,
            template: n(104)
        }
    };
    t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(44),
        i = r(s),
        l = n(45),
        u = r(l);
    n(13);
    var d = a["default"].module("components.sidebar.groups.graphsettings", []).directive("graphSettingsGroup", u["default"]).controller("GraphSettingsCtrl", i["default"]);
    t["default"] = d
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        var r = this;
        r.numberOfPrefixes = 3, r.prefixes = n.getPrefixes(), e.$on("prefixes-changed", function() {
            t.debug("[Namespaces] Prefixes have changed, update them..."), r.prefixes = n.getPrefixes()
        }), r.updatePrefixes = function() {
            n.setPrefixes(r.prefixes)
        }, r.incNumberOfPrefixes = function() {
            r.numberOfPrefixes += 5
        }
    }
    n.$inject = ["$scope", "$log", "Prefixes"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$scope", "$log", "Prefixes"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(105),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                scope: {},
                controller: "NamespaceGroupCtrl",
                controllerAs: "vm",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(47),
        i = r(s),
        l = n(48),
        u = r(l),
        d = a["default"].module("components.sidebar.groups.namespace", []).controller("NamespaceGroupCtrl", i["default"]).directive("namespaceGroup", u["default"]);
    t["default"] = d
}, function(e, t) {
    "use strict";

    function n() {
        var e = this;
        e.selected = {
            uri: "none",
            name: "",
            type: "",
            value: 0,
            props: []
        }, e.numberOfProps = 5, e.incNumberOfProps = function() {
            e.numberOfProps *= 2
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(106),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                scope: {
                    selected: "=selectedItem"
                },
                bindToController: !0,
                controller: "SelectionGroupCtrl",
                controllerAs: "vm",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(51),
        i = r(s),
        l = n(50),
        u = r(l),
        d = a["default"].module("sidebar.groups.selection", []).controller("SelectionGroupCtrl", u["default"]).directive("selectionGroup", i["default"]);
    t["default"] = d
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(40),
        i = r(s),
        l = n(43),
        u = r(l),
        d = n(46),
        c = r(d),
        p = n(49),
        f = r(p),
        g = n(52),
        v = r(g);
    t["default"] = a["default"].module("sidebar.groups", [i["default"].name, u["default"].name, c["default"].name, f["default"].name, v["default"].name])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(107),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(108),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(109),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(110),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(56),
        i = r(s),
        l = n(54),
        u = r(l),
        d = n(60),
        c = r(d),
        p = n(57),
        f = r(p),
        g = n(55),
        v = r(g),
        m = n(59),
        h = r(m),
        y = a["default"].module("components.sidebar.selection", []).directive("noSelection", i["default"]).directive("classSelection", u["default"]).directive("typeSelection", c["default"]).directive("propSelection", f["default"]).directive("datatypePropSelection", v["default"]).directive("subclassPropSelection", h["default"]);
    t["default"] = y
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(111),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(112),
        a = r(o),
        s = function() {
            return {
                restrict: "E",
                template: a["default"]
            }
        };
    t["default"] = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(53),
        i = r(s),
        l = n(58),
        u = r(l);
    t["default"] = a["default"].module("components.sidebar", [i["default"].name, u["default"].name])
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o, a) {
        var s = this;
        s.endpoints = [], s.endpoint = o.getEndpointURL() || "", s.useProxy = o.getUseProxy(), s.endpointAlert = !0, s.showGraph = function() {
            var a = o.getEndpointURL();
            a !== s.endpoint && void 0 !== s.endpoint && s.endpoint.length > 0 && (n.clearAll(), r.reset(), o.setEndpointURL(s.endpoint), n.initMaps()), o.setUseProxy(!1), void 0 !== s.endpoint && s.endpoint.length > 0 ? (e.debug("[Start] Show Graph!"), t.path("graph"), t.search("endpointURL", s.endpoint)) : e.error("[Start] Please enter an url for the SPARQL endpoint!")
        }, s.closeEndpointAlert = function() {
            s.endpointAlert = !1
        };
        var i = function(t) {
                return void 0 !== t && Array.isArray(t.data) ? (t.data.map(function(e) {
                    var t = void 0;
                    return t = void 0 !== e && "string" == typeof e.url ? e.url : ""
                }).filter(function(e) {
                    return e.length > 0
                }).forEach(function(e) {
                    return s.endpoints.push(e)
                }), void e.debug("[Start] Retrieved " + s.endpoints.length + " endpoints from server.")) : void e.error("[Start] No endpoints found!")
            },
            l = function(t) {
                void 0 !== t && "number" == typeof t.status && 404 === t.status ? e.error("[Start] List of SPARQL endpoints could not be retrieved from the server!") : e.error(t)
            };
        s.loadEndpoints = function() {
            a.getNonProxyEndpoints().then(i, l), a.getProxyEndpoints().then(i, l)
        }, s.loadEndpoints()
    }
    n.$inject = ["$log", "$location", "Data", "View", "RequestConfig", "Endpoints"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$log", "$location", "Data", "View", "RequestConfig", "Endpoints"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(62),
        i = r(s),
        l = a["default"].module("components.start", []).controller("StartCtrl", i["default"]);
    t["default"] = l
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var o = n(1),
        a = r(o),
        s = n(21),
        i = r(s);
    n(65)(), n(15), n(14), a["default"].element(document).ready(function() {
        a["default"].bootstrap(document, [i["default"].name], {
            strictDi: !0
        })
    })
}, function(e, t, n) {
    "use strict";
    e.exports = function() {
        n(1), n(3), n(2), n(12), n(4)
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(67),
        i = r(s),
        l = n(68),
        u = r(l);
    t["default"] = a["default"].module("filters", []).filter("httpLess", i["default"]).filter("uriLabel", u["default"])
}, function(e, t) {
    "use strict";

    function n() {
        return function(e) {
            return e.replace("http://", "")
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t) {
    "use strict";

    function n() {
        return function(e) {
            var t = "";
            if (void 0 !== e && "" !== e) {
                var n = e.lastIndexOf("/"),
                    r = e.lastIndexOf("#");
                t = e.substr(Math.max(n, r) + 1).replace(/\_/g, " ")
            }
            return t
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = n(17),
            r = n(18),
            o = this;
        o.getNonProxyEndpoints = function() {
            var n = void 0;
            return n = "string" != typeof t ? "nonproxy_endpoints.json" : t, e.get(n)
        }, o.getProxyEndpoints = function() {
            var t = void 0;
            return t = "string" != typeof r ? "proxy_endpoints.json" : r, e.get(t)
        }
    }
    r.$inject = ["$http"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.$inject = ["$http"], t["default"] = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        l = n(6),
        u = r(l),
        d = function(e) {
            function t(e, n, r, s, i, l, u, d, c, p) {
                o(this, t);
                var f = a(this, Object.getPrototypeOf(t).call(this));
                f.$http = n, f.$q = r, f.$log = s, f.reqConfig = u, f.queryFactory = d, f.nodes = c, f.promises = p;
                var g = e.getItem("class_blacklist");
                if (void 0 !== g && null !== g) {
                    var v = g.replace(/(\r\n|\n|\r|\s)/gm, "");
                    f.setBlacklist(v.split(","))
                } else
                    for (var m in l)
                        if (l.hasOwnProperty(m) && "SKOS" !== m)
                            for (var h = 0; h < l[m].length; h++) f.blacklist.push(i[m] + l[m][h]);
                return f
            }
            return t.$inject = ["Storage", "$http", "$q", "$log", "PREFIX", "CLASS_BLACKLIST", "RequestConfig", "QueryFactory", "Nodes", "Promises"], s(t, e), t.$inject = ["Storage", "$http", "$q", "$log", "PREFIX", "CLASS_BLACKLIST", "RequestConfig", "QueryFactory", "Nodes", "Promises"], i(t, [{
                key: "requestClasses",
                value: function() {
                    function e() {
                        var o = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
                            s = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
                            i = arguments.length <= 2 || void 0 === arguments[2] ? 10 : arguments[2],
                            l = a.reqConfig.getRequestURL(),
                            u = a.queryFactory.getClassQuery(i, s);
                        a.$log.debug("[Classes] Send Request with offset " + s + "..."), a.$http.get(l, a.reqConfig.forQuery(u, t)).then(function(n) {
                            if (void 0 !== n.data.results) {
                                var l = n.data.results.bindings;
                                void 0 !== l ? ! function() {
                                    l = l.slice(0, Math.min(l.length, 2 * i));
                                    var n = 0;
                                    l.forEach(function(e) {
                                        var t = e["class"].value;
                                        if (t.match(/^http.*/) && !a.inBlacklist(t) && void 0 !== e.instanceCount) {
                                            var o = {};
                                            o.uri = t, o.name = void 0 !== e.label ? e.label.value : "", o.value = parseInt(e.instanceCount.value), o.type = "class", o.active = !1;
                                            var s = a.nodes.addNode(o);
                                            r.push(s), void 0 !== e["class"] && void 0 !== e["class"].value && a.requestClassLabel(s, t)
                                        } else a.$log.debug("[Classes] Class '" + t + "' is either blacklisted or has an invalid URI!"), n++
                                    }), 0 === n ? t.resolve(r) : (a.$log.debug("[Classes] Fetch " + n + " more classes!"), e(!1, s + i, n))
                                }() : (a.$log.debug("[Classes] No further classes found!"), t.resolve(r))
                            } else a.$log.error(n), o ? (a.reqConfig.switchFormat(), a.$log.error("[Classes] Okay, I surrender..."), t.resolve(r)) : (a.$log.warn("[Classes] Okay please, just let me try one more time!"), a.reqConfig.switchFormat(), e(!0))
                        }, function(n) {
                            "canceled" === n.config.timeout.$$state.value ? (a.$log.warn("[Class Extractor] Class extraction was canceled!"), t.reject(r)) : a.reqConfig.getUseProxy() ? t.reject(r) : (a.$log.warn("[Class Extractor] Might need a proxy here, try again..."), a.reqConfig.setUseProxy(!0), e(!1, 0, i))
                        })["finally"](function() {
                            a.promises.removePromise(n)
                        })
                    }
                    var t = this.$q.defer(),
                        n = this.promises.addPromise(t);
                    if (this.nodes.hasClassNodes()) return this.$log.debug("[Classes] Skip loading further classes..."), t.resolve([]), t.promise;
                    var r = [],
                        o = this.reqConfig.getLimit() || 10,
                        a = this;
                    return e(!1, 0, o), t.promise
                }
            }, {
                key: "requestClassLabel",
                value: function(e, t) {
                    var n = this,
                        r = n.$q.defer(),
                        o = n.promises.addPromise(r),
                        a = this.reqConfig.getLabelLanguage(),
                        s = this.queryFactory.getLabelQuery(t, a),
                        i = this.reqConfig.getRequestURL();
                    n.$log.debug("[Class Label] Send request for '" + t + "'..."), this.$http.get(i, this.reqConfig.forQuery(s, r)).then(function(r) {
                        if (void 0 !== r && void 0 !== r.data && void 0 !== r.data.results) {
                            var o = r.data.results.bindings;
                            if (void 0 !== o && o.length > 0 && void 0 !== o[0].label && "" !== o[0].label.value) {
                                var a = o[0].label.value;
                                n.nodes.insertLabel(e, a), n.$log.debug("[Class Label] Found '" + a + "' for '" + t + "'.")
                            } else n.$log.debug("[Class Label] Found None for '" + t + "'."), n.requestClassSkosLabel(e, t)
                        }
                    }, function(e) {
                        void 0 !== e.status && 400 === e.status ? "string" == typeof e.data && e.data.indexOf("syntax error at 'SAMPLE'") !== -1 ? n.$log.warn("[Class Extractor] Endpoint does not understand query with 'SAMPLE'!") : (n.$log.error("[Class Extractor] Endpoint returned bad request on retrieving class labels"), n.$log.error(e)) : n.$log.error(e)
                    })["finally"](function() {
                        n.promises.removePromise(o)
                    })
                }
            }, {
                key: "requestClassSkosLabel",
                value: function(e, t) {
                    var n = this,
                        r = this.$q.defer(),
                        o = this.reqConfig.getLabelLanguage(),
                        a = this.queryFactory.getPreferredLabelQuery(t, o),
                        s = this.reqConfig.getRequestURL();
                    n.$log.debug("[Class Label] Send request for '" + t + "' SKOS preferred label..."), this.$http.get(s, this.reqConfig.forQuery(a, r)).then(function(r) {
                        if (void 0 !== r && void 0 !== r.data && void 0 !== r.data.results) {
                            var o = r.data.results.bindings;
                            if (void 0 !== o && o.length > 0 && void 0 !== o.label && "" !== o[0].label.value) {
                                var a = o[0].label.value;
                                n.nodes.insertLabel(e, a), n.$log.debug("[Class Label] Found SKOS preferred label '" + a + "' for '" + t + "'.")
                            } else n.$log.debug("[Class Label] Found no SKOS preferred label for '" + t + "'.")
                        }
                    }, function(e) {
                        n.$log.error(e)
                    })
                }
            }]), t
        }(u["default"]);
    t["default"] = d
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o, a, s, i, l) {
        var u = this;
        u.requestReferringTypes = function(u) {
            var d = t.defer(),
                c = l.addPromise(d),
                p = a.getURIById(u),
                f = o.getInstanceReferringTypesQuery(p, 5),
                g = r.getRequestURL();
            return a.getTypesLoaded(u) ? void n.debug("[Referring Types] Types for '" + p + "' are already loaded!") : (n.debug("[Referring Types] Send requests for types referring to instances of '" + p + "'..."), void e.get(g, r.forQuery(f, d)).then(function(e) {
                if (void 0 === e || void 0 === e.data || void 0 === e.data.results) return void n.warn("[Referring Types] No results");
                var t = e.data.results.bindings;
                if (void 0 !== t && t.length > 0) {
                    n.debug("[Referring Types] Found " + t.length + " for '" + p + "'.");
                    for (var r = 0; r < t.length; r++)
                        if (void 0 !== t[r].valType && t[r].valType.hasOwnProperty("value")) {
                            var o = t[r].valType.value;
                            if ("string" == typeof o && o.length > 5 && o.match(/^http.*/)) {
                                var l = {
                                        uri: o,
                                        type: "type",
                                        value: 1
                                    },
                                    d = a.addDatatypeForClass(l, u);
                                if ("" !== d) {
                                    var c = {
                                            uri: s.PLACEHOLDER_PROP_URI,
                                            type: "datatypeProperty",
                                            value: 1
                                        },
                                        f = a.addNode(c);
                                    s.addProperty(u, f, d, s.PLACEHOLDER_PROP_URI), i.requestClassTypeRelation(u, f, d)
                                } else n.warn("[Referring Types] Data type '" + o + "' is already connected to class '" + u + "'.")
                            } else n.warn("[Referring Types] '" + o + "' is not a valid URI! Data type was ignored.")
                        }
                } else n.debug("[Referring Types] None found for instances of '" + p + "'.");
                a.setTypesLoaded(u)
            }, function(e) {
                void 0 !== e && e.hasOwnProperty("status") ? 500 === e.status && e.hasOwnProperty("data") && e.data.search("estimated execution time") !== -1 && n.debug("[Referring Types] Request would take to long!") : n.error(e)
            })["finally"](function() {
                l.removePromise(c)
            }))
        }
    }
    n.$inject = ["$http", "$q", "$log", "RequestConfig", "QueryFactory", "Nodes", "Properties", "RelationExtractor", "Promises"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$http", "$q", "$log", "RequestConfig", "QueryFactory", "Nodes", "Properties", "RelationExtractor", "Promises"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o, a, s) {
        var i = this;
        i.requestCommentForClass = function(i) {
            var l = a.getURIById(i),
                u = t.defer(),
                d = s.addPromise(u),
                c = r.getCommentQuery(l),
                p = o.getRequestURL();
            e.get(p, o.forQuery(c, u)).then(function(e) {
                if (void 0 !== e && void 0 !== e.data && void 0 !== e.data.results) {
                    var t = e.data.results.bindings;
                    if (t.length > 0) {
                        var r = t[0].comment;
                        void 0 !== r && r.hasOwnProperty("value") ? a.insertComment(i, r.value) : n.error("[DetailExtractor] Error parsing comment for '" + l + "'.")
                    } else n.debug("[DetailExtractor] No Comment found for '" + l + "'.")
                }
            }, function(e) {
                n.error(e)
            })["finally"](function() {
                s.removePromise(d)
            })
        }
    }
    n.$inject = ["$http", "$q", "$log", "QueryFactory", "RequestConfig", "Nodes", "Promises"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$http", "$q", "$log", "QueryFactory", "RequestConfig", "Nodes", "Promises"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(75),
        i = r(s),
        l = n(70),
        u = r(l),
        d = n(74),
        c = r(d),
        p = n(71),
        f = r(p),
        g = n(72),
        v = r(g);
    t["default"] = a["default"].module("services.extractors", []).service("TBoxExtractor", i["default"]).service("ClassExtractor", u["default"]).service("RelationExtractor", c["default"]).service("DataTypeExtractor", f["default"]).service("DetailExtractor", v["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        l = n(6),
        u = r(l),
        d = function(e) {
            function t(e, n, r, s, i, l, u, d, c, p, f) {
                o(this, t);
                var g = a(this, Object.getPrototypeOf(t).call(this));
                g.blacklist = [], g.Storage = e, g.$http = n, g.$q = r, g.$log = s, g.queryFactory = u, g.rConfig = d, g.nodes = c, g.props = p, g.promises = f;
                var v = e.getItem("property_blacklist");
                if (void 0 !== v && null !== v) {
                    var m = v.replace(/(\r\n|\n|\r|\s)/gm, "");
                    g.setBlacklist(m.split(","))
                } else
                    for (var h in l)
                        if (l.hasOwnProperty(h) && "SKOS" !== h)
                            for (var y = 0; y < l[h].length; y++) g.blacklist.push(i[h] + l[h][y]);
                return g
            }
            return t.$inject = ["Storage", "$http", "$q", "$log", "PREFIX", "PROPERTY_BLACKLIST", "QueryFactory", "RequestConfig", "Nodes", "Properties", "Promises"], s(t, e), t.$inject = ["Storage", "$http", "$q", "$log", "PREFIX", "PROPERTY_BLACKLIST", "QueryFactory", "RequestConfig", "Nodes", "Properties", "Promises"], i(t, [{
                key: "requestClassClassRelation",
                value: function(e, t) {
                    var n = arguments.length <= 2 || void 0 === arguments[2] ? 10 : arguments[2],
                        r = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3],
                        o = this.$q.defer(),
                        a = this.promises.addPromise(o),
                        s = this.nodes.getURIById(e),
                        i = this.nodes.getURIById(t),
                        l = void 0;
                    l = this.rConfig.getPropertiesOrdered() ? this.queryFactory.getOrderedClassClassRelationQuery(s, i, n, r) : this.queryFactory.getUnorderedClassClassRelationQuery(s, i, n, r);
                    var u = this.rConfig.getRequestURL(),
                        d = this;
                    this.$http.get(u, this.rConfig.forQuery(l, o)).then(function(o) {
                        if (void 0 !== o && void 0 !== o.data && void 0 !== o.data.results) {
                            var a = o.data.results.bindings;
                            if (void 0 !== a && a.length > 0) {
                                if (d.$log.debug("[Relations] " + a.length + " between '" + s + "' and '" + i + "'."), void 0 !== a[0].prop && void 0 !== a[0].prop.value && "" !== a[0].prop.value) {
                                    for (var l = 0 === r, u = 0; u < a.length; u++) {
                                        var c = a[u].prop.value;
                                        if (!d.inBlacklist(c)) {
                                            var p = "",
                                                f = d.props.existsBetween(e, t);
                                            if (f === !1) {
                                                var g = {};
                                                g.uri = c, g.type = "property", g.value = 1, g.isLoopNode = e === t, p = d.nodes.addNode(g)
                                            } else p = d.props.getIntermediateId(e, t), d.nodes.incValueOfId(p);
                                            p.length < 1 && d.$log.error("[Relations] Intermediate '" + f + "' was not found!"), void 0 !== a[u].count && void 0 !== a[u].count.value ? d.props.addProperty(e, p, t, c, a[u].count.value) : d.props.addProperty(e, p, t, c), l && (d.requestPropertyLabel(c), l = !1)
                                        }
                                    }
                                    a.length === n && d.requestClassClassRelation(e, t, 2 * n, r + a.length)
                                }
                            } else d.$log.debug("[Relations] None between '" + s + "' and '" + i + "'.")
                        }
                    }, function(e) {
                        void 0 !== e && e.hasOwnProperty("status") ? e.status === -1 ? void 0 !== e.config && void 0 !== e.config.timeout && void 0 !== e.config.timeout.$$state && "canceled" === e.config.timeout.$$state.value ? d.$log.debug("[Relations] Class-class relation request was canceled!") : d.$log.warn("[Relations] No results, likely because of CORS.") : 500 === e.status && e.data.search("estimated execution time ") !== -1 && d.$log.debug("[Relations] Request would take too long!") : d.$log.error(e)
                    })["finally"](function() {
                        d.promises.removePromise(a)
                    })
                }
            }, {
                key: "requestPropertyLabel",
                value: function(e) {
                    var t = this.$q.defer(),
                        n = this.promises.addPromise(t),
                        r = this.rConfig.getLabelLanguage(),
                        o = this.queryFactory.getLabelQuery(e, r),
                        a = this.rConfig.getRequestURL(),
                        s = this;
                    s.$log.debug("[Property Label] Send Request for '" + e + "'..."), this.$http.get(a, this.rConfig.forQuery(o, t)).then(function(t) {
                        if (void 0 !== t && void 0 !== t.data && void 0 !== t.data.results) {
                            var n = t.data.results.bindings;
                            if (void 0 !== n && n.length > 0 && void 0 !== n[0].label) {
                                var r = n[0].label.value;
                                s.$log.debug("[Property Label] Found '" + r + "' for '" + e + "'."), s.props.insertValue(e, "name", r)
                            } else s.$log.debug("[Property Label] Found None for '" + e + "'.")
                        }
                    }, function(e) {
                        e.status === -1 && void 0 !== e.config && void 0 !== e.config.timeout && "canceled" === e.config.timeout.$$state.value ? s.$log.debug("[Relations] Property label request was canceled!") : 400 === e.status ? "string" == typeof e.data && e.data.indexOf("syntax error at 'SAMPLE'") !== -1 ? s.$log.warn("[Relation Extractor] Endpoint does not understand query with 'SAMPLE'!") : (s.$log.error("[Relation Extractor] Endpoint returned bad request when retrieving property label."), s.$log.error(e)) : s.$log.error(e)
                    })["finally"](function() {
                        s.promises.removePromise(n)
                    })
                }
            }, {
                key: "requestClassTypeRelation",
                value: function(e, t, n) {
                    var r = arguments.length <= 3 || void 0 === arguments[3] ? 10 : arguments[3],
                        o = arguments.length <= 4 || void 0 === arguments[4] ? 0 : arguments[4],
                        a = this.$q.defer(),
                        s = this.promises.addPromise(a),
                        i = this.nodes.getURIById(e),
                        l = this.nodes.getURIById(n),
                        u = void 0;
                    u = this.rConfig.getPropertiesOrdered() ? this.queryFactory.getOrderedClassTypeRelationQuery(i, l, r, o) : this.queryFactory.getUnorderedClassTypeRelationQuery(i, l, r, o);
                    var d = this.rConfig.getRequestURL(),
                        c = this;
                    this.$http.get(d, this.rConfig.forQuery(u, a)).then(function(a) {
                        if (void 0 !== a && void 0 !== a.data && void 0 !== a.data.results) {
                            var s = a.data.results.bindings;
                            if (void 0 !== s && s.length > 0) {
                                c.$log.debug("[Relations] Found " + s.length + " between '" + i + "' and '" + l + "'.");
                                for (var u = 0; u < s.length; u++)
                                    if (void 0 !== s[u].prop && void 0 !== s[u].prop.value) {
                                        var d = s[u].prop.value;
                                        if (0 === o && 0 === u ? c.nodes.setURI(t, d) : c.nodes.incValueOfId(t), void 0 !== s[u].count && void 0 !== s[u].count.value) {
                                            var p = s[u].count.value;
                                            c.props.addProperty(e, t, n, d, p)
                                        } else c.props.addProperty(e, t, n, d)
                                    } if (s.length === r) {
                                    var f = o + s.length;
                                    c.requestClassTypeRelation(e, t, n, 2 * r, f)
                                }
                            } else c.$log.debug("[Relations] Found none between '" + i + "' and '" + l + "'.")
                        }
                    }, function(e) {
                        void 0 !== e && e.hasOwnProperty("status") && 500 === e.status && e.data.search("estimated execution time") !== -1 ? c.$log.debug("[Relations] Request would take too long.") : c.$log.error(e)
                    })["finally"](function() {
                        c.promises.removePromise(s)
                    })
                }
            }, {
                key: "requestClassEquality",
                value: function(e, t) {
                    var n = this.$q.defer(),
                        r = this.promises.addPromise(n);
                    if (void 0 === e || void 0 === t) return n.reject("missing parameter"), n.promise;
                    if (e === t) return n.reject("same"), n.promise;
                    var o = this.nodes.getURIById(e),
                        a = this.nodes.getURIById(t),
                        s = this.queryFactory.getNumberOfCommonInstancesQuery(o, a),
                        i = this.rConfig.getRequestURL(),
                        l = this.nodes.getInstanceCountById(e),
                        u = this.nodes.getInstanceCountById(t),
                        d = this;
                    return d.$log.debug("[Relations] Query for number of common Instances of '" + o + "' and '" + a + "'..."), this.$http.get(i, this.rConfig.forQuery(s, n)).then(function(r) {
                        if (void 0 !== r && void 0 !== r.data && void 0 !== r.data.results) {
                            var s = r.data.results.bindings;
                            if (void 0 !== s && s.length > 0 && s[0].hasOwnProperty("commonInstanceCount")) {
                                var i = parseInt(s[0].commonInstanceCount.value);
                                if (void 0 !== i)
                                    if (d.$log.debug("[Relations] Classes '" + o + "' (" + l + ") and '" + a + "' (" + u + ") have " + ("'" + i + "' common instances!")), i === l && i === u) {
                                        d.$log.debug("[Relations] Merge class '" + e + "' and '" + t + "'...");
                                        var c = d.props.removeDisjointProperties(t);
                                        d.nodes.removeNodes(c);
                                        var p = d.props.mergePropertiesBetween(e, t);
                                        d.nodes.removeNodes(p);
                                        var f = d.nodes.mergeClasses(e, t);
                                        "" !== f ? n.resolve(f) : n.reject("already merged")
                                    } else if (i === l && i < u) {
                                    if (d.$log.debug("[Relations] '" + e + "' seems to be a subclass of '" + t + "'!"), !d.nodes.hasSubClassPropNode(e, t)) {
                                        var g = {};
                                        g.uri = d.props.SUBCLASS_URI, g.type = "subClassProperty", g.name = "Subclass of", g.value = 1e4, g.commonInstances = i, g.childId = e, g.parentId = t;
                                        var v = d.nodes.addNode(g);
                                        d.$log.debug("Node between child " + e + " and parent " + t + " is '" + v + "'."), d.props.addSubClassProperty(e, v, t)
                                    }
                                    n.reject("subclass")
                                } else if (i === u && i < l) {
                                    if (d.$log.debug("[Relations] '" + t + "' seems to be a subclass of '" + e + "'!"), !d.nodes.hasSubClassPropNode(e, t)) {
                                        var m = {};
                                        m.uri = d.props.SUBCLASS_URI, m.name = "Subclass of", m.type = "subClassProperty", m.value = 1e4, m.commonInstances = i, m.childId = t, m.parentId = e;
                                        var h = d.nodes.addNode(m);
                                        d.$log.debug("[Relations] Node between parent " + e + " and child " + t + " is " + ("'" + h + "'.")), d.props.addSubClassProperty(t, h, e)
                                    }
                                    n.reject("subclass")
                                } else if (0 === i) {
                                    d.$log.debug("[Relations] " + e + " and " + t + " are disjoint.");
                                    var y = {
                                        uri: d.nodes.DISJOINT_NODE_URI,
                                        type: "disjointNode",
                                        name: " ",
                                        value: 1,
                                        classes: []
                                    };
                                    y.classes.push(e), y.classes.push(t);
                                    var b = d.nodes.addNode(y);
                                    d.props.addDisjointProp(e, b), d.props.addDisjointProp(t, b), n.reject("disjoint")
                                } else d.$log.debug("[Relations] None between '" + o + "' and '" + a + "' via instance count."), n.reject("no relation")
                            }
                        }
                    }, function(e) {
                        void 0 !== e.config && void 0 !== e.config.timeout && void 0 !== e.config.timeout.$$state && "canceled" === e.config.timeout.$$state.value ? d.$log.debug("[Relation Extractor] Common instances query was cancelled.") : d.$log.error(e), n.reject(e)
                    })["finally"](function() {
                        d.promises.removePromise(r)
                    }), n.promise
                }
            }]), t
        }(u["default"]);
    t["default"] = d
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o, a, s, i, l) {
        var u = this;
        u.classes = [], u.startTBoxExtraction = function() {
            o.start(), s.requestClasses().then(function(n) {
                if ("string" == typeof n && "canceled" === n) return void t.warn("[TBox Extractor] Cancel further extraction steps!");
                if (t.debug("[TBox Extractor] Now the classes should be loaded!"), 0 === n.length) return void t.debug("[TBox Extractor] No new classes!");
                for (var o = 0; o < n.length; o++) u.classes.push(n[o]);
                for (var a = [], s = 0; s < u.classes.length; s++)
                    for (var l = 0; l < s; l++) a.push(i.requestClassEquality(u.classes[l], u.classes[s]));
                e.allSettled(a).then(function(e) {
                    t.debug("[TBox Extractor] Now all should be settled!");
                    for (var n = 0; n < e.length; n++)
                        if ("fulfilled" === e[n].state && "canceled" !== e[n].value) {
                            var o = u.classes.indexOf(e[n].value);
                            o !== -1 ? (u.classes.splice(o, 1), t.debug("[TBox Extractor] Removed '" + e[n].value + "' from class list.")) : t.error("[TBox Extractor] Unable to remove '" + e[n].value + "' from class list, class doesn't exist!")
                        } r.getIncludeDataTypes() && u.extractDataTypes(), u.extractRelations()
                })
            })
        }, u.extractDataTypes = function() {
            t.debug("[TBox Extractor] Loading referring data types for " + u.classes.length + " classes..."), u.classes.forEach(function(e) {
                l.requestReferringTypes(e)
            })
        }, u.extractRelations = function() {
            t.debug("[TBox Extractor] Send requests for relations...");
            for (var e = 0; e < u.classes.length; e++)
                for (var n = 0; n < u.classes.length; n++)
                    if (r.getIncludeLoops() || n !== e) {
                        var o = u.classes[n],
                            a = u.classes[e];
                        i.requestClassClassRelation(o, a, 10, 0)
                    }
        }, u.extractRelationLoops = function() {
            u.classes.forEach(function(e) {
                void 0 !== e["class"] && e["class"].hasOwnProperty("value") && i.requestClassClassRelation(e["class"].value, e)
            })
        }, u.stopTBoxExtraction = function() {
            a.rejectAll(), o.stop()
        }, u.restartTBoxExtraction = function() {
            n.clearAll(), u.classes = [], o.stop(), t.warn("[TBox Extractor] Restart TBox extraction..."), u.startTBoxExtraction()
        }, u.clearClasses = function() {
            u.classes.length = 0
        }
    }
    n.$inject = ["$q", "$log", "Data", "Filters", "StopWatch", "Promises", "ClassExtractor", "RelationExtractor", "DataTypeExtractor"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$q", "$log", "Data", "Filters", "StopWatch", "Promises", "ClassExtractor", "RelationExtractor", "DataTypeExtractor"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = this;
        t.dtPropDistance = 50, t.propDistance = 100, t.disjointPropDistance = 100, t.loopDistance = 80, t.getClassToDatatypeDistance = function() {
            return t.dtPropDistance
        }, t.setClassToDatatypeDistance = function(e) {
            t.dtPropDistance = e
        }, t.getClassToClassDistance = function() {
            return t.propDistance
        }, t.setClassToClassDistance = function(e) {
            t.propDistance = e
        }, t.getDistance = function(e) {
            var n = 0;
            return void 0 !== e.target && e.target.isLoopNode || void 0 !== e.source && e.source.isLoopNode ? n = t.loopDistance : (n = "datatypeProperty" === e.type ? t.dtPropDistance : "disjointProperty" === e.type ? t.disjointPropDistance : t.propDistance, void 0 !== e.source && void 0 !== e.source.radius && (n += e.source.radius), void 0 !== e.target && void 0 !== e.target.radius && (n += e.target.radius)), n
        }, t.getLoopData = function(t) {
            var n = [];
            return n.push(e.getAnotherCircleOutlinePoint(t, -1)), n.push({
                x: t.intermediate.x,
                y: t.intermediate.y
            }), n.push(e.getAnotherCircleOutlinePoint(t, 1)), n
        }, t.getLineData = function(t) {
            var n = [];
            return n.push({
                x: t.source.x,
                y: t.source.y
            }), n.push({
                x: t.intermediate.x,
                y: t.intermediate.y
            }), "class" === t.target.type ? n.push(e.getCircleOutlinePoint(t)) : n.push(e.getRectOutlinePoint(t)), n
        }
    }
    n.$inject = ["Geometry"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["Geometry"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o) {
        var a = this;
        a.clearAll = function() {
            o.rejectAll(), t.clearAll(), n.clearAll(), r.clear(), e.warn("[Data] Cleared all saved data!")
        }, a.initMaps = function() {
            t.initMap(), n.initProperties(), e.debug("[Data] Initialized nodes and properties.")
        }
    }
    n.$inject = ["$log", "Nodes", "Properties", "Requests", "Promises"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$log", "Nodes", "Properties", "Requests", "Promises"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = this,
            r = "include_data_types",
            o = "include_loops",
            a = "include_disjoint_node",
            s = "include_subclass_relations",
            i = void 0,
            l = void 0,
            u = void 0,
            d = void 0;
        n.init = function() {
            i = t.getItem(o) || "true", t.setItem(o, i), l = t.getItem(r) || "true", t.setItem(r, l), u = t.getItem(a) || "false", t.setItem(a, u), d = t.getItem(s) || "true", t.setItem(s, d)
        }, n.getIncludeLoops = function() {
            return "true" === i
        }, n.toggleLoops = function() {
            return i = n.getIncludeLoops() ? "false" : "true", t.setItem(o, i), e.debug("[Filters] Property loops are now " + (n.getIncludeLoops() ? "shown" : "hidden") + "."), n.getIncludeLoops()
        }, n.getIncludeDataTypes = function() {
            return "true" === l
        }, n.toggleDataTypes = function() {
            return l = n.getIncludeDataTypes() ? "false" : "true", t.setItem(r, l), e.debug("[Filters] Data types are now " + (n.getIncludeLoops() ? "shown" : "hidden") + "."), n.getIncludeDataTypes()
        }, n.getIncludeDisjointNode = function() {
            return "true" === u
        }, n.toggleDisjointNode = function() {
            return u = n.getIncludeDisjointNode() ? "false" : "true", t.setItem(a, u), e.debug("[Filters] Disjoint nodes are now " + (n.getIncludeDisjointNode() ? "shown" : "hidden") + "."), n.getIncludeDisjointNode()
        }, n.getIncludeSubclassRelations = function() {
            return "true" === d
        }, n.toggleSubclassRelations = function() {
            return d = n.getIncludeSubclassRelations() ? "false" : "true", t.setItem(s, d), e.debug("[Filters] Subclass relations are now " + (n.getIncludeSubclassRelations() ? "shown" : "hidden") + "."), n.getIncludeSubclassRelations()
        }, n.init()
    }
    n.$inject = ["$log", "Storage"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$log", "Storage"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(81),
        i = r(s),
        l = n(80),
        u = r(l),
        d = n(83),
        c = r(d),
        p = n(82),
        f = r(p),
        g = n(78),
        v = r(g),
        m = n(77),
        h = r(m),
        y = n(84),
        b = r(y);
    t["default"] = a["default"].module("services.model", []).service("Prefixes", i["default"]).service("Nodes", u["default"]).service("Requests", c["default"]).service("Properties", f["default"]).service("Filters", v["default"]).service("Data", h["default"]).service("View", b["default"])
}, function(e, t) {
    "use strict";

    function n(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function r(e, t, r, a, s) {
        var i = new Map,
            l = new Map,
            u = new Map,
            d = new Map,
            c = new Set,
            p = this;
        p.DISJOINT_NODE_URI = "http://my-own-disjoint-node", p.suffixRegEx = /(#?[^\/#]*)\/?$/, p.altSuffixRegEx = /(:[^:]*)$/, p.initMap = function() {
            var t = s.getItem(a.getEndpointURL() + "_nodes");
            if (void 0 !== t && null !== t) {
                e.debug("[Nodes] Use nodes from session or local storage!"), l = new Map(JSON.parse(t));
                var n = !0,
                    r = !1,
                    o = void 0;
                try {
                    for (var d, f = l.values()[Symbol.iterator](); !(n = (d = f.next()).done); n = !0) {
                        var g = d.value;
                        if ("class" === g.type || "disjointNode" === g.type) i.set(g.uri, g.id);
                        else if ("subClassProperty" === g.type) c.add(g.childId + g.parentId);
                        else if (g.hasEquivalent === !0 && void 0 !== g.equivalentURIs)
                            for (var v = 0; v < g.equivalentURIs.length; v++) u.set(g.equivalentURIs[v], g.id)
                    }
                } catch (m) {
                    r = !0, o = m
                } finally {
                    try {
                        !n && f["return"] && f["return"]()
                    } finally {
                        if (r) throw o
                    }
                }
                e.debug("[Nodes] Build prefix map for nodes from session storage!"), p.buildPrefixMap()
            }
        }, p.buildPrefixMap = function() {
            r.clear();
            var n = !0,
                o = !1,
                a = void 0;
            try {
                for (var s, i = l.values()[Symbol.iterator](); !(n = (s = i.next()).done); n = !0) {
                    var u = s.value;
                    if (void 0 !== u.uri && u.uri.length > 0 && u.uri !== t.SUBCLASS_URI && u.uri !== p.DISJOINT_NODE_URI) {
                        var d = u.uri.replace(p.suffixRegEx, "");
                        0 === d.length && (d = u.uri.replace(p.altSuffixRegEx, "")), e.debug("[Nodes] Prefix for '" + u.uri + "' is '" + d + "'."), r.addPrefix({
                            prefix: d
                        })
                    }
                }
            } catch (c) {
                o = !0, a = c
            } finally {
                try {
                    !n && i["return"] && i["return"]()
                } finally {
                    if (o) throw a
                }
            }
        }, p.updateStorage = function() {
            s.setItem(a.getEndpointURL() + "_nodes", JSON.stringify([].concat(n(l))))
        }, p.addDatatypeForClass = function(t, n) {
            if ("object" !== ("undefined" == typeof t ? "undefined" : o(t)) || void 0 === t.uri || void 0 === t.type) return e.error("[Nodes] Unable to add data type node, illegal argument for node!"), "";
            if ("string" != typeof n) return e.error("[Nodes] Unable to add data type node, illegal argument for class id!"), "";
            var r = "",
                a = d.get(n);
            return void 0 !== a && a.length > 0 && a.indexOf(t.uri) !== -1 ? e.debug("[Nodes] There already is a data type '" + t.uri + "' connected to class '" + n + "'!") : (void 0 === a ? d.set(n, [t.uri]) : d.set(n, a.concat([t.uri])), r = t.type + l.size,
                t.id = r, l.set(r, t), e.debug("[Nodes] Add new data type node '" + t.uri + "'."), p.updateStorage()), r
        }, p.addNode = function(t) {
            var n = "";
            if ("object" === ("undefined" == typeof t ? "undefined" : o(t)) && t.hasOwnProperty("uri") && t.hasOwnProperty("type")) {
                if ("class" === t.type) {
                    var a = i.get(t.uri);
                    if (void 0 !== a) return a;
                    if (n = t.type + l.size, t.id = n, l.set(n, t), i.set(t.uri, n), t.uri !== p.DISJOINT_NODE_URI) {
                        var s = t.uri.replace(p.suffixRegEx, "");
                        0 === s.length && (s = t.uri.replace(p.altSuffixRegEx, "")), e.debug("[Nodes] Prefix for new node with uri " + t.uri + " is '" + s + "'!"), r.addPrefix({
                            prefix: s
                        })
                    }
                } else if ("subClassProperty" === t.type)
                    if (void 0 !== t.parentId && void 0 !== t.childId) {
                        var u = t.childId + t.parentId;
                        c.has(u) ? e.warn("[Nodes] Sub-class rel between " + t.childId + " & " + t.parentId + " does already exist!") : (c.add(t.childId + t.parentId), n = u, t.id = n, l.set(n, t), e.debug("[Nodes] Add new Node '" + t.uri + "' with id '" + n + "'."))
                    } else e.error("[Nodes] Missing parent child info for subclass relation!");
                else n = t.type + l.size, t.id = n, l.set(n, t), e.debug("[Nodes] Add new Node '" + t.uri + "'.");
                p.updateStorage()
            }
            return n
        }, p.getNodes = function() {
            return l
        }, p.getById = function(e) {
            var t = null;
            return void 0 !== e && "string" == typeof e && (t = l.get(e)), t
        }, p.getInstanceCountById = function(e) {
            var t = -1,
                n = l.get(e);
            return void 0 !== n && n.hasOwnProperty("value") && (t = n.value), t
        }, p.getURIById = function(t) {
            var n = "",
                r = l.get(t);
            if (void 0 !== r && r.hasOwnProperty("uri")) n = r.uri;
            else {
                e.debug("[Nodes] Can not resolve uri of node with id '" + t + "'! Search for equivalent nodes...");
                var o = p.getClassNodeOrEquivalent(t);
                void 0 !== o && void 0 !== o.uri ? n = o.uri : e.error("[Nodes] Can not resolve uri of node with id '" + t + "'! This node doesn't exist!")
            }
            return n
        }, p.insertLabel = function(t, n) {
            var r = l.get(t);
            void 0 !== r ? r.name = n : e.error("[Nodes] Can't add label to node with id '" + t + "', node was not found!")
        }, p.insertComment = function(t, n) {
            var r = l.get(t);
            void 0 !== r ? r.comment = n : e.error("[Nodes] Unable to add comment '" + n + "' to node with id '" + t + "'.\n        There is no node with this id!")
        }, p.setURI = function(t, n) {
            var r = l.get(t);
            void 0 !== r ? (r.uri = n, p.updateStorage()) : e.error("[Nodes] Unable to change uri of '" + t + "' to '" + n + "', there is no node with this id!")
        }, p.setTypesLoaded = function(e) {
            if (void 0 !== e && "string" == typeof e) {
                var t = l.get(e);
                void 0 !== t && "class" === t.type && (t.typesLoaded = !0)
            }
        }, p.getTypesLoaded = function(t) {
            if (void 0 !== t && "string" == typeof t) {
                var n = l.get(t);
                if (void 0 !== n && "class" === n.type && n.typesLoaded) return e.debug("[Nodes] Types for '" + t + "' are already loaded!"), !0
            }
            return !1
        }, p.mergeClasses = function(t, n) {
            var r = "";
            if (void 0 !== t && "string" == typeof t && void 0 !== n && "string" == typeof n) {
                e.debug("[Nodes] Try to merge " + t + " and " + n + "...");
                var o = p.getClassNodeOrEquivalent(t),
                    a = p.getClassNodeOrEquivalent(n);
                if (void 0 !== o && "class" === o.type && void 0 !== a && "class" === a.type)
                    if (o === a) e.debug("[Nodes] Nothing to do here, classes are already merged!");
                    else {
                        if (o.hasEquivalent || (o.hasEquivalent = !0, o.equivalentURIs = []), a.hasEquivalent) {
                            if (void 0 !== a.equivalentURIs)
                                for (var s = 0; s < a.equivalentURIs.length; s++) o.equivalentURIs.push(a.equivalentURIs[s])
                        } else o.equivalentURIs.push(a.uri);
                        u.set(n, o.id), l["delete"](n), r = n, e.debug("[Nodes] Merged '" + o.id + "' and '" + n + "'.")
                    }
                else e.error("[Nodes] Unable to merge '" + t + "' and '" + n + "'! at least one of them can not be found!")
            }
            return r
        }, p.getClassNodeOrEquivalent = function(e) {
            var t = l.get(e);
            if (void 0 === t) {
                var n = u.get(e);
                void 0 !== n && (t = l.get(n))
            }
            return t
        }, p.removeNodes = function(e) {
            void 0 !== e && e.length > 0 && e.forEach(function(e) {
                l["delete"](e)
            })
        }, p.incValueOfId = function(e) {
            var t = l.get(e);
            return void 0 !== t && t.hasOwnProperty("value") ? (t.value += 1, t.value) : -1
        }, p.isEmpty = function() {
            return 0 === l.size
        }, p.hasClassNodes = function() {
            return i.size > 1
        }, p.clearAll = function() {
            i.clear(), l.clear(), u.clear(), d.clear(), c.clear(), r.clear(), e.warn("[Nodes] Cleared all nodes and prefixes!")
        }, p.hasSubClassPropNode = function(t, n) {
            var r = !1;
            if (void 0 !== t && void 0 !== n) {
                var o = l.get(t),
                    a = l.get(n);
                if (void 0 !== o && void 0 !== a) {
                    var s = t + n;
                    r = c.has(s)
                } else r = !0
            } else e.error("[Nodes] Child or parent id is undefined!");
            return r
        }, p.initMap()
    }
    r.$inject = ["$log", "Properties", "Prefixes", "RequestConfig", "Storage"], Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    r.$inject = ["$log", "Properties", "Prefixes", "RequestConfig", "Storage"], t["default"] = r
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = [],
            o = 1,
            a = !0,
            s = this;
        s.addPrefix = function(a) {
            if ("object" === ("undefined" == typeof a ? "undefined" : r(a)) && void 0 !== a.prefix) {
                if (a.prefix.length < 8) return void t.warn("[Prefixes] Prefix is too short: '" + a.prefix + "'");
                for (var s = void 0, i = 0; i < n.length; i++) n[i].classification = "extern", n[i].prefix === a.prefix && (s = n[i]);
                void 0 !== s ? s.value++ : (a.color = o, a.value = 1, o++, n.push(a)), n.sort(function(e, t) {
                    return e.value < t.value ? 1 : e.value > t.value ? -1 : 0
                }), n.length > 0 && (n[0].classification = "intern"), e.$broadcast("prefixes-changed", n.length)
            }
        }, s.clear = function() {
            n.length = 0, o = 1, e.$broadcast("prefixes-changed", 0)
        }, s.getPrefixes = function() {
            return n
        }, s.setPrefixes = function(t) {
            void 0 !== t && void 0 !== t.length && (n = t, e.$broadcast("prefixes-changed", n.length))
        }, s.isInternal = function(e) {
            for (var t = !1, r = 0; r < n.length; r++) {
                var o = n[r];
                if ("intern" === o.classification && e.indexOf(o.prefix) !== -1) {
                    t = !0;
                    break
                }
            }
            return t
        }, s.getColor = function(e) {
            var t = 1;
            if (a)
                for (var r = 0; r < n.length; r++) {
                    var o = n[r];
                    if ("intern" !== o.classification && e.indexOf(o.prefix) !== -1) {
                        t = o.color;
                        break
                    }
                }
            return t
        }, s.getDifferentColors = function() {
            return a
        }, s.toggleDifferentColors = function() {
            return a = !a, e.$broadcast("prefixes-changed", n.length), a
        }, s.size = function() {
            return n.length
        }
    }
    n.$inject = ["$rootScope", "$log"], Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    n.$inject = ["$rootScope", "$log"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, o) {
        var a = this;
        a.SUBCLASS_URI = "http://my-own-sub-class", a.DISJOINT_PROP_URI = "http://my-own-disjoint-prop", a.PLACEHOLDER_PROP_URI = "http://my-placeholder-prop/unknown", a.properties = [], a.intermediateIdMap = new Map, a.sourceTargetPropertyMap = new Map, a.sourceTargetSubclassMap = new Map, a.sourceTargetDisjointMap = new Map, a.needsUpdate = !1, a.updateInterval = 5e3, a.storageUpdate = void 0, a.unusedRounds = 0, a.initProperties = function() {
            var e = o.getItem(r.getEndpointURL() + "_properties");
            if (void 0 !== e && null !== e) {
                var n = JSON.parse(e);
                void 0 !== n && n.length > 0 ? (t.debug("[Properties] Re-use " + n.length + " properties from session storage!"), n.forEach(function(e) {
                    return a.intermediateIdMap.set(e.intermediate, e)
                }), a.properties = n) : t.debug("[Properties] No saved properties in session storage!")
            }
            a.startStorageUpdate()
        }, a.startStorageUpdate = function() {
            t.debug("[Properties] (Re-)Start Session Store update!"), void 0 === a.storageUpdate && (a.storageUpdate = e(function() {
                a.needsUpdate ? (a.updateStorage(), n.$broadcast("properties-changed", ""), a.needsUpdate = !1, a.unusedRounds = 0) : (t.debug("[Properties] No Storage update needed!"), a.unusedRounds++, a.unusedRounds > 50 && a.endStorageUpdate())
            }, a.updateInterval))
        }, a.endStorageUpdate = function() {
            void 0 !== a.storageUpdate && (t.warn("[Properties] End the storage update."), e.cancel(a.storageUpdate), a.storageUpdate = void 0, a.unusedRounds = 0)
        }, a.updateStorage = function() {
            o.setItem(r.getEndpointURL() + "_properties", JSON.stringify(a.properties))
        }, a.existsBetween = function(e, t) {
            var n = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
                r = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
            if ("string" == typeof e && "string" == typeof t) {
                var o = a.sourceTargetPropertyMap.get(e + " - " + t);
                if (void 0 !== o && void 0 !== o.uri) return o.uri;
                if (n) {
                    var s = a.sourceTargetSubclassMap.get(e + " - " + t);
                    if (void 0 !== s && void 0 !== s.uri) return s.uri
                }
                if (r) {
                    var i = a.sourceTargetDisjointMap.get(e + " - " + t);
                    if (void 0 !== i && void 0 !== i.uri) return i.uri
                }
            }
            return !1
        }, a.addProperty = function(e, n, r, o, s) {
            if ("string" == typeof e && "string" == typeof n && "string" == typeof r && "string" == typeof o) {
                var i = void 0;
                if (void 0 !== s ? i = !0 : (i = !1, s = 1), a.existsBetween(e, r)) a.addURI(e, r, o, s);
                else {
                    var l = {};
                    l.source = e, l.intermediate = n, l.target = r, l.value = 1, l.props = [], l.props.push({
                        uri: o,
                        value: s
                    }), l.uri = o, l.type = "property", l.ordered = i, a.properties.push(l), a.intermediateIdMap.set(n, l), a.sourceTargetPropertyMap.set(e + " - " + r, l)
                }
                a.needsUpdate = !0
            } else t.error("[Properties] Unable to add new prop '" + e + "' -> '" + n + "' ->'" + r + "' named '" + o + "': Missing information!")
        }, a.addSubClassProperty = function(e, n, r) {
            if ("string" == typeof e && "string" == typeof n && "string" == typeof r) {
                var o = {};
                o.source = e, o.intermediate = n, o.target = r, o.value = 1, o.props = [], o.props.push({
                    uri: a.SUBCLASS_URI
                }), o.uri = a.SUBCLASS_URI, o.type = "subClassProperty", a.properties.push(o), a.sourceTargetSubclassMap.set(e + " - " + r, o), a.intermediateIdMap.set(n, o), a.needsUpdate = !0
            } else t.error("[Properties] Unable to add sub class prop from '" + e + "' via '" + n + "' to '" + r + "': Missing information!")
        }, a.addDisjointProp = function(e, t) {
            if (!a.existsBetween(e, t, !0, !0)) {
                var n = {
                    source: e,
                    target: t,
                    value: 1,
                    uri: a.DISJOINT_PROP_URI,
                    type: "disjointProperty"
                };
                a.properties.push(n), a.sourceTargetDisjointMap.set(e + " - " + t, n), a.needsUpdate = !0
            }
        }, a.removeDisjointProperties = function(e) {
            for (var t = 0, n = []; t < a.properties.length;) {
                var r = a.properties[t];
                r.source === e && "disjointProperty" === r.type ? (n.push(r.target), a.properties.splice(t, 1)) : t++
            }
            for (t = 0; t < a.properties.length;) {
                var o = a.properties[t];
                "disjointProperty" === o.type && n.indexOf(o.target) !== -1 ? a.properties.splice(t, 1) : t++
            }
            return n
        }, a.getProperties = function() {
            return a.properties
        }, a.getByURI = function(e) {
            for (var t = null, n = 0; n < a.properties.length; n++) {
                var r = a.properties[n];
                if (r.uri === e) {
                    t = r;
                    break
                }
            }
            return t
        }, a.getByNodeId = function(e) {
            return a.intermediateIdMap.get(e)
        }, a.getIntermediateId = function(e, t) {
            for (var n = "", r = 0; r < a.properties.length; r++) {
                var o = a.properties[r];
                if (o.source === e && o.target === t) {
                    n = o.intermediate;
                    break
                }
            }
            return n
        }, a.clearAll = function() {
            a.properties.length = 0, a.intermediateIdMap.clear(), a.sourceTargetPropertyMap.clear(), a.sourceTargetSubclassMap.clear(), a.sourceTargetDisjointMap.clear(), a.needsUpdate = !0, a.startStorageUpdate()
        }, a.addURI = function(e, n, r) {
            var o = arguments.length <= 3 || void 0 === arguments[3] ? 1 : arguments[3],
                s = a.sourceTargetPropertyMap.get(e + " - " + n);
            if (void 0 !== s)
                if (s.uri === a.PLACEHOLDER_PROP_URI) t.debug("[Properties] Remove placeholder of property '" + s.uri + "'!"), s.uri = r, s.props = [], s.props.push({
                    uri: r,
                    value: o
                });
                else {
                    var i = s.props.some(function(e) {
                        return e.uri === r
                    });
                    if (!i) {
                        var l = {
                            uri: r,
                            value: o
                        };
                        s.props.push(l), s.value++
                    }
                }
            else t.error("[Properties] Could not find property between " + e + " and " + n + "!")
        }, a.insertValue = function(e, n, r) {
            for (var o = -1, s = 0; s < a.properties.length; s++)
                if (a.properties[s].uri === e) {
                    o = s;
                    break
                } o > -1 && o < a.properties.length ? (a.properties[o][n] = r, a.needsUpdate = !0) : t.debug("[Properties] '" + e + "' was not found! The value " + r + " could not be inserted as " + n + ".")
        }, a.mergePropertiesBetween = function(e, n) {
            for (var r = [], o = 0; o < a.properties.length;) {
                var s = a.properties[o];
                if (s.source === n) {
                    if ("subClassProperty" === s.type && a.existsBetween(e, s.target, !0, !1) === a.SUBCLASS_URI) {
                        t.debug("[Properties] Remove node '" + s.intermediate + "'."), r.push(s.intermediate), a.properties.splice(o, 1), a.intermediateIdMap["delete"](s.intermediate);
                        continue
                    }
                    s.source = e
                }
                if (s.target === n) {
                    if ("subClassProperty" === s.type && a.existsBetween(s.source, e, !0, !1) === a.SUBCLASS_URI) {
                        t.debug("[Properties] Remove node '" + s.intermediate + "'."), r.push(s.intermediate), a.properties.splice(o, 1), a.intermediateIdMap["delete"](s.intermediate);
                        continue
                    }
                    s.target = e
                }
                o++
            }
            return a.needsUpdate = !0, r
        }, a.initProperties()
    }
    n.$inject = ["$interval", "$log", "$rootScope", "RequestConfig", "Storage"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$interval", "$log", "$rootScope", "RequestConfig", "Storage"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = this;
        n.promises = [], n.pendingRequests = 0, n.successfulRequests = 0, n.failedRequests = 0, n.errorStatus = new Set, n.statusArray = [], n.statusChanged = !1, n.getPendingRequests = function() {
            return n.pendingRequests
        }, n.incPendingRequests = function() {
            n.pendingRequests++, e.$broadcast("pending-requests-changed", n.pendingRequests)
        }, n.decPendingRequests = function() {
            n.pendingRequests > 0 && (1 === n.pendingRequests && t.stop(), n.pendingRequests--), e.$broadcast("pending-requests-changed", n.pendingRequests)
        }, n.getSuccessfulRequests = function() {
            return n.successfulRequests
        }, n.incSuccessfulRequests = function() {
            n.successfulRequests++
        }, n.getFailedRequests = function() {
            return n.failedRequests
        }, n.incFailedRequests = function(e) {
            n.errorStatus.add(e), n.statusChanged = !0, n.failedRequests++
        }, n.getStatus = function() {
            if (0 === n.statusArray.length || n.statusChanged) {
                n.statusArray.length = 0;
                var e = !0,
                    t = !1,
                    r = void 0;
                try {
                    for (var o, a = n.errorStatus.values()[Symbol.iterator](); !(e = (o = a.next()).done); e = !0) {
                        var s = o.value;
                        n.statusArray.push(s)
                    }
                } catch (i) {
                    t = !0, r = i
                } finally {
                    try {
                        !e && a["return"] && a["return"]()
                    } finally {
                        if (t) throw r
                    }
                }
                n.statusChanged = !1
            }
            return n.statusArray
        }, n.clear = function() {
            n.pendingRequests = 0, n.successfulRequests = 0, n.failedRequests = 0, n.errorStatus.clear(), n.statusArray.length = 0;
            for (var t = 0; t < n.promises.length; t++) n.promises[t].reject([]);
            e.$broadcast("pending-requests-changed", n.pendingRequests)
        }
    }
    n.$inject = ["$rootScope", "StopWatch"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$rootScope", "StopWatch"], t["default"] = n
}, function(e, t) {
    "use strict";

    function n() {
        var e = this,
            t = void 0,
            n = void 0;
        e.getScale = function() {
            return t
        }, e.setScale = function(e) {
            t = e
        }, e.getTranslate = function() {
            return n
        }, e.setTranslate = function(e) {
            n = e
        }, e.reset = function() {
            t = 1, n = [0, 0]
        }, e.reset()
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = this,
            n = new Map,
            r = 0;
        t.addPromise = function(e) {
            var t = "promise" + r;
            return n.set(t, e), r++, t
        }, t.removePromise = function(e) {
            n["delete"](e)
        }, t.rejectAll = function() {
            var t = !0,
                r = !1,
                o = void 0;
            try {
                for (var a, s = n.values()[Symbol.iterator](); !(t = (a = s.next()).done); t = !0) {
                    var i = a.value;
                    i.resolve("canceled")
                }
            } catch (l) {
                r = !0, o = l
            } finally {
                try {
                    !t && s["return"] && s["return"]()
                } finally {
                    if (r) throw o
                }
            }
            n.clear(), e.warn("[Promises] Cleared all promises! Now holding " + n.size + " promises.")
        }, t.getSize = function() {
            return n.size
        }
    }
    n.$inject = ["$log"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$log"], t["default"] = n
}, function(e, t) {
    "use strict";
    function getFilter(){
        return new URLSearchParams(location.hash.substring(8)).get("filter");
    }
    function n() {
        var e = ["rdfs: <http://www.w3.org/2000/01/rdf-schema#>", "skos: <http://www.w3.org/2004/02/skos/core#>"],
            t = 10,
            n = 0,
            r = "en",
            o = function() {
                for (var t = "", n = 0; n < e.length; n++) t += "PREFIX ", t += e[n], t += " ";
                return t
            };
        this.getPrefixes = function() {
            return o()
        }, this.getClassQuery = function(e, r) {
            return e = "number" == typeof e && e > 0 ? e : t, r = "number" == typeof r && r >= 0 ? r : n, o()
                + `SELECT DISTINCT ?class (count(?sub) AS ?instanceCount)
                     WHERE { ?sub rdfs:subClassOf ?class
                   #        . FILTER(?class != owl:NamedIndividual).
                            . FILTER(
                                !regex( str(?class), "Reference|ExternalKnowledgeBase", "i")
                            )

                            .FILTER(
                                regex( str(?class), "${getFilter()}", "i")
                            )
                     }
                  GROUP BY ?class ORDER BY DESC(?instanceCount) `
                 + ("LIMIT " + e + " ") + ("OFFSET " + r)
        }, this.getLabelQuery = function(e, t) {
            return t = t || r, o() + "SELECT (SAMPLE (?lbl) AS ?label) WHERE { " + ("<" + e + "> rdfs:label ?lbl. ") + ("FILTER (langMatches(lang(?lbl), '" + t + "')) ") + "}"
        }, this.getPreferredLabelQuery = function(e, t) {
            return t = t || r, o() + "SELECT ?label WHERE { " + ("<" + e + "> skos:prefLabel ?label . ") + ("FILTER (langMatches(lang(?label), '" + t + "')) ") + "}"
        }, this.getInstanceReferringTypesQuery = function(e, n) {
            return n = "number" == typeof n && n > 0 ? n : t, o()
                + "SELECT (COUNT(?val) AS ?valCount) ?valType WHERE { "
                 + ("?instance a <" + e + "> . ")
                 + "?instance ?prop ?val . BIND (datatype(?val) AS ?valType) . }"
                 + " GROUP BY ?valType ORDER BY DESC(?valCount) LIMIT " + n
        }, this.getOrderedClassClassRelationQuery = function(e, t, n, r) {
            return o() + "SELECT (count(?originInstance) as ?count) ?prop WHERE { "
             + ("?originInstance a <" + e + "> . ")
             + ("?targetInstance a <" + t + "> . ")
             + "?originInstance ?prop ?targetInstance . }"
             + " GROUP BY ?prop ORDER BY DESC(?count) " + ("LIMIT " + n + " ") + ("OFFSET " + r)
        }, this.getUnorderedClassClassRelationQuery = function(e, t, n, r) {
            return o() + "SELECT DISTINCT ?prop WHERE { " + ("?originInstance a <" + e + "> . ") + ("?targetInstance a <" + t + "> . ") + "?originInstance ?prop ?targetInstance . } " + ("LIMIT " + n + " ") + ("OFFSET " + r + " ")
        }, this.getOrderedClassTypeRelationQuery = function(e, t) {
            var n = arguments.length <= 2 || void 0 === arguments[2] ? 5 : arguments[2],
                r = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
            return o() + "SELECT (count(?instance) AS ?count) ?prop WHERE { " + ("?instance a <" + e + "> . ") + "?instance ?prop ?val . " + ("FILTER (datatype(?val) = <" + t + ">) ") + "} GROUP BY ?prop ORDER BY DESC(?count) " + ("LIMIT " + n + " ") + ("OFFSET " + r)
        }, this.getUnorderedClassTypeRelationQuery = function(e, t) {
            var n = arguments.length <= 2 || void 0 === arguments[2] ? 5 : arguments[2],
                r = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
            return o() + "SELECT DISTINCT ?prop WHERE { " + ("?instance a <" + e + "> . ") + "?instance ?prop ?val . " + ("FILTER (datatype(?val) = <" + t + ">) ") + "} " + ("LIMIT " + n + " ") + ("OFFSET " + r)
        }, this.getNumberOfCommonInstancesQuery = function(e, t) {
            return o() + "SELECT (count(?commonInstance) AS ?commonInstanceCount) WHERE { " + ("?commonInstance a <" + e + ">. ") + ("?commonInstance a <" + t + ">. ") + "}"
        }, this.getCommentQuery = function(e) {
            return o() + "SELECT ?comment WHERE { " + ("<" + e + "> rdfs:comment ?comment . ") + "} LIMIT 1"
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = "http://vowl.visualdataweb.org/ldvowl/proxy.php",
            n = "endpoint",
            r = "proxy",
            o = "limit",
            a = "ordered",
            s = "lang",
            i = e.getItem(n) || "",
            l = e.getItem(r) || "false",
            u = 10,
            d = 3e4,
            c = "on",
            p = e.getItem(s) || "en",
            f = "application/sparql-results+json",
            g = !0,
            v = this;
        v.init = function() {
            e.setItem(n, i), e.setItem(r, l);
            var t = e.getItem(o);
            "undefined" != typeof t && null !== t ? u = parseInt(t) : e.setItem(o, u.toString());
            var s = e.getItem(a);
            if ("undefined" != typeof s && null !== t) g = "true" === s;
            else {
                var d = g ? "true" : "false";
                e.setItem(a, d)
            }
        }, v.getRequestURL = function() {
            return v.getUseProxy() ? t : v.getEndpointURL()
        }, v.getEndpointURL = function() {
            return i
        }, v.setEndpointURL = function(t) {
            i = t, e.setItem(n, t)
        }, v.getUseProxy = function() {
            return "true" === l
        }, v.setUseProxy = function(t) {
            var n = t ? "true" : "false";
            l = n, e.setItem(r, n)
        }, v.getLimit = function() {
            return u
        }, v.setLimit = function(t) {
            u = "number" == typeof t && t > 0 ? t : u, e.setItem(o, u.toString())
        }, v.getTimeout = function() {
            return d
        }, v.setTimeout = function(e) {
            "number" == typeof e && e > 0 && (d = e)
        }, v.getDebug = function() {
            return c
        }, v.getLabelLanguage = function() {
            return p
        }, v.setLabelLanguage = function(t) {
            p = t, e.setItem(s, t)
        }, v.getPropertiesOrdered = function() {
            return g
        }, v.setPropertiesOrdered = function(t) {
            g = t;
            var n = t ? "true" : "false";
            e.setItem(a, n)
        }, v.switchFormat = function() {
            f = "application/sparql-results+json" === f ? "json" : "application/sparql-results+json"
        }, v.forQuery = function(e, t) {
            var n = {};
            return n.params = {
                timeout: d,
                debug: c,
                format: f,
                query: e
            }, v.getUseProxy() && (n.params.endpoint = i), n.headers = {
                Accept: "application/sparql-results+json"
            }, n.timeout = t.promise, n
        }, v.init()
    }
    r.$inject = ["Storage"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.$inject = ["Storage"], t["default"] = r
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = /^.+\.(css|html|js|json)$/;
        this.request = function(e) {
            return void 0 === e || "string" != typeof e.url || e.url.match(n) || t.incPendingRequests(), e
        }, this.response = function(e) {
            return e.config.url.match(n) || (t.decPendingRequests(), t.incSuccessfulRequests()), e
        }, this.responseError = function(n) {
            return t.decPendingRequests(), void 0 !== n.status && t.incFailedRequests(n.status), e.reject(n)
        }
    }
    n.$inject = ["$q", "Requests"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$q", "Requests"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(87),
        i = r(s),
        l = n(86),
        u = r(l),
        d = n(88),
        c = r(d),
        p = n(85),
        f = r(p);
    t["default"] = a["default"].module("services.requests", []).service("RequestConfig", i["default"]).service("QueryFactory", u["default"]).service("RequestCounter", c["default"]).service("Promises", f["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(73),
        i = r(s),
        l = n(79),
        u = r(l),
        d = n(89),
        c = r(d),
        p = n(95),
        f = r(p),
        g = n(76),
        v = r(g),
        m = n(91),
        h = r(m),
        y = n(69),
        b = r(y);
    t["default"] = a["default"].module("services", [i["default"].name, u["default"].name, c["default"].name, f["default"].name]).service("Endpoints", b["default"]).service("Links", v["default"]).service("Storage", h["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = this;
        t.useSessionStorage = !1, t.getItem = function(n) {
            var r = t.useSessionStorage ? sessionStorage : localStorage;
            if (void 0 !== r) return r.getItem(n);
            var o = t.useSessionStorage ? "SessionStorage" : "LocalStorage";
            return void e.error("[Storage] Unable to get data for '" + n + "', " + o + " is unavailable!")
        }, t.setItem = function(n, r) {
            var o = t.useSessionStorage ? sessionStorage : localStorage;
            if (void 0 !== o) o.setItem(n, r);
            else {
                var a = t.useSessionStorage ? "SessionStorage" : "LocalStorage";
                e.error("[Storage] Unable to store data for '" + n + "', " + a + " is unavailable!")
            }
        }
    }
    r.$inject = ["$log"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = r, r.$inject = ["$log"]
}, function(e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        o = function() {
            function e(t) {
                n(this, e), this.graphUtils = t, this.defaultPropHeight = 20, this.ringWidth = 4
            }
            return e.$inject = ["GraphUtils"], r(e, [{
                key: "getCircleOutlinePoint",
                value: function(e) {
                    var t = e.target.x - e.intermediate.x,
                        n = e.target.y - e.intermediate.y,
                        r = Math.sqrt(t * t + n * n),
                        o = e.target.radius,
                        a = t * o / r,
                        s = n * o / r;
                    return {
                        x: e.target.x - a,
                        y: e.target.y - s
                    }
                }
            }, {
                key: "getAnotherCircleOutlinePoint",
                value: function(e, t) {
                    var n = e.intermediate.x - e.source.x,
                        r = e.intermediate.y - e.source.y,
                        o = Math.atan2(r, n),
                        a = t * (Math.PI / 6),
                        s = o + a,
                        i = e.target.radius,
                        l = e.target.x + i * Math.cos(s),
                        u = e.target.y + i * Math.sin(s);
                    return {
                        x: l,
                        y: u
                    }
                }
            }, {
                key: "getRectOutlinePoint",
                value: function(e) {
                    var t = void 0 !== e.intermediate ? e.intermediate : e.source,
                        n = (e.target.y - t.y) / (e.target.x - t.x),
                        r = this.graphUtils.calcPropBoxWidth(e.target),
                        o = e.target.x - r / 2,
                        a = e.target.x + r / 2,
                        s = e.target.y - this.defaultPropHeight / 2,
                        i = e.target.y + this.defaultPropHeight / 2;
                    if (t.x < e.target.x) {
                        var l = n * (o - t.x) + t.y;
                        if (s < l && l < i) return {
                            x: o,
                            y: l
                        }
                    }
                    if (t.x >= e.target.x) {
                        var u = n * (a - t.x) + t.y;
                        if (s < u && u < i) return {
                            x: a,
                            y: u
                        }
                    }
                    if (t.y < e.target.y) {
                        var d = (s - t.y) / n + t.x;
                        if (o < d && d < a) return {
                            x: d,
                            y: s
                        }
                    }
                    if (t.y >= e.target.y) {
                        var c = (i - t.y) / n + t.x;
                        if (o < c && c < a) return {
                            x: c,
                            y: i
                        }
                    }
                }
            }]), e
        }();
    t["default"] = o
}, function(e, t) {
    "use strict";

    function n() {
        var e = this,
            t = [],
            n = 15;
        e.labelFromURI = function(e) {
            var t = "";
            if (void 0 !== e && "" !== e) {
                var n = e.lastIndexOf("/"),
                    r = e.lastIndexOf("#");
                t = e.substr(Math.max(n, r) + 1).replace(/\_/g, " ")
            }
            return t
        }, e.getName = function(t, r, o) {
            var a = "";
            return o = void 0 !== o && o, a = void 0 !== t.name && "" !== t.name ? t.name : e.labelFromURI(t.uri), o && a.length > n && (a = a.substr(0, n - 2) + "..."), r && void 0 !== t.value && t.value > 1 && (a += " [" + t.value + "]"), a
        }, e.getNameForSpace = function(t, n) {
            var r = "";
            r = void 0 !== t && void 0 !== t.name && t.name.length > 0 ? t.name : e.labelFromURI(t.uri);
            var o = Math.floor(n / 7);
            return o < r.length && (r = r.substr(0, o - 3) + "..."), r
        }, e.getArrowHeads = function() {
            if (0 === t.length)
                for (var e = 1; e <= 5; e++) t.push({
                    id: "Arrow" + e,
                    "class": "arrow",
                    size: 10 - e
                }), t.push({
                    id: "hoveredArrow" + e,
                    "class": "hovered",
                    size: 10 - e
                }), t.push({
                    id: "subclassArrow" + e,
                    "class": "subclass",
                    size: 10 - e
                });
            return t
        }, e.calcPropBoxWidth = function(e) {
            return 8 * this.getName(e, !0, !0).length
        }, e.calcPropBoxOffset = function(e) {
            return -1 * (this.calcPropBoxWidth(e) / 2)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = n
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = this;
        t.round = 1, t.lastStart = null, t.deltas = [], t.start = function() {
            t.lastStart = new Date, t.round = 1, e.warn("[Stop Watch] Started!")
        }, t.stop = function() {
            if (null !== t.lastStart) {
                var n = new Date,
                    r = (n.getTime() - t.lastStart.getTime()) / 1e3;
                e.warn("[Stop Watch] Round " + t.round + ": " + r + " seconds."), t.round++, t.deltas.push(r)
            } else e.warn("[Stop Watch] has not been started!")
        }
    }
    n.$inject = ["$log"], Object.defineProperty(t, "__esModule", {
        value: !0
    }), n.$inject = ["$log"], t["default"] = n
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(93),
        i = r(s),
        l = n(92),
        u = r(l),
        d = n(94),
        c = r(d);
    t["default"] = a["default"].module("services.utils", []).service("GraphUtils", i["default"]).service("Geometry", u["default"]).service("StopWatch", c["default"])
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function o(e) {
        function t(e) {
            var t = e;
            return t.allSettled = function(e) {
                var n = s["default"].isArray(e) ? e.slice(0) : {};
                return s["default"].forEach(e, function(e, t) {
                    n[t] = e.then(function(e) {
                        return {
                            state: "fulfilled",
                            value: e
                        }
                    }, function(e) {
                        return {
                            state: "rejected",
                            reason: e
                        }
                    })
                }), t.all(n)
            }, t
        }
        t.$inject = ["$delegate"], e.decorator("$q", t), t.$inject = ["$delegate"]
    }
    o.$inject = ["$provide"], Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = n(1),
        s = r(a);
    o.$inject = ["$provide"], t["default"] = s["default"].module("qAllSettled", []).config(o)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1),
        a = r(o),
        s = n(96),
        i = r(s);
    t["default"] = a["default"].module("utilities", [i["default"].name])
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<div class="container"> <h2>LD-VOWL</h2> <p> More information about LD-VOWL and a public demo is available at\n<a href="http://ldvowl.visualdataweb.org/" target="_blank">VisualDataWeb.org</a>. </p> <p> The source code of LD-VOWL is publicly available on\n<a href="https://github.com/VisualDataWeb/LD-VOWL" target="_blank">GitHub</a>. </p> <h3>License</h3> <b>The MIT License (MIT)</b> <p> Copyright (c) 2015-2016 Marc Weise, Steffen Lohmann, Florian Haag <br/> </p> <p> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <br/> </p> <p> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. <br/> </p> <p> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. </p> </div>';
    n.run(["$templateCache", function(e) {
        e.put("components/about/about.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = ' <div class="container-fluid"> <div class="row">  <div class="col-sm-9 col-md-10 main"> <div id="graph" node-link-graph margin="10" on-click="vm.onClick(item)"> </div> </div>  <div class="col-sm-3 col-md-2 sidebar"> <uib-accordion> <uib-accordion-group is-open="vm.showSelection"> <uib-accordion-heading> <span class="glyphicon glyphicon-screenshot" aria-hidden="true"></span> Selection </uib-accordion-heading> <selection-group selected-item="vm.selected"></selection-group> </uib-accordion-group> <uib-accordion-group is-open="false"> <uib-accordion-heading> <span class="glyphicon glyphicon-filter" aria-hidden="true"></span> Filters </uib-accordion-heading> <filter-group></filter-group> </uib-accordion-group> <uib-accordion-group> <uib-accordion-heading> <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Graph </uib-accordion-heading> <graph-settings-group></graph-settings-group> </uib-accordion-group> <uib-accordion-group> <uib-accordion-heading> <span class="glyphicon glyphicon-list" aria-hidden="true"></span> Namespaces </uib-accordion-heading> <namespace-group></namespace-group> </uib-accordion-group> <uib-accordion-group is-open="true"> <uib-accordion-heading> <span class="glyphicon glyphicon-transfer" aria-hidden="true"></span> Endpoint </uib-accordion-heading> <endpoint-group restart="vm.restartLoading()" stop="vm.stopLoading()"></endpoint-group> </uib-accordion-group> </uib-accordion> </div> </div> </div>';
    n.run(["$templateCache", function(e) {
        e.put("components/graph/graph.html", a)
    }]), e.exports = a
}, function(e, t, n) {
    var r, o = window.angular;
    try {
        r = o.module(["ng"])
    } catch (a) {
        r = o.module("ng", [])
    }
    var s = '<div class="navbar navbar-inverse" role="navigation"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse" ng-click="header.toggleCollapse()"> <span class="sr-only">Toggle navigation</span>\n<span class="icon-bar"></span>\n<span class="icon-bar"></span>\n<span class="icon-bar"></span> </button>\n<a href="#/" class="pull-left"> <img class="logo" alt="Icon" src="' + n(19) + '" height="20" width="20"> </a>\n<a class="navbar-brand app-name" id="toStart" href="#/"> LD-VOWL\n<small>V{{::header.appVersion}}</small> </a> </div> <div class="navbar-collapse" id="js-navbar-collapse" ng-class="{collapse: header.collapse}"> <ul class="nav navbar-nav"> <li ng-class="{ active: header.isActive(\'/graph\') }"> <a ng-href="#/graph"> <span ng-show="header.loading" class="glyphicon glyphicon-refresh glyphicon-spin"></span>\nGraph </a> </li> <li ng-class="{ active: header.isActive(\'/settings\') }"> <a ng-href="#/settings" id="toSettings"> <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>\nSettings </a> </li> <li ng-class="{ active: header.isActive(\'/about\') }"> <a ng-href="#/about"> <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>\nAbout </a> </li> </ul> </div> </div> </div>';
    r.run(["$templateCache", function(e) {
        e.put("components/header/header.html", s)
    }]), e.exports = s
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<div class="container"> <h2>Retrieval Options</h2> <form name="extractionForm" class="form-horizontal well" role="form" novalidate> <div class="form-group" ng-class="{ \'has-error\' : extractionForm.limit.$invalid && !extractionForm.limit.$pristine }"> <label class="control-label col-sm-3" for="lang">Language of Labels</label> <div class="col-sm-4"> <select class="form-control" name="lang" id="lang" ng-model="vm.currentLanguage" ng-options="language.id as language.name for language in vm.availableLanguages"> </select> </div> <label for="limit" class="col-sm-2 control-label">Number of Classes</label> <div class="col-sm-3"> <input class="form-control" name="limit" id="limit" type="number" ng-model="vm.currentLimit" min="1" required/> <p ng-show="extractionForm.limit.$invalid && !extractionForm.limit.$pristine" class="help-block"> must be greater 0! </p> </div> </div> <div class="form-group"> <div class="col-lg-offset-3 col-sm-10"> <div class="checkbox"> <label> <input type="checkbox" name="ordered" ng-model="vm.propsOrdered">\nretrieve properties in descending order of their usage frequency </label> </div> </div> </div> <div class="form-group"> <div class="col-sm-12"> <div class="pull-right"> <button type="button" class="btn btn-primary" ng-click="vm.saveExtractionSettings(); extractionForm.$setPristine()" ng-disabled="!(extractionForm.lang.$dirty || extractionForm.limit.$dirty\n                                || extractionForm.ordered.$dirty) || extractionForm.$invalid"> <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>\nSave </button> </div> </div> </div> </form> <h2>Blacklists</h2> <form name="lists" class="form-horizontal well" role="form" novalidate> <div class="form-group"> <label class="control-label col-sm-3"> Predefined Lists </label> <div class="col-sm-2"> <div class="checkbox"> <label> <input type="checkbox" name="rdf" ng-model="vm.enabled.RDF" ng-change="vm.restoreListDefaults(); bl.$setPristine()">\nRDF </label> </div> </div> <div class="col-sm-2"> <div class="checkbox"> <label> <input type="checkbox" name="rdfs" ng-model="vm.enabled.RDFS" ng-change="vm.restoreListDefaults(); bl.$setPristine()">\nRDFS </label> </div> </div> <div class="col-sm-2"> <div class="checkbox"> <label> <input type="checkbox" name="owl" ng-model="vm.enabled.OWL" ng-change="vm.restoreListDefaults(); bl.$setPristine()">\nOWL </label> </div> </div> <div class="col-sm-2"> <div class="checkbox"> <label> <input type="checkbox" name="skos" ng-model="vm.enabled.SKOS" ng-change="vm.restoreListDefaults(); bl.$setPristine()">\nSKOS </label> </div> </div> </div> <div class="form-group" style="margin-bottom: 0"> <div class="col-sm-offset-3 col-sm-9"> <uib-alert type="warning" style="margin-bottom: 0"> <span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>\nAny manual changes below will be overwritten! </uib-alert> </div> </div> </form> <form class="form-horizontal well" name="bl" role="form" novalidate> <div class="form-group"> <label for="classBlacklist" class="control-label col-sm-3">Classes</label> <div class="col-sm-9"> <textarea class="form-control" id="classBlacklist" name="clazz" rows="6" ng-model="vm.classBlacklistInput">\n        </textarea> </div> </div> <div class="form-group"> <label class="control-label col-sm-3" for="propBlacklist">Properties</label> <div class="col-sm-9"> <textarea class="form-control" id="propBlacklist" name="prop" rows="6" ng-model="vm.propertyBlacklistInput">\n        </textarea> </div> </div> <div class="form-group"> <div class="col-sm-12"> <div class="pull-right"> <button type="button" class="btn btn-default" ng-click="vm.restoreDefaults(); bl.$setPristine(); lists.$setPristine()" ng-disabled="bl.clazz.$pristine && bl.prop.$pristine && vm.enabled.RDF && vm.enabled.RDFS &&\n                                vm.enabled.OWL && !vm.enabled.SKOS"> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\nRestore Defaults </button>\n<button type="button" class="btn btn-primary" ng-click="vm.saveBlacklists(); bl.$setPristine(); lists.$setPristine()" ng-disabled="!(lists.rdf.$dirty || lists.rdfs.$dirty || lists.owl.$dirty || lists.skos.$dirty ||\n                                bl.clazz.$dirty || bl.prop.$dirty) || bl.$invalid"> <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>\nSave </button> </div> </div> </div> </form> </div>';
    n.run(["$templateCache", function(e) {
        e.put("components/settings/settings.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<div> <p ng-if="vm.showEndpointUrl"> <strong> <span class="glyphicon glyphicon-link" aria-hidden="true"></span>\nURL: </strong>\n<span ng-if="vm.endpointURL.length === 0">None</span>\n<a href="{{vm.endpointURL}}" target="_blank">{{vm.endpointURL}}</a> </p> <p> <span class="glyphicon glyphicon-refresh" ng-class="{\'glyphicon-spin\': vm.pendingRequests > 0}"></span>\n<strong>Pending Requests:</strong>\n<span ng-if="vm.pendingRequests !== 0"> {{vm.pendingRequests | number}} </span>\n<span ng-if="vm.pendingRequests === 0">None</span> </p> <p> <strong> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>\nSuccessful Requests: </strong>\n<span ng-if="vm.successfulRequests !== 0">{{vm.successfulRequests | number}}</span>\n<span ng-if="vm.successfulRequests === 0">None</span> </p> <p ng-if="vm.failedRequests > 0"> <strong> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\nFailed Requests: </strong>\n<span ng-if="vm.failedRequests !== 0">{{vm.failedRequests | number}}</span>\n<span>(Status: {{vm.errorStatus.join(\', \')}})</span>\n<span ng-if="vm.failedRequests === 0">None</span> </p> <div class="text-center" ng-if="vm.endpointURL.length > 0"> <button type="button" class="btn btn-warning" ng-click="vm.restart()" ng-show="vm.pendingRequests === 0"> <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>\nReload </button>\n<button type="button" class="btn btn-danger" ng-click="vm.stop()" ng-if="vm.pendingRequests !== 0"> <span class="glyphicon glyphicon-stop" aria-hidden="true"></span>\nStop </button> </div> </div>';
    n.run(["$templateCache", function(e) {
        e.put("groups/endpoint-group/endpoint-group.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<form class="form-horizontal"> <div class="checkbox"> <label for="showDataTypes"> <input id="showDataTypes" type="checkbox" ng-model="vm.filterDataTypes" ng-change="vm.toggleDataTypes()">\ndatatypes </label> </div> <div class="checkbox"> <label for="includeLoops"> <input id="includeLoops" type="checkbox" ng-model="vm.filterLoops" ng-change="vm.toggleLoops()">\nproperty loops </label> </div> <div class="checkbox"> <label for="includeSubclassRelations"> <input id="includeSubclassRelations" type="checkbox" ng-model="vm.filterSubclassRelations" ng-change="vm.toggleSubclassRelations()">\nsubclass relations </label> </div> <div class="checkbox"> <label for="includeDisjointNode"> <input id="includeDisjointNode" type="checkbox" ng-model="vm.filterDisjointNodes" ng-change="vm.toggleDisjointNode()">\nclass disjointness </label> </div> </form>';
    n.run(["$templateCache", function(e) {
        e.put("groups/filter-group/filter-group.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<div> <p><strong>External Elements</strong></p> <div class="checkbox"> <label for="differentExternalColors"> <input id="differentExternalColors" type="checkbox" ng-model="graphSettings.differentColors" ng-change="graphSettings.toggleDifferentColors()">\nuse different colors </label> </div> <p> <label for="ccEdgeLength">Class - Class Distance: {{ graphSettings.ccEdgeLength }}</label> <input id="ccEdgeLength" type="range" min="1" max="300" ng-model="graphSettings.ccEdgeLength" ng-change="graphSettings.updateClassToClassLength()"/> </p> <p> <label for="ctEdgeLength">Class - Type Distance: {{ graphSettings.ctEdgeLength }}</label> <input id="ctEdgeLength" type="range" min="1" max="150" ng-model="graphSettings.ctEdgeLength" ng-change="graphSettings.updateClassToDatatypeLength()"/> </p> <p><strong>Layout</strong></p> <div class="text-center"> <button type="button" class="btn btn-default" ng-click="graphSettings.toggleLayout()"> <span class="glyphicon" ng-class="(graphSettings.layoutPaused) ? \'glyphicon-play\' : \'glyphicon-pause\'" aria-hidden="true"> </span>\n<span ng-if="!graphSettings.layoutPaused">Pause</span>\n<span ng-if="graphSettings.layoutPaused">Resume</span> </button> </div> </div>';
    n.run(["$templateCache", function(e) {
        e.put("groups/graph-settings-group/graph-settings-group.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<div> <p ng-if="vm.prefixes.length === 0"> No prefixes found. </p> <p ng-if="vm.prefixes.length > 0"> <strong>Class Prefixes</strong>\n<strong ng-if="vm.numberOfPrefixes < vm.prefixes.length"> ({{ vm.numberOfPrefixes}} of {{ vm.prefixes.length }}) </strong>\n<strong ng-if="vm.numberOfPrefixes >= vm.prefixes.length"> ({{ vm.prefixes.length }}): </strong> </p> <div class="prop-list" ng-if="vm.prefixes.length > 0"> <table class="table table-condensed"> <tr ng-repeat="pre in vm.prefixes | limitTo: vm.numberOfPrefixes"> <td> <button type="button" class="btn btn-default btn-xs" ng-model="pre.classification" uib-btn-checkbox btn-checkbox-true="\'intern\'" btn-checkbox-false="\'extern\'" ng-click="vm.updatePrefixes()"> internal </button> </td> <td class="prefix-table" style="max-width: 150px; word-wrap: break-word"> <a href="{{pre.prefix}}" target="_blank">{{pre.prefix | httpLess}}</a> </td> <td class="prefix-table"> {{pre.value}} </td> </tr> </table> <button ng-hide="vm.prefixes.length <= vm.numberOfPrefixes" type="button" class="btn btn-link" ng-click="vm.incNumberOfPrefixes()"> show more ... </button> </div> </div>';
    n.run(["$templateCache", function(e) {
        e.put("groups/namespace-group/namespace-group.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = "<div> <no-selection></no-selection> <class-selection></class-selection> <type-selection></type-selection> <prop-selection></prop-selection> <datatype-prop-selection></datatype-prop-selection> <subclass-prop-selection></subclass-prop-selection> </div>";
    n.run(["$templateCache", function(e) {
        e.put("groups/selection-group/selection-group.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = ' <div ng-if="vm.selected !== undefined && vm.selected.type === \'class\'"> <p> <strong>Type:</strong> {{ vm.selected.type }} </p> <p> <strong>URI:</strong>\n<a href="{{vm.selected.uri}}" target="_blank"> {{ vm.selected.uri }}\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p ng-if="vm.selected.name !== \'\'"> <strong>Label:</strong> {{vm.selected.name}} </p>  <p ng-if="vm.selected.equivalentURIs !== undefined && vm.selected.equivalentURIs.length === 1"> <strong>Equivalent Class:</strong>\n<a href="{{vm.selected.equivalentURIs[0]}}" target="_blank"> {{vm.selected.equivalentURIs[0] | uriLabel}}\n<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> </a> </p>  <div ng-if="vm.selected.equivalentURIs !== undefined && vm.selected.equivalentURIs.length > 1"> <p> <strong>Equivalent Classes:</strong> </p> <ul> <li ng-repeat="equivURI in vm.selected.equivalentURIs | limitTo: vm.numberOfProps"> <a href="{{equiv}}" target="_blank"> {{equivURI | uriLabel}}\n<span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> </a> </li> </ul> <button ng-if="vm.selected.equivalentURIs.length >= vm.numberOfProps" type="button" class="btn btn-link" ng-click="vm.incNumberOfProps()"> show more ... </button> </div> <p> <strong># Instances:</strong>\n{{vm.selected.value | number}} </p> <p ng-hide="vm.selected.comment === undefined" class="comment"> <strong>Comment:</strong>\n<span>{{ vm.selected.comment }}</span> </p> </div>';
    n.run(["$templateCache", function(e) {
        e.put("sidebar/selection/class-selection.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = ' <div ng-if="vm.selected !== undefined && vm.selected.type === \'datatypeProperty\'"> <p> <strong>Type:</strong> datatype property </p> <p ng-if="vm.selected.props.length === 1"> <strong>URI:</strong>\n<a href="{{vm.selected.props[0].uri}}" target="_blank"> {{vm.selected.props[0].uri}}\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong>From instances of:</strong>\n<a href="{{vm.selected.sourceURI}}" target="_blank"> {{vm.selected.sourceName}}\n<span ng-if="vm.selected.sourceName.length === 0"> {{vm.selected.sourceURI | uriLabel}} </span>\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong>To:</strong>\n<a href="{{vm.selected.targetURI}}" target="_blank"> {{vm.selected.targetURI | uriLabel}}\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong ng-if="vm.selected.props.length > 1 && vm.selected.props.length <= vm.numberOfProps"> Properties ({{vm.selected.props.length}}): </strong>\n<strong ng-if="vm.selected.props.length > vm.numberOfProps"> Properties ({{vm.numberOfProps}} of {{vm.selected.props.length}}): </strong> </p> <div ng-if="vm.selected.props.length > 1" class="prop-list" style="max-height: 80px">  <ul class="properties" ng-if="!vm.selected.ordered"> <li ng-repeat="p in vm.selected.props | limitTo: vm.numberOfProps"> <a href="{{p.uri}}" target="_blank"> {{p.uri | uriLabel}}\n<span class="glyphicon glyphicon-new-window"></span> </a> </li> </ul>  <ol class="properties" ng-if="vm.selected.ordered"> <li ng-repeat="p in vm.selected.props | limitTo: vm.numberOfProps"> <a href="{{p.uri}}" target="_blank"> {{p.uri | uriLabel}}\n<span class="glyphicon glyphicon-new-window"></span> </a>\n({{p.value | number}}) </li> </ol> <button ng-if="vm.selected.props.length > vm.numberOfProps" type="button" class="btn btn-link" ng-click="vm.incNumberOfProps()"> show more ... </button> </div> </div>';
    n.run(["$templateCache", function(e) {
        e.put("sidebar/selection/datatype-prop-selection.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = "<p ng-if=\"vm.selected.type === ''\"> Select a class, datatype or property to see more details. </p>";
    n.run(["$templateCache", function(e) {
        e.put("sidebar/selection/no-selection.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = ' <div ng-if="vm.selected !== undefined && vm.selected.type === \'property\'"> <p> <strong>Type:</strong> {{vm.selected.type}} </p> <p ng-if="vm.selected.props.length === 1"> <strong>URI:</strong>\n<a href="{{vm.selected.props[0].uri}}" target="_blank"> {{vm.selected.props[0].uri}}\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong>From instances of:</strong>\n<a href="{{vm.selected.sourceURI}}" target="_blank"> {{vm.selected.sourceName}}\n<span ng-if="vm.selected.sourceName.length === 0"> {{vm.selected.sourceURI | uriLabel }} </span>\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong>To instances of:</strong>\n<a href="{{vm.selected.targetURI}}" target="_blank"> {{vm.selected.targetName}}\n<span ng-if="vm.selected.targetName.length === 0"> {{vm.selected.targetURI | uriLabel }} </span>\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong ng-if="vm.selected.props.length > 1 && vm.selected.props.length <= vm.numberOfProps"> Properties ({{vm.selected.props.length}}): </strong>\n<strong ng-if="vm.selected.props.length > vm.numberOfProps"> Properties ({{vm.numberOfProps}} of {{vm.selected.props.length}}): </strong> </p> <div ng-if="vm.selected.props.length > 1" class="prop-list">  <ul class="properties" ng-if="!vm.selected.ordered"> <li ng-repeat="p in vm.selected.props | limitTo: vm.numberOfProps"> <a href="{{p.uri}}" target="_blank"> {{p.uri | uriLabel}}\n<span class="glyphicon glyphicon-new-window"></span> </a> </li> </ul>  <ol class="properties" ng-if="vm.selected.ordered"> <li ng-repeat="p in vm.selected.props | limitTo: vm.numberOfProps"> <a href="{{p.uri}}" target="_blank"> {{p.uri | uriLabel}}\n<span class="glyphicon glyphicon-new-window"></span> </a>\n({{p.value | number}}) </li> </ol> <button ng-if="vm.selected.props.length > vm.numberOfProps" type="button" class="btn btn-link" ng-click="vm.incNumberOfProps()"> show more ... </button> </div>  <div ng-if="vm.selected.props.length === 1"> <p> <strong># Domain Instances:</strong> {{vm.selected.props[0].value | number}} </p> </div> <p ng-if="vm.selected.comment !== undefined"> <strong>Comment:</strong>\n<span>{{ vm.selected.comment }}</span> </p> </div>';
    n.run(["$templateCache", function(e) {
        e.put("sidebar/selection/prop-selection.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = ' <div ng-if="vm.selected !== undefined && vm.selected.type === \'subClassProperty\'"> <p> <strong>Type:</strong>\nsubclass relation </p> <p> <strong>Parent Class:</strong>\n<a href="{{vm.selected.targetURI}}" target="_blank"> {{vm.selected.targetName}}\n<span ng-if="vm.selected.targetName.length === 0"> {{vm.selected.targetURI | uriLabel }} </span>\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p> <strong>Child Class:</strong>\n<a href="{{vm.selected.sourceURI}}" target="_blank"> {{vm.selected.sourceName}}\n<span ng-if="vm.selected.sourceName.length === 0"> {{vm.selected.sourceURI | uriLabel }} </span>\n<span class="glyphicon glyphicon-new-window"></span> </a> </p> <p ng-if="vm.selected.commonCount !== undefined"> <strong>Common Instances:</strong>\n{{vm.selected.commonCount | number}} </p> </div>';
    n.run(["$templateCache", function(e) {
        e.put("sidebar/selection/subclass-prop-selection.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = ' <div ng-if="vm.selected !== undefined && vm.selected.type === \'type\'"> <p> <strong>Type:</strong>\nDatatype </p> <p> <strong>Label:</strong>\n{{vm.selected.uri | uriLabel}} </p> <p> <strong>URI:</strong>\n<a href="{{vm.selected.uri}}" target="_blank">{{vm.selected.uri}}</a> </p> </div>';
    n.run(["$templateCache", function(e) {
        e.put("sidebar/selection/type-selection.html", a)
    }]), e.exports = a
}, function(e, t) {
    var n, r = window.angular;
    try {
        n = r.module(["ng"])
    } catch (o) {
        n = r.module("ng", [])
    }
    var a = '<div class="container"> <div class="jumbotron"> <h1>LD-VOWL</h1> <p> Extract ontology information from SPARQL endpoints and display the extracted information in an overview visualization using the\n<a href="http://vowl.visualdataweb.org/v2/" target="_blank"> VOWL Notation </a>\n(with minor modifications). </p> </div> <div class="well"> <form class="form-horizontal" autocomplete="off" name="endpointForm"> <div class="form-group"> <label class="control-label col-sm-2" for="endpoint">Endpoint</label> <div class="col-sm-7"> <input name="url" id="endpoint" ng-model="start.endpoint" type="url" class="form-control" title="SPARQL endpoint URL" required uib-typeahead="endpoint for endpoint in start.endpoints | filter:$viewValue | limitTo:8" ng-minlength="7" typeahead-min-length="0" placeholder="Type in an URL or select one from the list"/> </div> <div class="col-sm-3"> <button type="button" class="btn btn-primary" id="showGraph" ng-click="start.showGraph()" ng-disabled="endpointForm.$invalid"> Visualize &raquo; </button> </div> </div> <div class="form-group" ng-if="start.endpointAlert"> <div class="col-sm-offset-2 col-sm-7"> <uib-alert type="info" close="start.closeEndpointAlert()" style="margin-bottom: 0"> <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>\nA list of endpoints can be found\n<a class="alert-link" href="http://sparqles.ai.wu.ac.at/availability" target="_blank">here</a>.<br/> <small>Endpoint requirements: 1) speaks SPARQL, 2) returns JSON.</small> </uib-alert> </div> </div> </form> </div> </div>';
    n.run(["$templateCache", function(e) {
        e.put("components/start/start.html", a)
    }]), e.exports = a
}]);
