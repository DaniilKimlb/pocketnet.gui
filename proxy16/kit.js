var Proxy = require("./proxy");
var Datastore = require('@seald-io/nedb');

var deepExtend = require('deep-extend');
var cloneDeep = require('clone-deep');
var tcpPortUsed = require('tcp-port-used');
_ = 	require("underscore");
var fs = require('fs');

var Pocketnet = require('./pocketnet.js');
var Logger = require('./logger.js');
const { base64encode, base64decode } = require('nodejs-base64');
////
var f = require('./functions');
const { deep } = require("./functions");
////
var db = null;
var proxy = null;
var nedbkey = 'settings';
var settingsPath = 'data/settings'
////
var settings = {};


var pocketnet = new Pocketnet()
var test = _.indexOf(process.argv, '--test') > -1 || global.TESTPOCKETNET
var reverseproxy = _.indexOf(process.argv, '--reverseproxy') > -1 || global.REVERSEPROXY

typeof global.EXPERIMENTALNODES == 'undefined' ? global.EXPERIMENTALNODES = _.indexOf(process.argv, '--experimentalnodes') > -1 : false

var logger = new Logger(['general', 'rpc', 'system', 'remote', 'firebase', 'nodecontrol', 'peertube', 'transports', 'logs290323']).init()

logger.setlevel('debug');

// Mainnet ports
const WebPort = 38081;
const SecureWebPort = 38881;
const WsPort = 8087;
const SecureWsPort = 8887;

// Testnet ports
const TestWebPort = 39091;
const TestSecureWebPort = 39991;
const TestWsPort = 6067;
const TestSecureWsPort = 6667;

var testnodes = [
	/*{
		host : '65.21.252.135',
		port : 39091,
		ws : 6067,
		name : 'pnettool.pocketnet.app',
		stable : true
	},

	{
		host : '157.90.235.121',
		port : TestWebPort,
		ws : TestWsPort,
		sport : TestSecureWebPort,
		sws : TestSecureWsPort,
		name : 'test.1.pocketnet.app',
		stable : true
	},*/
	{
		host : '157.90.228.34',
		port : TestWebPort,
		ws : TestWsPort,
		sport : TestSecureWebPort,
		sws : TestSecureWsPort,
		name : 'test.2.pocketnet.app',
		stable : true
	},
	{
		host : '116.203.219.28',
		port : TestWebPort,
		ws : TestWsPort,
		sport : TestSecureWebPort,
		sws : TestSecureWsPort,
		name : 'test.pocketnet.app',
		stable : true
	}/*,
	{
		host : 'pnettool.pocketnet.app',
		port : TestWebPort,
		ws : TestWsPort,
		sport : TestSecureWebPort,
		sws : TestSecureWsPort,
		name : '0.22-alpha-isolated',
		stable : false
	},
	{
		host : '109.173.41.29',
		port : TestWebPort,
		ws : TestWsPort,
		sport : TestSecureWebPort,
		sws : TestSecureWsPort,
		name : 'lostystyg',
		stable : false
	}*/
]


var activenodes = [
	
	{
		host : '135.181.196.243',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '135.181.196.243',
		stable : true
	},

	{
		host : '202.61.253.55', //
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '202.61.253.55',
		stable : true
	},
	{
		host : '207.180.201.246', ///
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '207.180.201.246',
		stable : true
	},

	{
		host : '5.189.141.204', ///
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '5.189.141.204',
		stable : true
	},
	{
		host : '162.246.52.155',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '162.246.52.155',
		stable : true
	},
	{
		host : '95.31.45.162',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '95.31.45.162',
		stable : true
	},
	{
		host : '79.143.35.233',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '79.143.35.233',
		stable : true
	},
	{
		host : '109.197.196.106',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '109.197.196.106',
		stable : true
	},
	{
		host : '65.21.252.135',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '65.21.252.135',
		stable : true,
		alwaysrun : true
	},
	{
		host : '178.217.159.221',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '178.217.159.221',
		stable : true
	},
	{
		host : '65.21.56.203',
		port : WebPort,
		ws : WsPort,
		sport : SecureWebPort,
		sws : SecureWsPort,
		name : '65.21.56.203',
		stable : true
	},
]

