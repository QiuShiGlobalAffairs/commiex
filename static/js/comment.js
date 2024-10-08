! function(e, t) {
    if ("function" == typeof define && define.amd) define("Waline", ["exports"], t);
    else if ("undefined" != typeof exports) t(exports);
    else {
        var n = {
            exports: {}
        };
        t(n.exports), e.Waline = n.exports
    }
}("undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : this, (function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.version = e.pageviewCount = e.init = e.defaultLocales = e.commentCount = e.RecentComments = void 0;
    const t = ["nick", "mail", "link"],
        n = e => e.filter((e => t.includes(e))),
        r = "zh-CN",
        l = e => new Promise(((t, n) => {
            if (e.size > 128e3) return n(new Error("File too large! File size limit 128KB"));
            const r = new FileReader;
            r.readAsDataURL(e), r.onload = () => {
                var e;
                return t((null === (e = r.result) || void 0 === e ? void 0 : e.toString()) || "")
            }, r.onerror = n
        })),
        i = e => !0 === e ? '<p class="wl-tex">Tex is not available in preview</p>' : '<span class="wl-tex">Tex is not available in preview</span>',
        o = () => {
            const e = {
                    next: ""
                },
                t = e => {
                    let {
                        keyword: t,
                        pos: n
                    } = e;
                    const r = new URLSearchParams("media_filter=minimal");
                    return r.set("key", "PAY5JLFIH6V6"), r.set("limit", "20"), r.set("pos", n || ""), r.set("q", t), fetch(`https://g.tenor.com/v1/search?${r.toString()}`, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((e => e.json())).catch((() => ({
                        next: n || "",
                        results: []
                    })))
                };
            return {
                search: function() {
                    let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    return t({
                        keyword: n
                    }).then((t => (e.next = t.next, t.results.map((e => ({
                        title: e.title,
                        src: e.media[0].tinygif.url
                    }))))))
                },
                more: n => t({
                    keyword: n,
                    pos: e.next
                }).then((t => (e.next = t.next, t.results.map((e => ({
                    title: e.title,
                    src: e.media[0].tinygif.url
                }))))))
            }
        },
        s = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"],
        a = new RegExp(`(${/[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/.source}|${/</.source})|((?:${/(?:^|\s)\/\/(.+?)$/gm.source})|(?:${/\/\*([\S\s]*?)\*\//gm.source}))`, "gmi"),
        c = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"],
        u = {},
        p = e => {
            let t = 0;
            return e.replace(a, ((e, n, r) => {
                if (r) return `<span style="color: slategray">${r}</span>`;
                if ("<" === n) return "&lt;";
                let l;
                u[n] ? l = u[n] : (l = c[t], u[n] = l);
                const i = `<span style="color: #${l}">${n}</span>`;
                return t = ++t % c.length, i
            }))
        },
        d = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"],
        h = e => Object.fromEntries(e.map(((e, t) => [d[t], e])));
    var f = h(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", "Please input comments between $0 and $1 words!\n Current word number: $2", "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]),
        g = h(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", "コメントは $0 から $1 ワードの間でなければなりません!\n 現在の単語番号: $2", "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]),
        m = h(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", "评论字数应在 $0 到 $1 字之间！\n当前字数：$2", "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]),
        v = h(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎評論", "來發評論吧~", "提交", "喜歡", "取消喜歡", "回覆", "取消回覆", "評論", "刷新", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登錄", "退出", "博主", "置頂", "字", "評論字數應在 $0 到 $1 字之間！\n當前字數：$2", "匿名", "潛水", "冒泡", "吐槽", "活躍", "話癆", "傳說", "表情包", "搜索表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "按倒序", "按正序", "按熱度", "你認為這篇文章怎麼樣？"]),
        y = h(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", "Favor enviar comentário com $0 a $1 palavras!\n Número de palavras atuais: $2", "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]),
        w = h(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", "Пожалуйста, введите комментарии от $0 до $1 слов!\nНомер текущего слова: $2", "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
    const b = {
        zh: m,
        "zh-cn": m,
        "zh-CN": m,
        "zh-tw": v,
        "zh-TW": v,
        en: f,
        "en-US": f,
        "en-us": f,
        jp: g,
        "jp-jp": g,
        "jp-JP": g,
        "pt-br": y,
        "pt-BR": y,
        ru: w,
        "ru-ru": w,
        "ru-RU": w
    };
    e.defaultLocales = b;
    const k = {
            "Content-Type": "application/json"
        },
        x = function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            if ("object" == typeof e && e.errno) throw new TypeError(`Fetch ${t} failed with ${e.errno}: ${e.errmsg}`);
            return e
        },
        _ = e => {
            let {
                serverURL: t,
                lang: n,
                paths: r,
                type: l,
                signal: i
            } = e;
            return fetch(`${t}/article?path=${encodeURIComponent(r.join(","))}&type=${encodeURIComponent(l.join(","))}&lang=${n}`, {
                signal: i
            }).then((e => e.json())).then((e => x(e, "article count")))
        },
        C = e => {
            let {
                serverURL: t,
                lang: n,
                path: r,
                type: l,
                action: i
            } = e;
            return fetch(`${t}/article?lang=${n}`, {
                method: "POST",
                headers: k,
                body: JSON.stringify({
                    path: r,
                    type: l,
                    action: i
                })
            }).then((e => e.json())).then((e => x(e, "article count")))
        },
        S = e => {
            let {
                serverURL: t,
                lang: n,
                token: r,
                objectId: l,
                ...i
            } = e;
            return fetch(`${t}/comment/${l}?lang=${n}`, {
                method: "PUT",
                headers: {
                    ...k,
                    Authorization: `Bearer ${r}`
                },
                body: JSON.stringify(i)
            }).then((e => e.json()))
        },
        $ = e => {
            try {
                e = decodeURI(e)
            } catch (e) {}
            return e
        },
        I = function() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return e.replace(/\/$/u, "")
        },
        E = e => /^(https?:)?\/\//.test(e),
        R = e => {
            const t = I(e);
            return E(t) ? t : `https://${t}`
        },
        L = e => Array.isArray(e) ? e : !!e && [0, e],
        A = (e, t) => "function" == typeof e ? e : !1 !== e && t,
        z = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bgcolor:#1e1e1e;--waline-bgcolor-light:#272727;--waline-bgcolor-hover: #444;--waline-border-color:#333;--waline-disable-bgcolor:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bgcolor:#272727;--waline-info-color:#666}",
        O = (e, t) => {
            let n = e.toString();
            for (; n.length < t;) n = "0" + n;
            return n
        },
        j = (e, t, n) => {
            if (!e) return "";
            const r = "string" == typeof e ? new Date(-1 !== e.indexOf(" ") ? e.replace(/-/g, "/") : e) : e,
                l = t.getTime() - r.getTime(),
                i = Math.floor(l / 864e5);
            if (0 === i) {
                const e = l % 864e5,
                    t = Math.floor(e / 36e5);
                if (0 === t) {
                    const t = e % 36e5,
                        r = Math.floor(t / 6e4);
                    if (0 === r) {
                        const e = t % 6e4;
                        return `${Math.round(e/1e3)} ${n.seconds}`
                    }
                    return `${r} ${n.minutes}`
                }
                return `${t} ${n.hours}`
            }
            return i < 0 ? n.now : i < 8 ? `${i} ${n.days}` : (e => {
                const t = O(e.getDate(), 2),
                    n = O(e.getMonth() + 1, 2);
                return `${O(e.getFullYear(),2)}-${n}-${t}`
            })(r)
        };

    function T(e, t) {
        const n = Object.create(null),
            r = e.split(",");
        for (let e = 0; e < r.length; e++) n[r[e]] = !0;
        return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
    }
    const P = T("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

    function U(e) {
        return !!e || "" === e
    }

    function M(e) {
        if (le(e)) {
            const t = {};
            for (let n = 0; n < e.length; n++) {
                const r = e[n],
                    l = ce(r) ? D(r) : M(r);
                if (l)
                    for (const e in l) t[e] = l[e]
            }
            return t
        }
        return ce(e) || pe(e) ? e : void 0
    }
    const N = /;(?![^(]*\))/g,
        F = /:(.+)/;

    function D(e) {
        const t = {};
        return e.split(N).forEach((e => {
            if (e) {
                const n = e.split(F);
                n.length > 1 && (t[n[0].trim()] = n[1].trim())
            }
        })), t
    }

    function V(e) {
        let t = "";
        if (ce(e)) t = e;
        else if (le(e))
            for (let n = 0; n < e.length; n++) {
                const r = V(e[n]);
                r && (t += r + " ")
            } else if (pe(e))
                for (const n in e) e[n] && (t += n + " ");
        return t.trim()
    }

    function B(e, t) {
        if (e === t) return !0;
        let n = se(e),
            r = se(t);
        if (n || r) return !(!n || !r) && e.getTime() === t.getTime();
        if (n = ue(e), r = ue(t), n || r) return e === t;
        if (n = le(e), r = le(t), n || r) return !(!n || !r) && function(e, t) {
            if (e.length !== t.length) return !1;
            let n = !0;
            for (let r = 0; n && r < e.length; r++) n = B(e[r], t[r]);
            return n
        }(e, t);
        if (n = pe(e), r = pe(t), n || r) {
            if (!n || !r) return !1;
            if (Object.keys(e).length !== Object.keys(t).length) return !1;
            for (const n in e) {
                const r = e.hasOwnProperty(n),
                    l = t.hasOwnProperty(n);
                if (r && !l || !r && l || !B(e[n], t[n])) return !1
            }
        }
        return String(e) === String(t)
    }

    function H(e, t) {
        return e.findIndex((e => B(e, t)))
    }
    const W = e => ce(e) ? e : null == e ? "" : le(e) || pe(e) && (e.toString === he || !ae(e.toString)) ? JSON.stringify(e, q, 2) : String(e),
        q = (e, t) => t && t.__v_isRef ? q(e, t.value) : ie(t) ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(((e, t) => {
                let [n, r] = t;
                return e[`${n} =>`] = r, e
            }), {})
        } : oe(t) ? {
            [`Set(${t.size})`]: [...t.values()]
        } : !pe(t) || le(t) || ge(t) ? t : String(t),
        Z = {},
        G = [],
        K = () => {},
        Q = () => !1,
        J = /^on[^a-z]/,
        Y = e => J.test(e),
        X = e => e.startsWith("onUpdate:"),
        ee = Object.assign,
        te = (e, t) => {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        },
        ne = Object.prototype.hasOwnProperty,
        re = (e, t) => ne.call(e, t),
        le = Array.isArray,
        ie = e => "[object Map]" === fe(e),
        oe = e => "[object Set]" === fe(e),
        se = e => "[object Date]" === fe(e),
        ae = e => "function" == typeof e,
        ce = e => "string" == typeof e,
        ue = e => "symbol" == typeof e,
        pe = e => null !== e && "object" == typeof e,
        de = e => pe(e) && ae(e.then) && ae(e.catch),
        he = Object.prototype.toString,
        fe = e => he.call(e),
        ge = e => "[object Object]" === fe(e),
        me = e => ce(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
        ve = T(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
        ye = e => {
            const t = Object.create(null);
            return n => t[n] || (t[n] = e(n))
        },
        we = /-(\w)/g,
        be = ye((e => e.replace(we, ((e, t) => t ? t.toUpperCase() : "")))),
        ke = /\B([A-Z])/g,
        xe = ye((e => e.replace(ke, "-$1").toLowerCase())),
        _e = ye((e => e.charAt(0).toUpperCase() + e.slice(1))),
        Ce = ye((e => e ? `on${_e(e)}` : "")),
        Se = (e, t) => !Object.is(e, t),
        $e = (e, t) => {
            for (let n = 0; n < e.length; n++) e[n](t)
        },
        Ie = (e, t, n) => {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !1,
                value: n
            })
        },
        Ee = e => {
            const t = parseFloat(e);
            return isNaN(t) ? e : t
        };
    let Re;
    let Le;
    class Ae {
        constructor() {
            let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.active = !0, this.effects = [], this.cleanups = [], !e && Le && (this.parent = Le, this.index = (Le.scopes || (Le.scopes = [])).push(this) - 1)
        }
        run(e) {
            if (this.active) {
                const t = Le;
                try {
                    return Le = this, e()
                } finally {
                    Le = t
                }
            }
        }
        on() {
            Le = this
        }
        off() {
            Le = this.parent
        }
        stop(e) {
            if (this.active) {
                let t, n;
                for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
                for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
                if (this.scopes)
                    for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
                if (this.parent && !e) {
                    const e = this.parent.scopes.pop();
                    e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index)
                }
                this.active = !1
            }
        }
    }
    const ze = e => {
            const t = new Set(e);
            return t.w = 0, t.n = 0, t
        },
        Oe = e => (e.w & Ue) > 0,
        je = e => (e.n & Ue) > 0,
        Te = new WeakMap;
    let Pe = 0,
        Ue = 1;
    let Me;
    const Ne = Symbol(""),
        Fe = Symbol("");
    class De {
        constructor(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                n = arguments.length > 2 ? arguments[2] : void 0;
            this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], this.parent = void 0,
                function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Le;
                    t && t.active && t.effects.push(e)
                }(this, n)
        }
        run() {
            if (!this.active) return this.fn();
            let e = Me,
                t = Be;
            for (; e;) {
                if (e === this) return;
                e = e.parent
            }
            try {
                return this.parent = Me, Me = this, Be = !0, Ue = 1 << ++Pe, Pe <= 30 ? (e => {
                    let {
                        deps: t
                    } = e;
                    if (t.length)
                        for (let e = 0; e < t.length; e++) t[e].w |= Ue
                })(this) : Ve(this), this.fn()
            } finally {
                Pe <= 30 && (e => {
                    const {
                        deps: t
                    } = e;
                    if (t.length) {
                        let n = 0;
                        for (let r = 0; r < t.length; r++) {
                            const l = t[r];
                            Oe(l) && !je(l) ? l.delete(e) : t[n++] = l, l.w &= ~Ue, l.n &= ~Ue
                        }
                        t.length = n
                    }
                })(this), Ue = 1 << --Pe, Me = this.parent, Be = t, this.parent = void 0, this.deferStop && this.stop()
            }
        }
        stop() {
            Me === this ? this.deferStop = !0 : this.active && (Ve(this), this.onStop && this.onStop(), this.active = !1)
        }
    }

    function Ve(e) {
        const {
            deps: t
        } = e;
        if (t.length) {
            for (let n = 0; n < t.length; n++) t[n].delete(e);
            t.length = 0
        }
    }
    let Be = !0;
    const He = [];

    function We() {
        He.push(Be), Be = !1
    }

    function qe() {
        const e = He.pop();
        Be = void 0 === e || e
    }

    function Ze(e, t, n) {
        if (Be && Me) {
            let t = Te.get(e);
            t || Te.set(e, t = new Map);
            let r = t.get(n);
            r || t.set(n, r = ze()), Ge(r)
        }
    }

    function Ge(e, t) {
        let n = !1;
        Pe <= 30 ? je(e) || (e.n |= Ue, n = !Oe(e)) : n = !e.has(Me), n && (e.add(Me), Me.deps.push(e))
    }

    function Ke(e, t, n, r, l, i) {
        const o = Te.get(e);
        if (!o) return;
        let s = [];
        if ("clear" === t) s = [...o.values()];
        else if ("length" === n && le(e)) o.forEach(((e, t) => {
            ("length" === t || t >= r) && s.push(e)
        }));
        else switch (void 0 !== n && s.push(o.get(n)), t) {
            case "add":
                le(e) ? me(n) && s.push(o.get("length")) : (s.push(o.get(Ne)), ie(e) && s.push(o.get(Fe)));
                break;
            case "delete":
                le(e) || (s.push(o.get(Ne)), ie(e) && s.push(o.get(Fe)));
                break;
            case "set":
                ie(e) && s.push(o.get(Ne))
        }
        if (1 === s.length) s[0] && Qe(s[0]);
        else {
            const e = [];
            for (const t of s) t && e.push(...t);
            Qe(ze(e))
        }
    }

    function Qe(e, t) {
        const n = le(e) ? e : [...e];
        for (const e of n) e.computed && Je(e);
        for (const e of n) e.computed || Je(e)
    }

    function Je(e, t) {
        (e !== Me || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
    }
    const Ye = T("__proto__,__v_isRef,__isVue"),
        Xe = new Set(Object.getOwnPropertyNames(Symbol).filter((e => "arguments" !== e && "caller" !== e)).map((e => Symbol[e])).filter(ue)),
        et = it(),
        tt = it(!1, !0),
        nt = it(!0),
        rt = lt();

    function lt() {
        const e = {};
        return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
            e[t] = function() {
                const e = Ht(this);
                for (let t = 0, n = this.length; t < n; t++) Ze(e, 0, t + "");
                for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++) r[l] = arguments[l];
                const i = e[t](...r);
                return -1 === i || !1 === i ? e[t](...r.map(Ht)) : i
            }
        })), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
            e[t] = function() {
                We();
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                const l = Ht(this)[t].apply(this, n);
                return qe(), l
            }
        })), e
    }

    function it() {
        let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return function(n, r, l) {
            if ("__v_isReactive" === r) return !e;
            if ("__v_isReadonly" === r) return e;
            if ("__v_isShallow" === r) return t;
            if ("__v_raw" === r && l === (e ? t ? jt : Ot : t ? zt : At).get(n)) return n;
            const i = le(n);
            if (!e && i && re(rt, r)) return Reflect.get(rt, r, l);
            const o = Reflect.get(n, r, l);
            return (ue(r) ? Xe.has(r) : Ye(r)) ? o : (e || Ze(n, 0, r), t ? o : Qt(o) ? i && me(r) ? o : o.value : pe(o) ? e ? Mt(o) : Pt(o) : o)
        }
    }

    function ot() {
        let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return function(t, n, r, l) {
            let i = t[n];
            if (Dt(i) && Qt(i) && !Qt(r)) return !1;
            if (!e && (Vt(r) || Dt(r) || (i = Ht(i), r = Ht(r)), !le(t) && Qt(i) && !Qt(r))) return i.value = r, !0;
            const o = le(t) && me(n) ? Number(n) < t.length : re(t, n),
                s = Reflect.set(t, n, r, l);
            return t === Ht(l) && (o ? Se(r, i) && Ke(t, "set", n, r) : Ke(t, "add", n, r)), s
        }
    }
    const st = {
            get: et,
            set: ot(),
            deleteProperty: function(e, t) {
                const n = re(e, t),
                    r = Reflect.deleteProperty(e, t);
                return r && n && Ke(e, "delete", t, void 0), r
            },
            has: function(e, t) {
                const n = Reflect.has(e, t);
                return ue(t) && Xe.has(t) || Ze(e, 0, t), n
            },
            ownKeys: function(e) {
                return Ze(e, 0, le(e) ? "length" : Ne), Reflect.ownKeys(e)
            }
        },
        at = {
            get: nt,
            set: (e, t) => !0,
            deleteProperty: (e, t) => !0
        },
        ct = ee({}, st, {
            get: tt,
            set: ot(!0)
        }),
        ut = e => e,
        pt = e => Reflect.getPrototypeOf(e);

    function dt(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        const l = Ht(e = e.__v_raw),
            i = Ht(t);
        n || (t !== i && Ze(l, 0, t), Ze(l, 0, i));
        const {
            has: o
        } = pt(l), s = r ? ut : n ? Zt : qt;
        return o.call(l, t) ? s(e.get(t)) : o.call(l, i) ? s(e.get(i)) : void(e !== l && e.get(t))
    }

    function ht(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const n = this.__v_raw,
            r = Ht(n),
            l = Ht(e);
        return t || (e !== l && Ze(r, 0, e), Ze(r, 0, l)), e === l ? n.has(e) : n.has(e) || n.has(l)
    }

    function ft(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return e = e.__v_raw, !t && Ze(Ht(e), 0, Ne), Reflect.get(e, "size", e)
    }

    function gt(e) {
        e = Ht(e);
        const t = Ht(this);
        return pt(t).has.call(t, e) || (t.add(e), Ke(t, "add", e, e)), this
    }

    function mt(e, t) {
        t = Ht(t);
        const n = Ht(this),
            {
                has: r,
                get: l
            } = pt(n);
        let i = r.call(n, e);
        i || (e = Ht(e), i = r.call(n, e));
        const o = l.call(n, e);
        return n.set(e, t), i ? Se(t, o) && Ke(n, "set", e, t) : Ke(n, "add", e, t), this
    }

    function vt(e) {
        const t = Ht(this),
            {
                has: n,
                get: r
            } = pt(t);
        let l = n.call(t, e);
        l || (e = Ht(e), l = n.call(t, e)), r && r.call(t, e);
        const i = t.delete(e);
        return l && Ke(t, "delete", e, void 0), i
    }

    function yt() {
        const e = Ht(this),
            t = 0 !== e.size,
            n = e.clear();
        return t && Ke(e, "clear", void 0, void 0), n
    }

    function wt(e, t) {
        return function(n, r) {
            const l = this,
                i = l.__v_raw,
                o = Ht(i),
                s = t ? ut : e ? Zt : qt;
            return !e && Ze(o, 0, Ne), i.forEach(((e, t) => n.call(r, s(e), s(t), l)))
        }
    }

    function bt(e, t, n) {
        return function() {
            const r = this.__v_raw,
                l = Ht(r),
                i = ie(l),
                o = "entries" === e || e === Symbol.iterator && i,
                s = "keys" === e && i,
                a = r[e](...arguments),
                c = n ? ut : t ? Zt : qt;
            return !t && Ze(l, 0, s ? Fe : Ne), {
                next() {
                    const {
                        value: e,
                        done: t
                    } = a.next();
                    return t ? {
                        value: e,
                        done: t
                    } : {
                        value: o ? [c(e[0]), c(e[1])] : c(e),
                        done: t
                    }
                },
                [Symbol.iterator]() {
                    return this
                }
            }
        }
    }

    function kt(e) {
        return function() {
            return "delete" !== e && this
        }
    }

    function xt() {
        const e = {
                get(e) {
                    return dt(this, e)
                },
                get size() {
                    return ft(this)
                },
                has: ht,
                add: gt,
                set: mt,
                delete: vt,
                clear: yt,
                forEach: wt(!1, !1)
            },
            t = {
                get(e) {
                    return dt(this, e, !1, !0)
                },
                get size() {
                    return ft(this)
                },
                has: ht,
                add: gt,
                set: mt,
                delete: vt,
                clear: yt,
                forEach: wt(!1, !0)
            },
            n = {
                get(e) {
                    return dt(this, e, !0)
                },
                get size() {
                    return ft(this, !0)
                },
                has(e) {
                    return ht.call(this, e, !0)
                },
                add: kt("add"),
                set: kt("set"),
                delete: kt("delete"),
                clear: kt("clear"),
                forEach: wt(!0, !1)
            },
            r = {
                get(e) {
                    return dt(this, e, !0, !0)
                },
                get size() {
                    return ft(this, !0)
                },
                has(e) {
                    return ht.call(this, e, !0)
                },
                add: kt("add"),
                set: kt("set"),
                delete: kt("delete"),
                clear: kt("clear"),
                forEach: wt(!0, !0)
            };
        return ["keys", "values", "entries", Symbol.iterator].forEach((l => {
            e[l] = bt(l, !1, !1), n[l] = bt(l, !0, !1), t[l] = bt(l, !1, !0), r[l] = bt(l, !0, !0)
        })), [e, n, t, r]
    }
    const [_t, Ct, St, $t] = xt();

    function It(e, t) {
        const n = t ? e ? $t : St : e ? Ct : _t;
        return (t, r, l) => "__v_isReactive" === r ? !e : "__v_isReadonly" === r ? e : "__v_raw" === r ? t : Reflect.get(re(n, r) && r in t ? n : t, r, l)
    }
    const Et = {
            get: It(!1, !1)
        },
        Rt = {
            get: It(!1, !0)
        },
        Lt = {
            get: It(!0, !1)
        },
        At = new WeakMap,
        zt = new WeakMap,
        Ot = new WeakMap,
        jt = new WeakMap;

    function Tt(e) {
        return e.__v_skip || !Object.isExtensible(e) ? 0 : function(e) {
            switch (e) {
                case "Object":
                case "Array":
                    return 1;
                case "Map":
                case "Set":
                case "WeakMap":
                case "WeakSet":
                    return 2;
                default:
                    return 0
            }
        }((e => fe(e).slice(8, -1))(e))
    }

    function Pt(e) {
        return Dt(e) ? e : Nt(e, !1, st, Et, At)
    }

    function Ut(e) {
        return Nt(e, !1, ct, Rt, zt)
    }

    function Mt(e) {
        return Nt(e, !0, at, Lt, Ot)
    }

    function Nt(e, t, n, r, l) {
        if (!pe(e)) return e;
        if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
        const i = l.get(e);
        if (i) return i;
        const o = Tt(e);
        if (0 === o) return e;
        const s = new Proxy(e, 2 === o ? r : n);
        return l.set(e, s), s
    }

    function Ft(e) {
        return Dt(e) ? Ft(e.__v_raw) : !(!e || !e.__v_isReactive)
    }

    function Dt(e) {
        return !(!e || !e.__v_isReadonly)
    }

    function Vt(e) {
        return !(!e || !e.__v_isShallow)
    }

    function Bt(e) {
        return Ft(e) || Dt(e)
    }

    function Ht(e) {
        const t = e && e.__v_raw;
        return t ? Ht(t) : e
    }

    function Wt(e) {
        return Ie(e, "__v_skip", !0), e
    }
    const qt = e => pe(e) ? Pt(e) : e,
        Zt = e => pe(e) ? Mt(e) : e;

    function Gt(e) {
        Be && Me && Ge((e = Ht(e)).dep || (e.dep = ze()))
    }

    function Kt(e, t) {
        (e = Ht(e)).dep && Qe(e.dep)
    }

    function Qt(e) {
        return !(!e || !0 !== e.__v_isRef)
    }

    function Jt(e) {
        return Xt(e, !1)
    }

    function Yt(e) {
        return Xt(e, !0)
    }

    function Xt(e, t) {
        return Qt(e) ? e : new en(e, t)
    }
    class en {
        constructor(e, t) {
            this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Ht(e), this._value = t ? e : qt(e)
        }
        get value() {
            return Gt(this), this._value
        }
        set value(e) {
            const t = this.__v_isShallow || Vt(e) || Dt(e);
            e = t ? e : Ht(e), Se(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : qt(e), Kt(this))
        }
    }

    function tn(e) {
        return Qt(e) ? e.value : e
    }
    const nn = {
        get: (e, t, n) => tn(Reflect.get(e, t, n)),
        set: (e, t, n, r) => {
            const l = e[t];
            return Qt(l) && !Qt(n) ? (l.value = n, !0) : Reflect.set(e, t, n, r)
        }
    };

    function rn(e) {
        return Ft(e) ? e : new Proxy(e, nn)
    }
    var ln;
    class on {
        constructor(e, t, n, r) {
            this._setter = t, this.dep = void 0, this.__v_isRef = !0, this[ln] = !1, this._dirty = !0, this.effect = new De(e, (() => {
                this._dirty || (this._dirty = !0, Kt(this))
            })), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n
        }
        get value() {
            const e = Ht(this);
            return Gt(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
        }
        set value(e) {
            this._setter(e)
        }
    }

    function sn(e, t, n, r) {
        let l;
        try {
            l = r ? e(...r) : e()
        } catch (e) {
            cn(e, t, n)
        }
        return l
    }

    function an(e, t, n, r) {
        if (ae(e)) {
            const l = sn(e, t, n, r);
            return l && de(l) && l.catch((e => {
                cn(e, t, n)
            })), l
        }
        const l = [];
        for (let i = 0; i < e.length; i++) l.push(an(e[i], t, n, r));
        return l
    }

    function cn(e, t, n) {
        let r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        const l = t ? t.vnode : null;
        if (t) {
            let r = t.parent;
            const l = t.proxy,
                i = n;
            for (; r;) {
                const t = r.ec;
                if (t)
                    for (let n = 0; n < t.length; n++)
                        if (!1 === t[n](e, l, i)) return;
                r = r.parent
            }
            const o = t.appContext.config.errorHandler;
            if (o) return void sn(o, null, 10, [e, l, i])
        }
        un(e, n, l, r)
    }

    function un(e, t, n) {
        console.error(e)
    }
    ln = "__v_isReadonly";
    let pn = !1,
        dn = !1;
    const hn = [];
    let fn = 0;
    const gn = [];
    let mn = null,
        vn = 0;
    const yn = Promise.resolve();
    let wn = null;

    function bn(e) {
        const t = wn || yn;
        return e ? t.then(this ? e.bind(this) : e) : t
    }

    function kn(e) {
        hn.length && hn.includes(e, pn && e.allowRecurse ? fn + 1 : fn) || (null == e.id ? hn.push(e) : hn.splice(function(e) {
            let t = fn + 1,
                n = hn.length;
            for (; t < n;) {
                const r = t + n >>> 1;
                Sn(hn[r]) < e ? t = r + 1 : n = r
            }
            return t
        }(e.id), 0, e), xn())
    }

    function xn() {
        pn || dn || (dn = !0, wn = yn.then(In))
    }

    function _n(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : pn ? fn + 1 : 0;
        for (; t < hn.length; t++) {
            const e = hn[t];
            e && e.pre && (hn.splice(t, 1), t--, e())
        }
    }

    function Cn(e) {
        if (gn.length) {
            const e = [...new Set(gn)];
            if (gn.length = 0, mn) return void mn.push(...e);
            for (mn = e, mn.sort(((e, t) => Sn(e) - Sn(t))), vn = 0; vn < mn.length; vn++) mn[vn]();
            mn = null, vn = 0
        }
    }
    const Sn = e => null == e.id ? 1 / 0 : e.id,
        $n = (e, t) => {
            const n = Sn(e) - Sn(t);
            if (0 === n) {
                if (e.pre && !t.pre) return -1;
                if (t.pre && !e.pre) return 1
            }
            return n
        };

    function In(e) {
        dn = !1, pn = !0, hn.sort($n);
        try {
            for (fn = 0; fn < hn.length; fn++) {
                const e = hn[fn];
                e && !1 !== e.active && sn(e, null, 14)
            }
        } finally {
            fn = 0, hn.length = 0, Cn(), pn = !1, wn = null, (hn.length || gn.length) && In()
        }
    }

    function En(e, t) {
        if (e.isUnmounted) return;
        const n = e.vnode.props || Z;
        for (var r = arguments.length, l = new Array(r > 2 ? r - 2 : 0), i = 2; i < r; i++) l[i - 2] = arguments[i];
        let o = l;
        const s = t.startsWith("update:"),
            a = s && t.slice(7);
        if (a && a in n) {
            const e = `${"modelValue"===a?"model":a}Modifiers`,
                {
                    number: t,
                    trim: r
                } = n[e] || Z;
            r && (o = l.map((e => e.trim()))), t && (o = l.map(Ee))
        }
        let c, u = n[c = Ce(t)] || n[c = Ce(be(t))];
        !u && s && (u = n[c = Ce(xe(t))]), u && an(u, e, 6, o);
        const p = n[c + "Once"];
        if (p) {
            if (e.emitted) {
                if (e.emitted[c]) return
            } else e.emitted = {};
            e.emitted[c] = !0, an(p, e, 6, o)
        }
    }

    function Rn(e, t) {
        const n = t.emitsCache,
            r = n.get(e);
        if (void 0 !== r) return r;
        const l = e.emits;
        let i = {},
            o = !1;
        return l || o ? (le(l) ? l.forEach((e => i[e] = null)) : ee(i, l), pe(e) && n.set(e, i), i) : (pe(e) && n.set(e, null), null)
    }

    function Ln(e, t) {
        return !(!e || !Y(t)) && (t = t.slice(2).replace(/Once$/, ""), re(e, t[0].toLowerCase() + t.slice(1)) || re(e, xe(t)) || re(e, t))
    }
    let An = null,
        zn = null;

    function On(e) {
        const t = An;
        return An = e, zn = e && e.type.__scopeId || null, t
    }

    function jn(e) {
        const {
            type: t,
            vnode: n,
            proxy: r,
            withProxy: l,
            props: i,
            propsOptions: [o],
            slots: s,
            attrs: a,
            emit: c,
            render: u,
            renderCache: p,
            data: d,
            setupState: h,
            ctx: f,
            inheritAttrs: g
        } = e;
        let m, v;
        const y = On(e);
        try {
            if (4 & n.shapeFlag) {
                const e = l || r;
                m = el(u.call(e, e, p, i, h, d, f)), v = a
            } else {
                const e = t;
                m = el(e.length > 1 ? e(i, {
                    attrs: a,
                    slots: s,
                    emit: c
                }) : e(i, null)), v = t.props ? a : Tn(a)
            }
        } catch (t) {
            Tr.length = 0, cn(t, e, 1), m = Kr(Or)
        }
        let w = m;
        if (v && !1 !== g) {
            const e = Object.keys(v),
                {
                    shapeFlag: t
                } = w;
            e.length && 7 & t && (o && e.some(X) && (v = Pn(v, o)), w = Jr(w, v))
        }
        return n.dirs && (w = Jr(w), w.dirs = w.dirs ? w.dirs.concat(n.dirs) : n.dirs), n.transition && (w.transition = n.transition), m = w, On(y), m
    }
    const Tn = e => {
            let t;
            for (const n in e)("class" === n || "style" === n || Y(n)) && ((t || (t = {}))[n] = e[n]);
            return t
        },
        Pn = (e, t) => {
            const n = {};
            for (const r in e) X(r) && r.slice(9) in t || (n[r] = e[r]);
            return n
        };

    function Un(e, t, n) {
        const r = Object.keys(t);
        if (r.length !== Object.keys(e).length) return !0;
        for (let l = 0; l < r.length; l++) {
            const i = r[l];
            if (t[i] !== e[i] && !Ln(n, i)) return !0
        }
        return !1
    }
    const Mn = e => e.__isSuspense;

    function Nn(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        const r = sl || An;
        if (r) {
            const l = null == r.parent ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
            if (l && e in l) return l[e];
            if (arguments.length > 1) return n && ae(t) ? t.call(r.proxy) : t
        }
    }

    function Fn(e, t) {
        return Bn(e, null, t)
    }
    const Dn = {};

    function Vn(e, t, n) {
        return Bn(e, t, n)
    }

    function Bn(e, t) {
        let {
            immediate: n,
            deep: r,
            flush: l,
            onTrack: i,
            onTrigger: o
        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Z;
        const s = sl;
        let a, c, u = !1,
            p = !1;
        if (Qt(e) ? (a = () => e.value, u = Vt(e)) : Ft(e) ? (a = () => e, r = !0) : le(e) ? (p = !0, u = e.some((e => Ft(e) || Vt(e))), a = () => e.map((e => Qt(e) ? e.value : Ft(e) ? Hn(e) : ae(e) ? sn(e, s, 2) : void 0))) : a = ae(e) ? t ? () => sn(e, s, 2) : () => {
                if (!s || !s.isUnmounted) return c && c(), an(e, s, 3, [d])
            } : K, t && r) {
            const e = a;
            a = () => Hn(e())
        }
        let d = e => {
            c = m.onStop = () => {
                sn(e, s, 4)
            }
        };
        if (dl) return d = K, t ? n && an(t, s, 3, [a(), p ? [] : void 0, d]) : a(), K;
        let h = p ? [] : Dn;
        const f = () => {
            if (m.active)
                if (t) {
                    const e = m.run();
                    (r || u || (p ? e.some(((e, t) => Se(e, h[t]))) : Se(e, h))) && (c && c(), an(t, s, 3, [e, h === Dn ? void 0 : h, d]), h = e)
                } else m.run()
        };
        let g;
        f.allowRecurse = !!t, "sync" === l ? g = f : "post" === l ? g = () => $r(f, s && s.suspense) : (f.pre = !0, s && (f.id = s.uid), g = () => kn(f));
        const m = new De(a, g);
        return t ? n ? f() : h = m.run() : "post" === l ? $r(m.run.bind(m), s && s.suspense) : m.run(), () => {
            m.stop(), s && s.scope && te(s.scope.effects, m)
        }
    }

    function Hn(e, t) {
        if (!pe(e) || e.__v_skip) return e;
        if ((t = t || new Set).has(e)) return e;
        if (t.add(e), Qt(e)) Hn(e.value, t);
        else if (le(e))
            for (let n = 0; n < e.length; n++) Hn(e[n], t);
        else if (oe(e) || ie(e)) e.forEach((e => {
            Hn(e, t)
        }));
        else if (ge(e))
            for (const n in e) Hn(e[n], t);
        return e
    }

    function Wn(e) {
        return ae(e) ? {
            setup: e,
            name: e.name
        } : e
    }
    const qn = e => !!e.type.__asyncLoader;

    function Zn(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : sl,
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        if (n) {
            const l = n[e] || (n[e] = []),
                i = t.__weh || (t.__weh = function() {
                    if (n.isUnmounted) return;
                    We(), cl(n);
                    for (var r = arguments.length, l = new Array(r), i = 0; i < r; i++) l[i] = arguments[i];
                    const o = an(t, n, e, l);
                    return ul(), qe(), o
                });
            return r ? l.unshift(i) : l.push(i), i
        }
    }
    const Gn = e => function(t) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : sl;
            return (!dl || "sp" === e) && Zn(e, t, n)
        },
        Kn = Gn("m"),
        Qn = Gn("bum"),
        Jn = Gn("um");

    function Yn(e, t) {
        const n = An;
        if (null === n) return e;
        const r = ml(n) || n.proxy,
            l = e.dirs || (e.dirs = []);
        for (let e = 0; e < t.length; e++) {
            let [n, i, o, s = Z] = t[e];
            ae(n) && (n = {
                mounted: n,
                updated: n
            }), n.deep && Hn(i), l.push({
                dir: n,
                instance: r,
                value: i,
                oldValue: void 0,
                arg: o,
                modifiers: s
            })
        }
        return e
    }

    function Xn(e, t, n, r) {
        const l = e.dirs,
            i = t && t.dirs;
        for (let o = 0; o < l.length; o++) {
            const s = l[o];
            i && (s.oldValue = i[o].value);
            let a = s.dir[r];
            a && (We(), an(a, n, 8, [e.el, s, e, t]), qe())
        }
    }
    const er = "components";

    function tr(e, t) {
        return function(e, t) {
            let n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            const r = An || sl;
            if (r) {
                const l = r.type;
                if (e === er) {
                    const e = vl(l, !1);
                    if (e && (e === t || e === be(t) || e === _e(be(t)))) return l
                }
                const i = rr(r[e] || l[e], t) || rr(r.appContext[e], t);
                return !i && n ? l : i
            }
        }(er, e, !0, t) || e
    }
    const nr = Symbol();

    function rr(e, t) {
        return e && (e[t] || e[be(t)] || e[_e(be(t))])
    }

    function lr(e, t, n, r) {
        let l;
        const i = n && n[r];
        if (le(e) || ce(e)) {
            l = new Array(e.length);
            for (let n = 0, r = e.length; n < r; n++) l[n] = t(e[n], n, void 0, i && i[n])
        } else if ("number" == typeof e) {
            l = new Array(e);
            for (let n = 0; n < e; n++) l[n] = t(n + 1, n, void 0, i && i[n])
        } else if (pe(e))
            if (e[Symbol.iterator]) l = Array.from(e, ((e, n) => t(e, n, void 0, i && i[n])));
            else {
                const n = Object.keys(e);
                l = new Array(n.length);
                for (let r = 0, o = n.length; r < o; r++) {
                    const o = n[r];
                    l[r] = t(e[o], o, r, i && i[r])
                }
            }
        else l = [];
        return n && (n[r] = l), l
    }
    const ir = e => e ? pl(e) ? ml(e) || e.proxy : ir(e.parent) : null,
        or = ee(Object.create(null), {
            $: e => e,
            $el: e => e.vnode.el,
            $data: e => e.data,
            $props: e => e.props,
            $attrs: e => e.attrs,
            $slots: e => e.slots,
            $refs: e => e.refs,
            $parent: e => ir(e.parent),
            $root: e => ir(e.root),
            $emit: e => e.emit,
            $options: e => e.type,
            $forceUpdate: e => e.f || (e.f = () => kn(e.update)),
            $nextTick: e => e.n || (e.n = bn.bind(e.proxy)),
            $watch: e => K
        }),
        sr = {
            get(e, t) {
                let {
                    _: n
                } = e;
                const {
                    ctx: r,
                    setupState: l,
                    data: i,
                    props: o,
                    accessCache: s,
                    type: a,
                    appContext: c
                } = n;
                let u;
                if ("$" !== t[0]) {
                    const e = s[t];
                    if (void 0 !== e) switch (e) {
                        case 1:
                            return l[t];
                        case 2:
                            return i[t];
                        case 4:
                            return r[t];
                        case 3:
                            return o[t]
                    } else {
                        if (l !== Z && re(l, t)) return s[t] = 1, l[t];
                        if (i !== Z && re(i, t)) return s[t] = 2, i[t];
                        if ((u = n.propsOptions[0]) && re(u, t)) return s[t] = 3, o[t];
                        if (r !== Z && re(r, t)) return s[t] = 4, r[t];
                        s[t] = 0
                    }
                }
                const p = or[t];
                let d, h;
                return p ? ("$attrs" === t && Ze(n, 0, t), p(n)) : (d = a.__cssModules) && (d = d[t]) ? d : r !== Z && re(r, t) ? (s[t] = 4, r[t]) : (h = c.config.globalProperties, re(h, t) ? h[t] : void 0)
            },
            set(e, t, n) {
                let {
                    _: r
                } = e;
                const {
                    data: l,
                    setupState: i,
                    ctx: o
                } = r;
                return i !== Z && re(i, t) ? (i[t] = n, !0) : l !== Z && re(l, t) ? (l[t] = n, !0) : !re(r.props, t) && (("$" !== t[0] || !(t.slice(1) in r)) && (o[t] = n, !0))
            },
            has(e, t) {
                let n, {
                    _: {
                        data: r,
                        setupState: l,
                        accessCache: i,
                        ctx: o,
                        appContext: s,
                        propsOptions: a
                    }
                } = e;
                return !!i[t] || r !== Z && re(r, t) || l !== Z && re(l, t) || (n = a[0]) && re(n, t) || re(o, t) || re(or, t) || re(s.config.globalProperties, t)
            },
            defineProperty(e, t, n) {
                return null != n.get ? e._.accessCache[t] = 0 : re(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
            }
        };

    function ar(e, t, n) {
        let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        const l = {},
            i = {};
        Ie(i, Wr, 1), e.propsDefaults = Object.create(null), cr(e, t, l, i);
        for (const t in e.propsOptions[0]) t in l || (l[t] = void 0);
        n ? e.props = r ? l : Ut(l) : e.type.props ? e.props = l : e.props = i, e.attrs = i
    }

    function cr(e, t, n, r) {
        const [l, i] = e.propsOptions;
        let o, s = !1;
        if (t)
            for (let a in t) {
                if (ve(a)) continue;
                const c = t[a];
                let u;
                l && re(l, u = be(a)) ? i && i.includes(u) ? (o || (o = {}))[u] = c : n[u] = c : Ln(e.emitsOptions, a) || a in r && c === r[a] || (r[a] = c, s = !0)
            }
        if (i) {
            const t = Ht(n),
                r = o || Z;
            for (let o = 0; o < i.length; o++) {
                const s = i[o];
                n[s] = ur(l, t, s, r[s], e, !re(r, s))
            }
        }
        return s
    }

    function ur(e, t, n, r, l, i) {
        const o = e[n];
        if (null != o) {
            const e = re(o, "default");
            if (e && void 0 === r) {
                const e = o.default;
                if (o.type !== Function && ae(e)) {
                    const {
                        propsDefaults: i
                    } = l;
                    n in i ? r = i[n] : (cl(l), r = i[n] = e.call(null, t), ul())
                } else r = e
            }
            o[0] && (i && !e ? r = !1 : !o[1] || "" !== r && r !== xe(n) || (r = !0))
        }
        return r
    }

    function pr(e, t) {
        const n = t.propsCache,
            r = n.get(e);
        if (r) return r;
        const l = e.props,
            i = {},
            o = [];
        let s = !1;
        if (!l && !s) return pe(e) && n.set(e, G), G;
        if (le(l))
            for (let e = 0; e < l.length; e++) {
                const t = be(l[e]);
                dr(t) && (i[t] = Z)
            } else if (l)
                for (const e in l) {
                    const t = be(e);
                    if (dr(t)) {
                        const n = l[e],
                            r = i[t] = le(n) || ae(n) ? {
                                type: n
                            } : n;
                        if (r) {
                            const e = gr(Boolean, r.type),
                                n = gr(String, r.type);
                            r[0] = e > -1, r[1] = n < 0 || e < n, (e > -1 || re(r, "default")) && o.push(t)
                        }
                    }
                }
        const a = [i, o];
        return pe(e) && n.set(e, a), a
    }

    function dr(e) {
        return "$" !== e[0]
    }

    function hr(e) {
        const t = e && e.toString().match(/^\s*function (\w+)/);
        return t ? t[1] : null === e ? "null" : ""
    }

    function fr(e, t) {
        return hr(e) === hr(t)
    }

    function gr(e, t) {
        return le(t) ? t.findIndex((t => fr(t, e))) : ae(t) && fr(t, e) ? 0 : -1
    }
    const mr = e => "_" === e[0] || "$stable" === e,
        vr = e => le(e) ? e.map(el) : [el(e)],
        yr = (e, t, n) => {
            if (t._n) return t;
            const r = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : An;
                if (!t) return e;
                if (e._n) return e;
                const n = function() {
                    n._d && Nr(-1);
                    const r = On(t),
                        l = e(...arguments);
                    return On(r), n._d && Nr(1), l
                };
                return n._n = !0, n._c = !0, n._d = !0, n
            }((function() {
                return vr(t(...arguments))
            }), n);
            return r._c = !1, r
        },
        wr = (e, t, n) => {
            const r = e._ctx;
            for (const n in e) {
                if (mr(n)) continue;
                const l = e[n];
                if (ae(l)) t[n] = yr(0, l, r);
                else if (null != l) {
                    const e = vr(l);
                    t[n] = () => e
                }
            }
        },
        br = (e, t) => {
            const n = vr(t);
            e.slots.default = () => n
        },
        kr = (e, t) => {
            if (32 & e.vnode.shapeFlag) {
                const n = t._;
                n ? (e.slots = Ht(t), Ie(t, "_", n)) : wr(t, e.slots = {})
            } else e.slots = {}, t && br(e, t);
            Ie(e.slots, Wr, 1)
        };

    function xr() {
        return {
            app: null,
            config: {
                isNativeTag: Q,
                performance: !1,
                globalProperties: {},
                optionMergeStrategies: {},
                errorHandler: void 0,
                warnHandler: void 0,
                compilerOptions: {}
            },
            mixins: [],
            components: {},
            directives: {},
            provides: Object.create(null),
            optionsCache: new WeakMap,
            propsCache: new WeakMap,
            emitsCache: new WeakMap
        }
    }
    let _r = 0;

    function Cr(e, t) {
        return function(n) {
            let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            ae(n) || (n = Object.assign({}, n)), null == r || pe(r) || (r = null);
            const l = xr(),
                i = new Set;
            let o = !1;
            const s = l.app = {
                _uid: _r++,
                _component: n,
                _props: r,
                _container: null,
                _context: l,
                _instance: null,
                version: kl,
                get config() {
                    return l.config
                },
                set config(e) {},
                use(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    return i.has(e) || (e && ae(e.install) ? (i.add(e), e.install(s, ...n)) : ae(e) && (i.add(e), e(s, ...n))), s
                },
                mixin: e => s,
                component: (e, t) => t ? (l.components[e] = t, s) : l.components[e],
                directive: (e, t) => t ? (l.directives[e] = t, s) : l.directives[e],
                mount(i, a, c) {
                    if (!o) {
                        const u = Kr(n, r);
                        return u.appContext = l, a && t ? t(u, i) : e(u, i, c), o = !0, s._container = i, i.__vue_app__ = s, ml(u.component) || u.component.proxy
                    }
                },
                unmount() {
                    o && (e(null, s._container), delete s._container.__vue_app__)
                },
                provide: (e, t) => (l.provides[e] = t, s)
            };
            return s
        }
    }

    function Sr(e, t, n, r) {
        let l = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        if (le(e)) return void e.forEach(((e, i) => Sr(e, t && (le(t) ? t[i] : t), n, r, l)));
        if (qn(r) && !l) return;
        const i = 4 & r.shapeFlag ? ml(r.component) || r.component.proxy : r.el,
            o = l ? null : i,
            {
                i: s,
                r: a
            } = e,
            c = t && t.r,
            u = s.refs === Z ? s.refs = {} : s.refs,
            p = s.setupState;
        if (null != c && c !== a && (ce(c) ? (u[c] = null, re(p, c) && (p[c] = null)) : Qt(c) && (c.value = null)), ae(a)) sn(a, s, 12, [o, u]);
        else {
            const t = ce(a),
                r = Qt(a);
            if (t || r) {
                const s = () => {
                    if (e.f) {
                        const n = t ? u[a] : a.value;
                        l ? le(n) && te(n, i) : le(n) ? n.includes(i) || n.push(i) : t ? (u[a] = [i], re(p, a) && (p[a] = u[a])) : (a.value = [i], e.k && (u[e.k] = a.value))
                    } else t ? (u[a] = o, re(p, a) && (p[a] = o)) : r && (a.value = o, e.k && (u[e.k] = o))
                };
                o ? (s.id = -1, $r(s, n)) : s()
            }
        }
    }
    const $r = function(e, t) {
        var n;
        t && t.pendingBranch ? le(e) ? t.effects.push(...e) : t.effects.push(e) : (le(n = e) ? gn.push(...n) : mn && mn.includes(n, n.allowRecurse ? vn + 1 : vn) || gn.push(n), xn())
    };

    function Ir(e) {
        return function(e, t) {
            (Re || (Re = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})).__VUE__ = !0;
            const {
                insert: n,
                remove: r,
                patchProp: l,
                createElement: i,
                createText: o,
                createComment: s,
                setText: a,
                setElementText: c,
                parentNode: u,
                nextSibling: p,
                setScopeId: d = K,
                cloneNode: h,
                insertStaticContent: f
            } = e, g = function(e, t, n) {
                let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                    l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
                    i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null,
                    o = arguments.length > 6 && void 0 !== arguments[6] && arguments[6],
                    s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : null,
                    a = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !!t.dynamicChildren;
                if (e === t) return;
                e && !Hr(e, t) && (r = B(e), M(e, l, i, !0), e = null), -2 === t.patchFlag && (a = !1, t.dynamicChildren = null);
                const {
                    type: c,
                    ref: u,
                    shapeFlag: p
                } = t;
                switch (c) {
                    case zr:
                        m(e, t, n, r);
                        break;
                    case Or:
                        v(e, t, n, r);
                        break;
                    case jr:
                        null == e && y(t, n, r, o);
                        break;
                    case Ar:
                        E(e, t, n, r, l, i, o, s, a);
                        break;
                    default:
                        1 & p ? k(e, t, n, r, l, i, o, s, a) : 6 & p ? R(e, t, n, r, l, i, o, s, a) : (64 & p || 128 & p) && c.process(e, t, n, r, l, i, o, s, a, W)
                }
                null != u && l && Sr(u, e && e.ref, i, t || e, !t)
            }, m = (e, t, r, l) => {
                if (null == e) n(t.el = o(t.children), r, l);
                else {
                    const n = t.el = e.el;
                    t.children !== e.children && a(n, t.children)
                }
            }, v = (e, t, r, l) => {
                null == e ? n(t.el = s(t.children || ""), r, l) : t.el = e.el
            }, y = (e, t, n, r) => {
                [e.el, e.anchor] = f(e.children, t, n, r, e.el, e.anchor)
            }, w = (e, t, r) => {
                let l, {
                    el: i,
                    anchor: o
                } = e;
                for (; i && i !== o;) l = p(i), n(i, t, r), i = l;
                n(o, t, r)
            }, b = e => {
                let t, {
                    el: n,
                    anchor: l
                } = e;
                for (; n && n !== l;) t = p(n), r(n), n = t;
                r(l)
            }, k = (e, t, n, r, l, i, o, s, a) => {
                o = o || "svg" === t.type, null == e ? x(t, n, r, l, i, o, s, a) : S(e, t, l, i, o, s, a)
            }, x = (e, t, r, o, s, a, u, p) => {
                let d, f;
                const {
                    type: g,
                    props: m,
                    shapeFlag: v,
                    transition: y,
                    patchFlag: w,
                    dirs: b
                } = e;
                if (e.el && void 0 !== h && -1 === w) d = e.el = h(e.el);
                else {
                    if (d = e.el = i(e.type, a, m && m.is, m), 8 & v ? c(d, e.children) : 16 & v && C(e.children, d, null, o, s, a && "foreignObject" !== g, u, p), b && Xn(e, null, o, "created"), m) {
                        for (const t in m) "value" === t || ve(t) || l(d, t, null, m[t], a, e.children, o, s, V);
                        "value" in m && l(d, "value", null, m.value), (f = m.onVnodeBeforeMount) && ll(f, o, e)
                    }
                    _(d, e, e.scopeId, u, o)
                }
                b && Xn(e, null, o, "beforeMount");
                const k = (!s || s && !s.pendingBranch) && y && !y.persisted;
                k && y.beforeEnter(d), n(d, t, r), ((f = m && m.onVnodeMounted) || k || b) && $r((() => {
                    f && ll(f, o, e), k && y.enter(d), b && Xn(e, null, o, "mounted")
                }), s)
            }, _ = (e, t, n, r, l) => {
                if (n && d(e, n), r)
                    for (let t = 0; t < r.length; t++) d(e, r[t]);
                if (l) {
                    if (t === l.subTree) {
                        const t = l.vnode;
                        _(e, t, t.scopeId, t.slotScopeIds, l.parent)
                    }
                }
            }, C = function(e, t, n, r, l, i, o, s) {
                for (let a = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0; a < e.length; a++) {
                    const c = e[a] = s ? tl(e[a]) : el(e[a]);
                    g(null, c, t, n, r, l, i, o, s)
                }
            }, S = (e, t, n, r, i, o, s) => {
                const a = t.el = e.el;
                let {
                    patchFlag: u,
                    dynamicChildren: p,
                    dirs: d
                } = t;
                u |= 16 & e.patchFlag;
                const h = e.props || Z,
                    f = t.props || Z;
                let g;
                n && Er(n, !1), (g = f.onVnodeBeforeUpdate) && ll(g, n, t, e), d && Xn(t, e, n, "beforeUpdate"), n && Er(n, !0);
                const m = i && "foreignObject" !== t.type;
                if (p ? $(e.dynamicChildren, p, a, n, r, m, o) : s || j(e, t, a, null, n, r, m, o, !1), u > 0) {
                    if (16 & u) I(a, t, h, f, n, r, i);
                    else if (2 & u && h.class !== f.class && l(a, "class", null, f.class, i), 4 & u && l(a, "style", h.style, f.style, i), 8 & u) {
                        const o = t.dynamicProps;
                        for (let t = 0; t < o.length; t++) {
                            const s = o[t],
                                c = h[s],
                                u = f[s];
                            u === c && "value" !== s || l(a, s, c, u, i, e.children, n, r, V)
                        }
                    }
                    1 & u && e.children !== t.children && c(a, t.children)
                } else s || null != p || I(a, t, h, f, n, r, i);
                ((g = f.onVnodeUpdated) || d) && $r((() => {
                    g && ll(g, n, t, e), d && Xn(t, e, n, "updated")
                }), r)
            }, $ = (e, t, n, r, l, i, o) => {
                for (let s = 0; s < t.length; s++) {
                    const a = e[s],
                        c = t[s],
                        p = a.el && (a.type === Ar || !Hr(a, c) || 70 & a.shapeFlag) ? u(a.el) : n;
                    g(a, c, p, null, r, l, i, o, !0)
                }
            }, I = (e, t, n, r, i, o, s) => {
                if (n !== r) {
                    for (const a in r) {
                        if (ve(a)) continue;
                        const c = r[a],
                            u = n[a];
                        c !== u && "value" !== a && l(e, a, u, c, s, t.children, i, o, V)
                    }
                    if (n !== Z)
                        for (const a in n) ve(a) || a in r || l(e, a, n[a], null, s, t.children, i, o, V);
                    "value" in r && l(e, "value", n.value, r.value)
                }
            }, E = (e, t, r, l, i, s, a, c, u) => {
                const p = t.el = e ? e.el : o(""),
                    d = t.anchor = e ? e.anchor : o("");
                let {
                    patchFlag: h,
                    dynamicChildren: f,
                    slotScopeIds: g
                } = t;
                g && (c = c ? c.concat(g) : g), null == e ? (n(p, r, l), n(d, r, l), C(t.children, r, d, i, s, a, c, u)) : h > 0 && 64 & h && f && e.dynamicChildren ? ($(e.dynamicChildren, f, r, i, s, a, c), (null != t.key || i && t === i.subTree) && Rr(e, t, !0)) : j(e, t, r, d, i, s, a, c, u)
            }, R = (e, t, n, r, l, i, o, s, a) => {
                t.slotScopeIds = s, null == e ? 512 & t.shapeFlag ? l.ctx.activate(t, n, r, o, a) : L(t, n, r, l, i, o, a) : A(e, t, a)
            }, L = (e, t, n, r, l, i, o) => {
                const s = e.component = function(e, t, n) {
                    const r = e.type,
                        l = (t ? t.appContext : e.appContext) || il,
                        i = {
                            uid: ol++,
                            vnode: e,
                            type: r,
                            parent: t,
                            appContext: l,
                            root: null,
                            next: null,
                            subTree: null,
                            effect: null,
                            update: null,
                            scope: new Ae(!0),
                            render: null,
                            proxy: null,
                            exposed: null,
                            exposeProxy: null,
                            withProxy: null,
                            provides: t ? t.provides : Object.create(l.provides),
                            accessCache: null,
                            renderCache: [],
                            components: null,
                            directives: null,
                            propsOptions: pr(r, l),
                            emitsOptions: Rn(r, l),
                            emit: null,
                            emitted: null,
                            propsDefaults: Z,
                            inheritAttrs: r.inheritAttrs,
                            ctx: Z,
                            data: Z,
                            props: Z,
                            attrs: Z,
                            slots: Z,
                            refs: Z,
                            setupState: Z,
                            setupContext: null,
                            suspense: n,
                            suspenseId: n ? n.pendingId : 0,
                            asyncDep: null,
                            asyncResolved: !1,
                            isMounted: !1,
                            isUnmounted: !1,
                            isDeactivated: !1,
                            bc: null,
                            c: null,
                            bm: null,
                            m: null,
                            bu: null,
                            u: null,
                            um: null,
                            bum: null,
                            da: null,
                            a: null,
                            rtg: null,
                            rtc: null,
                            ec: null,
                            sp: null
                        };
                    i.ctx = {
                        _: i
                    }, i.root = t ? t.root : i, i.emit = En.bind(null, i), e.ce && e.ce(i);
                    return i
                }(e, r, l);
                if (e.type.__isKeepAlive && (s.ctx.renderer = W), function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        dl = t;
                        const {
                            props: n,
                            children: r
                        } = e.vnode, l = pl(e);
                        ar(e, n, l, t), kr(e, r);
                        const i = l ? hl(e, t) : void 0;
                        dl = !1
                    }(s), s.asyncDep) {
                    if (l && l.registerDep(s, z), !e.el) {
                        const e = s.subTree = Kr(Or);
                        v(null, e, t, n)
                    }
                } else z(s, e, t, n, l, i, o)
            }, A = (e, t, n) => {
                const r = t.component = e.component;
                if (function(e, t, n) {
                        const {
                            props: r,
                            children: l,
                            component: i
                        } = e, {
                            props: o,
                            children: s,
                            patchFlag: a
                        } = t, c = i.emitsOptions;
                        if (t.dirs || t.transition) return !0;
                        if (!(n && a >= 0)) return !(!l && !s || s && s.$stable) || r !== o && (r ? !o || Un(r, o, c) : !!o);
                        if (1024 & a) return !0;
                        if (16 & a) return r ? Un(r, o, c) : !!o;
                        if (8 & a) {
                            const e = t.dynamicProps;
                            for (let t = 0; t < e.length; t++) {
                                const n = e[t];
                                if (o[n] !== r[n] && !Ln(c, n)) return !0
                            }
                        }
                        return !1
                    }(e, t, n)) {
                    if (r.asyncDep && !r.asyncResolved) return void O(r, t, n);
                    r.next = t,
                        function(e) {
                            const t = hn.indexOf(e);
                            t > fn && hn.splice(t, 1)
                        }(r.update), r.update()
                } else t.el = e.el, r.vnode = t
            }, z = (e, t, n, r, l, i, o) => {
                const s = () => {
                        if (e.isMounted) {
                            let t, {
                                    next: n,
                                    bu: r,
                                    u: s,
                                    parent: a,
                                    vnode: c
                                } = e,
                                p = n;
                            Er(e, !1), n ? (n.el = c.el, O(e, n, o)) : n = c, r && $e(r), (t = n.props && n.props.onVnodeBeforeUpdate) && ll(t, a, n, c), Er(e, !0);
                            const d = jn(e),
                                h = e.subTree;
                            e.subTree = d, g(h, d, u(h.el), B(h), e, l, i), n.el = d.el, null === p && function(e, t) {
                                let {
                                    vnode: n,
                                    parent: r
                                } = e;
                                for (; r && r.subTree === n;)(n = r.vnode).el = t, r = r.parent
                            }(e, d.el), s && $r(s, l), (t = n.props && n.props.onVnodeUpdated) && $r((() => ll(t, a, n, c)), l)
                        } else {
                            let o;
                            const {
                                el: s,
                                props: a
                            } = t, {
                                bm: c,
                                m: u,
                                parent: p
                            } = e, d = qn(t);
                            if (Er(e, !1), c && $e(c), !d && (o = a && a.onVnodeBeforeMount) && ll(o, p, t), Er(e, !0), s && Q) {
                                const n = () => {
                                    e.subTree = jn(e), Q(s, e.subTree, e, l, null)
                                };
                                d ? t.type.__asyncLoader().then((() => !e.isUnmounted && n())) : n()
                            } else {
                                const o = e.subTree = jn(e);
                                g(null, o, n, r, e, l, i), t.el = o.el
                            }
                            if (u && $r(u, l), !d && (o = a && a.onVnodeMounted)) {
                                const e = t;
                                $r((() => ll(o, p, e)), l)
                            }(256 & t.shapeFlag || p && qn(p.vnode) && 256 & p.vnode.shapeFlag) && e.a && $r(e.a, l), e.isMounted = !0, t = n = r = null
                        }
                    },
                    a = e.effect = new De(s, (() => kn(c)), e.scope),
                    c = e.update = () => a.run();
                c.id = e.uid, Er(e, !0), c()
            }, O = (e, t, n) => {
                t.component = e;
                const r = e.vnode.props;
                e.vnode = t, e.next = null,
                    function(e, t, n, r) {
                        const {
                            props: l,
                            attrs: i,
                            vnode: {
                                patchFlag: o
                            }
                        } = e, s = Ht(l), [a] = e.propsOptions;
                        let c = !1;
                        if (!(r || o > 0) || 16 & o) {
                            let r;
                            cr(e, t, l, i) && (c = !0);
                            for (const i in s) t && (re(t, i) || (r = xe(i)) !== i && re(t, r)) || (a ? !n || void 0 === n[i] && void 0 === n[r] || (l[i] = ur(a, s, i, void 0, e, !0)) : delete l[i]);
                            if (i !== s)
                                for (const e in i) t && re(t, e) || (delete i[e], c = !0)
                        } else if (8 & o) {
                            const n = e.vnode.dynamicProps;
                            for (let r = 0; r < n.length; r++) {
                                let o = n[r];
                                if (Ln(e.emitsOptions, o)) continue;
                                const u = t[o];
                                if (a)
                                    if (re(i, o)) u !== i[o] && (i[o] = u, c = !0);
                                    else {
                                        const t = be(o);
                                        l[t] = ur(a, s, t, u, e, !1)
                                    }
                                else u !== i[o] && (i[o] = u, c = !0)
                            }
                        }
                        c && Ke(e, "set", "$attrs")
                    }(e, t.props, r, n), ((e, t, n) => {
                        const {
                            vnode: r,
                            slots: l
                        } = e;
                        let i = !0,
                            o = Z;
                        if (32 & r.shapeFlag) {
                            const e = t._;
                            e ? n && 1 === e ? i = !1 : (ee(l, t), n || 1 !== e || delete l._) : (i = !t.$stable, wr(t, l)), o = t
                        } else t && (br(e, t), o = {
                            default: 1
                        });
                        if (i)
                            for (const e in l) mr(e) || e in o || delete l[e]
                    })(e, t.children, n), We(), _n(), qe()
            }, j = function(e, t, n, r, l, i, o, s) {
                let a = arguments.length > 8 && void 0 !== arguments[8] && arguments[8];
                const u = e && e.children,
                    p = e ? e.shapeFlag : 0,
                    d = t.children,
                    {
                        patchFlag: h,
                        shapeFlag: f
                    } = t;
                if (h > 0) {
                    if (128 & h) return void P(u, d, n, r, l, i, o, s, a);
                    if (256 & h) return void T(u, d, n, r, l, i, o, s, a)
                }
                8 & f ? (16 & p && V(u, l, i), d !== u && c(n, d)) : 16 & p ? 16 & f ? P(u, d, n, r, l, i, o, s, a) : V(u, l, i, !0) : (8 & p && c(n, ""), 16 & f && C(d, n, r, l, i, o, s, a))
            }, T = (e, t, n, r, l, i, o, s, a) => {
                t = t || G;
                const c = (e = e || G).length,
                    u = t.length,
                    p = Math.min(c, u);
                let d;
                for (d = 0; d < p; d++) {
                    const r = t[d] = a ? tl(t[d]) : el(t[d]);
                    g(e[d], r, n, null, l, i, o, s, a)
                }
                c > u ? V(e, l, i, !0, !1, p) : C(t, n, r, l, i, o, s, a, p)
            }, P = (e, t, n, r, l, i, o, s, a) => {
                let c = 0;
                const u = t.length;
                let p = e.length - 1,
                    d = u - 1;
                for (; c <= p && c <= d;) {
                    const r = e[c],
                        u = t[c] = a ? tl(t[c]) : el(t[c]);
                    if (!Hr(r, u)) break;
                    g(r, u, n, null, l, i, o, s, a), c++
                }
                for (; c <= p && c <= d;) {
                    const r = e[p],
                        c = t[d] = a ? tl(t[d]) : el(t[d]);
                    if (!Hr(r, c)) break;
                    g(r, c, n, null, l, i, o, s, a), p--, d--
                }
                if (c > p) {
                    if (c <= d) {
                        const e = d + 1,
                            p = e < u ? t[e].el : r;
                        for (; c <= d;) g(null, t[c] = a ? tl(t[c]) : el(t[c]), n, p, l, i, o, s, a), c++
                    }
                } else if (c > d)
                    for (; c <= p;) M(e[c], l, i, !0), c++;
                else {
                    const h = c,
                        f = c,
                        m = new Map;
                    for (c = f; c <= d; c++) {
                        const e = t[c] = a ? tl(t[c]) : el(t[c]);
                        null != e.key && m.set(e.key, c)
                    }
                    let v, y = 0;
                    const w = d - f + 1;
                    let b = !1,
                        k = 0;
                    const x = new Array(w);
                    for (c = 0; c < w; c++) x[c] = 0;
                    for (c = h; c <= p; c++) {
                        const r = e[c];
                        if (y >= w) {
                            M(r, l, i, !0);
                            continue
                        }
                        let u;
                        if (null != r.key) u = m.get(r.key);
                        else
                            for (v = f; v <= d; v++)
                                if (0 === x[v - f] && Hr(r, t[v])) {
                                    u = v;
                                    break
                                } void 0 === u ? M(r, l, i, !0) : (x[u - f] = c + 1, u >= k ? k = u : b = !0, g(r, t[u], n, null, l, i, o, s, a), y++)
                    }
                    const _ = b ? function(e) {
                        const t = e.slice(),
                            n = [0];
                        let r, l, i, o, s;
                        const a = e.length;
                        for (r = 0; r < a; r++) {
                            const a = e[r];
                            if (0 !== a) {
                                if (l = n[n.length - 1], e[l] < a) {
                                    t[r] = l, n.push(r);
                                    continue
                                }
                                for (i = 0, o = n.length - 1; i < o;) s = i + o >> 1, e[n[s]] < a ? i = s + 1 : o = s;
                                a < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
                            }
                        }
                        i = n.length, o = n[i - 1];
                        for (; i-- > 0;) n[i] = o, o = t[o];
                        return n
                    }(x) : G;
                    for (v = _.length - 1, c = w - 1; c >= 0; c--) {
                        const e = f + c,
                            p = t[e],
                            d = e + 1 < u ? t[e + 1].el : r;
                        0 === x[c] ? g(null, p, n, d, l, i, o, s, a) : b && (v < 0 || c !== _[v] ? U(p, n, d, 2) : v--)
                    }
                }
            }, U = function(e, t, r, l) {
                let i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
                const {
                    el: o,
                    type: s,
                    transition: a,
                    children: c,
                    shapeFlag: u
                } = e;
                if (6 & u) return void U(e.component.subTree, t, r, l);
                if (128 & u) return void e.suspense.move(t, r, l);
                if (64 & u) return void s.move(e, t, r, W);
                if (s === Ar) {
                    n(o, t, r);
                    for (let e = 0; e < c.length; e++) U(c[e], t, r, l);
                    return void n(e.anchor, t, r)
                }
                if (s === jr) return void w(e, t, r);
                if (2 !== l && 1 & u && a)
                    if (0 === l) a.beforeEnter(o), n(o, t, r), $r((() => a.enter(o)), i);
                    else {
                        const {
                            leave: e,
                            delayLeave: l,
                            afterLeave: i
                        } = a, s = () => n(o, t, r), c = () => {
                            e(o, (() => {
                                s(), i && i()
                            }))
                        };
                        l ? l(o, s, c) : c()
                    }
                else n(o, t, r)
            }, M = function(e, t, n) {
                let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    l = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                const {
                    type: i,
                    props: o,
                    ref: s,
                    children: a,
                    dynamicChildren: c,
                    shapeFlag: u,
                    patchFlag: p,
                    dirs: d
                } = e;
                if (null != s && Sr(s, null, n, e, !0), 256 & u) return void t.ctx.deactivate(e);
                const h = 1 & u && d,
                    f = !qn(e);
                let g;
                if (f && (g = o && o.onVnodeBeforeUnmount) && ll(g, t, e), 6 & u) D(e.component, n, r);
                else {
                    if (128 & u) return void e.suspense.unmount(n, r);
                    h && Xn(e, null, t, "beforeUnmount"), 64 & u ? e.type.remove(e, t, n, l, W, r) : c && (i !== Ar || p > 0 && 64 & p) ? V(c, t, n, !1, !0) : (i === Ar && 384 & p || !l && 16 & u) && V(a, t, n), r && N(e)
                }(f && (g = o && o.onVnodeUnmounted) || h) && $r((() => {
                    g && ll(g, t, e), h && Xn(e, null, t, "unmounted")
                }), n)
            }, N = e => {
                const {
                    type: t,
                    el: n,
                    anchor: l,
                    transition: i
                } = e;
                if (t === Ar) return void F(n, l);
                if (t === jr) return void b(e);
                const o = () => {
                    r(n), i && !i.persisted && i.afterLeave && i.afterLeave()
                };
                if (1 & e.shapeFlag && i && !i.persisted) {
                    const {
                        leave: t,
                        delayLeave: r
                    } = i, l = () => t(n, o);
                    r ? r(e.el, o, l) : l()
                } else o()
            }, F = (e, t) => {
                let n;
                for (; e !== t;) n = p(e), r(e), e = n;
                r(t)
            }, D = (e, t, n) => {
                const {
                    bum: r,
                    scope: l,
                    update: i,
                    subTree: o,
                    um: s
                } = e;
                r && $e(r), l.stop(), i && (i.active = !1, M(o, e, t, n)), s && $r(s, t), $r((() => {
                    e.isUnmounted = !0
                }), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
            }, V = function(e, t, n) {
                let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                    l = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                for (let i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0; i < e.length; i++) M(e[i], t, n, r, l)
            }, B = e => 6 & e.shapeFlag ? B(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : p(e.anchor || e.el), H = (e, t, n) => {
                null == e ? t._vnode && M(t._vnode, null, null, !0) : g(t._vnode || null, e, t, null, null, null, n), _n(), Cn(), t._vnode = e
            }, W = {
                p: g,
                um: M,
                m: U,
                r: N,
                mt: L,
                mc: C,
                pc: j,
                pbc: $,
                n: B,
                o: e
            };
            let q, Q;
            t && ([q, Q] = t(W));
            return {
                render: H,
                hydrate: q,
                createApp: Cr(H, q)
            }
        }(e)
    }

    function Er(e, t) {
        let {
            effect: n,
            update: r
        } = e;
        n.allowRecurse = r.allowRecurse = t
    }

    function Rr(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        const r = e.children,
            l = t.children;
        if (le(r) && le(l))
            for (let e = 0; e < r.length; e++) {
                const t = r[e];
                let i = l[e];
                1 & i.shapeFlag && !i.dynamicChildren && ((i.patchFlag <= 0 || 32 === i.patchFlag) && (i = l[e] = tl(l[e]), i.el = t.el), n || Rr(t, i))
            }
    }
    const Lr = e => e.__isTeleport,
        Ar = Symbol(void 0),
        zr = Symbol(void 0),
        Or = Symbol(void 0),
        jr = Symbol(void 0),
        Tr = [];
    let Pr = null;

    function Ur() {
        let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        Tr.push(Pr = e ? null : [])
    }
    let Mr = 1;

    function Nr(e) {
        Mr += e
    }

    function Fr(e) {
        return e.dynamicChildren = Mr > 0 ? Pr || G : null, Tr.pop(), Pr = Tr[Tr.length - 1] || null, Mr > 0 && Pr && Pr.push(e), e
    }

    function Dr(e, t, n, r, l, i) {
        return Fr(Gr(e, t, n, r, l, i, !0))
    }

    function Vr(e, t, n, r, l) {
        return Fr(Kr(e, t, n, r, l, !0))
    }

    function Br(e) {
        return !!e && !0 === e.__v_isVNode
    }

    function Hr(e, t) {
        return e.type === t.type && e.key === t.key
    }
    const Wr = "__vInternal",
        qr = e => {
            let {
                key: t
            } = e;
            return null != t ? t : null
        },
        Zr = e => {
            let {
                ref: t,
                ref_key: n,
                ref_for: r
            } = e;
            return null != t ? ce(t) || Qt(t) || ae(t) ? {
                i: An,
                r: t,
                k: n,
                f: !!r
            } : t : null
        };

    function Gr(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
            i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : e === Ar ? 0 : 1,
            o = arguments.length > 6 && void 0 !== arguments[6] && arguments[6],
            s = arguments.length > 7 && void 0 !== arguments[7] && arguments[7];
        const a = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e,
            props: t,
            key: t && qr(t),
            ref: t && Zr(t),
            scopeId: zn,
            slotScopeIds: null,
            children: n,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag: i,
            patchFlag: r,
            dynamicProps: l,
            dynamicChildren: null,
            appContext: null
        };
        return s ? (nl(a, n), 128 & i && e.normalize(a)) : n && (a.shapeFlag |= ce(n) ? 8 : 16), Mr > 0 && !o && Pr && (a.patchFlag > 0 || 6 & i) && 32 !== a.patchFlag && Pr.push(a), a
    }
    const Kr = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
            i = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        e && e !== nr || (e = Or);
        if (Br(e)) {
            const r = Jr(e, t, !0);
            return n && nl(r, n), Mr > 0 && !i && Pr && (6 & r.shapeFlag ? Pr[Pr.indexOf(e)] = r : Pr.push(r)), r.patchFlag |= -2, r
        }
        yl(e) && (e = e.__vccOpts);
        if (t) {
            t = Qr(t);
            let {
                class: e,
                style: n
            } = t;
            e && !ce(e) && (t.class = V(e)), pe(n) && (Bt(n) && !le(n) && (n = ee({}, n)), t.style = M(n))
        }
        const o = ce(e) ? 1 : Mn(e) ? 128 : Lr(e) ? 64 : pe(e) ? 4 : ae(e) ? 2 : 0;
        return Gr(e, t, n, r, l, o, i, !0)
    };

    function Qr(e) {
        return e ? Bt(e) || Wr in e ? ee({}, e) : e : null
    }

    function Jr(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        const {
            props: r,
            ref: l,
            patchFlag: i,
            children: o
        } = e, s = t ? rl(r || {}, t) : r, a = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: s,
            key: s && qr(s),
            ref: t && t.ref ? n && l ? le(l) ? l.concat(Zr(t)) : [l, Zr(t)] : Zr(t) : l,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: o,
            target: e.target,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== Ar ? -1 === i ? 16 : 16 | i : i,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: e.transition,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Jr(e.ssContent),
            ssFallback: e.ssFallback && Jr(e.ssFallback),
            el: e.el,
            anchor: e.anchor
        };
        return a
    }

    function Yr() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : " ",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return Kr(zr, null, e, t)
    }

    function Xr() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return t ? (Ur(), Vr(Or, null, e)) : Kr(Or, null, e)
    }

    function el(e) {
        return null == e || "boolean" == typeof e ? Kr(Or) : le(e) ? Kr(Ar, null, e.slice()) : "object" == typeof e ? tl(e) : Kr(zr, null, String(e))
    }

    function tl(e) {
        return null === e.el || e.memo ? e : Jr(e)
    }

    function nl(e, t) {
        let n = 0;
        const {
            shapeFlag: r
        } = e;
        if (null == t) t = null;
        else if (le(t)) n = 16;
        else if ("object" == typeof t) {
            if (65 & r) {
                const n = t.default;
                return void(n && (n._c && (n._d = !1), nl(e, n()), n._c && (n._d = !0)))
            } {
                n = 32;
                const r = t._;
                r || Wr in t ? 3 === r && An && (1 === An.slots._ ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024)) : t._ctx = An
            }
        } else ae(t) ? (t = {
            default: t,
            _ctx: An
        }, n = 32) : (t = String(t), 64 & r ? (n = 16, t = [Yr(t)]) : n = 8);
        e.children = t, e.shapeFlag |= n
    }

    function rl() {
        const e = {};
        for (let t = 0; t < arguments.length; t++) {
            const n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
            for (const t in n)
                if ("class" === t) e.class !== n.class && (e.class = V([e.class, n.class]));
                else if ("style" === t) e.style = M([e.style, n.style]);
            else if (Y(t)) {
                const r = e[t],
                    l = n[t];
                !l || r === l || le(r) && r.includes(l) || (e[t] = r ? [].concat(r, l) : l)
            } else "" !== t && (e[t] = n[t])
        }
        return e
    }

    function ll(e, t, n) {
        let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        an(e, t, 7, [n, r])
    }
    const il = xr();
    let ol = 0;
    let sl = null;
    const al = () => sl || An,
        cl = e => {
            sl = e, e.scope.on()
        },
        ul = () => {
            sl && sl.scope.off(), sl = null
        };

    function pl(e) {
        return 4 & e.vnode.shapeFlag
    }
    let dl = !1;

    function hl(e, t) {
        const n = e.type;
        e.accessCache = Object.create(null), e.proxy = Wt(new Proxy(e.ctx, sr));
        const {
            setup: r
        } = n;
        if (r) {
            const n = e.setupContext = r.length > 1 ? function(e) {
                const t = t => {
                    e.exposed = t || {}
                };
                let n;
                return {
                    get attrs() {
                        return n || (n = function(e) {
                            return new Proxy(e.attrs, {
                                get: (t, n) => (Ze(e, 0, "$attrs"), t[n])
                            })
                        }(e))
                    },
                    slots: e.slots,
                    emit: e.emit,
                    expose: t
                }
            }(e) : null;
            cl(e), We();
            const l = sn(r, e, 0, [e.props, n]);
            if (qe(), ul(), de(l)) {
                if (l.then(ul, ul), t) return l.then((n => {
                    fl(e, n, t)
                })).catch((t => {
                    cn(t, e, 0)
                }));
                e.asyncDep = l
            } else fl(e, l, t)
        } else gl(e, t)
    }

    function fl(e, t, n) {
        ae(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : pe(t) && (e.setupState = rn(t)), gl(e, n)
    }

    function gl(e, t, n) {
        const r = e.type;
        e.render || (e.render = r.render || K)
    }

    function ml(e) {
        if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(rn(Wt(e.exposed)), {
            get: (t, n) => n in t ? t[n] : n in or ? or[n](e) : void 0
        }))
    }

    function vl(e) {
        let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return ae(e) ? e.displayName || e.name : e.name || t && e.__name
    }

    function yl(e) {
        return ae(e) && "__vccOpts" in e
    }
    const wl = (e, t) => function(e, t) {
        let n, r, l = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        const i = ae(e);
        i ? (n = e, r = K) : (n = e.get, r = e.set);
        return new on(n, r, i || !r, l)
    }(e, t, dl);

    function bl(e, t, n) {
        const r = arguments.length;
        return 2 === r ? pe(t) && !le(t) ? Br(t) ? Kr(e, null, [t]) : Kr(e, t) : Kr(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === r && Br(n) && (n = [n]), Kr(e, t, n))
    }
    const kl = "3.2.39",
        xl = "undefined" != typeof document ? document : null,
        _l = xl && xl.createElement("template"),
        Cl = {
            insert: (e, t, n) => {
                t.insertBefore(e, n || null)
            },
            remove: e => {
                const t = e.parentNode;
                t && t.removeChild(e)
            },
            createElement: (e, t, n, r) => {
                const l = t ? xl.createElementNS("http://www.w3.org/2000/svg", e) : xl.createElement(e, n ? {
                    is: n
                } : void 0);
                return "select" === e && r && null != r.multiple && l.setAttribute("multiple", r.multiple), l
            },
            createText: e => xl.createTextNode(e),
            createComment: e => xl.createComment(e),
            setText: (e, t) => {
                e.nodeValue = t
            },
            setElementText: (e, t) => {
                e.textContent = t
            },
            parentNode: e => e.parentNode,
            nextSibling: e => e.nextSibling,
            querySelector: e => xl.querySelector(e),
            setScopeId(e, t) {
                e.setAttribute(t, "")
            },
            cloneNode(e) {
                const t = e.cloneNode(!0);
                return "_value" in e && (t._value = e._value), t
            },
            insertStaticContent(e, t, n, r, l, i) {
                const o = n ? n.previousSibling : t.lastChild;
                if (l && (l === i || l.nextSibling))
                    for (; t.insertBefore(l.cloneNode(!0), n), l !== i && (l = l.nextSibling););
                else {
                    _l.innerHTML = r ? `<svg>${e}</svg>` : e;
                    const l = _l.content;
                    if (r) {
                        const e = l.firstChild;
                        for (; e.firstChild;) l.appendChild(e.firstChild);
                        l.removeChild(e)
                    }
                    t.insertBefore(l, n)
                }
                return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
            }
        };

    function Sl(e, t, n) {
        const r = e._vtc;
        r && (t = (t ? [t, ...r] : [...r]).join(" ")), null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
    }

    function $l(e, t, n) {
        const r = e.style,
            l = ce(n);
        if (n && !l) {
            for (const e in n) El(r, e, n[e]);
            if (t && !ce(t))
                for (const e in t) null == n[e] && El(r, e, "")
        } else {
            const i = r.display;
            l ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = i)
        }
    }
    const Il = /\s*!important$/;

    function El(e, t, n) {
        if (le(n)) n.forEach((n => El(e, t, n)));
        else if (null == n && (n = ""), t.startsWith("--")) e.setProperty(t, n);
        else {
            const r = function(e, t) {
                const n = Ll[t];
                if (n) return n;
                let r = be(t);
                if ("filter" !== r && r in e) return Ll[t] = r;
                r = _e(r);
                for (let n = 0; n < Rl.length; n++) {
                    const l = Rl[n] + r;
                    if (l in e) return Ll[t] = l
                }
                return t
            }(e, t);
            Il.test(n) ? e.setProperty(xe(r), n.replace(Il, ""), "important") : e[r] = n
        }
    }
    const Rl = ["Webkit", "Moz", "ms"],
        Ll = {};
    const Al = "http://www.w3.org/1999/xlink";

    function zl(e, t, n, r, l) {
        if (r && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(Al, t.slice(6, t.length)) : e.setAttributeNS(Al, t, n);
        else {
            const r = P(t);
            null == n || r && !U(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
        }
    }

    function Ol(e, t, n, r, l, i, o) {
        if ("innerHTML" === t || "textContent" === t) return r && o(r, l, i), void(e[t] = null == n ? "" : n);
        if ("value" === t && "PROGRESS" !== e.tagName && !e.tagName.includes("-")) {
            e._value = n;
            const r = null == n ? "" : n;
            return e.value === r && "OPTION" !== e.tagName || (e.value = r), void(null == n && e.removeAttribute(t))
        }
        let s = !1;
        if ("" === n || null == n) {
            const r = typeof e[t];
            "boolean" === r ? n = U(n) : null == n && "string" === r ? (n = "", s = !0) : "number" === r && (n = 0, s = !0)
        }
        try {
            e[t] = n
        } catch (e) {}
        s && e.removeAttribute(t)
    }
    const [jl, Tl] = (() => {
        let e = Date.now,
            t = !1;
        if ("undefined" != typeof window) {
            Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
            const n = navigator.userAgent.match(/firefox\/(\d+)/i);
            t = !!(n && Number(n[1]) <= 53)
        }
        return [e, t]
    })();
    let Pl = 0;
    const Ul = Promise.resolve(),
        Ml = () => {
            Pl = 0
        };

    function Nl(e, t, n, r) {
        e.addEventListener(t, n, r)
    }

    function Fl(e, t, n, r) {
        e.removeEventListener(t, n, r)
    }

    function Dl(e, t, n, r) {
        let l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
        const i = e._vei || (e._vei = {}),
            o = i[t];
        if (r && o) o.value = r;
        else {
            const [n, s] = Bl(t);
            if (r) {
                Nl(e, n, i[t] = Hl(r, l), s)
            } else o && (Fl(e, n, o, s), i[t] = void 0)
        }
    }
    const Vl = /(?:Once|Passive|Capture)$/;

    function Bl(e) {
        let t;
        if (Vl.test(e)) {
            let n;
            for (t = {}; n = e.match(Vl);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
        }
        return [":" === e[2] ? e.slice(3) : xe(e.slice(2)), t]
    }

    function Hl(e, t) {
        const n = e => {
            const r = e.timeStamp || jl();
            (Tl || r >= n.attached - 1) && an(function(e, t) {
                if (le(t)) {
                    const n = e.stopImmediatePropagation;
                    return e.stopImmediatePropagation = () => {
                        n.call(e), e._stopped = !0
                    }, t.map((e => t => !t._stopped && e && e(t)))
                }
                return t
            }(e, n.value), t, 5, [e])
        };
        return n.value = e, n.attached = Pl || (Ul.then(Ml), Pl = jl()), n
    }
    const Wl = /^on[a-z]/;

    function ql(e, t, n, r) {
        return r ? "innerHTML" === t || "textContent" === t || !!(t in e && Wl.test(t) && ae(n)) : "spellcheck" !== t && "draggable" !== t && "translate" !== t && ("form" !== t && (("list" !== t || "INPUT" !== e.tagName) && (("type" !== t || "TEXTAREA" !== e.tagName) && ((!Wl.test(t) || !ce(n)) && t in e))))
    }
    const Zl = e => {
        const t = e.props["onUpdate:modelValue"] || !1;
        return le(t) ? e => $e(t, e) : t
    };

    function Gl(e) {
        e.target.composing = !0
    }

    function Kl(e) {
        const t = e.target;
        t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
    }
    const Ql = {
            created(e, t, n) {
                let {
                    modifiers: {
                        lazy: r,
                        trim: l,
                        number: i
                    }
                } = t;
                e._assign = Zl(n);
                const o = i || n.props && "number" === n.props.type;
                Nl(e, r ? "change" : "input", (t => {
                    if (t.target.composing) return;
                    let n = e.value;
                    l && (n = n.trim()), o && (n = Ee(n)), e._assign(n)
                })), l && Nl(e, "change", (() => {
                    e.value = e.value.trim()
                })), r || (Nl(e, "compositionstart", Gl), Nl(e, "compositionend", Kl), Nl(e, "change", Kl))
            },
            mounted(e, t) {
                let {
                    value: n
                } = t;
                e.value = null == n ? "" : n
            },
            beforeUpdate(e, t, n) {
                let {
                    value: r,
                    modifiers: {
                        lazy: l,
                        trim: i,
                        number: o
                    }
                } = t;
                if (e._assign = Zl(n), e.composing) return;
                if (document.activeElement === e && "range" !== e.type) {
                    if (l) return;
                    if (i && e.value.trim() === r) return;
                    if ((o || "number" === e.type) && Ee(e.value) === r) return
                }
                const s = null == r ? "" : r;
                e.value !== s && (e.value = s)
            }
        },
        Jl = {
            deep: !0,
            created(e, t, n) {
                e._assign = Zl(n), Nl(e, "change", (() => {
                    const t = e._modelValue,
                        n = ni(e),
                        r = e.checked,
                        l = e._assign;
                    if (le(t)) {
                        const e = H(t, n),
                            i = -1 !== e;
                        if (r && !i) l(t.concat(n));
                        else if (!r && i) {
                            const n = [...t];
                            n.splice(e, 1), l(n)
                        }
                    } else if (oe(t)) {
                        const e = new Set(t);
                        r ? e.add(n) : e.delete(n), l(e)
                    } else l(ri(e, r))
                }))
            },
            mounted: Yl,
            beforeUpdate(e, t, n) {
                e._assign = Zl(n), Yl(e, t, n)
            }
        };

    function Yl(e, t, n) {
        let {
            value: r,
            oldValue: l
        } = t;
        e._modelValue = r, le(r) ? e.checked = H(r, n.props.value) > -1 : oe(r) ? e.checked = r.has(n.props.value) : r !== l && (e.checked = B(r, ri(e, !0)))
    }
    const Xl = {
            created(e, t, n) {
                let {
                    value: r
                } = t;
                e.checked = B(r, n.props.value), e._assign = Zl(n), Nl(e, "change", (() => {
                    e._assign(ni(e))
                }))
            },
            beforeUpdate(e, t, n) {
                let {
                    value: r,
                    oldValue: l
                } = t;
                e._assign = Zl(n), r !== l && (e.checked = B(r, n.props.value))
            }
        },
        ei = {
            deep: !0,
            created(e, t, n) {
                let {
                    value: r,
                    modifiers: {
                        number: l
                    }
                } = t;
                const i = oe(r);
                Nl(e, "change", (() => {
                    const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => l ? Ee(ni(e)) : ni(e)));
                    e._assign(e.multiple ? i ? new Set(t) : t : t[0])
                })), e._assign = Zl(n)
            },
            mounted(e, t) {
                let {
                    value: n
                } = t;
                ti(e, n)
            },
            beforeUpdate(e, t, n) {
                e._assign = Zl(n)
            },
            updated(e, t) {
                let {
                    value: n
                } = t;
                ti(e, n)
            }
        };

    function ti(e, t) {
        const n = e.multiple;
        if (!n || le(t) || oe(t)) {
            for (let r = 0, l = e.options.length; r < l; r++) {
                const l = e.options[r],
                    i = ni(l);
                if (n) le(t) ? l.selected = H(t, i) > -1 : l.selected = t.has(i);
                else if (B(ni(l), t)) return void(e.selectedIndex !== r && (e.selectedIndex = r))
            }
            n || -1 === e.selectedIndex || (e.selectedIndex = -1)
        }
    }

    function ni(e) {
        return "_value" in e ? e._value : e.value
    }

    function ri(e, t) {
        const n = t ? "_trueValue" : "_falseValue";
        return n in e ? e[n] : t
    }
    const li = {
        created(e, t, n) {
            ii(e, t, n, null, "created")
        },
        mounted(e, t, n) {
            ii(e, t, n, null, "mounted")
        },
        beforeUpdate(e, t, n, r) {
            ii(e, t, n, r, "beforeUpdate")
        },
        updated(e, t, n, r) {
            ii(e, t, n, r, "updated")
        }
    };

    function ii(e, t, n, r, l) {
        const i = function(e, t) {
            switch (e) {
                case "SELECT":
                    return ei;
                case "TEXTAREA":
                    return Ql;
                default:
                    switch (t) {
                        case "checkbox":
                            return Jl;
                        case "radio":
                            return Xl;
                        default:
                            return Ql
                    }
            }
        }(e.tagName, n.props && n.props.type)[l];
        i && i(e, t, n, r)
    }
    const oi = {
        beforeMount(e, t, n) {
            let {
                value: r
            } = t, {
                transition: l
            } = n;
            e._vod = "none" === e.style.display ? "" : e.style.display, l && r ? l.beforeEnter(e) : si(e, r)
        },
        mounted(e, t, n) {
            let {
                value: r
            } = t, {
                transition: l
            } = n;
            l && r && l.enter(e)
        },
        updated(e, t, n) {
            let {
                value: r,
                oldValue: l
            } = t, {
                transition: i
            } = n;
            !r != !l && (i ? r ? (i.beforeEnter(e), si(e, !0), i.enter(e)) : i.leave(e, (() => {
                si(e, !1)
            })) : si(e, r))
        },
        beforeUnmount(e, t) {
            let {
                value: n
            } = t;
            si(e, n)
        }
    };

    function si(e, t) {
        e.style.display = t ? e._vod : "none"
    }
    const ai = ee({
        patchProp: function(e, t, n, r) {
            let l = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = arguments.length > 5 ? arguments[5] : void 0,
                o = arguments.length > 6 ? arguments[6] : void 0,
                s = arguments.length > 7 ? arguments[7] : void 0,
                a = arguments.length > 8 ? arguments[8] : void 0;
            "class" === t ? Sl(e, r, l) : "style" === t ? $l(e, n, r) : Y(t) ? X(t) || Dl(e, t, n, r, o) : ("." === t[0] ? (t = t.slice(1), 1) : "^" === t[0] ? (t = t.slice(1), 0) : ql(e, t, r, l)) ? Ol(e, t, r, i, o, s, a) : ("true-value" === t ? e._trueValue = r : "false-value" === t && (e._falseValue = r), zl(e, t, r, l))
        }
    }, Cl);
    let ci;

    function ui() {
        return ci || (ci = Ir(ai))
    }

    function pi(e) {
        if (ce(e)) {
            return document.querySelector(e)
        }
        return e
    }
    var di;
    const hi = "undefined" != typeof window,
        fi = e => "function" == typeof e,
        gi = e => "string" == typeof e,
        mi = () => {};

    function vi(e) {
        return "function" == typeof e ? e() : tn(e)
    }

    function yi(e, t) {
        return function() {
            for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++) r[l] = arguments[l];
            e((() => t.apply(this, r)), {
                fn: t,
                thisArg: this,
                args: r
            })
        }
    }
    hi && (null == (di = null == window ? void 0 : window.navigator) ? void 0 : di.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
    const wi = e => e();

    function bi(e) {
        let t, n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        const l = l => {
            const i = vi(e),
                o = vi(r.maxWait);
            if (t && clearTimeout(t), i <= 0 || void 0 !== o && o <= 0) return n && (clearTimeout(n), n = null), l();
            o && !n && (n = setTimeout((() => {
                t && clearTimeout(t), n = null, l()
            }), o)), t = setTimeout((() => {
                n && clearTimeout(n), n = null, l()
            }), i)
        };
        return l
    }

    function ki() {
        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : wi;
        const t = Jt(!0);

        function n() {
            t.value = !1
        }

        function r() {
            t.value = !0
        }
        const l = function() {
            t.value && e(...arguments)
        };
        return {
            isActive: t,
            pause: n,
            resume: r,
            eventFilter: l
        }
    }

    function xi(e) {
        return !!Le && (function(e) {
            Le && Le.cleanups.push(e)
        }(e), !0)
    }

    function _i(e) {
        let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        al() ? Kn(e) : t ? e() : bn(e)
    }

    function Ci(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const {
            immediate: r = !0,
            immediateCallback: l = !1
        } = n;
        let i = null;
        const o = Jt(!1);

        function s() {
            i && (clearInterval(i), i = null)
        }

        function a() {
            o.value = !1, s()
        }

        function c() {
            tn(t) <= 0 || (o.value = !0, l && e(), s(), i = setInterval(e, vi(t)))
        }
        if (r && hi && c(), Qt(t)) {
            xi(Vn(t, (() => {
                o.value && hi && c()
            })))
        }
        return xi(a), {
            isActive: o,
            pause: a,
            resume: c
        }
    }
    var Si = Object.getOwnPropertySymbols,
        $i = Object.prototype.hasOwnProperty,
        Ii = Object.prototype.propertyIsEnumerable,
        Ei = (e, t) => {
            var n = {};
            for (var r in e) $i.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && Si)
                for (var r of Si(e)) t.indexOf(r) < 0 && Ii.call(e, r) && (n[r] = e[r]);
            return n
        };

    function Ri(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const r = n,
            {
                eventFilter: l = wi
            } = r,
            i = Ei(r, ["eventFilter"]);
        return Vn(e, yi(l, t), i)
    }
    var Li = Object.defineProperty,
        Ai = Object.defineProperties,
        zi = Object.getOwnPropertyDescriptors,
        Oi = Object.getOwnPropertySymbols,
        ji = Object.prototype.hasOwnProperty,
        Ti = Object.prototype.propertyIsEnumerable,
        Pi = (e, t, n) => t in e ? Li(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n,
        Ui = (e, t) => {
            for (var n in t || (t = {})) ji.call(t, n) && Pi(e, n, t[n]);
            if (Oi)
                for (var n of Oi(t)) Ti.call(t, n) && Pi(e, n, t[n]);
            return e
        },
        Mi = (e, t) => Ai(e, zi(t)),
        Ni = (e, t) => {
            var n = {};
            for (var r in e) ji.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
            if (null != e && Oi)
                for (var r of Oi(e)) t.indexOf(r) < 0 && Ti.call(e, r) && (n[r] = e[r]);
            return n
        };

    function Fi(e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const r = n,
            {
                eventFilter: l
            } = r,
            i = Ni(r, ["eventFilter"]),
            {
                eventFilter: o,
                pause: s,
                resume: a,
                isActive: c
            } = ki(l),
            u = Ri(e, t, Mi(Ui({}, i), {
                eventFilter: o
            }));
        return {
            stop: u,
            pause: s,
            resume: a,
            isActive: c
        }
    }

    function Di(e) {
        var t;
        const n = vi(e);
        return null != (t = null == n ? void 0 : n.$el) ? t : n
    }
    const Vi = hi ? window : void 0,
        Bi = hi ? window.document : void 0;

    function Hi() {
        let e, t, n, r;
        for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++) i[o] = arguments[o];
        if (gi(i[0]) ? ([t, n, r] = i, e = Vi) : [e, t, n, r] = i, !e) return mi;
        let s = mi;
        const a = Vn((() => Di(e)), (e => {
                s(), e && (e.addEventListener(t, n, r), s = () => {
                    e.removeEventListener(t, n, r), s = mi
                })
            }), {
                immediate: !0,
                flush: "post"
            }),
            c = () => {
                a(), s()
            };
        return xi(c), c
    }
    hi && window.navigator, hi && window.location;
    const Wi = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        qi = "__vueuse_ssr_handlers__";
    Wi[qi] = Wi[qi] || {};
    const Zi = Wi[qi];

    function Gi(e, t) {
        return Zi[e] || t
    }

    function Ki(e) {
        return null == e ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : "boolean" == typeof e ? "boolean" : "string" == typeof e ? "string" : "object" == typeof e || Array.isArray(e) ? "object" : Number.isNaN(e) ? "any" : "number"
    }
    var Qi = Object.defineProperty,
        Ji = Object.getOwnPropertySymbols,
        Yi = Object.prototype.hasOwnProperty,
        Xi = Object.prototype.propertyIsEnumerable,
        eo = (e, t, n) => t in e ? Qi(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n,
        to = (e, t) => {
            for (var n in t || (t = {})) Yi.call(t, n) && eo(e, n, t[n]);
            if (Ji)
                for (var n of Ji(t)) Xi.call(t, n) && eo(e, n, t[n]);
            return e
        };
    const no = {
        boolean: {
            read: e => "true" === e,
            write: e => String(e)
        },
        object: {
            read: e => JSON.parse(e),
            write: e => JSON.stringify(e)
        },
        number: {
            read: e => Number.parseFloat(e),
            write: e => String(e)
        },
        any: {
            read: e => e,
            write: e => String(e)
        },
        string: {
            read: e => e,
            write: e => String(e)
        },
        map: {
            read: e => new Map(JSON.parse(e)),
            write: e => JSON.stringify(Array.from(e.entries()))
        },
        set: {
            read: e => new Set(JSON.parse(e)),
            write: e => JSON.stringify(Array.from(e))
        },
        date: {
            read: e => new Date(e),
            write: e => e.toISOString()
        }
    };

    function ro(e, t, n) {
        let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        var l;
        const {
            flush: i = "pre",
            deep: o = !0,
            listenToStorageChanges: s = !0,
            writeDefaults: a = !0,
            mergeDefaults: c = !1,
            shallow: u,
            window: p = Vi,
            eventFilter: d,
            onError: h = (e => {
                console.error(e)
            })
        } = r, f = (u ? Yt : Jt)(t);
        if (!n) try {
            n = Gi("getDefaultStorage", (() => {
                var e;
                return null == (e = Vi) ? void 0 : e.localStorage
            }))()
        } catch (e) {
            h(e)
        }
        if (!n) return f;
        const g = vi(t),
            m = Ki(g),
            v = null != (l = r.serializer) ? l : no[m],
            {
                pause: y,
                resume: w
            } = Fi(f, (() => b(f.value)), {
                flush: i,
                deep: o,
                eventFilter: d
            });
        return p && s && Hi(p, "storage", x), x(), f;

        function b(t) {
            try {
                null == t ? n.removeItem(e) : n.setItem(e, v.write(t))
            } catch (e) {
                h(e)
            }
        }

        function k(t) {
            if (!t || t.key === e) {
                y();
                try {
                    const r = t ? t.newValue : n.getItem(e);
                    if (null == r) return a && null !== g && n.setItem(e, v.write(g)), g;
                    if (!t && c) {
                        const e = v.read(r);
                        return fi(c) ? c(e, g) : "object" !== m || Array.isArray(e) ? e : to(to({}, g), e)
                    }
                    return "string" != typeof r ? r : v.read(r)
                } catch (e) {
                    h(e)
                } finally {
                    w()
                }
            }
        }

        function x(t) {
            t && t.key !== e || (f.value = k(t))
        }
    }

    function lo(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        const {
            immediate: n = !0,
            window: r = Vi
        } = t, l = Jt(!1);
        let i = null;

        function o() {
            l.value && r && (e(), i = r.requestAnimationFrame(o))
        }

        function s() {
            !l.value && r && (l.value = !0, o())
        }

        function a() {
            l.value = !1, null != i && r && (r.cancelAnimationFrame(i), i = null)
        }
        return n && s(), xi(a), {
            isActive: l,
            pause: a,
            resume: s
        }
    }
    var io, oo, so = Object.defineProperty,
        ao = Object.getOwnPropertySymbols,
        co = Object.prototype.hasOwnProperty,
        uo = Object.prototype.propertyIsEnumerable,
        po = (e, t, n) => t in e ? so(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n,
        ho = (e, t) => {
            for (var n in t || (t = {})) co.call(t, n) && po(e, n, t[n]);
            if (ao)
                for (var n of ao(t)) uo.call(t, n) && po(e, n, t[n]);
            return e
        };
    (oo = io || (io = {})).UP = "UP", oo.RIGHT = "RIGHT", oo.DOWN = "DOWN", oo.LEFT = "LEFT", oo.NONE = "NONE";
    let fo = 0;
    var go = Object.defineProperty,
        mo = Object.getOwnPropertySymbols,
        vo = Object.prototype.hasOwnProperty,
        yo = Object.prototype.propertyIsEnumerable,
        wo = (e, t, n) => t in e ? go(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n;
    ((e, t) => {
        for (var n in t || (t = {})) vo.call(t, n) && wo(e, n, t[n]);
        if (mo)
            for (var n of mo(t)) yo.call(t, n) && wo(e, n, t[n])
    })({
        linear: function(e) {
            return e
        }
    }, {
        easeInSine: [.12, 0, .39, 0],
        easeOutSine: [.61, 1, .88, 1],
        easeInOutSine: [.37, 0, .63, 1],
        easeInQuad: [.11, 0, .5, 0],
        easeOutQuad: [.5, 1, .89, 1],
        easeInOutQuad: [.45, 0, .55, 1],
        easeInCubic: [.32, 0, .67, 0],
        easeOutCubic: [.33, 1, .68, 1],
        easeInOutCubic: [.65, 0, .35, 1],
        easeInQuart: [.5, 0, .75, 0],
        easeOutQuart: [.25, 1, .5, 1],
        easeInOutQuart: [.76, 0, .24, 1],
        easeInQuint: [.64, 0, .78, 0],
        easeOutQuint: [.22, 1, .36, 1],
        easeInOutQuint: [.83, 0, .17, 1],
        easeInExpo: [.7, 0, .84, 0],
        easeOutExpo: [.16, 1, .3, 1],
        easeInOutExpo: [.87, 0, .13, 1],
        easeInCirc: [.55, 0, 1, .45],
        easeOutCirc: [0, .55, .45, 1],
        easeInOutCirc: [.85, 0, .15, 1],
        easeInBack: [.36, 0, .66, -.56],
        easeOutBack: [.34, 1.56, .64, 1],
        easeInOutBack: [.68, -.6, .32, 1.6]
    });
    const bo = e => {
            const t = ro("WALINE_EMOJI", {}),
                n = Boolean(/@[0-9]+\.[0-9]+\.[0-9]+/.test(e));
            if (n) {
                const n = t.value[e];
                if (n) return Promise.resolve(n)
            }
            return fetch(`${e}/info.json`).then((e => e.json())).then((r => {
                const l = {
                    folder: e,
                    ...r
                };
                return n && (t.value[e] = l), l
            }))
        },
        ko = function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return `${t?`${t}/`:""}${n}${e}${r?`.${r}`:""}`
        },
        xo = e => {
            "AbortError" !== e.name && console.error(e.message)
        },
        _o = e => e instanceof HTMLElement ? e : "string" == typeof e ? document.querySelector(e) : null,
        Co = e => e.type.includes("image"),
        So = e => {
            const t = Array.from(e).find(Co);
            return t ? t.getAsFile() : null
        };

    function $o() {
        return {
            async: !1,
            baseUrl: null,
            breaks: !1,
            extensions: null,
            gfm: !0,
            headerIds: !0,
            headerPrefix: "",
            highlight: null,
            langPrefix: "language-",
            mangle: !0,
            pedantic: !1,
            renderer: null,
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartLists: !1,
            smartypants: !1,
            tokenizer: null,
            walkTokens: null,
            xhtml: !1
        }
    }
    let Io = {
        async: !1,
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1
    };
    const Eo = /[&<>"']/,
        Ro = /[&<>"']/g,
        Lo = /[<>"']|&(?!#?\w+;)/,
        Ao = /[<>"']|&(?!#?\w+;)/g,
        zo = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        Oo = e => zo[e];

    function jo(e, t) {
        if (t) {
            if (Eo.test(e)) return e.replace(Ro, Oo)
        } else if (Lo.test(e)) return e.replace(Ao, Oo);
        return e
    }
    const To = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

    function Po(e) {
        return e.replace(To, ((e, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""))
    }
    const Uo = /(^|[^\[])\^/g;

    function Mo(e, t) {
        e = "string" == typeof e ? e : e.source, t = t || "";
        const n = {
            replace: (t, r) => (r = (r = r.source || r).replace(Uo, "$1"), e = e.replace(t, r), n),
            getRegex: () => new RegExp(e, t)
        };
        return n
    }
    const No = /[^\w:]/g,
        Fo = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

    function Do(e, t, n) {
        if (e) {
            let e;
            try {
                e = decodeURIComponent(Po(n)).replace(No, "").toLowerCase()
            } catch (e) {
                return null
            }
            if (0 === e.indexOf("javascript:") || 0 === e.indexOf("vbscript:") || 0 === e.indexOf("data:")) return null
        }
        t && !Fo.test(n) && (n = function(e, t) {
            Vo[" " + e] || (Bo.test(e) ? Vo[" " + e] = e + "/" : Vo[" " + e] = Ko(e, "/", !0));
            const n = -1 === (e = Vo[" " + e]).indexOf(":");
            return "//" === t.substring(0, 2) ? n ? t : e.replace(Ho, "$1") + t : "/" === t.charAt(0) ? n ? t : e.replace(Wo, "$1") + t : e + t
        }(t, n));
        try {
            n = encodeURI(n).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return n
    }
    const Vo = {},
        Bo = /^[^:]+:\/*[^/]*$/,
        Ho = /^([^:]+:)[\s\S]*$/,
        Wo = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    const qo = {
        exec: function() {}
    };

    function Zo(e) {
        let t, n, r = 1;
        for (; r < arguments.length; r++)
            for (n in t = arguments[r], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
    }

    function Go(e, t) {
        const n = e.replace(/\|/g, ((e, t, n) => {
            let r = !1,
                l = t;
            for (; --l >= 0 && "\\" === n[l];) r = !r;
            return r ? "|" : " |"
        })).split(/ \|/);
        let r = 0;
        if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), n.length > t) n.splice(t);
        else
            for (; n.length < t;) n.push("");
        for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
        return n
    }

    function Ko(e, t, n) {
        const r = e.length;
        if (0 === r) return "";
        let l = 0;
        for (; l < r;) {
            const i = e.charAt(r - l - 1);
            if (i !== t || n) {
                if (i === t || !n) break;
                l++
            } else l++
        }
        return e.slice(0, r - l)
    }

    function Qo(e) {
        e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
    }

    function Jo(e, t) {
        if (t < 1) return "";
        let n = "";
        for (; t > 1;) 1 & t && (n += e), t >>= 1, e += e;
        return n + e
    }

    function Yo(e, t, n, r) {
        const l = t.href,
            i = t.title ? jo(t.title) : null,
            o = e[1].replace(/\\([\[\]])/g, "$1");
        if ("!" !== e[0].charAt(0)) {
            r.state.inLink = !0;
            const e = {
                type: "link",
                raw: n,
                href: l,
                title: i,
                text: o,
                tokens: r.inlineTokens(o)
            };
            return r.state.inLink = !1, e
        }
        return {
            type: "image",
            raw: n,
            href: l,
            title: i,
            text: jo(o)
        }
    }
    class Xo {
        constructor(e) {
            this.options = e || Io
        }
        space(e) {
            const t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0) return {
                type: "space",
                raw: t[0]
            }
        }
        code(e) {
            const t = this.rules.block.code.exec(e);
            if (t) {
                const e = t[0].replace(/^ {1,4}/gm, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? e : Ko(e, "\n")
                }
            }
        }
        fences(e) {
            const t = this.rules.block.fences.exec(e);
            if (t) {
                const e = t[0],
                    n = function(e, t) {
                        const n = e.match(/^(\s+)(?:```)/);
                        if (null === n) return t;
                        const r = n[1];
                        return t.split("\n").map((e => {
                            const t = e.match(/^\s+/);
                            if (null === t) return e;
                            const [n] = t;
                            return n.length >= r.length ? e.slice(r.length) : e
                        })).join("\n")
                    }(e, t[3] || "");
                return {
                    type: "code",
                    raw: e,
                    lang: t[2] ? t[2].trim() : t[2],
                    text: n
                }
            }
        }
        heading(e) {
            const t = this.rules.block.heading.exec(e);
            if (t) {
                let e = t[2].trim();
                if (/#$/.test(e)) {
                    const t = Ko(e, "#");
                    this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim())
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        hr(e) {
            const t = this.rules.block.hr.exec(e);
            if (t) return {
                type: "hr",
                raw: t[0]
            }
        }
        blockquote(e) {
            const t = this.rules.block.blockquote.exec(e);
            if (t) {
                const e = t[0].replace(/^ *>[ \t]?/gm, "");
                return {
                    type: "blockquote",
                    raw: t[0],
                    tokens: this.lexer.blockTokens(e, []),
                    text: e
                }
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n, r, l, i, o, s, a, c, u, p, d, h, f = t[1].trim();
                const g = f.length > 1,
                    m = {
                        type: "list",
                        raw: "",
                        ordered: g,
                        start: g ? +f.slice(0, -1) : "",
                        loose: !1,
                        items: []
                    };
                f = g ? `\\d{1,9}\\${f.slice(-1)}` : `\\${f}`, this.options.pedantic && (f = g ? f : "[*+-]");
                const v = new RegExp(`^( {0,3}${f})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                for (; e && (h = !1, t = v.exec(e)) && !this.rules.block.hr.test(e);) {
                    if (n = t[0], e = e.substring(n.length), c = t[2].split("\n", 1)[0], u = e.split("\n", 1)[0], this.options.pedantic ? (i = 2, d = c.trimLeft()) : (i = t[2].search(/[^ ]/), i = i > 4 ? 1 : i, d = c.slice(i), i += t[1].length), s = !1, !c && /^ *$/.test(u) && (n += u + "\n", e = e.substring(u.length + 1), h = !0), !h) {
                        const t = new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?: [^\\n]*)?(?:\\n|$))`),
                            r = new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                            l = new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),
                            o = new RegExp(`^ {0,${Math.min(3,i-1)}}#`);
                        for (; e && (p = e.split("\n", 1)[0], c = p, this.options.pedantic && (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !l.test(c)) && !o.test(c) && !t.test(c) && !r.test(e);) {
                            if (c.search(/[^ ]/) >= i || !c.trim()) d += "\n" + c.slice(i);
                            else {
                                if (s) break;
                                d += "\n" + c
                            }
                            s || c.trim() || (s = !0), n += p + "\n", e = e.substring(p.length + 1)
                        }
                    }
                    m.loose || (a ? m.loose = !0 : /\n *\n *$/.test(n) && (a = !0)), this.options.gfm && (r = /^\[[ xX]\] /.exec(d), r && (l = "[ ] " !== r[0], d = d.replace(/^\[[ xX]\] +/, ""))), m.items.push({
                        type: "list_item",
                        raw: n,
                        task: !!r,
                        checked: l,
                        loose: !1,
                        text: d
                    }), m.raw += n
                }
                m.items[m.items.length - 1].raw = n.trimRight(), m.items[m.items.length - 1].text = d.trimRight(), m.raw = m.raw.trimRight();
                const y = m.items.length;
                for (o = 0; o < y; o++) {
                    this.lexer.state.top = !1, m.items[o].tokens = this.lexer.blockTokens(m.items[o].text, []);
                    const e = m.items[o].tokens.filter((e => "space" === e.type)),
                        t = e.every((e => {
                            const t = e.raw.split("");
                            let n = 0;
                            for (const e of t)
                                if ("\n" === e && (n += 1), n > 1) return !0;
                            return !1
                        }));
                    !m.loose && e.length && t && (m.loose = !0, m.items[o].loose = !0)
                }
                return m
            }
        }
        html(e) {
            const t = this.rules.block.html.exec(e);
            if (t) {
                const e = {
                    type: "html",
                    raw: t[0],
                    pre: !this.options.sanitizer && ("pre" === t[1] || "script" === t[1] || "style" === t[1]),
                    text: t[0]
                };
                if (this.options.sanitize) {
                    const n = this.options.sanitizer ? this.options.sanitizer(t[0]) : jo(t[0]);
                    e.type = "paragraph", e.text = n, e.tokens = this.lexer.inline(n)
                }
                return e
            }
        }
        def(e) {
            const t = this.rules.block.def.exec(e);
            if (t) {
                t[3] && (t[3] = t[3].substring(1, t[3].length - 1));
                return {
                    type: "def",
                    tag: t[1].toLowerCase().replace(/\s+/g, " "),
                    raw: t[0],
                    href: t[2],
                    title: t[3]
                }
            }
        }
        table(e) {
            const t = this.rules.block.table.exec(e);
            if (t) {
                const e = {
                    type: "table",
                    header: Go(t[1]).map((e => ({
                        text: e
                    }))),
                    align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : []
                };
                if (e.header.length === e.align.length) {
                    e.raw = t[0];
                    let n, r, l, i, o = e.align.length;
                    for (n = 0; n < o; n++) /^ *-+: *$/.test(e.align[n]) ? e.align[n] = "right" : /^ *:-+: *$/.test(e.align[n]) ? e.align[n] = "center" : /^ *:-+ *$/.test(e.align[n]) ? e.align[n] = "left" : e.align[n] = null;
                    for (o = e.rows.length, n = 0; n < o; n++) e.rows[n] = Go(e.rows[n], e.header.length).map((e => ({
                        text: e
                    })));
                    for (o = e.header.length, r = 0; r < o; r++) e.header[r].tokens = this.lexer.inline(e.header[r].text);
                    for (o = e.rows.length, r = 0; r < o; r++)
                        for (i = e.rows[r], l = 0; l < i.length; l++) i[l].tokens = this.lexer.inline(i[l].text);
                    return e
                }
            }
        }
        lheading(e) {
            const t = this.rules.block.lheading.exec(e);
            if (t) return {
                type: "heading",
                raw: t[0],
                depth: "=" === t[2].charAt(0) ? 1 : 2,
                text: t[1],
                tokens: this.lexer.inline(t[1])
            }
        }
        paragraph(e) {
            const t = this.rules.block.paragraph.exec(e);
            if (t) {
                const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: e,
                    tokens: this.lexer.inline(e)
                }
            }
        }
        text(e) {
            const t = this.rules.block.text.exec(e);
            if (t) return {
                type: "text",
                raw: t[0],
                text: t[0],
                tokens: this.lexer.inline(t[0])
            }
        }
        escape(e) {
            const t = this.rules.inline.escape.exec(e);
            if (t) return {
                type: "escape",
                raw: t[0],
                text: jo(t[1])
            }
        }
        tag(e) {
            const t = this.rules.inline.tag.exec(e);
            if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
                type: this.options.sanitize ? "text" : "html",
                raw: t[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : jo(t[0]) : t[0]
            }
        }
        link(e) {
            const t = this.rules.inline.link.exec(e);
            if (t) {
                const e = t[2].trim();
                if (!this.options.pedantic && /^</.test(e)) {
                    if (!/>$/.test(e)) return;
                    const t = Ko(e.slice(0, -1), "\\");
                    if ((e.length - t.length) % 2 == 0) return
                } else {
                    const e = function(e, t) {
                        if (-1 === e.indexOf(t[1])) return -1;
                        const n = e.length;
                        let r = 0,
                            l = 0;
                        for (; l < n; l++)
                            if ("\\" === e[l]) l++;
                            else if (e[l] === t[0]) r++;
                        else if (e[l] === t[1] && (r--, r < 0)) return l;
                        return -1
                    }(t[2], "()");
                    if (e > -1) {
                        const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                        t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = ""
                    }
                }
                let n = t[2],
                    r = "";
                if (this.options.pedantic) {
                    const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
                    e && (n = e[1], r = e[3])
                } else r = t[3] ? t[3].slice(1, -1) : "";
                return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), Yo(t, {
                    href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
                    title: r ? r.replace(this.rules.inline._escapes, "$1") : r
                }, t[0], this.lexer)
            }
        }
        reflink(e, t) {
            let n;
            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                let e = (n[2] || n[1]).replace(/\s+/g, " ");
                if (e = t[e.toLowerCase()], !e || !e.href) {
                    const e = n[0].charAt(0);
                    return {
                        type: "text",
                        raw: e,
                        text: e
                    }
                }
                return Yo(n, e, n[0], this.lexer)
            }
        }
        emStrong(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                r = this.rules.inline.emStrong.lDelim.exec(e);
            if (!r) return;
            if (r[3] && n.match(/[\p{L}\p{N}]/u)) return;
            const l = r[1] || r[2] || "";
            if (!l || l && ("" === n || this.rules.inline.punctuation.exec(n))) {
                const n = r[0].length - 1;
                let l, i, o = n,
                    s = 0;
                const a = "*" === r[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                for (a.lastIndex = 0, t = t.slice(-1 * e.length + n); null != (r = a.exec(t));) {
                    if (l = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !l) continue;
                    if (i = l.length, r[3] || r[4]) {
                        o += i;
                        continue
                    }
                    if ((r[5] || r[6]) && n % 3 && !((n + i) % 3)) {
                        s += i;
                        continue
                    }
                    if (o -= i, o > 0) continue;
                    if (i = Math.min(i, i + o + s), Math.min(n, i) % 2) {
                        const t = e.slice(1, n + r.index + i);
                        return {
                            type: "em",
                            raw: e.slice(0, n + r.index + i + 1),
                            text: t,
                            tokens: this.lexer.inlineTokens(t)
                        }
                    }
                    const t = e.slice(2, n + r.index + i - 1);
                    return {
                        type: "strong",
                        raw: e.slice(0, n + r.index + i + 1),
                        text: t,
                        tokens: this.lexer.inlineTokens(t)
                    }
                }
            }
        }
        codespan(e) {
            const t = this.rules.inline.code.exec(e);
            if (t) {
                let e = t[2].replace(/\n/g, " ");
                const n = /[^ ]/.test(e),
                    r = /^ /.test(e) && / $/.test(e);
                return n && r && (e = e.substring(1, e.length - 1)), e = jo(e, !0), {
                    type: "codespan",
                    raw: t[0],
                    text: e
                }
            }
        }
        br(e) {
            const t = this.rules.inline.br.exec(e);
            if (t) return {
                type: "br",
                raw: t[0]
            }
        }
        del(e) {
            const t = this.rules.inline.del.exec(e);
            if (t) return {
                type: "del",
                raw: t[0],
                text: t[2],
                tokens: this.lexer.inlineTokens(t[2])
            }
        }
        autolink(e, t) {
            const n = this.rules.inline.autolink.exec(e);
            if (n) {
                let e, r;
                return "@" === n[2] ? (e = jo(this.options.mangle ? t(n[1]) : n[1]), r = "mailto:" + e) : (e = jo(n[1]), r = e), {
                    type: "link",
                    raw: n[0],
                    text: e,
                    href: r,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        url(e, t) {
            let n;
            if (n = this.rules.inline.url.exec(e)) {
                let e, r;
                if ("@" === n[2]) e = jo(this.options.mangle ? t(n[0]) : n[0]), r = "mailto:" + e;
                else {
                    let t;
                    do {
                        t = n[0], n[0] = this.rules.inline._backpedal.exec(n[0])[0]
                    } while (t !== n[0]);
                    e = jo(n[0]), r = "www." === n[1] ? "http://" + e : e
                }
                return {
                    type: "link",
                    raw: n[0],
                    text: e,
                    href: r,
                    tokens: [{
                        type: "text",
                        raw: e,
                        text: e
                    }]
                }
            }
        }
        inlineText(e, t) {
            const n = this.rules.inline.text.exec(e);
            if (n) {
                let e;
                return e = this.lexer.state.inRawBlock ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(n[0]) : jo(n[0]) : n[0] : jo(this.options.smartypants ? t(n[0]) : n[0]), {
                    type: "text",
                    raw: n[0],
                    text: e
                }
            }
        }
    }
    const es = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: qo,
        lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
        _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    };
    es.def = Mo(es.def).replace("label", es._label).replace("title", es._title).getRegex(), es.bullet = /(?:[*+-]|\d{1,9}[.)])/, es.listItemStart = Mo(/^( *)(bull) */).replace("bull", es.bullet).getRegex(), es.list = Mo(es.list).replace(/bull/g, es.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + es.def.source + ")").getRegex(), es._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", es._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, es.html = Mo(es.html, "i").replace("comment", es._comment).replace("tag", es._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), es.paragraph = Mo(es._paragraph).replace("hr", es.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", es._tag).getRegex(), es.blockquote = Mo(es.blockquote).replace("paragraph", es.paragraph).getRegex(), es.normal = Zo({}, es), es.gfm = Zo({}, es.normal, {
        table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    }), es.gfm.table = Mo(es.gfm.table).replace("hr", es.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", es._tag).getRegex(), es.gfm.paragraph = Mo(es._paragraph).replace("hr", es.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", es.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", es._tag).getRegex(), es.pedantic = Zo({}, es.normal, {
        html: Mo("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", es._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: qo,
        paragraph: Mo(es.normal._paragraph).replace("hr", es.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", es.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    });
    const ts = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: qo,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
            rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: qo,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\spunctuation])/
    };

    function ns(e) {
        return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…")
    }

    function rs(e) {
        let t, n, r = "";
        const l = e.length;
        for (t = 0; t < l; t++) n = e.charCodeAt(t), Math.random() > .5 && (n = "x" + n.toString(16)), r += "&#" + n + ";";
        return r
    }
    ts._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~", ts.punctuation = Mo(ts.punctuation).replace(/punctuation/g, ts._punctuation).getRegex(), ts.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, ts.escapedEmSt = /\\\*|\\_/g, ts._comment = Mo(es._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), ts.emStrong.lDelim = Mo(ts.emStrong.lDelim).replace(/punct/g, ts._punctuation).getRegex(), ts.emStrong.rDelimAst = Mo(ts.emStrong.rDelimAst, "g").replace(/punct/g, ts._punctuation).getRegex(), ts.emStrong.rDelimUnd = Mo(ts.emStrong.rDelimUnd, "g").replace(/punct/g, ts._punctuation).getRegex(), ts._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, ts._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, ts._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, ts.autolink = Mo(ts.autolink).replace("scheme", ts._scheme).replace("email", ts._email).getRegex(), ts._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, ts.tag = Mo(ts.tag).replace("comment", ts._comment).replace("attribute", ts._attribute).getRegex(), ts._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, ts._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, ts._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, ts.link = Mo(ts.link).replace("label", ts._label).replace("href", ts._href).replace("title", ts._title).getRegex(), ts.reflink = Mo(ts.reflink).replace("label", ts._label).replace("ref", es._label).getRegex(), ts.nolink = Mo(ts.nolink).replace("ref", es._label).getRegex(), ts.reflinkSearch = Mo(ts.reflinkSearch, "g").replace("reflink", ts.reflink).replace("nolink", ts.nolink).getRegex(), ts.normal = Zo({}, ts), ts.pedantic = Zo({}, ts.normal, {
        strong: {
            start: /^__|\*\*/,
            middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            endAst: /\*\*(?!\*)/g,
            endUnd: /__(?!_)/g
        },
        em: {
            start: /^_|\*/,
            middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
            endAst: /\*(?!\*)/g,
            endUnd: /_(?!_)/g
        },
        link: Mo(/^!?\[(label)\]\((.*?)\)/).replace("label", ts._label).getRegex(),
        reflink: Mo(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ts._label).getRegex()
    }), ts.gfm = Zo({}, ts.normal, {
        escape: Mo(ts.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    }), ts.gfm.url = Mo(ts.gfm.url, "i").replace("email", ts.gfm._extended_email).getRegex(), ts.breaks = Zo({}, ts.gfm, {
        br: Mo(ts.br).replace("{2,}", "*").getRegex(),
        text: Mo(ts.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    class ls {
        constructor(e) {
            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || Io, this.options.tokenizer = this.options.tokenizer || new Xo, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
                inLink: !1,
                inRawBlock: !1,
                top: !0
            };
            const t = {
                block: es.normal,
                inline: ts.normal
            };
            this.options.pedantic ? (t.block = es.pedantic, t.inline = ts.pedantic) : this.options.gfm && (t.block = es.gfm, this.options.breaks ? t.inline = ts.breaks : t.inline = ts.gfm), this.tokenizer.rules = t
        }
        static get rules() {
            return {
                block: es,
                inline: ts
            }
        }
        static lex(e, t) {
            return new ls(t).lex(e)
        }
        static lexInline(e, t) {
            return new ls(t).inlineTokens(e)
        }
        lex(e) {
            let t;
            for (e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); t = this.inlineQueue.shift();) this.inlineTokens(t.src, t.tokens);
            return this.tokens
        }
        blockTokens(e) {
            let t, n, r, l, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, ((e, t, n) => t + "    ".repeat(n.length))); e;)
                if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((n => !!(t = n.call({
                        lexer: this
                    }, e, i)) && (e = e.substring(t.raw.length), i.push(t), !0)))))
                    if (t = this.tokenizer.space(e)) e = e.substring(t.raw.length), 1 === t.raw.length && i.length > 0 ? i[i.length - 1].raw += "\n" : i.push(t);
                    else if (t = this.tokenizer.code(e)) e = e.substring(t.raw.length), n = i[i.length - 1], !n || "paragraph" !== n.type && "text" !== n.type ? i.push(t) : (n.raw += "\n" + t.raw, n.text += "\n" + t.text, this.inlineQueue[this.inlineQueue.length - 1].src = n.text);
            else if (t = this.tokenizer.fences(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.heading(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.hr(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.blockquote(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.list(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.html(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.def(e)) e = e.substring(t.raw.length), n = i[i.length - 1], !n || "paragraph" !== n.type && "text" !== n.type ? this.tokens.links[t.tag] || (this.tokens.links[t.tag] = {
                href: t.href,
                title: t.title
            }) : (n.raw += "\n" + t.raw, n.text += "\n" + t.raw, this.inlineQueue[this.inlineQueue.length - 1].src = n.text);
            else if (t = this.tokenizer.table(e)) e = e.substring(t.raw.length), i.push(t);
            else if (t = this.tokenizer.lheading(e)) e = e.substring(t.raw.length), i.push(t);
            else {
                if (r = e, this.options.extensions && this.options.extensions.startBlock) {
                    let t = 1 / 0;
                    const n = e.slice(1);
                    let l;
                    this.options.extensions.startBlock.forEach((function(e) {
                        l = e.call({
                            lexer: this
                        }, n), "number" == typeof l && l >= 0 && (t = Math.min(t, l))
                    })), t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1))
                }
                if (this.state.top && (t = this.tokenizer.paragraph(r))) n = i[i.length - 1], l && "paragraph" === n.type ? (n.raw += "\n" + t.raw, n.text += "\n" + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = n.text) : i.push(t), l = r.length !== e.length, e = e.substring(t.raw.length);
                else if (t = this.tokenizer.text(e)) e = e.substring(t.raw.length), n = i[i.length - 1], n && "text" === n.type ? (n.raw += "\n" + t.raw, n.text += "\n" + t.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = n.text) : i.push(t);
                else if (e) {
                    const t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break
                    }
                    throw new Error(t)
                }
            }
            return this.state.top = !0, i
        }
        inline(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            return this.inlineQueue.push({
                src: e,
                tokens: t
            }), t
        }
        inlineTokens(e) {
            let t, n, r, l, i, o, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                a = e;
            if (this.tokens.links) {
                const e = Object.keys(this.tokens.links);
                if (e.length > 0)
                    for (; null != (l = this.tokenizer.rules.inline.reflinkSearch.exec(a));) e.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, l.index) + "[" + Jo("a", l[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (l = this.tokenizer.rules.inline.blockSkip.exec(a));) a = a.slice(0, l.index) + "[" + Jo("a", l[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; null != (l = this.tokenizer.rules.inline.escapedEmSt.exec(a));) a = a.slice(0, l.index) + "++" + a.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
            for (; e;)
                if (i || (o = ""), i = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((n => !!(t = n.call({
                        lexer: this
                    }, e, s)) && (e = e.substring(t.raw.length), s.push(t), !0)))))
                    if (t = this.tokenizer.escape(e)) e = e.substring(t.raw.length), s.push(t);
                    else if (t = this.tokenizer.tag(e)) e = e.substring(t.raw.length), n = s[s.length - 1], n && "text" === t.type && "text" === n.type ? (n.raw += t.raw, n.text += t.text) : s.push(t);
            else if (t = this.tokenizer.link(e)) e = e.substring(t.raw.length), s.push(t);
            else if (t = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(t.raw.length), n = s[s.length - 1], n && "text" === t.type && "text" === n.type ? (n.raw += t.raw, n.text += t.text) : s.push(t);
            else if (t = this.tokenizer.emStrong(e, a, o)) e = e.substring(t.raw.length), s.push(t);
            else if (t = this.tokenizer.codespan(e)) e = e.substring(t.raw.length), s.push(t);
            else if (t = this.tokenizer.br(e)) e = e.substring(t.raw.length), s.push(t);
            else if (t = this.tokenizer.del(e)) e = e.substring(t.raw.length), s.push(t);
            else if (t = this.tokenizer.autolink(e, rs)) e = e.substring(t.raw.length), s.push(t);
            else if (this.state.inLink || !(t = this.tokenizer.url(e, rs))) {
                if (r = e, this.options.extensions && this.options.extensions.startInline) {
                    let t = 1 / 0;
                    const n = e.slice(1);
                    let l;
                    this.options.extensions.startInline.forEach((function(e) {
                        l = e.call({
                            lexer: this
                        }, n), "number" == typeof l && l >= 0 && (t = Math.min(t, l))
                    })), t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1))
                }
                if (t = this.tokenizer.inlineText(r, ns)) e = e.substring(t.raw.length), "_" !== t.raw.slice(-1) && (o = t.raw.slice(-1)), i = !0, n = s[s.length - 1], n && "text" === n.type ? (n.raw += t.raw, n.text += t.text) : s.push(t);
                else if (e) {
                    const t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break
                    }
                    throw new Error(t)
                }
            } else e = e.substring(t.raw.length), s.push(t);
            return s
        }
    }
    class is {
        constructor(e) {
            this.options = e || Io
        }
        code(e, t, n) {
            const r = (t || "").match(/\S*/)[0];
            if (this.options.highlight) {
                const t = this.options.highlight(e, r);
                null != t && t !== e && (n = !0, e = t)
            }
            return e = e.replace(/\n$/, "") + "\n", r ? '<pre><code class="' + this.options.langPrefix + jo(r, !0) + '">' + (n ? e : jo(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : jo(e, !0)) + "</code></pre>\n"
        }
        blockquote(e) {
            return `<blockquote>\n${e}</blockquote>\n`
        }
        html(e) {
            return e
        }
        heading(e, t, n, r) {
            if (this.options.headerIds) {
                return `<h${t} id="${this.options.headerPrefix+r.slug(n)}">${e}</h${t}>\n`
            }
            return `<h${t}>${e}</h${t}>\n`
        }
        hr() {
            return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
        }
        list(e, t, n) {
            const r = t ? "ol" : "ul";
            return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + r + ">\n"
        }
        listitem(e) {
            return `<li>${e}</li>\n`
        }
        checkbox(e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
        }
        paragraph(e) {
            return `<p>${e}</p>\n`
        }
        table(e, t) {
            return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
        }
        tablerow(e) {
            return `<tr>\n${e}</tr>\n`
        }
        tablecell(e, t) {
            const n = t.header ? "th" : "td";
            return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
        }
        strong(e) {
            return `<strong>${e}</strong>`
        }
        em(e) {
            return `<em>${e}</em>`
        }
        codespan(e) {
            return `<code>${e}</code>`
        }
        br() {
            return this.options.xhtml ? "<br/>" : "<br>"
        }
        del(e) {
            return `<del>${e}</del>`
        }
        link(e, t, n) {
            if (null === (e = Do(this.options.sanitize, this.options.baseUrl, e))) return n;
            let r = '<a href="' + jo(e) + '"';
            return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>", r
        }
        image(e, t, n) {
            if (null === (e = Do(this.options.sanitize, this.options.baseUrl, e))) return n;
            let r = `<img src="${e}" alt="${n}"`;
            return t && (r += ` title="${t}"`), r += this.options.xhtml ? "/>" : ">", r
        }
        text(e) {
            return e
        }
    }
    class os {
        strong(e) {
            return e
        }
        em(e) {
            return e
        }
        codespan(e) {
            return e
        }
        del(e) {
            return e
        }
        html(e) {
            return e
        }
        text(e) {
            return e
        }
        link(e, t, n) {
            return "" + n
        }
        image(e, t, n) {
            return "" + n
        }
        br() {
            return ""
        }
    }
    class ss {
        constructor() {
            this.seen = {}
        }
        serialize(e) {
            return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-")
        }
        getNextSafeSlug(e, t) {
            let n = e,
                r = 0;
            if (this.seen.hasOwnProperty(n)) {
                r = this.seen[e];
                do {
                    r++, n = e + "-" + r
                } while (this.seen.hasOwnProperty(n))
            }
            return t || (this.seen[e] = r, this.seen[n] = 0), n
        }
        slug(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n = this.serialize(e);
            return this.getNextSafeSlug(n, t.dryrun)
        }
    }
    class as {
        constructor(e) {
            this.options = e || Io, this.options.renderer = this.options.renderer || new is, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new os, this.slugger = new ss
        }
        static parse(e, t) {
            return new as(t).parse(e)
        }
        static parseInline(e, t) {
            return new as(t).parseInline(e)
        }
        parse(e) {
            let t, n, r, l, i, o, s, a, c, u, p, d, h, f, g, m, v, y, w, b = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                k = "";
            const x = e.length;
            for (t = 0; t < x; t++)
                if (u = e[t], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[u.type] && (w = this.options.extensions.renderers[u.type].call({
                        parser: this
                    }, u), !1 !== w || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(u.type))) k += w || "";
                else switch (u.type) {
                    case "space":
                        continue;
                    case "hr":
                        k += this.renderer.hr();
                        continue;
                    case "heading":
                        k += this.renderer.heading(this.parseInline(u.tokens), u.depth, Po(this.parseInline(u.tokens, this.textRenderer)), this.slugger);
                        continue;
                    case "code":
                        k += this.renderer.code(u.text, u.lang, u.escaped);
                        continue;
                    case "table":
                        for (a = "", s = "", l = u.header.length, n = 0; n < l; n++) s += this.renderer.tablecell(this.parseInline(u.header[n].tokens), {
                            header: !0,
                            align: u.align[n]
                        });
                        for (a += this.renderer.tablerow(s), c = "", l = u.rows.length, n = 0; n < l; n++) {
                            for (o = u.rows[n], s = "", i = o.length, r = 0; r < i; r++) s += this.renderer.tablecell(this.parseInline(o[r].tokens), {
                                header: !1,
                                align: u.align[r]
                            });
                            c += this.renderer.tablerow(s)
                        }
                        k += this.renderer.table(a, c);
                        continue;
                    case "blockquote":
                        c = this.parse(u.tokens), k += this.renderer.blockquote(c);
                        continue;
                    case "list":
                        for (p = u.ordered, d = u.start, h = u.loose, l = u.items.length, c = "", n = 0; n < l; n++) g = u.items[n], m = g.checked, v = g.task, f = "", g.task && (y = this.renderer.checkbox(m), h ? g.tokens.length > 0 && "paragraph" === g.tokens[0].type ? (g.tokens[0].text = y + " " + g.tokens[0].text, g.tokens[0].tokens && g.tokens[0].tokens.length > 0 && "text" === g.tokens[0].tokens[0].type && (g.tokens[0].tokens[0].text = y + " " + g.tokens[0].tokens[0].text)) : g.tokens.unshift({
                            type: "text",
                            text: y
                        }) : f += y), f += this.parse(g.tokens, h), c += this.renderer.listitem(f, v, m);
                        k += this.renderer.list(c, p, d);
                        continue;
                    case "html":
                        k += this.renderer.html(u.text);
                        continue;
                    case "paragraph":
                        k += this.renderer.paragraph(this.parseInline(u.tokens));
                        continue;
                    case "text":
                        for (c = u.tokens ? this.parseInline(u.tokens) : u.text; t + 1 < x && "text" === e[t + 1].type;) u = e[++t], c += "\n" + (u.tokens ? this.parseInline(u.tokens) : u.text);
                        k += b ? this.renderer.paragraph(c) : c;
                        continue;
                    default: {
                        const e = 'Token with "' + u.type + '" type was not found.';
                        if (this.options.silent) return void console.error(e);
                        throw new Error(e)
                    }
                }
            return k
        }
        parseInline(e, t) {
            t = t || this.renderer;
            let n, r, l, i = "";
            const o = e.length;
            for (n = 0; n < o; n++)
                if (r = e[n], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type] && (l = this.options.extensions.renderers[r.type].call({
                        parser: this
                    }, r), !1 !== l || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type))) i += l || "";
                else switch (r.type) {
                    case "escape":
                    case "text":
                        i += t.text(r.text);
                        break;
                    case "html":
                        i += t.html(r.text);
                        break;
                    case "link":
                        i += t.link(r.href, r.title, this.parseInline(r.tokens, t));
                        break;
                    case "image":
                        i += t.image(r.href, r.title, r.text);
                        break;
                    case "strong":
                        i += t.strong(this.parseInline(r.tokens, t));
                        break;
                    case "em":
                        i += t.em(this.parseInline(r.tokens, t));
                        break;
                    case "codespan":
                        i += t.codespan(r.text);
                        break;
                    case "br":
                        i += t.br();
                        break;
                    case "del":
                        i += t.del(this.parseInline(r.tokens, t));
                        break;
                    default: {
                        const e = 'Token with "' + r.type + '" type was not found.';
                        if (this.options.silent) return void console.error(e);
                        throw new Error(e)
                    }
                }
            return i
        }
    }

    function cs(e, t, n) {
        if (null == e) throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        if ("function" == typeof t && (n = t, t = null), Qo(t = Zo({}, cs.defaults, t || {})), n) {
            const r = t.highlight;
            let l;
            try {
                l = ls.lex(e, t)
            } catch (e) {
                return n(e)
            }
            const i = function(e) {
                let i;
                if (!e) try {
                    t.walkTokens && cs.walkTokens(l, t.walkTokens), i = as.parse(l, t)
                } catch (t) {
                    e = t
                }
                return t.highlight = r, e ? n(e) : n(null, i)
            };
            if (!r || r.length < 3) return i();
            if (delete t.highlight, !l.length) return i();
            let o = 0;
            return cs.walkTokens(l, (function(e) {
                "code" === e.type && (o++, setTimeout((() => {
                    r(e.text, e.lang, (function(t, n) {
                        if (t) return i(t);
                        null != n && n !== e.text && (e.text = n, e.escaped = !0), o--, 0 === o && i()
                    }))
                }), 0))
            })), void(0 === o && i())
        }

        function r(e) {
            if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + jo(e.message + "", !0) + "</pre>";
            throw e
        }
        try {
            const n = ls.lex(e, t);
            if (t.walkTokens) {
                if (t.async) return Promise.all(cs.walkTokens(n, t.walkTokens)).then((() => as.parse(n, t))).catch(r);
                cs.walkTokens(n, t.walkTokens)
            }
            return as.parse(n, t)
        } catch (e) {
            r(e)
        }
    }
    cs.options = cs.setOptions = function(e) {
        var t;
        return Zo(cs.defaults, e), t = cs.defaults, Io = t, cs
    }, cs.getDefaults = $o, cs.defaults = Io, cs.use = function() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        const r = Zo({}, ...t),
            l = cs.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
        let i;
        t.forEach((e => {
            if (e.extensions && (i = !0, e.extensions.forEach((e => {
                    if (!e.name) throw new Error("extension name required");
                    if (e.renderer) {
                        const t = l.renderers ? l.renderers[e.name] : null;
                        l.renderers[e.name] = t ? function() {
                            for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++) r[l] = arguments[l];
                            let i = e.renderer.apply(this, r);
                            return !1 === i && (i = t.apply(this, r)), i
                        } : e.renderer
                    }
                    if (e.tokenizer) {
                        if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'");
                        l[e.level] ? l[e.level].unshift(e.tokenizer) : l[e.level] = [e.tokenizer], e.start && ("block" === e.level ? l.startBlock ? l.startBlock.push(e.start) : l.startBlock = [e.start] : "inline" === e.level && (l.startInline ? l.startInline.push(e.start) : l.startInline = [e.start]))
                    }
                    e.childTokens && (l.childTokens[e.name] = e.childTokens)
                }))), e.renderer) {
                const t = cs.defaults.renderer || new is;
                for (const n in e.renderer) {
                    const r = t[n];
                    t[n] = function() {
                        for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++) i[o] = arguments[o];
                        let s = e.renderer[n].apply(t, i);
                        return !1 === s && (s = r.apply(t, i)), s
                    }
                }
                r.renderer = t
            }
            if (e.tokenizer) {
                const t = cs.defaults.tokenizer || new Xo;
                for (const n in e.tokenizer) {
                    const r = t[n];
                    t[n] = function() {
                        for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++) i[o] = arguments[o];
                        let s = e.tokenizer[n].apply(t, i);
                        return !1 === s && (s = r.apply(t, i)), s
                    }
                }
                r.tokenizer = t
            }
            if (e.walkTokens) {
                const t = cs.defaults.walkTokens;
                r.walkTokens = function(n) {
                    let r = [];
                    return r.push(e.walkTokens.call(this, n)), t && (r = r.concat(t.call(this, n))), r
                }
            }
            i && (r.extensions = l), cs.setOptions(r)
        }))
    }, cs.walkTokens = function(e, t) {
        let n = [];
        for (const r of e) switch (n = n.concat(t.call(cs, r)), r.type) {
            case "table":
                for (const e of r.header) n = n.concat(cs.walkTokens(e.tokens, t));
                for (const e of r.rows)
                    for (const r of e) n = n.concat(cs.walkTokens(r.tokens, t));
                break;
            case "list":
                n = n.concat(cs.walkTokens(r.items, t));
                break;
            default:
                cs.defaults.extensions && cs.defaults.extensions.childTokens && cs.defaults.extensions.childTokens[r.type] ? cs.defaults.extensions.childTokens[r.type].forEach((function(e) {
                    n = n.concat(cs.walkTokens(r[e], t))
                })) : r.tokens && (n = n.concat(cs.walkTokens(r.tokens, t)))
        }
        return n
    }, cs.parseInline = function(e, t) {
        if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");
        if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        Qo(t = Zo({}, cs.defaults, t || {}));
        try {
            const n = ls.lexInline(e, t);
            return t.walkTokens && cs.walkTokens(n, t.walkTokens), as.parseInline(n, t)
        } catch (e) {
            if (e.message += "\nPlease report this to https://github.com/markedjs/marked.", t.silent) return "<p>An error occurred:</p><pre>" + jo(e.message + "", !0) + "</pre>";
            throw e
        }
    }, cs.Parser = as, cs.parser = as.parse, cs.Renderer = is, cs.TextRenderer = os, cs.Lexer = ls, cs.lexer = ls.lex, cs.Tokenizer = Xo, cs.Slugger = ss, cs.parse = cs;
    const us = /\$.*?\$/,
        ps = /^\$(.*?)\$/,
        ds = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/,
        hs = function() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return e.replace(/:(.+?):/g, ((e, n) => t[n] ? `<img class="wl-emoji" src="${t[n]}" alt="${n}">` : e))
        },
        fs = (e, t) => {
            let {
                emojiMap: n,
                highlighter: r,
                texRenderer: l
            } = t;
            if (cs.setOptions({
                    highlight: r || void 0,
                    breaks: !0,
                    smartLists: !0,
                    smartypants: !0
                }), l) {
                const e = (e => [{
                    name: "blockMath",
                    level: "block",
                    tokenizer(t) {
                        const n = ds.exec(t);
                        if (null !== n) return {
                            type: "html",
                            raw: n[0],
                            text: e(!0, n[1])
                        }
                    }
                }, {
                    name: "inlineMath",
                    level: "inline",
                    start(e) {
                        const t = e.search(us);
                        return -1 !== t ? t : e.length
                    },
                    tokenizer(t) {
                        const n = ps.exec(t);
                        if (null !== n) return {
                            type: "html",
                            raw: n[0],
                            text: e(!1, n[1])
                        }
                    }
                }])(l);
                cs.use({
                    extensions: e
                })
            }
            return cs.parse(hs(e, n))
        },
        gs = e => e.dataset.path || e.getAttribute("id"),
        ms = e => {
            let {
                serverURL: t,
                path: n = window.location.pathname,
                selector: r = ".waline-comment-count",
                lang: l = "zh-CN"
            } = e;
            const i = new AbortController,
                o = document.querySelectorAll(r);
            return o.length && (e => {
                let {
                    serverURL: t,
                    lang: n,
                    paths: r,
                    signal: l
                } = e;
                return fetch(`${t}/comment?type=count&url=${encodeURIComponent(r.join(","))}&lang=${n}`, {
                    signal: l,
                    headers: {}
                }).then((e => e.json())).then((e => x(e, "comment count"))).then((e => Array.isArray(e) ? e : [e]))
            })({
                serverURL: R(t),
                paths: Array.from(o).map((e => $(e.dataset.path || e.getAttribute("id") || n))),
                lang: l,
                signal: i.signal
            }).then((e => {
                o.forEach(((t, n) => {
                    t.innerText = e[n].toString()
                }))
            })).catch(xo), i.abort.bind(i)
        };
    e.commentCount = ms;
    let vs = null;
    const ys = () => vs || (vs = ro("WALINE_LIKE", []));
    var ws = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        bs = {},
        ks = {},
        xs = {},
        _s = ws && ws.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(l, i) {
                function o(e) {
                    try {
                        a(r.next(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function s(e) {
                    try {
                        a(r.throw(e))
                    } catch (e) {
                        i(e)
                    }
                }

                function a(e) {
                    var t;
                    e.done ? l(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(o, s)
                }
                a((r = r.apply(e, t || [])).next())
            }))
        },
        Cs = ws && ws.__generator || function(e, t) {
            var n, r, l, i, o = {
                label: 0,
                sent: function() {
                    if (1 & l[0]) throw l[1];
                    return l[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(i) {
                return function(s) {
                    return function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; o;) try {
                            if (n = 1, r && (l = 2 & i[0] ? r.return : i[0] ? r.throw || ((l = r.return) && l.call(r), 0) : r.next) && !(l = l.call(r, i[1])).done) return l;
                            switch (r = 0, l && (i = [2 & i[0], l.value]), i[0]) {
                                case 0:
                                case 1:
                                    l = i;
                                    break;
                                case 4:
                                    return o.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    o.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = o.ops.pop(), o.trys.pop();
                                    continue;
                                default:
                                    if (!(l = o.trys, (l = l.length > 0 && l[l.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                        o = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!l || i[1] > l[0] && i[1] < l[3])) {
                                        o.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && o.label < l[1]) {
                                        o.label = l[1], l = i;
                                        break
                                    }
                                    if (l && o.label < l[2]) {
                                        o.label = l[2], o.ops.push(i);
                                        break
                                    }
                                    l[2] && o.ops.pop(), o.trys.pop();
                                    continue
                            }
                            i = t.call(e, o)
                        } catch (e) {
                            i = [6, e], r = 0
                        } finally {
                            n = l = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    }([i, s])
                }
            }
        };
    Object.defineProperty(xs, "__esModule", {
        value: !0
    }), xs.ReCaptchaInstance = void 0;
    var Ss = function() {
        function e(e, t, n) {
            this.siteKey = e, this.recaptchaID = t, this.recaptcha = n, this.styleContainer = null
        }
        return e.prototype.execute = function(e) {
            return _s(this, void 0, void 0, (function() {
                return Cs(this, (function(t) {
                    return [2, this.recaptcha.enterprise ? this.recaptcha.enterprise.execute(this.recaptchaID, {
                        action: e
                    }) : this.recaptcha.execute(this.recaptchaID, {
                        action: e
                    })]
                }))
            }))
        }, e.prototype.getSiteKey = function() {
            return this.siteKey
        }, e.prototype.hideBadge = function() {
            null === this.styleContainer && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer))
        }, e.prototype.showBadge = function() {
            null !== this.styleContainer && (document.head.removeChild(this.styleContainer), this.styleContainer = null)
        }, e
    }();
    xs.ReCaptchaInstance = Ss, Object.defineProperty(ks, "__esModule", {
        value: !0
    }), ks.getInstance = ks.load = void 0;
    var $s, Is = xs;
    ! function(e) {
        e[e.NOT_LOADED = 0] = "NOT_LOADED", e[e.LOADING = 1] = "LOADING", e[e.LOADED = 2] = "LOADED"
    }($s || ($s = {}));
    var Es = function() {
        function e() {}
        return e.load = function(t, n) {
            if (void 0 === n && (n = {}), "undefined" == typeof document) return Promise.reject(new Error("This is a library for the browser!"));
            if (e.getLoadingState() === $s.LOADED) return e.instance.getSiteKey() === t ? Promise.resolve(e.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
            if (e.getLoadingState() === $s.LOADING) return t !== e.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise((function(t, n) {
                e.successfulLoadingConsumers.push((function(e) {
                    return t(e)
                })), e.errorLoadingRunnable.push((function(e) {
                    return n(e)
                }))
            }));
            e.instanceSiteKey = t, e.setLoadingState($s.LOADING);
            var r = new e;
            return new Promise((function(l, i) {
                r.loadScript(t, n.useRecaptchaNet || !1, n.useEnterprise || !1, n.renderParameters ? n.renderParameters : {}, n.customUrl).then((function() {
                    e.setLoadingState($s.LOADED);
                    var i = r.doExplicitRender(grecaptcha, t, n.explicitRenderParameters ? n.explicitRenderParameters : {}, n.useEnterprise || !1),
                        o = new Is.ReCaptchaInstance(t, i, grecaptcha);
                    e.successfulLoadingConsumers.forEach((function(e) {
                        return e(o)
                    })), e.successfulLoadingConsumers = [], n.autoHideBadge && o.hideBadge(), e.instance = o, l(o)
                })).catch((function(t) {
                    e.errorLoadingRunnable.forEach((function(e) {
                        return e(t)
                    })), e.errorLoadingRunnable = [], i(t)
                }))
            }))
        }, e.getInstance = function() {
            return e.instance
        }, e.setLoadingState = function(t) {
            e.loadingState = t
        }, e.getLoadingState = function() {
            return null === e.loadingState ? $s.NOT_LOADED : e.loadingState
        }, e.prototype.loadScript = function(t, n, r, l, i) {
            var o = this;
            void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === l && (l = {}), void 0 === i && (i = "");
            var s = document.createElement("script");
            s.setAttribute("recaptcha-v3-script", "");
            var a = "https://www.google.com/recaptcha/api.js";
            n && (a = r ? "https://recaptcha.net/recaptcha/enterprise.js" : "https://recaptcha.net/recaptcha/api.js"), r && (a = "https://www.google.com/recaptcha/enterprise.js"), i && (a = i), l.render && (l.render = void 0);
            var c = this.buildQueryString(l);
            return s.src = a + "?render=explicit" + c, new Promise((function(t, n) {
                s.addEventListener("load", o.waitForScriptToLoad((function() {
                    t(s)
                }), r), !1), s.onerror = function(t) {
                    e.setLoadingState($s.NOT_LOADED), n(t)
                }, document.head.appendChild(s)
            }))
        }, e.prototype.buildQueryString = function(e) {
            return Object.keys(e).length < 1 ? "" : "&" + Object.keys(e).filter((function(t) {
                return !!e[t]
            })).map((function(t) {
                return t + "=" + e[t]
            })).join("&")
        }, e.prototype.waitForScriptToLoad = function(t, n) {
            var r = this;
            return function() {
                void 0 === window.grecaptcha ? setTimeout((function() {
                    r.waitForScriptToLoad(t, n)
                }), e.SCRIPT_LOAD_DELAY) : n ? window.grecaptcha.enterprise.ready((function() {
                    t()
                })) : window.grecaptcha.ready((function() {
                    t()
                }))
            }
        }, e.prototype.doExplicitRender = function(e, t, n, r) {
            var l = {
                sitekey: t,
                badge: n.badge,
                size: n.size,
                tabindex: n.tabindex
            };
            return n.container ? r ? e.enterprise.render(n.container, l) : e.render(n.container, l) : r ? e.enterprise.render(l) : e.render(l)
        }, e.loadingState = null, e.instance = null, e.instanceSiteKey = null, e.successfulLoadingConsumers = [], e.errorLoadingRunnable = [], e.SCRIPT_LOAD_DELAY = 25, e
    }();
    ks.load = Es.load, ks.getInstance = Es.getInstance,
        function(e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ReCaptchaInstance = e.getInstance = e.load = void 0;
            var t = ks;
            Object.defineProperty(e, "load", {
                enumerable: !0,
                get: function() {
                    return t.load
                }
            }), Object.defineProperty(e, "getInstance", {
                enumerable: !0,
                get: function() {
                    return t.getInstance
                }
            });
            var n = xs;
            Object.defineProperty(e, "ReCaptchaInstance", {
                enumerable: !0,
                get: function() {
                    return n.ReCaptchaInstance
                }
            })
        }(bs);
    const Rs = {},
        Ls = (e, t) => {
            const n = function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const {
                    controls: t = !1,
                    interval: n = "requestAnimationFrame"
                } = e, r = Jt(new Date), l = () => r.value = new Date, i = "requestAnimationFrame" === n ? lo(l, {
                    immediate: !0
                }) : Ci(l, n, {
                    immediate: !0
                });
                return t ? ho({
                    now: r
                }, i) : r
            }();
            return wl((() => j(e, n.value, t)))
        },
        As = "id",
        zs = "i";
    let Os = null;
    const js = () => Os || (Os = ro("WALINE_VOTE", []));
    let Ts = null;
    const Ps = () => Ts || (Ts = ro("WALINE_USER", {}));
    var Us = Wn({
            setup() {
                const e = Jt([]),
                    t = js(),
                    n = Nn("config"),
                    r = wl((() => n.value.locale)),
                    l = wl((() => {
                        const {
                            reaction: l,
                            path: i
                        } = n.value;
                        return l.map(((n, l) => ({
                            icon: n,
                            vote: e.value[l] || 0,
                            desc: r.value[`reaction${l}`],
                            active: Boolean(t.value.find((e => {
                                let {
                                    [As]: t, [zs]: n
                                } = e;
                                return t === i && n === l
                            })))
                        })))
                    }));
                let i;
                return Kn((() => (() => {
                    const {
                        serverURL: t,
                        lang: r,
                        path: l,
                        reaction: o
                    } = n.value;
                    if (o.length) {
                        const n = new AbortController;
                        _({
                            serverURL: t,
                            lang: r,
                            paths: [l],
                            type: o.map(((e, t) => `reaction${t}`)),
                            signal: n.signal
                        }).then((t => {
                            Array.isArray(t) || "number" == typeof t || (e.value = o.map(((e, n) => t[`reaction${n}`])))
                        })), i = n.abort.bind(n)
                    }
                })())), Jn((() => {
                    var e;
                    return null === (e = i) || void 0 === e ? void 0 : e()
                })), {
                    reaction: l,
                    locale: r,
                    vote: async r => {
                        const {
                            serverURL: l,
                            lang: i,
                            path: o
                        } = n.value, s = t.value.find((e => {
                            let {
                                [As]: t
                            } = e;
                            return t === o
                        }));
                        s && s[zs] === r || (await C({
                            serverURL: l,
                            lang: i,
                            path: o,
                            type: `reaction${r}`
                        }), e.value[r] = (e.value[r] || 0) + 1, s ? (e.value[s[zs]] = Math.max(e.value[s[zs]] - 1, 0), C({
                            serverURL: l,
                            lang: i,
                            path: o,
                            type: `reaction${s.i}`,
                            action: "desc"
                        }), s.i = r, t.value = Array.from(t.value)) : t.value = [...t.value, {
                            [As]: o,
                            [zs]: r
                        }], t.value.length > 50 && (t.value = t.value.slice(-50)))
                    }
                }
            }
        }),
        Ms = (e, t) => {
            const n = e.__vccOpts || e;
            for (const [e, r] of t) n[e] = r;
            return n
        };
    const Ns = {
            key: 0,
            class: "wl-reaction"
        },
        Fs = ["textContent"],
        Ds = ["onClick"],
        Vs = {
            class: "wl-reaction-img"
        },
        Bs = ["src", "alt"],
        Hs = {
            class: "wl-reaction-votes"
        },
        Ws = {
            class: "wl-reaction-text"
        };
    var qs, Zs, Gs = Ms(Us, [
            ["render", function(e, t, n, r, l, i) {
                return e.reaction.length ? (Ur(), Dr("div", Ns, [Gr("h4", {
                    textContent: W(e.locale.reactionTitle)
                }, null, 8, Fs), Gr("ul", null, [(Ur(!0), Dr(Ar, null, lr(e.reaction, ((t, n) => (Ur(), Dr("li", {
                    key: n,
                    class: V({
                        active: t.active
                    }),
                    onClick: t => e.vote(n)
                }, [Gr("div", Vs, [Gr("img", {
                    src: t.icon,
                    alt: t.desc
                }, null, 8, Bs), Gr("div", Hs, W(t.vote), 1)]), Gr("div", Ws, W(t.desc), 1)], 10, Ds)))), 128))])])) : Xr("v-if", !0)
            }],
            ["__file", "ArticleReaction.vue"]
        ]),
        Ks = "function" == typeof Map ? new Map : (qs = [], Zs = [], {
            has: function(e) {
                return qs.indexOf(e) > -1
            },
            get: function(e) {
                return Zs[qs.indexOf(e)]
            },
            set: function(e, t) {
                -1 === qs.indexOf(e) && (qs.push(e), Zs.push(t))
            },
            delete: function(e) {
                var t = qs.indexOf(e);
                t > -1 && (qs.splice(t, 1), Zs.splice(t, 1))
            }
        }),
        Qs = function(e) {
            return new Event(e, {
                bubbles: !0
            })
        };
    try {
        new Event("test")
    } catch (qs) {
        Qs = function(e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !1), t
        }
    }

    function Js(e) {
        var t = Ks.get(e);
        t && t.destroy()
    }

    function Ys(e) {
        var t = Ks.get(e);
        t && t.update()
    }
    var Xs = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? ((Xs = function(e) {
        return e
    }).destroy = function(e) {
        return e
    }, Xs.update = function(e) {
        return e
    }) : ((Xs = function(e, t) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], (function(e) {
            return function(e) {
                if (e && e.nodeName && "TEXTAREA" === e.nodeName && !Ks.has(e)) {
                    var t, n = null,
                        r = null,
                        l = null,
                        i = function() {
                            e.clientWidth !== r && c()
                        },
                        o = function(t) {
                            window.removeEventListener("resize", i, !1), e.removeEventListener("input", c, !1), e.removeEventListener("keyup", c, !1), e.removeEventListener("autosize:destroy", o, !1), e.removeEventListener("autosize:update", c, !1), Object.keys(t).forEach((function(n) {
                                e.style[n] = t[n]
                            })), Ks.delete(e)
                        }.bind(e, {
                            height: e.style.height,
                            resize: e.style.resize,
                            overflowY: e.style.overflowY,
                            overflowX: e.style.overflowX,
                            wordWrap: e.style.wordWrap
                        });
                    e.addEventListener("autosize:destroy", o, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", c, !1), window.addEventListener("resize", i, !1), e.addEventListener("input", c, !1), e.addEventListener("autosize:update", c, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", Ks.set(e, {
                        destroy: o,
                        update: c
                    }), "vertical" === (t = window.getComputedStyle(e, null)).resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), n = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(n) && (n = 0), c()
                }

                function s(t) {
                    var n = e.style.width;
                    e.style.width = "0px", e.style.width = n, e.style.overflowY = t
                }

                function a() {
                    if (0 !== e.scrollHeight) {
                        var t = function(e) {
                                for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                                    node: e.parentNode,
                                    scrollTop: e.parentNode.scrollTop
                                }), e = e.parentNode;
                                return t
                            }(e),
                            l = document.documentElement && document.documentElement.scrollTop;
                        e.style.height = "", e.style.height = e.scrollHeight + n + "px", r = e.clientWidth, t.forEach((function(e) {
                            e.node.scrollTop = e.scrollTop
                        })), l && (document.documentElement.scrollTop = l)
                    }
                }

                function c() {
                    a();
                    var t = Math.round(parseFloat(e.style.height)),
                        n = window.getComputedStyle(e, null),
                        r = "content-box" === n.boxSizing ? Math.round(parseFloat(n.height)) : e.offsetHeight;
                    if (r < t ? "hidden" === n.overflowY && (s("scroll"), a(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== n.overflowY && (s("hidden"), a(), r = "content-box" === n.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), l !== r) {
                        l = r;
                        var i = Qs("autosize:resized");
                        try {
                            e.dispatchEvent(i)
                        } catch (e) {}
                    }
                }
            }(e)
        })), e
    }).destroy = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], Js), e
    }, Xs.update = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], Ys), e
    });
    var ea = Xs;
    const ta = e => {
        let {
            size: t
        } = e;
        return bl("svg", {
            width: t,
            height: t,
            viewBox: "0 0 100 100",
            preserveAspectRatio: "xMidYMid"
        }, bl("circle", {
            cx: 50,
            cy: 50,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "4",
            r: "40",
            "stroke-dasharray": "85 30"
        }, bl("animateTransform", {
            attributeName: "transform",
            type: "rotate",
            repeatCount: "indefinite",
            dur: "1s",
            values: "0 50 50;360 50 50",
            keyTimes: "0;1"
        })))
    };
    var na = Wn({
        name: "ImageWall",
        components: {
            LoadingIcon: ta
        },
        props: {
            items: {
                type: Array,
                default: () => []
            },
            columnWidth: {
                type: Number,
                default: 300
            },
            gap: {
                type: Number,
                default: 0
            }
        },
        emits: ["insert"],
        setup(e) {
            let t = null;
            const n = Jt(null),
                r = Jt({}),
                l = Jt([]),
                i = () => {
                    const t = Math.floor((n.value.getBoundingClientRect().width + e.gap) / (e.columnWidth + e.gap));
                    return t > 0 ? t : 1
                },
                o = e => new Array(e).fill(null).map((() => [])),
                s = async t => {
                    var r;
                    if (t >= e.items.length) return;
                    await bn();
                    const i = Array.from((null === (r = n.value) || void 0 === r ? void 0 : r.children) || []).reduce(((e, t) => t.getBoundingClientRect().height < e.getBoundingClientRect().height ? t : e));
                    l.value[Number(i.dataset.index)].push(t), await s(t + 1)
                }, a = async function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (l.value.length === i() && !e) return;
                    l.value = o(i());
                    const t = window.scrollY;
                    await s(0), window.scrollTo({
                        top: t
                    })
                };
            return Vn((() => [e.items]), (() => {
                r.value = {}, a(!0)
            })), Vn((() => [e.columnWidth, e.gap]), (() => a())), Kn((() => {
                a(!0), t = new ResizeObserver((() => a())), t.observe(n.value)
            })), Qn((() => t.unobserve(n.value))), {
                columns: l,
                state: r,
                wall: n
            }
        }
    });
    const ra = ["data-index"],
        la = ["src", "title", "onLoad", "onClick"];
    var ia = Wn({
        name: "CommentBox",
        components: {
            CloseIcon: e => {
                let {
                    size: t
                } = e;
                return bl("svg", {
                    class: "wl-close-icon",
                    viewBox: "0 0 1024 1024",
                    width: t,
                    height: t
                }, [bl("path", {
                    d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z",
                    fill: "currentColor"
                }), bl("path", {
                    d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z",
                    fill: "#888"
                })])
            },
            EmojiIcon: () => bl("svg", {
                viewBox: "0 0 1024 1024",
                width: "24",
                height: "24"
            }, bl("path", {
                d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z",
                fill: "currentColor"
            })),
            ImageIcon: () => bl("svg", {
                viewBox: "0 0 1024 1024",
                width: "24",
                height: "24"
            }, [bl("path", {
                d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z",
                fill: "currentColor"
            }), bl("path", {
                d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z",
                fill: "currentColor"
            })]),
            ImageWall: Ms(na, [
                ["render", function(e, t, n, r, l, i) {
                    const o = tr("LoadingIcon");
                    return Ur(), Dr("div", {
                        ref: "wall",
                        class: "wl-gallery",
                        style: M({
                            gap: `${e.gap}px`
                        })
                    }, [(Ur(!0), Dr(Ar, null, lr(e.columns, ((t, n) => (Ur(), Dr("div", {
                        key: n,
                        class: "wl-gallery-column",
                        "data-index": n,
                        style: M({
                            gap: `${e.gap}px`
                        })
                    }, [(Ur(!0), Dr(Ar, null, lr(t, (t => (Ur(), Dr(Ar, {
                        key: t
                    }, [e.state[e.items[t].src] ? Xr("v-if", !0) : (Ur(), Vr(o, {
                        key: 0,
                        size: 36,
                        style: {
                            margin: "20px auto"
                        }
                    })), Gr("img", {
                        class: "wl-gallery-item",
                        src: e.items[t].src,
                        title: e.items[t].title,
                        loading: "lazy",
                        onLoad: n => e.state[e.items[t].src] = !0,
                        onClick: n => e.$emit("insert", `![](${e.items[t].src})`)
                    }, null, 40, la)], 64)))), 128))], 12, ra)))), 128))], 4)
                }],
                ["__file", "ImageWall.vue"]
            ]),
            MarkdownIcon: () => bl("svg", {
                width: "16",
                height: "16",
                ariaHidden: "true"
            }, bl("path", {
                d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z",
                fill: "currentColor"
            })),
            PreviewIcon: () => bl("svg", {
                viewBox: "0 0 1024 1024",
                width: "24",
                height: "24"
            }, [bl("path", {
                d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0",
                fill: "currentColor"
            }), bl("path", {
                d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0",
                fill: "currentColor"
            })]),
            LoadingIcon: ta,
            GifIcon: () => bl("svg", {
                width: 24,
                height: 24,
                fill: "currentcolor",
                viewBox: "0 0 24 24"
            }, [bl("path", {
                style: "transform: translateY(0.5px)",
                d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z"
            }), bl("path", {
                d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z"
            })])
        },
        props: {
            rootId: {
                type: String,
                default: ""
            },
            replyId: {
                type: String,
                default: ""
            },
            replyUser: {
                type: String,
                default: ""
            },
            edit: {
                type: Object,
                default: null
            }
        },
        emits: ["submit", "cancel-reply", "cancel-edit"],
        setup(e, t) {
            let {
                emit: n
            } = t;
            const r = Nn("config"),
                l = ro("WALINE_COMMENT_BOX_EDITOR", ""),
                i = ro("WALINE_USER_META", {
                    nick: "",
                    mail: "",
                    link: ""
                }),
                o = Ps(),
                s = Jt({}),
                a = Jt(null),
                c = Jt(null),
                u = Jt(null),
                p = Jt(null),
                d = Jt(null),
                h = Jt(null),
                f = Jt(null),
                g = Jt({
                    tabs: [],
                    map: {}
                }),
                m = Jt(0),
                v = Jt(!1),
                y = Jt(!1),
                w = Jt(!1),
                b = Jt(""),
                k = Jt(0),
                x = Pt({
                    loading: !0,
                    list: []
                }),
                _ = Jt(0),
                C = Jt(!1),
                S = Jt(""),
                $ = Jt(!1),
                E = wl((() => r.value.locale)),
                R = wl((() => {
                    var e;
                    return Boolean(null === (e = o.value) || void 0 === e ? void 0 : e.token)
                })),
                L = wl((() => !1 !== r.value.imageUploader)),
                A = e => {
                    const t = a.value,
                        n = t.selectionStart,
                        r = t.selectionEnd || 0,
                        i = t.scrollTop;
                    l.value = t.value.substring(0, n) + e + t.value.substring(r, t.value.length), t.focus(), t.selectionStart = n + e.length, t.selectionEnd = n + e.length, t.scrollTop = i
                },
                z = e => {
                    const t = `![${r.value.locale.uploading} ${e.name}]()`;
                    return A(t), Promise.resolve().then((() => r.value.imageUploader(e))).then((n => {
                        l.value = l.value.replace(t, `\r\n![${e.name}](${n})`)
                    })).catch((e => {
                        alert(e.message), l.value = l.value.replace(t, "")
                    }))
                },
                O = async () => {
                    var t, c;
                    const {
                        serverURL: u,
                        lang: p,
                        login: d,
                        wordLimit: h,
                        requiredMeta: f
                    } = r.value;
                    let m = "";
                    r.value.recaptchaV3Key && (m = await (e => {
                        const t = Rs[e] ?? (Rs[e] = bs.load(e, {
                            useRecaptchaNet: !0,
                            autoHideBadge: !0
                        }));
                        return {
                            execute: e => t.then((t => t.execute(e)))
                        }
                    })(r.value.recaptchaV3Key).execute("social"));
                    const v = {
                        comment: S.value,
                        nick: i.value.nick,
                        mail: i.value.mail,
                        link: i.value.link,
                        ua: navigator.userAgent,
                        url: r.value.path,
                        recaptchaV3: m
                    };
                    if (null !== (t = o.value) && void 0 !== t && t.token) v.nick = o.value.display_name, v.mail = o.value.email, v.link = o.value.url;
                    else {
                        if ("force" === d) return;
                        var y, w, x;
                        if (f.indexOf("nick") > -1 && !v.nick) return null === (y = s.value.nick) || void 0 === y || y.focus(), alert(E.value.nickError);
                        if (f.indexOf("mail") > -1 && !v.mail || v.mail && !/^\w(?:[\w._-]*\w)?@(?:\w(?:[\w-]*\w)?\.)*\w+$/.exec(v.mail)) return null === (w = s.value.mail) || void 0 === w || w.focus(), alert(E.value.mailError);
                        if (!v.comment) return void(null === (x = a.value) || void 0 === x || x.focus());
                        v.nick || (v.nick = E.value.anonymous)
                    }
                    if (!C.value) return alert(E.value.wordHint.replace("$0", h[0].toString()).replace("$1", h[1].toString()).replace("$2", k.value.toString()));
                    v.comment = hs(v.comment, g.value.map), e.replyId && e.rootId ? (v.pid = e.replyId, v.rid = e.rootId, v.at = e.replyUser) : e.edit && (v.eid = e.edit.objectId), $.value = !0, (e => {
                        let {
                            serverURL: t,
                            lang: n,
                            token: r,
                            comment: l
                        } = e;
                        const i = {
                            "Content-Type": "application/json"
                        };
                        return r && (i.Authorization = `Bearer ${r}`), l.eid ? fetch(`${t}/comment/${l.eid}?lang=${n}`, {
                            method: "PUT",
                            headers: i,
                            body: JSON.stringify(l)
                        }).then((e => e.json())) : fetch(`${t}/comment?lang=${n}`, {
                            method: "POST",
                            headers: i,
                            body: JSON.stringify(l)
                        }).then((e => e.json()))
                    })({
                        serverURL: u,
                        lang: p,
                        token: null === (c = o.value) || void 0 === c ? void 0 : c.token,
                        comment: v
                    }).then((t => {
                        var r;
                        if ($.value = !1, t.errmsg) return alert(t.errmsg);
                        n("submit", t.data), l.value = "", b.value = "", e.replyId && n("cancel-reply"), null !== (r = e.edit) && void 0 !== r && r.objectId && n("cancel-edit")
                    })).catch((e => {
                        $.value = !1, alert(e.message)
                    }))
                }, j = e => {
                    u.value.contains(e.target) || p.value.contains(e.target) || (v.value = !1), d.value.contains(e.target) || h.value.contains(e.target) || (y.value = !1)
                }, T = async e => {
                    var t;
                    const {
                        scrollTop: n,
                        clientHeight: l,
                        scrollHeight: i
                    } = e.target, o = (l + n) / i, s = r.value.search, a = (null === (t = f.value) || void 0 === t ? void 0 : t.value) || "";
                    o < .9 || x.loading || (x.loading = !0, x.list.push(...s.more ? await s.more(a, x.list.length) : await s.search(a)), x.loading = !1, setTimeout((() => {
                        e.target.scrollTop = n
                    }), 50))
                }, P = function(e) {
                    return yi(bi(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}), e)
                }((e => {
                    x.list = [], T(e)
                }), 300);
            Vn([r, k], (e => {
                let [t, n] = e;
                const {
                    wordLimit: r
                } = t;
                r ? n < r[0] && 0 !== r[0] ? (_.value = r[0], C.value = !1) : n > r[1] ? (_.value = r[1], C.value = !1) : (_.value = r[1], C.value = !0) : (_.value = 0, C.value = !0)
            }), {
                immediate: !0
            }), Vn(y, (async e => {
                if (!e) return;
                const t = r.value.search;
                f.value && (f.value.value = ""), x.loading = !0, x.list = t.default ? await t.default() : await t.search(""), x.loading = !1
            }));
            const U = e => {
                let {
                    data: t
                } = e;
                t && "profile" === t.type && (o.value = {
                    ...o.value,
                    ...t.data
                }, [localStorage, sessionStorage].filter((e => e.getItem("WALINE_USER"))).forEach((e => e.setItem("WALINE_USER", JSON.stringify(o)))))
            };
            return Kn((() => {
                var t;
                document.body.addEventListener("click", j), window.addEventListener("message", U), null !== (t = e.edit) && void 0 !== t && t.objectId && (l.value = e.edit.orig), Vn((() => l.value), (e => {
                    const {
                        highlighter: t,
                        texRenderer: n
                    } = r.value;
                    S.value = e, b.value = fs(e, {
                        emojiMap: g.value.map,
                        highlighter: t,
                        texRenderer: n
                    }), k.value = (e => (e => e.match(/[\w\d\s\u00C0-\u024F]+/giu) || [])(e).reduce(((e, t) => e + ("" === t.trim() ? 0 : t.trim().split(/\s+/u).length)), 0) + (e => e.match(/[\u4E00-\u9FA5]/gu) || [])(e).length)(e), e ? ea(a.value) : ea.destroy(a.value)
                }), {
                    immediate: !0
                }), Vn((() => r.value.emoji), (e => {
                    return (t = Array.isArray(e) ? e : [], Promise.all(t.map((e => "string" == typeof e ? bo(I(e)) : Promise.resolve(e)))).then((e => {
                        const t = {
                            tabs: [],
                            map: {}
                        };
                        return e.forEach((e => {
                            const {
                                name: n,
                                folder: r,
                                icon: l,
                                prefix: i,
                                type: o,
                                items: s
                            } = e;
                            t.tabs.push({
                                name: n,
                                icon: ko(l, r, i, o),
                                items: s.map((e => {
                                    const n = `${i||""}${e}`;
                                    return t.map[n] = ko(e, r, i, o), n
                                }))
                            })
                        })), t
                    }))).then((e => {
                        g.value = e
                    }));
                    var t
                }), {
                    immediate: !0
                })
            })), Jn((() => {
                document.body.removeEventListener("click", j), window.removeEventListener("message", U)
            })), {
                config: r,
                locale: E,
                insert: A,
                onChange: () => {
                    const e = c.value;
                    e.files && L.value && z(e.files[0]).then((() => {
                        e.value = ""
                    }))
                },
                onDrop: e => {
                    var t;
                    if (null !== (t = e.dataTransfer) && void 0 !== t && t.items) {
                        const t = So(e.dataTransfer.items);
                        t && L.value && (z(t), e.preventDefault())
                    }
                },
                onKeyDown: e => {
                    const t = e.key;
                    (e.ctrlKey || e.metaKey) && "Enter" === t && O()
                },
                onPaste: e => {
                    if (e.clipboardData) {
                        const t = So(e.clipboardData.items);
                        t && L.value && z(t)
                    }
                },
                onLogin: e => {
                    e.preventDefault();
                    const {
                        lang: t,
                        serverURL: n
                    } = r.value;
                    (e => {
                        let {
                            lang: t,
                            serverURL: n
                        } = e;
                        const r = (window.innerWidth - 450) / 2,
                            l = (window.innerHeight - 450) / 2,
                            i = window.open(`${n}/ui/login?lng=${encodeURIComponent(t)}`, "_blank", `width=450,height=450,left=${r},top=${l},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
                        return null == i || i.postMessage({
                            type: "TOKEN",
                            data: null
                        }, "*"), new Promise((e => {
                            const t = n => {
                                let {
                                    data: r
                                } = n;
                                r && "object" == typeof r && "userInfo" === r.type && r.data.token && (null == i || i.close(), window.removeEventListener("message", t), e(r.data))
                            };
                            window.addEventListener("message", t)
                        }))
                    })({
                        serverURL: n,
                        lang: t
                    }).then((e => {
						// 头像代码在这里
						console.log(e, e.avatar)
						// var user= document.getElementById('user');
						// user.innerHTML = `<img src=${e.avatar} alt="avatar" style="width:2.5rem; height: 2.5rem; margin-bottom:-0.5rem;">` 						
                        o.value = e, (e.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(e));
						// location.reload();
                    }))
                },
                onLogout: () => {
                    o.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null")
                },
                onProfile: e => {
                    e.preventDefault();
                    const {
                        lang: t,
                        serverURL: n
                    } = r.value, l = (window.innerWidth - 800) / 2, i = (window.innerHeight - 800) / 2, s = window.open(`${n}/ui/profile?lng=${encodeURIComponent(t)}`, "_blank", `width=800,height=800,left=${l},top=${i},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
                    null == s || s.postMessage({
                        type: "TOKEN",
                        data: o.value.token
                    }, "*")
                },
                submitComment: O,
                onImageWallScroll: T,
                onGifSearch: P,
                isLogin: R,
                userInfo: o,
                isSubmitting: $,
                wordNumber: k,
                wordLimit: _,
                isWordNumberLegal: C,
                editor: l,
                userMeta: i,
                emoji: g,
                emojiTabIndex: m,
                showEmoji: v,
                gifData: x,
                showGif: y,
                canUploadImage: L,
                previewText: b,
                showPreview: w,
                inputRefs: s,
                editorRef: a,
                emojiButtonRef: u,
                emojiPopupRef: p,
                gifButtonRef: d,
                gifPopupRef: h,
                imageUploadRef: c,
                gifSearchInputRef: f
            }
        }
    });
    const oa = {
            class: "wl-comment"
        },
        sa = {
            key: 0,
            class: "wl-login-info"
        },
        aa = {
            class: "wl-avatar"
        },
        ca = ["title"],
        ua = ["title"],
        pa = ["src"],
        da = ["title", "textContent"],
        ha = {
            class: "wl-panel"
        },
        fa = ["for", "textContent"],
        ga = ["id", "onUpdate:modelValue", "name", "type"],
        ma = ["placeholder"],
        va = {
            class: "wl-preview"
        },
        ya = Gr("hr", null, null, -1),
        wa = ["innerHTML"],
        ba = {
            class: "wl-footer"
        },
        ka = {
            class: "wl-actions"
        },
        xa = {
            href: "https://guides.github.com/features/mastering-markdown/",
            title: "Markdown Guide",
            "aria-label": "Markdown is supported",
            class: "wl-action",
            target: "_blank",
            rel: "noreferrer"
        },
        _a = ["title"],
        Ca = ["title"],
        Sa = ["title"],
        $a = ["title"],
        Ia = {
            class: "wl-info"
        },
        Ea = {
            class: "wl-text-number"
        },
        Ra = {
            key: 0
        },
        La = Yr("  /  "),
        Aa = ["textContent"],
        za = ["textContent"],
        Oa = ["disabled"],
        ja = ["placeholder"],
        Ta = {
            key: 0,
            class: "wl-loading"
        },
        Pa = {
            key: 0,
            class: "wl-tab-wrapper"
        },
        Ua = ["title", "onClick"],
        Ma = ["src", "alt"],
        Na = {
            key: 0,
            class: "wl-tabs"
        },
        Fa = ["onClick"],
        Da = ["src", "alt", "title"],
        Va = ["title"];
    var Ba = Ms(ia, [
        ["render", function(e, t, n, r, l, i) {
            var o, s;
            const a = tr("CloseIcon"),
                c = tr("MarkdownIcon"),
                u = tr("EmojiIcon"),
                p = tr("GifIcon"),
                d = tr("ImageIcon"),
                h = tr("PreviewIcon"),
                f = tr("LoadingIcon"),
                g = tr("ImageWall");
            return Ur(), Dr("div", oa, ["disable" === e.config.login || !e.isLogin || null !== (o = e.edit) && void 0 !== o && o.objectId ? Xr("v-if", !0) : (Ur(), Dr("div", sa, [Gr("div", aa, [Gr("button", {
                class: "wl-logout-btn",
                title: e.locale.logout,
                onClick: t[0] || (t[0] = function() {
                    return e.onLogout && e.onLogout(...arguments)
                })
            }, [Kr(a, {
                size: 14
            })], 8, ca), Gr("a", {
                href: "#",
                class: "wl-login-nick",
                "aria-label": "Profile",
                title: e.locale.profile,
                onClick: t[1] || (t[1] = function() {
                    return e.onProfile && e.onProfile(...arguments)
                })
            }, [Gr("img", {
                src: e.userInfo.avatar,
                alt: "avatar"
            }, null, 8, pa)], 8, ua)]), Gr("a", {
                href: "#",
                class: "wl-login-nick",
                "aria-label": "Profile",
                title: e.locale.profile,
                onClick: t[2] || (t[2] = function() {
                    return e.onProfile && e.onProfile(...arguments)
                }),
                textContent: W(e.userInfo.display_name)
            }, null, 8, da)])), Gr("div", ha, ["force" !== e.config.login && e.config.meta.length && !e.isLogin ? (Ur(), Dr("div", {
                key: 0,
                class: V(["wl-header", `item${e.config.meta.length}`])
            }, [(Ur(!0), Dr(Ar, null, lr(e.config.meta, (t => (Ur(), Dr("div", {
                key: t,
                class: "wl-header-item"
            }, [Gr("label", {
                for: t,
                textContent: W(e.locale[t] + (e.config.requiredMeta.includes(t) || !e.config.requiredMeta.length ? "" : `(${e.locale.optional})`))
            }, null, 8, fa), Yn(Gr("input", {
                id: `wl-${t}`,
                ref_for: !0,
                ref: n => {
                    n && (e.inputRefs[t] = n)
                },
                "onUpdate:modelValue": n => e.userMeta[t] = n,
                class: V(["wl-input", `wl-${t}`]),
                name: t,
                type: "mail" === t ? "email" : "text"
            }, null, 10, ga), [
                [li, e.userMeta[t]]
            ])])))), 128))], 2)) : Xr("v-if", !0), Yn(Gr("textarea", {
                id: "wl-edit",
                ref: "editorRef",
                "onUpdate:modelValue": t[3] || (t[3] = t => e.editor = t),
                class: "wl-editor",
                placeholder: e.replyUser ? `@${e.replyUser}` : e.locale.placeholder,
                onKeydown: t[4] || (t[4] = function() {
                    return e.onKeyDown && e.onKeyDown(...arguments)
                }),
                onDrop: t[5] || (t[5] = function() {
                    return e.onDrop && e.onDrop(...arguments)
                }),
                onPaste: t[6] || (t[6] = function() {
                    return e.onPaste && e.onPaste(...arguments)
                })
            }, null, 40, ma), [
                [Ql, e.editor]
            ]), Yn(Gr("div", va, [ya, Gr("h4", null, W(e.locale.preview) + ":", 1), Xr(" eslint-disable-next-line vue/no-v-html "), Gr("div", {
                class: "wl-content",
                innerHTML: e.previewText
            }, null, 8, wa)], 512), [
                [oi, e.showPreview]
            ]), Gr("div", ba, [Gr("div", ka, [Gr("a", xa, [Kr(c)]), Yn(Gr("button", {
                ref: "emojiButtonRef",
                class: V(["wl-action", {
                    actived: e.showEmoji
                }]),
                title: e.locale.emoji,
                onClick: t[7] || (t[7] = t => e.showEmoji = !e.showEmoji)
            }, [Kr(u)], 10, _a), [
                [oi, e.emoji.tabs.length]
            ]), e.config.search ? (Ur(), Dr("button", {
                key: 0,
                ref: "gifButtonRef",
                class: V(["wl-action", {
                    actived: e.showGif
                }]),
                title: e.locale.gif,
                onClick: t[8] || (t[8] = t => e.showGif = !e.showGif)
            }, [Kr(p)], 10, Ca)) : Xr("v-if", !0), Gr("input", {
                id: "wl-image-upload",
                ref: "imageUploadRef",
                class: "upload",
                type: "file",
                accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif",
                onChange: t[9] || (t[9] = function() {
                    return e.onChange && e.onChange(...arguments)
                })
            }, null, 544), e.canUploadImage ? (Ur(), Dr("label", {
                key: 1,
                for: "wl-image-upload",
                class: "wl-action",
                title: e.locale.uploadImage
            }, [Kr(d)], 8, Sa)) : Xr("v-if", !0), Gr("button", {
                class: V(["wl-action", {
                    actived: e.showPreview
                }]),
                title: e.locale.preview,
                onClick: t[10] || (t[10] = t => e.showPreview = !e.showPreview)
            }, [Kr(h)], 10, $a)]), Gr("div", Ia, [Gr("div", Ea, [Yr(W(e.wordNumber) + " ", 1), e.config.wordLimit ? (Ur(), Dr("span", Ra, [La, Gr("span", {
                class: V({
                    illegal: !e.isWordNumberLegal
                }),
                textContent: W(e.wordLimit)
            }, null, 10, Aa)])) : Xr("v-if", !0), Yr("  " + W(e.locale.word), 1)]), "disable" === e.config.login || e.isLogin ? Xr("v-if", !0) : (Ur(), Dr("button", {
                key: 0,
                class: "wl-btn",
                onClick: t[11] || (t[11] = function() {
                    return e.onLogin && e.onLogin(...arguments)
                }),
                textContent: W(e.locale.login)
            }, null, 8, za)), "force" !== e.config.login || e.isLogin ? (Ur(), Dr("button", {
                key: 1,
                class: "wl-btn primary",
                title: "Cmd|Ctrl + Enter",
                disabled: e.isSubmitting,
                onClick: t[12] || (t[12] = function() {
                    return e.submitComment && e.submitComment(...arguments)
                })
            }, [e.isSubmitting ? (Ur(), Vr(f, {
                key: 0,
                size: 16
            })) : (Ur(), Dr(Ar, {
                key: 1
            }, [Yr(W(e.locale.submit), 1)], 64))], 8, Oa)) : Xr("v-if", !0)]), Gr("div", {
                ref: "gifPopupRef",
                class: V(["wl-gif-popup", {
                    display: e.showGif
                }])
            }, [Gr("input", {
                ref: "gifSearchInputRef",
                type: "text",
                placeholder: e.locale.gifSearchPlaceholder,
                onInput: t[13] || (t[13] = function() {
                    return e.onGifSearch && e.onGifSearch(...arguments)
                })
            }, null, 40, ja), Kr(g, {
                items: e.gifData.list,
                "column-width": 200,
                gap: 6,
                onInsert: t[14] || (t[14] = t => e.insert(t)),
                onScroll: e.onImageWallScroll
            }, null, 8, ["items", "onScroll"]), e.gifData.loading ? (Ur(), Dr("div", Ta, [Kr(f, {
                size: 30
            })])) : Xr("v-if", !0)], 2), Gr("div", {
                ref: "emojiPopupRef",
                class: V(["wl-emoji-popup", {
                    display: e.showEmoji
                }])
            }, [(Ur(!0), Dr(Ar, null, lr(e.emoji.tabs, ((t, n) => (Ur(), Dr(Ar, {
                key: t.name
            }, [n === e.emojiTabIndex ? (Ur(), Dr("div", Pa, [(Ur(!0), Dr(Ar, null, lr(t.items, (t => (Ur(), Dr("button", {
                key: t,
                title: t,
                onClick: n => e.insert(`:${t}:`)
            }, [e.showEmoji ? (Ur(), Dr("img", {
                key: 0,
                class: "wl-emoji",
                src: e.emoji.map[t],
                alt: t,
                loading: "lazy",
                referrerPolicy: "no-referrer"
            }, null, 8, Ma)) : Xr("v-if", !0)], 8, Ua)))), 128))])) : Xr("v-if", !0)], 64)))), 128)), e.emoji.tabs.length > 1 ? (Ur(), Dr("div", Na, [(Ur(!0), Dr(Ar, null, lr(e.emoji.tabs, ((t, n) => (Ur(), Dr("button", {
                key: t.name,
                class: V(["wl-tab", {
                    active: e.emojiTabIndex === n
                }]),
                onClick: t => e.emojiTabIndex = n
            }, [Gr("img", {
                class: "wl-emoji",
                src: t.icon,
                alt: t.name,
                title: t.name,
                loading: "lazy",
                referrerPolicy: "no-referrer"
            }, null, 8, Da)], 10, Fa)))), 128))])) : Xr("v-if", !0)], 2)])]), e.replyId || null !== (s = e.edit) && void 0 !== s && s.objectId ? (Ur(), Dr("button", {
                key: 1,
                class: "wl-close",
                title: e.locale.cancelReply,
                onClick: t[15] || (t[15] = t => e.$emit(e.replyId ? "cancel-reply" : "cancel-edit"))
            }, [Kr(a, {
                size: 24
            })], 8, Va)) : Xr("v-if", !0)])
        }],
        ["__file", "CommentBox.vue"]
    ]);
    const Ha = ["approved", "waiting", "spam"];
    var Wa = Wn({
        components: {
            CommentBox: Ba,
            DeleteIcon: () => bl("svg", {
                viewBox: "0 0 1024 1024",
                width: "24",
                height: "24"
            }, bl("path", {
                d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z",
                fill: "red"
            })),
            LikeIcon: e => {
                let {
                    active: t = !1
                } = e;
                return bl("svg", {
                    viewBox: "0 0 1024 1024",
                    width: "24",
                    height: "24"
                }, [bl("path", {
                    d: "M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z" + (t ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"),
                    fill: t ? "red" : "currentColor"
                })])
            },
            ReplyIcon: () => bl("svg", {
                viewBox: "0 0 1024 1024",
                width: "24",
                height: "24"
            }, bl("path", {
                d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z",
                fill: "currentColor"
            })),
            EditIcon: () => bl("svg", {
                viewBox: "0 0 1024 1024",
                width: "24",
                height: "24"
            }, bl("path", {
                d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z",
                fill: "currentColor"
            })),
            VerifiedIcon: () => bl("svg", {
                class: "verified-icon",
                viewBox: "0 0 1024 1024",
                width: "14",
                height: "14"
            }, bl("path", {
                d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z",
                fill: "#27ae60"
            }))
        },
        props: {
            comment: {
                type: Object,
                required: !0
            },
            rootId: {
                type: String,
                required: !0
            },
            reply: {
                type: Object,
                default: null
            },
            edit: {
                type: Object,
                default: null
            }
        },
        emits: ["submit", "reply", "like", "delete", "status", "sticky", "edit"],
        setup(e) {
            const t = Nn("config"),
                n = ys(),
                r = Ps(),
                l = wl((() => t.value.locale)),
                i = wl((() => {
                    const {
                        link: t
                    } = e.comment;
                    return t ? E(t) ? t : `https://${t}` : ""
                })),
                o = wl((() => n.value.includes(e.comment.objectId))),
                s = Ls(e.comment.insertedAt, l.value),
                a = wl((() => "administrator" === r.value.type)),
                c = wl((() => e.comment.user_id && r.value.objectId === e.comment.user_id)),
                u = wl((() => {
                    var t;
                    return e.comment.objectId === (null === (t = e.reply) || void 0 === t ? void 0 : t.objectId)
                })),
                p = wl((() => {
                    var t;
                    return e.comment.objectId === (null === (t = e.edit) || void 0 === t ? void 0 : t.objectId)
                }));
            return {
                config: t,
                locale: l,
                isReplyingCurrent: u,
                isEditingCurrent: p,
                link: i,
                like: o,
                time: s,
                isAdmin: a,
                isOwner: c,
                commentStatus: Ha
            }
        }
    });
    const qa = ["id"],
        Za = {
            class: "wl-user",
            "aria-hidden": "true"
        },
        Ga = ["src"],
        Ka = {
            class: "wl-card"
        },
        Qa = {
            class: "wl-head"
        },
        Ja = ["href"],
        Ya = {
            key: 1,
            class: "wl-nick"
        },
        Xa = ["textContent"],
        ec = ["textContent"],
        tc = ["textContent"],
        nc = ["textContent"],
        rc = ["textContent"],
        lc = {
            class: "wl-comment-actions"
        },
        ic = ["title"],
        oc = ["textContent"],
        sc = ["title"],
        ac = {
            class: "wl-meta",
            "aria-hidden": "true"
        },
        cc = ["data-value", "textContent"],
        uc = ["data-value", "textContent"],
        pc = ["data-value", "textContent"],
        dc = ["innerHTML"],
        hc = {
            key: 1,
            class: "wl-admin-actions"
        },
        fc = {
            class: "wl-comment-status"
        },
        gc = ["disabled", "onClick", "textContent"],
        mc = {
            key: 3,
            class: "wl-quote"
        };
    const vc = [{
        key: "insertedAt_desc",
        name: "latest"
    }, {
        key: "insertedAt_asc",
        name: "oldest"
    }, {
        key: "like_desc",
        name: "hottest"
    }];
    var yc = Wn({
        name: "WalineRoot",
        components: {
            Reaction: Gs,
            CommentBox: Ba,
            CommentCard: Ms(Wa, [
                ["render", function(e, t, n, r, l, i) {
                    var o;
                    const s = tr("VerifiedIcon"),
                        a = tr("EditIcon"),
                        c = tr("DeleteIcon"),
                        u = tr("LikeIcon"),
                        p = tr("ReplyIcon"),
                        d = tr("CommentBox"),
                        h = tr("CommentCard", !0);
                    return Ur(), Dr("div", {
                        id: e.comment.objectId,
                        class: "wl-item"
                    }, [Gr("div", Za, [e.comment.avatar ? (Ur(), Dr("img", {
                        key: 0,
                        src: e.comment.avatar
                    }, null, 8, Ga)) : Xr("v-if", !0), e.comment.type ? (Ur(), Vr(s, {
                        key: 1
                    })) : Xr("v-if", !0)]), Gr("div", Ka, [Gr("div", Qa, [e.link ? (Ur(), Dr("a", {
                        key: 0,
                        class: "wl-nick",
                        href: e.link,
                        target: "_blank",
                        rel: "nofollow noreferrer"
                    }, W(e.comment.nick), 9, Ja)) : (Ur(), Dr("span", Ya, W(e.comment.nick), 1)), "administrator" === e.comment.type ? (Ur(), Dr("span", {
                        key: 2,
                        class: "wl-badge",
                        textContent: W(e.locale.admin)
                    }, null, 8, Xa)) : Xr("v-if", !0), e.comment.label ? (Ur(), Dr("span", {
                        key: 3,
                        class: "wl-badge",
                        textContent: W(e.comment.label)
                    }, null, 8, ec)) : Xr("v-if", !0), e.comment.sticky ? (Ur(), Dr("span", {
                        key: 4,
                        class: "wl-badge",
                        textContent: W(e.locale.sticky)
                    }, null, 8, tc)) : Xr("v-if", !0), void 0 !== e.comment.level && e.comment.level >= 0 ? (Ur(), Dr("span", {
                        key: 5,
                        class: V(`wl-badge level${e.comment.level}`),
                        textContent: W(e.locale[`level${e.comment.level}`] || `Level ${e.comment.level}`)
                    }, null, 10, nc)) : Xr("v-if", !0), Gr("span", {
                        class: "wl-time",
                        textContent: W(e.time)
                    }, null, 8, rc), Gr("div", lc, [e.isAdmin || e.isOwner ? (Ur(), Dr("button", {
                        key: 0,
                        class: "wl-edit",
                        onClick: t[0] || (t[0] = t => e.$emit("edit", e.comment))
                    }, [Kr(a)])) : Xr("v-if", !0), e.isAdmin || e.isOwner ? (Ur(), Dr("button", {
                        key: 1,
                        class: "wl-delete",
                        onClick: t[1] || (t[1] = t => e.$emit("delete", e.comment))
                    }, [Kr(c)])) : Xr("v-if", !0), Gr("button", {
                        class: "wl-like",
                        title: e.like ? e.locale.cancelLike : e.locale.like,
                        onClick: t[2] || (t[2] = t => e.$emit("like", e.comment))
                    }, [Kr(u, {
                        active: e.like
                    }, null, 8, ["active"]), "like" in e.comment ? (Ur(), Dr("span", {
                        key: 0,
                        textContent: W(e.comment.like)
                    }, null, 8, oc)) : Xr("v-if", !0)], 8, ic), Gr("button", {
                        class: V(["wl-reply", {
                            active: e.isReplyingCurrent
                        }]),
                        title: e.isReplyingCurrent ? e.locale.cancelReply : e.locale.reply,
                        onClick: t[3] || (t[3] = t => e.$emit("reply", e.isReplyingCurrent ? null : e.comment))
                    }, [Kr(p)], 10, sc)])]), Gr("div", ac, [e.comment.addr ? (Ur(), Dr("span", {
                        key: 0,
                        class: "wl-addr",
                        "data-value": e.comment.addr,
                        textContent: W(e.comment.addr)
                    }, null, 8, cc)) : Xr("v-if", !0), e.comment.browser ? (Ur(), Dr("span", {
                        key: 1,
                        class: "wl-browser",
                        "data-value": e.comment.browser,
                        textContent: W(e.comment.browser)
                    }, null, 8, uc)) : Xr("v-if", !0), e.comment.os ? (Ur(), Dr("span", {
                        key: 2,
                        class: "wl-os",
                        "data-value": e.comment.os,
                        textContent: W(e.comment.os)
                    }, null, 8, pc)) : Xr("v-if", !0)]), Xr(" eslint-disable vue/no-v-html "), e.isEditingCurrent ? Xr("v-if", !0) : (Ur(), Dr("div", {
                        key: 0,
                        class: "wl-content",
                        innerHTML: e.comment.comment
                    }, null, 8, dc)), Xr(" eslint-enable vue/no-v-html "), e.isAdmin && !e.isEditingCurrent ? (Ur(), Dr("div", hc, [Gr("span", fc, [(Ur(!0), Dr(Ar, null, lr(e.commentStatus, (t => (Ur(), Dr("button", {
                        key: t,
                        class: V(`wl-btn wl-${t}`),
                        disabled: e.comment.status === t,
                        onClick: n => e.$emit("status", {
                            status: t,
                            comment: e.comment
                        }),
                        textContent: W(e.locale[t])
                    }, null, 10, gc)))), 128))]), e.isAdmin && !e.comment.rid ? (Ur(), Dr("button", {
                        key: 0,
                        class: "wl-btn wl-sticky",
                        onClick: t[4] || (t[4] = t => e.$emit("sticky", e.comment))
                    }, W(e.comment.sticky ? e.locale.unsticky : e.locale.sticky), 1)) : Xr("v-if", !0)])) : Xr("v-if", !0), e.isReplyingCurrent || e.isEditingCurrent ? (Ur(), Dr("div", {
                        key: 2,
                        class: V({
                            "wl-reply-wrapper": e.isReplyingCurrent,
                            "wl-edit-wrapper": e.isEditingCurrent
                        })
                    }, [Kr(d, {
                        edit: e.edit,
                        "reply-id": null === (o = e.reply) || void 0 === o ? void 0 : o.objectId,
                        "reply-user": e.comment.nick,
                        "root-id": e.rootId,
                        onSubmit: t[5] || (t[5] = t => e.$emit("submit", t)),
                        onCancelReply: t[6] || (t[6] = t => e.$emit("reply", null)),
                        onCancelEdit: t[7] || (t[7] = t => e.$emit("edit", null))
                    }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : Xr("v-if", !0), e.comment.children ? (Ur(), Dr("div", mc, [(Ur(!0), Dr(Ar, null, lr(e.comment.children, (n => (Ur(), Vr(h, {
                        key: n.objectId,
                        comment: n,
                        reply: e.reply,
                        edit: e.edit,
                        "root-id": e.rootId,
                        onReply: t[8] || (t[8] = t => e.$emit("reply", t)),
                        onSubmit: t[9] || (t[9] = t => e.$emit("submit", t)),
                        onLike: t[10] || (t[10] = t => e.$emit("like", t)),
                        onEdit: t[11] || (t[11] = t => e.$emit("edit", t)),
                        onDelete: t[12] || (t[12] = t => e.$emit("delete", t)),
                        onStatus: t[13] || (t[13] = t => e.$emit("status", t)),
                        onSticky: t[14] || (t[14] = t => e.$emit("sticky", t))
                    }, null, 8, ["comment", "reply", "edit", "root-id"])))), 128))])) : Xr("v-if", !0)])], 8, qa)
                }],
                ["__file", "CommentCard.vue"]
            ]),
            LoadingIcon: ta
        },
        props: ["serverURL", "path", "meta", "requiredMeta", "dark", "lang", "locale", "pageSize", "wordLimit", "emoji", "login", "highlighter", "texRenderer", "imageUploader", "search", "copyright", "recaptchaV3Key", "reaction"],
        setup(e) {
            const t = wl((() => (e => {
                    let {
                        serverURL: t,
                        path: a = location.pathname,
                        lang: c = r,
                        locale: u,
                        emoji: d = ["//unpkg.com/@waline/emojis@1.1.0/weibo"],
                        meta: h = ["nick", "mail", "link"],
                        requiredMeta: f = [],
                        dark: g = !1,
                        pageSize: m = 10,
                        wordLimit: v,
                        imageUploader: y,
                        highlighter: w,
                        texRenderer: k,
                        copyright: x = !0,
                        login: _ = "enable",
                        search: C = o(),
                        reaction: S,
                        recaptchaV3Key: I = "",
                        ...E
                    } = e;
                    return {
                        serverURL: R(t),
                        path: $(a),
                        locale: {
                            ...b[c] || b[r],
                            ..."object" == typeof u ? u : {}
                        },
                        wordLimit: L(v),
                        meta: n(h),
                        requiredMeta: n(f),
                        imageUploader: A(y, l),
                        highlighter: A(w, p),
                        texRenderer: A(k, i),
                        lang: c,
                        dark: g,
                        emoji: d,
                        pageSize: m,
                        login: _,
                        copyright: x,
                        search: C,
                        recaptchaV3Key: I,
                        reaction: Array.isArray(S) ? S : !0 === S ? s : [],
                        ...E
                    }
                })(e))),
                a = Ps(),
                c = ys(),
                u = Jt("loading"),
                d = Jt(0),
                h = Jt(1),
                f = Jt(0),
                g = Jt(vc[0].key),
                m = Jt([]),
                v = Jt(null),
                y = Jt(null),
                w = wl((() => {
                    return "string" == typeof(e = t.value.dark) ? "auto" === e ? `@media(prefers-color-scheme:dark){body${z}}` : `${e}${z}` : !0 === e ? `:root${z}` : "";
                    var e
                }));
            let _;
            ! function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const n = Jt(!1),
                    {
                        document: r = Bi,
                        immediate: l = !0,
                        manual: i = !1,
                        id: o = "vueuse_styletag_" + ++fo
                    } = t,
                    s = Jt(e);
                let a = () => {};
                const c = () => {
                        if (!r) return;
                        const e = r.getElementById(o) || r.createElement("style");
                        e.type = "text/css", e.id = o, t.media && (e.media = t.media), r.head.appendChild(e), n.value || (a = Vn(s, (t => {
                            e.innerText = t
                        }), {
                            immediate: !0
                        }), n.value = !0)
                    },
                    u = () => {
                        r && n.value && (a(), r.head.removeChild(r.getElementById(o)), n.value = !1)
                    };
                l && !i && _i(c), i || xi(u), Mt(n)
            }(w);
            const C = e => {
                    var n, r;
                    const {
                        serverURL: l,
                        path: i,
                        pageSize: o
                    } = t.value, s = new AbortController;
                    u.value = "loading", null === (n = _) || void 0 === n || n(), (e => {
                        let {
                            serverURL: t,
                            lang: n,
                            path: r,
                            page: l,
                            pageSize: i,
                            sortBy: o,
                            signal: s,
                            token: a
                        } = e;
                        const c = {};
                        return a && (c.Authorization = `Bearer ${a}`), fetch(`${t}/comment?path=${encodeURIComponent(r)}&pageSize=${i}&page=${l}&lang=${n}&sortBy=${o}`, {
                            signal: s,
                            headers: c
                        }).then((e => e.json())).then((e => x(e, "comment data")))
                    })({
                        serverURL: l,
                        lang: t.value.lang,
                        path: i,
                        pageSize: o,
                        sortBy: g.value,
                        page: e,
                        signal: s.signal,
                        token: null === (r = a.value) || void 0 === r ? void 0 : r.token
                    }).then((t => {
                        u.value = "success", d.value = t.count, m.value.push(...t.data), h.value = e, f.value = t.totalPages
                    })).catch((e => {
                        "AbortError" !== e.name && (console.error(e.message), u.value = "error")
                    })), _ = s.abort.bind(s)
                },
                I = () => {
                    d.value = 0, m.value = [], C(1)
                };
            return function(e, t) {
                if (sl) {
                    let n = sl.provides;
                    const r = sl.parent && sl.parent.provides;
                    r === n && (n = sl.provides = Object.create(r)), n[e] = t
                }
            }("config", t), Vn((() => e.path), I), Kn((() => I())), {
                config: t,
                darkmodeStyle: w,
                i18n: wl((() => t.value.locale)),
                status: u,
                count: d,
                page: h,
                totalPages: f,
                sortBy: g,
                sortByItems: vc,
                data: m,
                reply: v,
                edit: y,
                loadMore: () => C(h.value + 1),
                refresh: I,
                onSortByChange: e => {
                    g.value !== e && (g.value = e, I())
                },
                onReply: e => {
                    v.value = e
                },
                onSubmit: e => {
                    if (y.value) y.value.comment = e.comment, y.value.orig = e.orig;
                    else if (e.rid) {
                        const t = m.value.find((t => {
                            let {
                                objectId: n
                            } = t;
                            return n === e.rid
                        }));
                        if (!t) return;
                        Array.isArray(t.children) || (t.children = []), t.children.push(e)
                    } else m.value.unshift(e)
                },
                onStatusChange: async e => {
                    var n;
                    let {
                        comment: r,
                        status: l
                    } = e;
                    if (r.status === l) return;
                    const {
                        serverURL: i,
                        lang: o
                    } = t.value;
                    await S({
                        serverURL: i,
                        lang: o,
                        token: null === (n = a.value) || void 0 === n ? void 0 : n.token,
                        objectId: r.objectId,
                        status: l
                    }), r.status = l
                },
                onDelete: async e => {
                    var n;
                    let {
                        objectId: r
                    } = e;
                    if (!confirm("Are you sure you want to delete this comment?")) return;
                    const {
                        serverURL: l,
                        lang: i
                    } = t.value;
                    await (e => {
                        let {
                            serverURL: t,
                            lang: n,
                            token: r,
                            objectId: l
                        } = e;
                        return fetch(`${t}/comment/${l}?lang=${n}`, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${r}`
                            }
                        }).then((e => e.json()))
                    })({
                        serverURL: l,
                        lang: i,
                        token: null === (n = a.value) || void 0 === n ? void 0 : n.token,
                        objectId: r
                    }), m.value.some(((e, t) => e.objectId === r ? (m.value = m.value.filter(((e, n) => n !== t)), !0) : e.children.some(((n, l) => n.objectId === r && (m.value[t].children = e.children.filter(((e, t) => t !== l)), !0)))))
                },
                onSticky: async e => {
                    var n;
                    if (e.rid) return;
                    const {
                        serverURL: r,
                        lang: l
                    } = t.value;
                    await S({
                        serverURL: r,
                        lang: l,
                        token: null === (n = a.value) || void 0 === n ? void 0 : n.token,
                        objectId: e.objectId,
                        sticky: e.sticky ? 0 : 1
                    }), e.sticky = !e.sticky
                },
                onLike: async e => {
                    const {
                        serverURL: n,
                        lang: r
                    } = t.value, {
                        objectId: l
                    } = e, i = c.value.includes(l);
                    await (e => {
                        let {
                            serverURL: t,
                            lang: n,
                            objectId: r,
                            like: l
                        } = e;
                        return fetch(`${t}/comment/${r}?lang=${n}`, {
                            method: "PUT",
                            headers: k,
                            body: JSON.stringify({
                                like: l
                            })
                        }).then((e => e.json()))
                    })({
                        serverURL: n,
                        lang: r,
                        objectId: l,
                        like: !i
                    }), i ? c.value = c.value.filter((e => e !== l)) : (c.value = [...c.value, l], c.value.length > 50 && (c.value = c.value.slice(-50))), e.like = (e.like || 0) + (i ? -1 : 1)
                },
                onEdit: e => {
                    y.value = e
                },
                version: "2.11.3"
            }
        }
    });
    const wc = {
            "data-waline": ""
        },
        bc = {
            class: "wl-meta-head"
        },
        kc = {
            class: "wl-count"
        },
        xc = ["textContent"],
        _c = {
            class: "wl-sort"
        },
        Cc = ["onClick"],
        Sc = {
            class: "wl-cards"
        },
        $c = {
            key: 1,
            class: "wl-operation"
        },
        Ic = ["textContent"],
        Ec = {
            key: 0,
            class: "wl-loading"
        },
        Rc = ["textContent"],
        Lc = {
            class: "wl-operation"
        },
        Ac = ["textContent"],
        zc = {
            key: 3,
            class: "wl-power"
        },
        Oc = Yr(" Powered by "),
        jc = Gr("a", {
            href: "https://github.com/walinejs/waline",
            target: "_blank",
            rel: "noreferrer"
        }, " Waline ", -1);
    var Tc = Ms(yc, [
        ["render", function(e, t, n, r, l, i) {
            const o = tr("Reaction"),
                s = tr("CommentBox"),
                a = tr("CommentCard"),
                c = tr("LoadingIcon");
            return Ur(), Dr("div", wc, [Kr(o), e.reply ? Xr("v-if", !0) : (Ur(), Vr(s, {
                key: 0,
                onSubmit: e.onSubmit
            }, null, 8, ["onSubmit"])), Gr("div", bc, [Gr("div", kc, [e.count ? (Ur(), Dr("span", {
                key: 0,
                class: "wl-num",
                textContent: W(e.count)
            }, null, 8, xc)) : Xr("v-if", !0), Yr(" " + W(e.i18n.comment), 1)]), Gr("ul", _c, [(Ur(!0), Dr(Ar, null, lr(e.sortByItems, (t => (Ur(), Dr("li", {
                key: t.key,
                class: V([t.key === e.sortBy ? "active" : ""]),
                onClick: n => e.onSortByChange(t.key)
            }, W(e.i18n[t.name]), 11, Cc)))), 128))])]), Gr("div", Sc, [(Ur(!0), Dr(Ar, null, lr(e.data, (t => (Ur(), Vr(a, {
                key: t.objectId,
                "root-id": t.objectId,
                comment: t,
                reply: e.reply,
                edit: e.edit,
                onReply: e.onReply,
                onEdit: e.onEdit,
                onSubmit: e.onSubmit,
                onStatus: e.onStatusChange,
                onDelete: e.onDelete,
                onSticky: e.onSticky,
                onLike: e.onLike
            }, null, 8, ["root-id", "comment", "reply", "edit", "onReply", "onEdit", "onSubmit", "onStatus", "onDelete", "onSticky", "onLike"])))), 128))]), "error" === e.status ? (Ur(), Dr("div", $c, [Gr("button", {
                type: "button",
                class: "wl-btn",
                onClick: t[0] || (t[0] = function() {
                    return e.refresh && e.refresh(...arguments)
                }),
                textContent: W(e.i18n.refresh)
            }, null, 8, Ic)])) : (Ur(), Dr(Ar, {
                key: 2
            }, ["loading" === e.status ? (Ur(), Dr("div", Ec, [Kr(c, {
                size: 30
            })])) : e.data.length ? e.page < e.totalPages ? (Ur(), Dr(Ar, {
                key: 2
            }, [Xr(" Load more button "), Gr("div", Lc, [Gr("button", {
                type: "button",
                class: "wl-btn",
                onClick: t[1] || (t[1] = function() {
                    return e.loadMore && e.loadMore(...arguments)
                }),
                textContent: W(e.i18n.more)
            }, null, 8, Ac)])], 2112)) : Xr("v-if", !0) : (Ur(), Dr("div", {
                key: 1,
                class: "wl-empty",
                textContent: W(e.i18n.sofa)
            }, null, 8, Rc))], 64)), Xr(" Copyright Information "), e.config.copyright ? (Ur(), Dr("div", zc, [Oc, jc, Yr(" v" + W(e.version), 1)])) : Xr("v-if", !0)])
        }],
        ["__file", "Waline.vue"]
    ]);
    const Pc = (e, t) => {
            t.forEach(((t, n) => {
                t.innerText = e[n].toString()
            }))
        },
        Uc = e => {
            let {
                serverURL: t,
                path: n = window.location.pathname,
                selector: r = ".waline-pageview-count",
                update: l = !0,
                lang: i = "zh-CN"
            } = e;
            const o = new AbortController,
                s = Array.from(document.querySelectorAll(r)),
                a = e => {
                    const t = gs(e);
                    return null !== t && n !== t
                },
                c = e => (e => {
                    let {
                        serverURL: t,
                        lang: n,
                        paths: r,
                        signal: l
                    } = e;
                    return _({
                        serverURL: t,
                        lang: n,
                        paths: r,
                        type: ["time"],
                        signal: l
                    }).then((e => Array.isArray(e) ? e : [e]))
                })({
                    serverURL: R(t),
                    paths: e.map((e => gs(e) || n)),
                    lang: i,
                    signal: o.signal
                }).then((t => Pc(t, e))).catch(xo);
            if (l) {
                const e = s.filter((e => !a(e))),
                    r = s.filter(a);
                (u = {
                    serverURL: R(t),
                    path: n,
                    lang: i
                }, C({
                    ...u,
                    type: "time"
                })).then((t => Pc(new Array(e.length).fill(t), e))), r.length && c(r)
            } else c(s);
            var u;
            return o.abort.bind(o)
        };
    e.pageviewCount = Uc;
    e.init = e => {
        let {
            el: t = "#waline",
            path: n = window.location.pathname,
            comment: r = !1,
            pageview: l = !1,
            ...i
        } = e;
        const o = t ? _o(t) : null;
        if (t && !o) throw new Error("Option 'el' do not match any domElement!");
        if (!i.serverURL) throw new Error("Option 'serverURL' is missing!");
        const s = Pt({
                ...i
            }),
            a = Pt({
                comment: r,
                pageview: l,
                path: n
            }),
            c = o ? function() {
                const e = ui().createApp(...arguments),
                    {
                        mount: t
                    } = e;
                return e.mount = n => {
                    const r = pi(n);
                    if (!r) return;
                    const l = e._component;
                    ae(l) || l.render || l.template || (l.template = r.innerHTML), r.innerHTML = "";
                    const i = t(r, !1, r instanceof SVGElement);
                    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i
                }, e
            }((() => bl(Tc, {
                path: a.path,
                ...s
            }))) : null;
        c && c.mount(o);
        const u = Fn((() => {
                a.comment && ms({
                    serverURL: s.serverURL,
                    path: a.path,
                    selector: "string" == typeof a.comment ? a.comment : void 0
                })
            })),
            p = Fn((() => {
                a.pageview && Uc({
                    serverURL: s.serverURL,
                    path: a.path,
                    selector: "string" == typeof a.pageview ? a.pageview : void 0
                })
            }));
        return {
            el: o,
            update: function() {
                let {
                    comment: e,
                    pageview: t,
                    path: n = window.location.pathname,
                    ...r
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                Object.entries(r).forEach((e => {
                    let [t, n] = e;
                    s[t] = n
                })), a.path = n, void 0 !== e && (a.comment = e), void 0 !== t && (a.pageview = t)
            },
            destroy: () => {
                null == c || c.unmount(), u(), p()
            }
        }
    };
    e.version = "2.11.3";
    e.RecentComments = e => {
        var t;
        let {
            el: n,
            serverURL: r,
            count: l,
            lang: i = "zh-CN"
        } = e;
        const o = Ps(),
            s = _o(n),
            a = new AbortController;
        return (e => {
            let {
                serverURL: t,
                lang: n,
                count: r,
                signal: l,
                token: i
            } = e;
            const o = {};
            return i && (o.Authorization = `Bearer ${i}`), fetch(`${t}/comment?type=recent&count=${r}&lang=${n}`, {
                signal: l,
                headers: o
            }).then((e => e.json())).then((e => x(e, "recent comment")))
        })({
            serverURL: r,
            count: l,
            lang: i,
            signal: a.signal,
            token: null === (t = o.value) || void 0 === t ? void 0 : t.token
        }).then((e => s && e.length ? (s.innerHTML = `<ul class="wl-recent-list">${e.map((e=>`<li class="wl-recent-item"><a href="${e.url}">${e.nick}</a>：${e.comment}</li>`)).join("")}</ul>`, {
            comments: e,
            destroy: () => {
                a.abort(), s.innerHTML = ""
            }
        }) : {
            comments: e,
            destroy: () => a.abort()
        }))
    }
}));
//# sourceMappingURL=waline.js.map