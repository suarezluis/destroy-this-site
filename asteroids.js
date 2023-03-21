!function() {
    function Asteroids() {
        function Vector(t, e) {
            "Object" == typeof t ? (this.x = t.x,
            this.y = t.y) : (this.x = t,
            this.y = e)
        }
        function Line(t, e) {
            this.p1 = t,
            this.p2 = e
        }
        function updateEnemyIndex() {
            for (var t, e = 0; t = that.enemies[e]; e++)
                removeClass(t, "ASTEROIDSYEAHENEMY");
            var i = document.body.getElementsByTagName("*");
            that.enemies = [];
            for (var s, e = 0; s = i[e]; e++)
                -1 == indexOf(ignoredTypes, s.tagName.toUpperCase()) && "g_vml_" != s.prefix && hasOnlyTextualChildren(s) && "ASTEROIDSYEAH" != s.className && s.offsetHeight > 0 && (s.aSize = size(s),
                that.enemies.push(s),
                addClass(s, "ASTEROIDSYEAHENEMY"),
                s.aAdded || (s.aAdded = !0,
                that.totalEnemies++))
        }
        function radians(t) {
            return .0174532925 * t
        }
        function degrees(t) {
            return 57.2957795 * t
        }
        function random(t, e) {
            return Math.floor(Math.random() * (e + 1) + t)
        }
        function code(t) {
            var e = {
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                esc: 27
            };
            return e[t] ? e[t] : t.charCodeAt(0)
        }
        function boundsCheck(t) {
            t.x > w ? t.x = 0 : t.x < 0 && (t.x = w),
            t.y > h ? t.y = 0 : t.y < 0 && (t.y = h)
        }
        function size(t) {
            var e = t
              , i = 0
              , s = 0;
            do {
                i += e.offsetLeft || 0,
                s += e.offsetTop || 0,
                e = e.offsetParent
            } while (e);
            return {
                x: i,
                y: s,
                width: t.offsetWidth || 10,
                height: t.offsetHeight || 10
            }
        }
        function addEvent(t, e, i) {
            t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && (t["e" + e + i] = i,
            t[e + i] = function() {
                t["e" + e + i](window.event)
            }
            ,
            t.attachEvent("on" + e, t[e + i]))
        }
        function removeEvent(t, e, i) {
            t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && (t.detachEvent("on" + e, t[e + i]),
            t[e + i] = null,
            t["e" + e + i] = null)
        }
        function arrayRemove(t, e, i) {
            var s = t.slice((i || e) + 1 || t.length);
            return t.length = e < 0 ? t.length + e : e,
            t.push.apply(t, s)
        }
        function applyVisibility(t) {
            for (var e, i = 0; e = window.ASTEROIDSPLAYERS[i]; i++)
                e.gameContainer.style.visibility = t
        }
        function getElementFromPoint(t, e) {
            applyVisibility("hidden");
            var i = document.elementFromPoint(t, e);
            return i ? (3 == i.nodeType && (i = i.parentNode),
            applyVisibility("visible"),
            i) : (applyVisibility("visible"),
            !1)
        }
        function addParticles(t) {
            for (var e = (new Date).getTime(), i = maxParticles, s = 0; s < i; s++)
                that.particles.push({
                    dir: new Vector(20 * Math.random() - 10,20 * Math.random() - 10).normalize(),
                    pos: t.cp(),
                    cameAlive: e
                })
        }
        function setScore() {
            that.points.innerHTML = 10 * window.ASTEROIDS.enemiesKilled
        }
        function hasOnlyTextualChildren(t) {
            if (t.offsetLeft < -100 && t.offsetWidth > 0 && t.offsetHeight > 0)
                return !1;
            if (-1 != indexOf(hiddenTypes, t.tagName))
                return !0;
            if (0 == t.offsetWidth && 0 == t.offsetHeight)
                return !1;
            for (var e = 0; e < t.childNodes.length; e++)
                if (-1 == indexOf(hiddenTypes, t.childNodes[e].tagName) && 0 != t.childNodes[e].childNodes.length)
                    return !1;
            return !0
        }
        function indexOf(t, e, i) {
            if (t.indexOf)
                return t.indexOf(e, i);
            for (var s = t.length, n = i < 0 ? Math.max(0, s + i) : i || 0; n < s; n++)
                if (t[n] === e)
                    return n;
            return -1
        }
        function addClass(t, e) {
            -1 == t.className.indexOf(e) && (t.className = (t.className + " " + e).replace(/\s+/g, " ").replace(/^\s+|\s+$/g, ""))
        }
        function removeClass(t, e) {
            t.className = t.className.replace(new RegExp("(^|\\s)" + e + "(?:\\s|$)"), "$1")
        }
        function addStylesheet(t, e) {
            var i = document.createElement("style");
            i.type = "text/css",
            i.rel = "stylesheet",
            i.id = "ASTEROIDSYEAHSTYLES";
            try {
                i.innerHTML = t + "{" + e + "}"
            } catch (s) {
                i.styleSheet.addRule(t, e)
            }
            document.getElementsByTagName("head")[0].appendChild(i)
        }
        function removeStylesheet(t) {
            var e = document.getElementById(t);
            e && e.parentNode.removeChild(e)
        }
        function destroy() {
            removeEvent(document, "keydown", eventKeydown),
            removeEvent(document, "keypress", eventKeypress),
            removeEvent(document, "keyup", eventKeyup),
            removeEvent(window, "resize", eventResize),
            isRunning = !1,
            removeStylesheet("ASTEROIDSYEAHSTYLES"),
            removeClass(document.body, "ASTEROIDSYEAH"),
            this.gameContainer.parentNode.removeChild(this.gameContainer)
        }
        window.ASTEROIDS || (window.ASTEROIDS = {
            enemiesKilled: 0
        }),
        Vector.prototype = {
            cp: function() {
                return new Vector(this.x,this.y)
            },
            mul: function(t) {
                return this.x *= t,
                this.y *= t,
                this
            },
            mulNew: function(t) {
                return new Vector(this.x * t,this.y * t)
            },
            add: function(t) {
                return this.x += t.x,
                this.y += t.y,
                this
            },
            addNew: function(t) {
                return new Vector(this.x + t.x,this.y + t.y)
            },
            sub: function(t) {
                return this.x -= t.x,
                this.y -= t.y,
                this
            },
            subNew: function(t) {
                return new Vector(this.x - t.x,this.y - t.y)
            },
            rotate: function(t) {
                var e = this.x
                  , i = this.y;
                return this.x = e * Math.cos(t) - Math.sin(t) * i,
                this.y = e * Math.sin(t) + Math.cos(t) * i,
                this
            },
            rotateNew: function(t) {
                return this.cp().rotate(t)
            },
            setAngle: function(t) {
                var e = this.len();
                return this.x = Math.cos(t) * e,
                this.y = Math.sin(t) * e,
                this
            },
            setAngleNew: function(t) {
                return this.cp().setAngle(t)
            },
            setLength: function(t) {
                var e = this.len();
                return e ? this.mul(t / e) : this.x = this.y = t,
                this
            },
            setLengthNew: function(t) {
                return this.cp().setLength(t)
            },
            normalize: function() {
                var t = this.len();
                return this.x /= t,
                this.y /= t,
                this
            },
            normalizeNew: function() {
                return this.cp().normalize()
            },
            angle: function() {
                return Math.atan2(this.y, this.x)
            },
            collidesWith: function(t) {
                return this.x > t.x && this.y > t.y && this.x < t.x + t.width && this.y < t.y + t.height
            },
            len: function() {
                var t = Math.sqrt(this.x * this.x + this.y * this.y);
                return t < .005 && t > -.005 ? 0 : t
            },
            is: function(t) {
                return "object" == typeof t && this.x == t.x && this.y == t.y
            },
            toString: function() {
                return "[Vector(" + this.x + ", " + this.y + ") angle: " + this.angle() + ", length: " + this.len() + "]"
            }
        },
        Line.prototype = {
            shift: function(t) {
                this.p1.add(t),
                this.p2.add(t)
            },
            intersectsWithRect: function(t) {
                var e = new Vector(t.x,t.y + t.height)
                  , i = new Vector(t.x,t.y)
                  , s = new Vector(t.x + t.width,t.y + t.height)
                  , n = new Vector(t.x + t.width,t.y);
                return this.p1.x > e.x && this.p1.x < n.x && this.p1.y < e.y && this.p1.y > n.y && this.p2.x > e.x && this.p2.x < n.x && this.p2.y < e.y && this.p2.y > n.y || (!!this.intersectsLine(new Line(i,e)) || (!!this.intersectsLine(new Line(e,s)) || (!!this.intersectsLine(new Line(i,n)) || !!this.intersectsLine(new Line(n,s)))))
            },
            intersectsLine: function(t) {
                var e = this.p1
                  , i = this.p2
                  , s = t.p1
                  , n = t.p2
                  , o = (n.y - s.y) * (i.x - e.x) - (n.x - s.x) * (i.y - e.y)
                  , a = (n.x - s.x) * (e.y - s.y) - (n.y - s.y) * (e.x - s.x)
                  , r = (i.x - e.x) * (e.y - s.y) - (i.y - e.y) * (e.x - s.x);
                if (0 == o)
                    return !1;
                var h = a / o
                  , l = r / o;
                return h >= 0 && h <= 1 && l >= 0 && l <= 1
            }
        };
        var that = this
          , isIE = !!window.ActiveXObject
          , isIEQuirks = isIE && "BackCompat" == document.compatMode
          , w = document.documentElement.clientWidth
          , h = document.documentElement.clientHeight;
        isIEQuirks && (w = document.body.clientWidth,
        h = document.body.clientHeight);
        var playerWidth = 20
          , playerHeight = 30
          , playerVerts = [[-15, -10], [-15, 10], [15, 0]]
          , ignoredTypes = ["HTML", "HEAD", "BODY", "SCRIPT", "TITLE", "META", "STYLE", "LINK"];
        window.ActiveXObject && (ignoredTypes = ["HTML", "HEAD", "BODY", "SCRIPT", "TITLE", "META", "STYLE", "LINK", "SHAPE", "LINE", "GROUP", "IMAGE", "STROKE", "FILL", "SKEW", "PATH", "TEXTPATH", "INS"]);
        var hiddenTypes = ["BR", "HR"]
          , FPS = 50
          , acc = 300
          , maxSpeed = 600
          , rotSpeed = 360
          , bulletSpeed = 700
          , particleSpeed = 400
          , timeBetweenFire = 150
          , timeBetweenBlink = 250
          , timeBetweenEnemyUpdate = isIE ? 1e4 : 2e3
          , bulletRadius = 2
          , maxParticles = isIE ? 20 : 40
          , maxBullets = isIE ? 10 : 20;
        this.flame = {
            r: [],
            y: []
        },
        this.toggleBlinkStyle = function() {
            this.updated.blink.isActive ? removeClass(document.body, "ASTEROIDSBLINK") : addClass(document.body, "ASTEROIDSBLINK"),
            this.updated.blink.isActive = !this.updated.blink.isActive
        }
        ,
        function(t, e) {
            var i = document.createElement("style");
            i.type = "text/css",
            i.rel = "stylesheet",
            i.id = "ASTEROIDSYEAHSTYLES";
            try {
                i.innerHTML = t + "{" + e + "}"
            } catch (s) {
                i.styleSheet.addRule(t, e)
            }
            document.getElementsByTagName("head")[0].appendChild(i)
        }(".ASTEROIDSBLINK .ASTEROIDSYEAHENEMY", "outline: 2px dotted red;"),
        this.pos = new Vector(100,100),
        this.lastPos = !1,
        this.vel = new Vector(0,0),
        this.dir = new Vector(0,1),
        this.keysPressed = {},
        this.firedAt = !1,
        this.updated = {
            enemies: !1,
            flame: (new Date).getTime(),
            blink: {
                time: 0,
                isActive: !1
            }
        },
        this.scrollPos = new Vector(0,0),
        this.bullets = [],
        this.enemies = [],
        this.dying = [],
        this.totalEnemies = 0,
        this.particles = [],
        updateEnemyIndex();
        var createFlames;
        with (function() {
            createFlames = function() {
                that.flame.r = [[-15, -10]],
                that.flame.y = [[-15, -6]];
                for (var t = 0; t < 20; t += 2)
                    that.flame.r.push([-random(2, 7) - 15, t - 10]);
                that.flame.r.push([-15, 10]);
                for (var t = 0; t < 12; t += 12 * .2)
                    that.flame.y.push([-random(2, 7) - 15, t - 6]);
                that.flame.y.push([-15, 6])
            }
        }(),
        createFlames(),
        this.gameContainer = document.createElement("div"),
        this.gameContainer.className = "ASTEROIDSYEAH",
        document.body.appendChild(this.gameContainer),
        this.canvas = document.createElement("canvas"),
        this.canvas.setAttribute("width", w),
        this.canvas.setAttribute("height", h),
        this.canvas.className = "ASTEROIDSYEAH",
        this.canvas.style)
            width = w + "px",
            height = h + "px",
            position = "fixed",
            top = "0px",
            left = "0px",
            bottom = "0px",
            right = "0px",
            zIndex = "10000";
        "undefined" != typeof G_vmlCanvasManager ? (this.canvas = G_vmlCanvasManager.initElement(this.canvas),
        this.canvas.getContext || alert("So... you're using IE?  Please join me at http://github.com/erkie/erkie.github.com if you think you can help")) : this.canvas.getContext || alert("This program does not yet support your browser. Please join me at http://github.com/erkie/erkie.github.com if you think you can help"),
        addEvent(this.canvas, "mousedown", function(t) {
            t = t || window.event;
            var e = document.createElement("span");
            e.style.position = "absolute",
            e.style.border = "1px solid #999",
            e.style.background = "white",
            e.style.color = "black",
            e.innerHTML = "Press Esc to quit",
            document.body.appendChild(e);
            var i = t.pageX || t.clientX + document.documentElement.scrollLeft
              , s = t.pageY || t.clientY + document.documentElement.scrollTop;
            e.style.left = i - e.offsetWidth / 2 + "px",
            e.style.top = s - e.offsetHeight / 2 + "px",
            setTimeout(function() {
                try {
                    e.parentNode.removeChild(e)
                } catch (t) {}
            }, 1e3)
        });
        var eventResize = function() {
            if (isIE)
                w = document.documentElement.clientWidth,
                h = document.documentElement.clientHeight,
                isIEQuirks && (w = document.body.clientWidth,
                h = document.body.clientHeight),
                that.canvas.setAttribute("width", w),
                that.canvas.setAttribute("height", h);
            else
                with (that.canvas.style.display = "none",
                w = document.documentElement.clientWidth,
                h = document.documentElement.clientHeight,
                that.canvas.setAttribute("width", w),
                that.canvas.setAttribute("height", h),
                that.canvas.style)
                    display = "block",
                    width = w + "px",
                    height = h + "px"
        };
        if (addEvent(window, "resize", eventResize),
        this.gameContainer.appendChild(this.canvas),
        this.ctx = this.canvas.getContext("2d"),
        this.ctx.fillStyle = "red",
        this.ctx.strokeStyle = "black",
        document.getElementById("ASTEROIDS-NAVIGATION"))
            this.navigation = document.getElementById("ASTEROIDS-NAVIGATION"),
            this.points = document.getElementById("ASTEROIDS-POINTS");
        else {
            with (this.navigation = document.createElement("div"),
            this.navigation.id = "ASTEROIDS-NAVIGATION",
            this.navigation.className = "ASTEROIDSYEAH",
            this.navigation.style)
                fontFamily = "Arial,sans-serif",
                position = "fixed",
                zIndex = "10001",
                top = "3px",
                left = "10px",
                padding = "0 5px 0 5px",
                border = "1px solid #aaa",
                backgroundColor = "#eee",
                color = "blue",
                textAlign = "right";
            this.navigation.innerHTML = "Use arrow keys to move, spacebar to shoot. Click or press Esc key to exit. Score:  ",
            this.gameContainer.appendChild(this.navigation),
            this.points = document.createElement("span"),
            this.points.id = "ASTEROIDS-POINTS",
            this.points.style.font = "28pt Arial, sans-serif",
            this.points.style.fontWeight = "bold",
            this.points.className = "ASTEROIDSYEAH",
            this.navigation.appendChild(this.points)
        }
        if (isIEQuirks && (this.gameContainer.style.position = this.canvas.style.position = this.navigation.style.position = "absolute"),
        setScore(),
        "undefined" != typeof G_vmlCanvasManager)
            for (var children = this.canvas.getElementsByTagName("*"), i = 0, c; c = children[i]; i++)
                addClass(c, "ASTEROIDSYEAH");
        var eventKeydown = function(t) {
            switch (t = t || window.event,
            that.keysPressed[t.keyCode] = !0,
            t.keyCode) {
            case code(" "):
                that.firedAt = 1
            }
            if (-1 != indexOf([code("up"), code("down"), code("right"), code("left"), code(" "), code("B"), code("W"), code("A"), code("S"), code("D")], t.keyCode))
                return t.preventDefault && t.preventDefault(),
                t.stopPropagation && t.stopPropagation(),
                t.returnValue = !1,
                t.cancelBubble = !0,
                !1
        };
        addEvent(document, "keydown", eventKeydown);
        var eventKeypress = function(t) {
            if (t = t || window.event,
            -1 != indexOf([code("up"), code("down"), code("right"), code("left"), code(" "), code("W"), code("A"), code("S"), code("D")], t.keyCode || t.which))
                return t.preventDefault && t.preventDefault(),
                t.stopPropagation && t.stopPropagation(),
                t.returnValue = !1,
                t.cancelBubble = !0,
                !1
        };
        addEvent(document, "keypress", eventKeypress);
        var eventKeyup = function(t) {
            if (t = t || window.event,
            that.keysPressed[t.keyCode] = !1,
            -1 != indexOf([code("up"), code("down"), code("right"), code("left"), code(" "), code("B"), code("W"), code("A"), code("S"), code("D")], t.keyCode))
                return t.preventDefault && t.preventDefault(),
                t.stopPropagation && t.stopPropagation(),
                t.returnValue = !1,
                t.cancelBubble = !0,
                !1
        };
        addEvent(document, "keyup", eventKeyup),
        this.ctx.clear = function() {
            this.clearRect(0, 0, w, h)
        }
        ,
        this.ctx.clear(),
        this.ctx.drawLine = function(t, e, i, s) {
            this.beginPath(),
            this.moveTo(t, e),
            this.lineTo(i, s),
            this.lineTo(i + 1, s + 1),
            this.closePath(),
            this.fill()
        }
        ,
        this.ctx.tracePoly = function(t) {
            this.beginPath(),
            this.moveTo(t[0][0], t[0][1]);
            for (var e = 1; e < t.length; e++)
                this.lineTo(t[e][0], t[e][1]);
            this.closePath()
        }
        ,
        this.ctx.drawPlayer = function() {
            this.save(),
            this.translate(that.pos.x, that.pos.y),
            this.rotate(that.dir.angle()),
            this.tracePoly(playerVerts),
            this.fillStyle = "white",
            this.fill(),
            this.tracePoly(playerVerts),
            this.stroke(),
            this.restore()
        }
        ;
        var PI_SQ = 2 * Math.PI;
        this.ctx.drawBullets = function(t) {
            for (var e = 0; e < t.length; e++)
                this.beginPath(),
                this.arc(t[e].pos.x, t[e].pos.y, 2, 0, PI_SQ, !0),
                this.closePath(),
                this.fill()
        }
        ;
        var randomParticleColor = function() {
            return ["red", "yellow"][random(0, 1)]
        };
        this.ctx.drawParticles = function(t) {
            for (var e = this.fillStyle, i = 0; i < t.length; i++)
                this.fillStyle = randomParticleColor(),
                this.drawLine(t[i].pos.x, t[i].pos.y, t[i].pos.x - 10 * t[i].dir.x, t[i].pos.y - 10 * t[i].dir.y);
            this.fillStyle = e
        }
        ,
        this.ctx.drawFlames = function(t) {
            this.save(),
            this.translate(that.pos.x, that.pos.y),
            this.rotate(that.dir.angle());
            var e = this.strokeStyle;
            this.strokeStyle = "red",
            this.tracePoly(t.r),
            this.stroke(),
            this.strokeStyle = "yellow",
            this.tracePoly(t.y),
            this.stroke(),
            this.strokeStyle = e,
            this.restore()
        }
        ;
        try {
            window.focus()
        } catch (t) {}
        addParticles(this.pos),
        addClass(document.body, "ASTEROIDSYEAH");
        var isRunning = !0
          , lastUpdate = (new Date).getTime();
        this.update = function() {
            var t = !1
              , e = (new Date).getTime()
              , i = (e - lastUpdate) / 1e3;
            lastUpdate = e;
            var s = !1;
            if (e - this.updated.flame > 50 && (createFlames(),
            this.updated.flame = e),
            this.scrollPos.x = window.pageXOffset || document.documentElement.scrollLeft,
            this.scrollPos.y = window.pageYOffset || document.documentElement.scrollTop,
            this.keysPressed[code("up")] || this.keysPressed[code("W")] ? (this.vel.add(this.dir.mulNew(300 * i)),
            s = !0) : this.vel.mul(.96),
            (this.keysPressed[code("left")] || this.keysPressed[code("A")]) && (t = !0,
            this.dir.rotate(radians(360 * i * -1))),
            (this.keysPressed[code("right")] || this.keysPressed[code("D")]) && (t = !0,
            this.dir.rotate(radians(360 * i))),
            this.keysPressed[code(" ")] && e - this.firedAt > 150 && (this.bullets.unshift({
                dir: this.dir.cp(),
                pos: this.pos.cp(),
                startVel: this.vel.cp(),
                cameAlive: e
            }),
            this.firedAt = e,
            this.bullets.length > maxBullets && this.bullets.pop()),
            this.keysPressed[code("B")] ? (this.updated.enemies || (updateEnemyIndex(),
            this.updated.enemies = !0),
            t = !0,
            this.updated.blink.time += 1e3 * i,
            this.updated.blink.time > 250 && (this.toggleBlinkStyle(),
            this.updated.blink.time = 0)) : this.updated.enemies = !1,
            this.keysPressed[code("esc")])
                return void destroy.apply(this);
            this.vel.len() > 600 && this.vel.setLength(600),
            this.pos.add(this.vel.mulNew(i)),
            this.pos.x > w ? (window.scrollTo(this.scrollPos.x + 50, this.scrollPos.y),
            this.pos.x = 0) : this.pos.x < 0 && (window.scrollTo(this.scrollPos.x - 50, this.scrollPos.y),
            this.pos.x = w),
            this.pos.y > h ? (window.scrollTo(this.scrollPos.x, this.scrollPos.y + .75 * h),
            this.pos.y = 0) : this.pos.y < 0 && (window.scrollTo(this.scrollPos.x, this.scrollPos.y - .75 * h),
            this.pos.y = h);
            for (var n = this.bullets.length - 1; n >= 0; n--)
                if (e - this.bullets[n].cameAlive > 2e3)
                    this.bullets.splice(n, 1),
                    t = !0;
                else {
                    var o = this.bullets[n].dir.setLengthNew(700 * i).add(this.bullets[n].startVel.mulNew(i));
                    this.bullets[n].pos.add(o),
                    boundsCheck(this.bullets[n].pos);
                    var a = getElementFromPoint(this.bullets[n].pos.x, this.bullets[n].pos.y);
                    a && a.tagName && -1 == indexOf(ignoredTypes, a.tagName.toUpperCase()) && hasOnlyTextualChildren(a) && "ASTEROIDSYEAH" != a.className && (didKill = !0,
                    addParticles(this.bullets[n].pos),
                    this.dying.push(a),
                    this.bullets.splice(n, 1))
                }
            if (this.dying.length) {
                for (var n = this.dying.length - 1; n >= 0; n--)
                    try {
                        this.dying[n].parentNode && window.ASTEROIDS.enemiesKilled++,
                        this.dying[n].parentNode.removeChild(this.dying[n])
                    } catch (t) {}
                setScore(),
                this.dying = []
            }
            for (var n = this.particles.length - 1; n >= 0; n--)
                this.particles[n].pos.add(this.particles[n].dir.mulNew(400 * i * Math.random())),
                e - this.particles[n].cameAlive > 1e3 && (this.particles.splice(n, 1),
                t = !0);
            isIEQuirks && (this.gameContainer.style.left = this.canvas.style.left = document.documentElement.scrollLeft + "px",
            this.gameContainer.style.top = this.canvas.style.top = document.documentElement.scrollTop + "px",
            this.navigation.style.right = "10px",
            this.navigation.style.top = document.documentElement.scrollTop + document.body.clientHeight - this.navigation.clientHeight - 10 + "px"),
            (t || 0 != this.bullets.length || 0 != this.particles.length || !this.pos.is(this.lastPos) || this.vel.len() > 0) && (this.ctx.clear(),
            this.ctx.drawPlayer(),
            s && this.ctx.drawFlames(that.flame),
            this.bullets.length && this.ctx.drawBullets(this.bullets),
            this.particles.length && this.ctx.drawParticles(this.particles)),
            this.lastPos = this.pos
        }
        ;
        var updateFunc = function() {
            try {
                that.update.call(that)
            } catch (t) {
                throw clearInterval(interval),
                t
            }
        }
          , interval = setInterval(updateFunc, 20)
    }
    if (window.ASTEROIDSPLAYERS || (window.ASTEROIDSPLAYERS = []),
    window.ActiveXObject && !document.createElement("canvas").getContext) {
        try {
            var xamlScript = document.createElement("script");
            xamlScript.setAttribute("type", "text/xaml"),
            xamlScript.textContent = '<?xml version="1.0"?><Canvas xmlns="http://schemas.microsoft.com/client/2007"></Canvas>',
            document.getElementsByTagName("head")[0].appendChild(xamlScript)
        } catch (t) {}
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript"),
        script.onreadystatechange = function() {
            "loaded" != script.readyState && "complete" != script.readyState || "undefined" != typeof G_vmlCanvasManager && (window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] = new Asteroids)
        }
        ,
        script.src = "http://erkie.github.com/excanvas.js",
        document.getElementsByTagName("head")[0].appendChild(script)
    } else
        window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] = new Asteroids
}();