var nodes = activenodes

if (test) nodes = testnodes



var defaultSettings = {

	admins : [],

	testkeys : [],
	
	nodes : {
		dbpath : 'data/nodes'
	},

	tor : {
		dbpath2 : 'data/tordb',
		path : 'data/tor',
		enabled3: 'neweruse',
		useSnowFlake2 : false,
		customObfs4 : false,
	},

	server : {
		enabled : false,

        dontCache: false,
		captcha : true,
		hexCaptcha : false,
		host : '',
		iplimiter : {
			interval : 30000,
			count  : 500,
			blacklistcount : 3
		},
		
		ports : {
			https : 8899,
			wss : 8099
		},
		
		ssl : {
			name : "Default",
			key : 'cert/key.pem',
			cert : 'cert/cert.pem',
			passphrase: 'password'
		},
	},

	firebase : {
		key : "",
		dbpath : 'data/firebase_a',
		id : ''
	},
	miniapp : {
		dbpath : 'data/firebase_ma',
	},
	wallet : {
		dbpath : 'data/wallet',
		addresses : {
			registration : {
				privatekey : "",
				amount : 0.0006,
				outs : 30,
				check : 'ipAndUniqAddress'
			},

			balance : {
				privatekey : "",
				amount : 0.0002,
				outs : 10,
				check : 'ipAndUniqAddress'
			}
		}
	},

	translateapi : {
		api : '',
		key : ''
	},

    node: {
		dbpath : 'data/node',
        enabled: false,
        binPath: '',
		dataPath: '', //// deleted
		ndataPath : ''
    },
	
	bots : {
		dbpath : 'data/bots',
	},

	atransactions : {
		dbpath : 'data/atransactions',
	},

	proxies : {
		dbpath : 'data/proxies',
		explore : true
	},

	systemnotify : {
		token : '',
		chatid : '',
		parameters : {}
	},

	/*rsa : {
		private : '',
		public : ''
	}*/
	
	slide : {
		dbpath : 'data/slide',
	},
}


var state = {

	exportkeys : function(){
		return _.filter(settings.testkeys, function(key){

			var kp = null

			try{
                kp = pocketnet.kit.keyPair(key)

				return true
            }
            catch(e){
                return false
            }

		})
	},

	export : function(view){

		var exporting = {
			server : settings.server,
			firebase : {
				key : settings.firebase.key || "",
				id : settings.firebase.id
			},
			wallet : {
				addresses : settings.wallet.addresses
			},
			node : {
				enabled : settings.node.enabled,
				binPath : settings.node.binPath,
				ndataPath: settings.node.ndataPath,
				dataPath: settings.node.dataPath,
			},
			admins : settings.admins,
			proxies : {
				explore : settings.proxies.explore
			},
			tor : {
				dbpath : settings.tor.dbpath,
				enabled3: settings.tor.enabled3,
				useSnowFlake2 : settings.tor.useSnowFlake2,
				customObfs4 : settings.tor.customObfs4,
			},
			testkeys : state.exportkeys(),
			systemnotify : settings.systemnotify,
			translateapi : {
				api : settings.translateapi.api,
				key : settings.translateapi.key
			}
			//rsa : settings.rsa
		}

		exporting = cloneDeep(exporting)

		if(view) {

			exporting.testkeys = []

			if (exporting.systemnotify.token)
				exporting.systemnotify.token = "*"

			if (exporting.systemnotify.chatid)
				exporting.systemnotify.chatid = "*"

			if (exporting.server.ssl.passphrase)
				exporting.server.ssl.passphrase = "*"

			if (exporting.firebase.key)
				exporting.firebase.key = "*"

			if (exporting.wallet.addresses.registration.privatekey)
				exporting.wallet.addresses.registration.privatekey = "*"

			if (exporting.wallet.addresses.balance.privatekey)
				exporting.wallet.addresses.balance.privatekey = "*"

			if (exporting.translateapi.key)
				exporting.translateapi.key = "*"
		}

		return exporting
	},


	apply : function(cds){
		settings = cds
		settings.nodes.stable = nodes
	},

	expand : function(_settings, defaultSettings){
		var cds = cloneDeep(defaultSettings)

        deepExtend(cds, _settings)

		return cds
	},

	remove : function(){

        return new Promise((resolve, reject) => {
            db.remove({ nedbkey : nedbkey }, {}, function (err, numRemoved) {

                if(err){
                    reject(err)
                }
                else{
                    resolve()
                }
            });
        })
		
	},

	rewrite : function(){
        return state.remove().then(r => {
            return state.savedb()
        })
	},

	savedb : function(){
        return new Promise((resolve, reject) => {

			var saving = state.export()
				saving.nedbkey = nedbkey

            db.insert(saving, function (err, newDoc) {
                if(err){
                    reject(err)
                }
                else{
                    resolve()
                }
            });
        })
	},

	save : function(){
		return state.rewrite()
	},

	saverp : function(){
		return state.rewrite().then(r => {
			return kit.proxy()
		})
	},
	prepare : function(){
	
		try{
			if(!fs.existsSync(f.path('data'))){
				fs.mkdirSync(f.path('data'))
			}
		}
		catch(e){
		}
		
		
			
	}
}


