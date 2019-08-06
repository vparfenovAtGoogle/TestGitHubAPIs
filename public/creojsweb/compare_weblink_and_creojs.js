var sideSuffix = null;

function clearOutput (suffix) {
    if (suffix) {
        ['json', 'messages', 'output', 'elapsedtime'].forEach (function (id) {document.getElementById(id + suffix).innerHTML = ''})
    }
    else {
        clearOutput ('creojs')
        clearOutput ('weblink')
    }
}

function printMessage (title, text) {
    var message = document.createElement("span");
    message.innerHTML = '<b>' + title + ':</b> ' + text
    document.getElementById('messages' + sideSuffix).appendChild (createListItem (message))
}

function printElapsedTime (startTime) {
    var timep = document.getElementById('elapsedtime' + sideSuffix);
    if (timep && startTime) {
      timep.innerHTML = '<b>Elapsed time:</b> ' + (new Date ().getTime () - startTime.getTime ()) / 1000.0 + ' seconds'
    }
}

function showExpandedObject (title, obj, startTime) {
        var msg = {}
        msg [title] = obj
        printResponseObject (msg, startTime).expandAll ();
}

function showException (ex, startTime) {
    showExpandedObject ('EXCEPTION', ex, startTime)
}

function showError (err, startTime) {
    showExpandedObject ('ERROR', err, startTime)
}

function printResponseObject (obj, startTime) {
    clearOutput (sideSuffix)
    if (startTime) printElapsedTime (startTime)
    return showJson (obj)
}

function alertObject (obj) {
    alert (obj)
}

function showJson (obj) {
    var span = document.getElementById('json' + sideSuffix);
    return new PrettyJSON.view.Node({ 
            el:span, 
            data:obj
        });
}

function initCompareOutputArea (parent, controlDiv) {
    function createElement (tag, attrs, innerHTML) {
        var elem = document.createElement (tag)
        if (attrs) {
            for (var key in attrs) {
                var value = attrs [key]
                if (key === 'style') {
                    for (var name in value) {
                        elem.style [name] = value [name]
                    }
                }
                else {
                    elem [key] = value
                }
            }
        }
        if (innerHTML) elem.innerHTML = innerHTML
        return elem
    }
    function appendChild (parent, tag, attrs, innerHTML) {
        var child = createElement (tag, attrs, innerHTML)
        parent.appendChild (child)
        return child
    }
    function createOutputColumn (suffix) {
        var column = createElement ('td', {style: {width: "50%", verticalAlign: "top"}})
        appendChild (column, 'p', {id: 'elapsedtime' + suffix})
        appendChild (column, 'span', {id: 'json' + suffix})
        appendChild (column, 'ul', {id: 'messages' + suffix})
        appendChild (column, 'div', {id: 'output' + suffix, style: {width: "100%", height: "100%", position: "relative"}})
        return column
    }
    var table = appendChild (parent, 'table', {style: {width: "100%"}})
    var controlRow = appendChild (table, 'tr')
    var controlCol = appendChild (controlRow, 'td', {colSpan: "2", style: {verticalAlign: "middle"}})
    var clearButton = appendChild (controlCol, 'span', {style: {position: "relative", float:"right"}})
    appendChild (clearButton, 'button', {className: "btn btn-sm btn-primary", onclick: function () {clearOutput()}}, 'Clear')
    if (controlDiv) {
        var divNodes = controlDiv.childNodes
        var controls = []
        for (var idx=0; idx < divNodes.length; idx++) controls.push (divNodes [idx])
        for (var idx=0; idx < controls.length; idx++) {
           controlCol.appendChild (controls [idx])
        }
        controlDiv.parentNode.removeChild (controlDiv)
    }
    var outputRow = appendChild (table, 'tr')
    outputRow.appendChild (createOutputColumn ('creojs'))
    outputRow.appendChild (createOutputColumn ('weblink'))
}