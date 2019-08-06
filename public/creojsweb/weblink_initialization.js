var pfcCreate;
var pfcGetCurrentSession;
var pfcFeatureType;
var pfcModelItemType;

{
    (function () {
        pfcCreate = (function () {
            var ua = navigator.userAgent.toString ().toLowerCase ();
            if (ua.indexOf ('chrome/') > -1) {
                return function (className) {return pfcCefCreate (className)}
            }
            else if (ua.indexOf ('trident') != -1) {
                return function (className) {return new ActiveXObject ('pfc.' + className)}
            }
            alert ('Unsupported type of embedded browser: ' + ua)
            return function () {return null}
        }) ()
        
        var session = null
        pfcGetCurrentSession = function () {
            if (!session) {
                var global = pfcCreate ("MpfcCOMGlobal")
                if (global) {
                    session = global.GetProESession ()
                    pfcFeatureType = pfcCreate ("pfcFeatureType")
                    pfcModelItemType = pfcCreate ("pfcModelItemType")
                    alert ("Successfully connected to Creo !")
                }
                else {
                    alert ("Cannot connect to Creo !")
                }
            }
            return session
        }

        var arrayFrom = Array.from

        Array.from = function (source) {
            if (!source) {
                return []
            }
            else if (typeof source === 'array') {
                return source
            }
            else if (('Count' in source) && ('Item' in source)) {
                var arr = []
                var count = source.count
                for (var idx=0; idx<count; idx++) arr.push (source.Item (idx))
                return arr
            }
            else if (arrayFrom) {
                return arrayFrom (source)
            }
            else {
                return [source]
            }
        }
        
        if (!Object.assign) {
            Object.assign = function (target, source) {
                for (var name in source) {
                    var srcvalue = source [name]
                    if (srcvalue !== undefined) {
                        target [name] = srcvalue
                    }
                }
                return target
            }
        }
    }) ()
}

function getFeatureType (feature) {return feature.FeatType}

{
    var activeModel = pfcGetCurrentSession ().GetActiveModel ()
    if (activeModel) {
        alert ('Active model: ' + activeModel.FileName)
    }
    else {
        alert ('This testing page requires active model. Preferably an assembly')
    }
}
