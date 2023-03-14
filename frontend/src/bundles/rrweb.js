var En = Object.defineProperty
var Kt = ((e) =>
	typeof require != 'undefined'
		? require
		: typeof Proxy != 'undefined'
		? new Proxy(e, {
				get: (t, r) => (typeof require != 'undefined' ? require : t)[r],
		  })
		: e)(function (e) {
	if (typeof require != 'undefined') return require.apply(this, arguments)
	throw new Error('Dynamic require of "' + e + '" is not supported')
})
var Jr = (e, t) => {
	for (var r in t) En(e, r, { get: t[r], enumerable: !0 })
}
var P
;(function (e) {
	;(e[(e.Document = 0)] = 'Document'),
		(e[(e.DocumentType = 1)] = 'DocumentType'),
		(e[(e.Element = 2)] = 'Element'),
		(e[(e.Text = 3)] = 'Text'),
		(e[(e.CDATA = 4)] = 'CDATA'),
		(e[(e.Comment = 5)] = 'Comment')
})(P || (P = {}))
function ni(e) {
	return e.nodeType === e.ELEMENT_NODE
}
function We(e) {
	var t = e?.host
	return Boolean(t?.shadowRoot === e)
}
function Be(e) {
	return Object.prototype.toString.call(e) === '[object ShadowRoot]'
}
function Tn(e) {
	return (
		e.includes(' background-clip: text;') &&
			!e.includes(' -webkit-background-clip: text;') &&
			(e = e.replace(
				' background-clip: text;',
				' -webkit-background-clip: text; background-clip: text;',
			)),
		e
	)
}
function Xt(e) {
	try {
		var t = e.rules || e.cssRules
		return t ? Tn(Array.from(t).map(Jt).join('')) : null
	} catch {
		return null
	}
}
function Jt(e) {
	var t = e.cssText
	if (Mn(e))
		try {
			t = Xt(e.styleSheet) || t
		} catch {}
	return t
}
function Mn(e) {
	return 'styleSheet' in e
}
var qt = (function () {
	function e() {
		;(this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap())
	}
	return (
		(e.prototype.getId = function (t) {
			var r
			if (!t) return -1
			var i =
				(r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id
			return i ?? -1
		}),
		(e.prototype.getNode = function (t) {
			return this.idNodeMap.get(t) || null
		}),
		(e.prototype.getIds = function () {
			return Array.from(this.idNodeMap.keys())
		}),
		(e.prototype.getMeta = function (t) {
			return this.nodeMetaMap.get(t) || null
		}),
		(e.prototype.removeNodeFromMap = function (t) {
			var r = this,
				i = this.getId(t)
			this.idNodeMap.delete(i),
				t.childNodes &&
					t.childNodes.forEach(function (n) {
						return r.removeNodeFromMap(n)
					})
		}),
		(e.prototype.has = function (t) {
			return this.idNodeMap.has(t)
		}),
		(e.prototype.hasNode = function (t) {
			return this.nodeMetaMap.has(t)
		}),
		(e.prototype.add = function (t, r) {
			var i = r.id
			this.idNodeMap.set(i, t), this.nodeMetaMap.set(t, r)
		}),
		(e.prototype.replace = function (t, r) {
			var i = this.getNode(t)
			if (i) {
				var n = this.nodeMetaMap.get(i)
				n && this.nodeMetaMap.set(r, n)
			}
			this.idNodeMap.set(t, r)
		}),
		(e.prototype.reset = function () {
			;(this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap())
		}),
		e
	)
})()
function gt() {
	return new qt()
}
function Je(e) {
	var t = e.maskInputOptions,
		r = e.tagName,
		i = e.type,
		n = e.value,
		o = e.maskInputFn,
		s = n || ''
	return (
		(t[r.toLowerCase()] || t[i]) &&
			(o ? (s = o(s)) : (s = '*'.repeat(s.length))),
		s
	)
}
var qr = '__rrweb_original__'
function Rn(e) {
	var t = e.getContext('2d')
	if (!t) return !0
	for (var r = 50, i = 0; i < e.width; i += r)
		for (var n = 0; n < e.height; n += r) {
			var o = t.getImageData,
				s = qr in o ? o[qr] : o,
				a = new Uint32Array(
					s.call(
						t,
						i,
						n,
						Math.min(r, e.width - i),
						Math.min(r, e.height - n),
					).data.buffer,
				)
			if (
				a.some(function (l) {
					return l !== 0
				})
			)
				return !1
		}
	return !0
}
function qe(e) {
	return (
		(e = e.replace(/[^ -~]+/g, '')),
		(e =
			e
				?.split(' ')
				.map(function (t) {
					return Math.random().toString(20).substr(2, t.length)
				})
				.join(' ') || ''),
		e
	)
}
function jt(e) {
	return e === 'img' || e === 'video' || e === 'audio' || e === 'source'
}
var kn = 1,
	Dn = new RegExp('[^a-z0-9-_:]'),
	Pe = -2
function $t() {
	return kn++
}
function xn(e) {
	if (e instanceof HTMLFormElement) return 'form'
	var t = e.tagName.toLowerCase().trim()
	return Dn.test(t) ? 'div' : t
}
function On(e) {
	return e.cssRules
		? Array.from(e.cssRules)
				.map(function (t) {
					return t.cssText || ''
				})
				.join('')
		: ''
}
function Ln(e) {
	var t = ''
	return (
		e.indexOf('//') > -1
			? (t = e.split('/').slice(0, 3).join('/'))
			: (t = e.split('/')[0]),
		(t = t.split('?')[0]),
		t
	)
}
var Ze,
	$r,
	Fn = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
	_n = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
	Bn = /^(data:)([^,]*),(.*)/i
function mt(e, t) {
	return (e || '').replace(Fn, function (r, i, n, o, s, a) {
		var l = n || s || a,
			c = i || o || ''
		if (!l) return r
		if (!_n.test(l) || Bn.test(l))
			return 'url('.concat(c).concat(l).concat(c, ')')
		if (l[0] === '/')
			return 'url('
				.concat(c)
				.concat(Ln(t) + l)
				.concat(c, ')')
		var u = t.split('/'),
			d = l.split('/')
		u.pop()
		for (var f = 0, h = d; f < h.length; f++) {
			var p = h[f]
			p !== '.' && (p === '..' ? u.pop() : u.push(p))
		}
		return 'url('.concat(c).concat(u.join('/')).concat(c, ')')
	})
}
var Pn = /^[^ \t\n\r\u000c]+/,
	Wn = /^[, \t\n\r\u000c]+/
function Vn(e, t) {
	if (t.trim() === '') return t
	var r = 0
	function i(c) {
		var u,
			d = c.exec(t.substring(r))
		return d ? ((u = d[0]), (r += u.length), u) : ''
	}
	for (var n = []; i(Wn), !(r >= t.length); ) {
		var o = i(Pn)
		if (o.slice(-1) === ',')
			(o = Ye(e, o.substring(0, o.length - 1))), n.push(o)
		else {
			var s = ''
			o = Ye(e, o)
			for (var a = !1; ; ) {
				var l = t.charAt(r)
				if (l === '') {
					n.push((o + s).trim())
					break
				} else if (a) l === ')' && (a = !1)
				else if (l === ',') {
					;(r += 1), n.push((o + s).trim())
					break
				} else l === '(' && (a = !0)
				;(s += l), (r += 1)
			}
		}
	}
	return n.join(', ')
}
function Ye(e, t) {
	if (!t || t.trim() === '') return t
	var r = e.createElement('a')
	return (r.href = t), r.href
}
function Gn(e) {
	return Boolean(e.tagName === 'svg' || e.ownerSVGElement)
}
function er() {
	var e = document.createElement('a')
	return (e.href = ''), e.href
}
function tr(e, t, r, i) {
	return r === 'src' ||
		(r === 'href' && i && !(t === 'use' && i[0] === '#')) ||
		(r === 'xlink:href' && i && i[0] !== '#') ||
		(r === 'background' && i && (t === 'table' || t === 'td' || t === 'th'))
		? Ye(e, i)
		: r === 'srcset' && i
		? Vn(e, i)
		: r === 'style' && i
		? mt(i, er())
		: t === 'object' && r === 'data' && i
		? Ye(e, i)
		: i
}
function ei(e, t, r) {
	if (typeof t == 'string') {
		if (e.classList.contains(t)) return !0
	} else
		for (var i = e.classList.length; i--; ) {
			var n = e.classList[i]
			if (t.test(n)) return !0
		}
	return r ? e.matches(r) : !1
}
function Qe(e, t, r) {
	if (!e) return !1
	if (e.nodeType !== e.ELEMENT_NODE) return r ? Qe(e.parentNode, t, r) : !1
	for (var i = e.classList.length; i--; ) {
		var n = e.classList[i]
		if (t.test(n)) return !0
	}
	return r ? Qe(e.parentNode, t, r) : !1
}
function rr(e, t, r) {
	var i = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement
	if (i === null) return !1
	if (typeof t == 'string') {
		if (i.classList.contains(t) || i.closest('.'.concat(t))) return !0
	} else if (Qe(i, t, !0)) return !0
	return !!(r && (i.matches(r) || i.closest(r)))
}
function Un(e, t, r) {
	var i = e.contentWindow
	if (!!i) {
		var n = !1,
			o
		try {
			o = i.document.readyState
		} catch {
			return
		}
		if (o !== 'complete') {
			var s = setTimeout(function () {
				n || (t(), (n = !0))
			}, r)
			e.addEventListener('load', function () {
				clearTimeout(s), (n = !0), t()
			})
			return
		}
		var a = 'about:blank'
		if (i.location.href !== a || e.src === a || e.src === '')
			return setTimeout(t, 0), e.addEventListener('load', t)
		e.addEventListener('load', t)
	}
}
function Hn(e, t, r) {
	var i = !1,
		n
	try {
		n = e.sheet
	} catch {
		return
	}
	if (!n) {
		var o = setTimeout(function () {
			i || (t(), (i = !0))
		}, r)
		e.addEventListener('load', function () {
			clearTimeout(o), (i = !0), t()
		})
	}
}
function Zn(e, t) {
	var r = t.doc,
		i = t.mirror,
		n = t.blockClass,
		o = t.blockSelector,
		s = t.maskTextClass,
		a = t.maskTextSelector,
		l = t.inlineStylesheet,
		c = t.maskInputOptions,
		u = c === void 0 ? {} : c,
		d = t.maskTextFn,
		f = t.maskInputFn,
		h = t.dataURLOptions,
		p = h === void 0 ? {} : h,
		v = t.inlineImages,
		y = t.recordCanvas,
		m = t.keepIframeSrcFn,
		g = t.newlyAddedElement,
		w = g === void 0 ? !1 : g,
		N = t.enableStrictPrivacy,
		C = Yn(r, i)
	switch (e.nodeType) {
		case e.DOCUMENT_NODE:
			return e.compatMode !== 'CSS1Compat'
				? { type: P.Document, childNodes: [], compatMode: e.compatMode }
				: { type: P.Document, childNodes: [] }
		case e.DOCUMENT_TYPE_NODE:
			return {
				type: P.DocumentType,
				name: e.name,
				publicId: e.publicId,
				systemId: e.systemId,
				rootId: C,
			}
		case e.ELEMENT_NODE:
			return Kn(e, {
				doc: r,
				blockClass: n,
				blockSelector: o,
				inlineStylesheet: l,
				maskInputOptions: u,
				maskInputFn: f,
				maskTextClass: s,
				dataURLOptions: p,
				inlineImages: v,
				recordCanvas: y,
				keepIframeSrcFn: m,
				newlyAddedElement: w,
				enableStrictPrivacy: N,
				rootId: C,
			})
		case e.TEXT_NODE:
			return zn(e, {
				maskTextClass: s,
				maskTextSelector: a,
				maskTextFn: d,
				enableStrictPrivacy: N,
				rootId: C,
			})
		case e.CDATA_SECTION_NODE:
			return { type: P.CDATA, textContent: '', rootId: C }
		case e.COMMENT_NODE:
			return {
				type: P.Comment,
				textContent: e.textContent || '',
				rootId: C,
			}
		default:
			return !1
	}
}
function Yn(e, t) {
	if (!!t.hasNode(e)) {
		var r = t.getId(e)
		return r === 1 ? void 0 : r
	}
}
function zn(e, t) {
	var r,
		i = t.maskTextClass,
		n = t.maskTextSelector,
		o = t.maskTextFn,
		s = t.enableStrictPrivacy,
		a = t.rootId,
		l = e.parentNode && e.parentNode.tagName,
		c = e.textContent,
		u = l === 'STYLE' ? !0 : void 0,
		d = l === 'SCRIPT' ? !0 : void 0,
		f = !1
	if (u && c) {
		try {
			e.nextSibling ||
				e.previousSibling ||
				(!((r = e.parentNode.sheet) === null || r === void 0) &&
					r.cssRules &&
					(c = On(e.parentNode.sheet)))
		} catch (p) {
			console.warn(
				"Cannot get CSS styles from text's parentNode. Error: ".concat(
					p,
				),
				e,
			)
		}
		;(c = mt(c, er())), (f = !0)
	}
	if (
		(d
			? ((c = 'SCRIPT_PLACEHOLDER'), (f = !0))
			: l === 'NOSCRIPT' && ((c = ''), (f = !0)),
		!u &&
			!d &&
			c &&
			rr(e, i, n) &&
			(c = o ? o(c) : c.replace(/[\S]/g, '*')),
		s && !f && l)
	) {
		var h = new Set([
			'HEAD',
			'TITLE',
			'STYLE',
			'SCRIPT',
			'HTML',
			'BODY',
			'NOSCRIPT',
		])
		!h.has(l) && c && (c = qe(c))
	}
	return { type: P.Text, textContent: c || '', isStyle: u, rootId: a }
}
function Kn(e, t) {
	for (
		var r = t.doc,
			i = t.blockClass,
			n = t.blockSelector,
			o = t.inlineStylesheet,
			s = t.maskInputOptions,
			a = s === void 0 ? {} : s,
			l = t.maskInputFn,
			c = t.maskTextClass,
			u = t.dataURLOptions,
			d = u === void 0 ? {} : u,
			f = t.inlineImages,
			h = t.recordCanvas,
			p = t.keepIframeSrcFn,
			v = t.newlyAddedElement,
			y = v === void 0 ? !1 : v,
			m = t.enableStrictPrivacy,
			g = t.rootId,
			w = ei(e, i, n),
			N = ei(e, c, null),
			C = xn(e),
			S = {},
			k = e.attributes.length,
			b = 0;
		b < k;
		b++
	) {
		var F = e.attributes[b]
		S[F.name] = tr(r, C, F.name, F.value)
	}
	if (C === 'link' && o) {
		var _ = Array.from(r.styleSheets).find(function (R) {
				return R.href === e.href
			}),
			z = null
		_ && (z = Xt(_)),
			z && (delete S.rel, delete S.href, (S._cssText = mt(z, _.href)))
	}
	if (
		C === 'style' &&
		e.sheet &&
		!(e.innerText || e.textContent || '').trim().length
	) {
		var z = Xt(e.sheet)
		z && (S._cssText = mt(z, er()))
	}
	if (C === 'input' || C === 'textarea' || C === 'select') {
		var Z = e.value,
			U = e.checked
		S.type !== 'radio' &&
		S.type !== 'checkbox' &&
		S.type !== 'submit' &&
		S.type !== 'button' &&
		Z
			? (S.value = Je({
					type: S.type,
					tagName: C,
					value: Z,
					maskInputOptions: a,
					maskInputFn: l,
			  }))
			: U && (S.checked = U)
	}
	if (
		(C === 'option' &&
			(e.selected && !a.select ? (S.selected = !0) : delete S.selected),
		C === 'canvas' && h)
	) {
		if (e.__context === '2d')
			Rn(e) || (S.rr_dataURL = e.toDataURL(d.type, d.quality))
		else if (!('__context' in e)) {
			var H = e.toDataURL(d.type, d.quality),
				D = document.createElement('canvas')
			;(D.width = e.width), (D.height = e.height)
			var B = D.toDataURL(d.type, d.quality)
			H !== B && (S.rr_dataURL = H)
		}
	}
	if (C === 'img' && f && !w && !N && !m) {
		Ze || ((Ze = r.createElement('canvas')), ($r = Ze.getContext('2d')))
		var L = e,
			V = L.crossOrigin
		L.crossOrigin = 'anonymous'
		var A = function () {
			try {
				;(Ze.width = L.naturalWidth),
					(Ze.height = L.naturalHeight),
					$r.drawImage(L, 0, 0),
					(S.rr_dataURL = Ze.toDataURL(d.type, d.quality))
			} catch (R) {
				console.warn(
					'Cannot inline img src='
						.concat(L.currentSrc, '! Error: ')
						.concat(R),
				)
			}
			V ? (S.crossOrigin = V) : L.removeAttribute('crossorigin')
		}
		L.complete && L.naturalWidth !== 0 ? A() : (L.onload = A)
	}
	if (
		((C === 'audio' || C === 'video') &&
			((S.rr_mediaState = e.paused ? 'paused' : 'played'),
			(S.rr_mediaCurrentTime = e.currentTime)),
		y ||
			(e.scrollLeft && (S.rr_scrollLeft = e.scrollLeft),
			e.scrollTop && (S.rr_scrollTop = e.scrollTop)),
		w || N || (m && jt(C)))
	) {
		var I = e.getBoundingClientRect(),
			M = I.width,
			O = I.height
		S = {
			class: S.class,
			rr_width: ''.concat(M, 'px'),
			rr_height: ''.concat(O, 'px'),
		}
	}
	return (
		m && jt(C) && (w = !0),
		C === 'iframe' &&
			!p(S.src) &&
			(e.contentDocument || (S.rr_src = S.src), delete S.src),
		{
			type: P.Element,
			tagName: C,
			attributes: S,
			childNodes: [],
			isSVG: Gn(e) || void 0,
			needBlock: w,
			needMask: N,
			rootId: g,
		}
	)
}
function Q(e) {
	return e === void 0 ? '' : e.toLowerCase()
}
function Xn(e, t) {
	if (t.comment && e.type === P.Comment) return !0
	if (e.type === P.Element) {
		if (
			t.script &&
			(e.tagName === 'script' ||
				(e.tagName === 'link' &&
					e.attributes.rel === 'preload' &&
					e.attributes.as === 'script') ||
				(e.tagName === 'link' &&
					e.attributes.rel === 'prefetch' &&
					typeof e.attributes.href == 'string' &&
					e.attributes.href.endsWith('.js')))
		)
			return !0
		if (
			t.headFavicon &&
			((e.tagName === 'link' && e.attributes.rel === 'shortcut icon') ||
				(e.tagName === 'meta' &&
					(Q(e.attributes.name).match(
						/^msapplication-tile(image|color)$/,
					) ||
						Q(e.attributes.name) === 'application-name' ||
						Q(e.attributes.rel) === 'icon' ||
						Q(e.attributes.rel) === 'apple-touch-icon' ||
						Q(e.attributes.rel) === 'shortcut icon')))
		)
			return !0
		if (e.tagName === 'meta') {
			if (
				t.headMetaDescKeywords &&
				Q(e.attributes.name).match(/^description|keywords$/)
			)
				return !0
			if (
				t.headMetaSocial &&
				(Q(e.attributes.property).match(/^(og|twitter|fb):/) ||
					Q(e.attributes.name).match(/^(og|twitter):/) ||
					Q(e.attributes.name) === 'pinterest')
			)
				return !0
			if (
				t.headMetaRobots &&
				(Q(e.attributes.name) === 'robots' ||
					Q(e.attributes.name) === 'googlebot' ||
					Q(e.attributes.name) === 'bingbot')
			)
				return !0
			if (t.headMetaHttpEquiv && e.attributes['http-equiv'] !== void 0)
				return !0
			if (
				t.headMetaAuthorship &&
				(Q(e.attributes.name) === 'author' ||
					Q(e.attributes.name) === 'generator' ||
					Q(e.attributes.name) === 'framework' ||
					Q(e.attributes.name) === 'publisher' ||
					Q(e.attributes.name) === 'progid' ||
					Q(e.attributes.property).match(/^article:/) ||
					Q(e.attributes.property).match(/^product:/))
			)
				return !0
			if (
				t.headMetaVerification &&
				(Q(e.attributes.name) === 'google-site-verification' ||
					Q(e.attributes.name) === 'yandex-verification' ||
					Q(e.attributes.name) === 'csrf-token' ||
					Q(e.attributes.name) === 'p:domain_verify' ||
					Q(e.attributes.name) === 'verify-v1' ||
					Q(e.attributes.name) === 'verification' ||
					Q(e.attributes.name) === 'shopify-checkout-api-token')
			)
				return !0
		}
	}
	return !1
}
function _e(e, t) {
	var r = t.doc,
		i = t.mirror,
		n = t.blockClass,
		o = t.blockSelector,
		s = t.maskTextClass,
		a = t.maskTextSelector,
		l = t.skipChild,
		c = l === void 0 ? !1 : l,
		u = t.inlineStylesheet,
		d = u === void 0 ? !0 : u,
		f = t.maskInputOptions,
		h = f === void 0 ? {} : f,
		p = t.maskTextFn,
		v = t.maskInputFn,
		y = t.slimDOMOptions,
		m = t.dataURLOptions,
		g = m === void 0 ? {} : m,
		w = t.inlineImages,
		N = w === void 0 ? !1 : w,
		C = t.recordCanvas,
		S = C === void 0 ? !1 : C,
		k = t.onSerialize,
		b = t.onIframeLoad,
		F = t.iframeLoadTimeout,
		_ = F === void 0 ? 5e3 : F,
		z = t.onStylesheetLoad,
		Z = t.stylesheetLoadTimeout,
		U = Z === void 0 ? 5e3 : Z,
		H = t.keepIframeSrcFn,
		D =
			H === void 0
				? function () {
						return !1
				  }
				: H,
		B = t.newlyAddedElement,
		L = B === void 0 ? !1 : B,
		V = t.enableStrictPrivacy,
		A = t.preserveWhiteSpace,
		I = A === void 0 ? !0 : A,
		M = Zn(e, {
			doc: r,
			mirror: i,
			blockClass: n,
			blockSelector: o,
			maskTextClass: s,
			maskTextSelector: a,
			inlineStylesheet: d,
			maskInputOptions: h,
			maskTextFn: p,
			maskInputFn: v,
			dataURLOptions: g,
			inlineImages: N,
			recordCanvas: S,
			keepIframeSrcFn: D,
			newlyAddedElement: L,
			enableStrictPrivacy: V,
		})
	if (!M) return console.warn(e, 'not serialized'), null
	var O
	i.hasNode(e)
		? (O = i.getId(e))
		: Xn(M, y) ||
		  (!I &&
				M.type === P.Text &&
				!M.isStyle &&
				!M.textContent.replace(/^\s+|\s+$/gm, '').length)
		? (O = Pe)
		: (O = $t())
	var R = Object.assign(M, { id: O })
	if ((i.add(e, R), O === Pe)) return null
	k && k(e)
	var K = !c,
		J = V
	if (R.type === P.Element) {
		if (
			((K = K && !R.needBlock),
			(J = V || !!R.needBlock || !!R.needMask),
			J && jt(R.tagName))
		) {
			var Ce = e.cloneNode()
			;(Ce.src = ''), i.add(Ce, R)
		}
		delete R.needBlock, delete R.needMask
		var Se = e.shadowRoot
		Se && Be(Se) && (R.isShadowHost = !0)
	}
	if ((R.type === P.Document || R.type === P.Element) && K) {
		y.headWhitespace &&
			R.type === P.Element &&
			R.tagName === 'head' &&
			(I = !1)
		for (
			var se = {
					doc: r,
					mirror: i,
					blockClass: n,
					blockSelector: o,
					maskTextClass: s,
					maskTextSelector: a,
					skipChild: c,
					inlineStylesheet: d,
					maskInputOptions: h,
					maskTextFn: p,
					maskInputFn: v,
					slimDOMOptions: y,
					dataURLOptions: g,
					inlineImages: N,
					recordCanvas: S,
					preserveWhiteSpace: I,
					onSerialize: k,
					onIframeLoad: b,
					iframeLoadTimeout: _,
					onStylesheetLoad: z,
					stylesheetLoadTimeout: U,
					keepIframeSrcFn: D,
					enableStrictPrivacy: J,
				},
				he = 0,
				be = Array.from(e.childNodes);
			he < be.length;
			he++
		) {
			var x = be[he],
				te = _e(x, se)
			te && R.childNodes.push(te)
		}
		if (ni(e) && e.shadowRoot)
			for (
				var X = 0, q = Array.from(e.shadowRoot.childNodes);
				X < q.length;
				X++
			) {
				var x = q[X],
					te = _e(x, se)
				te &&
					(Be(e.shadowRoot) && (te.isShadow = !0),
					R.childNodes.push(te))
			}
	}
	return (
		e.parentNode &&
			We(e.parentNode) &&
			Be(e.parentNode) &&
			(R.isShadow = !0),
		R.type === P.Element &&
			R.tagName === 'iframe' &&
			Un(
				e,
				function () {
					var ce = e.contentDocument
					if (ce && b) {
						var j = _e(ce, {
							doc: ce,
							mirror: i,
							blockClass: n,
							blockSelector: o,
							maskTextClass: s,
							maskTextSelector: a,
							skipChild: !1,
							inlineStylesheet: d,
							maskInputOptions: h,
							maskTextFn: p,
							maskInputFn: v,
							slimDOMOptions: y,
							dataURLOptions: g,
							inlineImages: N,
							recordCanvas: S,
							preserveWhiteSpace: I,
							onSerialize: k,
							onIframeLoad: b,
							iframeLoadTimeout: _,
							onStylesheetLoad: z,
							stylesheetLoadTimeout: U,
							keepIframeSrcFn: D,
							enableStrictPrivacy: V,
						})
						j && b(e, j)
					}
				},
				_,
			),
		R.type === P.Element &&
			R.tagName === 'link' &&
			R.attributes.rel === 'stylesheet' &&
			Hn(
				e,
				function () {
					if (z) {
						var ce = _e(e, {
							doc: r,
							mirror: i,
							blockClass: n,
							blockSelector: o,
							maskTextClass: s,
							maskTextSelector: a,
							skipChild: !1,
							inlineStylesheet: d,
							maskInputOptions: h,
							maskTextFn: p,
							maskInputFn: v,
							slimDOMOptions: y,
							dataURLOptions: g,
							inlineImages: N,
							recordCanvas: S,
							preserveWhiteSpace: I,
							onSerialize: k,
							onIframeLoad: b,
							iframeLoadTimeout: _,
							onStylesheetLoad: z,
							stylesheetLoadTimeout: U,
							keepIframeSrcFn: D,
							enableStrictPrivacy: V,
						})
						ce && z(e, ce)
					}
				},
				U,
			),
		R
	)
}
function oi(e, t) {
	var r = t || {},
		i = r.mirror,
		n = i === void 0 ? new qt() : i,
		o = r.blockClass,
		s = o === void 0 ? 'highlight-block' : o,
		a = r.blockSelector,
		l = a === void 0 ? null : a,
		c = r.maskTextClass,
		u = c === void 0 ? 'highlight-mask' : c,
		d = r.maskTextSelector,
		f = d === void 0 ? null : d,
		h = r.inlineStylesheet,
		p = h === void 0 ? !0 : h,
		v = r.inlineImages,
		y = v === void 0 ? !1 : v,
		m = r.recordCanvas,
		g = m === void 0 ? !1 : m,
		w = r.maskAllInputs,
		N = w === void 0 ? !1 : w,
		C = r.maskTextFn,
		S = r.maskInputFn,
		k = r.slimDOM,
		b = k === void 0 ? !1 : k,
		F = r.dataURLOptions,
		_ = r.preserveWhiteSpace,
		z = r.onSerialize,
		Z = r.onIframeLoad,
		U = r.iframeLoadTimeout,
		H = r.onStylesheetLoad,
		D = r.stylesheetLoadTimeout,
		B = r.keepIframeSrcFn,
		L =
			B === void 0
				? function () {
						return !1
				  }
				: B,
		V = r.enableStrictPrivacy,
		A = V === void 0 ? !1 : V,
		I =
			N === !0
				? {
						color: !0,
						date: !0,
						'datetime-local': !0,
						email: !0,
						month: !0,
						number: !0,
						range: !0,
						search: !0,
						tel: !0,
						text: !0,
						time: !0,
						url: !0,
						week: !0,
						textarea: !0,
						select: !0,
						password: !0,
				  }
				: N === !1
				? { password: !0 }
				: N,
		M =
			b === !0 || b === 'all'
				? {
						script: !0,
						comment: !0,
						headFavicon: !0,
						headWhitespace: !0,
						headMetaDescKeywords: b === 'all',
						headMetaSocial: !0,
						headMetaRobots: !0,
						headMetaHttpEquiv: !0,
						headMetaAuthorship: !0,
						headMetaVerification: !0,
				  }
				: b === !1
				? {}
				: b
	return _e(e, {
		doc: e,
		mirror: n,
		blockClass: s,
		blockSelector: l,
		maskTextClass: u,
		maskTextSelector: f,
		skipChild: !1,
		inlineStylesheet: p,
		maskInputOptions: I,
		maskTextFn: C,
		maskInputFn: S,
		slimDOMOptions: M,
		dataURLOptions: F,
		inlineImages: y,
		recordCanvas: g,
		preserveWhiteSpace: _,
		onSerialize: z,
		onIframeLoad: Z,
		iframeLoadTimeout: U,
		onStylesheetLoad: H,
		stylesheetLoadTimeout: D,
		keepIframeSrcFn: L,
		newlyAddedElement: !1,
		enableStrictPrivacy: A,
	})
}
var ti = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g
function jn(e, t) {
	t === void 0 && (t = {})
	var r = 1,
		i = 1
	function n(A) {
		var I = A.match(/\n/g)
		I && (r += I.length)
		var M = A.lastIndexOf(`
`)
		i = M === -1 ? i + A.length : A.length - M
	}
	function o() {
		var A = { line: r, column: i }
		return function (I) {
			return (I.position = new s(A)), p(), I
		}
	}
	var s = (function () {
		function A(I) {
			;(this.start = I),
				(this.end = { line: r, column: i }),
				(this.source = t.source)
		}
		return A
	})()
	s.prototype.content = e
	var a = []
	function l(A) {
		var I = new Error(
			''
				.concat(t.source || '', ':')
				.concat(r, ':')
				.concat(i, ': ')
				.concat(A),
		)
		if (
			((I.reason = A),
			(I.filename = t.source),
			(I.line = r),
			(I.column = i),
			(I.source = e),
			t.silent)
		)
			a.push(I)
		else throw I
	}
	function c() {
		var A = f()
		return {
			type: 'stylesheet',
			stylesheet: { source: t.source, rules: A, parsingErrors: a },
		}
	}
	function u() {
		return h(/^{\s*/)
	}
	function d() {
		return h(/^}/)
	}
	function f() {
		var A,
			I = []
		for (p(), v(I); e.length && e.charAt(0) !== '}' && (A = L() || V()); )
			A !== !1 && (I.push(A), v(I))
		return I
	}
	function h(A) {
		var I = A.exec(e)
		if (!!I) {
			var M = I[0]
			return n(M), (e = e.slice(M.length)), I
		}
	}
	function p() {
		h(/^\s*/)
	}
	function v(A) {
		A === void 0 && (A = [])
		for (var I; (I = y()); ) I !== !1 && A.push(I), (I = y())
		return A
	}
	function y() {
		var A = o()
		if (!(e.charAt(0) !== '/' || e.charAt(1) !== '*')) {
			for (
				var I = 2;
				e.charAt(I) !== '' &&
				(e.charAt(I) !== '*' || e.charAt(I + 1) !== '/');

			)
				++I
			if (((I += 2), e.charAt(I - 1) === ''))
				return l('End of comment missing')
			var M = e.slice(2, I - 2)
			return (
				(i += 2),
				n(M),
				(e = e.slice(I)),
				(i += 2),
				A({ type: 'comment', comment: M })
			)
		}
	}
	function m() {
		var A = h(/^([^{]+)/)
		if (!!A)
			return Ne(A[0])
				.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
				.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (I) {
					return I.replace(/,/g, '\u200C')
				})
				.split(/\s*(?![^(]*\)),\s*/)
				.map(function (I) {
					return I.replace(/\u200C/g, ',')
				})
	}
	function g() {
		var A = o(),
			I = h(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/)
		if (!!I) {
			var M = Ne(I[0])
			if (!h(/^:\s*/)) return l("property missing ':'")
			var O = h(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),
				R = A({
					type: 'declaration',
					property: M.replace(ti, ''),
					value: O ? Ne(O[0]).replace(ti, '') : '',
				})
			return h(/^[;\s]*/), R
		}
	}
	function w() {
		var A = []
		if (!u()) return l("missing '{'")
		v(A)
		for (var I; (I = g()); ) I !== !1 && (A.push(I), v(A)), (I = g())
		return d() ? A : l("missing '}'")
	}
	function N() {
		for (
			var A, I = [], M = o();
			(A = h(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/));

		)
			I.push(A[1]), h(/^,\s*/)
		if (!!I.length)
			return M({ type: 'keyframe', values: I, declarations: w() })
	}
	function C() {
		var A = o(),
			I = h(/^@([-\w]+)?keyframes\s*/)
		if (!!I) {
			var M = I[1]
			if (((I = h(/^([-\w]+)\s*/)), !I))
				return l('@keyframes missing name')
			var O = I[1]
			if (!u()) return l("@keyframes missing '{'")
			for (var R, K = v(); (R = N()); ) K.push(R), (K = K.concat(v()))
			return d()
				? A({ type: 'keyframes', name: O, vendor: M, keyframes: K })
				: l("@keyframes missing '}'")
		}
	}
	function S() {
		var A = o(),
			I = h(/^@supports *([^{]+)/)
		if (!!I) {
			var M = Ne(I[1])
			if (!u()) return l("@supports missing '{'")
			var O = v().concat(f())
			return d()
				? A({ type: 'supports', supports: M, rules: O })
				: l("@supports missing '}'")
		}
	}
	function k() {
		var A = o(),
			I = h(/^@host\s*/)
		if (!!I) {
			if (!u()) return l("@host missing '{'")
			var M = v().concat(f())
			return d() ? A({ type: 'host', rules: M }) : l("@host missing '}'")
		}
	}
	function b() {
		var A = o(),
			I = h(/^@media *([^{]+)/)
		if (!!I) {
			var M = Ne(I[1])
			if (!u()) return l("@media missing '{'")
			var O = v().concat(f())
			return d()
				? A({ type: 'media', media: M, rules: O })
				: l("@media missing '}'")
		}
	}
	function F() {
		var A = o(),
			I = h(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/)
		if (!!I)
			return A({ type: 'custom-media', name: Ne(I[1]), media: Ne(I[2]) })
	}
	function _() {
		var A = o(),
			I = h(/^@page */)
		if (!!I) {
			var M = m() || []
			if (!u()) return l("@page missing '{'")
			for (var O = v(), R; (R = g()); ) O.push(R), (O = O.concat(v()))
			return d()
				? A({ type: 'page', selectors: M, declarations: O })
				: l("@page missing '}'")
		}
	}
	function z() {
		var A = o(),
			I = h(/^@([-\w]+)?document *([^{]+)/)
		if (!!I) {
			var M = Ne(I[1]),
				O = Ne(I[2])
			if (!u()) return l("@document missing '{'")
			var R = v().concat(f())
			return d()
				? A({ type: 'document', document: O, vendor: M, rules: R })
				: l("@document missing '}'")
		}
	}
	function Z() {
		var A = o(),
			I = h(/^@font-face\s*/)
		if (!!I) {
			if (!u()) return l("@font-face missing '{'")
			for (var M = v(), O; (O = g()); ) M.push(O), (M = M.concat(v()))
			return d()
				? A({ type: 'font-face', declarations: M })
				: l("@font-face missing '}'")
		}
	}
	var U = B('import'),
		H = B('charset'),
		D = B('namespace')
	function B(A) {
		var I = new RegExp('^@' + A + '\\s*([^;]+);')
		return function () {
			var M = o(),
				O = h(I)
			if (!!O) {
				var R = { type: A }
				return (R[A] = O[1].trim()), M(R)
			}
		}
	}
	function L() {
		if (e[0] === '@')
			return (
				C() ||
				b() ||
				F() ||
				S() ||
				U() ||
				H() ||
				D() ||
				z() ||
				_() ||
				k() ||
				Z()
			)
	}
	function V() {
		var A = o(),
			I = m()
		return I
			? (v(), A({ type: 'rule', selectors: I, declarations: w() }))
			: l('selector missing')
	}
	return Qt(c())
}
function Ne(e) {
	return e ? e.replace(/^\s+|\s+$/g, '') : ''
}
function Qt(e, t) {
	for (
		var r = e && typeof e.type == 'string',
			i = r ? e : t,
			n = 0,
			o = Object.keys(e);
		n < o.length;
		n++
	) {
		var s = o[n],
			a = e[s]
		Array.isArray(a)
			? a.forEach(function (l) {
					Qt(l, i)
			  })
			: a && typeof a == 'object' && Qt(a, i)
	}
	return (
		r &&
			Object.defineProperty(e, 'parent', {
				configurable: !0,
				writable: !0,
				enumerable: !1,
				value: t || null,
			}),
		e
	)
}
var ri = {
	script: 'noscript',
	altglyph: 'altGlyph',
	altglyphdef: 'altGlyphDef',
	altglyphitem: 'altGlyphItem',
	animatecolor: 'animateColor',
	animatemotion: 'animateMotion',
	animatetransform: 'animateTransform',
	clippath: 'clipPath',
	feblend: 'feBlend',
	fecolormatrix: 'feColorMatrix',
	fecomponenttransfer: 'feComponentTransfer',
	fecomposite: 'feComposite',
	feconvolvematrix: 'feConvolveMatrix',
	fediffuselighting: 'feDiffuseLighting',
	fedisplacementmap: 'feDisplacementMap',
	fedistantlight: 'feDistantLight',
	fedropshadow: 'feDropShadow',
	feflood: 'feFlood',
	fefunca: 'feFuncA',
	fefuncb: 'feFuncB',
	fefuncg: 'feFuncG',
	fefuncr: 'feFuncR',
	fegaussianblur: 'feGaussianBlur',
	feimage: 'feImage',
	femerge: 'feMerge',
	femergenode: 'feMergeNode',
	femorphology: 'feMorphology',
	feoffset: 'feOffset',
	fepointlight: 'fePointLight',
	fespecularlighting: 'feSpecularLighting',
	fespotlight: 'feSpotLight',
	fetile: 'feTile',
	feturbulence: 'feTurbulence',
	foreignobject: 'foreignObject',
	glyphref: 'glyphRef',
	lineargradient: 'linearGradient',
	radialgradient: 'radialGradient',
}
function Qn(e) {
	var t = ri[e.tagName] ? ri[e.tagName] : e.tagName
	return t === 'link' && e.attributes._cssText && (t = 'style'), t
}
function Jn(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
var si = /([^\\]):hover/,
	qn = new RegExp(si.source, 'g')
function ii(e, t) {
	var r
	if (
		!(
			!((r = window?.HIG_CONFIGURATION) === null || r === void 0) &&
			r.enableOnHoverClass
		)
	)
		return e
	var i = t?.stylesWithHoverClass.get(e)
	if (i) return i
	var n = jn(e, { silent: !0 })
	if (!n.stylesheet) return e
	var o = []
	if (
		(n.stylesheet.rules.forEach(function (l) {
			'selectors' in l &&
				(l.selectors || []).forEach(function (c) {
					si.test(c) && o.push(c)
				})
		}),
		o.length === 0)
	)
		return e
	var s = new RegExp(
			o
				.filter(function (l, c) {
					return o.indexOf(l) === c
				})
				.sort(function (l, c) {
					return c.length - l.length
				})
				.map(function (l) {
					return Jn(l)
				})
				.join('|'),
			'g',
		),
		a = e.replace(s, function (l) {
			var c = l.replace(qn, '$1.\\:hover')
			return ''.concat(l, ', ').concat(c)
		})
	return t?.stylesWithHoverClass.set(e, a), a
}
function ir() {
	var e = new Map()
	return { stylesWithHoverClass: e }
}
function $n(e, t) {
	var r = t.doc,
		i = t.hackCss,
		n = t.cache
	switch (e.type) {
		case P.Document:
			return r.implementation.createDocument(null, '', null)
		case P.DocumentType:
			return r.implementation.createDocumentType(
				e.name || 'html',
				e.publicId,
				e.systemId,
			)
		case P.Element: {
			var o = Qn(e),
				s
			e.isSVG
				? (s = r.createElementNS('http://www.w3.org/2000/svg', o))
				: (s = r.createElement(o))
			var a = {},
				l = function (f) {
					if (!Object.prototype.hasOwnProperty.call(e.attributes, f))
						return 'continue'
					var h = e.attributes[f]
					if (o === 'option' && f === 'selected' && h === !1)
						return 'continue'
					if ((h === !0 && (h = ''), f.startsWith('rr_')))
						return (a[f] = h), 'continue'
					var p = o === 'textarea' && f === 'value',
						v = o === 'style' && f === '_cssText'
					if (
						v &&
						i &&
						typeof h == 'string' &&
						((h = ii(h, n)), typeof h == 'string')
					) {
						for (
							var y =
									/url\("https:\/\/\S*(.eot|.woff2|.ttf|.woff)\S*"\)/gm,
								m = void 0,
								g = [],
								w =
									'https://replay-cors-proxy.highlightrun.workers.dev';
							(m = y.exec(h)) !== null;

						)
							m.index === y.lastIndex && y.lastIndex++,
								m.forEach(function (b, F) {
									if (F === 0) {
										var _ = b.slice(5, b.length - 2)
										g.push({
											originalUrl: _,
											proxyUrl: _.replace(
												_,
												''.concat(w, '?url=').concat(_),
											),
										})
									}
								})
						g.forEach(function (b) {
							h = h.replace(b.originalUrl, b.proxyUrl)
						})
					}
					if ((p || v) && typeof h == 'string') {
						for (
							var N = r.createTextNode(h),
								C = 0,
								S = Array.from(s.childNodes);
							C < S.length;
							C++
						) {
							var k = S[C]
							k.nodeType === s.TEXT_NODE && s.removeChild(k)
						}
						return s.appendChild(N), 'continue'
					}
					try {
						if (e.isSVG && f === 'xlink:href')
							s.setAttributeNS(
								'http://www.w3.org/1999/xlink',
								f,
								h.toString(),
							)
						else if (
							f === 'onload' ||
							f === 'onclick' ||
							f.substring(0, 7) === 'onmouse'
						)
							s.setAttribute('_' + f, h.toString())
						else {
							if (
								o === 'meta' &&
								e.attributes['http-equiv'] ===
									'Content-Security-Policy' &&
								f === 'content'
							)
								return (
									s.setAttribute('csp-content', h.toString()),
									'continue'
								)
							;(o === 'link' &&
								e.attributes.rel === 'preload' &&
								e.attributes.as === 'script') ||
								(o === 'link' &&
									e.attributes.rel === 'prefetch' &&
									typeof e.attributes.href == 'string' &&
									e.attributes.href.endsWith('.js')) ||
								(o === 'img' &&
								e.attributes.srcset &&
								e.attributes.rr_dataURL
									? s.setAttribute(
											'rrweb-original-srcset',
											e.attributes.srcset,
									  )
									: s.setAttribute(f, h.toString()))
						}
					} catch {}
				}
			for (var c in e.attributes) l(c)
			var u = function (f) {
				var h = a[f]
				if (o === 'canvas' && f === 'rr_dataURL') {
					var p = document.createElement('img')
					;(p.onload = function () {
						var y = s.getContext('2d')
						y && y.drawImage(p, 0, 0, p.width, p.height)
					}),
						(p.src = h.toString()),
						s.RRNodeType && (s.rr_dataURL = h.toString())
				} else if (o === 'img' && f === 'rr_dataURL') {
					var v = s
					v.currentSrc.startsWith('data:') ||
						(v.setAttribute('rrweb-original-src', e.attributes.src),
						(v.src = h.toString()))
				}
				if (f === 'rr_width') s.style.width = h.toString()
				else if (f === 'rr_height') s.style.height = h.toString()
				else if (f === 'rr_mediaCurrentTime' && typeof h == 'number')
					s.currentTime = h
				else if (f === 'rr_mediaState')
					switch (h) {
						case 'played':
							s.play().catch(function (y) {
								return console.warn('media playback error', y)
							})
							break
						case 'paused':
							s.pause()
							break
					}
			}
			for (var d in a) u(d)
			if (e.isShadowHost)
				if (!s.shadowRoot) s.attachShadow({ mode: 'open' })
				else
					for (; s.shadowRoot.firstChild; )
						s.shadowRoot.removeChild(s.shadowRoot.firstChild)
			return s
		}
		case P.Text:
			return r.createTextNode(
				e.isStyle && i ? ii(e.textContent, n) : e.textContent,
			)
		case P.CDATA:
			return r.createCDATASection(e.textContent)
		case P.Comment:
			return r.createComment(e.textContent)
		default:
			return null
	}
}
function ze(e, t) {
	var r = t.doc,
		i = t.mirror,
		n = t.skipChild,
		o = n === void 0 ? !1 : n,
		s = t.hackCss,
		a = s === void 0 ? !0 : s,
		l = t.afterAppend,
		c = t.cache,
		u = $n(e, { doc: r, hackCss: a, cache: c })
	if (!u) return null
	if (
		(e.rootId && i.getNode(e.rootId) !== r && i.replace(e.rootId, r),
		e.type === P.Document &&
			(r.close(),
			r.open(),
			e.compatMode === 'BackCompat' &&
				e.childNodes &&
				e.childNodes[0].type !== P.DocumentType &&
				(e.childNodes[0].type === P.Element &&
				'xmlns' in e.childNodes[0].attributes &&
				e.childNodes[0].attributes.xmlns ===
					'http://www.w3.org/1999/xhtml'
					? r.write(
							'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">',
					  )
					: r.write(
							'<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">',
					  )),
			(u = r)),
		i.add(u, e),
		(e.type === P.Document || e.type === P.Element) && !o)
	)
		for (var d = 0, f = e.childNodes; d < f.length; d++) {
			var h = f[d],
				p = ze(h, {
					doc: r,
					mirror: i,
					skipChild: !1,
					hackCss: a,
					afterAppend: l,
					cache: c,
				})
			if (!p) {
				console.warn('Failed to rebuild', h)
				continue
			}
			h.isShadow && ni(u) && u.shadowRoot
				? u.shadowRoot.appendChild(p)
				: u.appendChild(p),
				l && l(p, h.id)
		}
	return u
}
function eo(e, t) {
	function r(s) {
		t(s)
	}
	for (var i = 0, n = e.getIds(); i < n.length; i++) {
		var o = n[i]
		e.has(o) && r(e.getNode(o))
	}
}
function to(e, t) {
	var r = t.getMeta(e)
	if (r?.type === P.Element) {
		var i = e
		for (var n in r.attributes)
			if (
				!!(
					Object.prototype.hasOwnProperty.call(r.attributes, n) &&
					n.startsWith('rr_')
				)
			) {
				var o = r.attributes[n]
				n === 'rr_scrollLeft' && (i.scrollLeft = o),
					n === 'rr_scrollTop' && (i.scrollTop = o)
			}
	}
}
function ai(e, t) {
	var r = t.doc,
		i = t.onVisit,
		n = t.hackCss,
		o = n === void 0 ? !0 : n,
		s = t.afterAppend,
		a = t.cache,
		l = t.mirror,
		c = l === void 0 ? new qt() : l,
		u = ze(e, {
			doc: r,
			mirror: c,
			skipChild: !1,
			hackCss: o,
			afterAppend: s,
			cache: a,
		})
	return (
		eo(c, function (d) {
			i && i(d), to(d, c)
		}),
		u
	)
}
var ui = {}
Jr(ui, {
	StyleSheetMirror: () => Ve,
	_mirror: () => vt,
	getBaseDimension: () => St,
	getNestedRule: () => Ue,
	getPositionsAndIndex: () => bt,
	getRootShadowHost: () => li,
	getWindowHeight: () => et,
	getWindowScroll: () => $e,
	getWindowWidth: () => tt,
	hasShadowRoot: () => me,
	hookSetter: () => Re,
	inDom: () => ot,
	isAncestorRemoved: () => yt,
	isBlocked: () => $,
	isCanvasNode: () => nr,
	isIgnored: () => rt,
	isSerialized: () => or,
	isSerializedIframe: () => we,
	isSerializedStylesheet: () => nt,
	isTouchEvent: () => It,
	iterateResolveTree: () => Ct,
	on: () => oe,
	patch: () => ue,
	polyfill: () => it,
	queueToResolveTrees: () => sr,
	shadowHostInDom: () => ci,
	throttle: () => Ge,
	uniqueTextMutations: () => ar,
})
function oe(e, t, r = document) {
	let i = { capture: !0 }
	return r.addEventListener(e, t, i), () => r.removeEventListener(e, t, i)
}
var Ke = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`,
	vt = {
		map: {},
		getId() {
			return console.error(Ke), -1
		},
		getNode() {
			return console.error(Ke), null
		},
		removeNodeFromMap() {
			console.error(Ke)
		},
		has() {
			return console.error(Ke), !1
		},
		reset() {
			console.error(Ke)
		},
	}
typeof window < 'u' &&
	window.Proxy &&
	window.Reflect &&
	(vt = new Proxy(vt, {
		get(e, t, r) {
			return t === 'map' && console.error(Ke), Reflect.get(e, t, r)
		},
	}))
function Ge(e, t, r = {}) {
	let i = null,
		n = 0
	return function (...o) {
		let s = Date.now()
		!n && r.leading === !1 && (n = s)
		let a = t - (s - n),
			l = this
		a <= 0 || a > t
			? (i && (clearTimeout(i), (i = null)), (n = s), e.apply(l, o))
			: !i &&
			  r.trailing !== !1 &&
			  (i = setTimeout(() => {
					;(n = r.leading === !1 ? 0 : Date.now()),
						(i = null),
						e.apply(l, o)
			  }, a))
	}
}
function Re(e, t, r, i, n = window) {
	let o = n.Object.getOwnPropertyDescriptor(e, t)
	return (
		n.Object.defineProperty(
			e,
			t,
			i
				? r
				: {
						set(s) {
							setTimeout(() => {
								r.set.call(this, s)
							}, 0),
								o && o.set && o.set.call(this, s)
						},
				  },
		),
		() => Re(e, t, o || {}, !0)
	)
}
function ue(e, t, r) {
	try {
		if (!(t in e)) return () => {}
		let i = e[t],
			n = r(i)
		return (
			typeof n == 'function' &&
				((n.prototype = n.prototype || {}),
				Object.defineProperties(n, {
					__rrweb_original__: { enumerable: !1, value: i },
				})),
			(e[t] = n),
			() => {
				e[t] = i
			}
		)
	} catch {
		return () => {}
	}
}
function $e(e) {
	var t, r, i, n, o, s
	let a = e.document
	return {
		left: a.scrollingElement
			? a.scrollingElement.scrollLeft
			: e.pageXOffset !== void 0
			? e.pageXOffset
			: a?.documentElement.scrollLeft ||
			  ((r =
					(t = a?.body) === null || t === void 0
						? void 0
						: t.parentElement) === null || r === void 0
					? void 0
					: r.scrollLeft) ||
			  ((i = a?.body) === null || i === void 0
					? void 0
					: i.scrollLeft) ||
			  0,
		top: a.scrollingElement
			? a.scrollingElement.scrollTop
			: e.pageYOffset !== void 0
			? e.pageYOffset
			: a?.documentElement.scrollTop ||
			  ((o =
					(n = a?.body) === null || n === void 0
						? void 0
						: n.parentElement) === null || o === void 0
					? void 0
					: o.scrollTop) ||
			  ((s = a?.body) === null || s === void 0 ? void 0 : s.scrollTop) ||
			  0,
	}
}
function et() {
	return (
		window.innerHeight ||
		(document.documentElement && document.documentElement.clientHeight) ||
		(document.body && document.body.clientHeight)
	)
}
function tt() {
	return (
		window.innerWidth ||
		(document.documentElement && document.documentElement.clientWidth) ||
		(document.body && document.body.clientWidth)
	)
}
var nr = (e) => {
	try {
		if (e instanceof HTMLElement) return e.tagName === 'CANVAS'
	} catch {
		return !1
	}
	return !1
}
function $(e, t, r, i) {
	if (!e) return !1
	let n = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement
	if (!n) return !1
	if (typeof t == 'string') {
		if (n.classList.contains(t) || (i && n.closest('.' + t) !== null))
			return !0
	} else if (Qe(n, t, i)) return !0
	return !!(r && (n.matches(r) || (i && n.closest(r) !== null)))
}
function or(e, t) {
	return t.getId(e) !== -1
}
function rt(e, t) {
	return t.getId(e) === Pe
}
function yt(e, t) {
	if (We(e)) return !1
	let r = t.getId(e)
	return t.has(r)
		? e.parentNode && e.parentNode.nodeType === e.DOCUMENT_NODE
			? !1
			: e.parentNode
			? yt(e.parentNode, t)
			: !0
		: !0
}
function It(e) {
	return Boolean(e.changedTouches)
}
function it(e = window) {
	'NodeList' in e &&
		!e.NodeList.prototype.forEach &&
		(e.NodeList.prototype.forEach = Array.prototype.forEach),
		'DOMTokenList' in e &&
			!e.DOMTokenList.prototype.forEach &&
			(e.DOMTokenList.prototype.forEach = Array.prototype.forEach),
		Node.prototype.contains ||
			(Node.prototype.contains = (...t) => {
				let r = t[0]
				if (!(0 in t)) throw new TypeError('1 argument is required')
				do if (this === r) return !0
				while ((r = r && r.parentNode))
				return !1
			})
}
function sr(e) {
	let t = {},
		r = (n, o) => {
			let s = { value: n, parent: o, children: [] }
			return (t[n.node.id] = s), s
		},
		i = []
	for (let n of e) {
		let { nextId: o, parentId: s } = n
		if (o && o in t) {
			let a = t[o]
			if (a.parent) {
				let l = a.parent.children.indexOf(a)
				a.parent.children.splice(l, 0, r(n, a.parent))
			} else {
				let l = i.indexOf(a)
				i.splice(l, 0, r(n, null))
			}
			continue
		}
		if (s in t) {
			let a = t[s]
			a.children.push(r(n, a))
			continue
		}
		i.push(r(n, null))
	}
	return i
}
function Ct(e, t) {
	t(e.value)
	for (let r = e.children.length - 1; r >= 0; r--) Ct(e.children[r], t)
}
function we(e, t) {
	return Boolean(e.nodeName === 'IFRAME' && t.getMeta(e))
}
function nt(e, t) {
	return Boolean(
		e.nodeName === 'LINK' &&
			e.nodeType === e.ELEMENT_NODE &&
			e.getAttribute &&
			e.getAttribute('rel') === 'stylesheet' &&
			t.getMeta(e),
	)
}
function St(e, t) {
	var r, i
	let n =
		(i =
			(r = e.ownerDocument) === null || r === void 0
				? void 0
				: r.defaultView) === null || i === void 0
			? void 0
			: i.frameElement
	if (!n || n === t) return { x: 0, y: 0, relativeScale: 1, absoluteScale: 1 }
	let o = n.getBoundingClientRect(),
		s = St(n, t),
		a = o.height / n.clientHeight
	return {
		x: o.x * s.relativeScale + s.x,
		y: o.y * s.relativeScale + s.y,
		relativeScale: a,
		absoluteScale: s.absoluteScale * a,
	}
}
function me(e) {
	return Boolean(e?.shadowRoot)
}
function Ue(e, t) {
	let r = e[t[0]]
	return t.length === 1 ? r : Ue(r.cssRules[t[1]].cssRules, t.slice(2))
}
function bt(e) {
	let t = [...e],
		r = t.pop()
	return { positions: t, index: r }
}
function ar(e) {
	let t = new Set(),
		r = []
	for (let i = e.length; i--; ) {
		let n = e[i]
		t.has(n.id) || (r.push(n), t.add(n.id))
	}
	return r
}
var Ve = class {
	constructor() {
		;(this.id = 1),
			(this.styleIDMap = new WeakMap()),
			(this.idStyleMap = new Map())
	}
	getId(t) {
		var r
		return (r = this.styleIDMap.get(t)) !== null && r !== void 0 ? r : -1
	}
	has(t) {
		return this.styleIDMap.has(t)
	}
	add(t, r) {
		if (this.has(t)) return this.getId(t)
		let i
		return (
			r === void 0 ? (i = this.id++) : (i = r),
			this.styleIDMap.set(t, i),
			this.idStyleMap.set(i, t),
			i
		)
	}
	getStyle(t) {
		return this.idStyleMap.get(t) || null
	}
	reset() {
		;(this.styleIDMap = new WeakMap()),
			(this.idStyleMap = new Map()),
			(this.id = 1)
	}
	generateId() {
		return this.id++
	}
}
function li(e) {
	var t, r
	let n = e.getRootNode().host
	for (
		;
		((r =
			(t = n?.getRootNode) === null || t === void 0
				? void 0
				: t.call(n)) === null || r === void 0
			? void 0
			: r.nodeType) === Node.DOCUMENT_FRAGMENT_NODE &&
		n.getRootNode().host;

	)
		n = n.getRootNode().host
	return n
}
function ci(e) {
	let t = e.ownerDocument
	if (!t) return !1
	let r = li(e)
	return Boolean(r && t.contains(r))
}
function ot(e) {
	let t = e.ownerDocument
	return t ? t.contains(e) || ci(e) : !1
}
var T = ((e) => (
		(e[(e.DomContentLoaded = 0)] = 'DomContentLoaded'),
		(e[(e.Load = 1)] = 'Load'),
		(e[(e.FullSnapshot = 2)] = 'FullSnapshot'),
		(e[(e.IncrementalSnapshot = 3)] = 'IncrementalSnapshot'),
		(e[(e.Meta = 4)] = 'Meta'),
		(e[(e.Custom = 5)] = 'Custom'),
		(e[(e.Plugin = 6)] = 'Plugin'),
		e
	))(T || {}),
	E = ((e) => (
		(e[(e.Mutation = 0)] = 'Mutation'),
		(e[(e.MouseMove = 1)] = 'MouseMove'),
		(e[(e.MouseInteraction = 2)] = 'MouseInteraction'),
		(e[(e.Scroll = 3)] = 'Scroll'),
		(e[(e.ViewportResize = 4)] = 'ViewportResize'),
		(e[(e.Input = 5)] = 'Input'),
		(e[(e.TouchMove = 6)] = 'TouchMove'),
		(e[(e.MediaInteraction = 7)] = 'MediaInteraction'),
		(e[(e.StyleSheetRule = 8)] = 'StyleSheetRule'),
		(e[(e.CanvasMutation = 9)] = 'CanvasMutation'),
		(e[(e.Font = 10)] = 'Font'),
		(e[(e.Log = 11)] = 'Log'),
		(e[(e.Drag = 12)] = 'Drag'),
		(e[(e.StyleDeclaration = 13)] = 'StyleDeclaration'),
		(e[(e.Selection = 14)] = 'Selection'),
		(e[(e.AdoptedStyleSheet = 15)] = 'AdoptedStyleSheet'),
		e
	))(E || {}),
	ie = ((e) => (
		(e[(e.MouseUp = 0)] = 'MouseUp'),
		(e[(e.MouseDown = 1)] = 'MouseDown'),
		(e[(e.Click = 2)] = 'Click'),
		(e[(e.ContextMenu = 3)] = 'ContextMenu'),
		(e[(e.DblClick = 4)] = 'DblClick'),
		(e[(e.Focus = 5)] = 'Focus'),
		(e[(e.Blur = 6)] = 'Blur'),
		(e[(e.TouchStart = 7)] = 'TouchStart'),
		(e[(e.TouchMove_Departed = 8)] = 'TouchMove_Departed'),
		(e[(e.TouchEnd = 9)] = 'TouchEnd'),
		(e[(e.TouchCancel = 10)] = 'TouchCancel'),
		e
	))(ie || {}),
	de = ((e) => (
		(e[(e['2D'] = 0)] = '2D'),
		(e[(e.WebGL = 1)] = 'WebGL'),
		(e[(e.WebGL2 = 2)] = 'WebGL2'),
		e
	))(de || {}),
	G = ((e) => (
		(e.Start = 'start'),
		(e.Pause = 'pause'),
		(e.Resume = 'resume'),
		(e.Resize = 'resize'),
		(e.Finish = 'finish'),
		(e.FullsnapshotRebuilded = 'fullsnapshot-rebuilded'),
		(e.LoadStylesheetStart = 'load-stylesheet-start'),
		(e.LoadStylesheetEnd = 'load-stylesheet-end'),
		(e.SkipStart = 'skip-start'),
		(e.SkipEnd = 'skip-end'),
		(e.MouseInteraction = 'mouse-interaction'),
		(e.EventCast = 'event-cast'),
		(e.CustomEvent = 'custom-event'),
		(e.Flush = 'flush'),
		(e.StateChange = 'state-change'),
		(e.PlayBack = 'play-back'),
		(e.Destroy = 'destroy'),
		e
	))(G || {})
function di(e) {
	return '__ln' in e
}
var lr = class {
		constructor() {
			;(this.length = 0), (this.head = null)
		}
		get(t) {
			if (t >= this.length)
				throw new Error('Position outside of list range')
			let r = this.head
			for (let i = 0; i < t; i++) r = r?.next || null
			return r
		}
		addNode(t) {
			let r = { value: t, previous: null, next: null }
			if (((t.__ln = r), t.previousSibling && di(t.previousSibling))) {
				let i = t.previousSibling.__ln.next
				;(r.next = i),
					(r.previous = t.previousSibling.__ln),
					(t.previousSibling.__ln.next = r),
					i && (i.previous = r)
			} else if (
				t.nextSibling &&
				di(t.nextSibling) &&
				t.nextSibling.__ln.previous
			) {
				let i = t.nextSibling.__ln.previous
				;(r.previous = i),
					(r.next = t.nextSibling.__ln),
					(t.nextSibling.__ln.previous = r),
					i && (i.next = r)
			} else
				this.head && (this.head.previous = r),
					(r.next = this.head),
					(this.head = r)
			this.length++
		}
		removeNode(t) {
			let r = t.__ln
			!this.head ||
				(r.previous
					? ((r.previous.next = r.next),
					  r.next && (r.next.previous = r.previous))
					: ((this.head = r.next),
					  this.head && (this.head.previous = null)),
				t.__ln && delete t.__ln,
				this.length--)
		}
	},
	fi = (e, t) => `${e}@${t}`,
	At = class {
		constructor() {
			;(this.frozen = !1),
				(this.locked = !1),
				(this.texts = []),
				(this.attributes = []),
				(this.removes = []),
				(this.mapRemoves = []),
				(this.movedMap = {}),
				(this.addedSet = new Set()),
				(this.movedSet = new Set()),
				(this.droppedSet = new Set()),
				(this.processMutations = (t) => {
					t.forEach(this.processMutation), this.emit()
				}),
				(this.emit = () => {
					if (this.frozen || this.locked) return
					let t = [],
						r = new lr(),
						i = (a) => {
							let l = a,
								c = Pe
							for (; c === Pe; )
								(l = l && l.nextSibling),
									(c = l && this.mirror.getId(l))
							return c
						},
						n = (a) => {
							var l, c
							let u = null
							if (
								(((c =
									(l = a.getRootNode) === null || l === void 0
										? void 0
										: l.call(a)) === null || c === void 0
									? void 0
									: c.nodeType) ===
									Node.DOCUMENT_FRAGMENT_NODE &&
									a.getRootNode().host &&
									(u = a.getRootNode().host),
								!a.parentNode || !ot(a))
							)
								return
							let d = We(a.parentNode)
									? this.mirror.getId(u)
									: this.mirror.getId(a.parentNode),
								f = i(a)
							if (d === -1 || f === -1) return r.addNode(a)
							let h = _e(a, {
								doc: this.doc,
								mirror: this.mirror,
								blockClass: this.blockClass,
								blockSelector: this.blockSelector,
								maskTextClass: this.maskTextClass,
								maskTextSelector: this.maskTextSelector,
								skipChild: !0,
								newlyAddedElement: !0,
								inlineStylesheet: this.inlineStylesheet,
								maskInputOptions: this.maskInputOptions,
								maskTextFn: this.maskTextFn,
								maskInputFn: this.maskInputFn,
								slimDOMOptions: this.slimDOMOptions,
								dataURLOptions: this.dataURLOptions,
								recordCanvas: this.recordCanvas,
								inlineImages: this.inlineImages,
								enableStrictPrivacy: this.enableStrictPrivacy,
								onSerialize: (p) => {
									we(p, this.mirror) &&
										this.iframeManager.addIframe(p),
										nt(p, this.mirror) &&
											this.stylesheetManager.trackLinkElement(
												p,
											),
										me(a) &&
											this.shadowDomManager.addShadowRoot(
												a.shadowRoot,
												this.doc,
											)
								},
								onIframeLoad: (p, v) => {
									this.iframeManager.attachIframe(p, v),
										this.shadowDomManager.observeAttachShadow(
											p,
										)
								},
								onStylesheetLoad: (p, v) => {
									this.stylesheetManager.attachLinkElement(
										p,
										v,
									)
								},
							})
							h && t.push({ parentId: d, nextId: f, node: h })
						}
					for (; this.mapRemoves.length; )
						this.mirror.removeNodeFromMap(this.mapRemoves.shift())
					for (let a of Array.from(this.movedSet.values()))
						(hi(this.removes, a, this.mirror) &&
							!this.movedSet.has(a.parentNode)) ||
							n(a)
					for (let a of Array.from(this.addedSet.values()))
						(!pi(this.droppedSet, a) &&
							!hi(this.removes, a, this.mirror)) ||
						pi(this.movedSet, a)
							? n(a)
							: this.droppedSet.add(a)
					let o = null
					for (; r.length; ) {
						let a = null
						if (o) {
							let l = this.mirror.getId(o.value.parentNode),
								c = i(o.value)
							l !== -1 && c !== -1 && (a = o)
						}
						if (!a)
							for (let l = r.length - 1; l >= 0; l--) {
								let c = r.get(l)
								if (c) {
									let u = this.mirror.getId(
										c.value.parentNode,
									)
									if (i(c.value) === -1) continue
									if (u !== -1) {
										a = c
										break
									} else {
										let f = c.value
										if (
											f.parentNode &&
											f.parentNode.nodeType ===
												Node.DOCUMENT_FRAGMENT_NODE
										) {
											let h = f.parentNode.host
											if (this.mirror.getId(h) !== -1) {
												a = c
												break
											}
										}
									}
								}
							}
						if (!a) {
							for (; r.head; ) r.removeNode(r.head.value)
							break
						}
						;(o = a.previous), r.removeNode(a.value), n(a.value)
					}
					let s = {
						texts: this.texts
							.map((a) => {
								let l = a.value
								return (
									this.enableStrictPrivacy &&
										l &&
										(l = qe(l)),
									{ id: this.mirror.getId(a.node), value: l }
								)
							})
							.filter((a) => this.mirror.has(a.id)),
						attributes: this.attributes
							.map((a) => ({
								id: this.mirror.getId(a.node),
								attributes: a.attributes,
							}))
							.filter((a) => this.mirror.has(a.id)),
						removes: this.removes,
						adds: t,
					}
					;(!s.texts.length &&
						!s.attributes.length &&
						!s.removes.length &&
						!s.adds.length) ||
						((this.texts = []),
						(this.attributes = []),
						(this.removes = []),
						(this.addedSet = new Set()),
						(this.movedSet = new Set()),
						(this.droppedSet = new Set()),
						(this.movedMap = {}),
						this.mutationCb(s))
				}),
				(this.processMutation = (t) => {
					if (!rt(t.target, this.mirror))
						switch (t.type) {
							case 'characterData': {
								let r = t.target.textContent
								!$(
									t.target,
									this.blockClass,
									this.blockSelector,
									!1,
								) &&
									r !== t.oldValue &&
									this.texts.push({
										value:
											rr(
												t.target,
												this.maskTextClass,
												this.maskTextSelector,
											) && r
												? this.maskTextFn
													? this.maskTextFn(r)
													: r.replace(/[\S]/g, '*')
												: r,
										node: t.target,
									})
								break
							}
							case 'attributes': {
								let r = t.target,
									i = t.target.getAttribute(t.attributeName)
								if (
									(t.attributeName === 'value' &&
										(i = Je({
											maskInputOptions:
												this.maskInputOptions,
											tagName: t.target.tagName,
											type: t.target.getAttribute('type'),
											value: i,
											maskInputFn: this.maskInputFn,
										})),
									$(
										t.target,
										this.blockClass,
										this.blockSelector,
										!1,
									) || i === t.oldValue)
								)
									return
								let n = this.attributes.find(
									(o) => o.node === t.target,
								)
								if (
									r.tagName === 'IFRAME' &&
									t.attributeName === 'src' &&
									!this.keepIframeSrcFn(i)
								)
									if (!r.contentDocument)
										t.attributeName = 'rr_src'
									else return
								if (
									(n ||
										((n = {
											node: t.target,
											attributes: {},
										}),
										this.attributes.push(n)),
									t.attributeName === 'style')
								) {
									let o = this.doc.createElement('span')
									t.oldValue &&
										o.setAttribute('style', t.oldValue),
										(n.attributes.style === void 0 ||
											n.attributes.style === null) &&
											(n.attributes.style = {})
									let s = n.attributes.style
									for (let a of Array.from(r.style)) {
										let l = r.style.getPropertyValue(a),
											c = r.style.getPropertyPriority(a)
										;(l !== o.style.getPropertyValue(a) ||
											c !==
												o.style.getPropertyPriority(
													a,
												)) &&
											(c === ''
												? (s[a] = l)
												: (s[a] = [l, c]))
									}
									for (let a of Array.from(o.style))
										r.style.getPropertyValue(a) === '' &&
											(s[a] = !1)
								} else {
									if (t.target.tagName === 'INPUT') {
										let s = t.target
										if (s.type === 'password') {
											n.attributes.value = '*'.repeat(
												s.value.length,
											)
											break
										}
									}
									n.attributes[t.attributeName] = tr(
										this.doc,
										r.tagName,
										t.attributeName,
										i,
									)
								}
								break
							}
							case 'childList': {
								if (
									$(
										t.target,
										this.blockClass,
										this.blockSelector,
										!0,
									)
								)
									return
								t.addedNodes.forEach((r) =>
									this.genAdds(r, t.target),
								),
									t.removedNodes.forEach((r) => {
										let i = this.mirror.getId(r),
											n = We(t.target)
												? this.mirror.getId(
														t.target.host,
												  )
												: this.mirror.getId(t.target)
										$(
											t.target,
											this.blockClass,
											this.blockSelector,
											!1,
										) ||
											rt(r, this.mirror) ||
											!or(r, this.mirror) ||
											(this.addedSet.has(r)
												? (cr(this.addedSet, r),
												  this.droppedSet.add(r))
												: (this.addedSet.has(
														t.target,
												  ) &&
														i === -1) ||
												  yt(t.target, this.mirror) ||
												  (this.movedSet.has(r) &&
												  this.movedMap[fi(i, n)]
														? cr(this.movedSet, r)
														: this.removes.push({
																parentId: n,
																id: i,
																isShadow:
																	We(
																		t.target,
																	) &&
																	Be(t.target)
																		? !0
																		: void 0,
														  })),
											this.mapRemoves.push(r))
									})
								break
							}
						}
				}),
				(this.genAdds = (t, r) => {
					if (!this.processedNodeManager.inOtherBuffer(t, this)) {
						if (this.mirror.hasNode(t)) {
							if (rt(t, this.mirror)) return
							this.movedSet.add(t)
							let i = null
							r &&
								this.mirror.hasNode(r) &&
								(i = this.mirror.getId(r)),
								i &&
									i !== -1 &&
									(this.movedMap[
										fi(this.mirror.getId(t), i)
									] = !0)
						} else this.addedSet.add(t), this.droppedSet.delete(t)
						$(t, this.blockClass, this.blockSelector, !1) ||
							(t.childNodes.forEach((i) => this.genAdds(i)),
							me(t) &&
								t.shadowRoot.childNodes.forEach((i) => {
									this.processedNodeManager.add(i, this),
										this.genAdds(i, t)
								}))
					}
				})
		}
		init(t) {
			;[
				'mutationCb',
				'blockClass',
				'blockSelector',
				'maskTextClass',
				'maskTextSelector',
				'inlineStylesheet',
				'maskInputOptions',
				'maskTextFn',
				'maskInputFn',
				'keepIframeSrcFn',
				'recordCanvas',
				'inlineImages',
				'enableStrictPrivacy',
				'slimDOMOptions',
				'dataURLOptions',
				'doc',
				'mirror',
				'iframeManager',
				'stylesheetManager',
				'shadowDomManager',
				'canvasManager',
				'processedNodeManager',
			].forEach((r) => {
				this[r] = t[r]
			})
		}
		freeze() {
			;(this.frozen = !0), this.canvasManager.freeze()
		}
		unfreeze() {
			;(this.frozen = !1), this.canvasManager.unfreeze(), this.emit()
		}
		isFrozen() {
			return this.frozen
		}
		lock() {
			;(this.locked = !0), this.canvasManager.lock()
		}
		unlock() {
			;(this.locked = !1), this.canvasManager.unlock(), this.emit()
		}
		reset() {
			this.shadowDomManager.reset(), this.canvasManager.reset()
		}
	}
function cr(e, t) {
	e.delete(t), t.childNodes.forEach((r) => cr(e, r))
}
function hi(e, t, r) {
	return e.length === 0 ? !1 : mi(e, t, r)
}
function mi(e, t, r) {
	let { parentNode: i } = t
	if (!i) return !1
	let n = r.getId(i)
	return e.some((o) => o.id === n) ? !0 : mi(e, i, r)
}
function pi(e, t) {
	return e.size === 0 ? !1 : gi(e, t)
}
function gi(e, t) {
	let { parentNode: r } = t
	return r ? (e.has(r) ? !0 : gi(e, r)) : !1
}
var Nt = class {
	constructor() {
		;(this.nodeMap = new WeakMap()), this.periodicallyClear()
	}
	periodicallyClear() {
		requestAnimationFrame(() => {
			this.clear(), this.periodicallyClear()
		})
	}
	inOtherBuffer(t, r) {
		let i = this.nodeMap.get(t)
		return i && Array.from(i).some((n) => n !== r)
	}
	add(t, r) {
		this.nodeMap.set(t, (this.nodeMap.get(t) || new Set()).add(r))
	}
	clear() {
		this.nodeMap = new WeakMap()
	}
}
var De = [],
	ur = new Nt(),
	Ii = typeof CSSGroupingRule < 'u',
	Ci = typeof CSSMediaRule < 'u',
	Si = typeof CSSSupportsRule < 'u',
	bi = typeof CSSConditionRule < 'u'
function st(e) {
	try {
		if ('composedPath' in e) {
			let t = e.composedPath()
			if (t.length) return t[0]
		} else if ('path' in e && e.path.length) return e.path[0]
		return e.target
	} catch {
		return e.target
	}
}
function dr(e, t) {
	var r, i
	let n = new At()
	De.push(n), n.init(e)
	let o = window.MutationObserver || window.__rrMutationObserver,
		s =
			(i =
				(r = window?.Zone) === null || r === void 0
					? void 0
					: r.__symbol__) === null || i === void 0
				? void 0
				: i.call(r, 'MutationObserver')
	s && window[s] && (o = window[s])
	let a = new o(n.processMutations.bind(n))
	return (
		a.observe(t, {
			attributes: !0,
			attributeOldValue: !0,
			characterData: !0,
			characterDataOldValue: !0,
			childList: !0,
			subtree: !0,
		}),
		a
	)
}
function ro({ mousemoveCb: e, sampling: t, doc: r, mirror: i }) {
	if (t.mousemove === !1) return () => {}
	let n = typeof t.mousemove == 'number' ? t.mousemove : 50,
		o = typeof t.mousemoveCallback == 'number' ? t.mousemoveCallback : 500,
		s = [],
		a,
		l = Ge((d) => {
			let f = Date.now() - a
			e(
				s.map((h) => ((h.timeOffset -= f), h)),
				d,
			),
				(s = []),
				(a = null)
		}, o),
		c = Ge(
			(d) => {
				let f = st(d),
					{ clientX: h, clientY: p } = It(d) ? d.changedTouches[0] : d
				a || (a = Date.now()),
					s.push({
						x: h,
						y: p,
						id: i.getId(f),
						timeOffset: Date.now() - a,
					}),
					l(
						typeof DragEvent < 'u' && d instanceof DragEvent
							? E.Drag
							: d instanceof MouseEvent
							? E.MouseMove
							: E.TouchMove,
					)
			},
			n,
			{ trailing: !1 },
		),
		u = [oe('mousemove', c, r), oe('touchmove', c, r), oe('drag', c, r)]
	return () => {
		u.forEach((d) => d())
	}
}
function io({
	mouseInteractionCb: e,
	doc: t,
	mirror: r,
	blockClass: i,
	blockSelector: n,
	sampling: o,
}) {
	if (o.mouseInteraction === !1) return () => {}
	let s =
			o.mouseInteraction === !0 || o.mouseInteraction === void 0
				? {}
				: o.mouseInteraction,
		a = [],
		l = (c) => (u) => {
			let d = st(u)
			if ($(d, i, n, !0) || nr(d)) return
			let f = It(u) ? u.changedTouches[0] : u
			if (!f) return
			let h = r.getId(d),
				{ clientX: p, clientY: v } = f
			e({ type: ie[c], id: h, x: p, y: v })
		}
	return (
		Object.keys(ie)
			.filter(
				(c) =>
					Number.isNaN(Number(c)) &&
					!c.endsWith('_Departed') &&
					s[c] !== !1,
			)
			.forEach((c) => {
				let u = c.toLowerCase(),
					d = l(c)
				a.push(oe(u, d, t))
			}),
		() => {
			a.forEach((c) => c())
		}
	)
}
function fr({
	scrollCb: e,
	doc: t,
	mirror: r,
	blockClass: i,
	blockSelector: n,
	sampling: o,
}) {
	let s = Ge((a) => {
		let l = st(a)
		if (!l || $(l, i, n, !0)) return
		let c = r.getId(l)
		if (l === t && t.defaultView) {
			let u = $e(t.defaultView)
			e({ id: c, x: u.left, y: u.top })
		} else e({ id: c, x: l.scrollLeft, y: l.scrollTop })
	}, o.scroll || 100)
	return oe('scroll', s, t)
}
function no({ viewportResizeCb: e }) {
	let t = -1,
		r = -1,
		i = Ge(() => {
			let n = et(),
				o = tt()
			;(t !== n || r !== o) &&
				(e({ width: Number(o), height: Number(n) }), (t = n), (r = o))
		}, 200)
	return oe('resize', i, window)
}
function vi(e, t) {
	let r = Object.assign({}, e)
	return t || delete r.userTriggered, r
}
var oo = ['INPUT', 'TEXTAREA', 'SELECT'],
	yi = new WeakMap()
function so({
	inputCb: e,
	doc: t,
	mirror: r,
	blockClass: i,
	blockSelector: n,
	ignoreClass: o,
	maskInputOptions: s,
	maskInputFn: a,
	sampling: l,
	userTriggeredOnInput: c,
}) {
	function u(m) {
		let g = st(m),
			w = m.isTrusted
		if (
			(g && g.tagName === 'OPTION' && (g = g.parentElement),
			!g || !g.tagName || oo.indexOf(g.tagName) < 0 || $(g, i, n, !0))
		)
			return
		let N = g.type
		if (g.classList.contains(o)) return
		let C = g.value,
			S = !1
		N === 'radio' || N === 'checkbox'
			? (S = g.checked)
			: (s[g.tagName.toLowerCase()] || s[N]) &&
			  (C = Je({
					maskInputOptions: s,
					tagName: g.tagName,
					type: N,
					value: C,
					maskInputFn: a,
			  })),
			d(g, vi({ text: C, isChecked: S, userTriggered: w }, c))
		let k = g.name
		N === 'radio' &&
			k &&
			S &&
			t
				.querySelectorAll(`input[type="radio"][name="${k}"]`)
				.forEach((b) => {
					b !== g &&
						d(
							b,
							vi(
								{
									text: b.value,
									isChecked: !S,
									userTriggered: !1,
								},
								c,
							),
						)
				})
	}
	function d(m, g) {
		let w = yi.get(m)
		if (!w || w.text !== g.text || w.isChecked !== g.isChecked) {
			yi.set(m, g)
			let N = r.getId(m)
			e(Object.assign(Object.assign({}, g), { id: N }))
		}
	}
	let h = (l.input === 'last' ? ['change'] : ['input', 'change']).map((m) =>
			oe(m, u, t),
		),
		p = t.defaultView
	if (!p)
		return () => {
			h.forEach((m) => m())
		}
	let v = p.Object.getOwnPropertyDescriptor(
			p.HTMLInputElement.prototype,
			'value',
		),
		y = [
			[p.HTMLInputElement.prototype, 'value'],
			[p.HTMLInputElement.prototype, 'checked'],
			[p.HTMLSelectElement.prototype, 'value'],
			[p.HTMLTextAreaElement.prototype, 'value'],
			[p.HTMLSelectElement.prototype, 'selectedIndex'],
			[p.HTMLOptionElement.prototype, 'selected'],
		]
	return (
		v &&
			v.set &&
			h.push(
				...y.map((m) =>
					Re(
						m[0],
						m[1],
						{
							set() {
								u({ target: this })
							},
						},
						!1,
						p,
					),
				),
			),
		() => {
			h.forEach((m) => m())
		}
	)
}
function wt(e) {
	let t = []
	function r(i, n) {
		if (
			(Ii && i.parentRule instanceof CSSGroupingRule) ||
			(Ci && i.parentRule instanceof CSSMediaRule) ||
			(Si && i.parentRule instanceof CSSSupportsRule) ||
			(bi && i.parentRule instanceof CSSConditionRule)
		) {
			let s = Array.from(i.parentRule.cssRules).indexOf(i)
			n.unshift(s)
		} else if (i.parentStyleSheet) {
			let s = Array.from(i.parentStyleSheet.cssRules).indexOf(i)
			n.unshift(s)
		}
		return n
	}
	return r(e, t)
}
function ke(e, t, r) {
	let i, n
	return e
		? (e.ownerNode ? (i = t.getId(e.ownerNode)) : (n = r.getId(e)),
		  { styleId: n, id: i })
		: {}
}
function ao(
	{ styleSheetRuleCb: e, mirror: t, stylesheetManager: r },
	{ win: i },
) {
	let n = i.CSSStyleSheet.prototype.insertRule
	i.CSSStyleSheet.prototype.insertRule = function (u, d) {
		let { id: f, styleId: h } = ke(this, t, r.styleMirror)
		return (
			((f && f !== -1) || (h && h !== -1)) &&
				e({ id: f, styleId: h, adds: [{ rule: u, index: d }] }),
			n.apply(this, [u, d])
		)
	}
	let o = i.CSSStyleSheet.prototype.deleteRule
	i.CSSStyleSheet.prototype.deleteRule = function (u) {
		let { id: d, styleId: f } = ke(this, t, r.styleMirror)
		return (
			((d && d !== -1) || (f && f !== -1)) &&
				e({ id: d, styleId: f, removes: [{ index: u }] }),
			o.apply(this, [u])
		)
	}
	let s
	i.CSSStyleSheet.prototype.replace &&
		((s = i.CSSStyleSheet.prototype.replace),
		(i.CSSStyleSheet.prototype.replace = function (u) {
			let { id: d, styleId: f } = ke(this, t, r.styleMirror)
			return (
				((d && d !== -1) || (f && f !== -1)) &&
					e({ id: d, styleId: f, replace: u }),
				s.apply(this, [u])
			)
		}))
	let a
	i.CSSStyleSheet.prototype.replaceSync &&
		((a = i.CSSStyleSheet.prototype.replaceSync),
		(i.CSSStyleSheet.prototype.replaceSync = function (u) {
			let { id: d, styleId: f } = ke(this, t, r.styleMirror)
			return (
				((d && d !== -1) || (f && f !== -1)) &&
					e({ id: d, styleId: f, replaceSync: u }),
				a.apply(this, [u])
			)
		}))
	let l = {}
	Ii
		? (l.CSSGroupingRule = i.CSSGroupingRule)
		: (Ci && (l.CSSMediaRule = i.CSSMediaRule),
		  bi && (l.CSSConditionRule = i.CSSConditionRule),
		  Si && (l.CSSSupportsRule = i.CSSSupportsRule))
	let c = {}
	return (
		Object.entries(l).forEach(([u, d]) => {
			;(c[u] = {
				insertRule: d.prototype.insertRule,
				deleteRule: d.prototype.deleteRule,
			}),
				(d.prototype.insertRule = function (f, h) {
					let { id: p, styleId: v } = ke(
						this.parentStyleSheet,
						t,
						r.styleMirror,
					)
					return (
						((p && p !== -1) || (v && v !== -1)) &&
							e({
								id: p,
								styleId: v,
								adds: [
									{ rule: f, index: [...wt(this), h || 0] },
								],
							}),
						c[u].insertRule.apply(this, [f, h])
					)
				}),
				(d.prototype.deleteRule = function (f) {
					let { id: h, styleId: p } = ke(
						this.parentStyleSheet,
						t,
						r.styleMirror,
					)
					return (
						((h && h !== -1) || (p && p !== -1)) &&
							e({
								id: h,
								styleId: p,
								removes: [{ index: [...wt(this), f] }],
							}),
						c[u].deleteRule.apply(this, [f])
					)
				})
		}),
		() => {
			;(i.CSSStyleSheet.prototype.insertRule = n),
				(i.CSSStyleSheet.prototype.deleteRule = o),
				s && (i.CSSStyleSheet.prototype.replace = s),
				a && (i.CSSStyleSheet.prototype.replaceSync = a),
				Object.entries(l).forEach(([u, d]) => {
					;(d.prototype.insertRule = c[u].insertRule),
						(d.prototype.deleteRule = c[u].deleteRule)
				})
		}
	)
}
function hr({ mirror: e, stylesheetManager: t }, r) {
	var i, n, o
	let s = null
	r.nodeName === '#document' ? (s = e.getId(r)) : (s = e.getId(r.host))
	let a =
			r.nodeName === '#document'
				? (i = r.defaultView) === null || i === void 0
					? void 0
					: i.Document
				: (o =
						(n = r.ownerDocument) === null || n === void 0
							? void 0
							: n.defaultView) === null || o === void 0
				? void 0
				: o.ShadowRoot,
		l = Object.getOwnPropertyDescriptor(a?.prototype, 'adoptedStyleSheets')
	return s === null || s === -1 || !a || !l
		? () => {}
		: (Object.defineProperty(r, 'adoptedStyleSheets', {
				configurable: l.configurable,
				enumerable: l.enumerable,
				get() {
					var c
					return (c = l.get) === null || c === void 0
						? void 0
						: c.call(this)
				},
				set(c) {
					var u
					let d =
						(u = l.set) === null || u === void 0
							? void 0
							: u.call(this, c)
					if (s !== null && s !== -1)
						try {
							t.adoptStyleSheets(c, s)
						} catch {}
					return d
				},
		  }),
		  () => {
				Object.defineProperty(r, 'adoptedStyleSheets', {
					configurable: l.configurable,
					enumerable: l.enumerable,
					get: l.get,
					set: l.set,
				})
		  })
}
function lo(
	{
		styleDeclarationCb: e,
		mirror: t,
		ignoreCSSAttributes: r,
		stylesheetManager: i,
	},
	{ win: n },
) {
	let o = n.CSSStyleDeclaration.prototype.setProperty
	n.CSSStyleDeclaration.prototype.setProperty = function (a, l, c) {
		var u
		if (r.has(a)) return o.apply(this, [a, l, c])
		let { id: d, styleId: f } = ke(
			(u = this.parentRule) === null || u === void 0
				? void 0
				: u.parentStyleSheet,
			t,
			i.styleMirror,
		)
		return (
			((d && d !== -1) || (f && f !== -1)) &&
				e({
					id: d,
					styleId: f,
					set: { property: a, value: l, priority: c },
					index: wt(this.parentRule),
				}),
			o.apply(this, [a, l, c])
		)
	}
	let s = n.CSSStyleDeclaration.prototype.removeProperty
	return (
		(n.CSSStyleDeclaration.prototype.removeProperty = function (a) {
			var l
			if (r.has(a)) return s.apply(this, [a])
			let { id: c, styleId: u } = ke(
				(l = this.parentRule) === null || l === void 0
					? void 0
					: l.parentStyleSheet,
				t,
				i.styleMirror,
			)
			return (
				((c && c !== -1) || (u && u !== -1)) &&
					e({
						id: c,
						styleId: u,
						remove: { property: a },
						index: wt(this.parentRule),
					}),
				s.apply(this, [a])
			)
		}),
		() => {
			;(n.CSSStyleDeclaration.prototype.setProperty = o),
				(n.CSSStyleDeclaration.prototype.removeProperty = s)
		}
	)
}
function co({
	mediaInteractionCb: e,
	blockClass: t,
	blockSelector: r,
	mirror: i,
	sampling: n,
}) {
	let o = (a) =>
			Ge((l) => {
				let c = st(l)
				if (!c || $(c, t, r, !0)) return
				let { currentTime: u, volume: d, muted: f, playbackRate: h } = c
				e({
					type: a,
					id: i.getId(c),
					currentTime: u,
					volume: d,
					muted: f,
					playbackRate: h,
				})
			}, n.media || 500),
		s = [
			oe('play', o(0)),
			oe('pause', o(1)),
			oe('seeked', o(2)),
			oe('volumechange', o(3)),
			oe('ratechange', o(4)),
		]
	return () => {
		s.forEach((a) => a())
	}
}
function uo({ fontCb: e, doc: t }) {
	let r = t.defaultView
	if (!r) return () => {}
	let i = [],
		n = new WeakMap(),
		o = r.FontFace
	r.FontFace = function (l, c, u) {
		let d = new o(l, c, u)
		return (
			n.set(d, {
				family: l,
				buffer: typeof c != 'string',
				descriptors: u,
				fontSource:
					typeof c == 'string'
						? c
						: JSON.stringify(Array.from(new Uint8Array(c))),
			}),
			d
		)
	}
	let s = ue(t.fonts, 'add', function (a) {
		return function (l) {
			return (
				setTimeout(() => {
					let c = n.get(l)
					c && (e(c), n.delete(l))
				}, 0),
				a.apply(this, [l])
			)
		}
	})
	return (
		i.push(() => {
			r.FontFace = o
		}),
		i.push(s),
		() => {
			i.forEach((a) => a())
		}
	)
}
function fo(e) {
	let {
			doc: t,
			mirror: r,
			blockClass: i,
			blockSelector: n,
			selectionCb: o,
		} = e,
		s = !0,
		a = () => {
			let l = t.getSelection()
			if (!l || (s && l?.isCollapsed)) return
			s = l.isCollapsed || !1
			let c = [],
				u = l.rangeCount || 0
			for (let d = 0; d < u; d++) {
				let f = l.getRangeAt(d),
					{
						startContainer: h,
						startOffset: p,
						endContainer: v,
						endOffset: y,
					} = f
				$(h, i, n, !0) ||
					$(v, i, n, !0) ||
					c.push({
						start: r.getId(h),
						startOffset: p,
						end: r.getId(v),
						endOffset: y,
					})
			}
			o({ ranges: c })
		}
	return a(), oe('selectionchange', a)
}
function ho(e, t) {
	let {
		mutationCb: r,
		mousemoveCb: i,
		mouseInteractionCb: n,
		scrollCb: o,
		viewportResizeCb: s,
		inputCb: a,
		mediaInteractionCb: l,
		styleSheetRuleCb: c,
		styleDeclarationCb: u,
		canvasMutationCb: d,
		fontCb: f,
		selectionCb: h,
	} = e
	;(e.mutationCb = (...p) => {
		t.mutation && t.mutation(...p), r(...p)
	}),
		(e.mousemoveCb = (...p) => {
			t.mousemove && t.mousemove(...p), i(...p)
		}),
		(e.mouseInteractionCb = (...p) => {
			t.mouseInteraction && t.mouseInteraction(...p), n(...p)
		}),
		(e.scrollCb = (...p) => {
			t.scroll && t.scroll(...p), o(...p)
		}),
		(e.viewportResizeCb = (...p) => {
			t.viewportResize && t.viewportResize(...p), s(...p)
		}),
		(e.inputCb = (...p) => {
			t.input && t.input(...p), a(...p)
		}),
		(e.mediaInteractionCb = (...p) => {
			t.mediaInteaction && t.mediaInteaction(...p), l(...p)
		}),
		(e.styleSheetRuleCb = (...p) => {
			t.styleSheetRule && t.styleSheetRule(...p), c(...p)
		}),
		(e.styleDeclarationCb = (...p) => {
			t.styleDeclaration && t.styleDeclaration(...p), u(...p)
		}),
		(e.canvasMutationCb = (...p) => {
			t.canvasMutation && t.canvasMutation(...p), d(...p)
		}),
		(e.fontCb = (...p) => {
			t.font && t.font(...p), f(...p)
		}),
		(e.selectionCb = (...p) => {
			t.selection && t.selection(...p), h(...p)
		})
}
function Ai(e, t = {}) {
	let r = e.doc.defaultView
	if (!r) return () => {}
	ho(e, t)
	let i = dr(e, e.doc),
		n = ro(e),
		o = io(e),
		s = fr(e),
		a = no(e),
		l = so(e),
		c = co(e),
		u = ao(e, { win: r }),
		d = hr(e, e.doc),
		f = lo(e, { win: r }),
		h = e.collectFonts ? uo(e) : () => {},
		p = fo(e),
		v = []
	for (let y of e.plugins) v.push(y.observer(y.callback, r, y.options))
	return () => {
		De.forEach((y) => y.reset()),
			i.disconnect(),
			n(),
			o(),
			s(),
			a(),
			l(),
			c(),
			u(),
			d(),
			f(),
			h(),
			p(),
			v.forEach((y) => y())
	}
}
var at = class {
	constructor(t) {
		;(this.generateIdFn = t),
			(this.iframeIdToRemoteIdMap = new WeakMap()),
			(this.iframeRemoteIdToIdMap = new WeakMap())
	}
	getId(t, r, i, n) {
		let o = i || this.getIdToRemoteIdMap(t),
			s = n || this.getRemoteIdToIdMap(t),
			a = o.get(r)
		return a || ((a = this.generateIdFn()), o.set(r, a), s.set(a, r)), a
	}
	getIds(t, r) {
		let i = this.getIdToRemoteIdMap(t),
			n = this.getRemoteIdToIdMap(t)
		return r.map((o) => this.getId(t, o, i, n))
	}
	getRemoteId(t, r, i) {
		let n = i || this.getRemoteIdToIdMap(t)
		if (typeof r != 'number') return r
		let o = n.get(r)
		return o || -1
	}
	getRemoteIds(t, r) {
		let i = this.getRemoteIdToIdMap(t)
		return r.map((n) => this.getRemoteId(t, n, i))
	}
	reset(t) {
		if (!t) {
			;(this.iframeIdToRemoteIdMap = new WeakMap()),
				(this.iframeRemoteIdToIdMap = new WeakMap())
			return
		}
		this.iframeIdToRemoteIdMap.delete(t),
			this.iframeRemoteIdToIdMap.delete(t)
	}
	getIdToRemoteIdMap(t) {
		let r = this.iframeIdToRemoteIdMap.get(t)
		return r || ((r = new Map()), this.iframeIdToRemoteIdMap.set(t, r)), r
	}
	getRemoteIdToIdMap(t) {
		let r = this.iframeRemoteIdToIdMap.get(t)
		return r || ((r = new Map()), this.iframeRemoteIdToIdMap.set(t, r)), r
	}
}
var Et = class {
	constructor(t) {
		;(this.iframes = new WeakMap()),
			(this.crossOriginIframeMap = new WeakMap()),
			(this.crossOriginIframeMirror = new at($t)),
			(this.mutationCb = t.mutationCb),
			(this.wrappedEmit = t.wrappedEmit),
			(this.stylesheetManager = t.stylesheetManager),
			(this.recordCrossOriginIframes = t.recordCrossOriginIframes),
			(this.crossOriginIframeStyleMirror = new at(
				this.stylesheetManager.styleMirror.generateId.bind(
					this.stylesheetManager.styleMirror,
				),
			)),
			(this.mirror = t.mirror),
			this.recordCrossOriginIframes &&
				window.addEventListener(
					'message',
					this.handleMessage.bind(this),
				)
	}
	addIframe(t) {
		this.iframes.set(t, !0),
			t.contentWindow && this.crossOriginIframeMap.set(t.contentWindow, t)
	}
	addLoadListener(t) {
		this.loadListener = t
	}
	attachIframe(t, r) {
		var i
		this.mutationCb({
			adds: [{ parentId: this.mirror.getId(t), nextId: null, node: r }],
			removes: [],
			texts: [],
			attributes: [],
			isAttachIframe: !0,
		}),
			(i = this.loadListener) === null || i === void 0 || i.call(this, t),
			t.contentDocument &&
				t.contentDocument.adoptedStyleSheets &&
				t.contentDocument.adoptedStyleSheets.length > 0 &&
				this.stylesheetManager.adoptStyleSheets(
					t.contentDocument.adoptedStyleSheets,
					this.mirror.getId(t.contentDocument),
				)
	}
	handleMessage(t) {
		if (t.data.type === 'rrweb') {
			let r = t.source
			if (!r) return
			let i = this.crossOriginIframeMap.get(r)
			if (!i) return
			let n = this.transformCrossOriginEvent(i, t.data.event)
			n && this.wrappedEmit(n, t.data.isCheckout)
		}
	}
	transformCrossOriginEvent(t, r) {
		var i
		switch (r.type) {
			case T.FullSnapshot:
				return (
					this.crossOriginIframeMirror.reset(t),
					this.crossOriginIframeStyleMirror.reset(t),
					this.replaceIdOnNode(r.data.node, t),
					{
						timestamp: r.timestamp,
						type: T.IncrementalSnapshot,
						data: {
							source: E.Mutation,
							adds: [
								{
									parentId: this.mirror.getId(t),
									nextId: null,
									node: r.data.node,
								},
							],
							removes: [],
							texts: [],
							attributes: [],
							isAttachIframe: !0,
						},
					}
				)
			case T.Meta:
			case T.Load:
			case T.DomContentLoaded:
				return !1
			case T.Plugin:
				return r
			case T.Custom:
				return (
					this.replaceIds(r.data.payload, t, [
						'id',
						'parentId',
						'previousId',
						'nextId',
					]),
					r
				)
			case T.IncrementalSnapshot:
				switch (r.data.source) {
					case E.Mutation:
						return (
							r.data.adds.forEach((n) => {
								this.replaceIds(n, t, [
									'parentId',
									'nextId',
									'previousId',
								]),
									this.replaceIdOnNode(n.node, t)
							}),
							r.data.removes.forEach((n) => {
								this.replaceIds(n, t, ['parentId', 'id'])
							}),
							r.data.attributes.forEach((n) => {
								this.replaceIds(n, t, ['id'])
							}),
							r.data.texts.forEach((n) => {
								this.replaceIds(n, t, ['id'])
							}),
							r
						)
					case E.Drag:
					case E.TouchMove:
					case E.MouseMove:
						return (
							r.data.positions.forEach((n) => {
								this.replaceIds(n, t, ['id'])
							}),
							r
						)
					case E.ViewportResize:
						return !1
					case E.MediaInteraction:
					case E.MouseInteraction:
					case E.Scroll:
					case E.CanvasMutation:
					case E.Input:
						return this.replaceIds(r.data, t, ['id']), r
					case E.StyleSheetRule:
					case E.StyleDeclaration:
						return (
							this.replaceIds(r.data, t, ['id']),
							this.replaceStyleIds(r.data, t, ['styleId']),
							r
						)
					case E.Font:
						return r
					case E.Selection:
						return (
							r.data.ranges.forEach((n) => {
								this.replaceIds(n, t, ['start', 'end'])
							}),
							r
						)
					case E.AdoptedStyleSheet:
						return (
							this.replaceIds(r.data, t, ['id']),
							this.replaceStyleIds(r.data, t, ['styleIds']),
							(i = r.data.styles) === null ||
								i === void 0 ||
								i.forEach((n) => {
									this.replaceStyleIds(n, t, ['styleId'])
								}),
							r
						)
				}
		}
	}
	replace(t, r, i, n) {
		for (let o of n)
			(!Array.isArray(r[o]) && typeof r[o] != 'number') ||
				(Array.isArray(r[o])
					? (r[o] = t.getIds(i, r[o]))
					: (r[o] = t.getId(i, r[o])))
		return r
	}
	replaceIds(t, r, i) {
		return this.replace(this.crossOriginIframeMirror, t, r, i)
	}
	replaceStyleIds(t, r, i) {
		return this.replace(this.crossOriginIframeStyleMirror, t, r, i)
	}
	replaceIdOnNode(t, r) {
		this.replaceIds(t, r, ['id']),
			'childNodes' in t &&
				t.childNodes.forEach((i) => {
					this.replaceIdOnNode(i, r)
				})
	}
}
var Tt = class {
	constructor(t) {
		;(this.shadowDoms = new WeakSet()),
			(this.restorePatches = []),
			(this.mutationCb = t.mutationCb),
			(this.scrollCb = t.scrollCb),
			(this.bypassOptions = t.bypassOptions),
			(this.mirror = t.mirror)
		let r = this
		this.restorePatches.push(
			ue(Element.prototype, 'attachShadow', function (i) {
				return function (n) {
					let o = i.call(this, n)
					return (
						this.shadowRoot &&
							ot(this) &&
							r.addShadowRoot(
								this.shadowRoot,
								this.ownerDocument,
							),
						o
					)
				}
			}),
		)
	}
	addShadowRoot(t, r) {
		!Be(t) ||
			this.shadowDoms.has(t) ||
			(this.shadowDoms.add(t),
			dr(
				Object.assign(Object.assign({}, this.bypassOptions), {
					doc: r,
					mutationCb: this.mutationCb,
					mirror: this.mirror,
					shadowDomManager: this,
				}),
				t,
			),
			fr(
				Object.assign(Object.assign({}, this.bypassOptions), {
					scrollCb: this.scrollCb,
					doc: t,
					mirror: this.mirror,
				}),
			),
			setTimeout(() => {
				t.adoptedStyleSheets &&
					t.adoptedStyleSheets.length > 0 &&
					this.bypassOptions.stylesheetManager.adoptStyleSheets(
						t.adoptedStyleSheets,
						this.mirror.getId(t.host),
					),
					hr(
						{
							mirror: this.mirror,
							stylesheetManager:
								this.bypassOptions.stylesheetManager,
						},
						t,
					)
			}, 0))
	}
	observeAttachShadow(t) {
		if (t.contentWindow) {
			let r = this
			this.restorePatches.push(
				ue(
					t.contentWindow.HTMLElement.prototype,
					'attachShadow',
					function (i) {
						return function (n) {
							let o = i.call(this, n)
							return (
								this.shadowRoot &&
									r.addShadowRoot(
										this.shadowRoot,
										t.contentDocument,
									),
								o
							)
						}
					},
				),
			)
		}
	}
	clearCache() {
		this.shadowDoms = new WeakSet()
	}
	reset() {
		this.restorePatches.forEach((t) => t()), this.clearCache()
	}
}
function Ni(e, t) {
	var r = {}
	for (var i in e)
		Object.prototype.hasOwnProperty.call(e, i) &&
			t.indexOf(i) < 0 &&
			(r[i] = e[i])
	if (e != null && typeof Object.getOwnPropertySymbols == 'function')
		for (var n = 0, i = Object.getOwnPropertySymbols(e); n < i.length; n++)
			t.indexOf(i[n]) < 0 &&
				Object.prototype.propertyIsEnumerable.call(e, i[n]) &&
				(r[i[n]] = e[i[n]])
	return r
}
function fe(e, t, r, i) {
	function n(o) {
		return o instanceof r
			? o
			: new r(function (s) {
					s(o)
			  })
	}
	return new (r || (r = Promise))(function (o, s) {
		function a(u) {
			try {
				c(i.next(u))
			} catch (d) {
				s(d)
			}
		}
		function l(u) {
			try {
				c(i.throw(u))
			} catch (d) {
				s(d)
			}
		}
		function c(u) {
			u.done ? o(u.value) : n(u.value).then(a, l)
		}
		c((i = i.apply(e, t || [])).next())
	})
}
var Xe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	ct = typeof Uint8Array > 'u' ? [] : new Uint8Array(256)
for (lt = 0; lt < Xe.length; lt++) ct[Xe.charCodeAt(lt)] = lt
var lt,
	wi = function (e) {
		var t = new Uint8Array(e),
			r,
			i = t.length,
			n = ''
		for (r = 0; r < i; r += 3)
			(n += Xe[t[r] >> 2]),
				(n += Xe[((t[r] & 3) << 4) | (t[r + 1] >> 4)]),
				(n += Xe[((t[r + 1] & 15) << 2) | (t[r + 2] >> 6)]),
				(n += Xe[t[r + 2] & 63])
		return (
			i % 3 === 2
				? (n = n.substring(0, n.length - 1) + '=')
				: i % 3 === 1 && (n = n.substring(0, n.length - 2) + '=='),
			n
		)
	},
	Ei = function (e) {
		var t = e.length * 0.75,
			r = e.length,
			i,
			n = 0,
			o,
			s,
			a,
			l
		e[e.length - 1] === '=' && (t--, e[e.length - 2] === '=' && t--)
		var c = new ArrayBuffer(t),
			u = new Uint8Array(c)
		for (i = 0; i < r; i += 4)
			(o = ct[e.charCodeAt(i)]),
				(s = ct[e.charCodeAt(i + 1)]),
				(a = ct[e.charCodeAt(i + 2)]),
				(l = ct[e.charCodeAt(i + 3)]),
				(u[n++] = (o << 2) | (s >> 4)),
				(u[n++] = ((s & 15) << 4) | (a >> 2)),
				(u[n++] = ((a & 3) << 6) | (l & 63))
		return c
	}
var Ti = new Map()
function po(e, t) {
	let r = Ti.get(e)
	return (
		r || ((r = new Map()), Ti.set(e, r)), r.has(t) || r.set(t, []), r.get(t)
	)
}
var pr = (e, t, r) => {
	if (!e || !(Mi(e, t) || typeof e == 'object')) return
	let i = e.constructor.name,
		n = po(r, i),
		o = n.indexOf(e)
	return o === -1 && ((o = n.length), n.push(e)), o
}
function Mt(e, t, r) {
	if (e instanceof Array) return e.map((i) => Mt(i, t, r))
	if (e === null) return e
	if (
		e instanceof Float32Array ||
		e instanceof Float64Array ||
		e instanceof Int32Array ||
		e instanceof Uint32Array ||
		e instanceof Uint8Array ||
		e instanceof Uint16Array ||
		e instanceof Int16Array ||
		e instanceof Int8Array ||
		e instanceof Uint8ClampedArray
	)
		return { rr_type: e.constructor.name, args: [Object.values(e)] }
	if (e instanceof ArrayBuffer) {
		let i = e.constructor.name,
			n = wi(e)
		return { rr_type: i, base64: n }
	} else {
		if (e instanceof DataView)
			return {
				rr_type: e.constructor.name,
				args: [Mt(e.buffer, t, r), e.byteOffset, e.byteLength],
			}
		if (e instanceof HTMLImageElement) {
			let i = e.constructor.name,
				{ src: n } = e
			return { rr_type: i, src: n }
		} else if (e instanceof HTMLCanvasElement) {
			let i = 'HTMLImageElement',
				n = e.toDataURL()
			return { rr_type: i, src: n }
		} else {
			if (e instanceof ImageData)
				return {
					rr_type: e.constructor.name,
					args: [Mt(e.data, t, r), e.width, e.height],
				}
			if (Mi(e, t) || typeof e == 'object') {
				let i = e.constructor.name,
					n = pr(e, t, r)
				return { rr_type: i, index: n }
			}
		}
	}
	return e
}
var Rt = (e, t, r) => [...e].map((i) => Mt(i, t, r)),
	Mi = (e, t) => {
		let i = [
			'WebGLActiveInfo',
			'WebGLBuffer',
			'WebGLFramebuffer',
			'WebGLProgram',
			'WebGLRenderbuffer',
			'WebGLShader',
			'WebGLShaderPrecisionFormat',
			'WebGLTexture',
			'WebGLUniformLocation',
			'WebGLVertexArrayObject',
			'WebGLVertexArrayObjectOES',
		].filter((n) => typeof t[n] == 'function')
		return Boolean(i.find((n) => e instanceof t[n]))
	}
function Ri(e, t, r, i) {
	let n = [],
		o = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype)
	for (let s of o)
		try {
			if (typeof t.CanvasRenderingContext2D.prototype[s] != 'function')
				continue
			let a = ue(t.CanvasRenderingContext2D.prototype, s, function (l) {
				return function (...c) {
					return (
						$(this.canvas, r, i, !0) ||
							setTimeout(() => {
								let u = Rt([...c], t, this)
								e(this.canvas, {
									type: de['2D'],
									property: s,
									args: u,
								})
							}, 0),
						l.apply(this, c)
					)
				}
			})
			n.push(a)
		} catch {
			let l = Re(t.CanvasRenderingContext2D.prototype, s, {
				set(c) {
					e(this.canvas, {
						type: de['2D'],
						property: s,
						args: [c],
						setter: !0,
					})
				},
			})
			n.push(l)
		}
	return () => {
		n.forEach((s) => s())
	}
}
function mr(e, t, r) {
	let i = []
	try {
		let n = ue(e.HTMLCanvasElement.prototype, 'getContext', function (o) {
			return function (s, ...a) {
				return (
					$(this, t, r, !0) || this.__context || (this.__context = s),
					o.apply(this, [s, ...a])
				)
			}
		})
		i.push(n)
	} catch {
		console.error('failed to patch HTMLCanvasElement.prototype.getContext')
	}
	return () => {
		i.forEach((n) => n())
	}
}
function ki(e, t, r, i, n, o, s) {
	let a = [],
		l = Object.getOwnPropertyNames(e)
	for (let c of l)
		if (
			![
				'isContextLost',
				'canvas',
				'drawingBufferWidth',
				'drawingBufferHeight',
			].includes(c)
		)
			try {
				if (typeof e[c] != 'function') continue
				let u = ue(e, c, function (d) {
					return function (...f) {
						let h = d.apply(this, f)
						if ((pr(h, s, this), !$(this.canvas, i, n, !0))) {
							let p = Rt([...f], s, this),
								v = { type: t, property: c, args: p }
							r(this.canvas, v)
						}
						return h
					}
				})
				a.push(u)
			} catch {
				let d = Re(e, c, {
					set(f) {
						r(this.canvas, {
							type: t,
							property: c,
							args: [f],
							setter: !0,
						})
					},
				})
				a.push(d)
			}
	return a
}
function Di(e, t, r, i, n) {
	let o = []
	return (
		o.push(
			...ki(t.WebGLRenderingContext.prototype, de.WebGL, e, r, i, n, t),
		),
		typeof t.WebGL2RenderingContext < 'u' &&
			o.push(
				...ki(
					t.WebGL2RenderingContext.prototype,
					de.WebGL2,
					e,
					r,
					i,
					n,
					t,
				),
			),
		() => {
			o.forEach((s) => s())
		}
	)
}
var gr = null
try {
	;(xi =
		(typeof module < 'u' &&
			typeof module.require == 'function' &&
			module.require('worker_threads')) ||
		(typeof __non_webpack_require__ == 'function' &&
			__non_webpack_require__('worker_threads')) ||
		(typeof Kt == 'function' && Kt('worker_threads'))),
		(gr = xi.Worker)
} catch {}
var xi
function mo(e, t) {
	return Buffer.from(e, 'base64').toString(t ? 'utf16' : 'utf8')
}
function Oi(e, t, r) {
	var i = t === void 0 ? null : t,
		n = r === void 0 ? !1 : r,
		o = mo(e, n),
		s =
			o.indexOf(
				`
`,
				10,
			) + 1,
		a = o.substring(s) + (i ? '//# sourceMappingURL=' + i : '')
	return function (c) {
		return new gr(a, Object.assign({}, c, { eval: !0 }))
	}
}
function go(e, t) {
	var r = atob(e)
	if (t) {
		for (var i = new Uint8Array(r.length), n = 0, o = r.length; n < o; ++n)
			i[n] = r.charCodeAt(n)
		return String.fromCharCode.apply(null, new Uint16Array(i.buffer))
	}
	return r
}
function vo(e, t, r) {
	var i = t === void 0 ? null : t,
		n = r === void 0 ? !1 : r,
		o = go(e, n),
		s =
			o.indexOf(
				`
`,
				10,
			) + 1,
		a = o.substring(s) + (i ? '//# sourceMappingURL=' + i : ''),
		l = new Blob([a], { type: 'application/javascript' })
	return URL.createObjectURL(l)
}
function Li(e, t, r) {
	var i
	return function (o) {
		return (i = i || vo(e, t, r)), new Worker(i, o)
	}
}
var yo =
	Object.prototype.toString.call(typeof process < 'u' ? process : 0) ===
	'[object process]'
function Fi() {
	return yo
}
function _i(e, t, r) {
	return Fi() ? Oi(e, t, r) : Li(e, t, r)
}
var Bi = _i(
	'Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4NCg0KICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueQ0KICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC4NCg0KICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAiQVMgSVMiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIDQogICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZDQogICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULA0KICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTQ0KICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SDQogICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUg0KICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuDQogICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi8NCg0KICAgIGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICAgICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9DQogICAgICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgew0KICAgICAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbInRocm93Il0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH0NCiAgICAgICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICAgICAgfSk7DQogICAgfQoKICAgIC8qCiAgICAgKiBiYXNlNjQtYXJyYXlidWZmZXIgMS4wLjEgPGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXN2aC9iYXNlNjQtYXJyYXlidWZmZXI+CiAgICAgKiBDb3B5cmlnaHQgKGMpIDIwMjEgTmlrbGFzIHZvbiBIZXJ0emVuIDxodHRwczovL2hlcnR6ZW4uY29tPgogICAgICogUmVsZWFzZWQgdW5kZXIgTUlUIExpY2Vuc2UKICAgICAqLwogICAgdmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nOwogICAgLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LgogICAgdmFyIGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTsKICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHsKICAgICAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpOwogICAgfQogICAgdmFyIGVuY29kZSA9IGZ1bmN0aW9uIChhcnJheWJ1ZmZlcikgewogICAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaSwgbGVuID0gYnl0ZXMubGVuZ3RoLCBiYXNlNjQgPSAnJzsKICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDMpIHsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdOwogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpXSAmIDMpIDw8IDQpIHwgKGJ5dGVzW2kgKyAxXSA+PiA0KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildOwogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdOwogICAgICAgIH0KICAgICAgICBpZiAobGVuICUgMyA9PT0gMikgewogICAgICAgICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArICc9JzsKICAgICAgICB9CiAgICAgICAgZWxzZSBpZiAobGVuICUgMyA9PT0gMSkgewogICAgICAgICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAyKSArICc9PSc7CiAgICAgICAgfQogICAgICAgIHJldHVybiBiYXNlNjQ7CiAgICB9OwoKICAgIGNvbnN0IGxhc3RCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGNvbnN0IHRyYW5zcGFyZW50QmxvYk1hcCA9IG5ldyBNYXAoKTsNCiAgICBmdW5jdGlvbiBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGNvbnN0IGlkID0gYCR7d2lkdGh9LSR7aGVpZ2h0fWA7DQogICAgICAgICAgICBpZiAoJ09mZnNjcmVlbkNhbnZhcycgaW4gZ2xvYmFsVGhpcykgew0KICAgICAgICAgICAgICAgIGlmICh0cmFuc3BhcmVudEJsb2JNYXAuaGFzKGlkKSkNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zcGFyZW50QmxvYk1hcC5nZXQoaWQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNjcmVlbiA9IG5ldyBPZmZzY3JlZW5DYW52YXMod2lkdGgsIGhlaWdodCk7DQogICAgICAgICAgICAgICAgb2Zmc2NyZWVuLmdldENvbnRleHQoJzJkJyk7DQogICAgICAgICAgICAgICAgY29uc3QgYmxvYiA9IHlpZWxkIG9mZnNjcmVlbi5jb252ZXJ0VG9CbG9iKGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IHlpZWxkIGJsb2IuYXJyYXlCdWZmZXIoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOw0KICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICAgICAgcmV0dXJuIGJhc2U2NDsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgICAgIHJldHVybiAnJzsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfQ0KICAgIGNvbnN0IHdvcmtlciA9IHNlbGY7DQogICAgd29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7DQogICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7DQogICAgICAgICAgICBpZiAoJ09mZnNjcmVlbkNhbnZhcycgaW4gZ2xvYmFsVGhpcykgew0KICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQsIGJpdG1hcCwgd2lkdGgsIGhlaWdodCwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgZGF0YVVSTE9wdGlvbnMsIH0gPSBlLmRhdGE7DQogICAgICAgICAgICAgICAgY29uc3QgdHJhbnNwYXJlbnRCYXNlNjQgPSBnZXRUcmFuc3BhcmVudEJsb2JGb3Iod2lkdGgsIGhlaWdodCwgZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNjcmVlbiA9IG5ldyBPZmZzY3JlZW5DYW52YXMod2lkdGgsIGhlaWdodCk7DQogICAgICAgICAgICAgICAgY29uc3QgY3R4ID0gb2Zmc2NyZWVuLmdldENvbnRleHQoJzJkJyk7DQogICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShiaXRtYXAsIDAsIDAsIHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGJpdG1hcC5jbG9zZSgpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSB5aWVsZCBvZmZzY3JlZW4uY29udmVydFRvQmxvYihkYXRhVVJMT3B0aW9ucyk7DQogICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGJsb2IudHlwZTsNCiAgICAgICAgICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IHlpZWxkIGJsb2IuYXJyYXlCdWZmZXIoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBlbmNvZGUoYXJyYXlCdWZmZXIpOw0KICAgICAgICAgICAgICAgIGlmICghbGFzdEJsb2JNYXAuaGFzKGlkKSAmJiAoeWllbGQgdHJhbnNwYXJlbnRCYXNlNjQpID09PSBiYXNlNjQpIHsNCiAgICAgICAgICAgICAgICAgICAgbGFzdEJsb2JNYXAuc2V0KGlkLCBiYXNlNjQpOw0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgfQ0KICAgICAgICAgICAgICAgIGlmIChsYXN0QmxvYk1hcC5nZXQoaWQpID09PSBiYXNlNjQpDQogICAgICAgICAgICAgICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZCB9KTsNCiAgICAgICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoew0KICAgICAgICAgICAgICAgICAgICBpZCwNCiAgICAgICAgICAgICAgICAgICAgdHlwZSwNCiAgICAgICAgICAgICAgICAgICAgYmFzZTY0LA0KICAgICAgICAgICAgICAgICAgICB3aWR0aCwNCiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LA0KICAgICAgICAgICAgICAgICAgICBjYW52YXNXaWR0aCwNCiAgICAgICAgICAgICAgICAgICAgY2FudmFzSGVpZ2h0LA0KICAgICAgICAgICAgICAgIH0pOw0KICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgICAgIGVsc2Ugew0KICAgICAgICAgICAgICAgIHJldHVybiB3b3JrZXIucG9zdE1lc3NhZ2UoeyBpZDogZS5kYXRhLmlkIH0pOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9OwoKfSkoKTsKCg==',
	null,
	!1,
)
var kt = class {
	constructor(t) {
		;(this.pendingCanvasMutations = new Map()),
			(this.rafStamps = { latestId: 0, invokeId: null }),
			(this.frozen = !1),
			(this.locked = !1),
			(this.processMutation = (l, c) => {
				;((this.rafStamps.invokeId &&
					this.rafStamps.latestId !== this.rafStamps.invokeId) ||
					!this.rafStamps.invokeId) &&
					(this.rafStamps.invokeId = this.rafStamps.latestId),
					this.pendingCanvasMutations.has(l) ||
						this.pendingCanvasMutations.set(l, []),
					this.pendingCanvasMutations.get(l).push(c)
			})
		let {
			sampling: r = 'all',
			win: i,
			blockClass: n,
			blockSelector: o,
			recordCanvas: s,
			dataURLOptions: a,
		} = t
		;(this.mutationCb = t.mutationCb),
			(this.mirror = t.mirror),
			s && r === 'all' && this.initCanvasMutationObserver(i, n, o),
			s &&
				typeof r == 'number' &&
				this.initCanvasFPSObserver(
					r,
					i,
					n,
					o,
					{ dataURLOptions: a },
					t.resizeQuality,
					t.resizeFactor,
					t.maxSnapshotDimension,
				)
	}
	reset() {
		this.pendingCanvasMutations.clear(),
			this.resetObservers && this.resetObservers()
	}
	freeze() {
		this.frozen = !0
	}
	unfreeze() {
		this.frozen = !1
	}
	lock() {
		this.locked = !0
	}
	unlock() {
		this.locked = !1
	}
	initCanvasFPSObserver(t, r, i, n, o, s, a, l) {
		let c = mr(r, i, n),
			u = new Map(),
			d = new Bi()
		d.onmessage = (m) => {
			let { id: g } = m.data
			if ((u.set(g, !1), !('base64' in m.data))) return
			let { base64: w, type: N, canvasWidth: C, canvasHeight: S } = m.data
			this.mutationCb({
				id: g,
				type: de['2D'],
				commands: [
					{ property: 'clearRect', args: [0, 0, C, S] },
					{
						property: 'drawImage',
						args: [
							{
								rr_type: 'ImageBitmap',
								args: [
									{
										rr_type: 'Blob',
										data: [
											{
												rr_type: 'ArrayBuffer',
												base64: w,
											},
										],
										type: N,
									},
								],
							},
							0,
							0,
							C,
							S,
						],
					},
				],
			})
		}
		let f = 1e3 / t,
			h = 0,
			p,
			v = () => {
				let m = []
				return (
					r.document.querySelectorAll('canvas').forEach((g) => {
						$(g, i, n, !0) || m.push(g)
					}),
					m
				)
			},
			y = (m) => {
				if (h && m - h < f) {
					p = requestAnimationFrame(y)
					return
				}
				;(h = m),
					v().forEach((g) =>
						fe(this, void 0, void 0, function* () {
							var w
							let N = this.mirror.getId(g)
							if (u.get(N)) return
							if (
								(u.set(N, !0),
								['webgl', 'webgl2'].includes(g.__context))
							) {
								let F = g.getContext(g.__context)
								;((w = F?.getContextAttributes()) === null ||
								w === void 0
									? void 0
									: w.preserveDrawingBuffer) === !1 &&
									F?.clear(F.COLOR_BUFFER_BIT)
							}
							if (g.width === 0 || g.height === 0) return
							let C = a || 1
							if (l) {
								let F = Math.max(g.width, g.height)
								C = Math.min(C, l / F)
							}
							let S = g.width * C,
								k = g.height * C,
								b = yield createImageBitmap(g, {
									resizeQuality: s || 'low',
									resizeWidth: S,
									resizeHeight: k,
								})
							d.postMessage(
								{
									id: N,
									bitmap: b,
									width: S,
									height: k,
									canvasWidth: g.width,
									canvasHeight: g.height,
									dataURLOptions: o.dataURLOptions,
								},
								[b],
							)
						}),
					),
					(p = requestAnimationFrame(y))
			}
		;(p = requestAnimationFrame(y)),
			(this.resetObservers = () => {
				c(), cancelAnimationFrame(p)
			})
	}
	initCanvasMutationObserver(t, r, i) {
		this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher()
		let n = mr(t, r, i),
			o = Ri(this.processMutation.bind(this), t, r, i),
			s = Di(this.processMutation.bind(this), t, r, i, this.mirror)
		this.resetObservers = () => {
			n(), o(), s()
		}
	}
	startPendingCanvasMutationFlusher() {
		requestAnimationFrame(() => this.flushPendingCanvasMutations())
	}
	startRAFTimestamping() {
		let t = (r) => {
			;(this.rafStamps.latestId = r), requestAnimationFrame(t)
		}
		requestAnimationFrame(t)
	}
	flushPendingCanvasMutations() {
		this.pendingCanvasMutations.forEach((t, r) => {
			let i = this.mirror.getId(r)
			this.flushPendingCanvasMutationFor(r, i)
		}),
			requestAnimationFrame(() => this.flushPendingCanvasMutations())
	}
	flushPendingCanvasMutationFor(t, r) {
		if (this.frozen || this.locked) return
		let i = this.pendingCanvasMutations.get(t)
		if (!i || r === -1) return
		let n = i.map((s) => Ni(s, ['type'])),
			{ type: o } = i[0]
		this.mutationCb({ id: r, type: o, commands: n }),
			this.pendingCanvasMutations.delete(t)
	}
}
var Dt = class {
	constructor(t) {
		;(this.trackedLinkElements = new WeakSet()),
			(this.styleMirror = new Ve()),
			(this.mutationCb = t.mutationCb),
			(this.adoptedStyleSheetCb = t.adoptedStyleSheetCb)
	}
	attachLinkElement(t, r) {
		'_cssText' in r.attributes &&
			this.mutationCb({
				adds: [],
				removes: [],
				texts: [],
				attributes: [{ id: r.id, attributes: r.attributes }],
			}),
			this.trackLinkElement(t)
	}
	trackLinkElement(t) {
		this.trackedLinkElements.has(t) ||
			(this.trackedLinkElements.add(t),
			this.trackStylesheetInLinkElement(t))
	}
	adoptStyleSheets(t, r) {
		if (t.length === 0) return
		let i = { id: r, styleIds: [] },
			n = []
		for (let o of t) {
			let s
			if (this.styleMirror.has(o)) s = this.styleMirror.getId(o)
			else {
				s = this.styleMirror.add(o)
				let a = Array.from(o.rules || CSSRule)
				n.push({
					styleId: s,
					rules: a.map((l, c) => ({ rule: Jt(l), index: c })),
				})
			}
			i.styleIds.push(s)
		}
		n.length > 0 && (i.styles = n), this.adoptedStyleSheetCb(i)
	}
	reset() {
		this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet())
	}
	trackStylesheetInLinkElement(t) {}
}
function ne(e) {
	return Object.assign(Object.assign({}, e), { timestamp: Date.now() })
}
var re,
	xt,
	vr,
	Ot = !1,
	ge = gt()
function xe(e = {}) {
	var t, r, i, n
	let {
			emit: o,
			checkoutEveryNms: s,
			checkoutEveryNth: a,
			blockClass: l = 'highlight-block',
			blockSelector: c = null,
			ignoreClass: u = 'highlight-ignore',
			maskTextClass: d = 'highlight-mask',
			maskTextSelector: f = null,
			inlineStylesheet: h = !0,
			maskAllInputs: p,
			maskInputOptions: v,
			slimDOMOptions: y,
			maskInputFn: m,
			maskTextFn: g = qe,
			hooks: w,
			packFn: N,
			sampling: C = {},
			dataURLOptions: S = {},
			mousemoveWait: k,
			recordCanvas: b = !1,
			recordCrossOriginIframes: F = !1,
			userTriggeredOnInput: _ = !1,
			collectFonts: z = !1,
			inlineImages: Z = !1,
			plugins: U,
			keepIframeSrcFn: H = () => !1,
			enableStrictPrivacy: D = !1,
			ignoreCSSAttributes: B = new Set([]),
		} = e,
		L = F ? window.parent === window : !0,
		V = !1
	if (!L)
		try {
			window.parent.document, (V = !1)
		} catch {
			V = !0
		}
	if (L && !o) throw new Error('emit function is required')
	k !== void 0 && C.mousemove === void 0 && (C.mousemove = k), ge.reset()
	let A =
			p === !0
				? {
						color: !0,
						date: !0,
						'datetime-local': !0,
						email: !0,
						month: !0,
						number: !0,
						range: !0,
						search: !0,
						tel: !0,
						text: !0,
						time: !0,
						url: !0,
						week: !0,
						textarea: !0,
						select: !0,
						password: !0,
				  }
				: v !== void 0
				? v
				: { password: !0 },
		I =
			y === !0 || y === 'all'
				? {
						script: !0,
						comment: !0,
						headFavicon: !0,
						headWhitespace: !0,
						headMetaSocial: !0,
						headMetaRobots: !0,
						headMetaHttpEquiv: !0,
						headMetaVerification: !0,
						headMetaAuthorship: y === 'all',
						headMetaDescKeywords: y === 'all',
				  }
				: y || {}
	it()
	let M,
		O = 0,
		R = (x) => {
			for (let te of U || [])
				te.eventProcessor && (x = te.eventProcessor(x))
			return N && (x = N(x)), x
		}
	re = (x, te) => {
		var X
		if (
			(((X = De[0]) === null || X === void 0 ? void 0 : X.isFrozen()) &&
				x.type !== T.FullSnapshot &&
				!(
					x.type === T.IncrementalSnapshot &&
					x.data.source === E.Mutation
				) &&
				De.forEach((q) => q.unfreeze()),
			L)
		)
			o?.(R(x), te)
		else if (V) {
			let q = { type: 'rrweb', event: R(x), isCheckout: te }
			window.parent.postMessage(q, '*')
		}
		if (x.type === T.FullSnapshot) (M = x), (O = 0)
		else if (x.type === T.IncrementalSnapshot) {
			if (x.data.source === E.Mutation && x.data.isAttachIframe) return
			O++
			let q = a && O >= a,
				ce = s && x.timestamp - M.timestamp > s
			;(q || ce) && xt(!0)
		}
	}
	let K = (x) => {
			re(
				ne({
					type: T.IncrementalSnapshot,
					data: Object.assign({ source: E.Mutation }, x),
				}),
			)
		},
		J = (x) =>
			re(
				ne({
					type: T.IncrementalSnapshot,
					data: Object.assign({ source: E.Scroll }, x),
				}),
			),
		Ce = (x) =>
			re(
				ne({
					type: T.IncrementalSnapshot,
					data: Object.assign({ source: E.CanvasMutation }, x),
				}),
			),
		Se = (x) =>
			re(
				ne({
					type: T.IncrementalSnapshot,
					data: Object.assign({ source: E.AdoptedStyleSheet }, x),
				}),
			),
		se = new Dt({ mutationCb: K, adoptedStyleSheetCb: Se }),
		he = new Et({
			mirror: ge,
			mutationCb: K,
			stylesheetManager: se,
			recordCrossOriginIframes: F,
			wrappedEmit: re,
		})
	for (let x of U || [])
		x.getMirror &&
			x.getMirror({
				nodeMirror: ge,
				crossOriginIframeMirror: he.crossOriginIframeMirror,
				crossOriginIframeStyleMirror: he.crossOriginIframeStyleMirror,
			})
	vr = new kt({
		recordCanvas: b,
		mutationCb: Ce,
		win: window,
		blockClass: l,
		blockSelector: c,
		mirror: ge,
		sampling: (t = C?.canvas) === null || t === void 0 ? void 0 : t.fps,
		dataURLOptions: S,
		resizeQuality:
			(r = C?.canvas) === null || r === void 0 ? void 0 : r.resizeQuality,
		resizeFactor:
			(i = C?.canvas) === null || i === void 0 ? void 0 : i.resizeFactor,
		maxSnapshotDimension:
			(n = C?.canvas) === null || n === void 0
				? void 0
				: n.maxSnapshotDimension,
	})
	let be = new Tt({
		mutationCb: K,
		scrollCb: J,
		bypassOptions: {
			blockClass: l,
			blockSelector: c,
			maskTextClass: d,
			maskTextSelector: f,
			inlineStylesheet: h,
			maskInputOptions: A,
			dataURLOptions: S,
			maskTextFn: g,
			maskInputFn: m,
			recordCanvas: b,
			inlineImages: Z,
			enableStrictPrivacy: D,
			sampling: C,
			slimDOMOptions: I,
			iframeManager: he,
			stylesheetManager: se,
			canvasManager: vr,
			keepIframeSrcFn: H,
			processedNodeManager: ur,
		},
		mirror: ge,
	})
	xt = (x = !1) => {
		re(
			ne({
				type: T.Meta,
				data: { href: window.location.href, width: tt(), height: et() },
			}),
			x,
		),
			se.reset(),
			be.clearCache(),
			De.forEach((X) => X.lock())
		let te = oi(document, {
			mirror: ge,
			blockClass: l,
			blockSelector: c,
			maskTextClass: d,
			maskTextSelector: f,
			inlineStylesheet: h,
			maskAllInputs: A,
			maskTextFn: g,
			slimDOM: I,
			dataURLOptions: S,
			recordCanvas: b,
			inlineImages: Z,
			enableStrictPrivacy: D,
			onSerialize: (X) => {
				we(X, ge) && he.addIframe(X),
					nt(X, ge) && se.trackLinkElement(X),
					me(X) && be.addShadowRoot(X.shadowRoot, document)
			},
			onIframeLoad: (X, q) => {
				he.attachIframe(X, q), be.observeAttachShadow(X)
			},
			onStylesheetLoad: (X, q) => {
				se.attachLinkElement(X, q)
			},
			keepIframeSrcFn: H,
		})
		if (!te) return console.warn('Failed to snapshot the document')
		re(
			ne({
				type: T.FullSnapshot,
				data: { node: te, initialOffset: $e(window) },
			}),
		),
			De.forEach((X) => X.unlock()),
			document.adoptedStyleSheets &&
				document.adoptedStyleSheets.length > 0 &&
				se.adoptStyleSheets(
					document.adoptedStyleSheets,
					ge.getId(document),
				)
	}
	try {
		let x = []
		x.push(
			oe('DOMContentLoaded', () => {
				re(ne({ type: T.DomContentLoaded, data: {} }))
			}),
		)
		let te = (q) => {
			var ce
			return Ai(
				{
					mutationCb: K,
					mousemoveCb: (j, zt) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: { source: zt, positions: j },
							}),
						),
					mouseInteractionCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign(
									{ source: E.MouseInteraction },
									j,
								),
							}),
						),
					scrollCb: J,
					viewportResizeCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign(
									{ source: E.ViewportResize },
									j,
								),
							}),
						),
					inputCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign({ source: E.Input }, j),
							}),
						),
					mediaInteractionCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign(
									{ source: E.MediaInteraction },
									j,
								),
							}),
						),
					styleSheetRuleCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign(
									{ source: E.StyleSheetRule },
									j,
								),
							}),
						),
					styleDeclarationCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign(
									{ source: E.StyleDeclaration },
									j,
								),
							}),
						),
					canvasMutationCb: Ce,
					fontCb: (j) =>
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign({ source: E.Font }, j),
							}),
						),
					selectionCb: (j) => {
						re(
							ne({
								type: T.IncrementalSnapshot,
								data: Object.assign({ source: E.Selection }, j),
							}),
						)
					},
					blockClass: l,
					ignoreClass: u,
					maskTextClass: d,
					maskTextSelector: f,
					maskInputOptions: A,
					inlineStylesheet: h,
					sampling: C,
					recordCanvas: b,
					inlineImages: Z,
					userTriggeredOnInput: _,
					collectFonts: z,
					doc: q,
					maskInputFn: m,
					maskTextFn: g,
					keepIframeSrcFn: H,
					blockSelector: c,
					slimDOMOptions: I,
					dataURLOptions: S,
					mirror: ge,
					iframeManager: he,
					stylesheetManager: se,
					shadowDomManager: be,
					processedNodeManager: ur,
					canvasManager: vr,
					ignoreCSSAttributes: B,
					enableStrictPrivacy: D,
					plugins:
						((ce = U?.filter((j) => j.observer)) === null ||
						ce === void 0
							? void 0
							: ce.map((j) => ({
									observer: j.observer,
									options: j.options,
									callback: (zt) =>
										re(
											ne({
												type: T.Plugin,
												data: {
													plugin: j.name,
													payload: zt,
												},
											}),
										),
							  }))) || [],
				},
				w,
			)
		}
		he.addLoadListener((q) => {
			try {
				x.push(te(q.contentDocument))
			} catch (ce) {
				console.warn(ce)
			}
		})
		let X = () => {
			xt(), x.push(te(document)), (Ot = !0)
		}
		return (
			document.readyState === 'interactive' ||
			document.readyState === 'complete'
				? X()
				: x.push(
						oe(
							'load',
							() => {
								re(ne({ type: T.Load, data: {} })), X()
							},
							window,
						),
				  ),
			() => {
				x.forEach((q) => q()), (Ot = !1)
			}
		)
	} catch (x) {
		console.warn(x)
	}
}
xe.addCustomEvent = (e, t) => {
	!Ot || re(ne({ type: T.Custom, data: { tag: e, payload: t } }))
}
xe.freezePage = () => {
	De.forEach((e) => e.freeze())
}
xe.takeFullSnapshot = (e) => {
	if (!Ot) throw new Error('please take full snapshot after start recording')
	xt(e)
}
xe.mirror = ge
var W
;(function (e) {
	;(e[(e.Document = 0)] = 'Document'),
		(e[(e.DocumentType = 1)] = 'DocumentType'),
		(e[(e.Element = 2)] = 'Element'),
		(e[(e.Text = 3)] = 'Text'),
		(e[(e.CDATA = 4)] = 'CDATA'),
		(e[(e.Comment = 5)] = 'Comment')
})(W || (W = {}))
var Io = (function () {
	function e() {
		;(this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap())
	}
	return (
		(e.prototype.getId = function (t) {
			var r
			if (!t) return -1
			var i =
				(r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id
			return i ?? -1
		}),
		(e.prototype.getNode = function (t) {
			return this.idNodeMap.get(t) || null
		}),
		(e.prototype.getIds = function () {
			return Array.from(this.idNodeMap.keys())
		}),
		(e.prototype.getMeta = function (t) {
			return this.nodeMetaMap.get(t) || null
		}),
		(e.prototype.removeNodeFromMap = function (t) {
			var r = this,
				i = this.getId(t)
			this.idNodeMap.delete(i),
				t.childNodes &&
					t.childNodes.forEach(function (n) {
						return r.removeNodeFromMap(n)
					})
		}),
		(e.prototype.has = function (t) {
			return this.idNodeMap.has(t)
		}),
		(e.prototype.hasNode = function (t) {
			return this.nodeMetaMap.has(t)
		}),
		(e.prototype.add = function (t, r) {
			var i = r.id
			this.idNodeMap.set(i, t), this.nodeMetaMap.set(t, r)
		}),
		(e.prototype.replace = function (t, r) {
			var i = this.getNode(t)
			if (i) {
				var n = this.nodeMetaMap.get(i)
				n && this.nodeMetaMap.set(r, n)
			}
			this.idNodeMap.set(t, r)
		}),
		(e.prototype.reset = function () {
			;(this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap())
		}),
		e
	)
})()
function Co() {
	return new Io()
}
function So(e) {
	let t = {},
		r = /;(?![^(]*\))/g,
		i = /:(.+)/,
		n = /\/\*.*?\*\//g
	return (
		e
			.replace(n, '')
			.split(r)
			.forEach(function (o) {
				if (o) {
					let s = o.split(i)
					s.length > 1 && (t[yr(s[0].trim())] = s[1].trim())
				}
			}),
		t
	)
}
function Pi(e) {
	let t = []
	for (let r in e) {
		let i = e[r]
		if (typeof i != 'string') continue
		let n = wo(r)
		t.push(`${n}: ${i};`)
	}
	return t.join(' ')
}
var bo = /-([a-z])/g,
	Ao = /^--[a-zA-Z0-9-]+$/,
	yr = (e) =>
		Ao.test(e) ? e : e.replace(bo, (t, r) => (r ? r.toUpperCase() : '')),
	No = /\B([A-Z])/g,
	wo = (e) => e.replace(No, '-$1').toLowerCase(),
	pe = class {
		constructor(...t) {
			;(this.childNodes = []),
				(this.parentElement = null),
				(this.parentNode = null),
				(this.ELEMENT_NODE = ee.ELEMENT_NODE),
				(this.TEXT_NODE = ee.TEXT_NODE)
		}
		get firstChild() {
			return this.childNodes[0] || null
		}
		get lastChild() {
			return this.childNodes[this.childNodes.length - 1] || null
		}
		get nextSibling() {
			let t = this.parentNode
			if (!t) return null
			let r = t.childNodes,
				i = r.indexOf(this)
			return r[i + 1] || null
		}
		contains(t) {
			if (t === this) return !0
			for (let r of this.childNodes) if (r.contains(t)) return !0
			return !1
		}
		appendChild(t) {
			throw new Error(
				"RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.",
			)
		}
		insertBefore(t, r) {
			throw new Error(
				"RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.",
			)
		}
		removeChild(t) {
			throw new Error(
				"RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.",
			)
		}
		toString() {
			return 'RRNode'
		}
	}
function Eo(e) {
	return class Vi extends e {
		constructor() {
			super(...arguments),
				(this.nodeType = ee.DOCUMENT_NODE),
				(this.nodeName = '#document'),
				(this.compatMode = 'CSS1Compat'),
				(this.RRNodeType = W.Document),
				(this.textContent = null)
		}
		get documentElement() {
			return (
				this.childNodes.find(
					(r) => r.RRNodeType === W.Element && r.tagName === 'HTML',
				) || null
			)
		}
		get body() {
			var r
			return (
				((r = this.documentElement) === null || r === void 0
					? void 0
					: r.childNodes.find(
							(i) =>
								i.RRNodeType === W.Element &&
								i.tagName === 'BODY',
					  )) || null
			)
		}
		get head() {
			var r
			return (
				((r = this.documentElement) === null || r === void 0
					? void 0
					: r.childNodes.find(
							(i) =>
								i.RRNodeType === W.Element &&
								i.tagName === 'HEAD',
					  )) || null
			)
		}
		get implementation() {
			return this
		}
		get firstElementChild() {
			return this.documentElement
		}
		appendChild(r) {
			let i = r.RRNodeType
			if (
				(i === W.Element || i === W.DocumentType) &&
				this.childNodes.some((n) => n.RRNodeType === i)
			)
				throw new Error(
					`RRDomException: Failed to execute 'appendChild' on 'RRNode': Only one ${
						i === W.Element ? 'RRElement' : 'RRDoctype'
					} on RRDocument allowed.`,
				)
			return (
				(r.parentElement = null),
				(r.parentNode = this),
				this.childNodes.push(r),
				r
			)
		}
		insertBefore(r, i) {
			let n = r.RRNodeType
			if (
				(n === W.Element || n === W.DocumentType) &&
				this.childNodes.some((s) => s.RRNodeType === n)
			)
				throw new Error(
					`RRDomException: Failed to execute 'insertBefore' on 'RRNode': Only one ${
						n === W.Element ? 'RRElement' : 'RRDoctype'
					} on RRDocument allowed.`,
				)
			if (i === null) return this.appendChild(r)
			let o = this.childNodes.indexOf(i)
			if (o == -1)
				throw new Error(
					"Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode.",
				)
			return (
				this.childNodes.splice(o, 0, r),
				(r.parentElement = null),
				(r.parentNode = this),
				r
			)
		}
		removeChild(r) {
			let i = this.childNodes.indexOf(r)
			if (i === -1)
				throw new Error(
					"Failed to execute 'removeChild' on 'RRDocument': The RRNode to be removed is not a child of this RRNode.",
				)
			return (
				this.childNodes.splice(i, 1),
				(r.parentElement = null),
				(r.parentNode = null),
				r
			)
		}
		open() {
			this.childNodes = []
		}
		close() {}
		write(r) {
			let i
			if (
				(r ===
				'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">'
					? (i = '-//W3C//DTD XHTML 1.0 Transitional//EN')
					: r ===
							'<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">' &&
					  (i = '-//W3C//DTD HTML 4.0 Transitional//EN'),
				i)
			) {
				let n = this.createDocumentType('html', i, '')
				this.open(), this.appendChild(n)
			}
		}
		createDocument(r, i, n) {
			return new Vi()
		}
		createDocumentType(r, i, n) {
			let o = new (Gi(pe))(r, i, n)
			return (o.ownerDocument = this), o
		}
		createElement(r) {
			let i = new (Ui(pe))(r)
			return (i.ownerDocument = this), i
		}
		createElementNS(r, i) {
			return this.createElement(i)
		}
		createTextNode(r) {
			let i = new (Hi(pe))(r)
			return (i.ownerDocument = this), i
		}
		createComment(r) {
			let i = new (Zi(pe))(r)
			return (i.ownerDocument = this), i
		}
		createCDATASection(r) {
			let i = new (Yi(pe))(r)
			return (i.ownerDocument = this), i
		}
		toString() {
			return 'RRDocument'
		}
	}
}
function Gi(e) {
	return class extends e {
		constructor(r, i, n) {
			super(),
				(this.nodeType = ee.DOCUMENT_TYPE_NODE),
				(this.RRNodeType = W.DocumentType),
				(this.textContent = null),
				(this.name = r),
				(this.publicId = i),
				(this.systemId = n),
				(this.nodeName = r)
		}
		toString() {
			return 'RRDocumentType'
		}
	}
}
function Ui(e) {
	return class extends e {
		constructor(r) {
			super(),
				(this.nodeType = ee.ELEMENT_NODE),
				(this.RRNodeType = W.Element),
				(this.attributes = {}),
				(this.shadowRoot = null),
				(this.tagName = r.toUpperCase()),
				(this.nodeName = r.toUpperCase())
		}
		get textContent() {
			let r = ''
			return this.childNodes.forEach((i) => (r += i.textContent)), r
		}
		set textContent(r) {
			this.childNodes = [this.ownerDocument.createTextNode(r)]
		}
		get classList() {
			return new Ir(this.attributes.class, (r) => {
				this.attributes.class = r
			})
		}
		get id() {
			return this.attributes.id || ''
		}
		get className() {
			return this.attributes.class || ''
		}
		get style() {
			let r = this.attributes.style ? So(this.attributes.style) : {},
				i = /\B([A-Z])/g
			return (
				(r.setProperty = (n, o, s) => {
					if (i.test(n)) return
					let a = yr(n)
					o ? (r[a] = o) : delete r[a],
						s === 'important' && (r[a] += ' !important'),
						(this.attributes.style = Pi(r))
				}),
				(r.removeProperty = (n) => {
					if (i.test(n)) return ''
					let o = yr(n),
						s = r[o] || ''
					return delete r[o], (this.attributes.style = Pi(r)), s
				}),
				r
			)
		}
		getAttribute(r) {
			return this.attributes[r] || null
		}
		setAttribute(r, i) {
			this.attributes[r] = i
		}
		setAttributeNS(r, i, n) {
			this.setAttribute(i, n)
		}
		removeAttribute(r) {
			delete this.attributes[r]
		}
		appendChild(r) {
			return (
				this.childNodes.push(r),
				(r.parentNode = this),
				(r.parentElement = this),
				r
			)
		}
		insertBefore(r, i) {
			if (i === null) return this.appendChild(r)
			let n = this.childNodes.indexOf(i)
			if (n == -1)
				throw new Error(
					"Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode.",
				)
			return (
				this.childNodes.splice(n, 0, r),
				(r.parentElement = this),
				(r.parentNode = this),
				r
			)
		}
		removeChild(r) {
			let i = this.childNodes.indexOf(r)
			if (i === -1)
				throw new Error(
					"Failed to execute 'removeChild' on 'RRElement': The RRNode to be removed is not a child of this RRNode.",
				)
			return (
				this.childNodes.splice(i, 1),
				(r.parentElement = null),
				(r.parentNode = null),
				r
			)
		}
		attachShadow(r) {
			let i = this.ownerDocument.createElement('SHADOWROOT')
			return (this.shadowRoot = i), i
		}
		dispatchEvent(r) {
			return !0
		}
		toString() {
			let r = ''
			for (let i in this.attributes) r += `${i}="${this.attributes[i]}" `
			return `${this.tagName} ${r}`
		}
	}
}
function To(e) {
	return class extends e {
		attachShadow(r) {
			throw new Error(
				"RRDomException: Failed to execute 'attachShadow' on 'RRElement': This RRElement does not support attachShadow",
			)
		}
		play() {
			this.paused = !1
		}
		pause() {
			this.paused = !0
		}
	}
}
function Hi(e) {
	return class extends e {
		constructor(r) {
			super(),
				(this.nodeType = ee.TEXT_NODE),
				(this.nodeName = '#text'),
				(this.RRNodeType = W.Text),
				(this.data = r)
		}
		get textContent() {
			return this.data
		}
		set textContent(r) {
			this.data = r
		}
		toString() {
			return `RRText text=${JSON.stringify(this.data)}`
		}
	}
}
function Zi(e) {
	return class extends e {
		constructor(r) {
			super(),
				(this.nodeType = ee.COMMENT_NODE),
				(this.nodeName = '#comment'),
				(this.RRNodeType = W.Comment),
				(this.data = r)
		}
		get textContent() {
			return this.data
		}
		set textContent(r) {
			this.data = r
		}
		toString() {
			return `RRComment text=${JSON.stringify(this.data)}`
		}
	}
}
function Yi(e) {
	return class extends e {
		constructor(r) {
			super(),
				(this.nodeName = '#cdata-section'),
				(this.nodeType = ee.CDATA_SECTION_NODE),
				(this.RRNodeType = W.CDATA),
				(this.data = r)
		}
		get textContent() {
			return this.data
		}
		set textContent(r) {
			this.data = r
		}
		toString() {
			return `RRCDATASection data=${JSON.stringify(this.data)}`
		}
	}
}
var Ir = class {
		constructor(t, r) {
			if (
				((this.classes = []),
				(this.add = (...i) => {
					for (let n of i) {
						let o = String(n)
						this.classes.indexOf(o) >= 0 || this.classes.push(o)
					}
					this.onChange && this.onChange(this.classes.join(' '))
				}),
				(this.remove = (...i) => {
					;(this.classes = this.classes.filter(
						(n) => i.indexOf(n) === -1,
					)),
						this.onChange && this.onChange(this.classes.join(' '))
				}),
				t)
			) {
				let i = t.trim().split(/\s+/)
				this.classes.push(...i)
			}
			this.onChange = r
		}
	},
	ee
;(function (e) {
	;(e[(e.PLACEHOLDER = 0)] = 'PLACEHOLDER'),
		(e[(e.ELEMENT_NODE = 1)] = 'ELEMENT_NODE'),
		(e[(e.ATTRIBUTE_NODE = 2)] = 'ATTRIBUTE_NODE'),
		(e[(e.TEXT_NODE = 3)] = 'TEXT_NODE'),
		(e[(e.CDATA_SECTION_NODE = 4)] = 'CDATA_SECTION_NODE'),
		(e[(e.ENTITY_REFERENCE_NODE = 5)] = 'ENTITY_REFERENCE_NODE'),
		(e[(e.ENTITY_NODE = 6)] = 'ENTITY_NODE'),
		(e[(e.PROCESSING_INSTRUCTION_NODE = 7)] =
			'PROCESSING_INSTRUCTION_NODE'),
		(e[(e.COMMENT_NODE = 8)] = 'COMMENT_NODE'),
		(e[(e.DOCUMENT_NODE = 9)] = 'DOCUMENT_NODE'),
		(e[(e.DOCUMENT_TYPE_NODE = 10)] = 'DOCUMENT_TYPE_NODE'),
		(e[(e.DOCUMENT_FRAGMENT_NODE = 11)] = 'DOCUMENT_FRAGMENT_NODE')
})(ee || (ee = {}))
var Cr = {
		svg: 'http://www.w3.org/2000/svg',
		'xlink:href': 'http://www.w3.org/1999/xlink',
		xmlns: 'http://www.w3.org/2000/xmlns/',
	},
	Mo = {
		altglyph: 'altGlyph',
		altglyphdef: 'altGlyphDef',
		altglyphitem: 'altGlyphItem',
		animatecolor: 'animateColor',
		animatemotion: 'animateMotion',
		animatetransform: 'animateTransform',
		clippath: 'clipPath',
		feblend: 'feBlend',
		fecolormatrix: 'feColorMatrix',
		fecomponenttransfer: 'feComponentTransfer',
		fecomposite: 'feComposite',
		feconvolvematrix: 'feConvolveMatrix',
		fediffuselighting: 'feDiffuseLighting',
		fedisplacementmap: 'feDisplacementMap',
		fedistantlight: 'feDistantLight',
		fedropshadow: 'feDropShadow',
		feflood: 'feFlood',
		fefunca: 'feFuncA',
		fefuncb: 'feFuncB',
		fefuncg: 'feFuncG',
		fefuncr: 'feFuncR',
		fegaussianblur: 'feGaussianBlur',
		feimage: 'feImage',
		femerge: 'feMerge',
		femergenode: 'feMergeNode',
		femorphology: 'feMorphology',
		feoffset: 'feOffset',
		fepointlight: 'fePointLight',
		fespecularlighting: 'feSpecularLighting',
		fespotlight: 'feSpotLight',
		fetile: 'feTile',
		feturbulence: 'feTurbulence',
		foreignobject: 'foreignObject',
		glyphref: 'glyphRef',
		lineargradient: 'linearGradient',
		radialgradient: 'radialGradient',
	}
function ve(e, t, r, i) {
	let n = e.childNodes,
		o = t.childNodes
	;(i = i || t.mirror || t.ownerDocument.mirror),
		(n.length > 0 || o.length > 0) && Wi(Array.from(n), o, e, r, i)
	let s = null,
		a = null
	switch (t.RRNodeType) {
		case W.Document: {
			a = t.scrollData
			break
		}
		case W.Element: {
			let l = e,
				c = t
			switch (
				(Ro(l, c, i), (a = c.scrollData), (s = c.inputData), c.tagName)
			) {
				case 'AUDIO':
				case 'VIDEO': {
					let u = e,
						d = c
					d.paused !== void 0 && (d.paused ? u.pause() : u.play()),
						d.muted !== void 0 && (u.muted = d.muted),
						d.volume !== void 0 && (u.volume = d.volume),
						d.currentTime !== void 0 &&
							(u.currentTime = d.currentTime),
						d.playbackRate !== void 0 &&
							(u.playbackRate = d.playbackRate)
					break
				}
				case 'CANVAS':
					{
						let u = t
						if (u.rr_dataURL !== null) {
							let d = document.createElement('img')
							;(d.onload = () => {
								let f = l.getContext('2d')
								f && f.drawImage(d, 0, 0, d.width, d.height)
							}),
								(d.src = u.rr_dataURL)
						}
						u.canvasMutations.forEach((d) =>
							r.applyCanvas(d.event, d.mutation, e),
						)
					}
					break
				case 'STYLE':
					{
						let u = l.sheet
						u &&
							t.rules.forEach((d) =>
								r.applyStyleSheetMutation(d, u),
							)
					}
					break
			}
			if (c.shadowRoot) {
				l.shadowRoot || l.attachShadow({ mode: 'open' })
				let u = l.shadowRoot.childNodes,
					d = c.shadowRoot.childNodes
				;(u.length > 0 || d.length > 0) &&
					Wi(Array.from(u), d, l.shadowRoot, r, i)
			}
			break
		}
		case W.Text:
		case W.Comment:
		case W.CDATA:
			e.textContent !== t.data && (e.textContent = t.data)
			break
	}
	if (
		(a && r.applyScroll(a, !0),
		s && r.applyInput(s),
		t.nodeName === 'IFRAME')
	) {
		let l = e.contentDocument,
			c = t
		if (l) {
			let u = i.getMeta(c.contentDocument)
			u && r.mirror.add(l, Object.assign({}, u)),
				ve(l, c.contentDocument, r, i)
		}
	}
}
function Ro(e, t, r) {
	let i = e.attributes,
		n = t.attributes
	for (let o in n) {
		let s = n[o],
			a = r.getMeta(t)
		if (a && 'isSVG' in a && a.isSVG && Cr[o]) e.setAttributeNS(Cr[o], o, s)
		else if (t.tagName === 'CANVAS' && o === 'rr_dataURL') {
			let l = document.createElement('img')
			;(l.src = s),
				(l.onload = () => {
					let c = e.getContext('2d')
					c && c.drawImage(l, 0, 0, l.width, l.height)
				})
		} else e.setAttribute(o, s)
	}
	for (let { name: o } of Array.from(i)) o in n || e.removeAttribute(o)
	t.scrollLeft && (e.scrollLeft = t.scrollLeft),
		t.scrollTop && (e.scrollTop = t.scrollTop)
}
function Wi(e, t, r, i, n) {
	var o
	let s = 0,
		a = e.length - 1,
		l = 0,
		c = t.length - 1,
		u = e[s],
		d = e[a],
		f = t[l],
		h = t[c],
		p,
		v
	for (; s <= a && l <= c; ) {
		let y = i.mirror.getId(u),
			m = i.mirror.getId(d),
			g = n.getId(f),
			w = n.getId(h)
		if (u === void 0) u = e[++s]
		else if (d === void 0) d = e[--a]
		else if (y !== -1 && y === g) ve(u, f, i, n), (u = e[++s]), (f = t[++l])
		else if (m !== -1 && m === w) ve(d, h, i, n), (d = e[--a]), (h = t[--c])
		else if (y !== -1 && y === w)
			r.insertBefore(u, d.nextSibling),
				ve(u, h, i, n),
				(u = e[++s]),
				(h = t[--c])
		else if (m !== -1 && m === g)
			r.insertBefore(d, u), ve(d, f, i, n), (d = e[--a]), (f = t[++l])
		else {
			if (!p) {
				p = {}
				for (let N = s; N <= a; N++) {
					let C = e[N]
					C && i.mirror.hasNode(C) && (p[i.mirror.getId(C)] = N)
				}
			}
			if (((v = p[n.getId(f)]), v)) {
				let N = e[v]
				r.insertBefore(N, u), ve(N, f, i, n), (e[v] = void 0)
			} else {
				let N = Lt(f, i.mirror, n)
				r.nodeName === '#document' &&
					((o = i.mirror.getMeta(N)) === null || o === void 0
						? void 0
						: o.type) === W.Element &&
					r.documentElement &&
					(r.removeChild(r.documentElement),
					(e[s] = void 0),
					(u = void 0)),
					r.insertBefore(N, u || null),
					ve(N, f, i, n)
			}
			f = t[++l]
		}
	}
	if (s > a) {
		let y = t[c + 1],
			m = null
		for (
			y &&
			r.childNodes.forEach((g) => {
				i.mirror.getId(g) === n.getId(y) && (m = g)
			});
			l <= c;
			++l
		) {
			let g = Lt(t[l], i.mirror, n)
			r.insertBefore(g, m), ve(g, t[l], i, n)
		}
	} else if (l > c)
		for (; s <= a; s++) {
			let y = e[s]
			y && (r.removeChild(y), i.mirror.removeNodeFromMap(y))
		}
}
function Lt(e, t, r) {
	let i = r.getId(e),
		n = r.getMeta(e),
		o = null
	if ((i > -1 && (o = t.getNode(i)), o !== null)) return o
	switch (e.RRNodeType) {
		case W.Document:
			o = new Document()
			break
		case W.DocumentType:
			o = document.implementation.createDocumentType(
				e.name,
				e.publicId,
				e.systemId,
			)
			break
		case W.Element: {
			let s = e.tagName.toLowerCase()
			;(s = Mo[s] || s),
				n && 'isSVG' in n && n?.isSVG
					? (o = document.createElementNS(Cr.svg, s))
					: (o = document.createElement(e.tagName))
			break
		}
		case W.Text:
			o = document.createTextNode(e.data)
			break
		case W.Comment:
			o = document.createComment(e.data)
			break
		case W.CDATA:
			o = document.createCDATASection(e.data)
			break
	}
	return n && t.add(o, Object.assign({}, n)), o
}
var Ee = class extends Eo(pe) {
		constructor(t) {
			super(),
				(this.UNSERIALIZED_STARTING_ID = -2),
				(this._unserializedId = this.UNSERIALIZED_STARTING_ID),
				(this.mirror = Fo()),
				(this.scrollData = null),
				t && (this.mirror = t)
		}
		get unserializedId() {
			return this._unserializedId--
		}
		createDocument(t, r, i) {
			return new Ee()
		}
		createDocumentType(t, r, i) {
			let n = new ko(t, r, i)
			return (n.ownerDocument = this), n
		}
		createElement(t) {
			let r = t.toUpperCase(),
				i
			switch (r) {
				case 'AUDIO':
				case 'VIDEO':
					i = new Sr(r)
					break
				case 'IFRAME':
					i = new Nr(r, this.mirror)
					break
				case 'CANVAS':
					i = new br(r)
					break
				case 'STYLE':
					i = new Ar(r)
					break
				default:
					i = new He(r)
					break
			}
			return (i.ownerDocument = this), i
		}
		createComment(t) {
			let r = new xo(t)
			return (r.ownerDocument = this), r
		}
		createCDATASection(t) {
			let r = new Oo(t)
			return (r.ownerDocument = this), r
		}
		createTextNode(t) {
			let r = new Do(t)
			return (r.ownerDocument = this), r
		}
		destroyTree() {
			;(this.childNodes = []), this.mirror.reset()
		}
		open() {
			super.open(), (this._unserializedId = this.UNSERIALIZED_STARTING_ID)
		}
	},
	ko = Gi(pe),
	He = class extends Ui(pe) {
		constructor() {
			super(...arguments),
				(this.inputData = null),
				(this.scrollData = null)
		}
	},
	Sr = class extends To(He) {},
	br = class extends He {
		constructor() {
			super(...arguments),
				(this.rr_dataURL = null),
				(this.canvasMutations = [])
		}
		getContext() {
			return null
		}
	},
	Ar = class extends He {
		constructor() {
			super(...arguments), (this.rules = [])
		}
	},
	Nr = class extends He {
		constructor(t, r) {
			super(t),
				(this.contentDocument = new Ee()),
				(this.contentDocument.mirror = r)
		}
	},
	Do = Hi(pe),
	xo = Zi(pe),
	Oo = Yi(pe)
function Lo(e) {
	return e instanceof HTMLFormElement ? 'FORM' : e.tagName.toUpperCase()
}
function Er(e, t, r, i) {
	let n
	switch (e.nodeType) {
		case ee.DOCUMENT_NODE:
			i && i.nodeName === 'IFRAME'
				? (n = i.contentDocument)
				: ((n = t), (n.compatMode = e.compatMode))
			break
		case ee.DOCUMENT_TYPE_NODE: {
			let s = e
			n = t.createDocumentType(s.name, s.publicId, s.systemId)
			break
		}
		case ee.ELEMENT_NODE: {
			let s = e,
				a = Lo(s)
			n = t.createElement(a)
			let l = n
			for (let { name: c, value: u } of Array.from(s.attributes))
				l.attributes[c] = u
			s.scrollLeft && (l.scrollLeft = s.scrollLeft),
				s.scrollTop && (l.scrollTop = s.scrollTop)
			break
		}
		case ee.TEXT_NODE:
			n = t.createTextNode(e.textContent || '')
			break
		case ee.CDATA_SECTION_NODE:
			n = t.createCDATASection(e.data)
			break
		case ee.COMMENT_NODE:
			n = t.createComment(e.textContent || '')
			break
		case ee.DOCUMENT_FRAGMENT_NODE:
			n = i.attachShadow({ mode: 'open' })
			break
		default:
			return null
	}
	let o = r.getMeta(e)
	return (
		t instanceof Ee &&
			(o || ((o = Tr(n, t.unserializedId)), r.add(e, o)),
			t.mirror.add(n, Object.assign({}, o))),
		n
	)
}
function zi(e, t = Co(), r = new Ee()) {
	function i(n, o) {
		let s = Er(n, r, t, o)
		if (s !== null)
			if (
				(o?.nodeName !== 'IFRAME' &&
					n.nodeType !== ee.DOCUMENT_FRAGMENT_NODE &&
					(o?.appendChild(s),
					(s.parentNode = o),
					(s.parentElement = o)),
				n.nodeName === 'IFRAME')
			) {
				let a = n.contentDocument
				a && i(a, s)
			} else
				(n.nodeType === ee.DOCUMENT_NODE ||
					n.nodeType === ee.ELEMENT_NODE ||
					n.nodeType === ee.DOCUMENT_FRAGMENT_NODE) &&
					(n.nodeType === ee.ELEMENT_NODE &&
						n.shadowRoot &&
						i(n.shadowRoot, s),
					n.childNodes.forEach((a) => i(a, s)))
	}
	return i(e, null), r
}
function Fo() {
	return new wr()
}
var wr = class {
	constructor() {
		;(this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap())
	}
	getId(t) {
		var r
		if (!t) return -1
		let i = (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id
		return i ?? -1
	}
	getNode(t) {
		return this.idNodeMap.get(t) || null
	}
	getIds() {
		return Array.from(this.idNodeMap.keys())
	}
	getMeta(t) {
		return this.nodeMetaMap.get(t) || null
	}
	removeNodeFromMap(t) {
		let r = this.getId(t)
		this.idNodeMap.delete(r),
			t.childNodes &&
				t.childNodes.forEach((i) => this.removeNodeFromMap(i))
	}
	has(t) {
		return this.idNodeMap.has(t)
	}
	hasNode(t) {
		return this.nodeMetaMap.has(t)
	}
	add(t, r) {
		let i = r.id
		this.idNodeMap.set(i, t), this.nodeMetaMap.set(t, r)
	}
	replace(t, r) {
		let i = this.getNode(t)
		if (i) {
			let n = this.nodeMetaMap.get(i)
			n && this.nodeMetaMap.set(r, n)
		}
		this.idNodeMap.set(t, r)
	}
	reset() {
		;(this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap())
	}
}
function Tr(e, t) {
	switch (e.RRNodeType) {
		case W.Document:
			return { id: t, type: e.RRNodeType, childNodes: [] }
		case W.DocumentType: {
			let r = e
			return {
				id: t,
				type: e.RRNodeType,
				name: r.name,
				publicId: r.publicId,
				systemId: r.systemId,
			}
		}
		case W.Element:
			return {
				id: t,
				type: e.RRNodeType,
				tagName: e.tagName.toLowerCase(),
				attributes: {},
				childNodes: [],
			}
		case W.Text:
			return {
				id: t,
				type: e.RRNodeType,
				textContent: e.textContent || '',
			}
		case W.Comment:
			return {
				id: t,
				type: e.RRNodeType,
				textContent: e.textContent || '',
			}
		case W.CDATA:
			return { id: t, type: e.RRNodeType, textContent: '' }
	}
}
var { addCustomEvent: _o } = xe,
	{ freezePage: Bo } = xe
var ae = Uint8Array,
	le = Uint16Array,
	ft = Uint32Array,
	_t = new ae([
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
		5, 5, 5, 5, 0, 0, 0, 0,
	]),
	Bt = new ae([
		0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
		10, 11, 11, 12, 12, 13, 13, 0, 0,
	]),
	Dr = new ae([
		16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
	]),
	Qi = function (e, t) {
		for (var r = new le(31), i = 0; i < 31; ++i) r[i] = t += 1 << e[i - 1]
		for (var n = new ft(r[30]), i = 1; i < 30; ++i)
			for (var o = r[i]; o < r[i + 1]; ++o) n[o] = ((o - r[i]) << 5) | i
		return [r, n]
	},
	Ji = Qi(_t, 2),
	qi = Ji[0],
	xr = Ji[1]
;(qi[28] = 258), (xr[258] = 28)
var $i = Qi(Bt, 0),
	Po = $i[0],
	Ki = $i[1],
	Or = new le(32768)
for (Y = 0; Y < 32768; ++Y)
	(Te = ((Y & 43690) >>> 1) | ((Y & 21845) << 1)),
		(Te = ((Te & 52428) >>> 2) | ((Te & 13107) << 2)),
		(Te = ((Te & 61680) >>> 4) | ((Te & 3855) << 4)),
		(Or[Y] = (((Te & 65280) >>> 8) | ((Te & 255) << 8)) >>> 1)
var Te,
	Y,
	Ae = function (e, t, r) {
		for (var i = e.length, n = 0, o = new le(t); n < i; ++n) ++o[e[n] - 1]
		var s = new le(t)
		for (n = 0; n < t; ++n) s[n] = (s[n - 1] + o[n - 1]) << 1
		var a
		if (r) {
			a = new le(1 << t)
			var l = 15 - t
			for (n = 0; n < i; ++n)
				if (e[n])
					for (
						var c = (n << 4) | e[n],
							u = t - e[n],
							d = s[e[n] - 1]++ << u,
							f = d | ((1 << u) - 1);
						d <= f;
						++d
					)
						a[Or[d] >>> l] = c
		} else
			for (a = new le(i), n = 0; n < i; ++n)
				a[n] = Or[s[e[n] - 1]++] >>> (15 - e[n])
		return a
	},
	Oe = new ae(288)
for (Y = 0; Y < 144; ++Y) Oe[Y] = 8
var Y
for (Y = 144; Y < 256; ++Y) Oe[Y] = 9
var Y
for (Y = 256; Y < 280; ++Y) Oe[Y] = 7
var Y
for (Y = 280; Y < 288; ++Y) Oe[Y] = 8
var Y,
	ht = new ae(32)
for (Y = 0; Y < 32; ++Y) ht[Y] = 5
var Y,
	Wo = Ae(Oe, 9, 0),
	Vo = Ae(Oe, 9, 1),
	Go = Ae(ht, 5, 0),
	Uo = Ae(ht, 5, 1),
	Mr = function (e) {
		for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r])
		return t
	},
	ye = function (e, t, r) {
		var i = (t / 8) >> 0
		return ((e[i] | (e[i + 1] << 8)) >>> (t & 7)) & r
	},
	Rr = function (e, t) {
		var r = (t / 8) >> 0
		return (e[r] | (e[r + 1] << 8) | (e[r + 2] << 16)) >>> (t & 7)
	},
	Fr = function (e) {
		return ((e / 8) >> 0) + (e & 7 && 1)
	},
	_r = function (e, t, r) {
		;(t == null || t < 0) && (t = 0),
			(r == null || r > e.length) && (r = e.length)
		var i = new (e instanceof le ? le : e instanceof ft ? ft : ae)(r - t)
		return i.set(e.subarray(t, r)), i
	},
	Ho = function (e, t, r) {
		var i = e.length,
			n = !t || r,
			o = !r || r.i
		r || (r = {}), t || (t = new ae(i * 3))
		var s = function (Ce) {
				var Se = t.length
				if (Ce > Se) {
					var se = new ae(Math.max(Se * 2, Ce))
					se.set(t), (t = se)
				}
			},
			a = r.f || 0,
			l = r.p || 0,
			c = r.b || 0,
			u = r.l,
			d = r.d,
			f = r.m,
			h = r.n,
			p = i * 8
		do {
			if (!u) {
				r.f = a = ye(e, l, 1)
				var v = ye(e, l + 1, 3)
				if (((l += 3), v))
					if (v == 1) (u = Vo), (d = Uo), (f = 9), (h = 5)
					else if (v == 2) {
						var w = ye(e, l, 31) + 257,
							N = ye(e, l + 10, 15) + 4,
							C = w + ye(e, l + 5, 31) + 1
						l += 14
						for (
							var S = new ae(C), k = new ae(19), b = 0;
							b < N;
							++b
						)
							k[Dr[b]] = ye(e, l + b * 3, 7)
						l += N * 3
						var F = Mr(k),
							_ = (1 << F) - 1
						if (!o && l + C * (F + 7) > p) break
						for (var z = Ae(k, F, 1), b = 0; b < C; ) {
							var Z = z[ye(e, l, _)]
							l += Z & 15
							var y = Z >>> 4
							if (y < 16) S[b++] = y
							else {
								var U = 0,
									H = 0
								for (
									y == 16
										? ((H = 3 + ye(e, l, 3)),
										  (l += 2),
										  (U = S[b - 1]))
										: y == 17
										? ((H = 3 + ye(e, l, 7)), (l += 3))
										: y == 18 &&
										  ((H = 11 + ye(e, l, 127)), (l += 7));
									H--;

								)
									S[b++] = U
							}
						}
						var D = S.subarray(0, w),
							B = S.subarray(w)
						;(f = Mr(D)),
							(h = Mr(B)),
							(u = Ae(D, f, 1)),
							(d = Ae(B, h, 1))
					} else throw 'invalid block type'
				else {
					var y = Fr(l) + 4,
						m = e[y - 4] | (e[y - 3] << 8),
						g = y + m
					if (g > i) {
						if (o) throw 'unexpected EOF'
						break
					}
					n && s(c + m),
						t.set(e.subarray(y, g), c),
						(r.b = c += m),
						(r.p = l = g * 8)
					continue
				}
				if (l > p) throw 'unexpected EOF'
			}
			n && s(c + 131072)
			for (
				var L = (1 << f) - 1, V = (1 << h) - 1, A = f + h + 18;
				o || l + A < p;

			) {
				var U = u[Rr(e, l) & L],
					I = U >>> 4
				if (((l += U & 15), l > p)) throw 'unexpected EOF'
				if (!U) throw 'invalid length/literal'
				if (I < 256) t[c++] = I
				else if (I == 256) {
					u = null
					break
				} else {
					var M = I - 254
					if (I > 264) {
						var b = I - 257,
							O = _t[b]
						;(M = ye(e, l, (1 << O) - 1) + qi[b]), (l += O)
					}
					var R = d[Rr(e, l) & V],
						K = R >>> 4
					if (!R) throw 'invalid distance'
					l += R & 15
					var B = Po[K]
					if (K > 3) {
						var O = Bt[K]
						;(B += Rr(e, l) & ((1 << O) - 1)), (l += O)
					}
					if (l > p) throw 'unexpected EOF'
					n && s(c + 131072)
					for (var J = c + M; c < J; c += 4)
						(t[c] = t[c - B]),
							(t[c + 1] = t[c + 1 - B]),
							(t[c + 2] = t[c + 2 - B]),
							(t[c + 3] = t[c + 3 - B])
					c = J
				}
			}
			;(r.l = u),
				(r.p = l),
				(r.b = c),
				u && ((a = 1), (r.m = f), (r.d = d), (r.n = h))
		} while (!a)
		return c == t.length ? t : _r(t, 0, c)
	},
	Me = function (e, t, r) {
		r <<= t & 7
		var i = (t / 8) >> 0
		;(e[i] |= r), (e[i + 1] |= r >>> 8)
	},
	ut = function (e, t, r) {
		r <<= t & 7
		var i = (t / 8) >> 0
		;(e[i] |= r), (e[i + 1] |= r >>> 8), (e[i + 2] |= r >>> 16)
	},
	kr = function (e, t) {
		for (var r = [], i = 0; i < e.length; ++i)
			e[i] && r.push({ s: i, f: e[i] })
		var n = r.length,
			o = r.slice()
		if (!n) return [new ae(0), 0]
		if (n == 1) {
			var s = new ae(r[0].s + 1)
			return (s[r[0].s] = 1), [s, 1]
		}
		r.sort(function (C, S) {
			return C.f - S.f
		}),
			r.push({ s: -1, f: 25001 })
		var a = r[0],
			l = r[1],
			c = 0,
			u = 1,
			d = 2
		for (r[0] = { s: -1, f: a.f + l.f, l: a, r: l }; u != n - 1; )
			(a = r[r[c].f < r[d].f ? c++ : d++]),
				(l = r[c != u && r[c].f < r[d].f ? c++ : d++]),
				(r[u++] = { s: -1, f: a.f + l.f, l: a, r: l })
		for (var f = o[0].s, i = 1; i < n; ++i) o[i].s > f && (f = o[i].s)
		var h = new le(f + 1),
			p = Lr(r[u - 1], h, 0)
		if (p > t) {
			var i = 0,
				v = 0,
				y = p - t,
				m = 1 << y
			for (
				o.sort(function (S, k) {
					return h[k.s] - h[S.s] || S.f - k.f
				});
				i < n;
				++i
			) {
				var g = o[i].s
				if (h[g] > t) (v += m - (1 << (p - h[g]))), (h[g] = t)
				else break
			}
			for (v >>>= y; v > 0; ) {
				var w = o[i].s
				h[w] < t ? (v -= 1 << (t - h[w]++ - 1)) : ++i
			}
			for (; i >= 0 && v; --i) {
				var N = o[i].s
				h[N] == t && (--h[N], ++v)
			}
			p = t
		}
		return [new ae(h), p]
	},
	Lr = function (e, t, r) {
		return e.s == -1
			? Math.max(Lr(e.l, t, r + 1), Lr(e.r, t, r + 1))
			: (t[e.s] = r)
	},
	Xi = function (e) {
		for (var t = e.length; t && !e[--t]; );
		for (
			var r = new le(++t),
				i = 0,
				n = e[0],
				o = 1,
				s = function (l) {
					r[i++] = l
				},
				a = 1;
			a <= t;
			++a
		)
			if (e[a] == n && a != t) ++o
			else {
				if (!n && o > 2) {
					for (; o > 138; o -= 138) s(32754)
					o > 2 &&
						(s(
							o > 10
								? ((o - 11) << 5) | 28690
								: ((o - 3) << 5) | 12305,
						),
						(o = 0))
				} else if (o > 3) {
					for (s(n), --o; o > 6; o -= 6) s(8304)
					o > 2 && (s(((o - 3) << 5) | 8208), (o = 0))
				}
				for (; o--; ) s(n)
				;(o = 1), (n = e[a])
			}
		return [r.subarray(0, i), t]
	},
	dt = function (e, t) {
		for (var r = 0, i = 0; i < t.length; ++i) r += e[i] * t[i]
		return r
	},
	Ft = function (e, t, r) {
		var i = r.length,
			n = Fr(t + 2)
		;(e[n] = i & 255),
			(e[n + 1] = i >>> 8),
			(e[n + 2] = e[n] ^ 255),
			(e[n + 3] = e[n + 1] ^ 255)
		for (var o = 0; o < i; ++o) e[n + o + 4] = r[o]
		return (n + 4 + i) * 8
	},
	ji = function (e, t, r, i, n, o, s, a, l, c, u) {
		Me(t, u++, r), ++n[256]
		for (
			var d = kr(n, 15),
				f = d[0],
				h = d[1],
				p = kr(o, 15),
				v = p[0],
				y = p[1],
				m = Xi(f),
				g = m[0],
				w = m[1],
				N = Xi(v),
				C = N[0],
				S = N[1],
				k = new le(19),
				b = 0;
			b < g.length;
			++b
		)
			k[g[b] & 31]++
		for (var b = 0; b < C.length; ++b) k[C[b] & 31]++
		for (
			var F = kr(k, 7), _ = F[0], z = F[1], Z = 19;
			Z > 4 && !_[Dr[Z - 1]];
			--Z
		);
		var U = (c + 5) << 3,
			H = dt(n, Oe) + dt(o, ht) + s,
			D =
				dt(n, f) +
				dt(o, v) +
				s +
				14 +
				3 * Z +
				dt(k, _) +
				(2 * k[16] + 3 * k[17] + 7 * k[18])
		if (U <= H && U <= D) return Ft(t, u, e.subarray(l, l + c))
		var B, L, V, A
		if ((Me(t, u, 1 + (D < H)), (u += 2), D < H)) {
			;(B = Ae(f, h, 0)), (L = f), (V = Ae(v, y, 0)), (A = v)
			var I = Ae(_, z, 0)
			Me(t, u, w - 257),
				Me(t, u + 5, S - 1),
				Me(t, u + 10, Z - 4),
				(u += 14)
			for (var b = 0; b < Z; ++b) Me(t, u + 3 * b, _[Dr[b]])
			u += 3 * Z
			for (var M = [g, C], O = 0; O < 2; ++O)
				for (var R = M[O], b = 0; b < R.length; ++b) {
					var K = R[b] & 31
					Me(t, u, I[K]),
						(u += _[K]),
						K > 15 &&
							(Me(t, u, (R[b] >>> 5) & 127), (u += R[b] >>> 12))
				}
		} else (B = Wo), (L = Oe), (V = Go), (A = ht)
		for (var b = 0; b < a; ++b)
			if (i[b] > 255) {
				var K = (i[b] >>> 18) & 31
				ut(t, u, B[K + 257]),
					(u += L[K + 257]),
					K > 7 && (Me(t, u, (i[b] >>> 23) & 31), (u += _t[K]))
				var J = i[b] & 31
				ut(t, u, V[J]),
					(u += A[J]),
					J > 3 && (ut(t, u, (i[b] >>> 5) & 8191), (u += Bt[J]))
			} else ut(t, u, B[i[b]]), (u += L[i[b]])
		return ut(t, u, B[256]), u + L[256]
	},
	Zo = new ft([
		65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560,
		2117632,
	]),
	Yo = new ae(0),
	zo = function (e, t, r, i, n, o) {
		var s = e.length,
			a = new ae(i + s + 5 * (1 + Math.floor(s / 7e3)) + n),
			l = a.subarray(i, a.length - n),
			c = 0
		if (!t || s < 8)
			for (var u = 0; u <= s; u += 65535) {
				var d = u + 65535
				d < s
					? (c = Ft(l, c, e.subarray(u, d)))
					: ((l[u] = o), (c = Ft(l, c, e.subarray(u, s))))
			}
		else {
			for (
				var f = Zo[t - 1],
					h = f >>> 13,
					p = f & 8191,
					v = (1 << r) - 1,
					y = new le(32768),
					m = new le(v + 1),
					g = Math.ceil(r / 3),
					w = 2 * g,
					N = function (q) {
						return (e[q] ^ (e[q + 1] << g) ^ (e[q + 2] << w)) & v
					},
					C = new ft(25e3),
					S = new le(288),
					k = new le(32),
					b = 0,
					F = 0,
					u = 0,
					_ = 0,
					z = 0,
					Z = 0;
				u < s;
				++u
			) {
				var U = N(u),
					H = u & 32767,
					D = m[U]
				if (((y[H] = D), (m[U] = H), z <= u)) {
					var B = s - u
					if ((b > 7e3 || _ > 24576) && B > 423) {
						;(c = ji(e, l, 0, C, S, k, F, _, Z, u - Z, c)),
							(_ = b = F = 0),
							(Z = u)
						for (var L = 0; L < 286; ++L) S[L] = 0
						for (var L = 0; L < 30; ++L) k[L] = 0
					}
					var V = 2,
						A = 0,
						I = p,
						M = (H - D) & 32767
					if (B > 2 && U == N(u - M))
						for (
							var O = Math.min(h, B) - 1,
								R = Math.min(32767, u),
								K = Math.min(258, B);
							M <= R && --I && H != D;

						) {
							if (e[u + V] == e[u + V - M]) {
								for (
									var J = 0;
									J < K && e[u + J] == e[u + J - M];
									++J
								);
								if (J > V) {
									if (((V = J), (A = M), J > O)) break
									for (
										var Ce = Math.min(M, J - 2),
											Se = 0,
											L = 0;
										L < Ce;
										++L
									) {
										var se = (u - M + L + 32768) & 32767,
											he = y[se],
											be = (se - he + 32768) & 32767
										be > Se && ((Se = be), (D = se))
									}
								}
							}
							;(H = D), (D = y[H]), (M += (H - D + 32768) & 32767)
						}
					if (A) {
						C[_++] = 268435456 | (xr[V] << 18) | Ki[A]
						var x = xr[V] & 31,
							te = Ki[A] & 31
						;(F += _t[x] + Bt[te]),
							++S[257 + x],
							++k[te],
							(z = u + V),
							++b
					} else (C[_++] = e[u]), ++S[e[u]]
				}
			}
			;(c = ji(e, l, o, C, S, k, F, _, Z, u - Z, c)),
				o || (c = Ft(l, c, Yo))
		}
		return _r(a, 0, i + Fr(c) + n)
	},
	Ko = function () {
		var e = 1,
			t = 0
		return {
			p: function (r) {
				for (var i = e, n = t, o = r.length, s = 0; s != o; ) {
					for (var a = Math.min(s + 5552, o); s < a; ++s)
						(i += r[s]), (n += i)
					;(i %= 65521), (n %= 65521)
				}
				;(e = i), (t = n)
			},
			d: function () {
				return (
					(((e >>> 8) << 16) | ((t & 255) << 8) | (t >>> 8)) +
					((e & 255) << 23) * 2
				)
			},
		}
	},
	Xo = function (e, t, r, i, n) {
		return zo(
			e,
			t.level == null ? 6 : t.level,
			t.mem == null
				? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5)
				: 12 + t.mem,
			r,
			i,
			!n,
		)
	},
	jo = function (e, t, r) {
		for (; r; ++t) (e[t] = r), (r >>>= 8)
	},
	Qo = function (e, t) {
		var r = t.level,
			i = r == 0 ? 0 : r < 6 ? 1 : r == 9 ? 3 : 2
		;(e[0] = 120), (e[1] = (i << 6) | (i ? 32 - 2 * i : 1))
	},
	Jo = function (e) {
		if ((e[0] & 15) != 8 || e[0] >>> 4 > 7 || ((e[0] << 8) | e[1]) % 31)
			throw 'invalid zlib data'
		if (e[1] & 32)
			throw 'invalid zlib data: preset dictionaries not supported'
	}
function en(e, t) {
	t === void 0 && (t = {})
	var r = Ko()
	r.p(e)
	var i = Xo(e, t, 2, 4)
	return Qo(i, t), jo(i, i.length - 4, r.d()), i
}
function tn(e, t) {
	return Ho((Jo(e), e.subarray(2, -4)), t)
}
function Pt(e, t) {
	var r = e.length
	if (!t && typeof TextEncoder < 'u') return new TextEncoder().encode(e)
	for (
		var i = new ae(e.length + (e.length >>> 1)),
			n = 0,
			o = function (c) {
				i[n++] = c
			},
			s = 0;
		s < r;
		++s
	) {
		if (n + 5 > i.length) {
			var a = new ae(n + 8 + ((r - s) << 1))
			a.set(i), (i = a)
		}
		var l = e.charCodeAt(s)
		l < 128 || t
			? o(l)
			: l < 2048
			? (o(192 | (l >>> 6)), o(128 | (l & 63)))
			: l > 55295 && l < 57344
			? ((l = (65536 + (l & (1023 << 10))) | (e.charCodeAt(++s) & 1023)),
			  o(240 | (l >>> 18)),
			  o(128 | ((l >>> 12) & 63)),
			  o(128 | ((l >>> 6) & 63)),
			  o(128 | (l & 63)))
			: (o(224 | (l >>> 12)),
			  o(128 | ((l >>> 6) & 63)),
			  o(128 | (l & 63)))
	}
	return _r(i, 0, n)
}
function Wt(e, t) {
	var r = ''
	if (!t && typeof TextDecoder < 'u') return new TextDecoder().decode(e)
	for (var i = 0; i < e.length; ) {
		var n = e[i++]
		n < 128 || t
			? (r += String.fromCharCode(n))
			: n < 224
			? (r += String.fromCharCode(((n & 31) << 6) | (e[i++] & 63)))
			: n < 240
			? (r += String.fromCharCode(
					((n & 15) << 12) | ((e[i++] & 63) << 6) | (e[i++] & 63),
			  ))
			: ((n =
					(((n & 15) << 18) |
						((e[i++] & 63) << 12) |
						((e[i++] & 63) << 6) |
						(e[i++] & 63)) -
					65536),
			  (r += String.fromCharCode(55296 | (n >> 10), 56320 | (n & 1023))))
	}
	return r
}
var pt = 'v1'
var qo = (e) => {
	let t = Object.assign(Object.assign({}, e), { v: pt })
	return Wt(en(Pt(JSON.stringify(t))), !0)
}
var $o = (e) => {
	if (typeof e != 'string') return e
	try {
		let t = JSON.parse(e)
		if (t.timestamp) return t
	} catch {}
	try {
		let t = JSON.parse(Wt(tn(Pt(e, !0))))
		if (t.v === pt) return t
		throw new Error(
			`These events were packed with packer ${t.v} which is incompatible with current packer ${pt}.`,
		)
	} catch (t) {
		throw (console.error(t), new Error('Unknown data format.'))
	}
}
var Le = class {
		constructor(t) {
			;(this.fileName = t.fileName || ''),
				(this.functionName = t.functionName || ''),
				(this.lineNumber = t.lineNumber),
				(this.columnNumber = t.columnNumber)
		}
		toString() {
			let t = this.lineNumber || '',
				r = this.columnNumber || ''
			return this.functionName
				? `${this.functionName} (${this.fileName}:${t}:${r})`
				: `${this.fileName}:${t}:${r}`
		}
	},
	es = /(^|@)\S+:\d+/,
	rn = /^\s*at .*(\S+:\d+|\(native\))/m,
	ts = /^(eval@)?(\[native code])?$/,
	Br = {
		parse: function (e) {
			if (!e) return []
			if (typeof e.stacktrace < 'u' || typeof e['opera#sourceloc'] < 'u')
				return this.parseOpera(e)
			if (e.stack && e.stack.match(rn)) return this.parseV8OrIE(e)
			if (e.stack) return this.parseFFOrSafari(e)
			throw new Error('Cannot parse given Error object')
		},
		extractLocation: function (e) {
			if (e.indexOf(':') === -1) return [e]
			let r = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g, ''))
			if (!r) throw new Error(`Cannot parse given url: ${e}`)
			return [r[1], r[2] || void 0, r[3] || void 0]
		},
		parseV8OrIE: function (e) {
			return e.stack
				.split(
					`
`,
				)
				.filter(function (r) {
					return !!r.match(rn)
				}, this)
				.map(function (r) {
					r.indexOf('(eval ') > -1 &&
						(r = r
							.replace(/eval code/g, 'eval')
							.replace(/(\(eval at [^()]*)|(\),.*$)/g, ''))
					let i = r.replace(/^\s+/, '').replace(/\(eval code/g, '('),
						n = i.match(/ (\((.+):(\d+):(\d+)\)$)/)
					i = n ? i.replace(n[0], '') : i
					let o = i.split(/\s+/).slice(1),
						s = this.extractLocation(n ? n[1] : o.pop()),
						a = o.join(' ') || void 0,
						l =
							['eval', '<anonymous>'].indexOf(s[0]) > -1
								? void 0
								: s[0]
					return new Le({
						functionName: a,
						fileName: l,
						lineNumber: s[1],
						columnNumber: s[2],
					})
				}, this)
		},
		parseFFOrSafari: function (e) {
			return e.stack
				.split(
					`
`,
				)
				.filter(function (r) {
					return !r.match(ts)
				}, this)
				.map(function (r) {
					if (
						(r.indexOf(' > eval') > -1 &&
							(r = r.replace(
								/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
								':$1',
							)),
						r.indexOf('@') === -1 && r.indexOf(':') === -1)
					)
						return new Le({ functionName: r })
					{
						let i = /((.*".+"[^@]*)?[^@]*)(?:@)/,
							n = r.match(i),
							o = n && n[1] ? n[1] : void 0,
							s = this.extractLocation(r.replace(i, ''))
						return new Le({
							functionName: o,
							fileName: s[0],
							lineNumber: s[1],
							columnNumber: s[2],
						})
					}
				}, this)
		},
		parseOpera: function (e) {
			return !e.stacktrace ||
				(e.message.indexOf(`
`) > -1 &&
					e.message.split(`
`).length >
						e.stacktrace.split(`
`).length)
				? this.parseOpera9(e)
				: e.stack
				? this.parseOpera11(e)
				: this.parseOpera10(e)
		},
		parseOpera9: function (e) {
			let t = /Line (\d+).*script (?:in )?(\S+)/i,
				r = e.message.split(`
`),
				i = []
			for (let n = 2, o = r.length; n < o; n += 2) {
				let s = t.exec(r[n])
				s &&
					i.push(
						new Le({
							fileName: s[2],
							lineNumber: parseFloat(s[1]),
						}),
					)
			}
			return i
		},
		parseOpera10: function (e) {
			let t =
					/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
				r = e.stacktrace.split(`
`),
				i = []
			for (let n = 0, o = r.length; n < o; n += 2) {
				let s = t.exec(r[n])
				s &&
					i.push(
						new Le({
							functionName: s[3] || void 0,
							fileName: s[2],
							lineNumber: parseFloat(s[1]),
						}),
					)
			}
			return i
		},
		parseOpera11: function (e) {
			return e.stack
				.split(
					`
`,
				)
				.filter(function (r) {
					return !!r.match(es) && !r.match(/^Error created at/)
				}, this)
				.map(function (r) {
					let i = r.split('@'),
						n = this.extractLocation(i.pop()),
						s =
							(i.shift() || '')
								.replace(/<anonymous function(: (\w+))?>/, '$2')
								.replace(/\([^)]*\)/g, '') || void 0
					return new Le({
						functionName: s,
						fileName: n[0],
						lineNumber: n[1],
						columnNumber: n[2],
					})
				}, this)
		},
	}
function rs(e) {
	if (!e || !e.outerHTML) return ''
	let t = ''
	for (; e.parentElement; ) {
		let r = e.localName
		if (!r) break
		r = r.toLowerCase()
		let i = e.parentElement,
			n = []
		if (i.children && i.children.length > 0)
			for (let o = 0; o < i.children.length; o++) {
				let s = i.children[o]
				s.localName &&
					s.localName.toLowerCase &&
					s.localName.toLowerCase() === r &&
					n.push(s)
			}
		n.length > 1 && (r += `:eq(${n.indexOf(e)})`),
			(t = r + (t ? '>' + t : '')),
			(e = i)
	}
	return t
}
function Pr(e) {
	return Object.prototype.toString.call(e) === '[object Object]'
}
function nn(e, t) {
	if (t === 0) return !0
	let r = Object.keys(e)
	for (let i of r) if (Pr(e[i]) && nn(e[i], t - 1)) return !0
	return !1
}
function Vt(e, t) {
	let r = { numOfKeysLimit: 50, depthOfLimit: 4 }
	Object.assign(r, t)
	let i = [],
		n = []
	return JSON.stringify(e, function (a, l) {
		if (i.length > 0) {
			let c = i.indexOf(this)
			~c ? i.splice(c + 1) : i.push(this),
				~c ? n.splice(c, 1 / 0, a) : n.push(a),
				~i.indexOf(l) &&
					(i[0] === l
						? (l = '[Circular ~]')
						: (l =
								'[Circular ~.' +
								n.slice(0, i.indexOf(l)).join('.') +
								']'))
		} else i.push(l)
		if (l === null) return l
		if (l === void 0) return 'undefined'
		if (o(l)) return s(l)
		if (l instanceof Event) {
			let c = {}
			for (let u in l) {
				let d = l[u]
				Array.isArray(d)
					? (c[u] = rs(d.length ? d[0] : null))
					: (c[u] = d)
			}
			return c
		} else {
			if (l instanceof Node)
				return l instanceof HTMLElement
					? l
						? l.outerHTML
						: ''
					: l.nodeName
			if (l instanceof Error)
				return l.stack
					? l.stack +
							`
End of stack for Error object`
					: l.name + ': ' + l.message
		}
		return l
	})
	function o(a) {
		return !!(
			(Pr(a) && Object.keys(a).length > r.numOfKeysLimit) ||
			typeof a == 'function' ||
			(Pr(a) && nn(a, r.depthOfLimit))
		)
	}
	function s(a) {
		let l = a.toString()
		return (
			r.stringLengthLimit &&
				l.length > r.stringLengthLimit &&
				(l = `${l.slice(0, r.stringLengthLimit)}...`),
			l
		)
	}
}
var on = {
	level: [
		'assert',
		'clear',
		'count',
		'countReset',
		'debug',
		'dir',
		'dirxml',
		'error',
		'group',
		'groupCollapsed',
		'groupEnd',
		'info',
		'log',
		'table',
		'time',
		'timeEnd',
		'timeLog',
		'trace',
		'warn',
	],
	lengthThreshold: 1e3,
	logger: 'console',
}
function is(e, t, r) {
	let i = r ? Object.assign({}, on, r) : on,
		n = i.logger
	if (!n) return () => {}
	let o
	typeof n == 'string' ? (o = t[n]) : (o = n)
	let s = 0,
		a = []
	if (i.level.includes('error') && window) {
		let c = (u) => {
			let d = u.message,
				f = u.error,
				h = Br.parse(f).map((v) => v.toString()),
				p = [Vt(d, i.stringifyOptions)]
			e({ level: 'error', trace: h, payload: p })
		}
		window.addEventListener('error', c),
			a.push(() => {
				window && window.removeEventListener('error', c)
			})
	}
	for (let c of i.level) a.push(l(o, c))
	return () => {
		a.forEach((c) => c())
	}
	function l(c, u) {
		return c[u]
			? ue(c, u, (d) => (...f) => {
					d.apply(this, f)
					try {
						let h = Br.parse(new Error())
								.map((v) => v.toString())
								.splice(1),
							p = f.map((v) => Vt(v, i.stringifyOptions))
						s++,
							s < i.lengthThreshold
								? e({ level: u, trace: h, payload: p })
								: s === i.lengthThreshold &&
								  e({
										level: 'warn',
										trace: [],
										payload: [
											Vt(
												'The number of log records reached the threshold.',
											),
										],
								  })
					} catch (h) {
						d('rrweb logger error:', h, ...f)
					}
			  })
			: () => {}
	}
}
var Gt = 'rrweb/console@1',
	ns = (e) => ({ name: Gt, observer: is, options: e })
var Ut = '__rrweb_original__',
	os = {
		level: [
			'assert',
			'clear',
			'count',
			'countReset',
			'debug',
			'dir',
			'dirxml',
			'error',
			'group',
			'groupCollapsed',
			'groupEnd',
			'info',
			'log',
			'table',
			'time',
			'timeEnd',
			'timeLog',
			'trace',
			'warn',
		],
		replayLogger: void 0,
	},
	Wr = class {
		constructor(t) {
			this.config = Object.assign(os, t)
		}
		getConsoleLogger() {
			let t = {}
			for (let r of this.config.level)
				r === 'trace'
					? (t[r] = (i) => {
							;(console.log[Ut] ? console.log[Ut] : console.log)(
								...i.payload.map((o) => JSON.parse(o)),
								this.formatMessage(i),
							)
					  })
					: (t[r] = (i) => {
							;(console[r][Ut] ? console[r][Ut] : console[r])(
								...i.payload.map((o) => JSON.parse(o)),
								this.formatMessage(i),
							)
					  })
			return t
		}
		formatMessage(t) {
			if (t.trace.length === 0) return ''
			let r = `
	at `,
				i = r
			return (i += t.trace.join(r)), i
		}
	},
	ss = (e) => {
		let t = e?.replayLogger || new Wr(e).getConsoleLogger()
		return {
			handler(r, i, n) {
				let o = null
				if (
					(r.type === T.IncrementalSnapshot && r.data.source === E.Log
						? (o = r.data)
						: r.type === T.Plugin &&
						  r.data.plugin === Gt &&
						  (o = r.data.payload),
					o)
				)
					try {
						typeof t[o.level] == 'function' && t[o.level](o)
					} catch (s) {
						n.replayer.config.showWarning && console.warn(s)
					}
			},
		}
	}
var sn = { key: '_sid' },
	as = 'rrweb/sequential-id@1',
	ls = (e) => {
		let t = e ? Object.assign({}, sn, e) : sn,
			r = 0
		return {
			name: as,
			eventProcessor(i) {
				return Object.assign(i, { [t.key]: ++r }), i
			},
			options: t,
		}
	}
var an = { key: '_sid', warnOnMissingId: !0 },
	cs = (e) => {
		let { key: t, warnOnMissingId: r } = e ? Object.assign({}, an, e) : an,
			i = 1
		return {
			handler(n) {
				if (t in n) {
					let o = n[t]
					o !== i
						? console.error(
								`[sequential-id-plugin]: expect to get an id with value "${i}", but got "${o}"`,
						  )
						: i++
				} else
					r &&
						console.warn(
							`[sequential-id-plugin]: failed to get id in key: "${t}"`,
						)
			},
		}
	}
var Gr = {}
Jr(Gr, { default: () => Vr })
function Vr(e) {
	return {
		all: (e = e || new Map()),
		on: function (t, r) {
			var i = e.get(t)
			i ? i.push(r) : e.set(t, [r])
		},
		off: function (t, r) {
			var i = e.get(t)
			i && (r ? i.splice(i.indexOf(r) >>> 0, 1) : e.set(t, []))
		},
		emit: function (t, r) {
			var i = e.get(t)
			i &&
				i.slice().map(function (n) {
					n(r)
				}),
				(i = e.get('*')) &&
					i.slice().map(function (n) {
						n(t, r)
					})
		},
	}
}
function ln(e = window, t = document) {
	if (
		'scrollBehavior' in t.documentElement.style &&
		e.__forceSmoothScrollPolyfill__ !== !0
	)
		return
	let r = e.HTMLElement || e.Element,
		i = 468,
		n = {
			scroll: e.scroll || e.scrollTo,
			scrollBy: e.scrollBy,
			elementScroll: r.prototype.scroll || l,
			scrollIntoView: r.prototype.scrollIntoView,
		},
		o =
			e.performance && e.performance.now
				? e.performance.now.bind(e.performance)
				: Date.now
	function s(m) {
		let g = ['MSIE ', 'Trident/', 'Edge/']
		return new RegExp(g.join('|')).test(m)
	}
	let a = s(e.navigator.userAgent) ? 1 : 0
	function l(m, g) {
		;(this.scrollLeft = m), (this.scrollTop = g)
	}
	function c(m) {
		return 0.5 * (1 - Math.cos(Math.PI * m))
	}
	function u(m) {
		if (
			m === null ||
			typeof m != 'object' ||
			m.behavior === void 0 ||
			m.behavior === 'auto' ||
			m.behavior === 'instant'
		)
			return !0
		if (typeof m == 'object' && m.behavior === 'smooth') return !1
		throw new TypeError(
			'behavior member of ScrollOptions ' +
				m.behavior +
				' is not a valid value for enumeration ScrollBehavior.',
		)
	}
	function d(m, g) {
		if (g === 'Y') return m.clientHeight + a < m.scrollHeight
		if (g === 'X') return m.clientWidth + a < m.scrollWidth
	}
	function f(m, g) {
		let w = e.getComputedStyle(m, null)['overflow' + g]
		return w === 'auto' || w === 'scroll'
	}
	function h(m) {
		let g = d(m, 'Y') && f(m, 'Y'),
			w = d(m, 'X') && f(m, 'X')
		return g || w
	}
	function p(m) {
		for (; m !== t.body && h(m) === !1; ) m = m.parentNode || m.host
		return m
	}
	function v(m) {
		let g = o(),
			w,
			N,
			C,
			S = (g - m.startTime) / i
		;(S = S > 1 ? 1 : S),
			(w = c(S)),
			(N = m.startX + (m.x - m.startX) * w),
			(C = m.startY + (m.y - m.startY) * w),
			m.method.call(m.scrollable, N, C),
			(N !== m.x || C !== m.y) && e.requestAnimationFrame(v.bind(e, m))
	}
	function y(m, g, w) {
		let N,
			C,
			S,
			k,
			b = o()
		m === t.body
			? ((N = e),
			  (C = e.scrollX || e.pageXOffset),
			  (S = e.scrollY || e.pageYOffset),
			  (k = n.scroll))
			: ((N = m), (C = m.scrollLeft), (S = m.scrollTop), (k = l)),
			v({
				scrollable: N,
				method: k,
				startTime: b,
				startX: C,
				startY: S,
				x: g,
				y: w,
			})
	}
	;(e.scroll = e.scrollTo =
		function () {
			if (arguments[0] !== void 0) {
				if (u(arguments[0]) === !0) {
					n.scroll.call(
						e,
						arguments[0].left !== void 0
							? arguments[0].left
							: typeof arguments[0] != 'object'
							? arguments[0]
							: e.scrollX || e.pageXOffset,
						arguments[0].top !== void 0
							? arguments[0].top
							: arguments[1] !== void 0
							? arguments[1]
							: e.scrollY || e.pageYOffset,
					)
					return
				}
				y.call(
					e,
					t.body,
					arguments[0].left !== void 0
						? ~~arguments[0].left
						: e.scrollX || e.pageXOffset,
					arguments[0].top !== void 0
						? ~~arguments[0].top
						: e.scrollY || e.pageYOffset,
				)
			}
		}),
		(e.scrollBy = function () {
			if (arguments[0] !== void 0) {
				if (u(arguments[0])) {
					n.scrollBy.call(
						e,
						arguments[0].left !== void 0
							? arguments[0].left
							: typeof arguments[0] != 'object'
							? arguments[0]
							: 0,
						arguments[0].top !== void 0
							? arguments[0].top
							: arguments[1] !== void 0
							? arguments[1]
							: 0,
					)
					return
				}
				y.call(
					e,
					t.body,
					~~arguments[0].left + (e.scrollX || e.pageXOffset),
					~~arguments[0].top + (e.scrollY || e.pageYOffset),
				)
			}
		}),
		(r.prototype.scroll = r.prototype.scrollTo =
			function () {
				if (arguments[0] === void 0) return
				if (u(arguments[0]) === !0) {
					if (
						typeof arguments[0] == 'number' &&
						arguments[1] === void 0
					)
						throw new SyntaxError('Value could not be converted')
					n.elementScroll.call(
						this,
						arguments[0].left !== void 0
							? ~~arguments[0].left
							: typeof arguments[0] != 'object'
							? ~~arguments[0]
							: this.scrollLeft,
						arguments[0].top !== void 0
							? ~~arguments[0].top
							: arguments[1] !== void 0
							? ~~arguments[1]
							: this.scrollTop,
					)
					return
				}
				let m = arguments[0].left,
					g = arguments[0].top
				y.call(
					this,
					this,
					typeof m > 'u' ? this.scrollLeft : ~~m,
					typeof g > 'u' ? this.scrollTop : ~~g,
				)
			}),
		(r.prototype.scrollBy = function () {
			if (arguments[0] !== void 0) {
				if (u(arguments[0]) === !0) {
					n.elementScroll.call(
						this,
						arguments[0].left !== void 0
							? ~~arguments[0].left + this.scrollLeft
							: ~~arguments[0] + this.scrollLeft,
						arguments[0].top !== void 0
							? ~~arguments[0].top + this.scrollTop
							: ~~arguments[1] + this.scrollTop,
					)
					return
				}
				this.scroll({
					left: ~~arguments[0].left + this.scrollLeft,
					top: ~~arguments[0].top + this.scrollTop,
					behavior: arguments[0].behavior,
				})
			}
		}),
		(r.prototype.scrollIntoView = function () {
			if (u(arguments[0]) === !0) {
				n.scrollIntoView.call(
					this,
					arguments[0] === void 0 ? !0 : arguments[0],
				)
				return
			}
			let m = p(this),
				g = m.getBoundingClientRect(),
				w = this.getBoundingClientRect()
			m !== t.body
				? (y.call(
						this,
						m,
						m.scrollLeft + w.left - g.left,
						m.scrollTop + w.top - g.top,
				  ),
				  e.getComputedStyle(m).position !== 'fixed' &&
						e.scrollBy({
							left: g.left,
							top: g.top,
							behavior: 'smooth',
						}))
				: e.scrollBy({ left: w.left, top: w.top, behavior: 'smooth' })
		})
}
var Ht = class {
	constructor(t = [], r) {
		;(this.timeOffset = 0),
			(this.raf = null),
			(this.actions = t),
			(this.speed = r.speed),
			(this.liveMode = r.liveMode)
	}
	addAction(t) {
		if (
			!this.actions.length ||
			this.actions[this.actions.length - 1].delay <= t.delay
		) {
			this.actions.push(t)
			return
		}
		let r = this.findActionIndex(t)
		this.actions.splice(r, 0, t)
	}
	addActions(t) {
		this.actions = this.actions.concat(t)
	}
	replaceActions(t) {
		;(this.actions.length = 0), this.actions.splice(0, 0, ...t)
	}
	start() {
		this.timeOffset = 0
		let t = performance.now(),
			r = () => {
				let i = performance.now()
				for (
					this.timeOffset += (i - t) * this.speed, t = i;
					this.actions.length;

				) {
					let n = this.actions[0]
					if (this.timeOffset >= n.delay)
						this.actions.shift(), n.doAction()
					else break
				}
				;(this.actions.length > 0 || this.liveMode) &&
					(this.raf = requestAnimationFrame(r))
			}
		this.raf = requestAnimationFrame(r)
	}
	clear() {
		this.raf && (cancelAnimationFrame(this.raf), (this.raf = null)),
			(this.actions.length = 0)
	}
	setSpeed(t) {
		this.speed = t
	}
	toggleLiveMode(t) {
		this.liveMode = t
	}
	isActive() {
		return this.raf !== null
	}
	findActionIndex(t) {
		let r = 0,
			i = this.actions.length - 1
		for (; r <= i; ) {
			let n = Math.floor((r + i) / 2)
			if (this.actions[n].delay < t.delay) r = n + 1
			else if (this.actions[n].delay > t.delay) i = n - 1
			else return n + 1
		}
		return r
	}
}
function Zt(e, t) {
	if (
		e.type === T.IncrementalSnapshot &&
		e.data.source === E.MouseMove &&
		e.data.positions &&
		e.data.positions.length
	) {
		let r = e.data.positions[0].timeOffset,
			i = e.timestamp + r
		return (e.delay = i - t), i - t
	}
	return (e.delay = e.timestamp - t), e.delay
}
function cn(e, t) {
	var r = typeof Symbol == 'function' && e[Symbol.iterator]
	if (!r) return e
	var i,
		n,
		o = r.call(e),
		s = []
	try {
		for (; (t === void 0 || t-- > 0) && !(i = o.next()).done; )
			s.push(i.value)
	} catch (a) {
		n = { error: a }
	} finally {
		try {
			i && !i.done && (r = o.return) && r.call(o)
		} finally {
			if (n) throw n.error
		}
	}
	return s
}
var je
;(function (e) {
	;(e[(e.NotStarted = 0)] = 'NotStarted'),
		(e[(e.Running = 1)] = 'Running'),
		(e[(e.Stopped = 2)] = 'Stopped')
})(je || (je = {}))
var pn = { type: 'xstate.init' }
function Ur(e) {
	return e === void 0 ? [] : [].concat(e)
}
function Fe(e) {
	return { type: 'xstate.assign', assignment: e }
}
function un(e, t) {
	return typeof (e = typeof e == 'string' && t && t[e] ? t[e] : e) == 'string'
		? { type: e }
		: typeof e == 'function'
		? { type: e.name, exec: e }
		: e
}
function Yt(e) {
	return function (t) {
		return e === t
	}
}
function mn(e) {
	return typeof e == 'string' ? { type: e } : e
}
function dn(e, t) {
	return { value: e, context: t, actions: [], changed: !1, matches: Yt(e) }
}
function fn(e, t, r) {
	var i = t,
		n = !1
	return [
		e.filter(function (o) {
			if (o.type === 'xstate.assign') {
				n = !0
				var s = Object.assign({}, i)
				return (
					typeof o.assignment == 'function'
						? (s = o.assignment(i, r))
						: Object.keys(o.assignment).forEach(function (a) {
								s[a] =
									typeof o.assignment[a] == 'function'
										? o.assignment[a](i, r)
										: o.assignment[a]
						  }),
					(i = s),
					!1
				)
			}
			return !0
		}),
		i,
		n,
	]
}
function Hr(e, t) {
	t === void 0 && (t = {})
	var r = cn(
			fn(
				Ur(e.states[e.initial].entry).map(function (s) {
					return un(s, t.actions)
				}),
				e.context,
				pn,
			),
			2,
		),
		i = r[0],
		n = r[1],
		o = {
			config: e,
			_options: t,
			initialState: {
				value: e.initial,
				actions: i,
				context: n,
				matches: Yt(e.initial),
			},
			transition: function (s, a) {
				var l,
					c,
					u =
						typeof s == 'string'
							? { value: s, context: e.context }
							: s,
					d = u.value,
					f = u.context,
					h = mn(a),
					p = e.states[d]
				if (p.on) {
					var v = Ur(p.on[h.type])
					try {
						for (
							var y = (function (D) {
									var B =
											typeof Symbol == 'function' &&
											Symbol.iterator,
										L = B && D[B],
										V = 0
									if (L) return L.call(D)
									if (D && typeof D.length == 'number')
										return {
											next: function () {
												return (
													D &&
														V >= D.length &&
														(D = void 0),
													{
														value: D && D[V++],
														done: !D,
													}
												)
											},
										}
									throw new TypeError(
										B
											? 'Object is not iterable.'
											: 'Symbol.iterator is not defined.',
									)
								})(v),
								m = y.next();
							!m.done;
							m = y.next()
						) {
							var g = m.value
							if (g === void 0) return dn(d, f)
							var w = typeof g == 'string' ? { target: g } : g,
								N = w.target,
								C = w.actions,
								S = C === void 0 ? [] : C,
								k = w.cond,
								b = N === void 0
							if (
								(k === void 0
									? function () {
											return !0
									  }
									: k)(f, h)
							) {
								var F = e.states[N ?? d],
									_ = cn(
										fn(
											(b
												? Ur(S)
												: []
														.concat(
															p.exit,
															S,
															F.entry,
														)
														.filter(function (D) {
															return D
														})
											).map(function (D) {
												return un(D, o._options.actions)
											}),
											f,
											h,
										),
										3,
									),
									z = _[0],
									Z = _[1],
									U = _[2],
									H = N ?? d
								return {
									value: H,
									context: Z,
									actions: z,
									changed: N !== d || z.length > 0 || U,
									matches: Yt(H),
								}
							}
						}
					} catch (D) {
						l = { error: D }
					} finally {
						try {
							m && !m.done && (c = y.return) && c.call(y)
						} finally {
							if (l) throw l.error
						}
					}
				}
				return dn(d, f)
			},
		}
	return o
}
var hn = function (e, t) {
	return e.actions.forEach(function (r) {
		var i = r.exec
		return i && i(e.context, t)
	})
}
function Zr(e) {
	var t = e.initialState,
		r = je.NotStarted,
		i = new Set(),
		n = {
			_machine: e,
			send: function (o) {
				r === je.Running &&
					((t = e.transition(t, o)),
					hn(t, mn(o)),
					i.forEach(function (s) {
						return s(t)
					}))
			},
			subscribe: function (o) {
				return (
					i.add(o),
					o(t),
					{
						unsubscribe: function () {
							return i.delete(o)
						},
					}
				)
			},
			start: function (o) {
				if (o) {
					var s =
						typeof o == 'object'
							? o
							: { context: e.config.context, value: o }
					t = {
						value: s.value,
						actions: [],
						context: s.context,
						matches: Yt(s.value),
					}
				}
				return (r = je.Running), hn(t, pn), n
			},
			stop: function () {
				return (r = je.Stopped), i.clear(), n
			},
			get state() {
				return t
			},
			get status() {
				return r
			},
		}
	return n
}
function us(e, t) {
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e[r]
		if (i.type === T.Meta && i.timestamp <= t) return e.slice(r)
	}
	return e
}
function gn(e, { getCastFn: t, applyEventsSynchronously: r, emitter: i }) {
	let n = Hr(
		{
			id: 'player',
			context: e,
			initial: 'paused',
			states: {
				playing: {
					on: {
						PAUSE: { target: 'paused', actions: ['pause'] },
						CAST_EVENT: { target: 'playing', actions: 'castEvent' },
						END: {
							target: 'paused',
							actions: ['resetLastPlayedEvent', 'pause'],
						},
						ADD_EVENT: { target: 'playing', actions: ['addEvent'] },
						REPLACE_EVENTS: {
							target: 'playing',
							actions: ['replaceEvents'],
						},
					},
				},
				paused: {
					on: {
						PLAY: {
							target: 'playing',
							actions: ['recordTimeOffset', 'play'],
						},
						CAST_EVENT: { target: 'paused', actions: 'castEvent' },
						TO_LIVE: { target: 'live', actions: ['startLive'] },
						ADD_EVENT: { target: 'paused', actions: ['addEvent'] },
						REPLACE_EVENTS: {
							target: 'paused',
							actions: ['replaceEvents'],
						},
					},
				},
				live: {
					on: {
						ADD_EVENT: { target: 'live', actions: ['addEvent'] },
						CAST_EVENT: { target: 'live', actions: ['castEvent'] },
					},
				},
			},
		},
		{
			actions: {
				castEvent: Fe({
					lastPlayedEvent: (o, s) =>
						s.type === 'CAST_EVENT'
							? s.payload.event
							: o.lastPlayedEvent,
				}),
				recordTimeOffset: Fe((o, s) => {
					let a = o.timeOffset
					return (
						'payload' in s &&
							'timeOffset' in s.payload &&
							(a = s.payload.timeOffset),
						Object.assign(Object.assign({}, o), {
							timeOffset: a,
							baselineTime: o.events[0].timestamp + a,
						})
					)
				}),
				play(o) {
					var s
					let {
						timer: a,
						events: l,
						baselineTime: c,
						lastPlayedEvent: u,
					} = o
					a.clear()
					for (let p of l) Zt(p, c)
					let d = us(l, c),
						f = u?.timestamp
					u?.type === T.IncrementalSnapshot &&
						u.data.source === E.MouseMove &&
						(f =
							u.timestamp +
							((s = u.data.positions[0]) === null || s === void 0
								? void 0
								: s.timeOffset)),
						c < (f || 0) && i.emit(G.PlayBack)
					let h = new Array()
					for (let p of d)
						if (!(f && f < c && (p.timestamp <= f || p === u)))
							if (p.timestamp < c) h.push(p)
							else {
								let v = t(p, !1)
								a.addAction({
									doAction: () => {
										v()
									},
									delay: p.delay,
								})
							}
					r(h), i.emit(G.Flush), a.start()
				},
				pause(o) {
					o.timer.clear()
				},
				resetLastPlayedEvent: Fe((o) =>
					Object.assign(Object.assign({}, o), {
						lastPlayedEvent: null,
					}),
				),
				startLive: Fe({
					baselineTime: (o, s) => (
						o.timer.toggleLiveMode(!0),
						o.timer.start(),
						s.type === 'TO_LIVE' && s.payload.baselineTime
							? s.payload.baselineTime
							: Date.now()
					),
				}),
				replaceEvents: Fe((o, s) => {
					let { events: a, timer: l, baselineTime: c } = o
					if (s.type === 'REPLACE_EVENTS') {
						let { events: u } = s.payload
						a.length = 0
						let d = []
						for (let f of u)
							if (
								(Zt(f, c),
								a.push(f),
								f.timestamp >= l.timeOffset + c)
							) {
								let h = t(f, !1)
								d.push({
									doAction: () => {
										h()
									},
									delay: f.delay,
								})
							}
						l.isActive() && l.replaceActions(d)
					}
					return Object.assign(Object.assign({}, o), { events: a })
				}),
				addEvent: Fe((o, s) => {
					let { baselineTime: a, timer: l, events: c } = o
					if (s.type === 'ADD_EVENT') {
						let { event: u } = s.payload
						Zt(u, a)
						let d = c.length - 1
						if (!c[d] || c[d].timestamp <= u.timestamp) c.push(u)
						else {
							let p = -1,
								v = 0
							for (; v <= d; ) {
								let y = Math.floor((v + d) / 2)
								c[y].timestamp <= u.timestamp
									? (v = y + 1)
									: (d = y - 1)
							}
							p === -1 && (p = v), c.splice(p, 0, u)
						}
						let f = u.timestamp < a,
							h = t(u, f)
						f
							? h()
							: l.isActive() &&
							  l.addAction({
									doAction: () => {
										h()
									},
									delay: u.delay,
							  })
					}
					return Object.assign(Object.assign({}, o), { events: c })
				}),
			},
		},
	)
	return Zr(n)
}
function vn(e) {
	let t = Hr(
		{
			id: 'speed',
			context: e,
			initial: 'normal',
			states: {
				normal: {
					on: {
						FAST_FORWARD: {
							target: 'skipping',
							actions: ['recordSpeed', 'setSpeed'],
						},
						SET_SPEED: { target: 'normal', actions: ['setSpeed'] },
					},
				},
				skipping: {
					on: {
						BACK_TO_NORMAL: {
							target: 'normal',
							actions: ['restoreSpeed'],
						},
						SET_SPEED: { target: 'normal', actions: ['setSpeed'] },
					},
				},
			},
		},
		{
			actions: {
				setSpeed: (r, i) => {
					'payload' in i && r.timer.setSpeed(i.payload.speed)
				},
				recordSpeed: Fe({ normalSpeed: (r) => r.timer.speed }),
				restoreSpeed: (r) => {
					r.timer.setSpeed(r.normalSpeed)
				},
			},
		},
	)
	return Zr(t)
}
var yn = (e) => [
	'noscript { display: none !important; }',
	`.${e} { background: currentColor; border-radius: 5px; }`,
	`.${e}:hover::after {content: 'Redacted'; color: white; background: black; text-align: center; width: 100%; display: block;}`,
]
var In = new Map()
function Yr(e, t) {
	let r = In.get(e)
	return (
		r || ((r = new Map()), In.set(e, r)), r.has(t) || r.set(t, []), r.get(t)
	)
}
function Ie(e, t, r) {
	return (i) =>
		fe(this, void 0, void 0, function* () {
			if (i && typeof i == 'object' && 'rr_type' in i)
				if (
					(r && (r.isUnchanged = !1),
					i.rr_type === 'ImageBitmap' && 'args' in i)
				) {
					let n = yield Ie(e, t, r)(i.args)
					return yield createImageBitmap.apply(null, n)
				} else if ('index' in i) {
					if (r || t === null) return i
					let { rr_type: n, index: o } = i
					return Yr(t, n)[o]
				} else if ('args' in i) {
					let { rr_type: n, args: o } = i,
						s = window[n]
					return new s(...(yield Promise.all(o.map(Ie(e, t, r)))))
				} else {
					if ('base64' in i) return Ei(i.base64)
					if ('src' in i) {
						let n = e.get(i.src)
						if (n) return n
						{
							let o = new Image()
							return (o.src = i.src), e.set(i.src, o), o
						}
					} else if ('data' in i && i.rr_type === 'Blob') {
						let n = yield Promise.all(i.data.map(Ie(e, t, r)))
						return new Blob(n, { type: i.type })
					}
				}
			else if (Array.isArray(i))
				return yield Promise.all(i.map(Ie(e, t, r)))
			return i
		})
}
function ds(e, t) {
	try {
		return t === de.WebGL
			? e.getContext('webgl') || e.getContext('experimental-webgl')
			: e.getContext('webgl2')
	} catch {
		return null
	}
}
var fs = [
	'WebGLActiveInfo',
	'WebGLBuffer',
	'WebGLFramebuffer',
	'WebGLProgram',
	'WebGLRenderbuffer',
	'WebGLShader',
	'WebGLShaderPrecisionFormat',
	'WebGLTexture',
	'WebGLUniformLocation',
	'WebGLVertexArrayObject',
]
function hs(e, t) {
	if (!t?.constructor) return
	let { name: r } = t.constructor
	if (!fs.includes(r)) return
	let i = Yr(e, r)
	i.includes(t) || i.push(t)
}
function Cn({ mutation: e, target: t, type: r, imageMap: i, errorHandler: n }) {
	return fe(this, void 0, void 0, function* () {
		try {
			let o = ds(t, r)
			if (!o) return
			if (e.setter) {
				o[e.property] = e.args[0]
				return
			}
			let s = o[e.property],
				a = yield Promise.all(e.args.map(Ie(i, o))),
				l = s.apply(o, a)
			hs(o, l)
			let c = !1
		} catch (o) {
			n(e, o)
		}
	})
}
function Sn({
	event: e,
	mutation: t,
	target: r,
	imageMap: i,
	errorHandler: n,
}) {
	return fe(this, void 0, void 0, function* () {
		try {
			let o = r.getContext('2d')
			if (t.setter) {
				o[t.property] = t.args[0]
				return
			}
			let s = o[t.property]
			if (t.property === 'drawImage' && typeof t.args[0] == 'string')
				i.get(e), s.apply(o, t.args)
			else {
				let a = yield Promise.all(t.args.map(Ie(i, o)))
				s.apply(o, a)
			}
		} catch (o) {
			n(t, o)
		}
	})
}
function zr({
	event: e,
	mutation: t,
	target: r,
	imageMap: i,
	canvasEventMap: n,
	errorHandler: o,
}) {
	return fe(this, void 0, void 0, function* () {
		try {
			let s = n.get(e) || t,
				a = 'commands' in s ? s.commands : [s]
			if ([de.WebGL, de.WebGL2].includes(t.type)) {
				for (let l = 0; l < a.length; l++) {
					let c = a[l]
					yield Cn({
						mutation: c,
						type: t.type,
						target: r,
						imageMap: i,
						errorHandler: o,
					})
				}
				return
			}
			for (let l = 0; l < a.length; l++) {
				let c = a[l]
				yield Sn({
					event: e,
					mutation: c,
					target: r,
					imageMap: i,
					errorHandler: o,
				})
			}
		} catch (s) {
			o(t, s)
		}
	})
}
var bn = 10 * 1e3,
	An = 5 * 1e3,
	Nn = 1 * 1e3,
	wn = 60 * 60 * 1e3,
	ps = Vr || Gr,
	Kr = '[replayer]',
	Xr = { duration: 500, lineCap: 'round', lineWidth: 3, strokeStyle: 'red' }
function jr(e) {
	return (
		e.type == T.IncrementalSnapshot &&
		(e.data.source == E.TouchMove ||
			(e.data.source == E.MouseInteraction &&
				e.data.type == ie.TouchStart))
	)
}
var Qr = class {
	constructor(t, r) {
		if (
			((this.usingVirtualDom = !1),
			(this.virtualDom = new Ee()),
			(this.mouseTail = null),
			(this.tailPositions = []),
			(this.emitter = ps()),
			(this.activityIntervals = []),
			(this.legacy_missingNodeRetryMap = {}),
			(this.cache = ir()),
			(this.imageMap = new Map()),
			(this.canvasEventMap = new Map()),
			(this.mirror = gt()),
			(this.styleMirror = new Ve()),
			(this.firstFullSnapshot = null),
			(this.newDocumentQueue = []),
			(this.mousePos = null),
			(this.touchActive = null),
			(this.lastSelectionData = null),
			(this.constructedStyleMutations = []),
			(this.adoptedStyleSheets = []),
			(this.handleResize = (a) => {
				this.iframe.style.display = 'inherit'
				for (let l of [this.mouseTail, this.iframe])
					!l ||
						(l.setAttribute('width', String(a.width)),
						l.setAttribute('height', String(a.height)))
			}),
			(this.applyEventsSynchronously = (a) => {
				for (let l of a) {
					switch (l.type) {
						case T.DomContentLoaded:
						case T.Load:
						case T.Custom:
							continue
						case T.FullSnapshot:
						case T.Meta:
						case T.Plugin:
						case T.IncrementalSnapshot:
							break
					}
					this.getCastFn(l, !0)()
				}
				this.touchActive === !0
					? this.mouse.classList.add('touch-active')
					: this.touchActive === !1 &&
					  this.mouse.classList.remove('touch-active'),
					(this.touchActive = null)
			}),
			(this.getCastFn = (a, l = !1) => {
				let c
				switch (a.type) {
					case T.DomContentLoaded:
					case T.Load:
						break
					case T.Custom:
						c = () => {
							this.emitter.emit(G.CustomEvent, a)
						}
						break
					case T.Meta:
						c = () =>
							this.emitter.emit(G.Resize, {
								width: a.data.width,
								height: a.data.height,
							})
						break
					case T.FullSnapshot:
						c = () => {
							var d
							if (this.firstFullSnapshot) {
								if (this.firstFullSnapshot === a) {
									this.firstFullSnapshot = !0
									return
								}
							} else this.firstFullSnapshot = !0
							this.rebuildFullSnapshot(a, l),
								(d = this.iframe.contentWindow) === null ||
									d === void 0 ||
									d.scrollTo(a.data.initialOffset),
								this.styleMirror.reset()
						}
						break
					case T.IncrementalSnapshot:
						c = () => {
							if (
								(this.applyIncremental(a, l),
								!l &&
									(this.handleInactivity(a.timestamp),
									a === this.nextUserInteractionEvent &&
										((this.nextUserInteractionEvent = null),
										this.backToNormal()),
									this.config.skipInactive &&
										!this.nextUserInteractionEvent))
							) {
								for (let d of this.service.state.context.events)
									if (
										!(d.timestamp <= a.timestamp) &&
										this.isUserInteraction(d)
									) {
										d.delay - a.delay >
											bn *
												this.speedService.state.context
													.timer.speed &&
											(this.nextUserInteractionEvent = d)
										break
									}
								if (this.nextUserInteractionEvent) {
									let d =
											this.nextUserInteractionEvent
												.delay - a.delay,
										f = {
											speed: Math.min(
												Math.round(d / An),
												this.config.maxSpeed,
											),
										}
									this.speedService.send({
										type: 'FAST_FORWARD',
										payload: f,
									}),
										this.emitter.emit(G.SkipStart, f)
								}
							}
						}
						break
				}
				return () => {
					c && c()
					for (let f of this.config.plugins || [])
						f.handler && f.handler(a, l, { replayer: this })
					this.service.send({
						type: 'CAST_EVENT',
						payload: { event: a },
					})
					let d = this.service.state.context.events.length - 1
					if (a === this.service.state.context.events[d]) {
						let f = () => {
							d < this.service.state.context.events.length - 1 ||
								(this.backToNormal(),
								this.service.send('END'),
								this.emitter.emit(G.Finish))
						}
						a.type === T.IncrementalSnapshot &&
						a.data.source === E.MouseMove &&
						a.data.positions.length
							? setTimeout(() => {
									f()
							  }, Math.max(0, -a.data.positions[0].timeOffset + 50))
							: f()
					}
					this.emitter.emit(G.EventCast, a)
				}
			}),
			!r?.liveMode && t.length < 2)
		)
			throw new Error('Replayer need at least 2 events.')
		let i = {
			speed: 1,
			maxSpeed: 360,
			root: document.body,
			loadTimeout: 0,
			skipInactive: !1,
			showWarning: !0,
			showDebug: !1,
			blockClass: 'highlight-block',
			liveMode: !1,
			insertStyleRules: [],
			triggerFocus: !0,
			UNSAFE_replayCanvas: !1,
			pauseAnimation: !0,
			mouseTail: Xr,
			useVirtualDom: !0,
			inactiveThreshold: 0.02,
			inactiveSkipTime: An,
		}
		;(this.config = Object.assign({}, i, r)),
			(this.handleResize = this.handleResize.bind(this)),
			(this.getCastFn = this.getCastFn.bind(this)),
			(this.applyEventsSynchronously =
				this.applyEventsSynchronously.bind(this)),
			this.emitter.on(G.Resize, this.handleResize),
			this.setupDom()
		for (let a of this.config.plugins || [])
			a.getMirror && a.getMirror({ nodeMirror: this.mirror })
		this.emitter.on(G.Flush, () => {
			if (this.usingVirtualDom) {
				let a = {
					mirror: this.mirror,
					applyCanvas: (l, c, u) => {
						zr({
							event: l,
							mutation: c,
							target: u,
							imageMap: this.imageMap,
							canvasEventMap: this.canvasEventMap,
							errorHandler:
								this.warnCanvasMutationFailed.bind(this),
						})
					},
					applyInput: this.applyInput.bind(this),
					applyScroll: this.applyScroll.bind(this),
					applyStyleSheetMutation: (l, c) => {
						l.source === E.StyleSheetRule
							? this.applyStyleSheetRule(l, c)
							: l.source === E.StyleDeclaration &&
							  this.applyStyleDeclaration(l, c)
					},
				}
				if (
					(this.iframe.contentDocument &&
						ve(
							this.iframe.contentDocument,
							this.virtualDom,
							a,
							this.virtualDom.mirror,
						),
					this.virtualDom.destroyTree(),
					(this.usingVirtualDom = !1),
					Object.keys(this.legacy_missingNodeRetryMap).length)
				)
					for (let l in this.legacy_missingNodeRetryMap)
						try {
							let c = this.legacy_missingNodeRetryMap[l],
								u = Lt(
									c.node,
									this.mirror,
									this.virtualDom.mirror,
								)
							ve(u, c.node, a, this.virtualDom.mirror),
								(c.node = u)
						} catch (c) {
							this.config.showWarning && console.warn(c)
						}
				this.constructedStyleMutations.forEach((l) => {
					this.applyStyleSheetMutation(l)
				}),
					(this.constructedStyleMutations = []),
					this.adoptedStyleSheets.forEach((l) => {
						this.applyAdoptedStyleSheet(l)
					}),
					(this.adoptedStyleSheets = [])
			}
			this.mousePos &&
				(this.moveAndHover(
					this.mousePos.x,
					this.mousePos.y,
					this.mousePos.id,
					!0,
					this.mousePos.debugData,
				),
				(this.mousePos = null)),
				this.lastSelectionData &&
					(this.applySelection(this.lastSelectionData),
					(this.lastSelectionData = null))
		}),
			this.emitter.on(G.PlayBack, () => {
				;(this.firstFullSnapshot = null),
					this.mirror.reset(),
					this.styleMirror.reset()
			})
		let n = new Ht([], {
			speed: this.config.speed,
			liveMode: this.config.liveMode,
		})
		;(this.service = gn(
			{
				events: t
					.map((a) => (r && r.unpackFn ? r.unpackFn(a) : a))
					.sort((a, l) => a.timestamp - l.timestamp),
				timer: n,
				timeOffset: 0,
				baselineTime: 0,
				lastPlayedEvent: null,
			},
			{
				getCastFn: this.getCastFn,
				applyEventsSynchronously: this.applyEventsSynchronously,
				emitter: this.emitter,
			},
		)),
			this.service.start(),
			this.service.subscribe((a) => {
				this.emitter.emit(G.StateChange, { player: a })
			}),
			(this.speedService = vn({ normalSpeed: -1, timer: n })),
			this.speedService.start(),
			this.speedService.subscribe((a) => {
				this.emitter.emit(G.StateChange, { speed: a })
			})
		let o = this.service.state.context.events.find(
				(a) => a.type === T.Meta,
			),
			s = this.service.state.context.events.find(
				(a) => a.type === T.FullSnapshot,
			)
		if (o) {
			let { width: a, height: l } = o.data
			setTimeout(() => {
				this.emitter.emit(G.Resize, { width: a, height: l })
			}, 0)
		}
		s &&
			setTimeout(() => {
				var a
				this.firstFullSnapshot ||
					((this.firstFullSnapshot = s),
					this.rebuildFullSnapshot(s),
					(a = this.iframe.contentWindow) === null ||
						a === void 0 ||
						a.scrollTo(s.data.initialOffset))
			}, 1),
			this.service.state.context.events.find(jr) &&
				this.mouse.classList.add('touch-device')
	}
	get timer() {
		return this.service.state.context.timer
	}
	on(t, r) {
		return this.emitter.on(t, r), this
	}
	off(t, r) {
		return this.emitter.off(t, r), this
	}
	setConfig(t) {
		Object.keys(t).forEach((r) => {
			t[r], (this.config[r] = t[r])
		}),
			this.config.skipInactive || this.backToNormal(),
			typeof t.speed < 'u' &&
				this.speedService.send({
					type: 'SET_SPEED',
					payload: { speed: t.speed },
				}),
			typeof t.mouseTail < 'u' &&
				(t.mouseTail === !1
					? this.mouseTail && (this.mouseTail.style.display = 'none')
					: (this.mouseTail ||
							((this.mouseTail =
								document.createElement('canvas')),
							(this.mouseTail.width = Number.parseFloat(
								this.iframe.width,
							)),
							(this.mouseTail.height = Number.parseFloat(
								this.iframe.height,
							)),
							this.mouseTail.classList.add('replayer-mouse-tail'),
							this.wrapper.insertBefore(
								this.mouseTail,
								this.iframe,
							)),
					  (this.mouseTail.style.display = 'inherit')))
	}
	getActivityIntervals() {
		if (this.activityIntervals.length == 0) {
			let t = [],
				r = this.getMetaData(),
				i = [
					{ timestamp: r.startTime },
					...this.service.state.context.events.filter((s) =>
						this.isUserInteraction(s),
					),
					{ timestamp: r.endTime },
				]
			for (let s = 1; s < i.length; s++) {
				let a = i[s - 1],
					l = i[s]
				l.timestamp - a.timestamp > bn
					? t.push({
							startTime: a.timestamp,
							endTime: l.timestamp,
							duration: l.timestamp - a.timestamp,
							active: !1,
					  })
					: t.push({
							startTime: a.timestamp,
							endTime: l.timestamp,
							duration: l.timestamp - a.timestamp,
							active: !0,
					  })
			}
			let n = [],
				o = t[0]
			for (let s = 1; s < t.length; s++)
				t[s].active != t[s - 1].active &&
					(n.push({
						startTime: o.startTime,
						endTime: t[s - 1].endTime,
						duration: t[s - 1].endTime - o.startTime,
						active: t[s - 1].active,
					}),
					(o = t[s]))
			o &&
				t.length > 0 &&
				n.push({
					startTime: o.startTime,
					endTime: t[t.length - 1].endTime,
					duration: t[t.length - 1].endTime - o.startTime,
					active: t[t.length - 1].active,
				}),
				(o = n[0])
			for (let s = 1; s < n.length; s++)
				((!n[s].active &&
					n[s].duration >
						this.config.inactiveThreshold * r.totalTime) ||
					(!n[s - 1].active &&
						n[s - 1].duration >
							this.config.inactiveThreshold * r.totalTime)) &&
					(this.activityIntervals.push({
						startTime: o.startTime,
						endTime: n[s - 1].endTime,
						duration: n[s - 1].endTime - o.startTime,
						active: n[s - 1].active,
					}),
					(o = n[s]))
			o &&
				n.length > 0 &&
				this.activityIntervals.push({
					startTime: o.startTime,
					endTime: n[n.length - 1].endTime,
					duration: n[n.length - 1].endTime - o.startTime,
					active: n[n.length - 1].active,
				})
		}
		return this.activityIntervals
	}
	getMetaData() {
		let t = this.service.state.context.events[0],
			r =
				this.service.state.context.events[
					this.service.state.context.events.length - 1
				]
		return {
			startTime: t.timestamp,
			endTime: r.timestamp,
			totalTime: r.timestamp - t.timestamp,
		}
	}
	getCurrentTime() {
		return this.timer.timeOffset + this.getTimeOffset()
	}
	getTimeOffset() {
		let { baselineTime: t, events: r } = this.service.state.context
		return t - r[0].timestamp
	}
	getMirror() {
		return this.mirror
	}
	play(t = 0) {
		var r, i
		this.service.state.matches('paused')
			? this.service.send({ type: 'PLAY', payload: { timeOffset: t } })
			: (this.service.send({ type: 'PAUSE' }),
			  this.service.send({ type: 'PLAY', payload: { timeOffset: t } })),
			(i =
				(r = this.iframe.contentDocument) === null || r === void 0
					? void 0
					: r.getElementsByTagName('html')[0]) === null ||
				i === void 0 ||
				i.classList.remove('rrweb-paused'),
			this.emitter.emit(G.Start)
	}
	pause(t) {
		var r, i
		t === void 0 &&
			this.service.state.matches('playing') &&
			this.service.send({ type: 'PAUSE' }),
			typeof t == 'number' &&
				(this.play(t), this.service.send({ type: 'PAUSE' })),
			(i =
				(r = this.iframe.contentDocument) === null || r === void 0
					? void 0
					: r.getElementsByTagName('html')[0]) === null ||
				i === void 0 ||
				i.classList.add('rrweb-paused'),
			this.emitter.emit(G.Pause)
	}
	resume(t = 0) {
		console.warn(
			"The 'resume' was deprecated in 1.0. Please use 'play' method which has the same interface.",
		),
			this.play(t),
			this.emitter.emit(G.Resume)
	}
	destroy() {
		this.pause(),
			this.config.root.removeChild(this.wrapper),
			this.emitter.emit(G.Destroy)
	}
	startLive(t) {
		this.service.send({ type: 'TO_LIVE', payload: { baselineTime: t } })
	}
	addEvent(t) {
		let r = this.config.unpackFn ? this.config.unpackFn(t) : t
		jr(r) && this.mouse.classList.add('touch-device'),
			Promise.resolve().then(() =>
				this.service.send({ type: 'ADD_EVENT', payload: { event: r } }),
			)
	}
	replaceEvents(t) {
		for (let r of t)
			if (jr(r)) {
				this.mouse.classList.add('touch-device')
				break
			}
		this.service.send({ type: 'REPLACE_EVENTS', payload: { events: t } })
	}
	enableInteract() {
		this.iframe.setAttribute('scrolling', 'auto'),
			(this.iframe.style.pointerEvents = 'auto')
	}
	disableInteract() {
		this.iframe.setAttribute('scrolling', 'no'),
			(this.iframe.style.pointerEvents = 'none')
	}
	resetCache() {
		this.cache = ir()
	}
	setupDom() {
		;(this.wrapper = document.createElement('div')),
			this.wrapper.classList.add('replayer-wrapper'),
			this.config.root.appendChild(this.wrapper),
			(this.mouse = document.createElement('div')),
			this.mouse.classList.add('replayer-mouse'),
			this.wrapper.appendChild(this.mouse),
			this.config.mouseTail !== !1 &&
				((this.mouseTail = document.createElement('canvas')),
				this.mouseTail.classList.add('replayer-mouse-tail'),
				(this.mouseTail.style.display = 'inherit'),
				this.wrapper.appendChild(this.mouseTail)),
			(this.iframe = document.createElement('iframe'))
		let t = ['allow-same-origin']
		this.config.UNSAFE_replayCanvas && t.push('allow-scripts'),
			(this.iframe.style.display = 'none'),
			this.iframe.setAttribute('sandbox', t.join(' ')),
			this.disableInteract(),
			this.wrapper.appendChild(this.iframe),
			this.iframe.contentWindow &&
				this.iframe.contentDocument &&
				(ln(this.iframe.contentWindow, this.iframe.contentDocument),
				it(this.iframe.contentWindow))
	}
	handleInactivity(t, r) {
		if (
			((t === this.inactiveEndTimestamp || r) &&
				((this.inactiveEndTimestamp = null), this.backToNormal()),
			this.config.skipInactive && !this.inactiveEndTimestamp)
		) {
			for (let i of this.getActivityIntervals())
				if (t >= i.startTime && t < i.endTime && !i.active) {
					this.inactiveEndTimestamp = i.endTime
					break
				}
			if (this.inactiveEndTimestamp) {
				let i = this.inactiveEndTimestamp - t,
					n = {
						speed:
							(i / wn) * this.config.inactiveSkipTime < Nn
								? i / Nn
								: Math.round(
										Math.max(i, wn) /
											this.config.inactiveSkipTime,
								  ),
					}
				this.speedService.send({ type: 'FAST_FORWARD', payload: n }),
					this.emitter.emit(G.SkipStart, n)
			}
		}
	}
	rebuildFullSnapshot(t, r = !1) {
		if (!this.iframe.contentDocument)
			return console.warn('Looks like your replayer has been destroyed.')
		Object.keys(this.legacy_missingNodeRetryMap).length &&
			console.warn(
				'Found unresolved missing node map',
				this.legacy_missingNodeRetryMap,
			),
			(this.legacy_missingNodeRetryMap = {})
		let i = [],
			n = (a, l) => {
				this.collectIframeAndAttachDocument(i, a)
				for (let c of this.config.plugins || [])
					c.onBuild && c.onBuild(a, { id: l, replayer: this })
			}
		this.mirror.reset(),
			ai(t.data.node, {
				doc: this.iframe.contentDocument,
				afterAppend: n,
				cache: this.cache,
				mirror: this.mirror,
			}),
			n(this.iframe.contentDocument, t.data.node.id)
		for (let { mutationInQueue: a, builtNode: l } of i)
			this.attachDocumentToIframe(a, l),
				(this.newDocumentQueue = this.newDocumentQueue.filter(
					(c) => c !== a,
				))
		let { documentElement: o, head: s } = this.iframe.contentDocument
		this.insertStyleRules(o, s),
			this.service.state.matches('playing') ||
				this.iframe.contentDocument
					.getElementsByTagName('html')[0]
					.classList.add('rrweb-paused'),
			this.emitter.emit(G.FullsnapshotRebuilded, t),
			r || this.waitForStylesheetLoad(),
			this.config.UNSAFE_replayCanvas && this.preloadAllImages()
	}
	insertStyleRules(t, r) {
		var i
		let n = yn(this.config.blockClass).concat(this.config.insertStyleRules)
		if (
			(this.config.pauseAnimation &&
				n.push(
					'html.rrweb-paused *, html.rrweb-paused *:before, html.rrweb-paused *:after { animation-play-state: paused !important; }',
				),
			this.usingVirtualDom)
		) {
			let o = this.virtualDom.createElement('style')
			this.virtualDom.mirror.add(
				o,
				Tr(o, this.virtualDom.unserializedId),
			),
				t.insertBefore(o, r),
				o.rules.push({
					source: E.StyleSheetRule,
					adds: n.map((s, a) => ({ rule: s, index: a })),
				})
		} else {
			let o = document.createElement('style')
			t.insertBefore(o, r)
			for (let s = 0; s < n.length; s++)
				(i = o.sheet) === null || i === void 0 || i.insertRule(n[s], s)
		}
	}
	attachDocumentToIframe(t, r) {
		let i = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror,
			n = [],
			o = (s, a) => {
				this.collectIframeAndAttachDocument(n, s)
				let l = i.getMeta(s)
				if (
					l?.type === P.Element &&
					l?.tagName.toUpperCase() === 'HTML'
				) {
					let { documentElement: c, head: u } = r.contentDocument
					this.insertStyleRules(c, u)
				}
				for (let c of this.config.plugins || [])
					c.onBuild && c.onBuild(s, { id: a, replayer: this })
			}
		ze(t.node, {
			doc: r.contentDocument,
			mirror: i,
			hackCss: !0,
			skipChild: !1,
			afterAppend: o,
			cache: this.cache,
		}),
			o(r.contentDocument, t.node.id)
		for (let { mutationInQueue: s, builtNode: a } of n)
			this.attachDocumentToIframe(s, a),
				(this.newDocumentQueue = this.newDocumentQueue.filter(
					(l) => l !== s,
				))
	}
	collectIframeAndAttachDocument(t, r) {
		if (we(r, this.mirror)) {
			let i = this.newDocumentQueue.find(
				(n) => n.parentId === this.mirror.getId(r),
			)
			i && t.push({ mutationInQueue: i, builtNode: r })
		}
	}
	waitForStylesheetLoad() {
		var t
		let r =
			(t = this.iframe.contentDocument) === null || t === void 0
				? void 0
				: t.head
		if (r) {
			let i = new Set(),
				n,
				o = this.service.state,
				s = () => {
					o = this.service.state
				}
			this.emitter.on(G.Start, s), this.emitter.on(G.Pause, s)
			let a = () => {
				this.emitter.off(G.Start, s), this.emitter.off(G.Pause, s)
			}
			r.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
				l.sheet ||
					(i.add(l),
					l.addEventListener('load', () => {
						i.delete(l),
							i.size === 0 &&
								n !== -1 &&
								(o.matches('playing') &&
									this.play(this.getCurrentTime()),
								this.emitter.emit(G.LoadStylesheetEnd),
								n && clearTimeout(n),
								a())
					}))
			}),
				i.size > 0 &&
					(this.service.send({ type: 'PAUSE' }),
					this.emitter.emit(G.LoadStylesheetStart),
					(n = setTimeout(() => {
						o.matches('playing') &&
							this.play(this.getCurrentTime()),
							(n = -1),
							a()
					}, this.config.loadTimeout)))
		}
	}
	preloadAllImages() {
		return fe(this, void 0, void 0, function* () {
			this.service.state
			let t = () => {
				this.service.state
			}
			this.emitter.on(G.Start, t), this.emitter.on(G.Pause, t)
			let r = []
			for (let i of this.service.state.context.events)
				i.type === T.IncrementalSnapshot &&
					i.data.source === E.CanvasMutation &&
					(r.push(this.deserializeAndPreloadCanvasEvents(i.data, i)),
					('commands' in i.data ? i.data.commands : [i.data]).forEach(
						(o) => {
							this.preloadImages(o, i)
						},
					))
			return Promise.all(r)
		})
	}
	preloadImages(t, r) {
		if (
			t.property === 'drawImage' &&
			typeof t.args[0] == 'string' &&
			!this.imageMap.has(r)
		) {
			let i = document.createElement('canvas'),
				n = i.getContext('2d'),
				o = n?.createImageData(i.width, i.height)
			o?.data, JSON.parse(t.args[0]), n?.putImageData(o, 0, 0)
		}
	}
	deserializeAndPreloadCanvasEvents(t, r) {
		return fe(this, void 0, void 0, function* () {
			if (!this.canvasEventMap.has(r)) {
				let i = { isUnchanged: !0 }
				if ('commands' in t) {
					let n = yield Promise.all(
						t.commands.map((o) =>
							fe(this, void 0, void 0, function* () {
								let s = yield Promise.all(
									o.args.map(Ie(this.imageMap, null, i)),
								)
								return Object.assign(Object.assign({}, o), {
									args: s,
								})
							}),
						),
					)
					i.isUnchanged === !1 &&
						this.canvasEventMap.set(
							r,
							Object.assign(Object.assign({}, t), {
								commands: n,
							}),
						)
				} else {
					let n = yield Promise.all(
						t.args.map(Ie(this.imageMap, null, i)),
					)
					i.isUnchanged === !1 &&
						this.canvasEventMap.set(
							r,
							Object.assign(Object.assign({}, t), { args: n }),
						)
				}
			}
		})
	}
	applyIncremental(t, r) {
		var i, n, o
		let { data: s } = t
		switch (s.source) {
			case E.Mutation: {
				try {
					this.applyMutation(s, r)
				} catch (a) {
					this.warn(`Exception in mutation ${a.message || a}`, s)
				}
				break
			}
			case E.Drag:
			case E.TouchMove:
			case E.MouseMove:
				if (r) {
					let a = s.positions[s.positions.length - 1]
					this.mousePos = { x: a.x, y: a.y, id: a.id, debugData: s }
				} else
					s.positions.forEach((a) => {
						let l = {
							doAction: () => {
								this.moveAndHover(a.x, a.y, a.id, r, s)
							},
							delay:
								a.timeOffset +
								t.timestamp -
								this.service.state.context.baselineTime,
						}
						this.timer.addAction(l)
					}),
						this.timer.addAction({
							doAction() {},
							delay:
								t.delay -
								((i = s.positions[0]) === null || i === void 0
									? void 0
									: i.timeOffset),
						})
				break
			case E.MouseInteraction: {
				if (s.id === -1 || r) break
				let a = new Event(ie[s.type].toLowerCase()),
					l = this.mirror.getNode(s.id)
				if (!l) return this.debugNodeNotFound(s, s.id)
				this.emitter.emit(G.MouseInteraction, {
					type: s.type,
					target: l,
				})
				let { triggerFocus: c } = this.config
				switch (s.type) {
					case ie.Blur:
						'blur' in l && l.blur()
						break
					case ie.Focus:
						c && l.focus && l.focus({ preventScroll: !0 })
						break
					case ie.Click:
					case ie.TouchStart:
					case ie.TouchEnd:
						r
							? (s.type === ie.TouchStart
									? (this.touchActive = !0)
									: s.type === ie.TouchEnd &&
									  (this.touchActive = !1),
							  (this.mousePos = {
									x: s.x,
									y: s.y,
									id: s.id,
									debugData: s,
							  }))
							: (s.type === ie.TouchStart &&
									(this.tailPositions.length = 0),
							  this.moveAndHover(s.x, s.y, s.id, r, s),
							  s.type === ie.Click
									? (this.mouse.classList.remove('active'),
									  this.mouse.offsetWidth,
									  this.mouse.classList.add('active'))
									: s.type === ie.TouchStart
									? (this.mouse.offsetWidth,
									  this.mouse.classList.add('touch-active'))
									: s.type === ie.TouchEnd &&
									  this.mouse.classList.remove(
											'touch-active',
									  ))
						break
					case ie.TouchCancel:
						r
							? (this.touchActive = !1)
							: this.mouse.classList.remove('touch-active')
						break
					default:
						l.dispatchEvent(a)
				}
				break
			}
			case E.Scroll: {
				if (s.id === -1) break
				if (this.usingVirtualDom) {
					let a = this.virtualDom.mirror.getNode(s.id)
					if (!a) return this.debugNodeNotFound(s, s.id)
					a.scrollData = s
					break
				}
				this.applyScroll(s, r)
				break
			}
			case E.ViewportResize:
				this.emitter.emit(G.Resize, {
					width: s.width,
					height: s.height,
				})
				break
			case E.Input: {
				if (s.id === -1) break
				if (this.usingVirtualDom) {
					let a = this.virtualDom.mirror.getNode(s.id)
					if (!a) return this.debugNodeNotFound(s, s.id)
					a.inputData = s
					break
				}
				this.applyInput(s)
				break
			}
			case E.MediaInteraction: {
				let a = this.usingVirtualDom
					? this.virtualDom.mirror.getNode(s.id)
					: this.mirror.getNode(s.id)
				if (!a) return this.debugNodeNotFound(s, s.id)
				let l = a
				try {
					s.currentTime !== void 0 && (l.currentTime = s.currentTime),
						s.volume !== void 0 && (l.volume = s.volume),
						s.muted !== void 0 && (l.muted = s.muted),
						s.type === 1 && l.pause(),
						s.type === 0 && l.play(),
						s.type === 4 && (l.playbackRate = s.playbackRate)
				} catch (c) {
					this.config.showWarning &&
						console.warn(
							`Failed to replay media interactions: ${
								c.message || c
							}`,
						)
				}
				break
			}
			case E.StyleSheetRule:
			case E.StyleDeclaration: {
				this.usingVirtualDom
					? s.styleId
						? this.constructedStyleMutations.push(s)
						: s.id &&
						  ((n = this.virtualDom.mirror.getNode(s.id)) ===
								null ||
								n === void 0 ||
								n.rules.push(s))
					: this.applyStyleSheetMutation(s)
				break
			}
			case E.CanvasMutation: {
				if (!this.config.UNSAFE_replayCanvas) return
				if (this.usingVirtualDom) {
					let a = this.virtualDom.mirror.getNode(s.id)
					if (!a) return this.debugNodeNotFound(s, s.id)
					a.canvasMutations.push({ event: t, mutation: s })
				} else {
					let a = this.mirror.getNode(s.id)
					if (!a) return this.debugNodeNotFound(s, s.id)
					zr({
						event: t,
						mutation: s,
						target: a,
						imageMap: this.imageMap,
						canvasEventMap: this.canvasEventMap,
						errorHandler: this.warnCanvasMutationFailed.bind(this),
					})
				}
				break
			}
			case E.Font: {
				try {
					let a = new FontFace(
						s.family,
						s.buffer
							? new Uint8Array(JSON.parse(s.fontSource))
							: s.fontSource,
						s.descriptors,
					)
					;(o = this.iframe.contentDocument) === null ||
						o === void 0 ||
						o.fonts.add(a)
				} catch (a) {
					this.config.showWarning && console.warn(a)
				}
				break
			}
			case E.Selection: {
				if (r) {
					this.lastSelectionData = s
					break
				}
				this.applySelection(s)
				break
			}
			case E.AdoptedStyleSheet: {
				this.usingVirtualDom
					? this.adoptedStyleSheets.push(s)
					: this.applyAdoptedStyleSheet(s)
				break
			}
		}
	}
	applyMutation(t, r) {
		if (
			this.config.useVirtualDom &&
			!this.usingVirtualDom &&
			r &&
			((this.usingVirtualDom = !0),
			zi(this.iframe.contentDocument, this.mirror, this.virtualDom),
			Object.keys(this.legacy_missingNodeRetryMap).length)
		)
			for (let c in this.legacy_missingNodeRetryMap)
				try {
					let u = this.legacy_missingNodeRetryMap[c],
						d = Er(u.node, this.virtualDom, this.mirror)
					d && (u.node = d)
				} catch (u) {
					this.config.showWarning && console.warn(u)
				}
		let i = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror
		t.removes.forEach((c) => {
			var u
			let d = i.getNode(c.id)
			if (!d)
				return t.removes.find((h) => h.id === c.parentId)
					? void 0
					: this.warnNodeNotFound(t, c.id)
			let f = i.getNode(c.parentId)
			if (!f) return this.warnNodeNotFound(t, c.parentId)
			if (
				(c.isShadow && me(f) && (f = f.shadowRoot),
				i.removeNodeFromMap(d),
				f)
			)
				try {
					f.removeChild(d),
						this.usingVirtualDom &&
							d.nodeName === '#text' &&
							f.nodeName === 'STYLE' &&
							((u = f.rules) === null || u === void 0
								? void 0
								: u.length) > 0 &&
							(f.rules = [])
				} catch (h) {
					if (h instanceof DOMException)
						this.warn(
							'parent could not remove child in mutation',
							f,
							d,
							t,
						)
					else throw h
				}
		})
		let n = Object.assign({}, this.legacy_missingNodeRetryMap),
			o = [],
			s = (c) => {
				let u = null
				return (
					c.nextId && (u = i.getNode(c.nextId)),
					c.nextId !== null &&
						c.nextId !== void 0 &&
						c.nextId !== -1 &&
						!u
				)
			},
			a = (c) => {
				var u
				if (!this.iframe.contentDocument)
					return console.warn(
						'Looks like your replayer has been destroyed.',
					)
				let d = i.getNode(c.parentId)
				if (!d)
					return c.node.type === P.Document
						? this.newDocumentQueue.push(c)
						: o.push(c)
				c.node.isShadow &&
					(me(d) || d.attachShadow({ mode: 'open' }),
					(d = d.shadowRoot))
				let f = null,
					h = null
				if (
					(c.previousId && (f = i.getNode(c.previousId)),
					c.nextId && (h = i.getNode(c.nextId)),
					s(c))
				)
					return o.push(c)
				if (c.node.rootId && !i.getNode(c.node.rootId)) return
				let p = c.node.rootId
					? i.getNode(c.node.rootId)
					: this.usingVirtualDom
					? this.virtualDom
					: this.iframe.contentDocument
				if (we(d, i)) {
					this.attachDocumentToIframe(c, d)
					return
				}
				let v = (g, w) => {
						for (let N of this.config.plugins || [])
							N.onBuild && N.onBuild(g, { id: w, replayer: this })
					},
					y = ze(c.node, {
						doc: p,
						mirror: i,
						skipChild: !0,
						hackCss: !0,
						cache: this.cache,
						afterAppend: v,
					})
				if (c.previousId === -1 || c.nextId === -1) {
					n[c.node.id] = { node: y, mutation: c }
					return
				}
				let m = i.getMeta(d)
				if (
					m &&
					m.type === P.Element &&
					m.tagName === 'textarea' &&
					c.node.type === P.Text
				) {
					let g = Array.isArray(d.childNodes)
						? d.childNodes
						: Array.from(d.childNodes)
					for (let w of g)
						w.nodeType === d.TEXT_NODE && d.removeChild(w)
				}
				if (f && f.nextSibling && f.nextSibling.parentNode)
					d.insertBefore(y, f.nextSibling)
				else if (h && h.parentNode)
					d.contains(h)
						? d.insertBefore(y, h)
						: d.insertBefore(y, null)
				else {
					if (d === p)
						for (; p.firstChild; ) p.removeChild(p.firstChild)
					d.appendChild(y)
				}
				if (
					(v(y, c.node.id),
					this.usingVirtualDom &&
						y.nodeName === '#text' &&
						d.nodeName === 'STYLE' &&
						((u = d.rules) === null || u === void 0
							? void 0
							: u.length) > 0 &&
						(d.rules = []),
					we(y, this.mirror))
				) {
					let g = this.mirror.getId(y),
						w = this.newDocumentQueue.find((N) => N.parentId === g)
					w &&
						(this.attachDocumentToIframe(w, y),
						(this.newDocumentQueue = this.newDocumentQueue.filter(
							(N) => N !== w,
						)))
				}
				;(c.previousId || c.nextId) &&
					this.legacy_resolveMissingNode(n, d, y, c)
			}
		t.adds.forEach((c) => {
			a(c)
		})
		let l = Date.now()
		for (; o.length; ) {
			let c = sr(o)
			if (((o.length = 0), Date.now() - l > 500)) {
				this.warn(
					'Timeout in the loop, please check the resolve tree data:',
					c,
				)
				break
			}
			for (let u of c)
				i.getNode(u.value.parentId)
					? Ct(u, (f) => {
							a(f)
					  })
					: this.debug(
							'Drop resolve tree since there is no parent for the root node.',
							u,
					  )
		}
		Object.keys(n).length &&
			Object.assign(this.legacy_missingNodeRetryMap, n),
			ar(t.texts).forEach((c) => {
				var u
				let d = i.getNode(c.id)
				if (!d)
					return t.removes.find((f) => f.id === c.id)
						? void 0
						: this.warnNodeNotFound(t, c.id)
				if (((d.textContent = c.value), this.usingVirtualDom)) {
					let f = d.parentNode
					;((u = f?.rules) === null || u === void 0
						? void 0
						: u.length) > 0 && (f.rules = [])
				}
			}),
			t.attributes.forEach((c) => {
				let u = i.getNode(c.id)
				if (!u)
					return t.removes.find((d) => d.id === c.id)
						? void 0
						: this.warnNodeNotFound(t, c.id)
				for (let d in c.attributes)
					if (typeof d == 'string') {
						let f = c.attributes[d]
						if (f === null) u.removeAttribute(d)
						else if (typeof f == 'string')
							try {
								if (
									d === '_cssText' &&
									(u.nodeName === 'LINK' ||
										u.nodeName === 'STYLE')
								)
									try {
										let h = i.getMeta(u)
										Object.assign(
											h.attributes,
											c.attributes,
										)
										let p = ze(h, {
												doc: u.ownerDocument,
												mirror: i,
												skipChild: !0,
												hackCss: !0,
												cache: this.cache,
											}),
											v = u.nextSibling,
											y = u.parentNode
										if (p && y) {
											y.removeChild(u),
												y.insertBefore(p, v),
												i.replace(c.id, p)
											break
										}
									} catch {}
								u.setAttribute(d, f)
							} catch (h) {
								this.config.showWarning &&
									console.warn(
										'An error occurred may due to the checkout feature.',
										h,
									)
							}
						else if (d === 'style') {
							let h = f,
								p = u
							for (let v in h)
								if (h[v] === !1) p.style.removeProperty(v)
								else if (h[v] instanceof Array) {
									let y = h[v]
									p.style.setProperty(v, y[0], y[1])
								} else {
									let y = h[v]
									p.style.setProperty(v, y)
								}
						}
					}
			})
	}
	applyScroll(t, r) {
		var i, n
		let o = this.mirror.getNode(t.id)
		if (!o) return this.debugNodeNotFound(t, t.id)
		let s = this.mirror.getMeta(o)
		if (o === this.iframe.contentDocument)
			(i = this.iframe.contentWindow) === null ||
				i === void 0 ||
				i.scrollTo({
					top: t.y,
					left: t.x,
					behavior: r ? 'auto' : 'smooth',
				})
		else if (s?.type === P.Document)
			(n = o.defaultView) === null ||
				n === void 0 ||
				n.scrollTo({
					top: t.y,
					left: t.x,
					behavior: r ? 'auto' : 'smooth',
				})
		else
			try {
				o.scrollTo({
					top: t.y,
					left: t.x,
					behavior: r ? 'auto' : 'smooth',
				})
			} catch {}
	}
	applyInput(t) {
		let r = this.mirror.getNode(t.id)
		if (!r) return this.debugNodeNotFound(t, t.id)
		try {
			;(r.checked = t.isChecked), (r.value = t.text)
		} catch {}
	}
	applySelection(t) {
		try {
			let r = new Set(),
				i = t.ranges.map(
					({ start: n, startOffset: o, end: s, endOffset: a }) => {
						let l = this.mirror.getNode(n),
							c = this.mirror.getNode(s)
						if (!l || !c) return
						let u = new Range()
						u.setStart(l, o), u.setEnd(c, a)
						let d = l.ownerDocument,
							f = d?.getSelection()
						return f && r.add(f), { range: u, selection: f }
					},
				)
			r.forEach((n) => n.removeAllRanges()),
				i.forEach((n) => {
					var o
					return (
						n &&
						((o = n.selection) === null || o === void 0
							? void 0
							: o.addRange(n.range))
					)
				})
		} catch {}
	}
	applyStyleSheetMutation(t) {
		var r
		let i = null
		t.styleId
			? (i = this.styleMirror.getStyle(t.styleId))
			: t.id &&
			  (i =
					((r = this.mirror.getNode(t.id)) === null || r === void 0
						? void 0
						: r.sheet) || null),
			i &&
				(t.source === E.StyleSheetRule
					? this.applyStyleSheetRule(t, i)
					: t.source === E.StyleDeclaration &&
					  this.applyStyleDeclaration(t, i))
	}
	applyStyleSheetRule(t, r) {
		var i, n, o, s
		if (
			((i = t.adds) === null ||
				i === void 0 ||
				i.forEach(({ rule: a, index: l }) => {
					try {
						if (Array.isArray(l)) {
							let { positions: c, index: u } = bt(l)
							Ue(r.cssRules, c).insertRule(a, u)
						} else {
							let c =
								l === void 0
									? void 0
									: Math.min(l, r.cssRules.length)
							r?.insertRule(a, c)
						}
					} catch {}
				}),
			(n = t.removes) === null ||
				n === void 0 ||
				n.forEach(({ index: a }) => {
					try {
						if (Array.isArray(a)) {
							let { positions: l, index: c } = bt(a)
							Ue(r.cssRules, l).deleteRule(c || 0)
						} else r?.deleteRule(a)
					} catch {}
				}),
			t.replace)
		)
			try {
				;(o = r.replace) === null ||
					o === void 0 ||
					o.call(r, t.replace)
			} catch {}
		if (t.replaceSync)
			try {
				;(s = r.replaceSync) === null ||
					s === void 0 ||
					s.call(r, t.replaceSync)
			} catch {}
	}
	applyStyleDeclaration(t, r) {
		t.set &&
			Ue(r.rules, t.index).style.setProperty(
				t.set.property,
				t.set.value,
				t.set.priority,
			),
			t.remove &&
				Ue(r.rules, t.index).style.removeProperty(t.remove.property)
	}
	applyAdoptedStyleSheet(t) {
		var r
		let i = this.mirror.getNode(t.id)
		if (!i) return
		;(r = t.styles) === null ||
			r === void 0 ||
			r.forEach((a) => {
				var l
				let c = null,
					u = null
				if (
					(me(i)
						? (u =
								((l = i.ownerDocument) === null || l === void 0
									? void 0
									: l.defaultView) || null)
						: i.nodeName === '#document' && (u = i.defaultView),
					!!u)
				)
					try {
						;(c = new u.CSSStyleSheet()),
							this.styleMirror.add(c, a.styleId),
							this.applyStyleSheetRule(
								{ source: E.StyleSheetRule, adds: a.rules },
								c,
							)
					} catch {}
			})
		let n = 10,
			o = 0,
			s = (a, l) => {
				let c = l
					.map((u) => this.styleMirror.getStyle(u))
					.filter((u) => u !== null)
				me(a)
					? (a.shadowRoot.adoptedStyleSheets = c)
					: a.nodeName === '#document' && (a.adoptedStyleSheets = c),
					c.length !== l.length &&
						o < n &&
						(setTimeout(() => s(a, l), 0 + 100 * o), o++)
			}
		s(i, t.styleIds)
	}
	legacy_resolveMissingNode(t, r, i, n) {
		let { previousId: o, nextId: s } = n,
			a = o && t[o],
			l = s && t[s]
		if (a) {
			let { node: c, mutation: u } = a
			r.insertBefore(c, i),
				delete t[u.node.id],
				delete this.legacy_missingNodeRetryMap[u.node.id],
				(u.previousId || u.nextId) &&
					this.legacy_resolveMissingNode(t, r, c, u)
		}
		if (l) {
			let { node: c, mutation: u } = l
			r.insertBefore(c, i.nextSibling),
				delete t[u.node.id],
				delete this.legacy_missingNodeRetryMap[u.node.id],
				(u.previousId || u.nextId) &&
					this.legacy_resolveMissingNode(t, r, c, u)
		}
	}
	moveAndHover(t, r, i, n, o) {
		let s = this.mirror.getNode(i)
		if (!s) return this.debugNodeNotFound(o, i)
		let a = St(s, this.iframe),
			l = t * a.absoluteScale + a.x,
			c = r * a.absoluteScale + a.y
		;(this.mouse.style.left = `${l}px`),
			(this.mouse.style.top = `${c}px`),
			n || this.drawMouseTail({ x: l, y: c }),
			this.hoverElements(s)
	}
	drawMouseTail(t) {
		if (!this.mouseTail) return
		let {
				lineCap: r,
				lineWidth: i,
				strokeStyle: n,
				duration: o,
			} = this.config.mouseTail === !0
				? Xr
				: Object.assign({}, Xr, this.config.mouseTail),
			s = () => {
				if (!this.mouseTail) return
				let a = this.mouseTail.getContext('2d')
				!a ||
					!this.tailPositions.length ||
					(a.clearRect(
						0,
						0,
						this.mouseTail.width,
						this.mouseTail.height,
					),
					a.beginPath(),
					(a.lineWidth = i),
					(a.lineCap = r),
					(a.strokeStyle = n),
					a.moveTo(this.tailPositions[0].x, this.tailPositions[0].y),
					this.tailPositions.forEach((l) => a.lineTo(l.x, l.y)),
					a.stroke())
			}
		this.tailPositions.push(t),
			s(),
			setTimeout(() => {
				;(this.tailPositions = this.tailPositions.filter(
					(a) => a !== t,
				)),
					s()
			}, o / this.speedService.state.context.timer.speed)
	}
	hoverElements(t) {
		var r
		;(r = this.iframe.contentDocument) === null ||
			r === void 0 ||
			r.querySelectorAll('.\\:hover').forEach((n) => {
				n.classList.remove(':hover')
			})
		let i = t
		for (; i; )
			i.classList && i.classList.add(':hover'), (i = i.parentElement)
	}
	isUserInteraction(t) {
		return t.type !== T.IncrementalSnapshot
			? !1
			: t.data.source > E.Mutation && t.data.source <= E.Input
	}
	backToNormal() {
		;(this.nextUserInteractionEvent = null),
			!this.speedService.state.matches('normal') &&
				(this.speedService.send({ type: 'BACK_TO_NORMAL' }),
				this.emitter.emit(G.SkipEnd, {
					speed: this.speedService.state.context.normalSpeed,
				}))
	}
	warnNodeNotFound(t, r) {
		this.warn(`Node with id '${r}' not found. `, t)
	}
	warnCanvasMutationFailed(t, r) {
		this.warn('Has error on canvas update', r, 'canvas mutation:', t)
	}
	debugNodeNotFound(t, r) {
		this.debug(Kr, `Node with id '${r}' not found. `, t)
	}
	warn(...t) {
		!this.config.showWarning || console.warn(Kr, ...t)
	}
	debug(...t) {
		!this.config.showDebug || console.log(Kr, ...t)
	}
}
export {
	T as EventType,
	E as IncrementalSource,
	ie as MouseInteractions,
	Gt as PLUGIN_NAME,
	Qr as Replayer,
	G as ReplayerEvents,
	_o as addCustomEvent,
	Bo as freezePage,
	ns as getRecordConsolePlugin,
	ls as getRecordSequentialIdPlugin,
	ss as getReplayConsolePlugin,
	cs as getReplaySequentialIdPlugin,
	vt as mirror,
	qo as pack,
	xe as record,
	$o as unpack,
	ui as utils,
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=rrweb.js.map
