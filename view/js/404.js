
text = "404";
midColor = [21, 143, 97];
sideColor = [50, 0, 90];

midColor = [Math.random()*(100), Math.random()*(255), Math.random()*(255)];
sideColor = [Math.random()*(255), Math.random()*(255), Math.random()*(100)]

! function e(t, n, i) {
    function o(r, a) {
        if (!n[r]) {
            if (!t[r]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(r, !0);
                if (s) return s(r, !0);
                var d = new Error("Cannot find module '" + r + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var c = n[r] = {
                exports: {}
            };
            t[r][0].call(c.exports, function(e) {
                var n = t[r][1][e];
                return o(n ? n : e)
            }, c, c.exports, e, t, n, i)
        }
        return n[r].exports
    }
    for (var s = "function" == typeof require && require, r = 0; r < i.length; r++) o(i[r]);
    return o
}({
    1: [
        function(e) {
            e("../libs/Stats.js"), e("../libs/dat.gui.js"), e("../libs/Tween.js"), e("../404/colors.js"), e("../404/shell.js"), e("../404/mask_related.js"), e("../404/meat.js"), e("../pages/404.js")
        }, {
            "../404/colors.js": 2,
            "../404/mask_related.js": 3,
            "../404/meat.js": 4,
            "../404/shell.js": 5,
            "../libs/Stats.js": 6,
            "../libs/Tween.js": 7,
            "../libs/dat.gui.js": 8,
            "../pages/404.js": 9
        }
    ],
    2: [
        function() {
            window.hex2rgb = function(e) {
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return t ? {
                    r: parseInt(t[1], 16),
                    g: parseInt(t[2], 16),
                    b: parseInt(t[3], 16)
                } : null
            }, window.rgb2hsv = function() {
                var e, t, n, i, o, s = arguments[0] / 255,
                    r = arguments[1] / 255,
                    a = arguments[2] / 255,
                    l = Math.max(s, r, a),
                    d = l - Math.min(s, r, a),
                    c = function(e) {
                        return (l - e) / 6 / d + .5
                    };
                return 0 == d ? i = o = 0 : (o = d / l, e = c(s), t = c(r), n = c(a), s === l ? i = n - t : r === l ? i = 1 / 3 + e - n : a === l && (i = 2 / 3 + t - e), 0 > i ? i += 1 : i > 1 && (i -= 1)), {
                    h: Math.round(360 * i),
                    s: Math.round(100 * o),
                    v: Math.round(100 * l)
                }
            }, window.colorFromArr = function(e) {
                return [e.r, e.g, e.b]
            }
        }, {}
    ],
    3: [
        function() {
            particlesMaskFn = function() {
                this.initParticlesFromMask = function(e, t) {
                    var n = this,
                        i = THREE.ImageUtils.loadTexture(e).image;
                    i.onload = function() {
                        var e = document.createElement("canvas");
                        e.width = i.width, e.height = i.height;
                        var o = e.getContext("2d");
                        o.drawImage(i, 0, 0);
                        var s = o.getImageData(0, 0, i.width, i.height);
                        n.initParticlesFromImageData(s, t)
                    }
                }, this.initParticlesFromString = function(e, t) {
                    var n = document.createElement("canvas");
                    n.width = 1, n.height = textSize;
                    var i = textSize + "px arial",
                        o = n.getContext("2d");
                    o.font = i, n.width = o.measureText(e).width, o.font = i, o.textBaseline = "bottom", o.fillText(e, 0, textSize);
                    var s = o.getImageData(0, 0, n.width, n.height);
                    this.initParticlesFromImageData(s, t)
                }, this.initParticlesFromImageData = function(e, t) {
                    mask.data = [], mask.w = e.width, mask.h = e.height, mask.dim.max = Math.max(mask.w, mask.h), mask.dim.halfCell = 2 * shell404.maxRadius / mask.dim.max / 2, mask.dim.halfDelta.w = (mask.dim.max - mask.w) / 2, mask.dim.halfDelta.h = (mask.dim.max - mask.h) / 2;
                    for (var n, i = 0; i < mask.w; i++)
                        for (var o = 0; o < mask.h; o++) n = i + mask.w * o, mask.data[n] = e.data[4 * n + 3];
                    this.alignToMask(t)
                }, this.alignToMask = function(e) {
                    for (var t = 0; t < e.count; t++) this.setParticleToRandomUnmaskedPixel(e.plainArray[t]), resetParticle(e.plainArray[t])
                }, this.setParticleToRandomUnmaskedPixel = function(e) {
                    var t;
                    do t = Math.floor(Math.random() * mask.data.length); while (255 * Math.random() > mask.data[t]);
                    var n = Math.floor(t / mask.w),
                        i = t % mask.w;
                    e.initial.x = (i + mask.dim.halfDelta.w + .5) / mask.dim.max * 2 - 1, e.initial.x *= shell404.maxRadius, e.initial.x += shell404.range(-mask.dim.halfCell, mask.dim.halfCell), e.initial.z = (n + mask.dim.halfDelta.h + .5) / mask.dim.max * 2 - 1, e.initial.z *= shell404.maxRadius, e.initial.z += shell404.range(-mask.dim.halfCell, mask.dim.halfCell)
                }
            }, window.particlesMask = new particlesMaskFn
        }, {}
    ],
    4: [
        function() {
            function e() {
                function e(e) {
                    return function(t) {
                        c.hsv[e] = rgb2hsv(t[0], t[1], t[2]), c.hsv[e].h /= 360, c.hsv[e].s /= 100, c.hsv[e].v /= 100
                    }
                }
                for (var t = ["sideColor", "seedColor"], n = new dat.GUI, i = 0, s = t[i]; i < t.length; i++, s = t[i]) c.hsv[s] = rgb2hsv(c[s][0], c[s][1], c[s][2]), c.hsv[s].h /= 360, c.hsv[s].s /= 100, c.hsv[s].v /= 100, n.addColor(c, t[i]).onChange(e(t[i]));
                n.add(c, "message").onChange(function(e) {
                    e.length > 0 && particlesMask.initParticlesFromString(e)
                }), n.addColor(c, "pointColor").onChange(function() {
                    f.update()
                }), n.addColor(c, "ambientColor").onChange(function() {
                    f.update()
                }), n.addColor(c, "background").onChange(function(e) {
                    o(e)
                }), n.add(c, "explode")
            }

            function t(e) {
                var t = new THREE.Color;
                return t.setRGB(e[0] / 255, e[1] / 255, e[2] / 255)
            }

            function n(e) {
                function t() {
                    for (var e = 0; e < r.length; e++)
                        for (var t = 0; t < shell404.axises.length; t++) s[r[e]][shell404.axises[t]] = shell404.dRange(o)
                }

                function n() {
                    a.ang = 0, o = shell404.range(1, 2.5), t()
                }

                function i() {
                    var t = e.position,
                        n = a.ang,
                        i = Math.cos(n),
                        o = Math.sin(n);
                    t.x = e.initial.x + i * s.a.x + o * s.b.x - s.a.x, t.y = e.initial.y + i * s.a.y + o * s.b.y - s.a.y, t.z = e.initial.z + i * s.a.z + o * s.b.z - s.a.z
                }
                var o = 30,
                    s = {
                        a: new THREE.Vector3,
                        b: new THREE.Vector3
                    }, r = ["a", "b"],
                    a = {
                        ang: 0
                    }, l = {
                        ang: 2 * Math.PI
                    };
                n(), e.tween = createjs.Tween.get(a, {
                    loop: !0
                }).wait(200 * Math.random()).to(l, 1e3), e.tween.addEventListener("change", i)
            }

            function o(e) {
                var t = e ? e : c.background,
                    n = new THREE.Color;
                n.setRGB(t[0] / 255, t[1] / 255, t[2] / 255), shell404.renderer.setClearColorHex(n.getHex(), 1)
            }

            function s() {
                var e = new THREE.Geometry,
                    t = r(new THREE.Vector3(0, 0, 0), 200, 2, 0, 1, 2, 3, 4, 5, 6, 7),
                    n = [];
                for (i = 0; i < t.length; i++) e.vertices.push(t[i]), n[i] = new THREE.Color(16777215), n[i].setHSV(.6, (200 + t[i].x) / 400, 1);
                e.colors = n, material = new THREE.LineBasicMaterial({
                    opacity: .5,
                    linewidth: 1,
                    vertexColors: THREE.VertexColors
                });
                var o, s, a = 2,
                    l = 2e3,
                    d = [
                        [material, 7 * a, [0, -l, 0], e]
                    ];
                for (i = 0; i < d.length; ++i) s = d[i], o = new THREE.Line(s[3], s[0]), o.scale.x = o.scale.y = o.scale.z = s[1], o.position.x = s[2][0], o.position.y = s[2][1], o.position.z = s[2][2], shell404.scene.add(o)
            }

            function r(e, t, n, i, o, s, a, l, d, c, u) {
                var h = t / 2,
                    p = [new THREE.Vector3(e.x - h, e.y + h, e.z - h), new THREE.Vector3(e.x - h, e.y + h, e.z + h), new THREE.Vector3(e.x - h, e.y - h, e.z + h), new THREE.Vector3(e.x - h, e.y - h, e.z - h), new THREE.Vector3(e.x + h, e.y - h, e.z - h), new THREE.Vector3(e.x + h, e.y - h, e.z + h), new THREE.Vector3(e.x + h, e.y + h, e.z + h), new THREE.Vector3(e.x + h, e.y + h, e.z - h)],
                    f = [p[i], p[o], p[s], p[a], p[l], p[d], p[c], p[u]];
                if (--n >= 0) {
                    var m = [];
                    return Array.prototype.push.apply(m, r(f[0], h, n, i, a, l, u, c, d, s, o)), Array.prototype.push.apply(m, r(f[1], h, n, i, u, c, o, s, d, l, a)), Array.prototype.push.apply(m, r(f[2], h, n, i, u, c, o, s, d, l, a)), Array.prototype.push.apply(m, r(f[3], h, n, s, a, i, o, c, u, l, d)), Array.prototype.push.apply(m, r(f[4], h, n, s, a, i, o, c, u, l, d)), Array.prototype.push.apply(m, r(f[5], h, n, l, a, s, d, c, o, i, u)), Array.prototype.push.apply(m, r(f[6], h, n, l, a, s, d, c, o, i, u)), Array.prototype.push.apply(m, r(f[7], h, n, c, d, s, o, i, a, l, u)), m
                }
                return f
            }
            window.textSize = 60;
            var a = text,
                l = "view/images/",
                d = "box_bck.png",
                c = new function() {
                    this.seedColor = midColor, this.sideColor = sideColor, this.message = a, this.background = [30, 30, 30], this.pointColor = [153, 255, 255], this.ambientColor = [255, 153, 255], this.hsv = {}, this.explode = function() {
                        u = new THREE.Vector3(0, 0, 0)
                    }
                }, u = !1;
            window.mask = {
                data: [],
                w: 0,
                h: 0,
                dim: {
                    max: 0,
                    halfDelta: {
                        w: 0,
                        h: 0
                    },
                    cell: 0
                }
            };
            var h = {
                step: function() {},
                init: function(e) {
                    e.velocity.x = 0, e.velocity.y = 0, e.velocity.z = 0, e.tween ? e.tween.setPaused(!1) : n(e)
                }
            }, p = h;
            window.resetParticle = function(e) {
                e.position.x = e.initial.x, e.position.z = e.initial.z, e.position.y = shell404.floor, p.init(e)
            };
            var f = {
                point: {
                    obj: void 0
                },
                ambient: {
                    obj: void 0
                },
                init: function() {
                    f.point.obj = new THREE.PointLight(16777215, 1), f.point.obj.position.x = 0, f.point.obj.position.y = 400, f.point.obj.position.z = 0, shell404.scene.add(f.point.obj), f.ambient.obj = new THREE.AmbientLight(16777215), f.update(), shell404.scene.add(f.ambient.obj)
                },
                update: function() {
                    f.point.obj.color = t(c.pointColor), f.ambient.obj.color = t(c.ambientColor)
                }
            };
            window.objectsInit = function() {
                shell404.showLights && f.init(), e(), shell404.guiEnabled || $(".dg.main.a").hide(), shell404.showPlane && plane(), shell404.showParticles && _.init(), o(), shell404.linePattern && s(), shell404.brandBackground && m.init()
            }, window.plane = function() {
                var e = new THREE.Mesh(new THREE.PlaneGeometry(8 * shell404.maxRadius, 8 * shell404.maxRadius), new THREE.MeshBasicMaterial({
                    color: 255,
                    transparent: !0,
                    opacity: 0
                }));
                e.rotation.x = -Math.PI / 2, e.overdraw = !0, shell404.scene.add(e)
            };
            var m = {
                object: void 0,
                init: function() {
                    function e(e) {
                        var t = new THREE.Texture(n),
                            i = new THREE.MeshBasicMaterial({
                                map: t,
                                overdraw: !0
                            }),
                            o = new Image;
                        return o.onload = function() {
                            t.needsUpdate = !0, i.map.image = this
                        }, o.src = e, i
                    }
                    var t = 1e4;
                    if (shell404.smallUnshiftedCube && (t = 100), shell404.skybox) {
                        var n = document.createElement("canvas");
                        n.width = 128, n.height = 128;
                        var i = n.getContext("2d");
                        i.fillStyle = "rgb( 200, 200, 200 )", i.fillRect(0, 0, n.width, n.height);
                        var o = [e(l + d), e(l + d), e(l + d), e(l + d), e(l + d), e(l + d)];
                        m.object = new THREE.Mesh(new THREE.CubeGeometry(t, t, t, 7, 7, 7), new THREE.MeshFaceMaterial(o)), m.object.scale.x = -1
                    } else {
                        var s = THREE.ImageUtils.loadTexture(l + d);
                        brandMaterial = cubeBasicMaterial ? new THREE.MeshBasicMaterial({
                            depthWrite: !0,
                            map: s,
                            side: THREE.DoubleSide
                        }) : new THREE.MeshPhongMaterial({
                            depthWrite: !0,
                            map: s,
                            side: THREE.DoubleSide
                        }), m.object = new THREE.Mesh(new THREE.CubeGeometry(t, t, t), brandMaterial)
                    }
                    shell404.smallUnshiftedCube || (m.object.position.y += shell404.ceiling), shell404.scene.add(m.object)
                },
                update: function() {
                    if (shell404.backgroundCubeMoving) {
                        var e = 5e-5 * shell404.time;
                        m.object.rotation.x = Math.sin(e) * Math.PI, m.object.rotation.y = Math.cos(e) * Math.PI
                    }
                }
            };
            hotdot.particle = function(e) {
                return this.index = e, this
            };
            var _ = {
                count: 950,
                geometry: void 0,
                mat: void 0,
                threeObject: void 0,
                plainArray: void 0,
                getVelocity: function(e) {
                    return _.geometry.vertices[e]
                },
                getParticlePosition: function(e) {
                    return _.canvasMode ? _.plainArray[e].position : _.geometry.vertices[e]
                },
                canvasMode: shell404.canvasMode,
                init: function() {
                    var e = (THREE.ImageUtils.loadTexture(l + "particle_tr.png"), THREE.ImageUtils.loadTexture(l + "disc.png"));
                    if (_.plainArray = new Array(_.count), _.canvasMode) var t = new THREE.ParticleBasicMaterial({
                        size: .1,
                        vertexColors: !0,
                        color: 16711680,
                        blending: THREE.AdditiveBlending,
                        map: e,
                        transparent: !0
                    }),
                    n = 2 * Math.PI, i = function(e) {
                        return function(t) {
                            t.globalCompositeOperation = "lighter", t.fillStyle = "rgb(" + Math.floor(256 * e.color.r) + "," + +Math.floor(256 * e.color.g) + "," + +Math.floor(256 * e.color.b) + ")", t.beginPath(), t.arc(0, 0, 2, 0, n, !0), t.closePath(), t.fill()
                        }
                    }, o = function(e) {
                        return new THREE.ParticleCanvasMaterial({
                            program: i(e)
                        })
                    };
                    else _.geometry = new THREE.Geometry, _.geometry.colors = [], _.mat = new THREE.ParticleBasicMaterial({
                        size: 10,
                        vertexColors: !0,
                        blending: THREE.AdditiveBlending,
                        map: e,
                        transparent: !0
                    });
                    for (var s, r, d = 0; d < _.count; d++) {
                        if (r = new hotdot.particle(d), _.plainArray[d] = r, _.canvasMode) s = new THREE.Particle(shell404.canvasSettings.particlesFromImage ? t : o(r)), r.position = s.position, shell404.scene.add(s), r.color = new THREE.Color(16711680);
                        else {
                            var s = new THREE.Vector3(0, 0, 0);
                            r.position = s, _.geometry.vertices.push(s), r.color = _.geometry.colors[d] = new THREE.Color(16711680)
                        }
                        _.plainArray[d] = r, r.velocity = new THREE.Vector3(0, 0, 0), r.initial = {
                            x: 0,
                            z: 0,
                            y: 0
                        }, resetParticle(r)
                    }
                    _.canvasMode || (_.threeObject = new THREE.ParticleSystem(_.geometry, _.mat)), particlesMask.initParticlesFromString(a, _), _.canvasMode || (_.threeObject.sortParticles = !0, shell404.scene.add(_.threeObject))
                },
                explodeParameters: {
                    max: {
                        pow: 10,
                        dist: 50
                    },
                    min: {
                        pow: 3
                    }
                },
                mixRGB: function(e, t) {
                    var n = c.seedColor[e] * (1 - t) + c.sideColor[e] * t;
                    return n / 255
                },
                update: function() {
                    if (0 != _.plainArray.length) {
                        for (var e, t, n, i, o, s, r, a, l, d = _.count; d--;) e = _.plainArray[d], l = e.position, a = e.velocity, Math.abs(Math.sqrt(Math.pow(l.x, 2) + Math.pow(l.z, 2)) > 3 * shell404.maxRadius) && resetParticle(e), t = Math.sqrt(Math.pow(l.x / shell404.maxRadius, 2) + Math.pow(l.z / shell404.maxRadius, 2)), n = l.y / shell404.ceiling, l.add(a), p.step(e, shell404.time), u && (o = Math.atan2(l.z - u.z, l.x - u.x), s = Math.sqrt(Math.pow(l.z - u.z, 2) + Math.pow(l.x - u.x, 2)), s < _.explodeParameters.max.dist && (r = (_.explodeParameters.max.pow - _.explodeParameters.min.pow) * (1 - s / _.explodeParameters.max.dist) + _.explodeParameters.min.pow, a.x = r * Math.cos(o), a.z = r * Math.sin(o), e.tween.setPaused(!0))), i = e.color, i.setRGB(_.mixRGB(0, t), _.mixRGB(1, t), _.mixRGB(2, t));
                        _.canvasMode || (_.threeObject.geometry.__dirtyVertices = !0, _.threeObject.geometry.colorsNeedUpdate = !0)
                    }
                }
            };
            window.updateObjects = function() {
                if (_.update(), shell404.linesConstructShouldRotate)
                    for (var e = 0; e < shell404.scene.children.length; e++) {
                        var t = shell404.scene.children[e];
                        t instanceof THREE.Line && (t.rotation.x = shell404.time * (e % 2 ? 1 : -1) / 4, t.rotation.y = shell404.time * (e % 2 ? 1 : -1) / 4)
                    }
                shell404.brandBackground && m.update(), u = !1, createjs.Tween.tick(shell404.deltaFrame, !1)
            }, window.mousedownLsnr = function() {
                var e = {
                    x: shell404.mouse.x / window.innerWidth * 2 - 1,
                    y: -(shell404.mouse.y / window.innerHeight * 2 - 1)
                }, t = new THREE.Vector3(e.x, e.y, 1);
                shell404.projector.unprojectVector(t, shell404.camera);
                var n = new THREE.Raycaster(shell404.camera.position, t.sub(shell404.camera.position).normalize()),
                    i = n.intersectObjects(shell404.scene.children);
                i.length > 0 && (u = i[0].point)
            }
        }, {}
    ],
    5: [
        function() {
            window.THREE = window.THREE || {}, window.TWEEN = window.TWEEN || {}, window.shell404fn = function() {
                this.canvasMode = -1 == window.location.href.indexOf("webGL=true"), this.showLights = !this.canvasMode, this.guiEnabled = !1, this.showPlane = !0, this.WIDTH = null, this.HEIGHT = null, this.ASPECT = null, this.VIEW_ANGLE = 45, this.NEAR = .1, this.FAR = 1e4, this.cameraMaxA = 1e-4, this.origin = null, this.maxRadius = 150, this.ceiling = 400, this.floor = 0, this.renderer = null, this.scene = null, this.camera = null, this.projector = null, this.lastMouseEvent = null, this.stats = null, this.mouseDown = !1, this.cl, this.time = 0, this.deltaFrame = 0, this.showParticles = !0, this.cubeBasicMaterial = !1, this.canvasSettings = {
                    particlesFromImage: !1
                }, this.smallUnshiftedCube = !1, this.skybox = this.canvasMode, this.brandBackground = !0, this.oldTweenLib = !1, this.backgroundCubeMoving = !1, this.linePattern = !1, this.linesConstructShouldRotate = !1, this.statsEnabled = window.location.href.indexOf("perf=true") > -1, this.mouse = {
                    x: 0,
                    y: 0
                }, this.adaptiveCam = {
                    s: {
                        a: 0,
                        va: Math.PI / 2
                    },
                    f: {
                        a: 0,
                        va: Math.PI / 2
                    },
                    delta: .01
                }, this.axises = ["x", "y", "z"], this.supportsWebGl = function() {
                    try {
                        return !!window.WebGLRenderingContext && !! document.createElement("canvas").getContext("experimental-webgl")
                    } catch (e) {
                        return !1
                    }
                }, this.init = function() {
                    var e = this;
                    $(window).on("resize", function() {
                        e.WIDTH = window.innerWidth, e.HEIGHT = window.innerHeight, e.ASPECT = e.WIDTH / e.HEIGHT, e.renderer.setSize(e.WIDTH, e.HEIGHT), e.camera.aspect = e.ASPECT, e.camera.updateProjectionMatrix()
                    }), e.origin = new THREE.Vector3(0, 0, 0), e.renderer = e.canvasMode ? new THREE.CanvasRenderer : new THREE.WebGLRenderer, e.WIDTH = window.innerWidth, e.HEIGHT = window.innerHeight, e.renderer.setSize(e.WIDTH, e.HEIGHT), $("#container").append(e.renderer.domElement), e.scene = new THREE.Scene, e.scene.add(e.camera), $("canvas").on("mousemove", function(t) {
                        e.mouse.x = t.pageX, e.mouse.y = t.pageY;
                        var n, i = {
                                x: e.mouse.x / window.innerWidth,
                                z: e.mouse.y / window.innerHeight
                            };
                        n = e.oldTweenLib ? TWEEN.Easing.Cubic.InOut : createjs.Ease.cubicInOut;
                        var o = {
                            x: n(i.x),
                            z: n(i.z)
                        };
                        e.adaptiveCam.f.a = o.x * Math.PI * .5 - Math.PI / 4, e.adaptiveCam.f.va = (1 - o.z) * Math.PI * .5 + Math.PI / 4, e.lastMouseEvent = t
                    }), $("canvas").on("mousedown", function(t) {
                        t.preventDefault(), mousedownLsnr(), e.mouseDown = !0
                    }), $("canvas").on("mouseup", function() {
                        e.mouseDown = !1
                    }), e.ASPECT = e.WIDTH / e.HEIGHT, e.camera = new THREE.PerspectiveCamera(e.VIEW_ANGLE, e.ASPECT, e.NEAR, e.FAR), e.camera.a = e.adaptiveCam.s.a, e.camera.va = e.adaptiveCam.s.va, e.camera.up = new THREE.Vector3(0, 0, -1), e.applyCamAngles(), e.statsEnabled && (e.stats = new Stats, e.stats.domElement.style.position = "absolute", e.stats.domElement.style.top = "0px", e.stats.domElement.style.zIndex = 100, $("#container").append(e.stats.domElement)), e.projector = new THREE.Projector, objectsInit(), e.cl = new THREE.Clock, e.cl.start()
                }, this.applyCamAngles = function() {
                    shell404.camera.position.x = Math.sin(shell404.camera.a) * Math.sin(shell404.camera.va) * shell404.ceiling, shell404.camera.position.y = Math.cos(shell404.camera.a) * Math.sin(shell404.camera.va) * shell404.ceiling, shell404.camera.position.z = Math.cos(shell404.camera.va) * shell404.ceiling, shell404.camera.lookAt(shell404.origin)
                }, this.update = function() {
                    var e = shell404.cl.getElapsedTime();
                    shell404.deltaFrame = Math.round(1e3 * (e - shell404.time)), shell404.time = e, updateObjects(), shell404.camera.a += (shell404.adaptiveCam.f.a - shell404.camera.a) * shell404.adaptiveCam.delta, shell404.camera.va += (shell404.adaptiveCam.f.va - shell404.camera.va) * shell404.adaptiveCam.delta, shell404.applyCamAngles(), shell404.statsEnabled && shell404.stats.update(), shell404.renderer.render(shell404.scene, shell404.camera), requestAnimFrame(shell404.update)
                }, this.addIndicators = function() {
                    var e = new THREE.Vector3(shell404.maxRadius, 0, 0),
                        t = new THREE.Vector3(0, shell404.maxRadius, 0),
                        n = new THREE.Vector3(0, 0, shell404.maxRadius);
                    shell404.addLine(shell404.origin, e, 16711680), shell404.addLine(shell404.origin, t, 65280), shell404.addLine(shell404.origin, n, 255), shell404.addLine(new THREE.Vector3(-shell404.maxRadius, 0, -shell404.maxRadius), new THREE.Vector3(shell404.maxRadius, 0, -shell404.maxRadius), 16777215), shell404.addLine(new THREE.Vector3(-shell404.maxRadius, 0, -shell404.maxRadius), new THREE.Vector3(-shell404.maxRadius, 0, shell404.maxRadius), 16777215)
                }, this.addLine = function(e, t, n) {
                    var i = new THREE.Geometry,
                        o = new THREE.Vector3(e.x, e.y, e.z);
                    i.vertices.push(o);
                    var s = new THREE.Vector3(t.x, t.y, t.z);
                    i.vertices.push(s);
                    var r = new THREE.Line(i, new THREE.LineBasicMaterial({
                        color: n,
                        opacity: .5
                    }));
                    shell404.scene.add(r)
                }, this.dRange = function(e) {
                    return -e + Math.random() * e * 2
                }, this.range = function(e, t) {
                    return e + Math.random() * (t - e)
                }, this.randNeg = function() {
                    return Math.random() > .5 ? 1 : -1
                }
            }, window.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                }
            }(), window.shell404 = new shell404fn
        }, {}
    ],
    6: [
        function() {
            window.Stats = function() {
                var e, t, n, i, o, s, r, a, l = 0,
                    d = 0,
                    c = Date.now(),
                    u = c,
                    h = c,
                    p = 0,
                    f = 1e3,
                    m = 0,
                    _ = [
                        [16, 16, 48],
                        [0, 255, 255]
                    ],
                    g = 0,
                    v = 1e3,
                    b = 0,
                    w = [
                        [16, 48, 16],
                        [0, 255, 0]
                    ];
                for (e = document.createElement("div"), e.style.cursor = "pointer", e.style.width = "80px", e.style.opacity = "0.9", e.style.zIndex = "10001", e.addEventListener("mousedown", function(e) {
                    e.preventDefault(), l = (l + 1) % 2, 0 == l ? (n.style.display = "block", s.style.display = "none") : (n.style.display = "none", s.style.display = "block")
                }, !1), n = document.createElement("div"), n.style.textAlign = "left", n.style.lineHeight = "1.2em", n.style.backgroundColor = "rgb(" + Math.floor(_[0][0] / 2) + "," + Math.floor(_[0][1] / 2) + "," + Math.floor(_[0][2] / 2) + ")", n.style.padding = "0 0 3px 3px", e.appendChild(n), i = document.createElement("div"), i.style.fontFamily = "Helvetica, Arial, sans-serif", i.style.fontSize = "9px", i.style.color = "rgb(" + _[1][0] + "," + _[1][1] + "," + _[1][2] + ")", i.style.fontWeight = "bold", i.innerHTML = "FPS", n.appendChild(i), o = document.createElement("div"), o.style.position = "relative", o.style.width = "74px", o.style.height = "30px", o.style.backgroundColor = "rgb(" + _[1][0] + "," + _[1][1] + "," + _[1][2] + ")", n.appendChild(o); o.children.length < 74;) t = document.createElement("span"), t.style.width = "1px", t.style.height = "30px", t.style.cssFloat = "left", t.style.backgroundColor = "rgb(" + _[0][0] + "," + _[0][1] + "," + _[0][2] + ")", o.appendChild(t);
                for (s = document.createElement("div"), s.style.textAlign = "left", s.style.lineHeight = "1.2em", s.style.backgroundColor = "rgb(" + Math.floor(w[0][0] / 2) + "," + Math.floor(w[0][1] / 2) + "," + Math.floor(w[0][2] / 2) + ")", s.style.padding = "0 0 3px 3px", s.style.display = "none", e.appendChild(s), r = document.createElement("div"), r.style.fontFamily = "Helvetica, Arial, sans-serif", r.style.fontSize = "9px", r.style.color = "rgb(" + w[1][0] + "," + w[1][1] + "," + w[1][2] + ")", r.style.fontWeight = "bold", r.innerHTML = "MS", s.appendChild(r), a = document.createElement("div"), a.style.position = "relative", a.style.width = "74px", a.style.height = "30px", a.style.backgroundColor = "rgb(" + w[1][0] + "," + w[1][1] + "," + w[1][2] + ")", s.appendChild(a); a.children.length < 74;) t = document.createElement("span"), t.style.width = "1px", t.style.height = 30 * Math.random() + "px", t.style.cssFloat = "left", t.style.backgroundColor = "rgb(" + w[0][0] + "," + w[0][1] + "," + w[0][2] + ")", a.appendChild(t);
                return {
                    domElement: e,
                    update: function() {
                        c = Date.now(), g = c - u, v = Math.min(v, g), b = Math.max(b, g), r.textContent = g + " MS (" + v + "-" + b + ")";
                        var e = Math.min(30, 30 - g / 200 * 30);
                        a.appendChild(a.firstChild).style.height = e + "px", u = c, d++, c > h + 1e3 && (p = Math.round(1e3 * d / (c - h)), f = Math.min(f, p), m = Math.max(m, p), i.textContent = p + " FPS (" + f + "-" + m + ")", e = Math.min(30, 30 - p / 100 * 30), o.appendChild(o.firstChild).style.height = e + "px", h = c, d = 0)
                    }
                }
            }
        }, {}
    ],
    7: [
        function() {
            ! function() {
                this.createjs = this.createjs || {},
                function() {
                    var e = function() {
                        this.initialize()
                    }, t = e.prototype;
                    e.initialize = function(e) {
                        e.addEventListener = t.addEventListener, e.removeEventListener = t.removeEventListener, e.removeAllEventListeners = t.removeAllEventListeners, e.hasEventListener = t.hasEventListener, e.dispatchEvent = t.dispatchEvent
                    }, t._listeners = null, t.initialize = function() {}, t.addEventListener = function(e, t) {
                        var n = this._listeners;
                        n ? this.removeEventListener(e, t) : n = this._listeners = {};
                        var i = n[e];
                        return i || (i = n[e] = []), i.push(t), t
                    }, t.removeEventListener = function(e, t) {
                        var n = this._listeners;
                        if (n) {
                            var i = n[e];
                            if (i)
                                for (var o = 0, s = i.length; s > o; o++)
                                    if (i[o] == t) {
                                        1 == s ? delete n[e] : i.splice(o, 1);
                                        break
                                    }
                        }
                    }, t.removeAllEventListeners = function(e) {
                        e ? this._listeners && delete this._listeners[e] : this._listeners = null
                    }, t.dispatchEvent = function(e, t) {
                        var n = !1,
                            i = this._listeners;
                        if (e && i) {
                            if ("string" == typeof e && (e = {
                                type: e
                            }), e.target = t || this, i = i[e.type], !i) return n;
                            for (var i = i.slice(), o = 0, s = i.length; s > o; o++) {
                                var r = i[o];
                                r instanceof Function ? n = n || r.apply(null, [e]) : r.handleEvent && (n = n || r.handleEvent(e))
                            }
                        }
                        return !!n
                    }, t.hasEventListener = function(e) {
                        var t = this._listeners;
                        return !(!t || !t[e])
                    }, t.toString = function() {
                        return "[EventDispatcher]"
                    }, createjs.EventDispatcher = e
                }(), this.createjs = this.createjs || {},
                function() {
                    var e = function(e, t, n) {
                        this.initialize(e, t, n)
                    }, t = e.prototype;
                    e.NONE = 0, e.LOOP = 1, e.REVERSE = 2, e.IGNORE = {}, e._tweens = [], e._plugins = {}, e.get = function(t, n, i, o) {
                        return o && e.removeTweens(t), new e(t, n, i)
                    }, e.tick = function(t, n) {
                        for (var i = e._tweens.slice(), o = i.length - 1; o >= 0; o--) {
                            var s = i[o];
                            n && !s.ignoreGlobalPause || s._paused || s.tick(s._useTicks ? 1 : t)
                        }
                    }, createjs.Ticker && createjs.Ticker.addListener(e, !1), e.removeTweens = function(t) {
                        if (t.tweenjs_count) {
                            for (var n = e._tweens, i = n.length - 1; i >= 0; i--) n[i]._target == t && (n[i]._paused = !0, n.splice(i, 1));
                            t.tweenjs_count = 0
                        }
                    }, e.hasActiveTweens = function(t) {
                        return t ? t.tweenjs_count : e._tweens && e._tweens.length
                    }, e.installPlugin = function(t, n) {
                        var i = t.priority;
                        null == i && (t.priority = i = 0);
                        for (var o = 0, s = n.length, r = e._plugins; s > o; o++) {
                            var a = n[o];
                            if (r[a]) {
                                for (var l = r[a], d = 0, c = l.length; c > d && !(i < l[d].priority); d++);
                                r[a].splice(d, 0, t)
                            } else r[a] = [t]
                        }
                    }, e._register = function(t, n) {
                        var i = t._target;
                        n ? (i && (i.tweenjs_count = i.tweenjs_count ? i.tweenjs_count + 1 : 1), e._tweens.push(t)) : (i && i.tweenjs_count--, i = e._tweens.indexOf(t), -1 != i && e._tweens.splice(i, 1))
                    }, t.addEventListener = null, t.removeEventListener = null, t.removeAllEventListeners = null, t.dispatchEvent = null, t.hasEventListener = null, t._listeners = null, createjs.EventDispatcher.initialize(t), t.ignoreGlobalPause = !1, t.loop = !1, t.duration = 0, t.pluginData = null, t.onChange = null, t.change = null, t.target = null, t.position = null, t._paused = !1, t._curQueueProps = null, t._initQueueProps = null, t._steps = null, t._actions = null, t._prevPosition = 0, t._stepPosition = 0, t._prevPos = -1, t._target = null, t._useTicks = !1, t.initialize = function(t, n, i) {
                        this.target = this._target = t, n && (this._useTicks = n.useTicks, this.ignoreGlobalPause = n.ignoreGlobalPause, this.loop = n.loop, this.onChange = n.onChange, n.override && e.removeTweens(t)), this.pluginData = i || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], n && n.paused ? this._paused = !0 : e._register(this, !0), n && null != n.position && this.setPosition(n.position, e.NONE)
                    }, t.wait = function(e) {
                        if (null == e || 0 >= e) return this;
                        var t = this._cloneProps(this._curQueueProps);
                        return this._addStep({
                            d: e,
                            p0: t,
                            e: this._linearEase,
                            p1: t
                        })
                    }, t.to = function(e, t, n) {
                        return (isNaN(t) || 0 > t) && (t = 0), this._addStep({
                            d: t || 0,
                            p0: this._cloneProps(this._curQueueProps),
                            e: n,
                            p1: this._cloneProps(this._appendQueueProps(e))
                        })
                    }, t.call = function(e, t, n) {
                        return this._addAction({
                            f: e,
                            p: t ? t : [this],
                            o: n ? n : this._target
                        })
                    }, t.set = function(e, t) {
                        return this._addAction({
                            f: this._set,
                            o: this,
                            p: [e, t ? t : this._target]
                        })
                    }, t.play = function(e) {
                        return this.call(e.setPaused, [!1], e)
                    }, t.pause = function(e) {
                        return e || (e = this), this.call(e.setPaused, [!0], e)
                    }, t.setPosition = function(e, t) {
                        0 > e && (e = 0), null == t && (t = 1);
                        var n = e,
                            i = !1;
                        if (n >= this.duration && (this.loop ? n %= this.duration : (n = this.duration, i = !0)), n == this._prevPos) return i;
                        var o = this._prevPos;
                        if (this.position = this._prevPos = n, this._prevPosition = e, this._target)
                            if (i) this._updateTargetProps(null, 1);
                            else if (0 < this._steps.length) {
                            for (var s = 0, r = this._steps.length; r > s && !(this._steps[s].t > n); s++);
                            s = this._steps[s - 1], this._updateTargetProps(s, (this._stepPosition = n - s.t) / s.d)
                        }
                        return 0 != t && 0 < this._actions.length && (this._useTicks ? this._runActions(n, n) : 1 == t && o > n ? (o != this.duration && this._runActions(o, this.duration), this._runActions(0, n, !0)) : this._runActions(o, n)), i && this.setPaused(!0), this.onChange && this.onChange(this), this.dispatchEvent("change"), i
                    }, t.tick = function(e) {
                        this._paused || this.setPosition(this._prevPosition + e)
                    }, t.setPaused = function(t) {
                        return this._paused = !! t, e._register(this, !t), this
                    }, t.w = t.wait, t.t = t.to, t.c = t.call, t.s = t.set, t.toString = function() {
                        return "[Tween]"
                    }, t.clone = function() {
                        throw "Tween can not be cloned."
                    }, t._updateTargetProps = function(t, i) {
                        var o, s, r, a;
                        t || 1 != i ? (t.e && (i = t.e(i, 0, 1, 1)), o = t.p0, s = t.p1) : o = s = this._curQueueProps;
                        for (n in this._initQueueProps) {
                            null == (r = o[n]) && (o[n] = r = this._initQueueProps[n]), null == (a = s[n]) && (s[n] = a = r), r = r == a || 0 == i || 1 == i || "number" != typeof r ? 1 == i ? a : r : r + (a - r) * i;
                            var l = !1;
                            if (a = e._plugins[n])
                                for (var d = 0, c = a.length; c > d; d++) {
                                    var u = a[d].tween(this, n, r, o, s, i, !! t && o == s, !t);
                                    u == e.IGNORE ? l = !0 : r = u
                                }
                            l || (this._target[n] = r)
                        }
                    }, t._runActions = function(e, t, n) {
                        var i = e,
                            o = t,
                            s = -1,
                            r = this._actions.length,
                            a = 1;
                        for (e > t && (i = t, o = e, s = r, r = a = -1);
                            (s += a) != r;) {
                            t = this._actions[s];
                            var l = t.t;
                            (l == o || l > i && o > l || n && l == e) && t.f.apply(t.o, t.p)
                        }
                    }, t._appendQueueProps = function(t) {
                        var n, i, o, s, r, a;
                        for (a in t) {
                            if (void 0 === this._initQueueProps[a]) {
                                if (i = this._target[a], n = e._plugins[a])
                                    for (o = 0, s = n.length; s > o; o++) i = n[o].init(this, a, i);
                                this._initQueueProps[a] = void 0 === i ? null : i
                            } else i = this._curQueueProps[a]; if (n = e._plugins[a])
                                for (r = r || {}, o = 0, s = n.length; s > o; o++) n[o].step && n[o].step(this, a, i, t[a], r);
                            this._curQueueProps[a] = t[a]
                        }
                        return r && this._appendQueueProps(r), this._curQueueProps
                    }, t._cloneProps = function(e) {
                        var t, n = {};
                        for (t in e) n[t] = e[t];
                        return n
                    }, t._addStep = function(e) {
                        return 0 < e.d && (this._steps.push(e), e.t = this.duration, this.duration += e.d), this
                    }, t._addAction = function(e) {
                        return e.t = this.duration, this._actions.push(e), this
                    }, t._set = function(e, t) {
                        for (var n in e) t[n] = e[n]
                    }, createjs.Tween = e
                }(), this.createjs = this.createjs || {},
                function() {
                    var e = function(e, t, n) {
                        this.initialize(e, t, n)
                    }, t = e.prototype;
                    t.ignoreGlobalPause = !1, t.duration = 0, t.loop = !1, t.onChange = null, t.position = null, t._paused = !1, t._tweens = null, t._labels = null, t._prevPosition = 0, t._prevPos = -1, t._useTicks = !1, t.initialize = function(e, t, n) {
                        this._tweens = [], n && (this._useTicks = n.useTicks, this.loop = n.loop, this.ignoreGlobalPause = n.ignoreGlobalPause, this.onChange = n.onChange), e && this.addTween.apply(this, e), this.setLabels(t), n && n.paused ? this._paused = !0 : createjs.Tween._register(this, !0), n && null != n.position && this.setPosition(n.position, createjs.Tween.NONE)
                    }, t.addTween = function(e) {
                        var t = arguments.length;
                        if (t > 1) {
                            for (var n = 0; t > n; n++) this.addTween(arguments[n]);
                            return arguments[0]
                        }
                        return 0 == t ? null : (this.removeTween(e), this._tweens.push(e), e.setPaused(!0), e._paused = !1, e._useTicks = this._useTicks, e.duration > this.duration && (this.duration = e.duration), 0 <= this._prevPos && e.setPosition(this._prevPos, createjs.Tween.NONE), e)
                    }, t.removeTween = function(e) {
                        var t = arguments.length;
                        if (t > 1) {
                            for (var n = !0, i = 0; t > i; i++) n = n && this.removeTween(arguments[i]);
                            return n
                        }
                        return 0 == t ? !1 : (t = this._tweens.indexOf(e), -1 != t ? (this._tweens.splice(t, 1), e.duration >= this.duration && this.updateDuration(), !0) : !1)
                    }, t.addLabel = function(e, t) {
                        this._labels[e] = t
                    }, t.setLabels = function(e) {
                        this._labels = e ? e : {}
                    }, t.gotoAndPlay = function(e) {
                        this.setPaused(!1), this._goto(e)
                    }, t.gotoAndStop = function(e) {
                        this.setPaused(!0), this._goto(e)
                    }, t.setPosition = function(e, t) {
                        0 > e && (e = 0);
                        var n = this.loop ? e % this.duration : e,
                            i = !this.loop && e >= this.duration;
                        if (n == this._prevPos) return i;
                        this._prevPosition = e, this.position = this._prevPos = n;
                        for (var o = 0, s = this._tweens.length; s > o; o++)
                            if (this._tweens[o].setPosition(n, t), n != this._prevPos) return !1;
                        return i && this.setPaused(!0), this.onChange && this.onChange(this), i
                    }, t.setPaused = function(e) {
                        this._paused = !! e, createjs.Tween._register(this, !e)
                    }, t.updateDuration = function() {
                        for (var e = this.duration = 0, t = this._tweens.length; t > e; e++) tween = this._tweens[e], tween.duration > this.duration && (this.duration = tween.duration)
                    }, t.tick = function(e) {
                        this.setPosition(this._prevPosition + e)
                    }, t.resolve = function(e) {
                        var t = parseFloat(e);
                        return isNaN(t) && (t = this._labels[e]), t
                    }, t.toString = function() {
                        return "[Timeline]"
                    }, t.clone = function() {
                        throw "Timeline can not be cloned."
                    }, t._goto = function(e) {
                        e = this.resolve(e), null != e && this.setPosition(e)
                    }, createjs.Timeline = e
                }(), this.createjs = this.createjs || {},
                function() {
                    var e = function() {
                        throw "Ease cannot be instantiated."
                    };
                    e.linear = function(e) {
                        return e
                    }, e.none = e.linear, e.get = function(e) {
                        return -1 > e && (e = -1), e > 1 && (e = 1),
                        function(t) {
                            return 0 == e ? t : 0 > e ? t * (t * -e + 1 + e) : t * ((2 - t) * e + (1 - e))
                        }
                    }, e.getPowIn = function(e) {
                        return function(t) {
                            return Math.pow(t, e)
                        }
                    }, e.getPowOut = function(e) {
                        return function(t) {
                            return 1 - Math.pow(1 - t, e)
                        }
                    }, e.getPowInOut = function(e) {
                        return function(t) {
                            return 1 > (t *= 2) ? .5 * Math.pow(t, e) : 1 - .5 * Math.abs(Math.pow(2 - t, e))
                        }
                    }, e.quadIn = e.getPowIn(2), e.quadOut = e.getPowOut(2), e.quadInOut = e.getPowInOut(2), e.cubicIn = e.getPowIn(3), e.cubicOut = e.getPowOut(3), e.cubicInOut = e.getPowInOut(3), e.quartIn = e.getPowIn(4), e.quartOut = e.getPowOut(4), e.quartInOut = e.getPowInOut(4), e.quintIn = e.getPowIn(5), e.quintOut = e.getPowOut(5), e.quintInOut = e.getPowInOut(5), e.sineIn = function(e) {
                        return 1 - Math.cos(e * Math.PI / 2)
                    }, e.sineOut = function(e) {
                        return Math.sin(e * Math.PI / 2)
                    }, e.sineInOut = function(e) {
                        return -.5 * (Math.cos(Math.PI * e) - 1)
                    }, e.getBackIn = function(e) {
                        return function(t) {
                            return t * t * ((e + 1) * t - e)
                        }
                    }, e.backIn = e.getBackIn(1.7), e.getBackOut = function(e) {
                        return function(t) {
                            return --t * t * ((e + 1) * t + e) + 1
                        }
                    }, e.backOut = e.getBackOut(1.7), e.getBackInOut = function(e) {
                        return e *= 1.525,
                        function(t) {
                            return 1 > (t *= 2) ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
                        }
                    }, e.backInOut = e.getBackInOut(1.7), e.circIn = function(e) {
                        return -(Math.sqrt(1 - e * e) - 1)
                    }, e.circOut = function(e) {
                        return Math.sqrt(1 - --e * e)
                    }, e.circInOut = function(e) {
                        return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                    }, e.bounceIn = function(t) {
                        return 1 - e.bounceOut(1 - t)
                    }, e.bounceOut = function(e) {
                        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                    }, e.bounceInOut = function(t) {
                        return .5 > t ? .5 * e.bounceIn(2 * t) : .5 * e.bounceOut(2 * t - 1) + .5
                    }, e.getElasticIn = function(e, t) {
                        var n = 2 * Math.PI;
                        return function(i) {
                            if (0 == i || 1 == i) return i;
                            var o = t / n * Math.asin(1 / e);
                            return -(e * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - o) * n / t))
                        }
                    }, e.elasticIn = e.getElasticIn(1, .3), e.getElasticOut = function(e, t) {
                        var n = 2 * Math.PI;
                        return function(i) {
                            if (0 == i || 1 == i) return i;
                            var o = t / n * Math.asin(1 / e);
                            return e * Math.pow(2, -10 * i) * Math.sin((i - o) * n / t) + 1
                        }
                    }, e.elasticOut = e.getElasticOut(1, .3), e.getElasticInOut = function(e, t) {
                        var n = 2 * Math.PI;
                        return function(i) {
                            var o = t / n * Math.asin(1 / e);
                            return 1 > (i *= 2) ? -.5 * e * Math.pow(2, 10 * (i -= 1)) * Math.sin((i - o) * n / t) : .5 * e * Math.pow(2, -10 * (i -= 1)) * Math.sin((i - o) * n / t) + 1
                        }
                    }, e.elasticInOut = e.getElasticInOut(1, .3 * 1.5), createjs.Ease = e
                }(), this.createjs = this.createjs || {},
                function() {
                    var e = function() {
                        throw "MotionGuidePlugin cannot be instantiated."
                    };
                    e.priority = 0, e.install = function() {
                        return createjs.Tween.installPlugin(e, ["guide", "x", "y", "rotation"]), createjs.Tween.IGNORE
                    }, e.init = function(e, t, n) {
                        return e = e.target, e.hasOwnProperty("x") || (e.x = 0), e.hasOwnProperty("y") || (e.y = 0), e.hasOwnProperty("rotation") || (e.rotation = 0), "guide" == t ? null : n
                    }, e.step = function(t, n, i, o, s) {
                        if ("guide" != n) return o;
                        var r;
                        if (o.hasOwnProperty("path") || (o.path = []), t = o.path, o.hasOwnProperty("end") || (o.end = 1), o.hasOwnProperty("start") || (o.start = i && i.hasOwnProperty("end") && i.path === t ? i.end : 0), o.hasOwnProperty("_segments") && o._length) return o;
                        if (i = t.length, !(i >= 6 && 0 == (i - 2) % 4)) throw "invalid 'path' data, please see documentation for valid paths";
                        for (o._segments = [], o._length = 0, n = 2; i > n; n += 4) {
                            for (var a, l, d = t[n - 2], c = t[n - 1], u = t[n + 0], h = t[n + 1], p = t[n + 2], f = t[n + 3], m = d, _ = c, g = 0, v = [], b = 1; 10 >= b; b++) {
                                l = b / 10;
                                var w = 1 - l;
                                a = w * w * d + 2 * w * l * u + l * l * p, l = w * w * c + 2 * w * l * h + l * l * f, g += v[v.push(Math.sqrt((r = a - m) * r + (r = l - _) * r)) - 1], m = a, _ = l
                            }
                            o._segments.push(g), o._segments.push(v), o._length += g
                        }
                        return r = o.orient, o.orient = !1, e.calc(o, o.end, s), o.orient = r, o
                    }, e.tween = function(t, n, i, o, s, r, a) {
                        return s = s.guide, void 0 == s || s === o.guide ? i : (s.lastRatio != r && (e.calc(s, (s.end - s.start) * (a ? s.end : r) + s.start, t.target), s.orient && (t.target.rotation += o.rotation || 0), s.lastRatio = r), s.orient || "rotation" != n ? t.target[n] : i)
                    }, e.calc = function(t, n, i) {
                        void 0 == t._segments && e.validate(t), void 0 == i && (i = {
                            x: 0,
                            y: 0,
                            rotation: 0
                        });
                        var o = t._segments,
                            s = t.path,
                            r = t._length * n,
                            a = o.length - 2;
                        for (n = 0; r > o[n] && a > n;) r -= o[n], n += 2;
                        for (var o = o[n + 1], l = 0, a = o.length - 1; r > o[l] && a > l;) r -= o[l], l++;
                        return r = l / ++a + r / (a * o[l]), n = 2 * n + 2, a = 1 - r, i.x = a * a * s[n - 2] + 2 * a * r * s[n + 0] + r * r * s[n + 2], i.y = a * a * s[n - 1] + 2 * a * r * s[n + 1] + r * r * s[n + 3], t.orient && (i.rotation = 57.2957795 * Math.atan2((s[n + 1] - s[n - 1]) * a + (s[n + 3] - s[n + 1]) * r, (s[n + 0] - s[n - 2]) * a + (s[n + 2] - s[n + 0]) * r)), i
                    }, createjs.MotionGuidePlugin = e
                }(),
                function() {
                    var e = this.createjs = this.createjs || {}, e = e.TweenJS = e.TweenJS || {};
                    e.version = "0.4.0", e.buildDate = "Tue, 12 Feb 2013 21:09:02 GMT"
                }()
            }(window)
        }, {}
    ],
    8: [
        function() {
            window.dat = window.dat || {}, dat.gui = dat.gui || {}, dat.utils = dat.utils || {}, dat.controllers = dat.controllers || {}, dat.dom = dat.dom || {}, dat.color = dat.color || {}, dat.utils.css = function() {
                return {
                    load: function(e, t) {
                        t = t || document;
                        var n = t.createElement("link");
                        n.type = "text/css", n.rel = "stylesheet", n.href = e, t.getElementsByTagName("head")[0].appendChild(n)
                    },
                    inject: function(e, t) {
                        t = t || document;
                        var n = document.createElement("style");
                        n.type = "text/css", n.innerHTML = e, t.getElementsByTagName("head")[0].appendChild(n)
                    }
                }
            }(), dat.utils.common = function() {
                var e = Array.prototype.forEach,
                    t = Array.prototype.slice;
                return {
                    BREAK: {},
                    extend: function(e) {
                        return this.each(t.call(arguments, 1), function(t) {
                            for (var n in t) this.isUndefined(t[n]) || (e[n] = t[n])
                        }, this), e
                    },
                    defaults: function(e) {
                        return this.each(t.call(arguments, 1), function(t) {
                            for (var n in t) this.isUndefined(e[n]) && (e[n] = t[n])
                        }, this), e
                    },
                    compose: function() {
                        var e = t.call(arguments);
                        return function() {
                            for (var n = t.call(arguments), i = e.length - 1; i >= 0; i--) n = [e[i].apply(this, n)];
                            return n[0]
                        }
                    },
                    each: function(t, n, i) {
                        if (e && t.forEach === e) t.forEach(n, i);
                        else if (t.length === t.length + 0) {
                            for (var o = 0, s = t.length; s > o; o++)
                                if (o in t && n.call(i, t[o], o) === this.BREAK) return
                        } else
                            for (var o in t)
                                if (n.call(i, t[o], o) === this.BREAK) return
                    },
                    defer: function(e) {
                        setTimeout(e, 0)
                    },
                    toArray: function(e) {
                        return e.toArray ? e.toArray() : t.call(e)
                    },
                    isUndefined: function(e) {
                        return void 0 === e
                    },
                    isNull: function(e) {
                        return null === e
                    },
                    isNaN: function(e) {
                        return e !== e
                    },
                    isArray: Array.isArray || function(e) {
                        return e.constructor === Array
                    },
                    isObject: function(e) {
                        return e === Object(e)
                    },
                    isNumber: function(e) {
                        return e === e + 0
                    },
                    isString: function(e) {
                        return e === e + ""
                    },
                    isBoolean: function(e) {
                        return e === !1 || e === !0
                    },
                    isFunction: function(e) {
                        return "[object Function]" === Object.prototype.toString.call(e)
                    }
                }
            }(), dat.controllers.Controller = function(e) {
                var t = function(e, t) {
                    this.initialValue = e[t], this.domElement = document.createElement("div"), this.object = e, this.property = t, this.__onChange = void 0, this.__onFinishChange = void 0
                };
                return e.extend(t.prototype, {
                    onChange: function(e) {
                        return this.__onChange = e, this
                    },
                    onFinishChange: function(e) {
                        return this.__onFinishChange = e, this
                    },
                    setValue: function(e) {
                        return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this
                    },
                    getValue: function() {
                        return this.object[this.property]
                    },
                    updateDisplay: function() {
                        return this
                    },
                    isModified: function() {
                        return this.initialValue !== this.getValue()
                    }
                }), t
            }(dat.utils.common), dat.dom.dom = function(e) {
                function t(t) {
                    if ("0" === t || e.isUndefined(t)) return 0;
                    var n = t.match(o);
                    return e.isNull(n) ? 0 : parseFloat(n[1])
                }
                var n = {
                    HTMLEvents: ["change"],
                    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
                    KeyboardEvents: ["keydown"]
                }, i = {};
                e.each(n, function(t, n) {
                    e.each(t, function(e) {
                        i[e] = n
                    })
                });
                var o = /(\d+(\.\d+)?)px/,
                    s = {
                        makeSelectable: function(e, t) {
                            void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function() {
                                return !1
                            } : function() {}, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off")
                        },
                        makeFullscreen: function(t, n, i) {
                            e.isUndefined(n) && (n = !0), e.isUndefined(i) && (i = !0), t.style.position = "absolute", n && (t.style.left = 0, t.style.right = 0), i && (t.style.top = 0, t.style.bottom = 0)
                        },
                        fakeEvent: function(t, n, o, s) {
                            o = o || {};
                            var r = i[n];
                            if (!r) throw new Error("Event type " + n + " not supported.");
                            var a = document.createEvent(r);
                            switch (r) {
                                case "MouseEvents":
                                    var l = o.x || o.clientX || 0,
                                        d = o.y || o.clientY || 0;
                                    a.initMouseEvent(n, o.bubbles || !1, o.cancelable || !0, window, o.clickCount || 1, 0, 0, l, d, !1, !1, !1, !1, 0, null);
                                    break;
                                case "KeyboardEvents":
                                    var c = a.initKeyboardEvent || a.initKeyEvent;
                                    e.defaults(o, {
                                        cancelable: !0,
                                        ctrlKey: !1,
                                        altKey: !1,
                                        shiftKey: !1,
                                        metaKey: !1,
                                        keyCode: void 0,
                                        charCode: void 0
                                    }), c(n, o.bubbles || !1, o.cancelable, window, o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, o.keyCode, o.charCode);
                                    break;
                                default:
                                    a.initEvent(n, o.bubbles || !1, o.cancelable || !0)
                            }
                            e.defaults(a, s), t.dispatchEvent(a)
                        },
                        bind: function(e, t, n, i) {
                            return i = i || !1, e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n), s
                        },
                        unbind: function(e, t, n, i) {
                            return i = i || !1, e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent && e.detachEvent("on" + t, n), s
                        },
                        addClass: function(e, t) {
                            if (void 0 === e.className) e.className = t;
                            else if (e.className !== t) {
                                var n = e.className.split(/ +/); - 1 == n.indexOf(t) && (n.push(t), e.className = n.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
                            }
                            return s
                        },
                        removeClass: function(e, t) {
                            if (t)
                                if (void 0 === e.className);
                                else if (e.className === t) e.removeAttribute("class");
                            else {
                                var n = e.className.split(/ +/),
                                    i = n.indexOf(t); - 1 != i && (n.splice(i, 1), e.className = n.join(" "))
                            } else e.className = void 0;
                            return s
                        },
                        hasClass: function(e, t) {
                            return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1
                        },
                        getWidth: function(e) {
                            var n = getComputedStyle(e);
                            return t(n["border-left-width"]) + t(n["border-right-width"]) + t(n["padding-left"]) + t(n["padding-right"]) + t(n.width)
                        },
                        getHeight: function(e) {
                            var n = getComputedStyle(e);
                            return t(n["border-top-width"]) + t(n["border-bottom-width"]) + t(n["padding-top"]) + t(n["padding-bottom"]) + t(n.height)
                        },
                        getOffset: function(e) {
                            var t = {
                                left: 0,
                                top: 0
                            };
                            if (e.offsetParent)
                                do t.left += e.offsetLeft, t.top += e.offsetTop; while (e = e.offsetParent);
                            return t
                        },
                        isActive: function(e) {
                            return e === document.activeElement && (e.type || e.href)
                        }
                    };
                return s
            }(dat.utils.common), dat.controllers.OptionController = function(e, t, n) {
                var i = function(e, o, s) {
                    i.superclass.call(this, e, o);
                    var r = this;
                    if (this.__select = document.createElement("select"), n.isArray(s)) {
                        var a = {};
                        n.each(s, function(e) {
                            a[e] = e
                        }), s = a
                    }
                    n.each(s, function(e, t) {
                        var n = document.createElement("option");
                        n.innerHTML = t, n.setAttribute("value", e), r.__select.appendChild(n)
                    }), this.updateDisplay(), t.bind(this.__select, "change", function() {
                        var e = this.options[this.selectedIndex].value;
                        r.setValue(e)
                    }), this.domElement.appendChild(this.__select)
                };
                return i.superclass = e, n.extend(i.prototype, e.prototype, {
                    setValue: function(e) {
                        var t = i.superclass.prototype.setValue.call(this, e);
                        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), t
                    },
                    updateDisplay: function() {
                        return this.__select.value = this.getValue(), i.superclass.prototype.updateDisplay.call(this)
                    }
                }), i
            }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.NumberController = function(e, t) {
                function n(e) {
                    return e = e.toString(), e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0
                }
                var i = function(e, o, s) {
                    i.superclass.call(this, e, o), s = s || {}, this.__min = s.min, this.__max = s.max, this.__step = s.step, this.__impliedStep = t.isUndefined(this.__step) ? 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__step, this.__precision = n(this.__impliedStep)
                };
                return i.superclass = e, t.extend(i.prototype, e.prototype, {
                    setValue: function(e) {
                        return void 0 !== this.__min && e < this.__min ? e = this.__min : void 0 !== this.__max && e > this.__max && (e = this.__max), void 0 !== this.__step && e % this.__step != 0 && (e = Math.round(e / this.__step) * this.__step), i.superclass.prototype.setValue.call(this, e)
                    },
                    min: function(e) {
                        return this.__min = e, this
                    },
                    max: function(e) {
                        return this.__max = e, this
                    },
                    step: function(e) {
                        return this.__step = e, this
                    }
                }), i
            }(dat.controllers.Controller, dat.utils.common), dat.controllers.NumberControllerBox = function(e, t, n) {
                function i(e, t) {
                    var n = Math.pow(10, t);
                    return Math.round(e * n) / n
                }
                var o = function(e, i, s) {
                    function r() {
                        var e = parseFloat(h.__input.value);
                        n.isNaN(e) || h.setValue(e)
                    }

                    function a() {
                        r(), h.__onFinishChange && h.__onFinishChange.call(h, h.getValue())
                    }

                    function l(e) {
                        t.bind(window, "mousemove", d), t.bind(window, "mouseup", c), u = e.clientY
                    }

                    function d(e) {
                        var t = u - e.clientY;
                        h.setValue(h.getValue() + t * h.__impliedStep), u = e.clientY
                    }

                    function c() {
                        t.unbind(window, "mousemove", d), t.unbind(window, "mouseup", c)
                    }
                    this.__truncationSuspended = !1, o.superclass.call(this, e, i, s);
                    var u, h = this;
                    this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), t.bind(this.__input, "change", r), t.bind(this.__input, "blur", a), t.bind(this.__input, "mousedown", l), t.bind(this.__input, "keydown", function(e) {
                        13 === e.keyCode && (h.__truncationSuspended = !0, this.blur(), h.__truncationSuspended = !1)
                    }), this.updateDisplay(), this.domElement.appendChild(this.__input)
                };
                return o.superclass = e, n.extend(o.prototype, e.prototype, {
                    updateDisplay: function() {
                        return this.__input.value = this.__truncationSuspended ? this.getValue() : i(this.getValue(), this.__precision), o.superclass.prototype.updateDisplay.call(this)
                    }
                }), o
            }(dat.controllers.NumberController, dat.dom.dom, dat.utils.common), dat.controllers.NumberControllerSlider = function(e, t, n, i, o) {
                function s(e, t, n, i, o) {
                    return i + (o - i) * ((e - t) / (n - t))
                }
                var r = function(e, n, i, o, a) {
                    function l(e) {
                        t.bind(window, "mousemove", d), t.bind(window, "mouseup", c), d(e)
                    }

                    function d(e) {
                        e.preventDefault();
                        var n = t.getOffset(u.__background),
                            i = t.getWidth(u.__background);
                        return u.setValue(s(e.clientX, n.left, n.left + i, u.__min, u.__max)), !1
                    }

                    function c() {
                        t.unbind(window, "mousemove", d), t.unbind(window, "mouseup", c), u.__onFinishChange && u.__onFinishChange.call(u, u.getValue())
                    }
                    r.superclass.call(this, e, n, {
                        min: i,
                        max: o,
                        step: a
                    });
                    var u = this;
                    this.__background = document.createElement("div"), this.__foreground = document.createElement("div"), t.bind(this.__background, "mousedown", l), t.addClass(this.__background, "slider"), t.addClass(this.__foreground, "slider-fg"), this.updateDisplay(), this.__background.appendChild(this.__foreground), this.domElement.appendChild(this.__background)
                };
                return r.superclass = e, r.useDefaultStyles = function() {
                    n.inject(o)
                }, i.extend(r.prototype, e.prototype, {
                    updateDisplay: function() {
                        var e = (this.getValue() - this.__min) / (this.__max - this.__min);
                        return this.__foreground.style.width = 100 * e + "%", r.superclass.prototype.updateDisplay.call(this)
                    }
                }), r
            }(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"), dat.controllers.FunctionController = function(e, t, n) {
                var i = function(e, n, o) {
                    i.superclass.call(this, e, n);
                    var s = this;
                    this.__button = document.createElement("div"), this.__button.innerHTML = void 0 === o ? "Fire" : o, t.bind(this.__button, "click", function(e) {
                        return e.preventDefault(), s.fire(), !1
                    }), t.addClass(this.__button, "button"), this.domElement.appendChild(this.__button)
                };
                return i.superclass = e, n.extend(i.prototype, e.prototype, {
                    fire: function() {
                        this.__onChange && this.__onChange.call(this), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.getValue().call(this.object)
                    }
                }), i
            }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.BooleanController = function(e, t, n) {
                var i = function(e, n) {
                    function o() {
                        s.setValue(!s.__prev)
                    }
                    i.superclass.call(this, e, n);
                    var s = this;
                    this.__prev = this.getValue(), this.__checkbox = document.createElement("input"), this.__checkbox.setAttribute("type", "checkbox"), t.bind(this.__checkbox, "change", o, !1), this.domElement.appendChild(this.__checkbox), this.updateDisplay()
                };
                return i.superclass = e, n.extend(i.prototype, e.prototype, {
                    setValue: function(e) {
                        var t = i.superclass.prototype.setValue.call(this, e);
                        return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), t
                    },
                    updateDisplay: function() {
                        return this.getValue() === !0 ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1, i.superclass.prototype.updateDisplay.call(this)
                    }
                }), i
            }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.color.toString = function(e) {
                return function(t) {
                    if (1 == t.a || e.isUndefined(t.a)) {
                        for (var n = t.hex.toString(16); n.length < 6;) n = "0" + n;
                        return "#" + n
                    }
                    return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
                }
            }(dat.utils.common), dat.color.interpret = function(e, t) {
                var n, i, o = function() {
                        i = !1;
                        var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                        return t.each(s, function(o) {
                            return o.litmus(e) ? (t.each(o.conversions, function(o, s) {
                                return n = o.read(e), i === !1 && n !== !1 ? (i = n, n.conversionName = s, n.conversion = o, t.BREAK) : void 0
                            }), t.BREAK) : void 0
                        }), i
                    }, s = [{
                        litmus: t.isString,
                        conversions: {
                            THREE_CHAR_HEX: {
                                read: function(e) {
                                    var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                                    return null === t ? !1 : {
                                        space: "HEX",
                                        hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                                    }
                                },
                                write: e
                            },
                            SIX_CHAR_HEX: {
                                read: function(e) {
                                    var t = e.match(/^#([A-F0-9]{6})$/i);
                                    return null === t ? !1 : {
                                        space: "HEX",
                                        hex: parseInt("0x" + t[1].toString())
                                    }
                                },
                                write: e
                            },
                            CSS_RGB: {
                                read: function(e) {
                                    var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                                    return null === t ? !1 : {
                                        space: "RGB",
                                        r: parseFloat(t[1]),
                                        g: parseFloat(t[2]),
                                        b: parseFloat(t[3])
                                    }
                                },
                                write: e
                            },
                            CSS_RGBA: {
                                read: function(e) {
                                    var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                                    return null === t ? !1 : {
                                        space: "RGB",
                                        r: parseFloat(t[1]),
                                        g: parseFloat(t[2]),
                                        b: parseFloat(t[3]),
                                        a: parseFloat(t[4])
                                    }
                                },
                                write: e
                            }
                        }
                    }, {
                        litmus: t.isNumber,
                        conversions: {
                            HEX: {
                                read: function(e) {
                                    return {
                                        space: "HEX",
                                        hex: e,
                                        conversionName: "HEX"
                                    }
                                },
                                write: function(e) {
                                    return e.hex
                                }
                            }
                        }
                    }, {
                        litmus: t.isArray,
                        conversions: {
                            RGB_ARRAY: {
                                read: function(e) {
                                    return 3 != e.length ? !1 : {
                                        space: "RGB",
                                        r: e[0],
                                        g: e[1],
                                        b: e[2]
                                    }
                                },
                                write: function(e) {
                                    return [e.r, e.g, e.b]
                                }
                            },
                            RGBA_ARRAY: {
                                read: function(e) {
                                    return 4 != e.length ? !1 : {
                                        space: "RGB",
                                        r: e[0],
                                        g: e[1],
                                        b: e[2],
                                        a: e[3]
                                    }
                                },
                                write: function(e) {
                                    return [e.r, e.g, e.b, e.a]
                                }
                            }
                        }
                    }, {
                        litmus: t.isObject,
                        conversions: {
                            RGBA_OBJ: {
                                read: function(e) {
                                    return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a) ? {
                                        space: "RGB",
                                        r: e.r,
                                        g: e.g,
                                        b: e.b,
                                        a: e.a
                                    } : !1
                                },
                                write: function(e) {
                                    return {
                                        r: e.r,
                                        g: e.g,
                                        b: e.b,
                                        a: e.a
                                    }
                                }
                            },
                            RGB_OBJ: {
                                read: function(e) {
                                    return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) ? {
                                        space: "RGB",
                                        r: e.r,
                                        g: e.g,
                                        b: e.b
                                    } : !1
                                },
                                write: function(e) {
                                    return {
                                        r: e.r,
                                        g: e.g,
                                        b: e.b
                                    }
                                }
                            },
                            HSVA_OBJ: {
                                read: function(e) {
                                    return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a) ? {
                                        space: "HSV",
                                        h: e.h,
                                        s: e.s,
                                        v: e.v,
                                        a: e.a
                                    } : !1
                                },
                                write: function(e) {
                                    return {
                                        h: e.h,
                                        s: e.s,
                                        v: e.v,
                                        a: e.a
                                    }
                                }
                            },
                            HSV_OBJ: {
                                read: function(e) {
                                    return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) ? {
                                        space: "HSV",
                                        h: e.h,
                                        s: e.s,
                                        v: e.v
                                    } : !1
                                },
                                write: function(e) {
                                    return {
                                        h: e.h,
                                        s: e.s,
                                        v: e.v
                                    }
                                }
                            }
                        }
                    }];
                return o
            }(dat.color.toString, dat.utils.common), dat.GUI = dat.gui.GUI = function(e, t, n, i, o, s, r, a, l, d, c, u, h, p, f) {
                function m(e, t, n, s) {
                    if (void 0 === t[n]) throw new Error("Object " + t + ' has no property "' + n + '"');
                    var r;
                    if (s.color) r = new c(t, n);
                    else {
                        var a = [t, n].concat(s.factoryArgs);
                        r = i.apply(e, a)
                    }
                    s.before instanceof o && (s.before = s.before.__li), v(e, r), p.addClass(r.domElement, "c");
                    var l = document.createElement("span");
                    p.addClass(l, "property-name"), l.innerHTML = r.property;
                    var d = document.createElement("div");
                    d.appendChild(l), d.appendChild(r.domElement);
                    var u = _(e, d, s.before);
                    return p.addClass(u, N.CLASS_CONTROLLER_ROW), p.addClass(u, typeof r.getValue()), g(e, u, r), e.__controllers.push(r), r
                }

                function _(e, t, n) {
                    var i = document.createElement("li");
                    return t && i.appendChild(t), n ? e.__ul.insertBefore(i, params.before) : e.__ul.appendChild(i), e.onResize(), i
                }

                function g(e, t, n) {
                    if (n.__li = t, n.__gui = e, f.extend(n, {
                        options: function(t) {
                            return arguments.length > 1 ? (n.remove(), m(e, n.object, n.property, {
                                before: n.__li.nextElementSibling,
                                factoryArgs: [f.toArray(arguments)]
                            })) : f.isArray(t) || f.isObject(t) ? (n.remove(), m(e, n.object, n.property, {
                                before: n.__li.nextElementSibling,
                                factoryArgs: [t]
                            })) : void 0
                        },
                        name: function(e) {
                            return n.__li.firstElementChild.firstElementChild.innerHTML = e, n
                        },
                        listen: function() {
                            return n.__gui.listen(n), n
                        },
                        remove: function() {
                            return n.__gui.remove(n), n
                        }
                    }), n instanceof l) {
                        var i = new a(n.object, n.property, {
                            min: n.__min,
                            max: n.__max,
                            step: n.__step
                        });
                        f.each(["updateDisplay", "onChange", "onFinishChange"], function(e) {
                            var t = n[e],
                                o = i[e];
                            n[e] = i[e] = function() {
                                var e = Array.prototype.slice.call(arguments);
                                return t.apply(n, e), o.apply(i, e)
                            }
                        }), p.addClass(t, "has-slider"), n.domElement.insertBefore(i.domElement, n.domElement.firstElementChild)
                    } else if (n instanceof a) {
                        var o = function(t) {
                            return f.isNumber(n.__min) && f.isNumber(n.__max) ? (n.remove(), m(e, n.object, n.property, {
                                before: n.__li.nextElementSibling,
                                factoryArgs: [n.__min, n.__max, n.__step]
                            })) : t
                        };
                        n.min = f.compose(o, n.min), n.max = f.compose(o, n.max)
                    } else n instanceof s ? (p.bind(t, "click", function() {
                        p.fakeEvent(n.__checkbox, "click")
                    }), p.bind(n.__checkbox, "click", function(e) {
                        e.stopPropagation()
                    })) : n instanceof r ? (p.bind(t, "click", function() {
                        p.fakeEvent(n.__button, "click")
                    }), p.bind(t, "mouseover", function() {
                        p.addClass(n.__button, "hover")
                    }), p.bind(t, "mouseout", function() {
                        p.removeClass(n.__button, "hover")
                    })) : n instanceof c && (p.addClass(t, "color"), n.updateDisplay = f.compose(function(e) {
                        return t.style.borderLeftColor = n.__color.toString(), e
                    }, n.updateDisplay), n.updateDisplay());
                    n.setValue = f.compose(function(t) {
                        return e.getRoot().__preset_select && n.isModified() && k(e.getRoot(), !0), t
                    }, n.setValue)
                }

                function v(e, t) {
                    var n = e.getRoot(),
                        i = n.__rememberedObjects.indexOf(t.object);
                    if (-1 != i) {
                        var o = n.__rememberedObjectIndecesToControllers[i];
                        if (void 0 === o && (o = {}, n.__rememberedObjectIndecesToControllers[i] = o), o[t.property] = t, n.load && n.load.remembered) {
                            var s, r = n.load.remembered;
                            if (r[e.preset]) s = r[e.preset];
                            else {
                                if (!r[H]) return;
                                s = r[H]
                            } if (s[i] && void 0 !== s[i][t.property]) {
                                var a = s[i][t.property];
                                t.initialValue = a, t.setValue(a)
                            }
                        }
                    }
                }

                function b(e, t) {
                    return document.location.href + "." + t
                }

                function w(e) {
                    function t() {
                        d.style.display = e.useLocalStorage ? "block" : "none"
                    }
                    var n = e.__save_row = document.createElement("li");
                    p.addClass(e.domElement, "has-save"), e.__ul.insertBefore(n, e.__ul.firstChild), p.addClass(n, "save-row");
                    var i = document.createElement("span");
                    i.innerHTML = "&nbsp;", p.addClass(i, "button gears");
                    var o = document.createElement("span");
                    o.innerHTML = "Save", p.addClass(o, "button"), p.addClass(o, "save");
                    var s = document.createElement("span");
                    s.innerHTML = "New", p.addClass(s, "button"), p.addClass(s, "save-as");
                    var r = document.createElement("span");
                    r.innerHTML = "Revert", p.addClass(r, "button"), p.addClass(r, "revert");
                    var a = e.__preset_select = document.createElement("select");
                    if (e.load && e.load.remembered ? f.each(e.load.remembered, function(t, n) {
                        C(e, n, n == e.preset)
                    }) : C(e, H, !1), p.bind(a, "change", function() {
                        for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].innerHTML = e.__preset_select[t].value;
                        e.preset = this.value
                    }), n.appendChild(a), n.appendChild(i), n.appendChild(o), n.appendChild(s), n.appendChild(r), I) {
                        var l = document.getElementById("dg-save-locally"),
                            d = document.getElementById("dg-local-explain");
                        l.style.display = "block";
                        var c = document.getElementById("dg-local-storage");
                        "true" === localStorage.getItem(b(e, "isLocal")) && c.setAttribute("checked", "checked"), t(), p.bind(c, "change", function() {
                            e.useLocalStorage = !e.useLocalStorage, t()
                        })
                    }
                    var u = document.getElementById("dg-new-constructor");
                    p.bind(u, "keydown", function(e) {
                        !e.metaKey || 67 !== e.which && 67 != e.keyCode || P.hide()
                    }), p.bind(i, "click", function() {
                        u.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2), P.show(), u.focus(), u.select()
                    }), p.bind(o, "click", function() {
                        e.save()
                    }), p.bind(s, "click", function() {
                        var t = prompt("Enter a new preset name.");
                        t && e.saveAs(t)
                    }), p.bind(r, "click", function() {
                        e.revert()
                    })
                }

                function y(e) {
                    function t(t) {
                        return t.preventDefault(), o = t.clientX, p.addClass(e.__closeButton, N.CLASS_DRAG), p.bind(window, "mousemove", n), p.bind(window, "mouseup", i), !1
                    }

                    function n(t) {
                        return t.preventDefault(), e.width += o - t.clientX, e.onResize(), o = t.clientX, !1
                    }

                    function i() {
                        p.removeClass(e.__closeButton, N.CLASS_DRAG), p.unbind(window, "mousemove", n), p.unbind(window, "mouseup", i)
                    }
                    e.__resize_handle = document.createElement("div"), f.extend(e.__resize_handle.style, {
                        width: "6px",
                        marginLeft: "-3px",
                        height: "200px",
                        cursor: "ew-resize",
                        position: "absolute"
                    });
                    var o;
                    p.bind(e.__resize_handle, "mousedown", t), p.bind(e.__closeButton, "mousedown", t), e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild)
                }

                function E(e, t) {
                    e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px")
                }

                function x(e, t) {
                    var n = {};
                    return f.each(e.__rememberedObjects, function(i, o) {
                        var s = {}, r = e.__rememberedObjectIndecesToControllers[o];
                        f.each(r, function(e, n) {
                            s[n] = t ? e.initialValue : e.getValue()
                        }), n[o] = s
                    }), n
                }

                function C(e, t, n) {
                    var i = document.createElement("option");
                    i.innerHTML = t, i.value = t, e.__preset_select.appendChild(i), n && (e.__preset_select.selectedIndex = e.__preset_select.length - 1)
                }

                function A(e) {
                    for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].value == e.preset && (e.__preset_select.selectedIndex = t)
                }

                function k(e, t) {
                    var n = e.__preset_select[e.__preset_select.selectedIndex];
                    n.innerHTML = t ? n.value + "*" : n.value
                }

                function T(e) {
                    0 != e.length && u(function() {
                        T(e)
                    }), f.each(e, function(e) {
                        e.updateDisplay()
                    })
                }
                e.inject(n);
                var P, R, M = "dg",
                    S = 72,
                    O = 20,
                    H = "Default",
                    I = function() {
                        try {
                            return "localStorage" in window && null !== window.localStorage
                        } catch (e) {
                            return !1
                        }
                    }(),
                    L = !0,
                    j = !1,
                    z = [],
                    N = function(e) {
                        function t() {
                            localStorage.setItem(b(i, "gui"), JSON.stringify(i.getSaveObject()))
                        }

                        function n() {
                            var e = i.getRoot();
                            e.width += 1, f.defer(function() {
                                e.width -= 1
                            })
                        }
                        var i = this;
                        this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), p.addClass(this.domElement, M), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], e = e || {}, e = f.defaults(e, {
                            autoPlace: !0,
                            width: N.DEFAULT_WIDTH
                        }), e = f.defaults(e, {
                            resizable: e.autoPlace,
                            hideable: e.autoPlace
                        }), f.isUndefined(e.load) ? e.load = {
                            preset: H
                        } : e.preset && (e.load.preset = e.preset), f.isUndefined(e.parent) && e.hideable && z.push(this), e.resizable = f.isUndefined(e.parent) && e.resizable, e.autoPlace && f.isUndefined(e.scrollable) && (e.scrollable = !0);
                        var o = I && "true" === localStorage.getItem(b(this, "isLocal"));
                        if (Object.defineProperties(this, {
                            parent: {
                                get: function() {
                                    return e.parent
                                }
                            },
                            scrollable: {
                                get: function() {
                                    return e.scrollable
                                }
                            },
                            autoPlace: {
                                get: function() {
                                    return e.autoPlace
                                }
                            },
                            preset: {
                                get: function() {
                                    return i.parent ? i.getRoot().preset : e.load.preset
                                },
                                set: function(t) {
                                    i.parent ? i.getRoot().preset = t : e.load.preset = t, A(this), i.revert()
                                }
                            },
                            width: {
                                get: function() {
                                    return e.width
                                },
                                set: function(t) {
                                    e.width = t, E(i, t)
                                }
                            },
                            name: {
                                get: function() {
                                    return e.name
                                },
                                set: function(t) {
                                    e.name = t, r && (r.innerHTML = e.name)
                                }
                            },
                            closed: {
                                get: function() {
                                    return e.closed
                                },
                                set: function(t) {
                                    e.closed = t, e.closed ? p.addClass(i.__ul, N.CLASS_CLOSED) : p.removeClass(i.__ul, N.CLASS_CLOSED), this.onResize(), i.__closeButton && (i.__closeButton.innerHTML = t ? N.TEXT_OPEN : N.TEXT_CLOSED)
                                }
                            },
                            load: {
                                get: function() {
                                    return e.load
                                }
                            },
                            useLocalStorage: {
                                get: function() {
                                    return o
                                },
                                set: function(e) {
                                    I && (o = e, e ? p.bind(window, "unload", t) : p.unbind(window, "unload", t), localStorage.setItem(b(i, "isLocal"), e))
                                }
                            }
                        }), f.isUndefined(e.parent)) {
                            if (e.closed = !1, p.addClass(this.domElement, N.CLASS_MAIN), p.makeSelectable(this.domElement, !1), I && o) {
                                i.useLocalStorage = !0;
                                var s = localStorage.getItem(b(this, "gui"));
                                s && (e.load = JSON.parse(s))
                            }
                            this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = N.TEXT_CLOSED, p.addClass(this.__closeButton, N.CLASS_CLOSE_BUTTON), this.domElement.appendChild(this.__closeButton), p.bind(this.__closeButton, "click", function() {
                                i.closed = !i.closed
                            })
                        } else {
                            void 0 === e.closed && (e.closed = !0);
                            var r = document.createTextNode(e.name);
                            p.addClass(r, "controller-name");
                            var a = _(i, r),
                                l = function(e) {
                                    return e.preventDefault(), i.closed = !i.closed, !1
                                };
                            p.addClass(this.__ul, N.CLASS_CLOSED), p.addClass(a, "title"), p.bind(a, "click", l), e.closed || (this.closed = !1)
                        }
                        e.autoPlace && (f.isUndefined(e.parent) && (L && (R = document.createElement("div"), p.addClass(R, M), p.addClass(R, N.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(R), L = !1), R.appendChild(this.domElement), p.addClass(this.domElement, N.CLASS_AUTO_PLACE)), this.parent || E(i, e.width)), p.bind(window, "resize", function() {
                            i.onResize()
                        }), p.bind(this.__ul, "webkitTransitionEnd", function() {
                            i.onResize()
                        }), p.bind(this.__ul, "transitionend", function() {
                            i.onResize()
                        }), p.bind(this.__ul, "oTransitionEnd", function() {
                            i.onResize()
                        }), this.onResize(), e.resizable && y(this);
                        i.getRoot();
                        e.parent || n()
                    };
                return N.toggleHide = function() {
                    j = !j, f.each(z, function(e) {
                        e.domElement.style.zIndex = j ? -999 : 999, e.domElement.style.opacity = j ? 0 : 1
                    })
                }, N.CLASS_AUTO_PLACE = "a", N.CLASS_AUTO_PLACE_CONTAINER = "ac", N.CLASS_MAIN = "main", N.CLASS_CONTROLLER_ROW = "cr", N.CLASS_TOO_TALL = "taller-than-window", N.CLASS_CLOSED = "closed", N.CLASS_CLOSE_BUTTON = "close-button", N.CLASS_DRAG = "drag", N.DEFAULT_WIDTH = 245, N.TEXT_CLOSED = "Close Controls", N.TEXT_OPEN = "Open Controls", p.bind(window, "keydown", function(e) {
                    "text" === document.activeElement.type || e.which !== S && e.keyCode != S || N.toggleHide()
                }, !1), f.extend(N.prototype, {
                    add: function(e, t) {
                        return m(this, e, t, {
                            factoryArgs: Array.prototype.slice.call(arguments, 2)
                        })
                    },
                    addColor: function(e, t) {
                        return m(this, e, t, {
                            color: !0
                        })
                    },
                    remove: function(e) {
                        this.__ul.removeChild(e.__li), this.__controllers.slice(this.__controllers.indexOf(e), 1);
                        var t = this;
                        f.defer(function() {
                            t.onResize()
                        })
                    },
                    destroy: function() {
                        this.autoPlace && R.removeChild(this.domElement)
                    },
                    addFolder: function(e) {
                        if (void 0 !== this.__folders[e]) throw new Error('You already have a folder in this GUI by the name "' + e + '"');
                        var t = {
                            name: e,
                            parent: this
                        };
                        t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed, t.load = this.load.folders[e]);
                        var n = new N(t);
                        this.__folders[e] = n;
                        var i = _(this, n.domElement);
                        return p.addClass(i, "folder"), n
                    },
                    open: function() {
                        this.closed = !1
                    },
                    close: function() {
                        this.closed = !0
                    },
                    onResize: function() {
                        var e = this.getRoot();
                        if (e.scrollable) {
                            var t = p.getOffset(e.__ul).top,
                                n = 0;
                            f.each(e.__ul.childNodes, function(t) {
                                e.autoPlace && t === e.__save_row || (n += p.getHeight(t))
                            }), window.innerHeight - t - O < n ? (p.addClass(e.domElement, N.CLASS_TOO_TALL), e.__ul.style.height = window.innerHeight - t - O + "px") : (p.removeClass(e.domElement, N.CLASS_TOO_TALL), e.__ul.style.height = "auto")
                        }
                        e.__resize_handle && f.defer(function() {
                            e.__resize_handle.style.height = e.__ul.offsetHeight + "px"
                        }), e.__closeButton && (e.__closeButton.style.width = e.width + "px")
                    },
                    remember: function() {
                        if (f.isUndefined(P) && (P = new h, P.domElement.innerHTML = t), this.parent) throw new Error("You can only call remember on a top level GUI.");
                        var e = this;
                        f.each(Array.prototype.slice.call(arguments), function(t) {
                            0 == e.__rememberedObjects.length && w(e), -1 == e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t)
                        }), this.autoPlace && E(this, this.width)
                    },
                    getRoot: function() {
                        for (var e = this; e.parent;) e = e.parent;
                        return e
                    },
                    getSaveObject: function() {
                        var e = this.load;
                        return e.closed = this.closed, this.__rememberedObjects.length > 0 && (e.preset = this.preset, e.remembered || (e.remembered = {}), e.remembered[this.preset] = x(this)), e.folders = {}, f.each(this.__folders, function(t, n) {
                            e.folders[n] = t.getSaveObject()
                        }), e
                    },
                    save: function() {
                        this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = x(this), k(this, !1)
                    },
                    saveAs: function(e) {
                        this.load.remembered || (this.load.remembered = {}, this.load.remembered[H] = x(this, !0)), this.load.remembered[e] = x(this), this.preset = e, C(this, e, !0)
                    },
                    revert: function(e) {
                        f.each(this.__controllers, function(t) {
                            this.getRoot().load.remembered ? v(e || this.getRoot(), t) : t.setValue(t.initialValue)
                        }, this), f.each(this.__folders, function(e) {
                            e.revert(e)
                        }), e || k(this.getRoot(), !1)
                    },
                    listen: function(e) {
                        var t = 0 == this.__listening.length;
                        this.__listening.push(e), t && T(this.__listening)
                    }
                }), N
            }(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n", dat.controllers.factory = function(e, t, n, i, o, s, r) {
                return function(a, l) {
                    var d = a[l];
                    return r.isArray(arguments[2]) || r.isObject(arguments[2]) ? new e(a, l, arguments[2]) : r.isNumber(d) ? r.isNumber(arguments[2]) && r.isNumber(arguments[3]) ? new n(a, l, arguments[2], arguments[3]) : new t(a, l, {
                        min: arguments[2],
                        max: arguments[3]
                    }) : r.isString(d) ? new i(a, l) : r.isFunction(d) ? new o(a, l, "") : r.isBoolean(d) ? new s(a, l) : void 0
                }
            }(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function(e, t, n) {
                var i = function(e, n) {
                    function o() {
                        r.setValue(r.__input.value)
                    }

                    function s() {
                        r.__onFinishChange && r.__onFinishChange.call(r, r.getValue())
                    }
                    i.superclass.call(this, e, n);
                    var r = this;
                    this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), t.bind(this.__input, "keyup", o), t.bind(this.__input, "change", o), t.bind(this.__input, "blur", s), t.bind(this.__input, "keydown", function(e) {
                        13 === e.keyCode && this.blur()
                    }), this.updateDisplay(), this.domElement.appendChild(this.__input)
                };
                return i.superclass = e, n.extend(i.prototype, e.prototype, {
                    updateDisplay: function() {
                        return t.isActive(this.__input) || (this.__input.value = this.getValue()), i.superclass.prototype.updateDisplay.call(this)
                    }
                }), i
            }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function(e, t, n, i, o) {
                function s(e, t, n, i) {
                    e.style.background = "", o.each(l, function(o) {
                        e.style.cssText += "background: " + o + "linear-gradient(" + t + ", " + n + " 0%, " + i + " 100%); "
                    })
                }

                function r(e) {
                    e.style.background = "", e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
                }
                var a = function(e, l) {
                    function d(e) {
                        p(e), t.bind(window, "mousemove", p), t.bind(window, "mouseup", c)
                    }

                    function c() {
                        t.unbind(window, "mousemove", p), t.unbind(window, "mouseup", c)
                    }

                    function u() {
                        var e = i(this.value);
                        e !== !1 ? (m.__color.__state = e, m.setValue(m.__color.toOriginal())) : this.value = m.__color.toString()
                    }

                    function h() {
                        t.unbind(window, "mousemove", f), t.unbind(window, "mouseup", h)
                    }

                    function p(e) {
                        e.preventDefault();
                        var n = t.getWidth(m.__saturation_field),
                            i = t.getOffset(m.__saturation_field),
                            o = (e.clientX - i.left + document.body.scrollLeft) / n,
                            s = 1 - (e.clientY - i.top + document.body.scrollTop) / n;
                        return s > 1 ? s = 1 : 0 > s && (s = 0), o > 1 ? o = 1 : 0 > o && (o = 0), m.__color.v = s, m.__color.s = o, m.setValue(m.__color.toOriginal()), !1
                    }

                    function f(e) {
                        e.preventDefault();
                        var n = t.getHeight(m.__hue_field),
                            i = t.getOffset(m.__hue_field),
                            o = 1 - (e.clientY - i.top + document.body.scrollTop) / n;
                        return o > 1 ? o = 1 : 0 > o && (o = 0), m.__color.h = 360 * o, m.setValue(m.__color.toOriginal()), !1
                    }
                    a.superclass.call(this, e, l), this.__color = new n(this.getValue()), this.__temp = new n(0);
                    var m = this;
                    this.domElement = document.createElement("div"), t.makeSelectable(this.domElement, !1), this.__selector = document.createElement("div"), this.__selector.className = "selector", this.__saturation_field = document.createElement("div"), this.__saturation_field.className = "saturation-field", this.__field_knob = document.createElement("div"), this.__field_knob.className = "field-knob", this.__field_knob_border = "2px solid ", this.__hue_knob = document.createElement("div"), this.__hue_knob.className = "hue-knob", this.__hue_field = document.createElement("div"), this.__hue_field.className = "hue-field", this.__input = document.createElement("input"), this.__input.type = "text", this.__input_textShadow = "0 1px 1px ", t.bind(this.__input, "keydown", function(e) {
                        13 === e.keyCode && u.call(this)
                    }), t.bind(this.__input, "blur", u), t.bind(this.__selector, "mousedown", function() {
                        t.addClass(this, "drag").bind(window, "mouseup", function() {
                            t.removeClass(m.__selector, "drag")
                        })
                    });
                    var _ = document.createElement("div");
                    o.extend(this.__selector.style, {
                        width: "122px",
                        height: "102px",
                        padding: "3px",
                        backgroundColor: "#222",
                        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
                    }), o.extend(this.__field_knob.style, {
                        position: "absolute",
                        width: "12px",
                        height: "12px",
                        border: this.__field_knob_border + (this.__color.v < .5 ? "#fff" : "#000"),
                        boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                        borderRadius: "12px",
                        zIndex: 1
                    }), o.extend(this.__hue_knob.style, {
                        position: "absolute",
                        width: "15px",
                        height: "2px",
                        borderRight: "4px solid #fff",
                        zIndex: 1
                    }), o.extend(this.__saturation_field.style, {
                        width: "100px",
                        height: "100px",
                        border: "1px solid #555",
                        marginRight: "3px",
                        display: "inline-block",
                        cursor: "pointer"
                    }), o.extend(_.style, {
                        width: "100%",
                        height: "100%",
                        background: "none"
                    }), s(_, "top", "rgba(0,0,0,0)", "#000"), o.extend(this.__hue_field.style, {
                        width: "15px",
                        height: "100px",
                        display: "inline-block",
                        border: "1px solid #555",
                        cursor: "ns-resize"
                    }), r(this.__hue_field), o.extend(this.__input.style, {
                        outline: "none",
                        textAlign: "center",
                        color: "#fff",
                        border: 0,
                        fontWeight: "bold",
                        textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
                    }), t.bind(this.__saturation_field, "mousedown", d), t.bind(this.__field_knob, "mousedown", d), t.bind(this.__hue_field, "mousedown", function(e) {
                        f(e), t.bind(window, "mousemove", f), t.bind(window, "mouseup", h)
                    }), this.__saturation_field.appendChild(_), this.__selector.appendChild(this.__field_knob), this.__selector.appendChild(this.__saturation_field), this.__selector.appendChild(this.__hue_field), this.__hue_field.appendChild(this.__hue_knob), this.domElement.appendChild(this.__input), this.domElement.appendChild(this.__selector), this.updateDisplay()
                };
                a.superclass = e, o.extend(a.prototype, e.prototype, {
                    updateDisplay: function() {
                        var e = i(this.getValue());
                        if (e !== !1) {
                            var t = !1;
                            o.each(n.COMPONENTS, function(n) {
                                return o.isUndefined(e[n]) || o.isUndefined(this.__color.__state[n]) || e[n] === this.__color.__state[n] ? void 0 : (t = !0, {})
                            }, this), t && o.extend(this.__color.__state, e)
                        }
                        o.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
                        var r = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0,
                            a = 255 - r;
                        o.extend(this.__field_knob.style, {
                            marginLeft: 100 * this.__color.s - 7 + "px",
                            marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                            backgroundColor: this.__temp.toString(),
                            border: this.__field_knob_border + "rgb(" + r + "," + r + "," + r + ")"
                        }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, s(this.__saturation_field, "left", "#fff", this.__temp.toString()), o.extend(this.__input.style, {
                            backgroundColor: this.__input.value = this.__color.toString(),
                            color: "rgb(" + r + "," + r + "," + r + ")",
                            textShadow: this.__input_textShadow + "rgba(" + a + "," + a + "," + a + ",.7)"
                        })
                    }
                });
                var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
                return a
            }(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function(e, t, n, i) {
                function o(e, t, n) {
                    Object.defineProperty(e, t, {
                        get: function() {
                            return "RGB" === this.__state.space ? this.__state[t] : (r(this, t, n), this.__state[t])
                        },
                        set: function(e) {
                            "RGB" !== this.__state.space && (r(this, t, n), this.__state.space = "RGB"), this.__state[t] = e
                        }
                    })
                }

                function s(e, t) {
                    Object.defineProperty(e, t, {
                        get: function() {
                            return "HSV" === this.__state.space ? this.__state[t] : (a(this), this.__state[t])
                        },
                        set: function(e) {
                            "HSV" !== this.__state.space && (a(this), this.__state.space = "HSV"), this.__state[t] = e
                        }
                    })
                }

                function r(e, n, o) {
                    if ("HEX" === e.__state.space) e.__state[n] = t.component_from_hex(e.__state.hex, o);
                    else {
                        if ("HSV" !== e.__state.space) throw "Corrupted color state";
                        i.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                    }
                }

                function a(e) {
                    var n = t.rgb_to_hsv(e.r, e.g, e.b);
                    i.extend(e.__state, {
                        s: n.s,
                        v: n.v
                    }), i.isNaN(n.h) ? i.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = n.h
                }
                var l = function() {
                    if (this.__state = e.apply(this, arguments), this.__state === !1) throw "Failed to interpret color arguments";
                    this.__state.a = this.__state.a || 1
                };
                return l.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], i.extend(l.prototype, {
                    toString: function() {
                        return n(this)
                    },
                    toOriginal: function() {
                        return this.__state.conversion.write(this)
                    }
                }), o(l.prototype, "r", 2), o(l.prototype, "g", 1), o(l.prototype, "b", 0), s(l.prototype, "h"), s(l.prototype, "s"), s(l.prototype, "v"), Object.defineProperty(l.prototype, "a", {
                    get: function() {
                        return this.__state.a
                    },
                    set: function(e) {
                        this.__state.a = e
                    }
                }), Object.defineProperty(l.prototype, "hex", {
                    get: function() {
                        return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
                    },
                    set: function(e) {
                        this.__state.space = "HEX", this.__state.hex = e
                    }
                }), l
            }(dat.color.interpret, dat.color.math = function() {
                var e;
                return {
                    hsv_to_rgb: function(e, t, n) {
                        var i = Math.floor(e / 60) % 6,
                            o = e / 60 - Math.floor(e / 60),
                            s = n * (1 - t),
                            r = n * (1 - o * t),
                            a = n * (1 - (1 - o) * t),
                            l = [
                                [n, a, s],
                                [r, n, s],
                                [s, n, a],
                                [s, r, n],
                                [a, s, n],
                                [n, s, r]
                            ][i];
                        return {
                            r: 255 * l[0],
                            g: 255 * l[1],
                            b: 255 * l[2]
                        }
                    },
                    rgb_to_hsv: function(e, t, n) {
                        var i, o, s = Math.min(e, t, n),
                            r = Math.max(e, t, n),
                            a = r - s;
                        return 0 == r ? {
                            h: 0 / 0,
                            s: 0,
                            v: 0
                        } : (o = a / r, i = e == r ? (t - n) / a : t == r ? 2 + (n - e) / a : 4 + (e - t) / a, i /= 6, 0 > i && (i += 1), {
                            h: 360 * i,
                            s: o,
                            v: r / 255
                        })
                    },
                    rgb_to_hex: function(e, t, n) {
                        var i = this.hex_with_component(0, 2, e);
                        return i = this.hex_with_component(i, 1, t), i = this.hex_with_component(i, 0, n)
                    },
                    component_from_hex: function(e, t) {
                        return e >> 8 * t & 255
                    },
                    hex_with_component: function(t, n, i) {
                        return i << (e = 8 * n) | t & ~(255 << e)
                    }
                }
            }(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function() {
                return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                }
            }(), dat.dom.CenteredDiv = function(e, t) {
                var n = function() {
                    this.backgroundElement = document.createElement("div"), t.extend(this.backgroundElement.style, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        top: 0,
                        left: 0,
                        display: "none",
                        zIndex: "1000",
                        opacity: 0,
                        WebkitTransition: "opacity 0.2s linear"
                    }), e.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), t.extend(this.domElement.style, {
                        position: "fixed",
                        display: "none",
                        zIndex: "1001",
                        opacity: 0,
                        WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
                    }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
                    var n = this;
                    e.bind(this.backgroundElement, "click", function() {
                        n.hide()
                    })
                };
                return n.prototype.show = function() {
                    var e = this;
                    this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), t.defer(function() {
                        e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)"
                    })
                }, n.prototype.hide = function() {
                    var t = this,
                        n = function() {
                            t.domElement.style.display = "none", t.backgroundElement.style.display = "none", e.unbind(t.domElement, "webkitTransitionEnd", n), e.unbind(t.domElement, "transitionend", n), e.unbind(t.domElement, "oTransitionEnd", n)
                        };
                    e.bind(this.domElement, "webkitTransitionEnd", n), e.bind(this.domElement, "transitionend", n), e.bind(this.domElement, "oTransitionEnd", n), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)"
                }, n.prototype.layout = function() {
                    this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + "px"
                }, n
            }(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common)
        }, {}
    ],
    9: [
        function() {
            ! function() {
                shell404.canvasMode && !Modernizr.canvas || !shell404.canvasMode && !Modernizr.webgl || ($("#container .fallback").hide(), shell404.init(), shell404.update())
            }()
        }, {}
    ]
}, {}, [1]);
