! function(t) {
	function r(n) {
		if(e[n]) return e[n].exports;
		var o = e[n] = {
			exports: {},
			id: n,
			loaded: !1
		};
		return t[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports
	}
	var e = {};
	return r.m = t, r.c = e, r.p = "", r(0)
}([function(t, r, e) {
	e(1)(window)
}, function(t, r) {
	t.exports = function(t) {
		t.hookAjax = function(t) {
			function r(r) {
				return function() {
					var e = this.hasOwnProperty(r + "_") ? this[r + "_"] : this.xhr[r],
						n = (t[r] || {}).getter;
					return n && n(e, this) || e
				}
			}

			function e(r) {
				return function(e) {
					var n = this.xhr,
						o = this,
						i = t[r];
					if("function" == typeof i) n[r] = function() {
						t[r](o) || e.apply(n, arguments)
					};
					else {
						var a = (i || {}).setter;
						e = a && a(e, o) || e;
						try {
							n[r] = e
						} catch(t) {
							this[r + "_"] = e
						}
					}
				}
			}

			function n(r) {
				return function() {
					//try{
						var e = [].slice.call(arguments);
						/**
						 * 因jQuery屏蔽了onreadystatechange,此时判断无,则补全
						 */
						if(r=="send"){
							if(this.onreadystatechange == null){
								this.onreadystatechange = function(){}
							}
							if(this.onload == null){
								this.onload = function(){}
							}
							t['onreadystatechange'].call(this, e, this.xhr);
							t['onload'].call(this, e, this.xhr);
						}
						//1.如果fun拦截函数存在，则先调用拦截函数
						if(!t[r] || !t[r].call(this, e, this.xhr)) return this.xhr[r].apply(this.xhr, e)
					//}catch(error){
						//console.error(error);
					//}
				}
			}
			//保存真正的XMLHttpRequest对象
			//1.覆盖全局XMLHttpRequest，代理对象
			window._ahrealxhr = window._ahrealxhr || XMLHttpRequest, XMLHttpRequest = function() {
				var t = new window._ahrealxhr;
				//console.log(t);
				Object.defineProperty(this, "xhr", {
					value: t
				})
			};
			var o = window._ahrealxhr.prototype;
			//o.onreadystatechange=o.onload=o.onprogress=o.ontimeout=o.onabort=o.onreadystatechange=o.readyState=o.response=o.responseText=
			//o.responseType=o.responseURL=o.responseXML=o.status=o.statusText=o.timeout=o.upload=null;
			var _fullprop = ['onreadystatechange','onload','onprogress','ontimeout','onabort','readyState','response','responseText',
			'responseType','responseURL','responseXML','status','statusText','timeout','upload','withCredentials'];
			
			//3.代理属性
			for(var i in o){
				var a = "";
				try{
					a = typeof o[i]
					if("function" != a && "number" != a && _fullprop.indexOf(i)==-1){
						_fullprop.push(i);
					};
				}catch(t){}
			}
			
			for(var i in o) {
				var a = "";
				try {
					a = typeof o[i]
				} catch(t) {}
				if("function" === a) XMLHttpRequest.prototype[i] = n(i);
			}
			
			for(var i in _fullprop){
				Object.defineProperty(XMLHttpRequest.prototype, _fullprop[i], {
					get: r(_fullprop[i]),
					set: e(_fullprop[i]),
					enumerable: !0
				});
			}
			
			//3.代理属性
//			for(var i in o) {
//				var a = "";
//				try {
//					a = typeof o[i]
//				} catch(t) {}
//				"function" === a ? XMLHttpRequest.prototype[i] = n(i) 
//				: Object.defineProperty(XMLHttpRequest.prototype, i, {
//					get: r(i),
//					set: e(i),
//					enumerable: !0
//				})
//			}
			return window._ahrealxhr
		}, t.unHookAjax = function() {
			window._ahrealxhr && (XMLHttpRequest = window._ahrealxhr), window._ahrealxhr = void 0
		}, t.default = t
	}
}]);