const kit = {

	manage: {
		set: {

			tor : {

				changeSettings: function (data) {
					return kit.proxy().then((proxy) => {


						if (typeof data.useSnowFlake2 != 'undefined')
							settings.tor.useSnowFlake2 = data.useSnowFlake2

						if (typeof data.customObfs4 != 'undefined') {
							settings.tor.customObfs4 = data.customObfs4
						}

						if (typeof data.enabled3 != 'undefined')
							settings.tor.enabled3 = data.enabled3

						return proxy.torapplications.settingChanged(settings.tor)

					}).then(() => {
						return state.save()
					})
				},

				useSnowFlake2: function (data) {

					return kit.proxy().then((proxy) => {

						settings.tor.useSnowFlake2 = data.useSnowFlake2 || false

						return proxy.torapplications.settingChanged(settings.tor)

					}).then(() => {
						return state.save()
					})
				},

				customObfs4: function (data) {

					return kit.proxy().then((proxy) => {

						settings.tor.customObfs4 = data.customObfs4 || false

						return proxy.torapplications.settingChanged(settings.tor)

					}).then(() => {
						return state.save()
					})
				},

				enabled3: function (data) {

					return kit.proxy().then((proxy) => {

						settings.tor.enabled3 = data.enabled3 || false

						return proxy.torapplications.settingChanged(settings.tor)

					}).then(() => {
						return state.save()
					})
				},
			},

			server: {

				settings: function ({
					settings = {}
				}) {

					var ctx = kit.manage.set.server
					var tctx = kit.manage.set.tor
					var notification = {}

					if (typeof settings.domain != 'undefined') notification.domain = settings.domain
					if (settings.ports) notification.ports = settings.ports
					if (typeof settings.enabled) notification.enabled = settings.enabled
					if (deep(settings, 'firebase.id')) notification.firebase = deep(settings, 'firebase.id')
					if (settings.ssl) notification.ssl = true
					if (settings.torenabled3) notification.torenabled3 = settings.torenabled3
					if (typeof settings.useSnowFlake2 != 'undefined') notification.useSnowFlake2 = settings.useSnowFlake2
					if (settings.customObfs4) notification.customObfs4 = settings.customObfs4

					return kit.proxy().then(proxy => {

						return proxy.wss.sendtoall({
							type: 'proxy-settings-changed',
							data: notification
						}).catch(e => {
							return Promise.resolve()
						})

					}).then(() => {
						var promises = []

						const hasPropTorEnabled3 = ('torenabled3' in settings);
						const hasPropUseSnowFlake2 = ('useSnowFlake2' in settings);
						const hasPropCustomObfs4 = ('customObfs4' in settings);

						if(hasPropTorEnabled3 || hasPropUseSnowFlake2 || hasPropCustomObfs4){
							const newSettings = {};

							if ('torenabled3' in settings) {
								newSettings.enabled3 = settings.torenabled3;
							}

							if ('useSnowFlake2' in settings) {
								newSettings.useSnowFlake2 = settings.useSnowFlake2;
							}

							if ('customObfs4' in settings) {
								newSettings.customObfs4 = settings.customObfs4;
							}

							promises.push(tctx.changeSettings(newSettings).catch(e => {
								console.error(e)

								return Promise.resolve('change settings error')
							}))
						}


						if (settings.firebase && settings.firebase.id)
							promises.push(ctx.firebase.id(settings.firebase.id).catch(e => {
								console.error(e)

								return Promise.resolve('firebase.id error')
							}))

						if (settings.firebase && settings.firebase.key)
							promises.push(ctx.firebase.key(settings.firebase.key).catch(e => {
								console.error(e)

								return Promise.resolve('firebase.key error')
							}))

						if (settings.ssl)
							promises.push(ctx.ssl(settings.ssl).catch(e => {
								console.error(e)

								return Promise.resolve('ssl error')
							}))

						if (settings.ports)
							promises.push(ctx.ports(settings.ports).catch(e => {
								console.error(e)

								return Promise.resolve('ports error')
							}))

						if (typeof settings.domain != 'undefined')
							promises.push(ctx.domain(settings.domain).catch(e => {
								console.error(e)

								return Promise.resolve('domain error')
							}))

						if (typeof settings.enabled != 'undefined')
							promises.push(ctx.enabled(settings.enabled).catch(e => {
								console.error(e)

								return Promise.resolve('enabled error')
							}))

						if (typeof settings.hexCaptcha != 'undefined')  
							promises.push(ctx.hexCaptcha(settings.hexCaptcha).catch(e => {
								console.error(e)

								return Promise.resolve('enabled error')
							}))

						if(!promises.length) 
							return Promise.reject('nothingchanged')

						return Promise.all(promises)
					})


				},
				domain: function (domain) {
					if (settings.server.domain != 'domain') {
						settings.server.domain = domain

						var prx = null

						return state.saverp().then(proxy => {

							prx = proxy
							return proxy.server.rews()

						}).then(r => {

							prx.nodeManager.reservice().catch(e => {
							})

							return Promise.resolve(r)
						})
					}

					return Promise.reject('nothingchanged')
				},
				ports: function (httpsws) {

					var ch = {
						https: false,
						wss: false
					}


					if (!httpsws.https) httpsws.https = settings.server.ports.https
					if (!httpsws.wss) httpsws.wss = settings.server.ports.wss

					return tcpPortUsed.check(Number(httpsws.https), '127.0.0.1').then(function (inUse) {

						ch.https = inUse

						return tcpPortUsed.check(Number(httpsws.wss), '127.0.0.1')

					}).then(function (inUse) {

						ch.wss = inUse

						return Promise.resolve()

					}).then(function () {
						if (!ch.https && !ch.wss) {

							if (settings.server.ports.https == httpsws.https && settings.server.ports.wss == httpsws.wss) {
								return Promise.reject('nothingchanged')
							}

							settings.server.ports = {
								https: httpsws.https,
								wss: httpsws.wss
							}

							var prx = null

							return state.saverp().then(proxy => {

								prx = proxy

								return proxy.server.rews()
							}).then(r => {

								prx.nodeManager.reservice().catch(e => {
								})

								return Promise.resolve(r)
							})
						}

						return Promise.reject('portsused')

					})
				},

				iplimiter: function (v) {

					var st = settings.server.iplimiter

					if (v.interval) st.interval = interval
					if (v.count) st.count = count
					if (v.blacklistcount) st.blacklistcount = blacklistcount


					return kit.save()

				},

				captcha: function (v) {

					if (typeof v == 'undefined') return Promise.reject('emptyargs')

					if (settings.server.captcha == v) return Promise.resolve()
					settings.server.captcha = v

					return kit.save()
					
				},

				hexCaptcha : function(v){

					if(typeof v == 'undefined') return Promise.reject('emptyargs')
	
					if (settings.server.hexCaptcha == v) return Promise.resolve()
						settings.server.hexCaptcha = v
		
					return kit.save()
					
				},
	

				enabled: function (v) {

					if (typeof v == 'undefined') return Promise.reject('emptyargs')

					if (settings.server.enabled == v) return Promise.resolve()
					settings.server.enabled = v

					return state.saverp().then(proxy => {
						return proxy.server.rews()
					})

				},

				defaultssl: function () {
					settings.server.ssl = defaultSettings.server.ssl

					return kit.proxy().then(proxy => {

						return proxy.wss.sendtoall({
							type: 'proxy-settings-changed',
							data: {
								ssl: true
							}
						})

					}).then(r => {
						return state.saverp()
					}).then(proxy => {
						return proxy.server.rews()
					})


				},

				ssl: function (sslobj) {

					if (sslobj.key && sslobj.cert && typeof sslobj.passphrase != 'undefined') {

						var d = {
							passphrase: sslobj.passphrase || '',
							name: sslobj.name || 'Default'
						}

						var keypath = 'cert/keyl.pem'
						var certpath = 'cert/certl.pem'

						sslobj.key = sslobj.key.split(',')[1]
						sslobj.cert = sslobj.cert.split(',')[1]

						return f.saveFile(keypath, Buffer.from(base64decode(sslobj.key), 'utf8')).then(() => {
							d.keypath = keypath

							return f.saveFile(certpath, Buffer.from(base64decode(sslobj.cert), 'utf8'))

						}).then(() => {
							d.certpath = certpath

							return Promise.resolve(d)
						}).then(() => {

							settings.server.ssl = d

							return state.saverp()

						}).then(proxy => {
							return proxy.server.rews()
						})
					} else {

						return Promise.reject('bad format')

					}

				},

				firebase: {
					clear: function () {
						settings.firebase.id = ''
						settings.firebase.key = ''

						return state.saverp().then(proxy => {
							return proxy.firebase.re()
						})
					},
					id: function (id) {

						settings.firebase.id = id

						return state.saverp().then(proxy => {
							return proxy.firebase.re()
						})

					},

					key: function (fbkjsonfile) {

						if (!fbkjsonfile) return Promise.reject('empty')

						var path = 'data/pocketnet-firebase-adminsdk.json'

						fbkjsonfile = fbkjsonfile.split(',')[1]

						return f.saveFile(path, Buffer.from(base64decode(fbkjsonfile), 'utf8')).then(() => {

							settings.firebase.key = path

							return state.saverp()

						}).then(proxy => {
							return proxy.firebase.re()
						})

					}
				}
			},

			wallet: {
				removeKey: function ({key, privatekey}) {

					if (!settings.wallet.addresses[key]) return Promise.reject('key')

					settings.wallet.addresses[key].privatekey = ''
					return state.saverp().then(proxy => {
						return proxy.wallet.removeKey(key)
					})

				},
				setkey: function ({key, privatekey}) {

					if (!settings.wallet.addresses[key]) return Promise.reject('key')

					if (settings.wallet.addresses[key].privatekey == privatekey) return Promise.resolve()

					settings.wallet.addresses[key].privatekey = privatekey

					return state.saverp().then(proxy => {
						return proxy.wallet.setPrivateKey(key, privatekey)
					})

				},
				apply: function ({key}) {
					return proxy.wallet.apply(key)
				}
			},

			node: {
				check: function () {
					return kit.proxy().then(proxy => {

						return proxy.nodeControl.check()

					}).then(r => {
						return Promise.resolve()
					})
				},
				enabled: function ({enabled}) {


					if (settings.node.enabled == enabled) return Promise.resolve()

					settings.node.enabled = enabled ? true : false

					return state.saverp().then(proxy => {

						proxy.nodeControl.enable(settings.node.enabled)

						return Promise.resolve(settings.node.enabled)


					})

				},
				defaultPaths: function ({}) {
					settings.node.binPath = ''
					settings.node.ndataPath = ''
					settings.node.enabled = false

					return state.saverp().then(proxy => {
						return proxy.nodeControl.re()
					})
				},
				binPath: function ({binPath}) {

					if (settings.node.binPath == binPath) return Promise.resolve()

					settings.node.binPath = binPath
					settings.node.enabled = false

					return state.saverp().then(proxy => {

						return proxy.nodeControl.re()
					})

				},
				ndataPath: function ({ndataPath}) {
					if (settings.node.ndataPath == ndataPath) return Promise.resolve()

					settings.node.ndataPath = ndataPath
					settings.node.enabled = false

					return state.saverp().then(proxy => {
						return proxy.nodeControl.re()
					})

				},
				stacking: {

					import: function ({privatekey}) {

						var r = null

						return kit.proxy().then(proxy => {

							r = proxy.nodeControl.request

							return proxy.nodeControl.request.getStakingInfo()

						}).then(balance => {

							return r.importPrivKey(privatekey)

						}).catch(e => {

							return Promise.reject(e)
						})

					},

					stakinginfo: function () {

						return kit.proxy().then(proxy => {
							return proxy.nodeControl.request.getStakingInfo()
						}).then(balance => {
							return Promise.resolve(balance)
						})

					}

				},
				wallet: {
					listaddresses: function () {
						return kit.proxy().then(proxy => {
							return proxy.nodeControl.request.listAddresses()
						}).then(result => {
							return Promise.resolve(result)
						})
					},
					getnewaddress: function () {
						return kit.proxy().then(proxy => {
							return proxy.nodeControl.request.getnewaddress()
						}).then(result => {
							return Promise.resolve(result)
						})
					},
					sendtoaddress: function (data) {
						return kit.proxy().then(proxy => {
							return proxy.nodeControl.request.sendtoaddress(data.address, data.amount)
						}).then(result => {
							return Promise.resolve(result)
						})
					},
				},
				dumpWallet: function ({path}) {
					return kit.proxy().then(proxy => {
						return proxy.nodeControl.request.dumpwallet(path)
					}).then(result => {
						return Promise.resolve(result)
					})
				},
				importWallet: function ({path}) {
					return kit.proxy().then(proxy => {
						return proxy.nodeControl.request.importwallet(path)
					}).then(result => {
						return Promise.resolve(result)
					})
				},
			},

			testkeys: {
				add: function ({
								   key
							   }) {

					if (!key) return Promise.reject("key")

					var kp = pocketnet.kit.keyPair(key)

					if (!kp) return Promise.reject("notvalidkey")

					if (_.indexOf(settings.testkeys, key) > -1) {
						return Promise.resolve()
					}

					settings.testkeys.push(key)

					return state.save()
				},

				remove: function ({
									  index
								  }) {

					if (index < 0 || index > settings.testkeys.length - 1) return Promise.resolve()

					settings.testkeys.splice(index, 1)

					return state.save()
				}
			},

			admins: {
				add: function ({
								   address
							   }) {

					if (!address) return Promise.reject("address")

					if (!pocketnet.kit.address.validation(address)) return Promise.reject("notvalidaddress")


					if (_.indexOf(settings.admins, address) > -1) {
						return Promise.resolve()
					}

					settings.admins.push(address)

					return state.save()
				},

				remove: function ({
									  address
								  }) {

					var i = _.indexOf(settings.admins, address)

					if (i == -1) return Promise.resolve()

					settings.admins.splice(i, 1)

					return state.save()
				}
			},

			translateapi : {
				settings: function (data) {
					return kit.proxy().then((proxy) => {

						if (typeof data.api != 'undefined')
							settings.translateapi.api = data.api

						if (typeof data.key != 'undefined') {
							settings.translateapi.key = data.key
						}
						
						return proxy.translateapi.settingChanged(settings.translateapi)

					}).then(() => {
						return state.save()
					})
				},
			}
		},

		get: {
			settings: function () {
				return Promise.resolve(state.export(true))
			},

			state: function (compact) {
				return kit.proxy().then(proxy => {
					return proxy.kit.info(compact)
				})
			},

			testkey: function (index) {
				return settings.testkeys[index]
			}
		},

		node: {
			install: function (message) {
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.install()
				}).then(r => {


					return Promise.resolve(r)
				})
			},
			breakInstall: function (message) {
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.breakInstall()
				}).then(r => {
					return Promise.resolve(r)
				})
			},
			delete: function ({all}) {
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.delete(all)
				}).then(r => {
					return Promise.resolve(r)
				})
			},
			update: function (message) {
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.update()
				}).then(r => {
					return Promise.resolve(r)
				})
			},
			request: function (message) {

				return kit.proxy().then(proxy => {

					if (!message.data[0]) return Promise.reject('methodname')

					if (!proxy.nodeControl.request[message.data[0]]) {
						return proxy.nodeControl.kit.rpc(message.data[0], message.data[1])
					}

					return proxy.nodeControl.request[message.data[0]](message.data[1])

				}).then(data => {
					send(message.id, null, data)
				})
			},
			stop: function (message) {
				return kit.proxy().then(proxy => {
					return proxy.nodeControl.kit.safeStop()
				}).then(r => {
					return Promise.resolve(r)
				})
			},
		},

		proxy: {
			detach: function (modules) {
				return kit.proxy().then(proxy => {
					return proxy.kit.detach(modules)
				})
			}
		},

		help: {
			commands: function () {

				var list = [];

				var rec = function (obj, key) {

					if (typeof obj == 'function') {

						list.push(key)

					} else {
						_.each(obj, (obj, i) => {
							rec(obj, key ? key + '.' + i : i)
						})
					}

				}

				rec(kit.manage)

				return Promise.resolve(list.join("\n"))
			}
		},

		atransactions: {
			get: function () {
				return kit.proxy().then(proxy => {
					return Promise.resolve({
						atransactions: proxy.aTransactions.get()
					})
				})
			},

			add: function ({txid}) {
				return kit.proxy().then(proxy => {
					return proxy.aTransactions.add(txid)
				})
			},

			addlist: function ({txids}) {
				return kit.proxy().then(proxy => {

					var promises = _.map(txids, function (txid) {
						return proxy.aTransactions.add(txid)
					})

					return Promise.all(promises)
				})
			},

			remove: function ({txid}) {
				return kit.proxy().then(proxy => {
					return proxy.aTransactions.remove(txid)
				})
			}
		},

		bots: {
			get: function () {
				return kit.proxy().then(proxy => {
					return Promise.resolve({
						bots: proxy.bots.get()
					})
				})
			},

			add: function ({address}) {
				return kit.proxy().then(proxy => {
					return proxy.bots.add(address)
				})
			},

			addlist: function ({addresses}) {
				return kit.proxy().then(proxy => {

					var promises = _.map(addresses, function (address) {
						return proxy.bots.add(address)
					})

					return Promise.all(promises)
				})
			},

			remove: function ({address}) {
				return kit.proxy().then(proxy => {
					return proxy.bots.remove(address)
				})
			}
		},

		tor: {

			info: function () {
				return kit.proxy().then(proxy => {
					return proxy.torapplications.info();
				})
			},

			install : function(){
				return kit.proxy().then(async proxy => {
					await proxy.torapplications.install().catch(e => {
						return Promise.reject(e)
					})

					return Promise.resolve(proxy.torapplications.info())
				})
			},

			reinstall : function(){
				return kit.proxy().then(async proxy => {
					await proxy.torapplications.reinstall().catch(e => {
						return Promise.reject(e)
					})

					return new Promise(resolve => {
						setTimeout(() => {
							return resolve(proxy.torapplications.info())
						}, 1000)
					})



				})
			}

		},

		notifications: {
			info: function () {
				return kit.proxy().then(async proxy => {
					return proxy.notifications.info();
				})
			},
		},

		transports: {
			axios: function (...args) {
				return kit.proxy().then(async proxy => {
					return proxy.transports.axios(...args);
				})
			},
			fetch: function (...args) {
				return kit.proxy().then(async proxy => {
					return proxy.transports.fetch(...args);
				})
			},
			request: function (option, callback) {
				return kit.proxy().then(async proxy => {
					return proxy.transports.request(option, callback);
				})
			},
			isAltTransportSet: function (url) {
				return kit.proxy().then(async proxy => {
					return proxy.transports.isAltTransportSet(url);
				})
			},
		},

		slide: {
			add: function (...args) {
				return kit.proxy().then(async proxy => {
					return proxy.api.add(...args);
				})
			}
		},

		quit: function () {
			return kit.destroy().then(r => {
				process.exit([0]);
			});
		},
	},

	gateway: function (message) {
		return this.proxy().then(proxy => {
			var api = proxy.apibypath(message.path)

			if (!api) return Promise.reject('api')

			proxy.authorization[api.authorization || 'dummy'](message.data)

			message.data.U = true //// IPC CONNECTION BACKDOOR

			if (!message.data.A) message.data.A = 'ipcconnection'

			return api.action(message.data).then(r => {
				return Promise.resolve(r.data)
			})

		})
	},

	startproxy: function (hck) {

		if (!proxy) {

			proxy = new Proxy(settings, kit.manage, test, logger, reverseproxy)

			if (hck.userDataPath) {
				proxy.userDataPath = hck.userDataPath
			}

			return proxy.kit.init()
		}


		logger.w('system', 'warn', 'Double Proxy Start')

		return Promise.reject('inited')

	},

	proxy: function () {
		if (proxy) return Promise.resolve(proxy)

		return Promise.reject('proxynull')
	},

	init: function (environmentDefaultSettings, hck) {

		state.prepare()

		var settings = defaultSettings;

		if (!environmentDefaultSettings)
			environmentDefaultSettings = {}

		if (!hck) hck = {}

		settings = state.expand(environmentDefaultSettings, settings)

		db = new Datastore({
			filename: f.path(settingsPath),
		});

		return new Promise((resolve, reject) => {

			var start = function () {

				kit.startproxy(hck).then(r => {

					logger.w('system', 'info', 'Proxy Started')

					return kit.proxy()

				}).then(proxy => {

					if (hck.wssdummy) {
						proxy.wss.wssdummy(hck.wssdummy)
					}

					resolve()

				}).catch(e => {

					logger.w('system', 'error', 'Proxy Init Error', e)

					reject(e)
				})
			}

			db.loadDatabase(function (err) {


				if (!err) {
					db.find({nedbkey: nedbkey}).exec(function (err, docs) {

						var savedSettings = !err ? docs[0] || {} : {}

						state.apply(state.expand(savedSettings, settings))

						state.save()

						start()
					});
				} else {
					state.apply(state.expand({}, settings))

					state.save()

					start()
				}


			});

		})
	},

	/////

	destroy: function () {

		return kit.proxy().then(proxy => {

			return proxy.kit.safedestroy()

		}).catch(e => {

			if (e == 'detach') return Promise.reject(e)

			return Promise.resolve()

		}).then(r => {

			return Promise.resolve()
			//process.exit(0)
		})
	},

	destroyhard: function () {

		return kit.destroy().then(r => {
			return kit.proxy().then(proxy => {
				return proxy.kit.destroy()
			})
		})

	},

	candestroy: function () {
		return kit.proxy().then(proxy => {
			return proxy.kit.candestroy()
		})
	},

}




module.exports = kit

