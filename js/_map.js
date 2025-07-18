var insertingfunc = function(settings, p){

	if(p.inWnd)
	{
		return {
			insert : 'wnd'
		}
	}

	if(p.inTooltip)
	{
		return {
			insert : 'tooltip'
		}
	}
	
	return {
		el : 'content'
	}
}

__map =  { 

	__vendor : [
		
		"js/vendor/jquery.min.js",//
        "js/vendor/tooltipster.core.js",//
        "js/vendor/tooltipster.bundle.js",//
        "js/vendor/imagesloaded.pkgd.js",///
        "js/vendor/timer.js",//
        
		"js/vendor/aesjs.js",//
		{path : "js/vendor/linkify.js", babelify : true},
		{path : "js/vendor/linkify-html.js", babelify : true},
		{path : "js/vendor/linkify-string.js", babelify : true},
		"js/vendor/exif.js",
		"js/vendor/firebase-app.js",
		"js/vendor/firebase-messaging.js",

		//{path :"js/vendor/leoprofanity.js", babelify : true},

		//new
		{path : "js/lib/pocketnet/btc17.js", babelify : true}, //
		//{path : "js/lib/pocketnet/htls.js", babelify : true}, //
		{path : "js/lib/pocketnet/buffer.js", babelify : true}, //
		
		//
		
        "js/vendor/pbkdf2.js", //
        "js/vendor/sha1.js", //
        "js/vendor/paste.js", //
        "js/vendor/jquery.md5.js",
		"js/vendor/jquery.animate-number.js", //
		"js/vendor/jquery.touchSwipe.js", //
        "js/vendor/joypixels.js",
		"js/vendor/unmute.js", //
        {path : "js/vendor/plyr.js", babelify : true}, // later
        "js/vendor/reconnectingwebsocket.js", //
        
		"js/vendor/jquery.mark.js", //?
		
		"js/vendor/moment.min.js", //?
		"js/vendor/moment.locale.js", //?
		"js/vendor/ua-parser.min.js",
		"js/vendor/jquery.inputmask.bundle.js",
		 //
		"js/vendor/isotope.pkgd.js", //
		{path : "js/vendor/workbox-v6.1.5/workbox-sw.js", babelify : true},
		"js/vendor/ion.sound/ion.sound.js",
		"js/vendor/hammer.min.js",
		//"js/vendor/owl/owl.carousel.js",
		
		{path : "js/vendor/shadow-popup/popup.js", babelify : true},
		{path : "js/popups/index.js", babelify : true},
	],

	__sourcesfirst : [
		"js/vendor/device.js", //
		"js/vendor/modernizr-2.8.3.min.js",//
		"js/polyfills.js",
		"js/vendor/axios.js",
		"js/vendor/underscore-min.js",  
		"js/vendor/xss.min.js", //
		
		{path : "js/functionsfirst.js", babelify : true},

		"js/localization.js",

		
		{path : "js/broadcaster.js", babelify : true},
		{path : "js/lib/client/system16.js", babelify : true},
		{path : "js/lib/client/monetization.js", babelify : true},
		{path : "js/lib/client/api.js", babelify : true},
		{path : "js/lib/client/resoursesdb.js", babelify : true},
		{path : "js/kit.js", babelify : true},
		{path : "js/lib/client/actions.js", babelify : true},
		{path : "js/lib/client/sdk.js", babelify : true},
		
		"js/_map.js",

		{path : "js/logger.js", babelify : true},
		{path : "js/videotransport.js", babelify : true},
		{path : "js/media.js", babelify : true},
		{path : "js/app.js", babelify : true},
		"js/main.js"
	],

	/*__sourceslast : [
		{path : "peertube/video-embed.bundle.js", babelify : true}
	],*/


	__sources : [
		
		{path : "js/functions.js", babelify : true},
		{path : "js/user.js", babelify : true},
		{path : "js/module.js", babelify : true},
		{path : "js/navn.js", babelify : true},
		{path : "js/validation.js", babelify : true},
		{path : "js/vendor/hex-captcha/js/captcha.js", babelify : true},
		{path : "js/image-uploader.js", babelify : true},
		{path : "js/peertube.js", babelify : true},
		{path : "js/lib/apps/index.js", babelify : true},
		{path : "js/lib/external/index.min.js"},

		{path : "js/satolist.js", babelify : true},
		"js/bastyonCalls/bastyonCalls.min.js",
		{path : "js/lib/client/p2pvideo.js", babelify : true},
		{path : "js/effects.js", babelify : true},
		{path : "js/video-uploader.js", babelify : true},
		{path : "js/file-hash.js", babelify : true},
		{path : "js/widgets.js", babelify : true}

		
	],

	__css : [
		"css/normalize.css",
		"css/tooltipster.core.min.css",
		"css/tooltipster.bundle.min.css",
		"css/main.css",
		"css/common.css",
		"css/plyr.css",
		"css/pniframe.css",
		"peertube/video-embed.css",
		"js/vendor/owl/assets/owl.carousel.min.css",
		"js/vendor/owl/assets/owl.theme.default.min.css",
		"js/vendor/shadow-popup/css/popup.css",
		"css/fontawesome/css/all.min.css",
		"js/vendor/hex-captcha/css/captcha.css"
	],

	__exportcss : {
		"css/main.css" : true,
		"css/common.css" : true,
		"css/plyr.css" : true,
		"js/vendor/owl/assets/owl.carousel.min.css" : true,
		"js/vendor/owl/assets/owl.theme.default.min.css" : true
	},
	
	__templates : [
		{ c : 'bnavigation', n : 'menu' },
		{ c : 'menu', n : 'index' },
		{ c : 'menu', n : 'userinfo' },
		
		{ c : 'bnavigation', n : 'index' },
		{ c : 'footer', n : 'index' },
		{ c : 'main', n : 'menu' },
		{ c : 'main', n : 'index' },
		{ c : 'panel', n : 'index' },
		{ c : 'leftpanel', n : 'index' },
		{ c : 'leftpanel', n : 'footer' },
		{ c : 'leftpanel', n : 'menu' },
		{ c : 'leftpanel', n : 'best' },
		{ c : 'miniapps', n : 'index' },
		{ c : 'miniapps', n : 'apps' },
		{ c : 'lastcomments', n : 'index' },
		{ c : 'tagcloud', n : 'index' },
		{ c : 'tagcloud', n : 'tags' },
		{ c : 'userpage', n : 'index' },
		{ c : 'categories', n : 'index' },
		{ c : 'categories', n : 'categories' },
		{ c : 'lenta', n : 'share' },
		{ c : 'lenta', n : 'shares' },
		{ c : 'lenta', n : 'metmenu' },
		{ c : 'lenta', n : 'wholike' },
		{ c : 'lenta', n : 'index' },
		{ c : 'lenta', n : 'sharevideo' },
		{ c : 'lenta', n : 'sharevideopip' },
		{ c : 'lenta', n : 'sharevideolight' },
		{ c : 'lenta', n : 'stars' },
		{ c : 'lenta', n : 'groupshares' },
		{ c : 'lenta', n : 'commentspreview' },
		{ c : 'lenta', n : 'tosubscribeshares' },
		{ c : 'notifications', n : 'index' },
		{ c : 'embeding', n : 'images' },
		{ c : 'taginput', n : 'index' },
		{ c : 'taginput', n : 'tags' },

		
		
		{ c : 'share', n : 'body' },
		{ c : 'share', n : 'postline' },
		{ c : 'share', n : 'index' },
		{ c : 'share', n : 'url' },
		{ c : 'share', n : 'repost' },
		{ c : 'share', n : 'settings' },

		{ c : 'staking', n : 'index' },
		{ c : 'staking', n : 'lastprice' },
		{ c : 'staking', n : 'graph' },

		

		{ c : 'comments', n : 'index' },
		{ c : 'comments', n : 'post' },
		{ c : 'comments', n : 'list' },
		{ c : 'lastcomments', n : 'lastcommentslist'},
		{ c : 'author', n : 'preshell'},
		{ c : 'post', n : 'preshell'},
		{ c : 'commentBanner', n : 'index' },
		{ c : 'updatenotifier', n : 'index' },
		{ c : 'registration', n : 'index' },
		{ c : 'test', n : 'options' },
		{ c : 'test', n : 'icon' },
		{ c : 'author', n : 'info'},
		{ c : 'author', n : 'index'},
		{ c : 'author', n : 'menu'},
		{ c : 'author', n : 'panel'},
		{ c : 'mobilesearch', n : 'index'},



	],

    pkview  : {
		uri : "pkview",
		href : "pkview",
		add : insertingfunc,

		/*relations : [
			{src : 'js/vendor/qrscanner.js',			   f : 'js'},
			{src : 'js/vendor/qrcode.min.js',			   f : 'js', require : function(){
				QRCode = require('./js/vendor/qrcode.min.js')
			}},	

		],*/
	},      

	bastyon_iphone: {
		uri : "bastyon_iphone",
		href : "bastyon_iphone",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true
	},

	easynode : {
		uri : "easynode",
		href : "easynode",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true,

		ignoreMinimize : true
	},

	about : {
		uri : "about",
		href : "about",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true,

		ignoreMinimize : true

	},

	aboutHome : {
		uri : "aboutHome",
		href : "aboutHome",
		add : {
			el : 'content'
		},
		anonimus : true,

		ignoreMinimize : true

		/*redirect : {
			auth : 'authorization',
			//validate : 'filluser'
		},*/
	
	},

	aboutYoutube : {
		uri : "aboutYoutube",
		href : "aboutYoutube",
		add : {
			el : 'content'
		},
		anonimus : true,

		ignoreMinimize : true

		/*redirect : {
			auth : 'authorization',
			//validate : 'filluser'
		},*/
	
	},

	aboutFacebook : {
		uri : "aboutFacebook",
		href : "aboutFacebook",
		add : {
			el : 'content'
		},
		anonimus : true,

		ignoreMinimize : true

		/*redirect : {
			auth : 'authorization',
			//validate : 'filluser'
		},*/
	
	},



	aboutHIW : {
		uri : "aboutHIW",
		href : "aboutHIW",
		add : {
			el : 'content'
		},
		anonimus : true,

		ignoreMinimize : true
	
	},

	aboutTwitter : {
		uri : "aboutTwitter",
		href : "aboutTwitter",
		add : {
			el : 'content'
		},
		anonimus : true,

		ignoreMinimize : true

	},

	abilityincrease : {
		uri : "abilityincrease",
		href : "abilityincrease",
		add : {
			el : 'content'
		}
	},

	support : {
		uri : "support",
		href : "support",
		add : {
			el : 'content'
		},
		add : insertingfunc,
	},

	actions : {
		uri : "actions",
		href : "actions",
		add : {
			el : 'content'
		},
		add : insertingfunc,
	},

	requestpermission : {
		uri : "requestpermission",
		href : "requestpermission",
		add : insertingfunc,
		anonimus : true,
	},

	applicationmeta : {
		uri : "applicationmeta",
		href : "applicationmeta",
		add : insertingfunc,
		anonimus : true,
	},

	application : {
		uri : "application",
		href : "application",
		add : insertingfunc,
		anonimus : true,
	},

	applications : {
		uri : "applications",
		href : "applications",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true,

		ignoreMinimize : true,
		insearch : true

	},

	monetization : {
		uri : "monetization",
		href : "monetization",
		add : insertingfunc,
		anonimus : true
	},

	boost : {
		uri : "boost",
		href : "boost",
		add : insertingfunc,
		anonimus : true
	},


	terms : {
		uri : "terms",
		href : "terms",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true,

		ignoreMinimize : true

	},

	csaepolicy : {
		uri : "csaepolicy",
		href : "csaepolicy",
		add : insertingfunc,
		anonimus : true,
		electronDontOpen : true,

		ignoreMinimize : true

	},

	
	page404 : {
		uri : "page404",
		href : "page404",
		add : {
			el : 'content'
		},
		anonimus : true,
		relationsSunc : true,
		electronDontOpen : true
	},

	welcome : {
		uri : "welcome",
		href : "welcome",
		add : function(settings, p){

			if(p.inWnd)
			{
				return {
					insert : 'wnd'
				}
			}
			else
			if(p.inTooltip)
			{
				return {
					insert : 'bstntooltip'
				}
			}
			else
			{
				return {
					el : 'content'
				}
			}

		},
		
		anonimus : true
	},

	registration : {
		uri : "registration",
		href : "registration",
		add : insertingfunc,
		anonimus : true,

		
		electronDontOpen : true
	},

	anothersite : {
		uri : "anothersite",
		href : "anothersite",
		add : insertingfunc,
		anonimus : true,
		relationsSunc : true,

		relations : [
				
			
		],
	},

	/****/



		usersettings : {
			uri : "usersettings",
			href : "usersettings",
			add : insertingfunc,
			anonimus : true
		},

		popup : {
			uri : "popup",
			href : "popup",
			add : insertingfunc,
			anonimus : true
		},

		captcha : {
			uri : "captcha",
			href : "captcha",
			add : insertingfunc,
			anonimus : true
		},

		test : {
			uri : "test",
			href : "test",
			add : insertingfunc,
			anonimus : true,
			relationsSunc : true,
			electronDontOpen : true,
			
		},

		accounts : {
			uri : "accounts",
			href : "accounts",
			add : insertingfunc,

			redirect : {
				auth : 'authorization',
			},

			/*relations : [

				{src : 'js/vendor/qr/qrcode.min.js',			   f : 'js', require : function(){
					QRCode = require('./js/vendor/qr/qrcode.min.js')
				}},

			],*/

		},


		uploadpeertube : {
			uri : "uploadpeertube",
			href : "uploadpeertube",
			add : insertingfunc,

			/*relations : [
				{src : 'js/vendor/ffmpeg.min.js',			   f : 'js'},	
			],*/

			
		},

		streampeertube : {
			uri : "streampeertube",
			href : "streampeertube",
			add : insertingfunc,
		},
		
		tagcloud : {
			uri : "tagcloud",
			href : "tagcloud",
			add : insertingfunc,
			anonimus : true,
		},
		
		taginput : {
			uri : "taginput",
			href : "taginput",
			add : insertingfunc,
			anonimus : true,
		},
		
		categories : {
			uri : "categories",
			href : "categories",
			add : insertingfunc,
			anonimus : true,
		},	

		staking : {
			uri : "staking",
			href : "staking",
			relations : [
		
				{src : 'js/vendor/highcharts.js', 		f : 'js', require : function(){
					Highcharts = require('./js/vendor/highcharts.js')
				}},
			],
			add : insertingfunc,
			anonimus : true,
		},	

		recommendations : {
			uri : "recommendations",
			href : "recommendations",
		
			add : insertingfunc,
			anonimus : true,
		},

		recommendedusers : {
			uri : "recommendedusers",
			href : "recommendedusers",
		
			add : insertingfunc,
			anonimus : true,
		},


		lastcomments : {
			uri : "lastcomments",
			href : "lastcomments",
			add : insertingfunc,
			anonimus : true,
		},

		pkoin : {
			uri : "pkoin",
			href : "pkoin",
			add : insertingfunc,
			anonimus : true,
		},

		articlesv : {
			uri : "articlesv",
			href : "articlesv",
			add : insertingfunc,

			electronDontOpen : true
		},	
		
		articlev : {
			uri : "articlev",
			href : "articlev",
			add : insertingfunc,
			
			relations : [
				{src : 'js/vendor/editor/editor.js',			   f : 'js', require : "EditorJS"},
				{src : 'js/vendor/editor/embed.js',			   f : 'js', require : "Embed"},
				{src : 'js/vendor/editor/carousel.js',			   f : 'js', require : "Carousel"},
				{src : 'js/vendor/editor/paragraph.js',			   f : 'js', require : "Paragraph"},
				{src : 'js/vendor/editor/header.js',			   f : 'js', require : "Header"},
				{src : 'js/vendor/editor/imageloader.js',			   f : 'js', require : "ImageTool"},
				{src : 'js/vendor/editor/delimiter.js',			   f : 'js', require : "Delimiter"},
				{src : 'js/vendor/editor/link.js',			   f : 'js', require : "LinkTool"},
				{src : 'js/vendor/editor/list.js',			   f : 'js', require : "List"},
				{src : 'js/vendor/editor/quote.js',			   f : 'js', require : "Quote"},
				{src : 'js/vendor/editor/warning.js',			   f : 'js', require : "Warning"},
				{src : 'js/vendor/editor/inlinecode.js',			   f : 'js', require : "InlineCode"}
			],

			electronDontOpen : true
		},

		video : {
			uri : "video",
			href : "video",
			add : {
				el : 'content'
			},
			anonimus : true,
		},



		system16: {
			uri : "system16",
			href : "system16",
			add : insertingfunc,
			anonimus : true,

			relations : [
				{src : 'js/vendor/highcharts.js', 		f : 'js', require : function(){
					Highcharts = require('./js/vendor/highcharts.js')
				}},
				{src : 'js/vendor/highcharts-more.js', 		f : 'js'}
			],

			relationsSunc : true,

			ignoreMinimize : true

			
		},

		help : {
			uri : "help",
			href : "help",
			add : {
				el : 'content'
			},
			anonimus : true,

			ignoreMinimize : true

		},

		home : {
			uri : "home",
			href : "home",
			add : insertingfunc,
			anonimus : true,
			insearch : true
		},


		donations : {
			uri : "donations",
			href : "donations",
			add : insertingfunc,
			anonimus : true,
		},
		
		howtobuy : {
			uri : "howtobuy",
			href : "howtobuy",
			add : insertingfunc,
			anonimus : true,
		},

		searchusers : {
			uri : "searchusers",
			href : "searchusers",
			add : insertingfunc,
			anonimus : true,
		},
		

		faq : {
			uri : "faq",
			href : "faq",
			add : {
				el : 'content'
			},
			anonimus : true,

			ignoreMinimize : true

		},
		addcategory: {
			uri : "addcategory",
			href : "addcategory",
			add : insertingfunc,
			anonimus : true,
		},


		slides: {
			uri : "slides",
			href : "slides",
			add : insertingfunc,
			anonimus : true,

			ignoreMinimize : true

		},
		transportsmanagement : {
			uri : "transportsmanagement",
			href : "transportsmanagement",
			add : insertingfunc,
			anonimus : true,
		},

	
		embeding : {
			uri : "embeding",
			href : "embeding",
			add : insertingfunc
		},

		fastsend : {
			uri : "fastsend",
			href : "fastsend",
			add : insertingfunc
		},

		managepaidsubscription : {
			uri : "managepaidsubscription",
			href : "managepaidsubscription",
			add : insertingfunc
		},

		getpaidsubscription : {
			uri : "getpaidsubscription",
			href : "getpaidsubscription",
			add : insertingfunc
		},

		devapplication : {
			uri : "devapplication",
			href : "devapplication",
			add : insertingfunc,
			anonimus : true,
		},

		devapplications : {
			uri : "devapplications",
			href : "devapplications",
			anonimus : true,
			add : insertingfunc
		},

		mobilesearch : {
			uri : "mobilesearch",
			href : "mobilesearch",
			add : insertingfunc,
			anonimus : true
		},

		camerapreview : {
			uri : "camerapreview",
			href : "camerapreview",
			add : insertingfunc
		},

		donate : {
			uri : "donate",
			href : "donate",
			add : insertingfunc,
			ignoreMinimize : true
		},

		donateAnimations : {
			uri : "donateAnimations",
			href : "donateAnimations",
			add : insertingfunc
		},

		recommendationinfo: {
			uri : "recommendationinfo",
			href : "recommendationinfo",
			add : insertingfunc,
			anonimus : true,

		},

		userpage : {
			uri : "userpage",
			href : "userpage",
			preshell : true,
			add : insertingfunc,
			anonimus : true,
			redirect : {
				auth : 'welcome'
			},
			electronDontOpen : true
			
		},

		qrscanner : {
			uri : "qrscanner",
			href : "qrscanner",
			add : insertingfunc,

			relations : [
				{src : 'js/vendor/qr-scanner.umd.min.js',			   f : 'js'}
			],
		},
	
		external : {
			uri : "external",
			href : "external",
			add : insertingfunc
		},
		wallet : {
			uri : "wallet",
			href : "wallet",
			add : insertingfunc,

			relations : [
				{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
					Chart = require('./js/vendor/chart.min.js')
				}}
			],

			relationsSunc : true,

			electronDontOpen : true
		},

		share : {
			uri : "share",
			href : "share",
			add : insertingfunc,

			relations : [

				{src : 'js/vendor/Sortable.min.js', f : 'js', 

					require : function(){

						Sortable = require('sortablejs')

				}},
			
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	

		
			],
			electronDontOpen : true
		},

		comments : {
			uri : "comments",
			href : "comments",
			add : {
				el : 'content'
			},

			relations : [
		
				{src : 'js/vendor/emojionearea.min.js',			   f : 'js', if : function(){return (typeof _Electron == 'undefined' || _Electron == false)}},	
				{src : 'js/vendor/emojionearea.min.css',			   f : 'css'},	

		
			],
			exportcss : true,
			anonimus : true,
		},

	
		lenta : {
			uri : "lenta",
			href : "lenta",
			add : {
				el : 'content'
			},
			exportcss : true,
			anonimus : true,
		},	

		transactionview : {
			uri : "transactionview",
			href : "transactionview",
			add : insertingfunc,
			exportcss : true,
			anonimus : true,
		},	

		transactionslist : {
			uri : "transactionslist",
			href : "transactionslist",
			add : insertingfunc,
		},	

	
		imageGalleryEdit : {
			uri : "imageGalleryEdit",
			href : "imagesEdit",
			add : insertingfunc,
			anonimus : true,
		},

		imagegallery : {
			uri : "imagegallery",
			href : "imagegallery",
			add : insertingfunc,
			anonimus : true
		},

		aboutus : {
			uri : "aboutus",
			href : "aboutus",
			add : {
				el : 'content'
			},
			anonimus : true,
		},

	/****/

	menu : {
		uri : "menu",
		href : "menu",
		add : {
			el : 'menu'
		},
		now : true,
		anonimus : true,
		renew : true,
		reload : true,

		viewchangereload : true
	},

	miniapps : {
		uri : "miniapps",
		href : "miniapps",
		add : {
			el : 'miniapps'
		},
		now : true,
		anonimus : true,
		renew : true,
		reload : true,
		viewchangereload : true,
		dontwait : true
	},

	bnavigation : {
		uri : "bnavigation",
		href : "bnavigation",
		add : {
			el : 'navigation'
		},
		now : true,
		renew : true,
		anonimus : true,
		reload : true
	},

	footer : {
		uri : "footer",
		href : "footer",
		add : {
			el : 'footer'
		},
		now : true,
		anonimus : true,
		reload : true
	},

	notifications : {
		uri : "notifications",
		href : "notifications",
		add : insertingfunc,

		
	},

	downloadMedia : {
		uri : "downloadMedia",
		href : "downloadMedia",
		add : insertingfunc
	},

	panel : {
		uri : "panel",
		href : "panel",
		add : insertingfunc,
		anonimus : true,
	},

	leftpanel : {
		uri : "leftpanel",
		href : "leftpanel",
		add : insertingfunc,
		anonimus : true,
	},

	nodecontrol : {
		uri : "nodecontrol",
		href : "nodecontrol",
		add : insertingfunc,
		
		anonimus : true,
	},

	authorization : {
		uri : "authorization",
		href : "authorization",
		add : insertingfunc,
		relations : [

			{src : 'js/vendor/qr/qrscanner.js',			   f : 'js'},				
			
		],
		anonimus : true,
		electronDontOpen : true
	},

	addaccount : {
		uri : "addaccount",
		href : "addaccount",
		add : insertingfunc,
		relations : [

			{src : 'js/vendor/qr/qrscanner.js',			   f : 'js'},	
			
		]
	},

	complain : {
		uri : "complain",
		href : "complain",
		add : insertingfunc
	},

	postscores : {
		uri : "postscores",
		href : "postscores",
		add : insertingfunc
	},

	socialshare2 : {
		uri : "socialshare2",
		href : "socialshare2",
		add : insertingfunc,

		anonimus : true,

		relations : [
			{src : 'js/widgets.js',			   f : 'js'},
			{src : 'js/vendor/SocialShare.min.js',			   f : 'js'},
		],
	},

	main : {
		uri : "main",
		href : "index",
		add : {
			el : 'content'
		},
		anonimus : true,

		electronDontOpen : function(){
			var _p = parameters()

			if(!_p.s && !_p.v) return true
		}
	},

	author : {
		uri : "author",
		href : "author",
		add : insertingfunc,
		anonimus : true,
		preshell : true,
		exportcss : true,
		
	},

	authorn : {
		uri : "authorn",
		href : "authorn",
		add : insertingfunc,
		anonimus : true,
		//preshell : true,
		exportcss : true,
		
	},

	channel : {
		uri : "channel",
		href : "channel",
		add : insertingfunc,
		anonimus : true,
		exportcss : true,
	},
	
	post : {
		uri : "post",
		href : "post",
		preshell : true,
		add : insertingfunc,
		anonimus : true,
		exportcss : true,
	},
	userslist : {
		uri : "userslist",
		href : "userslist",
		add : insertingfunc,
		anonimus : true,
	},

	activities : {
		uri : "activities",
		href : "activities",
		add : insertingfunc,
		anonimus : true,
	},

	ustate : {
		uri : "ustate",
		href : "ustate",
		add : insertingfunc,

		relations : [
			{src : 'js/vendor/chart.min.js',			   f : 'js', require : function(){
				Chart = require('./js/vendor/chart.min.js')
			}},	
		]

		
	},

	advertising : {
		uri : "advertising",
		href : "advertising",
		add : insertingfunc
	},

	earnings : {
		uri : "earnings",
		href : "earnings",
		add : insertingfunc
	},

	videoCabinet : {
		uri : "videoCabinet",
		href : "videoCabinet",
		add : insertingfunc,
	},

	editVideoDescription : {
		uri : "editVideoDescription",
		href : "editVideoDescription",
		add : insertingfunc,
	},

	diagnosticsPage : {
		uri : "diagnosticsPage",
		href : "diagnosticsPage",
		add : insertingfunc,
		anonimus : true,
	},

	dust : {
		uri : "dust",
		href : "dust",
		add : insertingfunc,

		ignoreMinimize : true

	},

	testApi : {
		uri : "testApi",
		href : "testApi",
		add : insertingfunc
	},

	commentBanner : {
		uri : "commentBanner",
		href : "commentBanner",
		add : insertingfunc,
		anonimus : true,
		exportcss : true,
	},

	updatenotifier : {
		uri : "updatenotifier",
		href : "updatenotifier",
		add : insertingfunc,
		anonimus : true,
		exportcss : true,
	}
};



if(typeof module != "undefined") module.exports = __map;